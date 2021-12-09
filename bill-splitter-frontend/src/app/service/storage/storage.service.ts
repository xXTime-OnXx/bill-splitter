import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private storage: Storage;

  constructor(private localStorage: Storage) {
    this.setup();
  }

  public async setup() {
    this.storage = await this.localStorage.create();
  }

  public async get(key: string): Promise<string> {
    return await this.storage.get(key);
  }

  public async set(key: string, value: string): Promise<void> {
    await this.storage.set(key, value);
  }

  public async remove(key: string): Promise<void> {
    try {
      await this.storage.remove(key);
    } catch (e) {
      console.log(e);
    }
  }

}
