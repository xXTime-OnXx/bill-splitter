import {Component} from '@angular/core';
import {StorageService} from './service/storage/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private localStorage: StorageService) {
    this.localStorage.setup();
  }
}
