import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { URI } from '@shared/constants/app.constants';
import { WorkflowActionDto, WorkflowSubmitUserTaskDto, WorkFlowUserTask } from '@shared/models/workflow.model';
import { map } from 'rxjs/operators';
import { CorporateNetworkService } from '../corporate-network/corporate-network.service';

@Injectable({
  providedIn: 'root',
})
export class WorkflowService {
  constructor(private _router: Router, private _network: CorporateNetworkService) {}

  private _currentTask: WorkFlowUserTask;

  get CurrentTask(): WorkFlowUserTask {
    return this._currentTask;
  }

  set CurrentTask(task: WorkFlowUserTask) {
    this._currentTask = task;
  }

  /**
   * Submit current task and navigate by default,
   * if you want to navigate manuly pass @param navigate `false`
   * @param navigate allow navigation by default its true
   */
  async SubmitTask(corporate_id: string, task_code: string, assignee: string, selectAction: WorkflowActionDto): Promise<WorkFlowUserTask> {
    const response: WorkflowSubmitUserTaskDto = {
      code: task_code,
      assignee: assignee,
      selectedAction: selectAction,
    };

    const task: WorkFlowUserTask = await this._network
      .post(`${URI.WORFLOW.SUBMIT_TASK}/${corporate_id}`, response)
      .pipe(map((x) => x))
      .toPromise();
    return task;
  }

  async GetNextTaskByUserType(user_type: string, corporate_id: string, params: any): Promise<WorkFlowUserTask> {
    const task: WorkFlowUserTask = await this._network
      .getAll(URI.WORFLOW.NEXT_TASK.replace(':user_type', user_type).replace(':corporate_id', corporate_id),params)
      .pipe(map((x) => x))
      .toPromise();
    this._currentTask = task;
    return task;
  }
}
