import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html'
})
export class UsuarioComponent implements OnInit {

  public usuarioForm = this.fb.group({
    name:['',Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password : ['', [Validators.required, Validators.minLength(5)]],
    password2:['', Validators.required]
  },{
    validators: this.passwordsIguales('password', 'password2')
  });

  constructor(private userService:UserService, private fb:FormBuilder, private router:Router) { }

  ngOnInit(): void {
  }

  guardarUsuario(){
  if (this.usuarioForm.invalid) {
    return Object.values(this.usuarioForm.controls).forEach(control => {
      control.markAllAsTouched();
    });
  }

  const data = {
    ...this.usuarioForm.value
  }
  delete data.password2
  console.log(data);
  
  this.userService.crearUsuario(data)
  .subscribe(resp => {
    Swal.fire('Creado', 'Usuario creado correctamente', 'success');
    this.router.navigateByUrl('/app/config/usuarios');
  },(err) => {
    console.log(err);
    
    const [mensaje] = err.error.errors.email;
    Swal.fire('Error', mensaje, 'error');
    
  })   
  }

  campoNoValido(campo:string):Boolean{
    return this.usuarioForm.get(campo)!.invalid && this.usuarioForm.get(campo)!.touched
  }

  passwordsIguales(pass1Name: string, pass2Name: string) {

    return (formGroup: FormGroup) => {
      const pass1Control =  formGroup.get(pass1Name);
      const pass2Control =  formGroup.get(pass2Name);

      if (pass1Control!.value === pass2Control!.value) {
        pass2Control!.setErrors(null);
      } else {
        pass2Control!.setErrors({noEsIgual:true});
      }

    }

  }



}
