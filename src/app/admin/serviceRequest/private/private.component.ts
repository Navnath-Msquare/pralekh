import {Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AppComponent } from 'src/app/app.component';
declare var $: any;

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


  constructor(private api: ApiService,private toast:ToastrService, public router:Router,public title:Title,public appC:AppComponent) {
    
  }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
     this.breadCrumbItems = [
      { label: 'Private Service Request' },
      { label: 'Private Service Request List', active: true }
    ];

    this.title.setTitle("Private Service Request - " +this.appC.title)

    
     this._fetchData();

  }

  edit(id:any){
    this.router.navigate(['/admin/plans/edit'],{
      queryParams:{id: id}
    })
}

    private _fetchData() {
      this.api.getAllPrivateServiceRequest().subscribe(data=>{
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

}
