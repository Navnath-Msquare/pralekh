import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss']
})
export class AreaComponent implements OnInit {
  @ViewChild('table') table: any;
  dataTable:any;
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  data:any=[];
  loader = true;
  searchTerm:any="";
  statusTerm:any="";


  constructor(private api: ApiService,private toast:ToastrService, public router:Router,public title:Title,public appC:AppComponent) {
    
  }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
     this.breadCrumbItems = [
      { label: 'Leads' },
      { label: 'Leads List', active: true }
    ];

    this.title.setTitle("Leads - " +this.appC.title)

    
     this._fetchData();

  }

    private _fetchData() {
      
    }

    onChangeState(event:any){
      this.data=[];
      this.api.getAllAllPincodeByState(event).subscribe(data=>{
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

    changeStatus(id:any,event:any){
      let status = "Active";
    if(!event.target.checked){
      status = "Inactive";
    }
    const data=JSON.stringify({
      status:status
    });
    this.api.updateAllPincode(data,id).subscribe(data=>{
      if(status == "Inactive"){
        this.toast.error("Area Status Updated");
      }else if(status == "Active"){
        this.toast.success("Area Status Updated");
      }
    });
    }

}
