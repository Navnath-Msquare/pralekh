import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {

  
  @ViewChild('table') table: any;
  dataTable:any;
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  data:any=[];
  loader = true;
  searchTerm:any="";
  statusTerm:any="";


  constructor(private api: ApiService,private toast:ToastrService, public router:Router,public title:Title,public appC:AppComponent,public auth:AuthenticationService) {
    
  }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
     this.breadCrumbItems = [
      { label: 'Service Requests' },
      { label: 'Service Requests List', active: true }
    ];

    this.title.setTitle("Service Requests - " +this.appC.title)

    
     this._fetchData();

  }

  edit(id:any){
    this.router.navigate(['/admin/plans/edit'],{
      queryParams:{id: id}
    })
}
view(id:any){
  this.router.navigate(['/distributor/enquiry/view'],{
    queryParams:{id: id}
  })
}


    private _fetchData() {
      this.api.getEnquiryByVendor(this.auth.currentUserValue.id).subscribe(data=>{
        this.data = data.data;
        console.log(data);
        setTimeout(() => {
          this.dataTable = $(this.table.nativeElement);
          this.dataTable.DataTable({
            "searching":   false,
            "lengthChange": false,
            "info":     false
        });
        }, 500);
      },error=>{
        this.toast.error(error.message);
        this.loader = false;
      });

    }

}
