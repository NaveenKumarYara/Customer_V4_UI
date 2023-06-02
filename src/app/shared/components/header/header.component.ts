import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers:[ApiService]
})
export class HeaderComponent implements OnInit {
  customer:any;
  constructor(public _service:ApiService) { 
    this.customer = JSON.parse(localStorage.getItem('customer')||'');
  }

  ngOnInit(): void {
  }
  logout()
  {
    this._service.logout();
  }
}
