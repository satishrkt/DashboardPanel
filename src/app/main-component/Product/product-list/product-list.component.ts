import { CategoryModel } from './../../../models/product';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangeDetectionStrategy, Component, OnInit, Inject, PLATFORM_ID, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { UserServicesService } from '../../../Services/user-services.service';
import { GetProductsModel, ProductModel } from '../../../models/product';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TabelComponent } from "../../../core/tabel/tabel.component";
import { ButtonDirectiveDirective } from '../../../shared-component/directives/button-directive.directive';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatTableModule, MatFormFieldModule, MatSortModule, MatInputModule,
    MatSelectModule, FormsModule, MatPaginatorModule, MatButtonModule, MatIconModule, TabelComponent, ButtonDirectiveDirective
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
  providers: [UserServicesService]
})
export class ProductListComponent implements  OnInit {

  actionBtn: string = "ADD";
  productData !: MatTableDataSource<ProductModel>;
  product: ProductModel = new ProductModel();
  imageName: string = '';
  getProduct: GetProductsModel = new GetProductsModel();
  categoryList: Array<CategoryModel> = [];
  userId: number | null = null;
  image64: string = '';
  tableColumns : string[] = ['productId', 'categoryName', 'name', 'regularPrice', 'salePrice', 'stockQuantity', 'action'];

  @ViewChild(MatSort) sort !: MatSort;
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private snackBar: MatSnackBar, private userServices: UserServicesService) { }
  
  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) { 
      this.userId = Number(localStorage.getItem('userId'));
      this.getCategoryDetails(this.getProduct);
      this.getProductDetails(this.getProduct);
    }
  }

  onFileSelected(event: any): void {
    const fileInput = event.target;
    if (fileInput.files && fileInput.files.length) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      const originalImageName = file.name; // Extract the original image name  
      reader.onload = (e: any) => {
        if (typeof e.target.result === 'string') {
          this.image64 = e.target.result; 
          this.product.base64Image.setValue(this.image64);  // For the Base64 image
          this.product.image.setValue(file.name);   // For the original file name
        } else {
          console.error('Invalid base64 string');
        }
      };  
      reader.readAsDataURL(file); // Read the file as a Data URL (Base64)
    } else {
      // Clear both fields if no file is selected
      this.product.image.setValue(null);
      this.product.base64Image.setValue(null);
    }
  }

  getCategoryDetails(data: any) {
    this.userServices.getCategoryDetails(data).subscribe({
      next: ((res: any) => {
        if(res.status === 1 && res.message === "SUCCESS") {
          this.categoryList = res.data;
        } else if(res.status === 0 && res.message === "FAILED") {
          this.categoryList = []
        }
      }),
      error: () => {},
      complete: () => {}
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.productData.filter = filterValue.trim().toLowerCase();

    if (this.productData.paginator) {
      this.productData.paginator.firstPage();
    }
  }

  getProductDetails(data: GetProductsModel) {
    this.userServices.getProductDetails(data).subscribe({
      next: ((res: any) => {
        if(res.status === 1 && res.message === "SUCCESS") {          
          this.productData = new MatTableDataSource<ProductModel>(res.data);
          this.productData.paginator = this.paginator;
          this.productData.sort = this.sort;
        } else if(res.status === 0 && res.message === "FAILED") {
          console.log("data not found");
        }
      }),
      error: () => {
        console.log("data not found");
      }
    });
  }

  onClickEditButton(data: ProductModel) {
    console.log(data)
    if(data !== null && data !== undefined) {
      this.actionBtn = 'UPDATE';
      this.product = data;
    }
  }

  onClickDeleteButton(event: Number) {
    console.log(event)
  }

  onSubmitForm(data: any) {
    this.product.userId = this.userId;
    if(this.product.productId == null && this.product.productId == undefined) {
      this.userServices.addProducts(data).subscribe({
        next: ((res: any) => {
          if(res.status === 1 && res.message === "SUCCESS") {
            this.snackBar.open("Added Successfully", "Close", { duration: 2000, verticalPosition: "top" });          
          } else if(res.status === 0 && res.message === "FAILED") {
            this.snackBar.open("Failed to add data", "Close", { duration: 2000, verticalPosition: "top" });
          }
        }),
        error: (error) => {
          this.snackBar.open(error.message, "Close", { verticalPosition: "top", duration: 2000 });
        },
        complete: () => {
          this.getProductDetails(this.getProduct);
        }
      })
    } else {
      this.imageName = this.product.image;
      this.userServices.addProducts(data).subscribe({
        next: ((res: any) => {
          if(res.status === 1 && res.message === "SUCCESS") {
            this.snackBar.open("Data Updated Successfully", "Close", { duration: 2000, verticalPosition: "top" });          
          } else if(res.status === 0 && res.message === "FAILED") {
            this.snackBar.open("Failed to update data", "Close", { duration: 2000, verticalPosition: "top" });
          }
        }),
        error: (error) => {
          this.snackBar.open(error.message, "Close", { verticalPosition: "top", duration: 2000 });
        },
        complete: () => {
          this.getProductDetails(this.getProduct);
        }
      })
    }
  }
  
}
