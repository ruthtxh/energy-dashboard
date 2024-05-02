import { Component, inject } from '@angular/core';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

@Component({
  selector: 'app-donut-chart',
  standalone: true,
  imports: [CanvasJSAngularChartsModule],
  templateUrl: './donut-chart.component.html',
  styles: ``
})

export class DonutChartComponent {
  chartOptions = {
    animationEnabled: true,
    backgroundColor: "transparent",
    title: {
      text: "444.75 MWh",
      verticalAlign: "center",
      dockInsidePlotArea: true,
      fontColor: "#ffffff",
      fontFamily: "arial"
    },
    
    
    data: [{
      type: "doughnut",
      yValueFormatString: "#,###.##'%'",
      indexLabel: "{name}",
      dataPoints: [
        { y: 75, name: "", color: "#61BDFC" },
        { y: 25, name: "", color: "gray"  },
      ],
      
    }],
    
  }
}