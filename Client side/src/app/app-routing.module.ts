import { AuthAdminService } from './shared-services/auth-admin.service';
import { AuthGaurdService } from './shared-services/auth-gaurd.service';
import { CreditComponent } from './core/account/credit/credit.component';
import { AccountComponent } from './core/account/account.component';
import { HomeComponent } from './core/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';

const routes: Routes = [
    { path: '', component: HomeComponent },
    {
        path: 'account',
        canActivate: [AuthGaurdService],
        component: AccountComponent
    },
    {
        path: 'account/credit',
        component: CreditComponent
    },
    { path: 'user', loadChildren: 'app/user/user.module#UserModule' },
    {
        path: 'admin',
        canActivate: [AuthAdminService],
        loadChildren: 'app/admin/admin.module#AdminModule'
    },
    { path: 'store', loadChildren: 'app/store/store.module#StoreModule' },
    { path: '**', redirectTo: '' }

    // { path: 'register', component: RegisterComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [];
