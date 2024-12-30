import { ActivatedRouteSnapshot, CanDeactivateFn, RouterStateSnapshot } from "@angular/router";
import { CategoryComponent } from "../main-component/Product/category/category.component";

export const unsavedGuard : CanDeactivateFn<CategoryComponent> = (
    component : CategoryComponent,
    currentRoute : ActivatedRouteSnapshot,
    currentState : RouterStateSnapshot,
    nextState ?: RouterStateSnapshot
) => {
  return component.unsavedPage ? component.unsavedPage() : true;
}