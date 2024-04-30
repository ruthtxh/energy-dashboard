import { Component } from '@angular/core';
import { MapComponent } from './map/map.component';
import { NgbConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MapComponent],
  template: `
    <main>
      <header class="brand-name">
        <img class="brand-logo" src="/assets/logo.svg" alt="logo" aria-hidden="true" />
      </header>
      <section class="content">
        <markercluster-demo></markercluster-demo>
      </section>
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
