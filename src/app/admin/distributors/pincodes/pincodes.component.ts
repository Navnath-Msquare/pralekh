import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-pincodes',
  templateUrl: './pincodes.component.html',
  styleUrls: ['./pincodes.component.scss']
})
export class PincodesComponent implements OnInit {

  @ViewChild('table') table: any;
  dataTable:any;
  breadCrumbItems!: Array<{}>;
  pincodesData:any = [];
  pincode:any ="";
  pincodes:any=[];

  distributorId:any = "";

  constructor(public apiS:ApiService, public toast:ToastrService, public route:ActivatedRoute, 
    public modalService:NgbModal
  ) { }

  private fetchData() {
    this.apiS.getAllPincodeByVendor(this.distributorId).subscribe(data=>{
      this.pincodesData = data.data;
      setTimeout(() => {
        if(!this.dataTable){
          this.dataTable = $(this.table.nativeElement);
          this.dataTable.DataTable({
            "searching":   false,
            "lengthChange": false,
            "info":     false
          });
        }
        
      }, 1000);
    });

 
 }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Home' },
      { label: 'Partners'},
      { label: "Pincodes", active:true}
    ];
    this.route.params.subscribe((data: any) => {
      this.distributorId = data.id
      this.fetchData();
    });
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
          this.fetchData();
        }
      },error=>{
        this.toast.error(error.message);
      });
    }else{
      this.toast.error("Enter pincode");
    }
   
  }

  deletePincode(index:any){
    this.pincodes.splice(index,1);
  }

  openModal(content: any) {
    // this.submitted = false;
    this.modalService.open(content, { size: 'md', centered: true });
  }

  addPincode(){
    let pincode = (this.pincode).toString();
    if(pincode.length == 6){
      this.apiS.getAllAllPincodeByPincode(pincode).subscribe(data=>{
        if(data.data.length > 0 && data.data[0].status == 'Active'){
          console.log(data);
          this.pincodes.push({vendorId:this.distributorId,pincode:this.pincode});
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

  
}
