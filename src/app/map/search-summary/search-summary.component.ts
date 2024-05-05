import { Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IrradiationChartComponent } from 'src/app/shared/irradiation-chart/irradiation-chart.component';

@Component({
  selector: 'app-search-summary',
  standalone: true,
  imports: [CommonModule, IrradiationChartComponent],
  templateUrl: './search-summary.component.html',
  styles: `
  .my-flex-card>div>div.card {
    height: calc(100%);
  }`
})
export class SearchSummaryComponent {
  @Input() filteredLat?: number;
  @Input() filteredLong?: number;
}
