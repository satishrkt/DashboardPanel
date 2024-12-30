import { Route } from "@angular/router";
import { CategoryComponent } from "./category/category.component";
import { ProductListComponent } from "./product-list/product-list.component";
import { unsavedGuard } from "../../Guards/unsaved.guard";

// This is make normal/const routes
// export const routes: Routes = [
//     { path: '', component: ProductListComponent }
// ];

// This is default routes
export default [
    { path: '', component: ProductListComponent },
    { path: 'category', component: CategoryComponent, canDeactivate: [unsavedGuard] },
    { path: '', redirectTo: '/product', pathMatch: 'full'}
        
    // Create children path in same path and user <router-outlet></router-outlet> in product-list componet that route all child component in 
    // inner component
    // { path: '', component: ProductListComponent,
    //     children: [
    //     { path: 'category', component: CategoryComponent },
    //     { path: '', redirectTo: '/product/product', pathMatch: 'full' }
    // ]}
    
] as Route[];