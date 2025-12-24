import { TaskStatus, Priority } from "./types";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  createdAt: Date;
}

export function createTask(title: string, priority: Priority): Task {
  return {
    id: Date.now().toString(),
    title,
    completed: false,
    priority,
    createdAt: new Date(),
  };
}

export function markCompleted(task: Task): Task {
  return {
    ...task,
    completed: true,
  };
}
export function filterByStatus(tasks: Task[], status: boolean): Task[] {
  return tasks.filter((task) => task.completed === status);
}
export function sortByPriority(tasks: Task[]): Task[] {
  const priorityOrder: Record<Priority, number> = {
    high: 1,
    medium: 2,
    low: 3,
  };

  return [...tasks].sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
  );
}
