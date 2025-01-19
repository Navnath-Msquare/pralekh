import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/core/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  @ViewChild('table') table: any;
  dataTable:any;
  @ViewChild('table1') table1: any;
  dataTable1:any;
  breadCrumbItems!: Array<{}>;
  constructor(public route:ActivatedRoute, private api: ApiService, public modal:NgbModal) { }

  distributorId = "";
  userData:any = [];
  revenuePeriod = "1M"

  services: any = [];
  plans:any = [];
  totalRecords = 0;
  totalPage = 0;
  page = 1;
  loading = true;
  searchTerm:any="";

  commissionAmount: any = 0;
  saleAmount: any = 0;
  settlementAmount:any = 0;

  selectedSevices:any = [];
  selectedSettlement:any = 0;

  selectedPlanSevices:any = [];
  selectedPlanSettlement:any = 0;

  baseURL = environment.baseURL;

  transactionNo:any = "";
  paidTo:any = "";
  referenceDocument:any = "";
  view:any = false;

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Home' },
      { label: 'Distributors'},
      { label: "Details", active:true}
    ];

    this.route.params.subscribe((data: any) => {
      this.distributorId = data.id
      this._fetchData();
    });
    
  }

  _fetchData(){
    this.api.getSingleUser(this.distributorId).subscribe(res=>{
      this.userData = res.data;
      console.log(res.data)
    })
    this.getBookings();
  }

  checkSelected(event:any, i:any){
    if(event.target.checked){
      this.selectedSevices = this.services.filter((res:any) => {return res.isSelected})
      this.selectedSettlement = this.selectedSevices.reduce((total:any, aData:any) => (((total*1)) + ((parseFloat((((aData.serviceId?.serviceType == 1)?aData.servicePackageId?.cost:aData.subServiceId?.cost) * (this.userData.commission /100)).toFixed(2)) || 0)*1)).toFixed(2), 0)
    }else{
      this.selectedSevices = this.services.filter((res:any) => {return res.isSelected})
      this.selectedSettlement = this.selectedSevices.reduce((total:any, aData:any) => (((total*1)) + ((parseFloat((((aData.serviceId?.serviceType == 1)?aData.servicePackageId?.cost:aData.subServiceId?.cost) * (this.userData.commission /100)).toFixed(2)) || 0)*1)).toFixed(2), 0)
    }
  }

  checkPlanSelected(event:any, i:any){
    if(event.target.checked){
      this.selectedPlanSevices = this.plans.filter((res:any) => {return res.isSelected})
      this.selectedPlanSettlement = this.selectedPlanSevices.reduce((total:any, aData:any) => (((total*1)) + ((parseFloat((aData.planId?.amount * (this.userData.commission /100)).toFixed(2)) || 0)*1)).toFixed(2), 0)
    }else{
      this.selectedPlanSevices = this.plans.filter((res:any) => {return res.isSelected})
      this.selectedPlanSettlement = this.selectedPlanSevices.reduce((total:any, aData:any) => (((total*1)) + ((parseFloat((aData.planId?.amount * (this.userData.commission /100)).toFixed(2)) || 0)*1)).toFixed(2), 0)
    }
  }

  uploadDoc(event: any): void {
    console.log(event)
    if (event.target.files) {
        let fileData: FormData = new FormData();
        fileData.append('file', event.target.files[0]);
        
        this.api.uploadFile(fileData).subscribe(res => {
          if (res.data) {
            this.referenceDocument = res.data.url;
          }
        });
      }
  }

  clear(){
    this.transactionNo = "";
    this.referenceDocument = "";
    this.selectedSevices = [];
    this.selectedSettlement = 0;
    this.selectedPlanSettlement = 0;
    this.selectedPlanSevices = [];
    this.paidTo = "";
    this.view = false;
    this.services.forEach((res:any) => {res.isSelected = false})
    this.plans.forEach((res:any) => {res.isSelected = false})
  }

  openModal(content:any){
    this.modal.open(content, {size:'md',centered:true})
  }

  openViewModal(content:any, i:any){
    this.selectedSettlement = this.services[i].commissionData?.amount;
    this.transactionNo = this.services[i].commissionData?.transactionNo;
    this.paidTo = this.services[i].commissionData?.paidTo;
    this.referenceDocument = this.services[i].commissionData?.referenceDocument;
    this.modal.open(content, {size:'md',centered:true})
    this.view = true;
  }

  async settle(){
    const servicePromises = this.selectedSevices.map(async (res: any) => {
      let data = JSON.stringify({
        enquiryId: res._id,
        amount: (res.serviceId.serviceType == 1)?(res.servicePackageId?.cost * (this.userData.commission/100)).toFixed(2):(res.subServiceId?.cost * (this.userData.commission/100)).toFixed(2),
        transactionNo: this.transactionNo,
        paidTo: this.paidTo,
        referenceDocument:this.referenceDocument,
        userId: this.distributorId
      })
      await this.api.createCommission(data).toPromise();
      await this.api.updateEnquiry(JSON.stringify({isRequested:false}),res._id).toPromise();
    });
    await Promise.all(servicePromises);
    this.clear();
    this.modal.dismissAll();
    this.dataTable.DataTable().clear().destroy();
    this.getBookings();
  }

  async settlePlan(){
    const servicePlanPromises = this.selectedPlanSevices.map(async (res: any) => {
      let data = JSON.stringify({
        subscriptionId: res._id,
        amount: res.planId?.amount,
        transactionNo: this.transactionNo,
        paidTo: this.paidTo,
        referenceDocument:this.referenceDocument,
        userId: this.distributorId
      })
      await this.api.createCommission(data).toPromise();
      await this.api.updateEnquiry(JSON.stringify({isRequested:false}),res._id).toPromise();
    });
    await Promise.all(servicePlanPromises);
    this.clear();
    this.modal.dismissAll();
    this.dataTable.DataTable().clear().destroy();
    this.getBookings();
  }

  changeDate(event:any){
  
  
    var date = event.target.value.split(' to ');
    if(date.length == 2){
      var date1 = date[0];
      var date2 = date[1];
      this.dataTable.DataTable().clear().destroy()
      this.loading = true;
      this.api.getEnquiryByVendorAndDate(this.distributorId,date1,date2).subscribe(async res=>{
        console.log(res);
        const servicePromises = res.data.map(async (res: any) => {
          res.commissionData = (await this.api.getAllCommissionByEnquiry(res._id).toPromise()).data[0];
        });
        await Promise.all(servicePromises);
        this.services = res.data;
        console.log(this.services)
        setTimeout(() => {
          console.log(this.dataTable)
          // if(!this.dataTable){
            this.dataTable = $(this.table.nativeElement);
            this.dataTable.DataTable({
              "searching":   false,
              "lengthChange": false,
              "info":     false
            });
          // }
          
        }, 500);
        this.commissionAmount = this.services.reduce((total:any, aData:any) => ((total*1) + ((parseFloat((((aData.serviceId?.serviceType == 1)?aData.servicePackageId?.cost:aData.subServiceId?.cost) * (this.userData.commission /100)).toFixed(2)) || 0)*1)).toFixed(2), 0);
        this.settlementAmount = this.services.reduce((total:any, aData:any) => ((total*1) + ((aData.commissionData?.amount) || 0)*1).toFixed(2), 0);
        this.saleAmount = this.services.reduce((total:any, aData:any) => (((total*1)) + (((aData.serviceId?.serviceType == 1)?aData.servicePackageId?.cost:aData.subServiceId?.cost) || 0)*1), 0);
      });
      this.api.getSubsByVendorAndDate(this.distributorId,date1,date2).subscribe(async res=>{
        const subsPromises = res.data.map(async (res: any) => {
          res.commissionData = (await this.api.getAllCommissionBySubscription(res._id).toPromise()).data[0];
        });
        await Promise.all(subsPromises);
        this.plans = res.data;
        setTimeout(() => {
          if(!this.dataTable1){
            this.dataTable1 = $(this.table1.nativeElement);
            this.dataTable1.DataTable({
              "searching":   false,
              "lengthChange": false,
              "info":     false
            });
          }
          
        }, 500);
        this.commissionAmount = parseFloat(this.commissionAmount) + this.plans.reduce((total:any, aData:any) => ((total*1) + ((aData.planId?.amount) || 0)*1).toFixed(2), 0);
        this.settlementAmount = parseFloat(this.settlementAmount) + this.plans.reduce((total:any, aData:any) => ((total*1) + ((aData.commissionData?.amount) || 0)*1).toFixed(2), 0);
        // console.log(this.commissionAmount)
        this.saleAmount = parseFloat(this.saleAmount) + this.services.reduce((total:any, aData:any) => (((total*1)) + ((aData.planId?.amount) || 0)*1).toFixed(2), 0);
        this.loading = false;
      });
    }
  }
  getBookings(){
    this.loading = true;
    this.api.getEnquiryByVendor(this.distributorId).subscribe(async res=>{
      const servicePromises = res.data.map(async (res: any) => {
        res.commissionData = (await this.api.getAllCommissionByEnquiry(res._id).toPromise()).data[0];
      });
      await Promise.all(servicePromises);
      this.services = res.data;
      console.log(this.services)
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
      this.commissionAmount = this.services.reduce((total:any, aData:any) => ((total*1) + ((parseFloat((((aData.serviceId?.serviceType == 1)?aData.servicePackageId?.cost:aData.subServiceId?.cost) * (this.userData.commission /100)).toFixed(2)) || 0)*1)).toFixed(2), 0);
      this.settlementAmount = this.services.reduce((total:any, aData:any) => ((total*1) + ((aData.commissionData?.amount) || 0)*1).toFixed(2), 0);
      // console.log(this.commissionAmount)
      this.saleAmount = this.services.reduce((total:any, aData:any) => (((total*1)) + (((aData.serviceId?.serviceType == 1)?aData.servicePackageId?.cost:aData.subServiceId?.cost) || 0)*1), 0);
      this.loading = false;
    });

    this.api.getSubsByVendor(this.distributorId).subscribe(async res=>{
      const subsPromises = res.data.map(async (res: any) => {
        res.commissionData = (await this.api.getAllCommissionBySubscription(res._id).toPromise()).data[0];
      });
      await Promise.all(subsPromises);
      this.plans = res.data;
      setTimeout(() => {
        if(!this.dataTable1){
          this.dataTable1 = $(this.table1.nativeElement);
          this.dataTable1.DataTable({
            "searching":   false,
            "lengthChange": false,
            "info":     false
          });
        }
        
      }, 500);
      this.commissionAmount = parseFloat(this.commissionAmount) + this.plans.reduce((total:any, aData:any) => ((total*1) + ((aData.planId?.amount) || 0)*1).toFixed(2), 0);
      this.settlementAmount = parseFloat(this.settlementAmount) + this.plans.reduce((total:any, aData:any) => ((total*1) + ((aData.commissionData?.amount) || 0)*1).toFixed(2), 0);
      // console.log(this.commissionAmount)
      this.saleAmount = parseFloat(this.saleAmount) + this.services.reduce((total:any, aData:any) => (((total*1)) + ((aData.planId?.amount) || 0)*1).toFixed(2), 0);
      this.loading = false;
    });
  }

  searchBranch(event:any){
    this.searchTerm = event.target.value;
    this.page = 1;
    this.getBookings();
  }

  nextPage(){
    this.page += 1;
    this.getBookings();
  }

  previousPage(){
    this.page -= 1;
    this.getBookings();
  }

  changeRevenuePeriod(value:any){
    this.revenuePeriod = value;
  }

}
