import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/helpers/auth.guard';

const routes: Routes = [
  {
    path:'login',
    loadChildren:() => import('./Auth/login/login.module').then(m=>m.LoginPageModule)
  },
  {
    path:'signup',
    loadChildren:() => import('./Auth/signup/signup.module').then(m=>m.SignupPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate:[AuthGuard]
  },
  {
    path: '',
    redirectTo: 'signup',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
