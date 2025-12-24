export type TaskErrorCode =
  | "TASK_NOT_FOUND"
  | "INVALID_TASK"
  | "STORAGE_ERROR"
  | "SYNC_ERROR";

export class TaskError extends Error {
  constructor(
    message: string,
    public code: TaskErrorCode,
    public context?: object
  ) {
    super(message);
    this.name = "TaskError";
  }
}
