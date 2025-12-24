import { Task } from "./types";
import { TaskCollection, TaskStats } from "./collection";
import { createTask } from "./operations";

export class TaskManager {
  private tasks: Map<string, Task>;

  constructor(initialTasks: Task[] = []) {
    this.tasks = new Map();

    for (const task of initialTasks) {
      this.tasks.set(task.id, task);
    }
  }

  //   ADD
  add(task: Omit<Task, "id" | "createdAt">): Task {
    const newTask = createTask(task.title, task.priority);
    this.tasks.set(newTask.id, newTask);
    return newTask;
  }

  // UPDATE
  update(id: string, updates: Partial<Task>): Task {
    const existing = this.tasks.get(id);

    if (!existing) {
      throw new Error(`Task with ${id} id is not found, Recheck the id once`);
    }

    const updated: Task = {
      ...existing,
      ...updates,
    };

    this.tasks.set(id, updated);
    return updated;
  }

  //  DELETE
  delete(id: string): boolean {
    return this.tasks.delete(id);
  }

  getStats(): TaskStats {
    const tasks = Array.from(this.tasks.values());

    const byPriority = {
      high: 0,
      medium: 0,
      low: 0,
    };

    const byStatus: Record<string, number> = {
      completed: 0,
      pending: 0,
    };

    let totalAge = 0;
    const now = Date.now();

    for (const task of tasks) {
      byPriority[task.priority]++;
      task.completed ? byStatus.completed++ : byStatus.pending++;
      totalAge += now - task.createdAt.getTime();
    }

    return {
      byPriority,
      byStatus,
      averageAge: tasks.length ? totalAge / tasks.length : 0,
    };
  }

  export(): TaskCollection {
    const tasks = Array.from(this.tasks.values());

    return {
      tasks,
      metadata: {
        total: tasks.length,
        completed: tasks.filter((t) => t.completed).length,
        lastModified: new Date(),
      },
    };
  }
}
