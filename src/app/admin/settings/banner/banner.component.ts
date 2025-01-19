import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';
import { ApiService } from 'src/app/core/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  @ViewChild('table') table: any;
  dataTable:any;
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  data:any=[];
  loader = true;
  searchTerm:any="";
  statusTerm:any="";
  banner="";
  submitLoader=false;
  editS=false;
  create=false;
  bannerId="";
  baseURL = environment.baseURL;


  constructor(private api: ApiService,private toast:ToastrService, public router:Router,public title:Title,public appC:AppComponent) {
    
  }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
     this.breadCrumbItems = [
      { label: 'Banners', active: true }
    ];

    this.title.setTitle("Banner - "+this.appC.title)

    
     this._fetchData();

  }

  edit(i:any){
    this.create=true;
    this.editS=true;
    this.banner = this.data[i].banner;
    this.bannerId = this.data[i]._id;
}

    private _fetchData() {
      this.data=[];
      this.api.getAllBanner().subscribe(data=>{
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
      if (event.target.files) {
        let fileData: FormData = new FormData();
        fileData.append('file', event.target.files[0]);
        let img = new Image()
        img.src = window.URL.createObjectURL(event.target.files[0])
        img.onload = () => {
          if (this.calculateAspectRatio(img.width, img.height)) {
            this.api.uploadFile(fileData).subscribe(data => {
              this.banner = data.data.url;
            }, error => {
              this.toast.error(error.message);
            });
          }else{
            this.toast.error("Please upload file in ratio 16:9")
          }
        }
      }
      
    }

    public calculateAspectRatio(width: number, height: number): Boolean {
      const ratio = (width / height).toFixed(2);
      console.log(ratio)
      if (ratio === "1.78") { // 16:9 aspect ratio
        return true;
      }
      return false;
    }
    clearFilter(){
      this.editS=false;
      this.create=false;
      this.banner='';
    }

    delete(id:any){
      this.api.deleteBanner(id).subscribe(data =>{
        if (data.status === 'error') {
          this.toast.error(data.message);
        } else {
          this.toast.success("Banner Deleted ");
          this.clearFilter();
          this.dataTable.DataTable().clear().destroy();
          this._fetchData();
        }
      },error => {
        this.toast.error(error.message);
      })
    }
    submit() {

      this.submitLoader = true;
      if(this.create && !this.editS){
        const data = JSON.stringify({
          "banner":this.banner
        });
        this.api.createBanner(data).subscribe(result => {
          if (result.status === 'error') {
            this.toast.error(result.message);
            this.submitLoader = false;
          } else {
            this.toast.success("Banner Saved ");
            this.submitLoader = false;
            this.clearFilter();
            this.dataTable.DataTable().clear().destroy();
            this._fetchData();
          }
        },error=>{
          this.toast.error(error.message);
          this.submitLoader = false;
        });
      } else if(this.create && this.editS){
        const data = JSON.stringify({
          "banner":this.banner
        });
        this.api.updateBanner(data,this.bannerId).subscribe(result => {
          if (result.status === 'error') {
            this.toast.error(result.message);
            this.submitLoader = false;
          } else {
            this.toast.success("Banner Updated");
            this.submitLoader = false;
            this.clearFilter();
            this.dataTable.DataTable().clear().destroy();
            this._fetchData();
          }
        },error=>{
          this.toast.error(error.message);
          this.submitLoader = false;
        });
      }

    }

}
