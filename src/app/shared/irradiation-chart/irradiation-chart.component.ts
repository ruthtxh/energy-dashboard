import { Component, inject, Input, OnInit, SimpleChanges, OnChanges, } from '@angular/core';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { IrradiationService } from 'src/app/irradiation.service';
import { Irradiation } from 'src/app/irradiation';

@Component({
  selector: 'app-irradiation-chart',
  standalone: true,
  imports: [CanvasJSAngularChartsModule],
  templateUrl: './irradiation-chart.component.html',
  styles: ``
})

export class IrradiationChartComponent implements OnInit {
  @Input() lat?: number;
  @Input() long?: number;
  irradiationService: IrradiationService = inject(IrradiationService);
  chartOptions: any = {};
  ngOnInit() {
    this.refreshData();
  }
  
  ngOnChanges(changes: SimpleChanges) {
    this.refreshData();
  }

  refreshData(): void {
    this.irradiationService.getIrradiation(this.lat ?? 0, this.long ?? 0).then((irradiation: Irradiation) => {
      let dataPoints = [];
      for (let i = 0; i < irradiation.hourly.time.length; i++) {
        dataPoints.push({ x: new Date(irradiation.hourly.time[i]), y: irradiation.hourly.direct_radiation[i] })
      }
      this.chartOptions = {
        animationEnabled: true,
        axisX: {
          labelFontColor: "#FFFFFF"
        },
        axisY: {
          labelFontColor: "#FFFFFF",
          gridColor: "transparent",
        },
        backgroundColor: "transparent",
        data: [{
          type: "splineArea",
          color: "#33FFF6",
          markerType: "none",
          xValueFormatString: "hh",
          dataPoints: dataPoints
        }]
      }
    })
  }
}