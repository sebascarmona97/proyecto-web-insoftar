import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioComponent } from './usuario/usuario.component';
import { CrearusuarioComponent } from './crearusuario/crearusuario.component';
import { EditarusuarioComponent } from './editarusuario/editarusuario.component';


const routes: Routes = [
  { path: 'usuario', component: UsuarioComponent },
  { path: 'crearusuario', component: CrearusuarioComponent },
  { path: 'editarusuario', component: EditarusuarioComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
