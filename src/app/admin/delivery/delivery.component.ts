import {Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AppComponent } from 'src/app/app.component';
declare var $: any;

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.scss']
})
export class DeliveryComponent implements OnInit {

 
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
      { label: 'Delivery Partner' },
      { label: 'Delivery Partner List', active: true }
    ];

    this.title.setTitle("Delivery Partner - "+this.appC.title)
    
     this._fetchData();

  }

  edit(id:any){
    this.router.navigate(['/admin/distributors/edit'],{
      queryParams:{id: id}
    })
}

delete(i:any){
  this.api.deleteUser(this.data[i]._id).subscribe(data => {
    if(data.status == 'success'){
      this.data.splice(i,1);
    }else{
      this.toast.error(data.message);
      this.toast.success("Delivery Partner deleted successfully")
    }
  },error =>{
    this.toast.error(error.message);
  })
}

    private _fetchData() {
      this.api.getAllDelivery().subscribe(data=>{
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
