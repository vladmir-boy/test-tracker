import 'reflect-metadata'
import axios from 'axios';
import { Logger } from 'tslog'
import { Container, injectable, inject } from "inversify";
export interface IForecastService {
    GetForecast(): Promise<String>;
}
@injectable()
export class ForecastService implements IForecastService {
    private readonly _logger:Logger;
    public constructor(logger:Logger) {
        this._logger = logger;
    }
    async GetForecast(): Promise<String> {
        try {
            const response = await axios.get('https://localhost:5001/WeatherForecast');
            this._logger.info(response);
            return response.data;
        } catch (error) {
            this._logger.error(error);
            return error.toString();
        }
    }
}