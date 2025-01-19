import {Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AppComponent } from 'src/app/app.component';
declare var $: any;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

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
      { label: 'Users' },
      { label: 'Users List', active: true }
    ];
    this.title.setTitle("Users - "+ this.appC.title);

    
     this._fetchData();

  }

  edit(id:any){
    this.router.navigate(['/admin/vendors/edit'],{
      queryParams:{id: id}
    })
}

    private _fetchData() {
      this.api.getAllUser().subscribe(data=>{
        this.data = data.data;
        console.log(data);
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

    delete(i:any){
      const data = JSON.stringify({
        isDelete: true
      })
      this.api.updateUser(data, this.data[i].user?._id).subscribe((res) => {
        if(res.status){
          this.toast.success("User Deleted Successfully");
          this.data.splice(i,1)
        }
      },error=>{
        this.toast.error(error.message);
        this.loader = false;
      })
    }
}
