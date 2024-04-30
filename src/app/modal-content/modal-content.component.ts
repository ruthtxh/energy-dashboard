import { Component, inject, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-content',
  standalone: true,
  imports: [],
  templateUrl: './modal-content.component.html',
  styles: ``
})

export class ModalContentComponent {
  activeModal = inject(NgbActiveModal);
  @Input() name?: string;
  @Input() lat?: number;
  @Input() long?: number;
}