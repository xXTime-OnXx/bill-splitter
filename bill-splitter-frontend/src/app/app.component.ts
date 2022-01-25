import {Component, OnInit} from '@angular/core';
import {StatusBar, Style} from '@capacitor/status-bar';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor() {
  }

  async ngOnInit(): Promise<void> {
    await StatusBar.setStyle({style: Style.Dark})
  }
}
