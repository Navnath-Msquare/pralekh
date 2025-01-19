import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-delivery-partner',
  templateUrl: './delivery-partner.component.html',
  styleUrls: ['./delivery-partner.component.scss']
})
export class DeliveryPartnerComponent implements OnInit {

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

    private _fetchData() {
      this.api.getAllAssignDelivery().subscribe(data=>{
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
