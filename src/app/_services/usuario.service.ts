import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Usuario } from './../_interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario:Usuario;

  setUsuario(usuario:Usuario){
    this.usuario=usuario;
  }

  getUsuario(){
    return this.usuario;
  }
  constructor(private http: HttpClient) { }

  obtenerUsuario(){
    return this.http.get('http://localhost:8090/usuarios/usuariosList')    
  }

  crearUsuario(usuario:Usuario){
    const headers = { 'Content-Type': 'application/json' };
    const body = usuario;
    return this.http.post('http://localhost:8090/usuarios/createUsuario',body, { headers })
  }

  editarUsuario(usuario:Usuario){
    const headers = { 'Content-Type': 'application/json' };
    const body = usuario;
    return this.http.put('http://localhost:8090/usuarios/updateUsuario',body, { headers })
  }

  eliminarUsuario(usuario:Usuario){
    const headers = { 'Content-Type': 'application/json' };
    const body = usuario;
    const options = {
      headers: headers,
      body: body,
    };
    return this.http.delete('http://localhost:8090/usuarios/deleteUsuarioById',options)
  }

}