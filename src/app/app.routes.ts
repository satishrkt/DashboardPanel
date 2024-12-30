import { provideRouter, Routes } from '@angular/router';
import { DashboardComponent } from './main-component/dashboard/dashboard.component';
import { PagenotfoundComponent } from './shared-component/pagenotfound/pagenotfound.component';
import { LoginComponent } from './shared-component/login/login.component';
import { authInterceptor } from './Interceptors/auth.interceptor';
import { authGuard } from './Guards/auth.guard';
import { ProductListComponent } from './main-component/Product/product-list/product-list.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent, title: 'Login Page' },
    { path: 'home', component: DashboardComponent, canActivate: [authGuard]},
    { path: 'product', component: ProductListComponent },

    // make lazy loading routes.ts file when file is not default 
    // { path: 'product', loadComponent: () => 
    //     import("path of component").then((c) => c.ProductListComponent)
    // },

    // make lazy loading routes.ts file when file is make default 
    { path: 'product', loadChildren: () => import('./main-component/Product/product.routes') },
    // { path: 'category', component: CategoryComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', component: PagenotfoundComponent }
];
