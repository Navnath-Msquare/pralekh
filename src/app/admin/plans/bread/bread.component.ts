import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AppComponent } from 'src/app/app.component';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-bread',
  templateUrl: './bread.component.html',
  styleUrls: ['./bread.component.scss']
})
export class BreadComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  name = '';
  amount = '';
  details = '';
  validity:any = '360 Days';
  member:any='';
  partnerDiscount:any="";
  plans=[];
  planId="";
  planCode=0;

  loader = false;
  action = 0;
  label = '';
  public Editor = ClassicEditor;
  config:any;

  
  
  constructor(public route: ActivatedRoute, public apiS: ApiService, private toastr: ToastrService, public router: Router, public title: Title, public appC: AppComponent,public authS:AuthenticationService) {
  }

  ngOnInit(): void {
    this.config = {
      toolbar: {
        items: [                                          
          'bold',
          'italic',
          'link',
          'bulletedList',
          'numberedList',
          'blockQuote',
          'undo',
          'redo'
      ]
      },
      height:'100px'
    }
    this.route.params.subscribe((data: any) => {
      if (data.action == "create") {
        this.action = 1;
        this.title.setTitle("Create Subscription | " + this.appC.title);
        this.label = 'Create Subscription';
        this.planCode = Math.floor(100000 + Math.random() * 900000);
      } else if (data.action == "edit") {
        this.action = 2;
        this.title.setTitle("Edit Subscription | " + this.appC.title);
        this.label = 'Edit Subscription';
      } else if (data.action == "view") {
        this.action = 0;
        this.title.setTitle("View Subscription | " + this.appC.title);
        this.label = 'View Subscription';
      }

      if(this.action == 0 || this.action == 2){ 
        this.route.queryParams.subscribe((params: any) =>{
          this.planId = params.id;
          this.apiS.getSingleSubscription(this.planId).subscribe(empres=>{
            this.plans = empres;
            this.planCode = empres.data['planId'];
            this.details = empres.data['details'];
            this.validity = empres.data['validity'];
            this.member = empres.data['member'];
            this.partnerDiscount = empres.data['partnerDiscount'];
            this.amount = empres.data['amount'];
            this.name = empres.data['name'];
          });
        });  
      }
    });
    this.breadCrumbItems = [
      { label: 'Subscriptions' },
      { label: this.label, active: true }
    ];
  }



  submit() {

    this.loader = true;

    if (this.action == 1) {
      const data = JSON.stringify({
        "planId":this.planCode,
        "name": this.name,
        "details": this.details,
        "validity":this.validity,
        "member":this.member,
        "partnerDiscount":this.partnerDiscount,
        "amount":this.amount
      });
      this.apiS.createSubscription(data).subscribe(result => {
        if (result.status === 'error') {
          this.toastr.error(result.message);
          this.loader = false;
        } else {
          this.toastr.success("Subscription Successfully Register");
          this.loader = false;
          this.clearFilter();
          this.router.navigate(['/admin/plans']);
        }
      },error=>{
        this.toastr.error(error.message);
        this.loader = false;
      });
    } else if (this.action == 2) {
      const data = JSON.stringify({
        "planId":this.planCode,
        "name": this.name,
        "details": this.details,
        "validity":this.validity,
        "member":this.member,
        "partnerDiscount":this.partnerDiscount,
        "amount":this.amount
      });
      this.apiS.updateSubscription(data,this.planId).subscribe(result=>{
        console.log(data);
        if (result.status === 'error') {
          this.toastr.error(result.message);
          this.loader = false;
        } else {
          this.toastr.success("Subscription Successfully Updated");
          this.loader = false;
          this.clearFilter();
          this.router.navigate(['/admin/plans']);
        }
      },error=>{
        this.toastr.error(error.message);
        this.loader = false;
      });
    }
  }


  clearFilter() {
    this.name = '';
    this.planCode = 0;
    this.details = '';
    this.amount = '';
    this.validity = '';
    this.partnerDiscount='';
    this.member='';
  }


}
