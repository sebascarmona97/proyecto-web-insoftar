import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from './../_interfaces/usuario.interface';
import { UsuarioService } from './../_services/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Objectmessage } from '../_interfaces/objectmessage.interface';

@Component({
  selector: 'app-editarusuario',
  templateUrl: './editarusuario.component.html',
  styleUrls: ['./editarusuario.component.css']
})
export class EditarusuarioComponent implements OnInit {

  constructor(private serviceUsuario: UsuarioService, private _snackBar: MatSnackBar, private router: Router) {
    this.form = new FormGroup({
      'nombres': new FormControl(this.serviceUsuario.getUsuario().nombres, [Validators.required]),
      'apellidos': new FormControl(this.serviceUsuario.getUsuario().apellidos, [Validators.required]),
      'cedula': new FormControl(this.serviceUsuario.getUsuario().cedula, [Validators.required]),
      'correo': new FormControl(this.serviceUsuario.getUsuario().correo, [Validators.required]),
      'telefono': new FormControl(this.serviceUsuario.getUsuario().telefono, [Validators.required])
    });
  }

  form: FormGroup;

  usuarioObj: Usuario;

  ngOnInit(): void {
  }

  editarAction() {

    this.usuarioObj = {
      id: this.serviceUsuario.getUsuario().id,
      nombres: this.form.value.nombres,
      apellidos: this.form.value.apellidos,
      cedula: this.form.value.cedula,
      correo: this.form.value.correo,
      telefono: this.form.value.telefono
    };

    this.serviceUsuario.editarUsuario(this.usuarioObj).subscribe(
      (objectmessage: Objectmessage) => {
        if (objectmessage.message == null) {
          this.router.navigate(['/usuario']);

          this.form.value.nombres = '';
          this.form.value.apellidos = '';
          this.form.value.cedula = '';
          this.form.value.correo = '';
          this.form.value.telefono = '';

          this._snackBar.open('Se edito el usuario!', 'OK', {
            duration: 2000,
          });
        } else {
          this._snackBar.open(objectmessage.message, 'OK', {
            duration: 3000,
          });
        }
      }
    );
  }

}
