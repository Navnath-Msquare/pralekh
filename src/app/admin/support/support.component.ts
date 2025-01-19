import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {

  @ViewChild('table') table: any;
  dataTable:any;
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  data:any=[];
  loader = true;
  searchTerm:any="";
  statusTerm:any="";

  remark:any = "";
  item:any = [];
  constructor(private api: ApiService,private toast:ToastrService, public router:Router,public title:Title,public appC:AppComponent,
     public modalCtrl:NgbModal) {
    
  }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
     this.breadCrumbItems = [
      { label: 'Support' },
      { label: 'Support List', active: true }
    ];
    this.title.setTitle("Support - "+ this.appC.title);

    
     this._fetchData();

  }

  edit(id:any){
    this.router.navigate(['/admin/vendors/edit'],{
      queryParams:{id: id}
    })
}

    private _fetchData() {
      this.api.getAllSupport().subscribe(data=>{
        console.log(data);
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

    openModal(content:any,item:any){
      this.modalCtrl.open(content, {size:'md',centered: true});
      this.item = item;
    }
  
    clear(){
      this.remark  = "";
    }

    markResolve(){
      this.loader = true;
      const data = JSON.stringify({
        status:"success",
        remark: this.remark
      })

      this.api.updateSupport(data, this.item._id).subscribe(res => {
        if(res.status == 'success'){
          this.item.status = 'success';
          this.item.remark = this.remark;
          this.remark = "";
          this.toast.success("Support query resolved successfully")
          this.modalCtrl.dismissAll();
          this.loader = false;
        }else{
          this.toast.error(res.message);
          this.loader = false;
        }
      },error =>{
        this.toast.error(error.message);
        this.loader = false;
      })
    }
}
