import { Output, EventEmitter, Injectable } from "@angular/core";
import { BaseComponent } from "@shared/components/base/base.component";
import { Component, OnInit, Inject, ViewEncapsulation } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Role } from "@feature/entitlement/models/role.model";
import { fuseAnimations } from "@fuse/animations";
import {
    MatTreeFlattener,
    MatTreeFlatDataSource,
} from "@angular/material/tree";
import { BehaviorSubject } from "rxjs";
import { FlatTreeControl } from "@angular/cdk/tree";
import { SelectionModel } from "@angular/cdk/collections";

export class TodoItemNode {
    children: TodoItemNode[];
    name: string;
    id: string;
}

export class TodoItemFlatNode {
    id: string;
    name: string;
    level: number;
    expandable: boolean;
}

@Injectable({ providedIn: "root" })
export class ChecklistDatabase {
    dataChange = new BehaviorSubject<TodoItemNode[]>([]);

    get data(): TodoItemNode[] {
        return this.dataChange.value;
    }

    constructor() {}

    initialize(data) {
        const response = this.buildFileTree(data);
        this.dataChange.next(response);
    }

    buildFileTree(modules) {
        return traverseModule(modules);
    }
}

function traverseModule(modules) {
    return modules.map((item) => {
        if (item.sub_modules) {
            item.children = traverseModule(item.sub_modules);
        }
        return item;
    });
}
@Component({
    selector: "app-role-form",
    templateUrl: "./role-form.component.html",
    styleUrls: ["./role-form.component.scss"],
    animations: fuseAnimations,
    encapsulation: ViewEncapsulation.None,
})
export class RoleFormComponent extends BaseComponent implements OnInit {
    roleForm: FormGroup;

    /** Map from flat node to nested node. This helps us finding the nested node to be modified */
    flatNodeMap = new Map<TodoItemFlatNode, TodoItemNode>();

    /** Map from nested node to flattened node. This helps us to keep the same object for selection */
    nestedNodeMap = new Map<TodoItemNode, TodoItemFlatNode>();

    /** A selected parent node to be inserted */
    selectedParent: TodoItemFlatNode | null = null;

    /** The new item's name */
    newItemName = "";

    treeControl: FlatTreeControl<TodoItemFlatNode>;

    treeFlattener: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;

    dataSource: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;

    /** The selection for checklist */
    checklistSelection = new SelectionModel<TodoItemFlatNode>(
        true /* multiple */
    );
    @Output() sendResponse: EventEmitter<Role> = new EventEmitter<any>();
    constructor(
        public matDialogRef: MatDialogRef<RoleFormComponent>,
        private _database: ChecklistDatabase,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        super("Config");
        this.treeFlattener = new MatTreeFlattener(
            this.transformer,
            this.getLevel,
            this.isExpandable,
            this.getChildren
        );
        this.treeControl = new FlatTreeControl<TodoItemFlatNode>(
            this.getLevel,
            this.isExpandable
        );
        this.dataSource = new MatTreeFlatDataSource(
            this.treeControl,
            this.treeFlattener
        );
        _database.dataChange.subscribe((data) => {
            this.dataSource.data = data;
        });
    }

    ngOnInit(): void {
        this._database.initialize(this.data.modules);
        this.roleForm = new FormGroup({
            id: new FormControl(this.data.role.id),
            name: new FormControl(this.data.role.name, [Validators.required]),
            description: new FormControl(this.data.role.description, [
                Validators.required,
            ]),
            modules: new FormControl(this.data.role.modules, [
                Validators.required,
            ]),
        });
    }

    onSelectedChange(e) {}
    onFilterChange(e) {}
    onSubmit() {
        const model = { ...this.roleForm.value };
        this.sendResponse.emit(model);
    }
    getLevel = (node: TodoItemFlatNode) => node.level;

    isExpandable = (node: TodoItemFlatNode) => node.expandable;

    getChildren = (node: TodoItemNode): TodoItemNode[] => node.children;

    hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;

    hasNoContent = (_: number, _nodeData: TodoItemFlatNode) =>
        _nodeData.name === "";

    /**
     * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
     */
    transformer = (node: TodoItemNode, level: number) => {
        const existingNode = this.nestedNodeMap.get(node);
        const flatNode =
            existingNode && existingNode.name === node.name
                ? existingNode
                : new TodoItemFlatNode();
        flatNode.id = node.id;
        flatNode.name = node.name;
        flatNode.level = level;
        flatNode.expandable = !!node.children?.length;
        this.flatNodeMap.set(flatNode, node);
        this.nestedNodeMap.set(node, flatNode);
        return flatNode;
    };

