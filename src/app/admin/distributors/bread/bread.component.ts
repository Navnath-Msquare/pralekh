import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AppComponent } from 'src/app/app.component';
import { AuthenticationService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-bread',
  templateUrl: './bread.component.html',
  styleUrls: ['./bread.component.scss']
})
export class BreadComponent implements OnInit {

  breadCrumbItems!: Array<{}>;
  address = '';
  mobile = '';
  email = '';
  password = '';
  name = '';
  region = '';
  status = '';
  commission = '';
  target = '';
  distributor=[];
  distributorId="";

  loader = false;
  action = 0;
  label = '';
  pincodes:any=[];
  pincode:any="";

  constructor(public route: ActivatedRoute, public apiS: ApiService, private toastr: ToastrService, public router: Router, public title: Title, public appC: AppComponent,public authS:AuthenticationService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((data: any) => {
      if (data.action == "create") {
        this.action = 1;
        this.title.setTitle("Create Distributor | " + this.appC.title);
        this.label = 'Create Distributor';
      } else if (data.action == "edit") {
        this.action = 2;
        this.title.setTitle("Edit Distributor | " + this.appC.title);
        this.label = 'Edit Distributor';
      } else if (data.action == "view") {
        this.action = 0;
        this.title.setTitle("View Distributor | " + this.appC.title);
        this.label = 'View Distributor';
      }

      if(this.action == 0 || this.action == 2){ 
        this.route.queryParams.subscribe((params: any) =>{
          this.distributorId = params.id;
          this.apiS.getSingleUser(this.distributorId).subscribe(empres=>{
            this.distributor = empres;
            console.log(empres)
            this.address = empres.data['address'];
            this.mobile = empres.data['mobile'];
            this.email = empres.data['email'];
            this.name = empres.data['name'];
            this.password = empres.data['password'];
            this.region =  empres.data['region'];
            this.status =  empres.data['status'];
            this.commission =  empres.data['commission'];
            this.target =  empres.data['target'];
          });
        });  
      }
    });
    this.breadCrumbItems = [
      { label: 'Vendors' },
      { label: this.label, active: true }
    ];
  }



  submit() {

    this.loader = true;

    if (this.action == 1) {
      const data = JSON.stringify({
        "address":this.address,
        "mobile": this.mobile,
        "name": this.name,
        "email": this.email,
        "password":this.password,
        "region":this.region,
        "commission":this.commission,
        "target":this.target,
        "role":"distributor"
      });
      this.apiS.createDistributor(data).subscribe(result => {
        if (result.status === 'error') {
          this.toastr.error(result.message);
          this.loader = false;
        } else {
          this.toastr.success("Distributor Successfully Register");
          this.loader = false;
          this.clearFilter();
          this.router.navigate(['/admin/distributors']);
        }
      },error=>{
        this.toastr.error(error.message);
        this.loader = false;
      });
    }else{
      const data = JSON.stringify({
        "address":this.address,
        "mobile": this.mobile,
        "name": this.name,
        "email": this.email,
        "region":this.region,
        "commission":this.commission,
        "target":this.target,
      });
      this.apiS.updateUser(data,this.distributorId).subscribe(result => {
        if (result.status === 'error') {
          this.toastr.error(result.message);
          this.loader = false;
        } else {
          this.toastr.success("Distributor Successfully Updated");
          this.loader = false;
          this.clearFilter();
          this.router.navigate(['/admin/distributors']);
        }
      },error=>{
        this.toastr.error(error.message);
        this.loader = false;
      });
    }
  }

  addPincode(){
    if(this.pincode.length == 6){
      this.pincodes.push(this.pincode);
      this.pincode="";
    }else{
      this.toastr.error("Please enter 6 digit pincode")
    }
    
  }

  deletePincode(i:any){
    this.pincodes.splice(i,1);
  }

  clearFilter() {
    this.name = '';
    this.email = '';
    this.password = '';
    this.address = '';
    this.mobile = '';
    this.region = '';
    this.commission = '';
    this.target = '';
    this.pincodes =[];
    this.pincode="";
  }

}
