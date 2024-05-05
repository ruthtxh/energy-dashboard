import { Component, Input, OnInit, SimpleChanges, OnChanges } from '@angular/core';
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
export class SearchSummaryComponent implements OnInit {
  @Input() filteredLat?: number;
  @Input() filteredLong?: number;

  lastUpdateDateTime: string = "";


  ngOnInit() {
    this.lastUpdateDateTime = getFormatDateTime()
  }

  ngOnChanges(changes: SimpleChanges) {
    this.lastUpdateDateTime = getFormatDateTime()
  }
}

function getFormatDateTime() {
  const date = new Date();
  return `${date.toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric'
  })}    ${formatAMPM(date)}`;
}

function formatAMPM(date: Date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  var strMinutes = minutes.toString();
  if (minutes < 10) strMinutes = `0${minutes}`;
  var strTime = hours + ':' + strMinutes + ' ' + ampm;
  return strTime;
}