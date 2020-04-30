import { Component, OnInit, Input,AfterViewInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { DashboardStatistics } from '../../../../models/dashboardstatistics';
import {  ApplicantStatistics } from '../../../../models/applicantstatistics';
import { StatsDasboard } from '../../../../models/StatsDasboard';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { DashboardService } from '../dashboard.service';
import { Color, Label } from 'chart.js';
import { toArray } from 'rxjs/operator/toArray';
import { IfObservable } from 'rxjs/observable/IfObservable';
import { filter } from 'rxjs/operator/filter';
declare var $: any;
@Component({
  selector: 'app-dashboard-jobsview',
  templateUrl: './dashboard-jobsview.component.html',
  styleUrls: ['./dashboard-jobsview.component.css']
})
export class DashboardJobsviewComponent implements OnInit {
  customer:any;
  customerId:any;
  jobposted:string;
  userId:any;  
  jobFilter:number=0;
  statsFilter:number=0;
  allpostedcount =[];
  postedcount = [];
  mwpostedcount = [];
  mpostedcount = [];
  filterval:number=0;

  allcount = [];
  count = [];
  mwcount = [];
  mcount = [];


  allcancelcount = []; 
  cancelcount = [];
  mwcancelcount = [];
  mcancelcount = [];
 
  allapplicantCount=[];
  applicantCount=[];
  mapplicantCount=[];
  yapplicantCount=[];

  allShortListedCount=[];
  ShortListedCount=[];
  mShortListedCount=[];
  yShortListedCount=[];

  allInterviewCount=[];
  InterviewCount=[];
  mInterviewCount=[];
  yInterviewCount=[];

  allHiredCount=[];
  HiredCount=[];
  mHiredCount=[];
  yHiredCount=[];

 alldashboardStatisticsForJobsPosted: StatsDasboard[]=[];
 dashboardStatisticsForJobsPosted: StatsDasboard[]=[];
 mwdashboardStatisticsForJobsPosted: StatsDasboard[]=[];
 mdashboardStatisticsForJobsPosted: StatsDasboard[]=[];

  alldashboardStatisticsForJobsFilled: StatsDasboard[]=[];
  dashboardStatisticsForJobsFilled: StatsDasboard[]=[];
  mwdashboardStatisticsForJobsFilled: StatsDasboard[]=[];
  mdashboardStatisticsForJobsFilled: StatsDasboard[]=[];

  alldashboardStatisticsForJobsCancelled: StatsDasboard[]=[];
  dashboardStatisticsForJobsCancelled: StatsDasboard[]=[];
  mwdashboardStatisticsForJobsCancelled: StatsDasboard[]=[];
  mdashboardStatisticsForJobsCancelled: StatsDasboard[]=[];

 allcustomerApplicantsStatistics: StatsDasboard[]=[];
 customerApplicantsStatistics: StatsDasboard[]=[];
 mcustomerApplicantsStatistics: StatsDasboard[]=[];
 ycustomerApplicantsStatistics: StatsDasboard[]=[];

 allcustomerShortListedStatistics: StatsDasboard[]=[];
 customerShortListedStatistics: StatsDasboard[]=[];
 mcustomerShortListedStatistics: StatsDasboard[]=[];
 ycustomerShortListedStatistics: StatsDasboard[]=[];

 allcustomerInterviewStatistics: StatsDasboard[]=[];
 customerInterviewStatistics: StatsDasboard[]=[];
 mcustomerInterviewStatistics: StatsDasboard[]=[];
 ycustomerInterviewStatistics: StatsDasboard[]=[];

 allcustomerHiredStatistics: StatsDasboard[]=[];
 customerHiredStatistics: StatsDasboard[]=[];
 mcustomerHiredStatistics: StatsDasboard[]=[];
 ycustomerHiredStatistics: StatsDasboard[]=[];

   dashboardstatistics: DashboardStatistics;
   dashboardstats:DashboardStatistics;
    applicantStatistics: ApplicantStatistics;


    constructor(private route: ActivatedRoute, private dashboardservice: DashboardService, private router: Router) {
      this.customer = JSON.parse(sessionStorage.getItem('userData'));
      this.customerId =this.customer.CustomerId;
      this.userId=this.customer.UserId;
    }


     
    // public lineChartDataall: Array<any> = [
    //   {data: this.alljobposted, label: 'JobsPosted'},
    //   {data: this.allcount, label: 'JobsFilled'},  
    //   {data: this.allcancelcount, label: 'JobsCancelled' }
    // ];

    public lineChartDataall: Array<any> = [
      {data: this.allpostedcount, label: 'JobsPosted'},
      {data: this.allcount, label: 'JobsFilled'},
      {data: this.allcancelcount, label: 'JobsCancelled' }
    ];

    public lineChartData: Array<any> = [
      {data: this.postedcount, label: 'JobsPosted'},
      {data: this.count, label: 'JobsFilled'},
      {data: this.cancelcount, label: 'JobsCancelled' }
    ];

    public lineChartDatamw: Array<any> = [
      {data: this.mwpostedcount, label: 'JobsPosted'},
      {data: this.mwcount, label: 'JobsFilled'},
      {data: this.mwcancelcount, label: 'JobsCancelled' }
    ];

    public lineChartDatam: Array<any> = [
      {data: this.mpostedcount, label: 'JobsPosted'},
      {data: this.mcount, label: 'JobsFilled'},
      {data: this.mcancelcount, label: 'JobsCancelled' }
    ];

    public ApplicantlineChartDataAll: Array<any> = [
      {data: this.allapplicantCount,label: 'Applicant'},
      {data: this.allShortListedCount,label: 'ShortListed'},
      {data: this.allInterviewCount,label: 'Interview'},
      {data: this.allHiredCount,label: 'Hired'}
    ];

    public ApplicantlineChartData: Array<any> = [
      {data: this.applicantCount,label: 'Applicant'},
      {data: this.ShortListedCount,label: 'ShortListed'},
      {data: this.InterviewCount,label: 'Interview'},
      {data: this.HiredCount,label: 'Hired'}
    ];

    public ApplicantlineChartDatam: Array<any> = [
      {data: this.mapplicantCount,label: 'Applicant'},
      {data: this.mShortListedCount,label: 'ShortListed'},
      {data: this.mInterviewCount,label: 'Interview'},
      {data: this.mHiredCount,label: 'Hired'}
    ];



    public ApplicantlineChartDatay: Array<any> = [
      {data: this.yapplicantCount,label: 'Applicant'},
      {data: this.yShortListedCount,label: 'ShortListed'},
      {data: this.yInterviewCount,label: 'Interview'},
      {data: this.yHiredCount,label: 'Hired'}
    ];

 

   
    public lineChartLabelsall: Label[] = ['Year2019','Year2020'];
    public lineChartLabels: Label[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday','Saturday','Sunday'];
    public lineChartLabelsmw: Label[] = ['week1','week2','week3','week4','week5'];
    public lineChartLabelsm: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'];


    public lineChartOptionsall: (ChartOptions & { annotation: any }) = {
      responsive: true,
      scales: {
      xAxes: [{
        //labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        labels: ['Year2019','Year2020']
         
              }],

      }
    };

    public lineChartOptions: (ChartOptions & { annotation: any }) = {
      responsive: true,
      scales: {
      xAxes: [{
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        //labels: ['1', '2', '3', '4', '4', '5', '6']
              }],
             
      }
    };

    public lineChartOptionsmw: (ChartOptions & { annotation: any }) = {
      responsive: true,
      scales: {
      xAxes: [{
        //labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        labels: ['week1','week2','week3','week4','week5']
              }],
            
      }
    };

    public lineChartOptionsm: (ChartOptions & { annotation: any }) = {
      responsive: true,
      scales: {
      xAxes: [{
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul','Aug','Sep','Oct','Nov','Dec']
              }],
             
      }
    };


  public lineChartColors: Array<any> = [
    { //  job posted
      backgroundColor: 'rgba(172,154,249,0.2)',
      borderColor: 'rgba(172,154,249,1)',
      pointBackgroundColor: 'rgba(172,154,249,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(172,154,249,0.8)'
    },
    { // job filled
      backgroundColor: 'rgba(132,222,203,0.2)',
      borderColor: 'rgba(132,222,203,1)',
      pointBackgroundColor: 'rgba(132,222,203,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(132,222,203,1)'
    },
    { //  jobs cancelled
      backgroundColor: 'rgba(167,217,217,0.2)',
      borderColor: 'rgba(167,217,217,1)',
      pointBackgroundColor: 'rgba(167,217,217,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(167,217,217,0.8)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  public lineChartColors1: Color[] = [
    { //  job posted
      backgroundColor: 'rgba(172,154,249,0.2)',
      borderColor: 'rgba(172,154,249,1)',
      pointBackgroundColor: 'rgba(172,154,249,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(172,154,249,0.8)'
    },
    { // job filled
      backgroundColor: 'rgba(132,222,203,0.2)',
      borderColor: 'rgba(132,222,203,1)',
      pointBackgroundColor: 'rgba(132,222,203,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(132,222,203,1)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];


  public lineChartLegend = true;
  public lineChartType = 'line';



  ChangeFilter(filter=3)
  {
     this.JobPostedStats(filter);
     this.JobFilledStats(filter);
     this.JobCancelled(filter);
     this.ApplicantStats(filter);
     this.ShortlistStats(filter);
     this.InterviewStats(filter);
     this.HiredStats(filter);
  }

populateDashboardallStatistics(filter=0) {
  this.statsFilter=filter;
    return this.dashboardservice.getDashboardStatistics(this.customerId,this.userId,filter).subscribe(res => {        
      this.dashboardstatistics = res;
    });

    //this.dashboardservice.getDashboardStatistics().subscribe((res: any) => {
    //    console.log(res);
    //    this.dashboardstatistics = res;
    //});   
}
populateApplicantsStatistics(filter=0) {
    return this.dashboardservice.getApplicantsStatistics(this.customerId,this.userId,filter).subscribe(res => {
        this.applicantStatistics = res;
    }); 
}

  JobPostedStats(filter)
  {
            if(filter==0)
            {
              return this.dashboardservice.GetDashboardStatisticsForJobsPosted(this.customerId,filter).subscribe(result => {
                this.dashboardStatisticsForJobsPosted= result;
              if(result.length>0)
              {

                  this.lineChartLabels.forEach(
                    (e1)=>
                    this.dashboardStatisticsForJobsPosted.forEach((e2)=> 
                    {
                      if(e1 == e2.PostedValue)
                      { 
                        if(e2.JobCount!==null||e2.JobCount!=undefined)
                        {
                          this.postedcount.push(e2.JobCount);
                        }          
                       
                      }
                    }      
                    ))                                    
              }
            });
            }
            if(filter==1)
            {
              return this.dashboardservice.GetDashboardStatisticsForJobsPosted(this.customerId,filter).subscribe(mresult => {
                this.mdashboardStatisticsForJobsPosted= mresult;
              if(mresult.length>0)
              {
                
                this.lineChartLabelsm.forEach(
                  (me1)=>
                  this.mdashboardStatisticsForJobsPosted.forEach((me2)=> 
                  {
                    if(me1 === me2.PostedValue)
                    {           
                      this.mpostedcount.push(me2.JobCount);
                    }
                  }      
                  ))         
              }
            });
            }
            if(filter==2)
            {
              return this.dashboardservice.GetDashboardStatisticsForJobsPosted(this.customerId,filter).subscribe(mwresult => {
                this.mwdashboardStatisticsForJobsPosted= mwresult;
              if(mwresult.length>0)
              {
                
                this.lineChartLabelsmw.forEach(
                  (mwe1)=>
                  this.mwdashboardStatisticsForJobsPosted.forEach((mwe2)=> 
                  {
                    if(mwe1 === mwe2.PostedValue)
                    {           
                      this.mwpostedcount.push(mwe2.JobCount);
                    }
                  }      
                  ))         
              }
            });
            } 
            if(filter==3)
            {
              return this.dashboardservice.GetDashboardStatisticsForJobsPosted(this.customerId,filter).subscribe(allresult => {
                this.alldashboardStatisticsForJobsPosted= allresult;
              if(allresult.length>0)
              {
                
                if(this.lineChartLabelsall.length==this.alldashboardStatisticsForJobsPosted.length)
                {
                  this.lineChartLabelsall.forEach(
                    (ame1)=>
                    this.alldashboardStatisticsForJobsPosted.forEach((ame2)=> 
                    {
                      if(ame1 == ame2.PostedValue)
                      {           
                        this.allpostedcount.push(ame2.JobCount);
                      }
                    }      
                    ))   
                }
                else
                {
                  this.lineChartLabelsall.forEach(
                    (ame1)=>
                    this.alldashboardStatisticsForJobsPosted.forEach((ame2)=> 
                    {
                      if(ame1 == ame2.PostedValue)
                      {           
                        this.allpostedcount.push(ame2.JobCount);
                      }
                      if(ame1 != ame2.PostedValue)
                      {
                        this.allpostedcount.push(0);
                      }
                    }      
                    ))   
                }
                      
              }
            });
            }     
  }

  JobFilledStats(filter)
  {
            if(filter==0)
            {
            return this.dashboardservice.GetDashboardStatisticsForJobsFilled(this.customerId,filter).subscribe(result1 => {
              this.dashboardStatisticsForJobsFilled= result1;
              if(result1.length>0)
              {
                this.lineChartLabels.forEach(
                  (fe1)=>
                  this.dashboardStatisticsForJobsFilled.forEach((ge2)=> 
                  {
                    if(fe1 === ge2.PostedValue)
                    {           
                      this.count.push(ge2.JobCount);
                    }
                  }      
                  ))         
              }
      
              });
            }

            
            if(filter==1)
            {
            return this.dashboardservice.GetDashboardStatisticsForJobsFilled(this.customerId,filter).subscribe(res1 => {
              this.mdashboardStatisticsForJobsFilled= res1;
              if(res1.length>0)
              {
                
                this.lineChartLabelsm.forEach(
                  (fme1)=>
                  this.mdashboardStatisticsForJobsFilled.forEach((fme2)=> 
                  {
                    if(fme1 === fme2.PostedValue)
                    {           
                      this.mcount.push(fme2.JobCount);
                    }
                  }      
                  ))  
        
                        
              }


              

      
              });
            }

            if(filter==2)
            {
            return this.dashboardservice.GetDashboardStatisticsForJobsFilled(this.customerId,filter).subscribe(wres1 => {
              this.mwdashboardStatisticsForJobsFilled= wres1;
              if(wres1.length>0)
              {
                
                this.lineChartLabelsmw.forEach(
                  (fmwe1)=>
                  this.mwdashboardStatisticsForJobsFilled.forEach((fmwe2)=> 
                  {
                    if(fmwe1 === fmwe2.PostedValue)
                    {           
                      this.mwcount.push(fmwe2.JobCount);
                    }
                  }      
                  ))  
        
                        
              }


              

      
              });
            }

            if(filter==3)
            {
            return this.dashboardservice.GetDashboardStatisticsForJobsFilled(this.customerId,filter).subscribe(allres1 => {
              this.alldashboardStatisticsForJobsFilled= allres1;
              if(allres1.length>0)
              {              
                if(this.lineChartLabelsall.length==this.alldashboardStatisticsForJobsFilled.length)
                {
                  this.lineChartLabelsall.forEach(
                    (alfme1)=>
                    this.alldashboardStatisticsForJobsFilled.forEach((afme2)=> 
                    {
                      if(alfme1 == afme2.PostedValue)
                      {           
                        this.allcount.push(afme2.JobCount);
                      }
                    }      
                    ))  
                }
                else
                {
                  this.lineChartLabelsall.forEach(
                    (alfme1)=>
                    this.alldashboardStatisticsForJobsFilled.forEach((afme2)=> 
                    {
                      if(alfme1 == afme2.PostedValue)
                      {           
                        this.allcount.push(afme2.JobCount);
                      }
                      if(alfme1 != afme2.PostedValue)
                      {           
                        this.allcount.push(0);
                      }
                    }      
                    ))  
                }
            
        
                        
              }


              

      
              });
            }
       
       
          
     
  }


  JobCancelled(filter)
  {
    if(filter==0)
    {
      return this.dashboardservice.GetDashboardStatisticsForJobsCancelled(this.customerId,filter).subscribe(result2 => {
        this.dashboardStatisticsForJobsCancelled= result2;
        if(result2.length>0)
        {
          this.lineChartLabels.forEach(
            (cre1)=>
            this.dashboardStatisticsForJobsCancelled.forEach((cre2)=> 
            {
              if(cre1 === cre2.PostedValue)
              {           
                this.cancelcount.push(cre2.JobCount);
              }
            }      
            ))         
        }
      
    });
    }
    if(filter==1)
    {
      return this.dashboardservice.GetDashboardStatisticsForJobsCancelled(this.customerId,filter).subscribe(resultc2 => {
        this.mdashboardStatisticsForJobsCancelled= resultc2;
        if(resultc2.length>0)
        {
          this.lineChartLabelsm.forEach(
            (ce1)=>
            this.mdashboardStatisticsForJobsCancelled.forEach((ce2)=> 
            {
              if(ce1 === ce2.PostedValue)
              {        
                this.mcancelcount.push(ce2.JobCount);
              }
            }      
            ))         
        }
      
    });
    }
    if(filter==2)
    {
      return this.dashboardservice.GetDashboardStatisticsForJobsCancelled(this.customerId,filter).subscribe(wresultc2 => {
        this.mwdashboardStatisticsForJobsCancelled= wresultc2;
        if(wresultc2.length>0)
        {
          this.lineChartLabelsmw.forEach(
            (wce1)=>
            this.mwdashboardStatisticsForJobsCancelled.forEach((wce2)=> 
            {
              if(wce1 === wce2.PostedValue)
              {       
                this.mwcancelcount.push(wce2.JobCount);
              }
            }      
            ))         
        }
      
    });
    }
    if(filter==3)
    {
      return this.dashboardservice.GetDashboardStatisticsForJobsCancelled(this.customerId,filter).subscribe(aresultc2 => {
        this.alldashboardStatisticsForJobsCancelled= aresultc2;
        if(aresultc2.length>0)
        {
          if(this.lineChartLabelsall.length==this.alldashboardStatisticsForJobsCancelled.length)
          {
            this.lineChartLabelsall.forEach(
              (ace1)=>
              this.alldashboardStatisticsForJobsCancelled.forEach((ace2)=> 
              {
                if(ace1 == ace2.PostedValue)
                {      
                  this.allcancelcount.push(ace2.JobCount);
                }
              }      
              ))       
          }
          else
          {
            this.lineChartLabelsall.forEach(
              (ace1)=>
              this.alldashboardStatisticsForJobsCancelled.forEach((ace2)=> 
              {
                if(ace1 == ace2.PostedValue)
                {      
                  this.allcancelcount.push(ace2.JobCount);
                }
                if(ace1 != ace2.PostedValue)
                {      
                  this.allcancelcount.push(0);
                }
              }      
              ))       
          }
       
        }
      
    });
    }
  

  }


  ApplicantStats(filter=0)
  {
            if(filter==0)
            {
              return this.dashboardservice.GetCustomerApplicantsStatistics(this.customerId,filter).subscribe(aplresult => {
                this.customerApplicantsStatistics= aplresult;
              if(aplresult.length>0)
              {
                this.lineChartLabels.forEach(
                  (ae)=>
                  this.customerApplicantsStatistics.forEach((ca)=> 
                  {
                    if(ae === ca.PostedValue)
                    { 
                      if(ca.JobCount!==null||ca.JobCount!=undefined)
                      {
                        this.applicantCount.push(ca.JobCount);
                      }          
                     
                    }
                  }      
                  ))         
              }
            });
            }
            if(filter==1)
            {
              return this.dashboardservice.GetCustomerApplicantsStatistics(this.customerId,filter).subscribe(yapres=> {
                this.ycustomerApplicantsStatistics= yapres;
              if(yapres.length>0)
              {
                
                this.lineChartLabelsm.forEach(
                  (ye1)=>
                  this.ycustomerApplicantsStatistics.forEach((ye2)=> 
                  {
                    if(ye1 === ye2.PostedValue)
                    {           
                      this.yapplicantCount.push(ye2.JobCount);
                    }
                  }      
                  ))         
              }
            });
            }   
            if(filter==2)
            {
              return this.dashboardservice.GetCustomerApplicantsStatistics(this.customerId,filter).subscribe(ymapres=> {
                this.mcustomerApplicantsStatistics= ymapres;
              if(ymapres.length>0)
              {
                
                this.lineChartLabelsmw.forEach(
                  (yme1)=>
                  this.mcustomerApplicantsStatistics.forEach((yme2)=> 
                  {
                    if(yme1 === yme2.PostedValue)
                    {           
                      this.mapplicantCount.push(yme2.JobCount);
                    }
                  }      
                  ))         
              }
            });
            }  
            if(filter==3)
            {
              return this.dashboardservice.GetCustomerApplicantsStatistics(this.customerId,filter).subscribe(mapres=> {
                this.allcustomerApplicantsStatistics= mapres;
              if(mapres.length>0)
              {
                
                this.lineChartLabelsall.forEach(
                  (ymwe1)=>
                  this.allcustomerApplicantsStatistics.forEach((ywme2)=> 
                  {
                    if(ymwe1 === ywme2.PostedValue)
                    {           
                      this.allapplicantCount.push(ywme2.JobCount);
                    }
                  }      
                  ))         
              }
            });
            } 
  }

  ShortlistStats(filter=0)
  {

    if(filter==0)
    {
      return this.dashboardservice.GetCustomerShortListedStatistics(this.customerId,filter).subscribe(aplsresult => {
        this.customerShortListedStatistics= aplsresult;
      if(aplsresult.length>0)
      {
        this.lineChartLabels.forEach(
          (ae1)=>
          this.customerShortListedStatistics.forEach((cas)=> 
          {
            if(ae1 === cas.PostedValue)
            { 
              if(cas.JobCount!==null||cas.JobCount!=undefined)
              {
                this.ShortListedCount.push(cas.JobCount);
              }          
             
            }
          }      
          ))         
      }
    });
    }
    if(filter==1)
    {
      return this.dashboardservice.GetCustomerShortListedStatistics(this.customerId,filter).subscribe(yapsres=> {
        this.ycustomerShortListedStatistics= yapsres;
      if(yapsres.length>0)
      {
        
        this.lineChartLabelsm.forEach(
          (yes1)=>
          this.ycustomerShortListedStatistics.forEach((yes2)=> 
          {
            if(yes1 === yes2.PostedValue)
            {           
              this.yShortListedCount.push(yes2.JobCount);
            }
          }      
          ))         
      }
    });
    } 
    if(filter==2)
    {
      return this.dashboardservice.GetCustomerShortListedStatistics(this.customerId,filter).subscribe(yampsres=> {
        this.mcustomerShortListedStatistics= yampsres;
      if(yampsres.length>0)
      {
        
        this.lineChartLabelsmw.forEach(
          (yesm1)=>
          this.mcustomerShortListedStatistics.forEach((yes2)=> 
          {
            if(yesm1 === yes2.PostedValue)
            {           
              this.mShortListedCount.push(yes2.JobCount);
            }
          }      
          ))         
      }
    });
    }  
    if(filter==3)
    {
      return this.dashboardservice.GetCustomerShortListedStatistics(this.customerId,filter).subscribe(ywapsres=> {
        this.allcustomerShortListedStatistics= ywapsres;
      if(ywapsres.length>0)
      {
        
        this.lineChartLabelsall.forEach(
          (yes1)=>
          this.allcustomerShortListedStatistics.forEach((yes2)=> 
          {
            if(yes1 === yes2.PostedValue)
            {           
              this.allShortListedCount.push(yes2.JobCount);
            }
          }      
          ))         
      }
    });
    }   

  }

  InterviewStats(filter=0)
  {

    if(filter==0)
    {
      return this.dashboardservice.GetCustomerInterviewStatistics(this.customerId,filter).subscribe(apliresult => {
        this.customerInterviewStatistics= apliresult;
      if(apliresult.length>0)
      {
        this.lineChartLabels.forEach(
          (aei)=>
          this.customerInterviewStatistics.forEach((cai)=> 
          {
            if(aei === cai.PostedValue)
            { 
              if(cai.JobCount!==null||cai.JobCount!=undefined)
              {
                this.InterviewCount.push(cai.JobCount);
              }          
             
            }
          }      
          ))         
      }
    });
    }
    if(filter==1)
    {
      return this.dashboardservice.GetCustomerInterviewStatistics(this.customerId,filter).subscribe(yapires=> {
        this.ycustomerInterviewStatistics= yapires;
      if(yapires.length>0)
      {
        
        this.lineChartLabelsm.forEach(
          (yesi)=>
          this.ycustomerInterviewStatistics.forEach((yesi2)=> 
          {
            if(yesi === yesi2.PostedValue)
            {           
              this.yInterviewCount.push(yesi2.JobCount);
            }
          }      
          ))         
      }
    });
    }  

    if(filter==2)
    {
      return this.dashboardservice.GetCustomerInterviewStatistics(this.customerId,filter).subscribe(yapimres=> {
        this.mcustomerInterviewStatistics= yapimres;
      if(yapimres.length>0)
      {
        
        this.lineChartLabelsmw.forEach(
          (yesim)=>
          this.mcustomerInterviewStatistics.forEach((yesi2)=> 
          {
            if(yesim === yesi2.PostedValue)
            {           
              this.mInterviewCount.push(yesi2.JobCount);
            }
          }      
          ))         
      }
    });
    } 

    if(filter==3)
    {
      return this.dashboardservice.GetCustomerInterviewStatistics(this.customerId,filter).subscribe(yapiares=> {
        this.allcustomerInterviewStatistics= yapiares;
      if(yapiares.length>0)
      {
        
        this.lineChartLabelsall.forEach(
          (yesi)=>
          this.allcustomerInterviewStatistics.forEach((yesi2)=> 
          {
            if(yesi === yesi2.PostedValue)
            {           
              this.allInterviewCount.push(yesi2.JobCount);
            }
          }      
          ))         
      }
    });
    } 

  }

  HiredStats(filter=0)
  {

    if(filter==0)
    {
      return this.dashboardservice.GetCustomerHiredStatistics(this.customerId,filter).subscribe(aplshresult => {
        this.customerHiredStatistics= aplshresult;
      if(aplshresult.length>0)
      {
        this.lineChartLabels.forEach(
          (ahe1)=>
          this.customerHiredStatistics.forEach((cash)=> 
          {
            if(ahe1 === cash.PostedValue)
            { 
              if(cash.JobCount!==null||cash.JobCount!=undefined)
              {
                this.HiredCount.push(cash.JobCount);
              }          
             
            }
          }      
          ))         
      }
    });
    }
    if(filter==1)
    {
      return this.dashboardservice.GetCustomerHiredStatistics(this.customerId,filter).subscribe(yapshres=> {
        this.ycustomerHiredStatistics= yapshres;
      if(yapshres.length>0)
      {
        
        this.lineChartLabelsm.forEach(
          (yesh1)=>
          this.ycustomerShortListedStatistics.forEach((yesh2)=> 
          {
            if(yesh1 === yesh2.PostedValue)
            {           
              this.yHiredCount.push(yesh2.JobCount);
            }
          }      
          ))         
      }
    });
    } 
    
    if(filter==2)
    {
      return this.dashboardservice.GetCustomerHiredStatistics(this.customerId,filter).subscribe(yapshres=> {
        this.mcustomerHiredStatistics= yapshres;
      if(yapshres.length>0)
      {
        
        this.lineChartLabelsmw.forEach(
          (myesh1)=>
          this.mcustomerShortListedStatistics.forEach((yesh2)=> 
          {
            if(myesh1 === yesh2.PostedValue)
            {           
              this.mHiredCount.push(yesh2.JobCount);
            }
          }      
          ))         
      }
    });
    }

    if(filter==3)
    {
      return this.dashboardservice.GetCustomerHiredStatistics(this.customerId,filter).subscribe(yapshres1=> {
        this.allcustomerHiredStatistics= yapshres1;
      if(yapshres1.length>0)
      {
        
        this.lineChartLabelsall.forEach(
          (yesh1)=>
          this.allcustomerShortListedStatistics.forEach((ayesh2)=> 
          {
            if(yesh1 === ayesh2.PostedValue)
            {           
              this.allHiredCount.push(ayesh2.JobCount);
            }
          }      
          ))         
      }
    });
    }

  }


  ngOnInit() {
    this.populateDashboardallStatistics(0);
    this.populateApplicantsStatistics(0);
    this.ChangeFilter(3);
    this.ChangeFilter(0);
    this.ChangeFilter(2);
    this.ChangeFilter(1);

    setInterval(() => {
      this.lineChartDataall=new Array(
        {data: this.allpostedcount, label: 'JobsPosted'},
        {data: this.allcount, label: 'JobsFilled'},
        {data: this.allcancelcount, label: 'JobsCancelled' }
      )}, 1000);
  
    (function ($) {
      function navLineResizeHandler() {
        var nav = $('.nav-tabs');
        var activeLink = nav.children('li.active');
        var activeLine = nav.children('.active-line');
        var windowWidth = $(window).scrollLeft();
    
        $.each(activeLine, function (index, element) {
          var $element = $(element);
          $element.css({
            width: $element.parent().children(".active").css("width"),
            left: $element.parent().children(".active").position().left - windowWidth
          });
        });
      }
    
      function navLineClickHandler() {
        var btnWidth = $(this).css("width");
        var line = $(this).parent().find(".active-line");
        var btnBox = this.getBoundingClientRect();
        var windowBox = this.parentNode.getBoundingClientRect();
    
        line.css({
          width: btnWidth,
          left: btnBox.left - windowBox.left
        });
      }
    
      $(document).ready(navLineResizeHandler);
    
      $(window).resize(function () {
        setTimeout(navLineResizeHandler, 1000);
      });
    
      var appliedTabBtn = $(".statistics .nav-tabs li");
      var appliedLine = $(".statistics .nav-tabs .active-line");
      appliedTabBtn.on("click", navLineClickHandler);
    
      
    })($);
 
  }






  Jobs(sortBy) {
    localStorage.setItem('orderDate',JSON.stringify(this.statsFilter))
    localStorage.setItem('sortBy', JSON.stringify(sortBy));
    this.router.navigateByUrl('app-manage-jobs');
  }


  // events
  public chartClicked(e: any): void {
    console.log(e);
  }



  public chartHovered(e: any): void {
    console.log(e);
  }
  // events

}
