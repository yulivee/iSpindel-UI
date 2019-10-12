import { Component, OnInit } from '@angular/core';
import { tempSingleSeries } from '../../mock/MockDataSeries';
import * as CanvasJS from '../../assets/canvasjs/canvasjs.min';
import { TemperatureDefinition } from 'src/mock/MockAxisYDefinitions';

@Component({
  selector: 'app-graph-single-temp',
  templateUrl: './graph-single-temp.component.html',
  styleUrls: ['./graph-single-temp.component.css']
})
export class GraphSingleTempComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    let chart = new CanvasJS.Chart("tempChartContainer", {
      zoomEnabled: true,
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Beer Temperature"
      },
      subtitles: [{
        text: "Watch the Beer get chilly!"
      }],
      data: {
        type: "line",
        dataPoints: [
          { x: new Date(2017, 0, 7), y: 25.4 },
          { x: new Date(2017, 0, 14), y: 22.7 },
          { x: new Date(2017, 0, 21), y: 24.9 },
          { x: new Date(2017, 0, 28), y: 38.0 },
          { x: new Date(2017, 1, 4), y: 23.4 },
          { x: new Date(2017, 1, 11), y: 29.9 },
          { x: new Date(2017, 1, 18), y: 28.9 },
          { x: new Date(2017, 1, 25), y: 26.3 },
          { x: new Date(2017, 2, 4), y: 22.7 },
          { x: new Date(2017, 2, 11), y: 20.2 },
          { x: new Date(2017, 2, 18), y: 27.3 },
          { x: new Date(2017, 2, 25), y: 28.5 }
        ]
      }
    });

    chart.render();
  }

}
