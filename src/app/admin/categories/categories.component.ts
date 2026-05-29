import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AppComponent } from 'src/app/app.component';
declare var $: any;
import Swal from 'sweetalert2';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  @ViewChild('table') table: any;
  dataTable:any;
  breadCrumbItems!: Array<{}>;
  data:any=[];
  searchTerm:any="";
  statusTerm:any="";

  constructor(public router:Router, public title:Title, public appC:AppComponent) { }

  ngOnInit(): void {
    this.breadCrumbItems = [
      { label: 'Categories' },
      { label: 'Category List', active: true }
    ];
    this.title.setTitle("Categories - "+this.appC.title);
    
    // Load data from localStorage
    const savedData = localStorage.getItem('categories');
    if (savedData) {
      this.data = JSON.parse(savedData);
    }
    
    setTimeout(() => {
      if(!this.dataTable){
        this.dataTable = $(this.table.nativeElement);
        this.dataTable.DataTable({
          "searching": false,
          "lengthChange": false,
          "info": false
        });
      }
    }, 500);
  }

  edit(id:any){
    this.router.navigate(['/admin/categories/edit', id]);
  }

  view(item: any) {
    Swal.fire({
      title: 'Category Details',
      html: `
        <div style="text-align: left; margin-top: 15px;">
          <p><b>Name:</b> ${item.name}</p>
          <p><b>Status:</b> ${item.status}</p>
        </div>
      `,
      icon: 'info',
      confirmButtonColor: '#4a154b'
    });
  }

  changeStatus(item:any, event:any){
    let status = event.target.checked ? "Active" : "Inactive";
    item.status = status;
    // Save to localStorage
    localStorage.setItem('categories', JSON.stringify(this.data));
  }

  delete(id:any) {
    Swal.fire({
      title: 'You are about to delete a category?',
      text: 'Deleting this category will remove it from the database.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f46a6a',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Close'
    }).then(result => {
      if (result.value){
        this.data = this.data.filter((item:any) => item._id !== id);
        // Save to localStorage
        localStorage.setItem('categories', JSON.stringify(this.data));
        Swal.fire('Deleted!', 'Category has been deleted.', 'success');
      }
    });
  }
}
