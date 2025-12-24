import { TaskCollection } from './collection';
import { Storage } from './storage';


export interface SyncResult {
  success: boolean;
  message?: string;
}


export interface RemoteSync {
  push(data: TaskCollection): Promise<void>;
  pull(): Promise<TaskCollection>;
}


export class TaskSyncManager {
  constructor(
    private storage: Storage<TaskCollection>,
    private remote?: RemoteSync
  ) {}


  async save(data: TaskCollection): Promise<void> {
    await this.storage.save('tasks', data);
  }


  async load(): Promise<TaskCollection> {
    const data = await this.storage.load('tasks');

    if (!data) {
      return {
        tasks: [],
        metadata: {
          total: 0,
          completed: 0,
          lastModified: new Date(),
        },
      };
    }

    return data;
  }


  async sync(data: TaskCollection): Promise<SyncResult> {
    if (!this.remote) {
      return {
        success: false,
        message: 'No remote sync configured',
      };
    }

    await this.remote.push(data);
    const updated = await this.remote.pull();
    await this.save(updated);

    return {
      success: true,
    };
  }
}
