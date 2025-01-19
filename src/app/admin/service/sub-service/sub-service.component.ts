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
  selector: 'app-sub-service',
  templateUrl: './sub-service.component.html',
  styleUrls: ['./sub-service.component.scss']
})
export class SubServiceComponent implements OnInit {
  @ViewChild('table') table: any;
  dataTable:any;
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  data:any=[];
  loader = true;
  searchTerm:any="";
  statusTerm:any="";
  name="";
  desc="";
  cost="";
  nonMemberCost="";
  documentName="";
  documents:any=[];
  submitLoader=false;
  editS=false;
  create=false;
  serviceId="";
  pickup = false;
  baseURL = environment.baseURL;
  sId="";

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
      { label: 'Sub Services' },
      { label: 'Sub Service List', active: true }
    ];

    this.title.setTitle("Sub Services - "+this.appC.title)

    
     this._fetchData();

  }

  edit(i:any){
    this.create=true;
    this.editS=true;
    this.name = this.data[i].name;
    this.desc = this.data[i].description;
    this.cost=this.data[i].cost;
    this.nonMemberCost=this.data[i].nonMemberCost;
    this.serviceId = this.data[i]._id;
    this.documents = this.data[i].documents;
    this.pickup = this.data[i].pickup;
}

servicePackageView(id:any){
  this.router.navigate(['/admin/service/subService'],{
    queryParams:{id:id}
  });
}

    private _fetchData() {
      this.data=[];
      this.api.getAllSubService(this.sId).subscribe(data=>{
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
      this.desc='';
      this.cost="";
      this.nonMemberCost="";
      this.documents="";
      this.pickup = false;
    }

    submit() {
      this.submitLoader = true;
      if(this.create && !this.editS){
        const data = JSON.stringify({
          "name":this.name,
          "cost": this.cost,
          "nonMemberCost": this.nonMemberCost,
          "description":this.desc,
          "documents":this.documents,
          "serviceId":this.sId,
          "pickup":this.pickup
        });
        this.api.createSubService(data).subscribe(result => {
          if (result.status === 'error') {
            this.toast.error(result.message);
            this.submitLoader = false;
          } else {
            this.toast.success("Sub Service Successfully Register");
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
          "cost": this.cost,
          "nonMemberCost": this.nonMemberCost,
          "description":this.desc,
          "documents":this.documents,
          "serviceId":this.sId,
          "pickup":this.pickup
        });
        this.api.updateSubService(data,this.serviceId).subscribe(result => {
          if (result.status === 'error') {
            this.toast.error(result.message);
            this.submitLoader = false;
          } else {
            this.toast.success("Sub Service Successfully Updated");
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

    addDocuments(){
      this.documents.push({name:this.documentName});
      this.documentName="";
    }

    deleteDocuments(i:any){
      this.documents.splice(i,1);
    }
    
    delete(id:any) {
      Swal.fire({
        title: 'You are about to delete a sub service ?',
        text: 'Deleting your sub service will remove all of your information from our database.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#f46a6a',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Close'
      }).then(result => {
        if (result.value) {
          this.api.deleteSubService(id).subscribe(data=>{
            if (data.status === 'error') {
              this.toast.error(data.message);
              this.submitLoader = false;
            } else {
              Swal.fire('Deleted!', 'Sub Service has been deleted.', 'success');
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
