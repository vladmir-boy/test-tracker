import 'reflect-metadata'
import { Logger, ILogObject } from "tslog"
import { Container } from "inversify";
import { ForecastService, IForecastService } from "../services/WeatherForecast/ForecastService";

let Symbols = {
    ForecastService: Symbol.for("IForecastService")
}

function logToTransport(logObject: ILogObject) {
    console.log(JSON.stringify(logObject));
}

const logger: Logger = new Logger({ suppressStdOutput: true });
logger.attachTransport(
    {
        silly: logToTransport,
        debug: logToTransport,
        trace: logToTransport,
        info: logToTransport,
        warn: logToTransport,
        error: logToTransport,
        fatal: logToTransport,
    },
    "debug"
);

let container = new Container();
container.bind<Logger>(Logger).toConstantValue(logger);
container.bind<ForecastService>(ForecastService).to(ForecastService).inSingletonScope()

export default container;