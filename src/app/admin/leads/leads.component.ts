import {Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AppComponent } from 'src/app/app.component';
declare var $: any;

@Component({
  selector: 'app-leads',
  templateUrl: './leads.component.html',
  styleUrls: ['./leads.component.scss']
})
export class LeadsComponent implements OnInit {

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
      { label: 'Leads' },
      { label: 'Leads List', active: true }
    ];

    this.title.setTitle("Leads - " +this.appC.title)

    
     this._fetchData();

  }

    private _fetchData() {
      this.data=[{
        name:'Ritesh',
        mobile:9898989898,
        requirements:'-',
        source:'Facebook'
      },{
        name:'Bob',
        mobile:8989898989,
        requirements:'-',
        source:'IndiaMart'
      },{
        name:'Milind',
        mobile:7878787878,
        requirements:'-',
        source:'Website'
      },{
        name:'Lubdha',
        mobile:8787878787,
        requirements:'-',
        source:'JustDial'
      },{
        name:'Mohini',
        mobile:9878799878,
        requirements:'-',
        source:'pralekh.co.in'
      }]

    }

}
