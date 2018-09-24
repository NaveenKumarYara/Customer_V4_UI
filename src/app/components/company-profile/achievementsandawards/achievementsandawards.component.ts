import { Component, OnInit,Input } from '@angular/core';
import {  GetCompanyPartner } from '../../../../models/GetCompanyPartner';
import { GetCompanyCertification } from '../../../../models/GetCompanyCertification';
import { GetCompanyAchievement } from '../../../../models/GetCompanyAchievement';
@Component({
  selector: 'app-achievementsandawards',
  templateUrl: './achievementsandawards.component.html',
  styleUrls: ['./achievementsandawards.component.css']
})
export class AchievementsandawardsComponent implements OnInit {
  @Input() getcompanypertner:GetCompanyPartner;
  @Input() getcompanycertification: GetCompanyCertification;
  @Input() getcompanyachivements: GetCompanyAchievement;
  constructor() { }

  ngOnInit() {
  }

}
