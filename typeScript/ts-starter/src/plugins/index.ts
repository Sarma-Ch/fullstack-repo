export interface TaskPlugin {
  name: string;
  version: string;
  commands?: PluginCommand[];
  hooks?: PluginHooks;
}

export interface PluginCommand {
  name: string;
  description: string;
  handler: CommandHandler;
}

export type CommandHandler = (...args: any[]) => Promise<void> | void;

export interface PluginHooks {
  onTaskAdded?: (taskId: string) => void;
  onTaskUpdated?: (taskId: string) => void;
  onTaskDeleted?: (taskId: string) => void;
}
