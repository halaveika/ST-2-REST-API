import winston, { format } from "winston";

export const loggerInfo = winston.createLogger({
  level: "info",
  format: format.combine(format.splat(), format.simple()),
  transports: [new winston.transports.Console()],
});

export const loggerError = winston.createLogger({
  level: "error",
  format: format.combine(format.errors({ stack: true }), format.colorize(), format.prettyPrint()),
  transports: [new winston.transports.Console()],
});
