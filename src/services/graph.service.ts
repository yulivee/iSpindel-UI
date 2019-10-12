import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { map } from 'rxjs/operators';

import { IDataPoint } from 'src/classes/Data/IDataPoint';
import { IRawNumericalData, NumericalData } from 'src/classes/Data/NumericalData';

@Injectable({
  providedIn: 'root'
})
export class GraphService {

  constructor() { }

  private _getAjaxRequest(urlPart: string): any {
    return {
      url: '/v1/'+urlPart,
      method: 'GET',
    };
  }

  private _responseValidator(response: AjaxResponse): AjaxResponse {
    if (!response.response) {
      throw new Error('request not successful');
    }
    if (response.responseType !== 'json') {
      throw new Error('wrong request type');
    }
    return response;
  }

  private _createDataPoints(response: AjaxResponse): Array<IDataPoint> {
    return response.response
      .map((rawData: IRawNumericalData) => {
        const dataPoint = new NumericalData();
        dataPoint.x = new Date(rawData.timestamp);
        dataPoint.y = rawData.value;
        return dataPoint;
      });
  }


  private _getValueList(start: number, end: number, type: string): Observable<IDataPoint[]> {
    const validateResponse = (response: AjaxResponse) => this._responseValidator(response);
    const getTemps = ajax(this._getAjaxRequest(type));

    const rawData$ = getTemps.pipe(
      map(validateResponse),
      map(validatedResponse => this._createDataPoints(validatedResponse))
    );

    return rawData$;

  }

  public getTemperatureList(start: number, end: number): Observable<IDataPoint[]> {
    return this._getValueList(start, end, 'temperature');
  }

  public getBatteryList(start: number, end: number): Observable<IDataPoint[]> {
    return this._getValueList(start, end, 'battery');
  }

  public getGravityList(start: number, end: number): Observable<IDataPoint[]> {
    return this._getValueList(start, end, 'gravity');
  }
}
