import {Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Title } from '@angular/platform-browser';
import { AppComponent } from 'src/app/app.component';
declare var $: any;

import Swal from 'sweetalert2';

@Component({
  selector: 'app-private',
  templateUrl: './private.component.html',
  styleUrls: ['./private.component.scss']
})
export class PrivateComponent implements OnInit {

  @ViewChild('table') table: any;
  dataTable:any;
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  data:any=[];
  loader = true;
  searchTerm:any="";
  statusTerm:any="";
  url="";
  name="";
  submitLoader=false;
  editS=false;
  logoName="";
  create=false;
  serviceId="";
  baseURL = environment.baseURL;


  constructor(private api: ApiService,private toast:ToastrService, public router:Router,public title:Title,public appC:AppComponent) {
    
  }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
     this.breadCrumbItems = [
      { label: 'Licensing, Support & Consulting' },
      { label: 'Licensing, Support & Consulting List', active: true }
    ];

    this.title.setTitle("Licensing, Support & Consulting - "+this.appC.title)

    
     this._fetchData();

  }

  edit(i:any){
    this.create=true;
    this.editS=true;
    this.name = this.data[i].name;
    this.url = this.data[i].url;
    this.logoName = this.data[i].iconName;
    this.serviceId = this.data[i]._id;
}

servicePackageView(id:any){
  this.router.navigate(['/admin/service/servicePackage'],{
    queryParams:{id:id}
  });
}

    private _fetchData() {
      this.data=[];
      this.api.getAllPrivateServices().subscribe(data=>{
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
              this.url = res.data.url;
              this.logoName  =  event.target.files[0].name;
            }
          });
        }
        
      
    }
    clearFilter(){
      this.editS=false;
      this.create=false;
      this.name='';
      this.url='';
      this.logoName='';
    }

    submit() {

      this.submitLoader = true;
      if(this.create && !this.editS){
        const data = JSON.stringify({
          "name":this.name,
          "url": this.url,
          "iconName": this.logoName,
          "serviceType":1
        });
        this.api.createServices(data).subscribe(result => {
          if (result.status === 'error') {
            this.toast.error(result.message);
            this.submitLoader = false;
          } else {
            this.toast.success("Private Service Successfully Register");
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
          "name":this.name,
          "url": this.url,
          "iconName": this.logoName,
          "serviceType":1
        });
        this.api.updateServices(data,this.serviceId).subscribe(result => {
          if (result.status === 'error') {
            this.toast.error(result.message);
            this.submitLoader = false;
          } else {
            this.toast.success("Private Service Successfully Register");
            this.submitLoader = false;
            this.clearFilter();
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
        title: 'You are about to delete a private service ?',
        text: 'Deleting your private service will remove all of your information from our database.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#f46a6a',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Close'
      }).then(result => {
        if (result.value) {
          this.api.deleteServices(id).subscribe(data=>{
            if (data.status === 'error') {
              this.toast.error(data.message);
              this.submitLoader = false;
            } else {
              Swal.fire('Deleted!', 'Private Service has been deleted.', 'success');
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
