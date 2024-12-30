import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { environment } from '../../environment/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { DemoForm, LoginModel, Test } from '../models/login';
import { isPlatformBrowser } from '@angular/common';
import { CategoryModel, GetCategoryModel, GetOrdersModel, GetProductsModel, GetReviewsModel, GetShippingAddressModel, OrdersModel, ProductModel, ReviewsModel, ShippingAddressModel, WishlistsModel } from '../models/product';

@Injectable({
  providedIn: 'root',
})

export class UserServicesService {
  apiUrl = `${environment.apiUrl}`;
  public spinnerCounter = new BehaviorSubject<number>(0);
  spinnerCounter$ = this.spinnerCounter.asObservable();

  constructor(
    private http: HttpClient,
    private route: Router,
    @Inject(PLATFORM_ID) private platformId: Object // Inject platform ID for SSR compatibility
  ) {}

  /** Spinner methods for Loader */
  showSpinner() {
    this.spinnerCounter.next(this.spinnerCounter.value + 1);
  }

  hideSpinner() {
    this.spinnerCounter.next(this.spinnerCounter.value - 1);
  }

  testApi(data: any): Observable<DemoForm[]> {
    return this.http.post<DemoForm[]>(`${this.apiUrl}/test/addTestApi`, data);
  }

  /** Login API call */
  login(data: any): Observable<LoginModel[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post<LoginModel[]>(`${this.apiUrl}/auth/login`, data, { headers: headers });
  }

  /** Decodes a JWT token */
  private decodeToken(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(window.atob(base64));
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  isLoggedIn(): boolean {
    if (isPlatformBrowser(this.platformId)) { // Ensure this runs in the browser
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = this.decodeToken(token);
        if (decodedToken?.exp) {
          const expirationTime = new Date(decodedToken.exp * 1000);
          const currentTime = new Date();
          if (expirationTime > currentTime) {
            return true;
          }
        }
      }
      this.route.navigate(['login']); // Navigate if token is invalid or expired
    }
    return false;
  }
  
  logout() {
    if (isPlatformBrowser(this.platformId)) { // Clear localStorage only in the browser
      localStorage.clear();
    }
    return this.route.navigate(['login']);
  }
  
  isTokenExpired(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('token');
      if (token) {
        const decodedToken = this.decodeToken(token);
        if (decodedToken?.exp) {
          const expirationTime = decodedToken.exp * 1000;
          const currentTime = new Date().getTime();
          return expirationTime < currentTime;
        }
      }
    }
    return true; // Default to expired if not in the browser
  }

  getCategoryDetails(data: any): Observable<GetCategoryModel[]> {
    return this.http.post<GetCategoryModel[]>(this.apiUrl + '/product/getCategoryDetails', data);
  }

  addCategory(data: any): Observable<CategoryModel[]> {
    return this.http.post<CategoryModel[]>(this.apiUrl + '/product/addCategory', data);
  }

  getProductDetails(data: any): Observable<GetProductsModel[]> {
    return this.http.post<ProductModel[]>(this.apiUrl + '/product/getProductDetails', data);
  }

  addProducts(data: any): Observable<ProductModel[]> {
    return this.http.post<ProductModel[]>(this.apiUrl + '/product/addProducts', data);
  }
 
  getShippingAddressDetails(data: any): Observable<GetShippingAddressModel[]> {
    return this.http.post<GetShippingAddressModel[]>(this.apiUrl + '/product/getShippingAddressDetails', data);
  }

  addShippingAddress(data: any): Observable<ShippingAddressModel[]> {
    return this.http.post<ShippingAddressModel[]>(this.apiUrl + '/product/addShippingAddress', data);
  }

  getWishlistsDetails(data: any): Observable<WishlistsModel[]> {
    return this.http.post<WishlistsModel[]>(this.apiUrl + '/product/getWishlistsDetails', data);
  }

  addWishlists(data: any): Observable<WishlistsModel[]> {
    return this.http.post<WishlistsModel[]>(this.apiUrl + '/product/addWishlists', data);
  }

  getReviewsDetails(data: any): Observable<GetReviewsModel[]> {
    return this.http.post<GetReviewsModel[]>(this.apiUrl + '/product/getReviewsDetails', data);
  }

  addReviews(data: any): Observable<ReviewsModel[]> {
    return this.http.post<ReviewsModel[]>(this.apiUrl + '/product/addReviews', data);
  }

  getOrderDetails(data: any): Observable<GetOrdersModel[]> {
    return this.http.post<GetOrdersModel[]>(this.apiUrl + '/product/getOrderDetails', data);
  }

  addOrders(data: any): Observable<OrdersModel[]> {
    return this.http.post<OrdersModel[]>(this.apiUrl + "/product/addOrders", data);
  }



























































































  // getOrgnizationDetails(data: any) {
  //   return this.http.post(this.apiUrl + "/test/getOrgnizationDetails", {orgnizationId: data});
  // }

  // getAreaDetails(data: any) {
  //   return this.http.post(this.apiUrl + "/test/getAreaDetails", {areaId: data});
  // }

  // getAuditDetails(data: any) {
  //   return this.http.post(this.apiUrl + "/test/getAuditDetails", { auditId: data});
  // }

  // getFrequencyDetails(data: any) {
  //   return this.http.post(this.apiUrl + "/test/getFrequencyDetails", { frequencyId: data});
  // }

  // getLineDetails(data: any) {
  //   return this.http.post(this.apiUrl + "/test/getLineDetails", { lineId: data });
  // }

  // getSpecTypeDetails(data: any) {
  //   return this.http.post(this.apiUrl + "/test/getSpecTypeDetails", {specTypeId: data});
  // }

  // getCateDetails(data: any) {
  //   return this.http.post(this.apiUrl + "/test/getCateDetails", {categoryId: data});
  // }
}
