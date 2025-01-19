import {Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Title } from '@angular/platform-browser';
import { AppComponent } from 'src/app/app.component';
declare var $: any;
import Swal from 'sweetalert2';

@Component({
  selector: 'app-service-package',
  templateUrl: './service-package.component.html',
  styleUrls: ['./service-package.component.scss']
})
export class ServicePackageComponent implements OnInit {

  @ViewChild('table') table: any;
  dataTable:any;
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  data:any=[];
  company:any=[];
  loader = true;
  searchTerm:any="";
  statusTerm:any="";
  name="";
  companyId="";
  cost="";
  nonMemberCost="";
  validity="";
  planFor="";
  url="";
  documentName="";
  documents:any=[];
  advantage="";
  planDesc="";
  docDetails="";
  remark="";
  desc="";
  companyName="";
  pickup = false;

  submitLoader=false;
  editS=false;
  create=false;
  serviceId="";
  baseURL = environment.baseURL;
  sId="";
  cId="";

  constructor(private api: ApiService,private toast:ToastrService, public router:Router,public title:Title,public appC:AppComponent,public route:ActivatedRoute) {
      this.route.queryParams.subscribe(data=>{
        this.sId = data.id;
      })
  }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
     this.breadCrumbItems = [
      { label: 'Service Packages' },
      { label: 'Service Package List', active: true }
    ];

    this.title.setTitle("Service Packages - "+this.appC.title)

    
     this._fetchData();

  }

  edit(i:any){
    this.create=true;
    this.editS=true;
    this.name = this.data[i].name;
    this.cost=this.data[i].cost;
    this.nonMemberCost=this.data[i].nonMemberCost;
    this.desc = this.data[i].description;
    this.documents = this.data[i].documents;
    this.pickup=this.data[i].pickup;
    this.serviceId = this.data[i]._id;
}

delete(id:any) {
  Swal.fire({
    title: 'You are about to delete a service package ?',
    text: 'Deleting your service package will remove all of your information from our database.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#f46a6a',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Close'
  }).then(result => {
    if (result.value) {
      this.api.deleteServicePackage(id).subscribe(data=>{
        if (data.status === 'error') {
          this.toast.error(data.message);
          this.submitLoader = false;
        } else {
          Swal.fire('Deleted!', 'Service Package has been deleted.', 'success');
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

uploadDoc(event: any): void {
  console.log(event)
  if (event.target.files) {
      let fileData: FormData = new FormData();
      fileData.append('file', event.target.files[0]);
      
      this.api.uploadFile(fileData).subscribe(res => {
        if (res.data) {
          this.url = res.data.url;
          this.documentName  =  event.target.files[0].name;
        }
      });
    }
    
  
}

servicePackageView(id:any){
  this.router.navigate(['/admin/service/subService'],{
    queryParams:{id:id}
  });
}

    private _fetchData() {
      this.company=[];
      this.api.getAllCompany().subscribe(data=>{
        this.company = data.data;
      })
      this.data=[];
      this.api.getAllServicePackage(this.sId).subscribe(data=>{
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

    clearFilter(){
      this.editS=false;
      this.create=false;
      this.name='';
      this.cost="";
      this.nonMemberCost="";
      this.desc='';
      this.pickup=false;
      this.documents="";
    }

    addDocuments(){
      this.documents.push({name:this.documentName});
      this.documentName="";
    }

    deleteDocuments(i:any){
      this.documents.splice(i,1);
    }

    submit() {
      this.submitLoader = true;
      if(this.create && !this.editS){
        const data = JSON.stringify({
          "name":this.name,
          "description": this.desc,
          "cost":this.cost,
          "nonMemberCost":this.nonMemberCost,
          "documents":this.documents,
          "serviceId":this.sId,
          "pickup":this.pickup
        });
        this.api.createServicePackage(data).subscribe(result => {
          if (result.status === 'error') {
            this.toast.error(result.message);
            this.submitLoader = false;
          } else {
            this.toast.success("Service Package Successfully Register");
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
          "description": this.desc,
          "cost":this.cost,
          "nonMemberCost":this.nonMemberCost,
          "documents":this.documents,
          "pickup":this.pickup
        });
        this.api.updateServicePackage(data,this.serviceId).subscribe(result => {
          if (result.status === 'error') {
            this.toast.error(result.message);
            this.submitLoader = false;
          } else {
            this.toast.success("Service Package Successfully Updated");
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



}
