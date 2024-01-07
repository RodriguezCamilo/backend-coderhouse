import { Router } from "express";
import { addLogger } from "../config/logger.js";

const loggerRouter= Router();

loggerRouter.use(addLogger);

loggerRouter.get('/fatal', (req, res)=>{
    req.logger.fatal('<span style="color:red"> FATAL </span><br/>'),
    res.send("Fatal logger")
});

loggerRouter.get('/error', (req, res)=>{
    req.logger.error('<span style="color:yellow"> ERROR </span><br/>'),
    res.send("Error logger")
});

loggerRouter.get('/warning', (req, res)=>{
    req.logger.warning('<span style="color:cyan"> WARNING </span><br/>'),
    res.send("Warning logger")
});

loggerRouter.get('/info', (req, res)=>{
    req.logger.info('<span style="color:blue"> INFO </span><br/>'),
    res.send("Info logger")
});


loggerRouter.get('/debug', (req, res)=>{
    req.logger.debug("Debug"),
    res.send("Debug logger")
});

export default loggerRouter