    /** Whether all the descendants of the node are selected. */
    descendantsAllSelected(node: TodoItemFlatNode): boolean {
        const descendants = this.treeControl.getDescendants(node);
        const descAllSelected =
            descendants.length > 0 &&
            descendants.every((child) => {
                return this.checklistSelection.isSelected(child);
            });
        return descAllSelected;
    }

    /** Whether part of the descendants are selected */
    descendantsPartiallySelected(node: TodoItemFlatNode): boolean {
        const descendants = this.treeControl.getDescendants(node);
        const result = descendants.some((child) =>
            this.checklistSelection.isSelected(child)
        );
        return result && !this.descendantsAllSelected(node);
    }

    /** Toggle the to-do item selection. Select/deselect all the descendants node */
    todoItemSelectionToggle(node: TodoItemFlatNode): void {
        let modules = this.roleForm.get("modules").value;
        modules = modules ? modules : [];
        const index = modules.findIndex((x) => x.id == node.id);
        if (index > -1) {
            modules.splice(index, 1);
        } else {
            modules.push({ id: node.id });
        }
        this.roleForm.get("modules").patchValue(modules);
        this.checklistSelection.toggle(node);
        const descendants = this.treeControl.getDescendants(node);
        this.checklistSelection.isSelected(node)
            ? this.checklistSelection.select(...descendants)
            : this.checklistSelection.deselect(...descendants);

        // Force update for the parent
        descendants.forEach((child) =>
            this.checklistSelection.isSelected(child)
        );
        this.checkAllParentsSelection(node);
    }

    /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
    todoLeafItemSelectionToggle(node: TodoItemFlatNode): void {
        let modules = this.roleForm.get("modules").value;
        const index = modules.findIndex((x) => x.id == node.id);
        if (index > -1) {
            modules.splice(index, 1);
        } else {
            modules.push({ id: node.id });
        }
        this.roleForm.get("modules").patchValue(modules);
        this.checklistSelection.toggle(node);
        this.checkAllParentsSelection(node);
    }

    /* Checks all the parents when a leaf node is selected/unselected */
    checkAllParentsSelection(node: TodoItemFlatNode): void {
        let parent: TodoItemFlatNode | null = this.getParentNode(node);
        while (parent) {
            this.checkRootNodeSelection(parent);
            parent = this.getParentNode(parent);
        }
    }

    /** Check root node checked state and change it accordingly */
    checkRootNodeSelection(node: TodoItemFlatNode): void {
        const nodeSelected = this.checklistSelection.isSelected(node);
        const descendants = this.treeControl.getDescendants(node);
        const descAllSelected =
            descendants.length > 0 &&
            descendants.every((child) => {
                return this.checklistSelection.isSelected(child);
            });
        if (nodeSelected && !descAllSelected) {
            this.checklistSelection.deselect(node);
        } else if (!nodeSelected && descAllSelected) {
            this.checklistSelection.select(node);
        }
    }

    /* Get the parent node of a node */
    getParentNode(node: TodoItemFlatNode): TodoItemFlatNode | null {
        const currentLevel = this.getLevel(node);
        if (currentLevel < 1) {
            return null;
        }
        const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;
        for (let i = startIndex; i >= 0; i--) {
            const currentNode = this.treeControl.dataNodes[i];
            if (this.getLevel(currentNode) < currentLevel) {
                return currentNode;
            }
        }
        return null;
    }

    findNode(modules, node) {
        return modules.find((item) => {
            if (item.id == node.id) return true;
            if (item.sub_modules) {
                return this.findNode(item.sub_modules, node);
            }
            return false;
        });
    }
    ngAfterViewInit() {
        if (!this.data.role.id) return;
        let modules = this.roleForm.get("modules").value;
        for (let i = 0; i < this.treeControl.dataNodes.length; i++) {
            const module = this.findNode(
                [...this.data.role.modules],
                this.treeControl.dataNodes[i]
            );
            if (module) {
                modules.push({ id: module.id });
                this.roleForm.get("modules").patchValue(modules);
                this.todoItemSelectionToggle(this.treeControl.dataNodes[i]);
                this.treeControl.expand(this.treeControl.dataNodes[i]);
            }
            if (module) {
                this.treeControl.expand(this.treeControl.dataNodes[i]);
            }
        }
    }
}
