import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';
import { ApiService } from 'src/app/core/services/api.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-special-packages',
  templateUrl: './special-packages.component.html',
  styleUrls: ['./special-packages.component.scss']
})
export class SpecialPackagesComponent implements OnInit {

  @ViewChild('table') table: any;
  dataTable:any;
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  data:any=[];
  loader = true;
  searchTerm:any="";
  statusTerm:any="";

  price="";
  banner="";
  selectedServices:any = [];

  submitLoader=false;
  editS=false;
  logoName="";
  create=false;
  serviceId="";
  baseURL = environment.baseURL;

  services:any = [];

  constructor(private api: ApiService,private toast:ToastrService, public router:Router,public title:Title,public appC:AppComponent) {
    
  }

  async ngOnInit() {
    /**
    * BreadCrumb
    */

    let services = (await this.api.getAllServices().toPromise()).data;
    this.services = services.map((service:any) => ({
      ...service,
      serviceTypeName: service.serviceType === 1 ? 'Private' : service.serviceType === 2 ? 'Government' : 'Other'
    }));
     this.breadCrumbItems = [
      { label: 'Special Package' },
      { label: 'Special Package List', active: true }
    ];

    this.title.setTitle("Special Package - "+this.appC.title)

    
     this._fetchData();

  }

  edit(i:any){
    this.create=true;
    this.editS=true;
    this.banner = this.data[i].banner;
    this.price = this.data[i].price;
    console.log(this.data[i].services);
    this.selectedServices = this.data[i].services.map((res:any) => res._id);
    this.serviceId = this.data[i]._id;
}

servicePackageView(id:any){
  this.router.navigate(['/admin/service/subService'],{
    queryParams:{id:id}
  });
}

    private _fetchData() {
      
      this.data=[];
      this.api.getAllSpecialPackage().subscribe(data=>{
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

    inputFileClick() {
      document.getElementById('file')?.click();
    }

    uploadDoc(event: any): void {
      console.log(event)
      if (event.target.files) {
          let fileData: FormData = new FormData();
          fileData.append('file', event.target.files[0]);
          
          this.api.uploadFile(fileData).subscribe(res => {
            if (res.data) {
              this.banner = res.data.url;
            }
          });
        }
        
      
    }
    clearFilter(){
      this.editS=false;
      this.create=false;
      this.banner='';
      this.price='';
      this.selectedServices=[];
    }

    submit() {
      this.submitLoader = true;
      if(!this.banner){
        this.toast.error("Please Upload Banner");
        this.submitLoader = false;
        return;
      }
      if(!this.price){
        this.toast.error("Please Enter Price");
        this.submitLoader = false;
        return
      }
      if(this.selectedServices.length == 0){
        this.toast.error("Please Select At Least 1 Service");
        this.submitLoader = false;
        return
      }
      if(this.create && !this.editS){
        const data = JSON.stringify({
          "banner":this.banner,
          "price": this.price,
          "services": this.selectedServices,
        });
        this.api.createSpecialPackage(data).subscribe(result => {
          if (result.status === 'error') {
            this.toast.error(result.message);
            this.submitLoader = false;
          } else {
            this.toast.success("Special Package Successfully Saved");
            this.submitLoader = false;
            this.clearFilter();
            this._fetchData();
          }
        },error=>{
          this.toast.error(error.message);
          this.submitLoader = false;
        });
      } else if(this.create && this.editS){
        const data = JSON.stringify({
          "banner":this.banner,
          "price": this.price,
          "services": this.selectedServices,
        });
        this.api.updateSpecialPackage(data,this.serviceId).subscribe(result => {
          if (result.status === 'error') {
            this.toast.error(result.message);
            this.submitLoader = false;
          } else {
            this.toast.success("Special Package Successfully Updated");
            this.submitLoader = false;
            this.clearFilter();
            this.dataTable.DataTable().clear().destroy();
            this._fetchData();
          }
        },error=>{
          this.toast.error(error.message);
          this.submitLoader = false;
        });
      }

    }

    delete(id:any) {
      Swal.fire({
        title: 'You are about to delete a special package ?',
        text: 'Deleting your special package will remove all of your information from our database.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#f46a6a',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Close'
      }).then(result => {
        if (result.value) {
          this.api.deleteSpecialPackage(id).subscribe(data=>{
            if (data.status === 'error') {
              this.toast.error(data.message);
              this.submitLoader = false;
            } else {
              Swal.fire('Deleted!', 'Special Package has been deleted.', 'success');
              this.submitLoader = false;
              this.clearFilter();
              this._fetchData();
            }
          },error=>{
            this.toast.error(error.message);
            this.submitLoader = false;
          });
        }
      });
    }



}
