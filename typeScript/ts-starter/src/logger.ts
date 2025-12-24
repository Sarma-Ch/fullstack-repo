export type LogLevel = "info" | "warn" | "error";

export class Logger {
  constructor(private level: LogLevel) {}

  info(message: string, context?: object): void {
    if (this.level === "info") {
      console.log(`[INFO] ${message}`, context ?? "");
    }
  }

  warn(message: string, context?: object): void {
    if (this.level === "info" || this.level === "warn") {
      console.warn(`[WARN] ${message}`, context ?? "");
    }
  }

  error(error: Error, context?: object): void {
    console.error(`[ERROR] ${error.message}`, context ?? "");
  }
}
