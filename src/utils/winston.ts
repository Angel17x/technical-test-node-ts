import winston from "winston";

// Define your severity levels with their corresponding numeric values.


const levels: {[key: string]: number} = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// This function determines the current severity based on the NODE_ENV environment variable.
const level = (): string => {
  const env: string = process.env.NODE_ENV || "development";
  const isDevelopment: boolean = env === "development";
  return isDevelopment ? "debug" : "warn";
};

// Define different colors for each level to enhance log visibility.
interface Colors {
  [level: string]: string;
}

const colors: Colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "white",
};

// Link the defined colors to the severity levels in Winston.
winston.addColors(colors);

// Customize the log format.
const format = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
  winston.format.colorize({ all: true }),
  winston.format.printf(
    (info: winston.Logform.TransformableInfo) => `${info.timestamp} ${info.level}: ${info.message}`
  )
);

// Define transports for the logger.
const transports: winston.transport[] = [
  new winston.transports.Console(),
  new winston.transports.File({
    filename: "logs/error.log",
    level: "error",
  }),
  new winston.transports.File({ filename: "logs/all.log" }),
];

// Create and export the logger instance.
const Logger: winston.Logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports,
});

export default Logger;