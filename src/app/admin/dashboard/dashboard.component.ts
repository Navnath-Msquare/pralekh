import { DatePipe } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
 
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  customers:any=[];
  total:any=0;
  available:any=0;
  used:any=0;
   customer:any=0;
  sales:any;
  allData:any=[];
  series:any=[];
  labels:any=[];
  colors:any=[];
  usersLength:any=0;
  distributorsLength:any=0;
  licenseLength:any=0;
  enquiryLength:any=0;

  timeS="";
  date:any = "";


  constructor(public apiS:ApiService,public auth:AuthenticationService,public dateP:DatePipe) {
   }

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    let currentDate = new Date();
    let date=new Date();
    let yesterday = new Date(date.setDate(date.getDate()-7));
    this.date = this.dateP.transform(yesterday,'yyyy-MM-dd')+" to "+this.dateP.transform(currentDate,'yyyy-MM-dd');
     this.breadCrumbItems = [
      
    ];


   let today = new Date()
   let curHr = today.getHours()

   if (curHr < 12) {
     this.timeS = 'Good Morning';
   } else if (curHr < 18) {
     this.timeS = 'Good Afternoon';
   } else {
     this.timeS = 'Good Evening';
   }
    /**
     * Fetches the data
     */
     this.fetchData();

  }

  private fetchData() {
    this.apiS.count().subscribe(data=>{
      this.usersLength = data.data.user;
      this.distributorsLength = data.data.distributor;
      this.licenseLength = data.data.license;
      this.enquiryLength = data.data.enquiry;
    })
    this.apiS.getAllSubs().subscribe(data=>{
      this.customers = data.data;
    })
    this.apiS.getSalesByPlanAdmin().subscribe(data=>{
      this.series = data.series;
      this.labels = data.labels;
      this.colors = data.colors;
      this.allData= data.allData;
      this.sales = {
        series: this.series,
        labels: this.labels,
        chart: {
            type: "donut",
            height: 219,
        },
        plotOptions: {
            pie: {
                donut: {
                    size: "76%",
                },
            },
        },
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: false,
            position: 'bottom',
            horizontalAlign: 'center',
            offsetX: 0,
            offsetY: 0,
            markers: {
                width: 20,
                height: 6,
                radius: 2,
            },
            itemMargin: {
                horizontal: 12,
                vertical: 0
            },
        },
        stroke: {
            width: 0
        },
        yaxis: {
            labels: {
                formatter: function (value:any) {
                    return value + " License";
                }
            },
            tickAmount: 4,
            min: 0
        },
        colors: this.colors
      };
    })

 
 }

 changeDate(event:any){
  
  
  var date = event.target.value.split(' to ');
  console.log(date);
  if(date.length == 2){
    var date1 = date[0];
    var date2 = date[1];
    this.apiS.countByDate(date1,date2).subscribe(data=>{
      this.usersLength = 0;
      this.distributorsLength = 0;
      this.licenseLength = 0;
      this.enquiryLength = 0;
      this.usersLength = data.data.user;
      this.distributorsLength = data.data.distributor;
      this.licenseLength = data.data.license;
      this.enquiryLength = data.data.enquiry;
    })
    this.apiS.getAllSubsByDate(date1,date2).subscribe(data=>{
      
      this.customers = [];
      this.customers = data.data;
      
    })
    this.apiS.getSalesByPlanandDateAdmin(date1,date2).subscribe(data=>{
      this.series=[];
      this.labels=[];
      this.colors=[];
      this.allData=[];
      this.sales={};
      this.series = data.series;
      this.labels = data.labels;
      this.colors = data.colors;
      this.allData= data.allData;
      this.sales = {
        series: this.series,
        labels: this.labels,
        chart: {
            type: "donut",
            height: 219,
        },
        plotOptions: {
            pie: {
                donut: {
                    size: "76%",
                },
            },
        },
        dataLabels: {
            enabled: false,
        },
        legend: {
            show: false,
            position: 'bottom',
            horizontalAlign: 'center',
            offsetX: 0,
            offsetY: 0,
            markers: {
                width: 20,
                height: 6,
                radius: 2,
            },
            itemMargin: {
                horizontal: 12,
                vertical: 0
            },
        },
        stroke: {
            width: 0
        },
        yaxis: {
            labels: {
                formatter: function (value:any) {
                    return value + " License";
                }
            },
            tickAmount: 4,
            min: 0
        },
        colors: this.colors
      };
    })

  }
}


  
}
