import { Injectable } from '@angular/core';
import {LocalStorageService} from './local-storage.service';

@Injectable()
export class OrderLocalStorageService {

  private guid: string = '9ca3b2c0-2238-4c7c-931b-bddb0afeaa5d';

  constructor(private localStorageService: LocalStorageService) { }

  getData(): any {
    return this.localStorageService.getValue(this.guid);
  }

  saveData(orderKey: string, data: any) {
    const orderData = {
      order: orderKey,
      data: data
    };
    this.localStorageService.saveValue(this.guid, orderData);
  }

  clearData() {
      this.localStorageService.clearValue(this.guid);
  }
}
