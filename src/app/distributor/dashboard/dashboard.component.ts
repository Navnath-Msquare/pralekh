import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { ChartOptions } from './dashboard.model';

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
 pincode:any ="";
 pincodes:any=[];
 pincodesData:any=[];

 timeS="";
 constructor(public apiS:ApiService,public auth:AuthenticationService,public modalService:NgbModal,public toast:ToastrService) {
  }

 ngOnInit(): void {
   /**
    * BreadCrumb
    */
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

 /**
  * Fetches the data
  */
 private fetchData() {
    this.apiS.getSubsByVendor(this.auth.currentUserValue.id).subscribe(data=>{
      this.customers = data.data;
    })
    this.apiS.getAllLicenseCountByVendor(this.auth.currentUserValue.id).subscribe(data=>{
      this.total = data.data.total;
      this.customer = data.data.members;
    })
    this.apiS.getAllPincodeByVendor(this.auth.currentUserValue.id).subscribe(data=>{
      this.pincodesData = data.data;
    });
    this.apiS.getSalesByPlan(this.auth.currentUserValue.id).subscribe(data=>{
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

 openModal(content: any) {
  // this.submitted = false;
  this.modalService.open(content, { size: 'md', centered: true });
}

clear(){
  this.pincode = 0;
}

delete(i:any){
  this.apiS.deletePincode(this.pincodesData[i]._id).subscribe(data => {
    if(data.status == 'success'){
      this.pincodesData.splice(i,1);
      this.toast.success("Pincodes deleted successfully")
    }else{
      this.toast.error(data.message);
    }
  },error =>{
    this.toast.error(error.message);
  })
}
addPincode(){
  let pincode = (this.pincode).toString();
  if(pincode.length == 6){
    this.apiS.getAllAllPincodeByPincode(pincode).subscribe(data=>{
      if(data.data.length > 0 && data.data[0].status == 'Active'){
        console.log(data);
        this.pincodes.push({vendorId:this.auth.currentUserValue.id,pincode:this.pincode});
        this.pincode="";
      }else if(data.data.length > 0 && data.data[0].status == 'Inactive'){
        this.toast.error("Pralekh Service is not available in your area.")
      }else{
        this.toast.error("Pralekh Service is not available in your area.")
      }
    })
    
  }else{
    this.toast.error("Please Enter 6 Digit Pincode");
  }
}

deletePincode(index:any){
  this.pincodes.splice(index,1);
}

purchase(){
  if(this.pincodes.length > 0){
    const data = JSON.stringify({
      "data":this.pincodes
    });
    this.apiS.createPincode(data).subscribe(result => {
      if (result.status === 'error') {
        this.toast.error(result.message);
      } else {
        this.toast.success("Pincodes Successfully Added");
        this.modalService.dismissAll();
      }
    },error=>{
      this.toast.error(error.message);
    });
  }else{
    this.toast.error("Enter pincode");
  }
 
}

 changeDate(event:any){
  
  
  var date = event.target.value.split(' to ');
  if(date.length == 2){
    var date1 = date[0];
    var date2 = date[1];
    this.apiS.getAllSubsByDate(date1,date2).subscribe(data=>{
      
      this.customers = [];
      this.customers = data.data;
      
    })
    this.apiS.getAllLicenseCountDateByVendor(this.auth.currentUserValue.id,date1,date2).subscribe(data=>{
      this.total=0;
      this.customer=0;
      this.total = data.data.total;
      this.customer = data.data.members;
    })
    this.apiS.getSalesByPlanandDate(this.auth.currentUserValue.id,date1,date2).subscribe(data=>{
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
