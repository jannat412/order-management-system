import { Component } from '@angular/core';
import {AdminTypeService} from '../services/admin-type.service';

@Component({
  selector: 'oms-admin-home',
  templateUrl: './admin-home.component.html'
})
export class AdminHomeComponent {

  constructor(private adminTypeService: AdminTypeService) { }

  adminType = (type: string) => {
    return this.adminTypeService.getAdminType(type);
  };

}
