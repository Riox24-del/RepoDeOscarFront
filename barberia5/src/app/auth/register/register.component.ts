import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LoginService } from 'src/app/login.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  nombre!:string;
  apellido!:string;
  correo!:string;
  password!:string;
  sexo!:string;
  edad!:number;
  
  constructor(private formBuilder: FormBuilder, public router: Router,
     private http: HttpClient, 
     private loginS:LoginService) { 
      this.registerForm = this.formBuilder.group({
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        correo: ['', [Validators.required, Validators.email]],
        edad: ['', [Validators.required, Validators.pattern('[0-9]*')]],
        sexo: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
      });
     }

     
  ngOnInit() {
    // this.registerForm = this.formBuilder.group({
    //   email: ['', Validators.required],
    //   name:['', Validators.required],
    //   password: ['', [Validators.required, Validators.minLength(6)]],
    //   confirmPassword: ['', Validators.required]
    // });
  }

  onSubmit() {
    
    // if (this.registerForm?.valid) {
    //   console.log("Datos del formulario:");
    //   console.log("Correo", this.registerForm.get('email')?.value);
    //   console.log("Nombre", this.registerForm.get('name')?.value);
    //   console.log("Contraseña:", this.registerForm.get('password')?.value);
    //   console.log("Confirmar contraseña:", this.registerForm.get('confirmPassword')?.value);

    // } else {
    //   console.log("Por favor, complete todos los campos correctamente.");
    // }
  }

  registro() {
    if (this.registerForm.valid) {
      const user = this.registerForm.value;
      this.loginS.registro(user).subscribe(
        (response: any) => {
          console.log('Registro exitoso:', response);
          //rutas
          this.router.navigateByUrl("/login");
        },
        (error: any) => {
          console.error('Error en el registro:', error);
          // Manejar errores de registro
        }
      );
    }
  }
}

