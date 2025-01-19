import {Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AppComponent } from 'src/app/app.component';
declare var $: any;
import Swal from 'sweetalert2';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.scss']
})
export class PlansComponent implements OnInit {

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
      { label: 'Subscriptions' },
      { label: 'Subscriptions List', active: true }
    ];

    this.title.setTitle("Subscriptions - " +this.appC.title)

    
     this._fetchData();

  }

  edit(id:any){
    this.router.navigate(['/admin/plans/edit'],{
      queryParams:{id: id}
    })
}

    private _fetchData() {
      this.api.getAllSubscription().subscribe(data=>{
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

    delete(id:any) {
      Swal.fire({
        title: 'You are about to delete a subscription ?',
        text: 'Deleting your subscription will remove all of your information from our database.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#f46a6a',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Close'
      }).then(result => {
        if (result.value){
          this.api.deleteSubscription(id).subscribe(data=>{
            if (data.status === 'error') {
              this.toast.error(data.message);
            } else {
              Swal.fire('Deleted!', 'Subscription has been deleted.', 'success');
              this._fetchData();
            }
          },error=>{
            this.toast.error(error.message);
          });
        }
      });
    }

    changeStatus(item:any,event:any){
      let status = "Active";
      if(!event.target.checked){
        status = "Inactive";
      }
      const data = JSON.stringify({
        status: status
      })
  
      this.api.updateSubscription(data,item._id).subscribe(data=>{
        if(status == "Inactive"){
          item.status = "Inactive";
          this.toast.error("Status Updated");
        }else if(status == "Active"){
          item.status = "Active";
          this.toast.success("Status Updated");
        }
      });
    }
}
