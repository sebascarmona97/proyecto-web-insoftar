import { Component, OnInit } from '@angular/core';
import { Usuario } from './../_interfaces/usuario.interface';
import { UsuarioService } from './../_services/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  usuario: Usuario[] = [];
  usuarioObj: Usuario;
  columnas: string[] = ['nombres', 'apellidos', 'cedula', 'correo', 'telefono', 'acciones'];
  list: Usuario[] = [];
  constructor(private serviceUsuario: UsuarioService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.llamarServicioUsuario();
  }

  llamarServicioUsuario(): void {
    this.serviceUsuario.obtenerUsuario()
      .subscribe((usuario: Usuario[]) => {
        this.usuario = usuario;
      });
  }

  editarUsuario(usuario: Usuario) {
    this.serviceUsuario.setUsuario(usuario);
  }

  eliminarUsuario(id: number) {
    this.usuarioObj = {
      id: id,
      nombres: null,
      apellidos: null,
      cedula: null,
      correo: null,
      telefono: null
    };

    this.serviceUsuario.eliminarUsuario(this.usuarioObj).subscribe(
      (val: any) => {
        this.llamarServicioUsuario();
        this._snackBar.open('Se elimino el usuario!', 'OK', {
          duration: 2000,
        });
      });
  }

}
