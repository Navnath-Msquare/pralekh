import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AppComponent } from 'src/app/app.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bread',
  templateUrl: './bread.component.html',
  styleUrls: ['./bread.component.scss']
})
export class BreadComponent implements OnInit {

  breadCrumbItems!: Array<{}>;
  categoryForm!: FormGroup;
  isEdit = false;
  id: any = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,
    public title: Title,
    public appC: AppComponent,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEdit = true;
        this.id = params['id'];
        this.breadCrumbItems = [
          { label: 'Categories' },
          { label: 'Edit Category', active: true }
        ];
        this.title.setTitle("Edit Category - " + this.appC.title);
        
        // Load existing category data for edit
        const savedData = localStorage.getItem('categories');
        if (savedData) {
          const categories = JSON.parse(savedData);
          const category = categories.find((c: any) => c._id === this.id);
          if (category) {
            this.categoryForm = this.fb.group({
              name: [category.name, Validators.required],
              status: [category.status, Validators.required]
            });
            return;
          }
        }
      } else {
        this.breadCrumbItems = [
          { label: 'Categories' },
          { label: 'Create Category', active: true }
        ];
        this.title.setTitle("Create Category - " + this.appC.title);
      }
      
      this.categoryForm = this.fb.group({
        name: ['', Validators.required],
        status: ['Active', Validators.required]
      });
    });
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      let categories = [];
      const savedData = localStorage.getItem('categories');
      if (savedData) {
        categories = JSON.parse(savedData);
      }
      
      if (this.isEdit) {
        // Update existing
        const index = categories.findIndex((c: any) => c._id === this.id);
        if (index !== -1) {
          categories[index].name = this.categoryForm.value.name;
          categories[index].status = this.categoryForm.value.status;
        }
      } else {
        // Create new
        const newCategory = {
          _id: Date.now().toString(),
          name: this.categoryForm.value.name,
          status: this.categoryForm.value.status
        };
        categories.push(newCategory);
      }
      
      localStorage.setItem('categories', JSON.stringify(categories));
      
      this.toast.success(`Category ${this.isEdit ? 'updated' : 'created'} successfully`);
      this.router.navigate(['/admin/categories']);
    } else {
      this.toast.error("Please fill all required fields");
    }
  }
}
