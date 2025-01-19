import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';
import { ApiService } from 'src/app/core/services/api.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  id="";
  breadCrumbItems!: Array<{}>;
  documents:any=[];
  enquiry:any=[];
  deliveryPartners:any=[];
  assignDeliveries:any=[];
  paymentAmount = 0;
  deliveryPartner:any="";
  type:any="";
  address:any="";
  city:any="";
  state:any="";
  pincode:any="";

  description:any="";
  date:any="";

  dropAddress:any="";
  dropCity:any="";
  dropState:any="";
  dropPincode:any="";
  items:any=[];



  baseURL=environment.baseURL;
  delivery:boolean=false;
  paymentReq:boolean=false;
  update:boolean=false;

  constructor(public route:ActivatedRoute,public apiS:ApiService,public title:Title,public appC:AppComponent,public toast:ToastrService) { }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Enquiry' },
      { label: 'Documents List', active: true }
    ];
    this.title.setTitle("View Documents - "+ this.appC.title);
    this.route.queryParams.subscribe(data=>{
      this.id = data.id;
      this.fetchdata();
    })
  }

  fetchdata(){
    this.apiS.getAllDelivery().subscribe(data=>{
      this.deliveryPartners = data.data;
    })
    this.apiS.getSingleEnquiry(this.id).subscribe(data=>{
      this.documents= data.data.documents;
      this.enquiry = data.data;
    })
    this.apiS.getAllAssignDeliveryByEnquiry(this.id).subscribe(data=>{
      this.assignDeliveries = data.data;
    })
  }

  addressSame(event:any){
    if(event.target.checked){
      this.dropAddress = this.address;
      this.dropCity = this.city;
      this.dropState = this.state;
      this.dropPincode = this.pincode;
    }else{
      this.dropAddress = '';
      this.dropCity = '';
      this.dropState = '';
      this.dropPincode = '';
    }
  }

  delete(i:any){
    this.items.splice(i,1);
  }

  deleteUpdate(i:any){
    this.enquiry.updates.splice(i,1);
    const data = JSON.stringify({
      "updates":this.enquiry.updates
    });
    this.apiS.updateEnquiry(data,this.id).subscribe(result => {
      if (result.status === 'error') {
        this.toast.error(result.message);
      } else {
        this.toast.success("Update Deleted Successfully");
      }
    },error=>{
      this.toast.error(error.message);
    });
  }

  deletePayemntRequest(i:any){
    this.enquiry.payments.splice(i,1);
    const data = JSON.stringify({
      "payments":this.enquiry.payments
    });
    this.apiS.updateEnquiry(data,this.id).subscribe(result => {
      if (result.status === 'error') {
        this.toast.error(result.message);
      } else {
        this.toast.success("Payment Request Deleted Successfully");
        this.paymentReq = false;
      }
    },error=>{
      this.toast.error(error.message);
    });
  }

  add(){
    this.items.push({task:''});
  }

  submitPaymentReq(){
    this.enquiry.payments.push({status:"pending",description:this.description,amount:this.paymentAmount});
    const data = JSON.stringify({
      "payments":this.enquiry.payments
    });
    this.apiS.updateEnquiry(data,this.id).subscribe(result => {
      if (result.status === 'error') {
        this.toast.error(result.message);
      } else {
        this.toast.success("Payment Request Created Successfully");
        this.description = '';
        this.paymentReq = false;
      }
    },error=>{
      this.toast.error(error.message);
    });
  }

  submitUpdate(){
    this.enquiry.updates.push({date:this.date,description:this.description});
    const data = JSON.stringify({
      "updates":this.enquiry.updates
    });
    this.apiS.updateEnquiry(data,this.id).subscribe(result => {
      if (result.status === 'error') {
        this.toast.error(result.message);
      } else {
        this.toast.success("Update Created Successfully");
        this.description = '';
        this.date = '';
        this.update = false;
      }
    },error=>{
      this.toast.error(error.message);
    });
  }

  submit(){
    const data = JSON.stringify({
      "deliveryPartner":this.deliveryPartner,
      "enquiry":this.id,
      "type":this.type,
      "pickupAddress":this.address,
      "pickupCity":this.city,
      "pickupState":this.state,
      "pickupPincode":this.pincode,
      "dropAddress":this.dropAddress,
      "dropCity":this.dropCity,
      "dropState":this.dropState,
      "dropPincode":this.dropPincode,
      "tasks":this.items
    });
    this.apiS.createAssignDelivery(data).subscribe(result => {
      if (result.status === 'error') {
        this.toast.error(result.message);
      } else {
        this.toast.success("Delivery Partner Assigned Successfully");
        this.clearAssign();
        this.delivery = false;
      }
    },error=>{
      this.toast.error(error.message);
    });
  }
  
  clearAssign(){
    this.deliveryPartner="";
    this.type = "";
    this.address="";
    this.city="";
    this.state="";
    this.pincode="";

    this.dropAddress="";
    this.dropCity="";
    this.dropState="";
    this.dropPincode="";
    this.items=[];
  }

  markAsComplete() {
    Swal.fire({
      title: 'You are about to complete this enquiry ?',
      icon: 'success',
      showCancelButton: true,
      confirmButtonColor: '#f46a6a',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Close'
    }).then(result => {
      if (result.value) {
        this.apiS.updateEnquiry(JSON.stringify({status: 'success'}),this.id).subscribe(data=>{
          if (data.status === 'error') {
            this.toast.error(data.message);
          } else {
            Swal.fire('Completed!', 'This enqiry is completed.', 'success');
            this.enquiry.status = 'success';
            this.fetchdata();
          }
        },error=>{
          this.toast.error(error.message);
        });
      }
    });
  }

  approve(i:any){
    this.documents[i].status = 'APPROVED';
    const data = JSON.stringify({
      "documents":this.documents,
    });
    this.apiS.updateEnquiry(data,this.id).subscribe(result => {
      if (result.status === 'error') {
        this.toast.error(result.message);
      } else {
        this.toast.success("Document Approved Successfully");
      }
    },error=>{
      this.toast.error(error.message);
    });
  }

  reject(i:any){
    this.documents[i].status = 'REJECT';
    const data = JSON.stringify({
      "documents":this.documents,
    });
    this.apiS.updateEnquiry(data,this.id).subscribe(result => {
      if (result.status === 'error') {
        this.toast.error(result.message);
      } else {
        this.toast.success("Document Reject Successfully");
      }
    },error=>{
      this.toast.error(error.message);
    });
  }

}
