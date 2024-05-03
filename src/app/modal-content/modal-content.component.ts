import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IrradiationChartComponent } from '../irradiation-chart/irradiation-chart.component';
import { DonutChartComponent } from './donut-chart/donut-chart.component';
import { MiniMapComponent } from './mini-map/mini-map.component';

@Component({
  selector: 'app-modal-content',
  standalone: true,
  imports: [IrradiationChartComponent,  DonutChartComponent, MiniMapComponent],
  templateUrl: './modal-content.component.html',
  styleUrl: "./modal-content.component.css"
})

export class ModalContentComponent {
  activeModal = inject(NgbActiveModal);
  @Input() name?: string;
  @Input() lat?: number;
  @Input() long?: number;
}