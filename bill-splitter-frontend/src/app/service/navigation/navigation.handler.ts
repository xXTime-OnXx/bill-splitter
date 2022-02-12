import {NavController} from '@ionic/angular';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavigationHandler {

  private readonly defaultFallbackUrl = 'tabs';

  constructor(private navCtrl: NavController,
              private router: Router) {
  }

  public async navigate(url: string, params?: any): Promise<void> {
    if (params) {
      await this.router.navigate([url, params]);
    } else {
      await this.router.navigate([url]);
    }
  }

  public async navigateForward(url: string, params?: any) {
    if (params) {
      await this.navCtrl.navigateForward([url, params]);
    } else {
      await this.navCtrl.navigateForward([url]);
    }
  }

  public async navigateBack(fallbackUrl?: string) {
    const changePasswordUrl = this.router.routerState.snapshot.url
    await this.navCtrl.pop();
    if (this.router.routerState.snapshot.url === changePasswordUrl) {
      if (!fallbackUrl) {
        await this.router.navigate([this.defaultFallbackUrl]);
      } else {
        await this.router.navigate([fallbackUrl]);
      }
    }
  }

}
