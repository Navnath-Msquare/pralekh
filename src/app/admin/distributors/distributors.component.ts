import {Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AppComponent } from 'src/app/app.component';
declare var $: any;
import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-distributors',
  templateUrl: './distributors.component.html',
  styleUrls: ['./distributors.component.scss']
})
export class DistributorsComponent implements OnInit {

 
  @ViewChild('table') table: any;
  dataTable:any;
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  data:any=[];
  loader = true;
  searchTerm:any="";
  statusTerm:any="";
  pincodes:any = [];
  id:any = "";
  constructor(private api: ApiService,private toast:ToastrService, public router:Router,public title:Title,public appC:AppComponent,
    public modalS:NgbModal) {
    
  }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
     this.breadCrumbItems = [
      { label: 'Distributors' },
      { label: 'Distributors List', active: true }
    ];

    this.title.setTitle("Distributors - "+this.appC.title)
    
     this._fetchData();

  }

  edit(id:any){
    this.router.navigate(['/admin/distributors/edit'],{
      queryParams:{id: id}
    })
}

details(id:any){
  this.router.navigate(['/admin/distributors/details',id])
}

view(content:any, id:any){
  this.id = id;
  this.api.getAllPincodeByVendor(id).subscribe(data => {
    this.pincodes = data.data;
  })
  this.modalS.open(content,{size:'md','centered':true})
}

    private _fetchData() {
      this.api.getAllDistributor().subscribe(async data=>{
        const servicePromises = data.data.map(async (res: any) => {
          let enquiryData = (await this.api.getEnquiryByVendor(res._id).toPromise()).data;
          console.log(enquiryData)
          res.salesAmount = enquiryData.reduce((total:any, aData:any) =>((total*1) + ((parseFloat((((aData.serviceId?.serviceType == 1)?aData.servicePackageId?.cost:aData.subServiceId?.cost))) || 0)*1)).toFixed(2), 0);
        });
        await Promise.all(servicePromises);
        this.data = data.data;
        setTimeout(() => {
          if(!this.dataTable){
            this.dataTable = $(this.table.nativeElement);
            this.dataTable.DataTable({
              "searching":   false,
              "lengthChange": false,
              "info":     false
            });
          }
          
        }, 500);
      },error=>{
        this.toast.error(error.message);
        this.loader = false;
      });

    }

    changeStatus(item:any,event:any){
      let status = "Active";
      if(!event.target.checked){
        status = "Inactive";
      }
      const data = JSON.stringify({
        status: status
      })
      console.log(item);
      this.api.updateUser(data,item._id).subscribe(data=>{
        if(status == "Inactive"){
          item.status = "Inactive";
          this.toast.error("Status Updated");
        }else if(status == "Active"){
          item.status = "Active";
          this.toast.success("Status Updated");
        }
      });
    }

    delete(id:any) {
      Swal.fire({
        title: 'You are about to delete a distributor ?',
        text: 'Deleting your distributor will remove all of your information from our database.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#f46a6a',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Close'
      }).then(result => {
        if (result.value){
          this.api.deleteUser(id).subscribe(data=>{
            if (data.status === 'error') {
              this.toast.error(data.message);
            } else {
              Swal.fire('Deleted!', 'Distributor has been deleted.', 'success');
              this._fetchData();
            }
          },error=>{
            this.toast.error(error.message);
          });
        }
      });
    }

}
