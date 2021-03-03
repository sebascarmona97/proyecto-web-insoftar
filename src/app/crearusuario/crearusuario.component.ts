import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from './../_interfaces/usuario.interface';
import { UsuarioService } from './../_services/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Objectmessage } from '../_interfaces/objectmessage.interface';

@Component({
  selector: 'app-crearusuario',
  templateUrl: './crearusuario.component.html',
  styleUrls: ['./crearusuario.component.css']
})
export class CrearusuarioComponent implements OnInit {

  constructor(private serviceUsuario: UsuarioService, private _snackBar: MatSnackBar, private router: Router) {

    this.form = new FormGroup({
      'nombres': new FormControl('', [Validators.required]),
      'apellidos': new FormControl('', [Validators.required]),
      'cedula': new FormControl('', [Validators.required]),
      'correo': new FormControl('', [Validators.required]),
      'telefono': new FormControl('', [Validators.required])
    });
  }

  form: FormGroup;

  usuarioObj: Usuario;

  ngOnInit(): void {

  }

  guardar() {
    this.usuarioObj = {
      id: null,
      nombres: this.form.value.nombres,
      apellidos: this.form.value.apellidos,
      cedula: this.form.value.cedula,
      correo: this.form.value.correo,
      telefono: this.form.value.telefono
    };

    console.log(this.usuarioObj);

    this.serviceUsuario.crearUsuario(this.usuarioObj).subscribe(
      (objectmessage: Objectmessage) => {
        if (objectmessage.message == null) {
          this.router.navigate(['/usuario']);

          this.form.value.nombres = '';
          this.form.value.apellidos = '';
          this.form.value.cedula = '';
          this.form.value.correo = '';
          this.form.value.telefono = '';

          this._snackBar.open('Se creo el usuario!', 'OK', {
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
