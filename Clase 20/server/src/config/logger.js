import winston from "winston"
import 'dotenv/config'

const customLevelOpt = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        debug: 4
    },
    colors: {
        fatal: 'red',
        error: 'yellow',
        warning: 'cyan',
        info: 'blue',
        debug: 'green'
    }
}

const fileTransports = [
    new winston.transports.File({
        filename: './errors.html',
        level: 'fatal',
        format: winston.format.combine(
            winston.format.simple()
        )
    }),
    new winston.transports.File({
        filename: './errors.html',
        level: 'error',
        format: winston.format.combine(
            winston.format.simple()
        )
    }),
    new winston.transports.File({
        filename: './info.html',
        level: 'warning',
        format: winston.format.combine(
            winston.format.simple()
        )
    }),
    new winston.transports.File({
        filename: './info.html',
        level: 'info',
        format: winston.format.combine(
            winston.format.simple()
        )
    })]

if (process.env.LOGGER_STATE === 'development') {
    fileTransports.push(new winston.transports.Console({
        level: 'debug',
        format: winston.format.combine(
            winston.format.simple()
        )
    }))
}

const logger = winston.createLogger({
    levels: customLevelOpt.levels,
    transports: fileTransports
})

export const addLogger = (req, res, next) => {
    req.logger = logger
    if (process.env.LOGGER_STATE === 'development') {req.logger.debug(`${req.method} es ${req.url} - ${new Date().toLocaleTimeString()}`)}
    next()
}