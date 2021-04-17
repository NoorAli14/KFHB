export class WorkflowProcessVariable {
  cr: string;
  // isNewCr?: boolean;
  AppId?: string;
  complianceCheckerDecision: string;
  complianceDecision: string;
  rmDecision: string;
  rmCheckerDecision: string;
}
export class WorkflowNewProcess {
  creator: string;
  processDefinitionKey: string;
  processVariables: WorkflowProcessVariable;
}

export class WorkflowActionParameter {
  id: number;
  code: string;
  key: string;
  value: any;
  dataType: string;
}
export class WorkflowAction {
  id: number;
  code: string;
  parameters: WorkflowActionParameter;
}
export class WorkFlowUserTask {
  id: number;
  code: string;
  processKey: string;
  uiRouting: string;
  workflowTaskId: string;
  processVariables: WorkflowProcessVariable;
  actions: WorkflowAction[];
}

export class WorkflowActionParameterDto {
  key: string;
  value: any;
  dataType: string;
}
export class WorkflowActionDto {
  id?: number;
  code: string;
  actionParameters?: WorkflowActionParameterDto[];
}
export class WorkflowSubmitUserTaskDto {
  code: string;
  assignee: string;
  selectedAction: WorkflowActionDto;
}
