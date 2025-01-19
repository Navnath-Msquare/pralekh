import {Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Title } from '@angular/platform-browser';
import { AppComponent } from 'src/app/app.component';
declare var $: any;

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

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
  companyId="";
  baseURL = environment.baseURL;


  constructor(private api: ApiService,private toast:ToastrService, public router:Router,public title:Title,public appC:AppComponent) {
    
  }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
     this.breadCrumbItems = [
      { label: 'Companies' },
      { label: 'Company List', active: true }
    ];

    this.title.setTitle("Company - "+this.appC.title)

    
     this._fetchData();

  }

  edit(i:any){
    this.create=true;
    this.editS=true;
    this.name = this.data[i].name;
    this.url = this.data[i].url;
    this.logoName = this.data[i].logoName;
    this.companyId = this.data[i]._id;
}

    private _fetchData() {
      this.data=[];
      this.api.getAllCompany().subscribe(data=>{
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
          "logoName": this.logoName
        });
        this.api.createCompany(data).subscribe(result => {
          if (result.status === 'error') {
            this.toast.error(result.message);
            this.submitLoader = false;
          } else {
            this.toast.success("Company Successfully Register");
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
          "logoName": this.logoName
        });
        this.api.updateCompany(data,this.companyId).subscribe(result => {
          if (result.status === 'error') {
            this.toast.error(result.message);
            this.submitLoader = false;
          } else {
            this.toast.success("Company Successfully Register");
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
