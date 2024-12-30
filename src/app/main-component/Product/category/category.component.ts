import { Component, Inject, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoryModel, GetCategoryModel } from '../../../models/product';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { UserServicesService } from '../../../Services/user-services.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TabelComponent } from "../../../core/tabel/tabel.component";
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatSelectModule, 
    MatInputModule, MatButtonModule, TabelComponent, CKEditorModule
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent implements OnInit {

  editor = ClassicEditor;
  data: any = `<p>Hello, world!</p>`;
  category : CategoryModel = new CategoryModel();
  userId: number | null = null;
  unsavedForm: boolean = true;
  actionBtn : string = 'ADD';
  tableColumns :string[] = ['categoryId', 'name', 'action']
  categoryDataSource !: MatTableDataSource<CategoryModel>;
  getCategory : GetCategoryModel = new GetCategoryModel();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator !: MatPaginator;

  constructor(
    @Inject(PLATFORM_ID)private platformId: Object,
    private userService: UserServicesService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    if(isPlatformBrowser(this.platformId)) {
      this.userId = Number(localStorage.getItem('userId'));
      this.category.userId = this.userId;
      this.getCategoryDetails(this.getCategory)
    }      
  }

  unsavedPage(): boolean {
    if(this.unsavedForm) {
      confirm("Are you sure want you leave this page?");
    }
    return true;
  }

  getCategoryDetails(data: GetCategoryModel) {
    this.userService.getCategoryDetails(data).subscribe({
      next: ((res: any) => {
        if(res.status === 1 && res.message === "SUCCESS") {
          this.categoryDataSource = new MatTableDataSource<CategoryModel>(res.data);
          this.categoryDataSource.sort = this.sort;
          this.categoryDataSource.paginator = this.paginator;
        } else if(res.status === 0 && res.message === "FAILED") {
          console.log("Category data not found");
        }
      }),
      error: (err: any) => {
        console.log(err.meaasge);
      },
      complete: () => {}
    })
  }

  addCategory(data: CategoryModel) {
    this.userService.addCategory(data).subscribe({
      next: ((res: any) => {
        if(res.status === 1 && res.message === "SUCCESS") {
          this.snackBar.open("Category added successfully", "Ok", { duration: 2000, verticalPosition: 'top'});
        } else if(res.status === 0 && res.message === "FAILED") {
          this.snackBar.open("Failed to add data", "Ok", { duration: 2000, verticalPosition: 'top'});
        }
      }),
      error: (error) => {
        this.snackBar.open(error.message, "Ok", { duration: 2000, verticalPosition: 'top'});
      }
    });
  }

}
