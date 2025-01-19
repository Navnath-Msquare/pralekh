import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppComponent } from 'src/app/app.component';
import { ApiService } from 'src/app/core/services/api.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { environment } from 'src/environments/environment';
declare var Razorpay: any;

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {

  edit:boolean=false;
  subtotal:any=0.00;
  discount:any=0.00;
  totalAmount:any=0.00;
  response: any;
  showModal = false;
  razorpayResponse: any;
  paymentId = '';
  paymentRazorpayStatus = false;
  RAZORPAY_OPTIONS: any = {
    key: environment.testKeyId,
    amount: '',
    name: '',
    order_id: '',
    description: 'License',
    prefill: {
      name: '',
      email: '',
      contact: '',
      method: ''
    },
    modal: {},
    theme: {
      color: '#12076C'
    }
  };
  breadCrumbItems!: Array<{}>;
  plans:any=[];
  items:any=[{plan:'',rate:0.00,quantity:1,discount:0,amount:0.00}];
  licenses:any=[];
  loader=false;
  characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  constructor(public route:ActivatedRoute,public title:Title,public appC:AppComponent,public apiS:ApiService,public auth:AuthenticationService,
    public toast:ToastrService,public cd: ChangeDetectorRef,public router:Router,public ngZone:NgZone) { }

  ngOnInit(): void {
    this.apiS.getAllSubscriptionWhere({status:"Active"}).subscribe(data=>{
      this.plans=data.data;
    })
    
    this.title.setTitle("Purchase License | " + this.appC.title);
    this.breadCrumbItems = [
      { label: 'Licenses' },
      { label: 'Purchase License', active: true }
    ];
  }

  add(){
    this.items.push({plan:'',rate:0.00,quantity:1,discount:0,amount:0.00});
  }
  
  planSelect(event:any,i:any){
    this.subtotal=0.00;
      this.totalAmount=0.00;
      this.discount = 0;
      this.licenses=[];
      this.apiS.getSingleSubscription(event).subscribe(data=>{
        this.items[i].rate = data.data.amount;
        this.items[i].discount = data.data.partnerDiscount;
        this.items[i].amount = ((this.items[i].rate *this.items[i].quantity) -((this.items[i].rate *this.items[i].quantity)*(data.data.partnerDiscount/100))).toFixed(2);
  
      })


      setTimeout(() => {
        for(let i =0;i<this.items.length;i++){
          this.subtotal = ((this.subtotal*1)+(this.items[i].amount*1)).toFixed(2);
          this.discount = (this.discount *1);
          this.totalAmount = (this.subtotal*1).toFixed(2);
          this.licenses.push({key:this.generateString(10),planId:this.items[i].plan,vendorId:this.auth.currentUserValue.id,status:'Not Used'})
        }
       
      }, 300);
      
  }


generateString(length:any) {
  let result = '';
  const charactersLength = this.characters.length;
  for ( let i = 0; i < length; i++ ) {
      result += this.characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

  increment(index:any) {
    this.subtotal=0.00;
    this.totalAmount=0.00;
    this.discount = 0;
    this.licenses=[];
    console.log(this.items[index]);
    
    this.items[index].amount = ((this.items[index].rate *this.items[index].quantity) -((this.items[index].rate *this.items[index].quantity)*(this.items[index].discount/100))).toFixed(2);
    for(let i =0;i<this.items.length;i++){
      this.subtotal = ((this.subtotal*1)+(this.items[i].amount*1)).toFixed(2);
          this.discount = (this.discount *1);
          this.totalAmount = (this.subtotal*1).toFixed(2);
          this.licenses.push({key:this.generateString(10),planId:this.items[i].plan,vendorId:this.auth.currentUserValue.id,status:'Not Used'})
    }
  }

  decrement(index:any) {
    this.subtotal=0.00;
    this.totalAmount=0.00;
    this.discount = 0;
    this.licenses=[];
    if(this.items[index].quantity <= 0){
      this.items[index].quantity =this.items[index].quantity;
      this.items[index].amount = (this.items[index].rate -((this.items[index].rate *this.items[index].quantity)*(this.items[index].discount/100))).toFixed(2);
    }else{
      this.items[index].quantity--;
      this.items[index].amount = (this.items[index].rate -((this.items[index].rate *this.items[index].quantity)*(this.items[index].discount/100))).toFixed(2);
    }
    for(let i =0;i<this.items.length;i++){
      this.subtotal = ((this.subtotal*1)+(this.items[i].amount*1)).toFixed(2);
      this.discount = (this.discount *1);
      this.totalAmount = (this.subtotal*1).toFixed(2);
      this.licenses.push({key:this.generateString(10),planId:this.items[i].plan,vendorId:this.auth.currentUserValue.id,status:'Not Used'})
    }
    
  }

  delete(i:any){
    this.subtotal=0.00;
    this.totalAmount=0.00;
    this.discount = 0;
    this.licenses=[];
    this.items.splice(i,1);
    for(let i =0;i<this.items.length;i++){
      this.subtotal = ((this.subtotal*1)+(this.items[i].amount*1)).toFixed(2);
      this.discount = (this.discount *1);
      this.totalAmount = (this.subtotal*1).toFixed(2);
      this.licenses.push({key:this.generateString(10),planId:this.items[i].plan,vendorId:this.auth.currentUserValue.id,status:'Not Used'})
    }
  }

  save(){
    this.loader = true;
    this.razorPay();
  }

  razorPay() {
    this.RAZORPAY_OPTIONS.amount = Number(this.totalAmount)+"00";
    this.RAZORPAY_OPTIONS.prefill.name = this.auth.currentUserValue.name;
    this.RAZORPAY_OPTIONS.prefill.email = this.auth.currentUserValue.email;
    this.RAZORPAY_OPTIONS.prefill.contact = this.auth.currentUserValue.mobile;
    this.RAZORPAY_OPTIONS.modal = {
      "ondismiss": function(){
        document.getElementById("closeForm")?.click();
      }
    };
    this.RAZORPAY_OPTIONS['handler'] = this.razorPaySuccessHandler.bind(this);
    // this.showPopup();
    console.log(this.RAZORPAY_OPTIONS);
    let razorpay = new Razorpay(this.RAZORPAY_OPTIONS);
    razorpay.open();
  }
  

  public razorPaySuccessHandler(response: any) {
    this.razorpayResponse = `Razorpay Response`;
    this.showModal = true;
    this.cd.detectChanges();
    if (response.razorpay_payment_id !== '') {
      this.paymentId = response.razorpay_payment_id
      this.paymentSuccess();
    } else{
      this.loader = false;
    }
  }
  
  paymentSuccess(){
    const data = JSON.stringify({
      licenses:this.licenses
    });
    this.apiS.createBulkLicense(data).subscribe(result => {
      if (result.status === 'error') {
        this.toast.error(result.message);
      } else {
        this.toast.success("Payment Successfully Done! License Successfully Purchased");
        this.ngZone.run(() => {this.router.navigate(['/distributor/license'])});
      }
    },error=>{
      this.toast.error(error.message);
    });
  }

}
