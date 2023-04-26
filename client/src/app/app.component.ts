import { ChangeDetectionStrategy, Component } from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {MatIconRegistry} from "@angular/material/icon";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  constructor(
    private readonly _matIconRegistry: MatIconRegistry,
    private readonly _domSanitizer: DomSanitizer,) {

    this._matIconRegistry.addSvgIconResolver((icon, namespace) => {
      return this._domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/img/icons/' +
        (namespace ? namespace + '/' : '') +
        icon +
        '.svg'
      );
    });

  }
}
