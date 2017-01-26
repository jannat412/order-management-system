import { Component } from '@angular/core';
import {AdminTypeService} from '../services-module/admin-type.service';

@Component({
  selector: 'oms-admin-home',
  templateUrl: './admin-home.component.html'
})
export class AdminHomeComponent {

  constructor(private adminTypeService: AdminTypeService) { }

  private adminType = (type: string) => {
    return this.adminTypeService.getAdminType(type);
  };

}
