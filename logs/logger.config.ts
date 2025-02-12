import pino from "pino";

export const appLogger = pino({
  level: process.env.LOG_LEVEL || "info",
  transport: {
    target: "pino-pretty",
    options: {
      destination: "./logs/app.logs", // Specify the log file path
      mkdir: true, // Create the directory if it doesn't exist
      colorize: false,
    },
  },
});

export const testLogger = pino({
  level: process.env.LOG_LEVEL || "info",
  transport: {
    target: "pino-pretty",
    options: {
      destination: "./logs/test.logs", // Specify the log file path
      mkdir: true, // Create the directory if it doesn't exist
      colorize: false,
    },
  },
});
