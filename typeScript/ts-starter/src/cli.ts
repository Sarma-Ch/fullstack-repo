import { TaskManager } from "./TaskManager";

export class TaskCLI {
  constructor(private manager: TaskManager) {}

  async run(args: string[]): Promise<void> {
    await this.interactive();
  }

  private setupCommands(): void {}

  private async interactive(): Promise<void> {}
}
