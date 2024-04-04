import { Routes } from '@angular/router';
import { AddAdminPageComponent } from './pages/add-admin-page/add-admin-page.component';
import { AddCategoryPageComponent } from './pages/add-category-page/add-category-page.component';
import { AddChainPageComponent } from './pages/add-chain-page/add-chain-page.component';
import { AddProductPageComponent } from './pages/add-product-page/add-product-page.component';
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { CategoriesPageComponent } from './pages/categories-page/categories-page.component';
import { ChainsPageComponent } from './pages/chains-page/chains-page.component';
import { FaqComponent } from './pages/faq/faq.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductsPageComponent } from './pages/products-page/products-page.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { UsersPageComponent } from './pages/users-page/users-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'settings',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'settings',
    component: SettingsComponent
  },
  {
    path: 'admin',
    component: AdminPageComponent
  },
  {
    path: 'add-admin',
    component: AddAdminPageComponent
  },
  {
    path: 'add-admin/:id',
    component: AddAdminPageComponent
  },
  {
    path: 'add-admin/:isAdmin',
    component: AddAdminPageComponent
  },
  {
    path: 'users',
    component: UsersPageComponent
  },
  {
    path: 'chains',
    component: ChainsPageComponent
  },
  {
    path: 'add-chain',
    component: AddChainPageComponent
  },
  {
    path: 'add-chain/:id',
    component: AddChainPageComponent
  },
  {
    path: 'categories',
    component: CategoriesPageComponent
  },
  {
    path: 'add-category',
    component: AddCategoryPageComponent
  },
  {
    path: 'add-category/:id',
    component: AddCategoryPageComponent
  },
  {
    path: 'products',
    component: ProductsPageComponent
  },
  {
    path: 'add-product',
    component: AddProductPageComponent
  },
  {
    path: 'add-product/:id',
    component: AddProductPageComponent
  },
  {
    path: 'faq',
    component: FaqComponent
  },
];
