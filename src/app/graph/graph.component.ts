import { Component, OnInit } from '@angular/core';
import {  testData } from '../../mock/MockDataSeries';
import * as CanvasJS from '../../assets/canvasjs/canvasjs.min';
import { TiltDefinition, TemperatureDefinition, GravityDefinition, BatteryDefinition } from 'src/mock/MockAxisYDefinitions';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    let chart = new CanvasJS.Chart("chartContainer", {
      zoomEnabled: true,
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "iSpindel Beer Processing Overview"
      },
      subtitles: [{
        text: "Watch the Beer get better!"
      }],
      axisY: [
        TiltDefinition,
        TemperatureDefinition
      ],
      axisY2: [
        GravityDefinition,
        BatteryDefinition
      ], 
      toolTip: {
        shared: true
      },
      legend: {
        cursor: "pointer",
        itemclick: this.toggleDataSeries
      },
      data: testData
    });

    chart.render();
  }

  public toggleDataSeries(chartContainer: any) {
    if (typeof (chartContainer.dataSeries.visible) === "undefined" || chartContainer.dataSeries.visible) {
      chartContainer.dataSeries.visible = false;
    } else {
      chartContainer.dataSeries.visible = true;
    }
    chartContainer.chart.render();
  }

}
