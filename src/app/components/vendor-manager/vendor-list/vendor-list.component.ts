import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})
export class VendorListComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  btnClick= function () {
    this.router.navigateByUrl('/vendor-manager/vendor-details');
  };
}
