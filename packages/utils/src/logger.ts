import loglevel from "loglevel";

type Level = "trace" | "debug" | "info" | "warn" | "error" | "silent";

loglevel.setLevel(String("warn") as Level);

export default {
  warn: loglevel.warn,
  debug: loglevel.debug,
  info: loglevel.info,
  error: loglevel.error,
  trace: loglevel.trace,
  setLevel: loglevel.setLevel,
};
