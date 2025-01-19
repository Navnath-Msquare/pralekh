import {
  HttpClient
} from '@angular/common/http';
import {
  Injectable
} from '@angular/core';
import {
  map
} from 'rxjs/operators';
import {
  environment
} from 'src/environments/environment';
import {
  AuthenticationService
} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public _headers: any;

  constructor(public http: HttpClient, public auths: AuthenticationService) {
    this._headers = {
      'Content-Type': 'application/json'
    };
  }

  /*********************************   Subscription   ***********************************/

  // Create Subscription
  createSubscription(data: any) {

    return this.http.post < any > (`${environment.baseURL}plan/create`, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // Update Subscription
  updateSubscription(data: any, id: any) {

    return this.http.put < any > (`${environment.baseURL}plan/` + id, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // All Subscription
  getAllSubscription() {

    return this.http.get < any > (`${environment.baseURL}plan-all` )
      .pipe(map((data, re) => {
        return data;
      }));
  }

     // All SubscriptionWhere
     getAllSubscriptionWhere(where:any={}) {

      return this.http.get < any > (`${environment.baseURL}plan-where?where=${JSON.stringify(where)}` )
        .pipe(map((data, re) => {
          return data;
        }));
    }


   // Delete Subscription
   deleteSubscription(id:any) {

    return this.http.delete < any > (`${environment.baseURL}plan/`+id )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // Single Subscription
  getSingleSubscription(id: any) {

    return this.http.get < any > (`${environment.baseURL}plan/` + id)
      .pipe(map((data, re) => {
        return data;
      }));
  }

  /*********************************   Company   ***********************************/

  // Create Company
  createCompany(data: any) {

    return this.http.post < any > (`${environment.baseURL}company/create`, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // Update Company
  updateCompany(data: any, id: any) {

    return this.http.put < any > (`${environment.baseURL}company/` + id, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // All Company
  getAllCompany() {

    return this.http.get < any > (`${environment.baseURL}company-all` )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // Single Company
  getSingleCompany(id: any) {

    return this.http.get < any > (`${environment.baseURL}company/` + id, )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  /*********************************   Banner   ***********************************/

  // Create Banner
  createBanner(data: any) {

    return this.http.post < any > (`${environment.baseURL}banner/create`, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // Update Banner
  updateBanner(data: any, id: any) {

    return this.http.put < any > (`${environment.baseURL}banner/` + id, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // All Banner
  getAllBanner() {

    return this.http.get < any > (`${environment.baseURL}banner-all` )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // Single Banner
  getSingleBanner(id: any) {

    return this.http.get < any > (`${environment.baseURL}banner/` + id, )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // Delete Banner
  deleteBanner(id:any) {

    return this.http.delete < any > (`${environment.baseURL}banner/`+id )
      .pipe(map((data, re) => {
        return data;
      }));
  }

   /*********************************   AllPincode   ***********************************/

  // Create AllPincode
  createAllPincode(data: any) {

    return this.http.post < any > (`${environment.baseURL}allpincode/create`, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // Update AllPincode
  updateAllPincode(data: any, id: any) {

    return this.http.put < any > (`${environment.baseURL}allpincode/` + id, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // All AllPincode
  getAllAllPincode() {

    return this.http.get < any > (`${environment.baseURL}allpincode-all` )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // All AllPincode By State
  getAllAllPincodeByState(state:any) {

    return this.http.get < any > (`${environment.baseURL}allpincode-state/`+state )
      .pipe(map((data, re) => {
        return data;
      }));
  }

    // All AllPincode By Pincode
    getAllAllPincodeByPincode(pincode:any) {

      return this.http.get < any > (`${environment.baseURL}allpincode-pincode/`+pincode )
        .pipe(map((data, re) => {
          return data;
        }));
    }

  // Single AllPincode
  getSingleAllPincode(id: any) {

    return this.http.get < any > (`${environment.baseURL}allpincode/` + id, )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  /*********************************   AssignDelivery   ***********************************/

  // Create AssignDelivery
  createAssignDelivery(data: any) {

    return this.http.post < any > (`${environment.baseURL}assignDelivery/create`, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // Update AssignDelivery
  updateAssignDelivery(data: any, id: any) {

    return this.http.put < any > (`${environment.baseURL}assignDelivery/` + id, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // All AssignDelivery
  getAllAssignDelivery() {

    return this.http.get < any > (`${environment.baseURL}assignDelivery-all` )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // All AssignDelivery By Delivery
  getAllAssignDeliveryByDelivery(delivery:any) {

    return this.http.get < any > (`${environment.baseURL}assignDelivery-delivery/`+delivery )
      .pipe(map((data, re) => {
        return data;
      }));
  }

    // All AssignDelivery By Enquiry
    getAllAssignDeliveryByEnquiry(enquiry:any) {

      return this.http.get < any > (`${environment.baseURL}assignDelivery-enquiry/`+enquiry )
        .pipe(map((data, re) => {
          return data;
        }));
    }

  // Single AssignDelivery
  getSingleAssignDelivery(id: any) {

    return this.http.get < any > (`${environment.baseURL}assignDelivery/` + id, )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // Delete AssignDelivery
  deleteAssignDelivery(id:any) {

    return this.http.delete < any > (`${environment.baseURL}assignDelivery/`+id )
      .pipe(map((data, re) => {
        return data;
      }));
  }
 
  /*********************************   License   ***********************************/

  // Create License
  createLicense(data: any) {

    return this.http.post < any > (`${environment.baseURL}license/create`, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }

   // Create Bulk License
   createBulkLicense(data: any) {

    return this.http.post < any > (`${environment.baseURL}license/create/bulk`, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // Update License
  updateLicense(data: any, id: any) {

    return this.http.put < any > (`${environment.baseURL}license/` + id, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // All License
  getAllLicense() {

    return this.http.get < any > (`${environment.baseURL}license-all` )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  //  License By Vendor
  getAllLicenseByVendor(vendorId:any) {

    return this.http.get < any > (`${environment.baseURL}license-vendor/`+vendorId )
      .pipe(map((data, re) => {
        return data;
      }));
  }

   //  License Count By Vendor
   getAllLicenseCountByVendor(vendorId:any) {

    return this.http.get < any > (`${environment.baseURL}license-count/`+vendorId )
      .pipe(map((data, re) => {
        return data;
      }));
  }
   //  License Count By Vendor
   getAllLicenseCountDateByVendor(vendorId:any,date1:any,date2:any) {

    return this.http.get < any > (`${environment.baseURL}license-count-date/`+vendorId +`/`+date1+ `/`+date2)
      .pipe(map((data, re) => {
        return data;
      }));
  }

   //  SalesByPlan
   getSalesByPlan(vendorId:any) {

    return this.http.get < any > (`${environment.baseURL}sales-by-plan/`+vendorId )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  //  SalesByPlanandDate
  getSalesByPlanandDate(vendorId:any,date1:any,date2:any) {

    return this.http.get < any > (`${environment.baseURL}sales-by-plan-date/`+vendorId +`/`+date1+ `/`+date2)
      .pipe(map((data, re) => {
        return data;
      }));
  }



   //  SalesByPlanAdmin
   getSalesByPlanAdmin() {

    return this.http.get < any > (`${environment.baseURL}sales-by-plan-admin` )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  //  SalesByPlanandDateAdmin
  getSalesByPlanandDateAdmin(date1:any,date2:any) {

    return this.http.get < any > (`${environment.baseURL}sales-by-plan-date-admin/`+date1+ `/`+date2)
      .pipe(map((data, re) => {
        return data;
      }));
  }


  // Single License
  getSingleLicense(id: any) {

    return this.http.get < any > (`${environment.baseURL}license/` + id, )
      .pipe(map((data, re) => {
        return data;
      }));
  }


  /*********************************   Pincodes   ***********************************/

   // Create Pincode
   createPincode(data: any) {

    return this.http.post < any > (`${environment.baseURL}pincode/create`, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }

   // Update Pincode
   updatePincode(data: any,id:any) {

    return this.http.put < any > (`${environment.baseURL}pincode/`+id, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }


  // All Pincode
  getAllPincode() {

    return this.http.get < any > (`${environment.baseURL}pincode-all`, )
      .pipe(map((data, re) => {
        return data;
      }));
  }


  // All Pincode By Vendor
  getAllPincodeByVendor(id:any) {

    return this.http.get < any > (`${environment.baseURL}pincode-vendor/`+id, )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // Single Pincode
  getSinglePincode(id:any) {

    return this.http.get < any > (`${environment.baseURL}pincode/`+id )
      .pipe(map((data, re) => {
        return data;
      }));
  }


  // Delete Pincode
  deletePincode(id:any) {

    return this.http.delete < any > (`${environment.baseURL}pincode/`+id )
      .pipe(map((data, re) => {
        return data;
      }));
  }

   /*********************************   SpecialPackages   ***********************************/

   // Create SpecialPackage
   createSpecialPackage(data: any) {

    return this.http.post < any > (`${environment.baseURL}specialPackages/create`, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }

   // Update SpecialPackage
   updateSpecialPackage(data: any,id:any) {

    return this.http.put < any > (`${environment.baseURL}specialPackages/`+id, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }


  // All SpecialPackage
  getAllSpecialPackage() {

    return this.http.get < any > (`${environment.baseURL}specialPackages-all`, )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // Single SpecialPackage
  getSingleSpecialPackage(id:any) {

    return this.http.get < any > (`${environment.baseURL}specialPackages/`+id )
      .pipe(map((data, re) => {
        return data;
      }));
  }


  // Delete SpecialPackage
  deleteSpecialPackage(id:any) {

    return this.http.delete < any > (`${environment.baseURL}specialPackages/`+id )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  /*********************************   Commission   ***********************************/

   // Create Commission
   createCommission(data: any) {

    return this.http.post < any > (`${environment.baseURL}commission/create`, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }

   // Update Commission
   updateCommission(data: any,id:any) {

    return this.http.put < any > (`${environment.baseURL}commission/`+id, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }


  // All Commission
  getAllCommission() {

    return this.http.get < any > (`${environment.baseURL}commission-all`, )
      .pipe(map((data, re) => {
        return data;
      }));
  }

   // All CommissionByUser
   getAllCommissionByUser(id:any) {

    return this.http.get < any > (`${environment.baseURL}commission-user/`+id, )
      .pipe(map((data, re) => {
        return data;
      }));
  }

   // All Commission
   getAllCommissionByEnquiry(id:any) {

    return this.http.get < any > (`${environment.baseURL}commission-enquiry/`+id, )
      .pipe(map((data, re) => {
        return data;
      }));
  }

   // All Commission
   getAllCommissionBySubscription(id:any) {

    return this.http.get < any > (`${environment.baseURL}commission-subscription/`+id, )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // Single Commission
  getSingleCommission(id:any) {

    return this.http.get < any > (`${environment.baseURL}commission/`+id )
      .pipe(map((data, re) => {
        return data;
      }));
  }


  // Delete Commission
  deleteCommission(id:any) {

    return this.http.delete < any > (`${environment.baseURL}commission/`+id )
      .pipe(map((data, re) => {
        return data;
      }));
  }
  
  /*********************************   Support   ***********************************/

  // Create Support
  createSupport(data: any) {

    return this.http.post < any > (`${environment.baseURL}support/create`, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // Update Support
  updateSupport(data: any, id: any) {

    return this.http.put < any > (`${environment.baseURL}support/` + id, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // All Support
  getAllSupport() {

    return this.http.get < any > (`${environment.baseURL}support-all` )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // Single Support
  getSingleSupport(id: any) {

    return this.http.get < any > (`${environment.baseURL}support/` + id, )
      .pipe(map((data, re) => {
        return data;
      }));
  }



  // Delete Support
  deleteSupport(id:any) {

    return this.http.delete < any > (`${environment.baseURL}support/`+id )
      .pipe(map((data, re) => {
        return data;
      }));
  }
  
  /*********************************   Subscription   ***********************************/

  // Create Subs
  createSubs(data: any) {

    return this.http.post < any > (`${environment.baseURL}subscription/create`, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }


  // Update Subs
  updateSubs(data: any, id: any) {

    return this.http.put < any > (`${environment.baseURL}subscription/` + id, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // All Subs
  getAllSubs() {

    return this.http.get < any > (`${environment.baseURL}subscription-all` )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // All Subs Days
  getAllSubsByDays() {

    return this.http.get < any > (`${environment.baseURL}subscription-days` )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // All Subs Date
  getAllSubsByDate(date1:any,date2:any) {

    return this.http.get < any > (`${environment.baseURL}subscription-date/`+date1+`/`+date2 )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // First Subs By User
  getSubsByUser(id: any) {

    return this.http.get < any > (`${environment.baseURL}subscription-user/` + id, )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // First Subs By Vendor
  getSubsByVendor(id: any) {

    return this.http.get < any > (`${environment.baseURL}subscription-vendor/` + id, )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  //  Subs
  getSubsByVendorAndDate(id:any,date1:any,date2:any) {

    return this.http.get < any > (`${environment.baseURL}subscription-vendor-date/`+id+`/`+date1+`/`+date2, )
      .pipe(map((data, re) => {
        return data;
      }));
  }


  // Single Subs
  getSingleSubs(id: any) {

    return this.http.get < any > (`${environment.baseURL}subscription/` + id, )
      .pipe(map((data, re) => {
        return data;
      }));
  }

 

 /*********************************   Enquiry   ***********************************/

  // Create Enquiry
  createEnquiry(data: any) {

    return this.http.post < any > (`${environment.baseURL}enquiry/create`, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // Update Enquiry
  updateEnquiry(data: any, id: any) {

    return this.http.put < any > (`${environment.baseURL}enquiry/` + id, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // All Enquiry
  getAllEnquiry() {

    return this.http.get < any > (`${environment.baseURL}enquiry-all` )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // Single Enquiry
  getSingleEnquiry(id: any) {

    return this.http.get < any > (`${environment.baseURL}enquiry/` + id, )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  //  Enquiry
  getEnquiryByUser() {

    return this.http.get < any > (`${environment.baseURL}enquiry-user/`+this.auths.currentUserValue.id, )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  //  Enquiry
  getEnquiryByVendor(id:any) {

    return this.http.get < any > (`${environment.baseURL}enquiry-vendor/`+id, )
      .pipe(map((data, re) => {
        return data;
      }));
  }

   //  Enquiry
   getEnquiryByVendorAndDate(id:any,date1:any,date2:any) {

    return this.http.get < any > (`${environment.baseURL}enquiry-vendor-date/`+id+`/`+date1+`/`+date2, )
      .pipe(map((data, re) => {
        return data;
      }));
  }


  // Single Enquiry
  getSingleEnquiryByUserAndServicePackage(serviceId: any) {

    return this.http.get < any > (`${environment.baseURL}enquiry-sPackage/`+this.auths.currentUserValue.id+`/` + serviceId, )
      .pipe(map((data, re) => {
        return data;
      }));
  }


  // Single Enquiry
  getSingleEnquiryByUserAndSubService(serviceId: any) {

    return this.http.get < any > (`${environment.baseURL}enquiry-sService/`+this.auths.currentUserValue.id+`/` + serviceId, )
      .pipe(map((data, re) => {
        return data;
      }));
  }



  /*********************************   Vendor   ***********************************/

  // Create Vendor
  createVendor(data: any) {

    return this.http.post < any > (`${environment.baseURL}vendor/create`, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // Update Vendor
  updateVendor(data: any, id: any) {

    return this.http.put < any > (`${environment.baseURL}vendor/` + id, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }


  // All Vendor
  getAllVendor() {

    return this.http.get < any > (`${environment.baseURL}vendor-all/`+this.auths.currentUserValue.companyId, )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // Vendor KPI
  getVendorKPI() {

    return this.http.get < any > (`${environment.baseURL}vendor-kpi/`+this.auths.currentUserValue.companyId, )
      .pipe(map((data, re) => {
        return data;
      }));
  }


  // Single Vendor
  getSingleVendor(id: any) {

    return this.http.get < any > (`${environment.baseURL}vendor/` + id)
      .pipe(map((data, re) => {
        return data;
      }));
  }


  /*********************************   ServiceRequest   ***********************************/

  // Create ServiceRequest
  createServiceRequest(data: any) {

    return this.http.post < any > (`${environment.baseURL}serviceRequest/create`, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // Update ServiceRequest
  updateServiceRequest(data: any, id: any) {

    return this.http.put < any > (`${environment.baseURL}serviceRequest/` + id, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }


  // All ServiceRequest
  getAllServiceRequest() {

    return this.http.get < any > (`${environment.baseURL}serviceRequest-all`, )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // All Private ServiceRequest
  getAllPrivateServiceRequest() {

    return this.http.get < any > (`${environment.baseURL}serviceRequest-private`, )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // All Government ServiceRequest
  getAllGovernmentServiceRequest() {

    return this.http.get < any > (`${environment.baseURL}serviceRequest-government`, )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // Single ServiceRequest
  getSingleServiceRequest(id: any) {

    return this.http.get < any > (`${environment.baseURL}serviceRequest/` + id)
      .pipe(map((data, re) => {
        return data;
      }));
  }


  // Delete ServiceRequest
  deleteServiceRequest(id:any) {

    return this.http.delete < any > (`${environment.baseURL}serviceRequest/`+id )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  /*********************************   Services   ***********************************/

  // Create Services
  createServices(data: any) {

    return this.http.post < any > (`${environment.baseURL}service/create`, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // Update Services
  updateServices(data: any, id: any) {

    return this.http.put < any > (`${environment.baseURL}service/` + id, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }


  // All Services
  getAllServices() {

    return this.http.get < any > (`${environment.baseURL}service-all`, )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // All Private Services
  getAllPrivateServices() {

    return this.http.get < any > (`${environment.baseURL}service-private`, )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // All Government Services
  getAllGovernmentServices() {

    return this.http.get < any > (`${environment.baseURL}service-government`, )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // Single Services
  getSingleServices(id: any) {

    return this.http.get < any > (`${environment.baseURL}service/` + id)
      .pipe(map((data, re) => {
        return data;
      }));
  }


  // Delete Services
  deleteServices(id:any) {

    return this.http.delete < any > (`${environment.baseURL}service/`+id )
      .pipe(map((data, re) => {
        return data;
      }));
  }


  /*********************************   ServicePackage   ***********************************/

  // Create ServicePackage
  createServicePackage(data: any) {

    return this.http.post < any > (`${environment.baseURL}servicePackage/create`, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // Update ServicePackage
  updateServicePackage(data: any, id: any) {

    return this.http.put < any > (`${environment.baseURL}servicePackage/` + id, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }


  // All ServicePackage
  getAllServicePackage(id:any) {

    return this.http.get < any > (`${environment.baseURL}servicePackage-all/`+id, )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // Single ServicePackage
  getSingleServicePackage(id: any) {

    return this.http.get < any > (`${environment.baseURL}servicePackage/` + id)
      .pipe(map((data, re) => {
        return data;
      }));
  }



  // Delete ServicePackage
  deleteServicePackage(id:any) {

    return this.http.delete < any > (`${environment.baseURL}servicePackage/`+id )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  
  /*********************************   SubService   ***********************************/

  // Create SubService
  createSubService(data: any) {

    return this.http.post < any > (`${environment.baseURL}govSubService/create`, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // Update SubService
  updateSubService(data: any, id: any) {

    return this.http.put < any > (`${environment.baseURL}govSubService/` + id, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }


  // All SubService
  getAllSubService(id:any) {

    return this.http.get < any > (`${environment.baseURL}govSubService-all/`+id, )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // Single SubService
  getSingleSubService(id: any) {

    return this.http.get < any > (`${environment.baseURL}govSubService/` + id)
      .pipe(map((data, re) => {
        return data;
      }));
  }



  // Delete SubService
  deleteSubService(id:any) {

    return this.http.delete < any > (`${environment.baseURL}govSubService/`+id )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  /*********************************   File Handling   ***********************************/

  uploadFile(filedata: any) {
    return this.http.post < any > (`${environment.baseURL}upload/`, filedata)
      .pipe(map(data => {
        return data;
      }));
  }

  downloadFile(filename: any) {
    return this.http.get < any > (`${environment.baseURL}download/` + filename).subscribe(data => {

    });
  }

   //  Count
   count() {

    return this.http.get < any > (`${environment.baseURL}count`)
      .pipe(map((data, re) => {
        return data;
      }));
  }

   //  Count By Date
   countByDate(date1:any,date2:any) {

    return this.http.get < any > (`${environment.baseURL}count-date/`+date1+ `/`+date2)
      .pipe(map((data, re) => {
        return data;
      }));
  }


  getUpcomingSchedules(){
    return this.http.get < any > (`${environment.baseURL}get-upcoming-schedules/`+this.auths.currentUserValue.companyId, )
    .pipe(map((data, re) => {
      return data;
    }));
  }


  getDateWiseUpcomingSchedules(date1:any,date2:any){
    return this.http.get < any > (`${environment.baseURL}get-date-wise-upcoming-schedules/`+this.auths.currentUserValue.companyId+`/`+date1+`/`+date2, )
    .pipe(map((data, re) => {
      return data;
    }));
  }

  getCurrentYearSales(){
    return this.http.get < any > (`${environment.baseURL}get-current-sales/`+this.auths.currentUserValue.companyId, )
    .pipe(map((data, re) => {
      return data;
    }));
  }

  getSelectedYearSales(year:any){
    return this.http.get < any > (`${environment.baseURL}get-selected-year-sales/`+this.auths.currentUserValue.companyId+`/`+year, )
    .pipe(map((data, re) => {
      return data;
    }));
  }

  getUpcomingSchedulesForEmp(empId:any){
    return this.http.get < any > (`${environment.baseURL}get-upcoming-schedules-emp/`+this.auths.currentUserValue.companyId+`/`+empId, )
    .pipe(map((data, re) => {
      return data;
    }));
  }


  getDateWiseUpcomingSchedulesForEmp(date1:any,date2:any,empId:any){
    return this.http.get < any > (`${environment.baseURL}get-date-wise-upcoming-schedules-emp/`+this.auths.currentUserValue.companyId+`/`+date1+`/`+date2+`/`+empId, )
    .pipe(map((data, re) => {
      return data;
    }));
  }

  getCurrentYearSalesForEmp(){
    return this.http.get < any > (`${environment.baseURL}get-current-sales-emp/`+this.auths.currentUserValue.companyId+`/`+this.auths.currentUserValue.id, )
    .pipe(map((data, re) => {
      return data;
    }));
  }

  getSelectedYearSalesForEmp(year:any){
    return this.http.get < any > (`${environment.baseURL}get-selected-year-sales-emp/`+this.auths.currentUserValue.companyId+`/`+year+`/`+this.auths.currentUserValue.id, )
    .pipe(map((data, re) => {
      return data;
    }));
  }

  /*********************************   Quotation   ***********************************/

  // Create Quotation
  createQuotation(data: any) {

    return this.http.post < any > (`${environment.baseURL}quotation/create`, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // Update Quotation
  updateQuotation(data: any, id: any) {

    return this.http.put < any > (`${environment.baseURL}quotation/` + id, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }


  // All Quotation
  getAllQuotation() {

    return this.http.get < any > (`${environment.baseURL}quotation-all/`+this.auths.currentUserValue.companyId, )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // All Quotation By Created By
  getQuotationsByCreatedBy() {

    return this.http.get < any > (`${environment.baseURL}quotation/created/` + this.auths.currentUserValue.id, )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // Quotation KPI
  getQuotationKPI() {

    return this.http.get < any > (`${environment.baseURL}quotation-kpi-all/`+this.auths.currentUserValue.companyId, )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // Quotation KPI By Created
  getQuotationKPIByCreated() {

    return this.http.get < any > (`${environment.baseURL}quotation-kpi/` + this.auths.currentUserValue.id, )
      .pipe(map((data, re) => {
        return data;
      }));
  }



  // Single Quotation
  getSingleQuotation(id: any) {

    return this.http.get < any > (`${environment.baseURL}quotation/` + id)
      .pipe(map((data, re) => {
        return data;
      }));
  }

  /*********************************   Tax   ***********************************/

   // Create Tax
   createTax(data: any) {

    return this.http.post < any > (`${environment.baseURL}tax/create`, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }

   // Update Tax
   updateTax(data: any,id:any) {

    return this.http.put < any > (`${environment.baseURL}tax/`+id, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }


  // All Tax
  getAllTax() {

    return this.http.get < any > (`${environment.baseURL}tax-all/`+this.auths.currentUserValue.companyId, )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // Single Tax
  getSingleTax(id:any) {

    return this.http.get < any > (`${environment.baseURL}tax/`+id )
      .pipe(map((data, re) => {
        return data;
      }));
  }


  // Delete Tax
  deleteTax(id:any) {

    return this.http.delete < any > (`${environment.baseURL}tax/`+id )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  /*********************************   Invoice   ***********************************/

  // Create Invoice
  createInvoice(data: any) {

    return this.http.post < any > (`${environment.baseURL}invoice/create`, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // Update Invoice
  updateInvoice(data: any, id: any) {

    return this.http.put < any > (`${environment.baseURL}invoice/` + id, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }


  // All Invoice
  getAllInvoice() {

    return this.http.get < any > (`${environment.baseURL}invoice-all/`+this.auths.currentUserValue.companyId, )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // All Invoice By Created By
  getInvoicessByCreatedBy() {

    return this.http.get < any > (`${environment.baseURL}invoice/created/` + this.auths.currentUserValue.id, )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // Invoice KPI
  getInvoiceKPI() {

    return this.http.get < any > (`${environment.baseURL}invoice-kpi-all/`+this.auths.currentUserValue.companyId, )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // Invoice KPI By Created
  getInvoiceKPIByCreated() {

    return this.http.get < any > (`${environment.baseURL}invoice-kpi/` + this.auths.currentUserValue.id, )
      .pipe(map((data, re) => {
        return data;
      }));
  }


  // Single Invoice
  getSingleInvoice(id: any) {

    return this.http.get < any > (`${environment.baseURL}invoice/` + id)
      .pipe(map((data, re) => {
        return data;
      }));
  }

  /*********************************   Comment   ***********************************/
  // Create Comment
  createComment(data: any) {

    return this.http.post < any > (`${environment.baseURL}comment/create`, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // Update Comment
  updateComment(data: any, id: any) {

    return this.http.put < any > (`${environment.baseURL}comment/` + id, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }


  // All Comment
  getAllComment(taskId:any) {

    return this.http.get < any > (`${environment.baseURL}comment/`+taskId, )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // Delete Comment
  deleteAllComment(id:any) {

    return this.http.delete < any > (`${environment.baseURL}comment/`+id, )
      .pipe(map((data, re) => {
        return data;
      }));
  }


  /*********************************   Setting   ***********************************/

  // Update Settings
  updateSettings(data: any, userId: any) {

    return this.http.put < any > (`${environment.baseURL}setting/` + userId, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // Get Comapny Setting
  getCompanySetting(userId:any) {

    return this.http.get < any > (`${environment.baseURL}setting/`+userId, )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  /*********************************   Other   ***********************************/

  // Get Single User
  getSingleUser(id:any) {

    return this.http.get < any > (`${environment.baseURL}users/`+id, )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // Get All User
  getAllUser() {

    return this.http.get < any > (`${environment.baseURL}users`, )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // Get All Distributor
  getAllDistributor() {

    return this.http.get < any > (`${environment.baseURL}distributors`, )
      .pipe(map((data, re) => {
        return data;
      }));
  }

   // Get All Delivery
   getAllDelivery() {

    return this.http.get < any > (`${environment.baseURL}delivery`, )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  updateUser(data: any, userId: any) {

    return this.http.put < any > (`${environment.baseURL}users/` + userId, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }

   // Delete User
   deleteUser(id:any) {

    return this.http.delete < any > (`${environment.baseURL}users/`+id )
      .pipe(map((data, re) => {
        return data;
      }));
  }

  // Create Distributor
  createDistributor(data: any) {

    return this.http.post < any > (`${environment.baseURL}distributors/create`, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }

   // Create Delivery
   createDelivery(data: any) {

    return this.http.post < any > (`${environment.baseURL}delivery/create`, data, {
        headers: this._headers
      })
      .pipe(map((data, re) => {
        return data;
      }));
  }
}