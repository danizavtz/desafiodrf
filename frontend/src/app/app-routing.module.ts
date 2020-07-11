import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { LoginComponent } from './login/login.component';
import { ConsultaComponent } from  './consulta/consulta.component';
import { ListaComponent } from './lista/lista.component';
import { CanActivateRouteGuard } from './can-activate-route.guard';


const routes: Routes = [
  { path : 'cadastro', component: CadastroComponent},
  { path : 'consulta', component: ConsultaComponent, canActivate: [CanActivateRouteGuard]},
  { path : 'lista', component: ListaComponent, canActivate: [CanActivateRouteGuard]},
  { path: 'login', component: LoginComponent },
  { path : '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
