import loglevel from "loglevel";

type Level = "trace" | "debug" | "info" | "warn" | "error" | "silent";

loglevel.setLevel(String("warn") as Level);

export const logger = {
  warn: loglevel.warn,
  debug: loglevel.debug,
  info: loglevel.info,
  error: loglevel.error,
  trace: loglevel.trace,
  setLevel: loglevel.setLevel,
};

// db operations error handling
export class ErrorCode extends Error {
  code: number;
  constructor(msg: string, code: number) {
    super(msg);
    this.code = code;
  }
}
