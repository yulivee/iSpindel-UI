import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../../assets/canvasjs/canvasjs.min';
import { TiltDefinition, RssiDefinition } from 'src/mock/MockAxisYDefinitions';
import { Observable, zip } from 'rxjs';
import { GraphService } from 'src/services/graph.service';
import { IDataPoint } from 'src/classes/Data/IDataPoint';
import { Temperature } from 'src/classes/Data/Temperature';
import { TemperatureDefinition } from 'src/classes/AxisDefinitions/TemperatureDefinition';
import { BatteryDefinition } from 'src/classes/AxisDefinitions/BatteryDefinition';
import { GravityDefinition } from 'src/classes/AxisDefinitions/GravityDefinition';
import { Gravity } from 'src/classes/Data/Gravity';
import { Battery } from 'src/classes/Data/Battery';
import { GraphConfig } from 'src/classes/GraphConfig';
import { map } from 'rxjs/operators';
import { MqttService } from 'src/services/mqtt.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  public chart: CanvasJS.Chart;
  public graphConfig: GraphConfig;
  public currentTemperature$: Observable<number>;
  public currentBattery$: Observable<number>;
  public currentGravity$: Observable<number>;
  private _temperatureDataList$: Observable<IDataPoint[]>;
  public temperature: Temperature = new Temperature('red', 0);
  public temperatureDef: TemperatureDefinition = new TemperatureDefinition(this.temperature.name, this.temperature.color);

  private _batteryDataList$: Observable<IDataPoint[]>;
  public battery: Battery = new Battery('#7F6089', 1)
  public batteryDef: BatteryDefinition = new BatteryDefinition(this.battery.name, this.battery.color);
  
  private _gravityDataList$: Observable<IDataPoint[]>;
  public gravity: Gravity = new Gravity('green', 2)
  public gravityDef: GravityDefinition = new GravityDefinition(this.gravity.name, this.gravity.color);


  constructor(private _graphService: GraphService, private _mqttService : MqttService) { }

  ngOnInit() {

    this.currentTemperature$ = this._mqttService.getTemperature();
    this.currentBattery$ = this._mqttService.getBattery();
    this.currentGravity$ = this._mqttService.getGravity();

    this._temperatureDataList$ = this._graphService.getTemperatureList(1, 2);
    this._batteryDataList$ = this._graphService.getBatteryList(1, 2);
    this._gravityDataList$ = this._graphService.getGravityList(1, 2);
    
    zip(this._temperatureDataList$, this._batteryDataList$, this._gravityDataList$).pipe(
      map( ([tempData, batteryData, gravityData]) => {
        this.temperature.dataPoints = tempData;
        this.gravity.dataPoints = gravityData;
        this.battery.dataPoints = batteryData;
      })
      ).subscribe(() => this.initChart());
/*
      this.temperature.dataPoints = tempPoints;
      this.battery.dataPoints = batteryPoints;
      this.gravity.dataPoints = gravityPoints;
      this.initChart();
*/
  }

  private initChart(): void {
    console.log(this.temperature);
    this.graphConfig = new GraphConfig([this.temperatureDef, this.batteryDef, this.gravityDef], [this.temperature, this.battery, this.gravity]);
    this.chart = new CanvasJS.Chart("chartContainer", this.graphConfig);

    this.chart.render();
  }


}
