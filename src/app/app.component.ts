import { Component } from '@angular/core';
import { MapComponent } from './map/map.component';
import { NgbConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapComponent],
  template: `
    <main>
        <markercluster-demo></markercluster-demo>
    </main>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // // disable ng-bootstrap animation
  // constructor(ngbConfig: NgbConfig) {
  //   ngbConfig.animation = false;
  // }
  title = 'homes';
}
