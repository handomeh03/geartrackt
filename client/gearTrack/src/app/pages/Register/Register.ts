import { Component } from "@angular/core";
import { headerForm } from "../../components/LoginComp/HeaderForm";
import { registerForm } from "../../components/Registercomp/Resgiterform";
import { Route, Router, RouterLink } from "@angular/router";
import { AuthService } from "../../services/AuthService";
import { loader } from "../../components/Loader/Loader";

@Component({
    selector:"Register-comp",
    standalone:true,
    imports:[headerForm,registerForm,RouterLink,loader],
     template: `
   @if(loader){
    <loader [color]="true"/>
   }@else {
     <div class="flex h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-[#0a0a0a]  relative">
      <headerForm-comp />
      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
        <register-form (registerClick)="onsubmit($event)"/>
        <p class="mt-10 text-center text-sm/6 text-gray-500 dark:text-gray-400">
          already have account?
          <button
            [routerLink]="'/login'"
            class="font-semibold text-[#4eda2c] hover:text-[#4fda2c96] hover:cursor-pointer "
          >
            login
          </button>
        </p>
      </div>

     @if(error){
        <div 
           role="alert"
           class="fixed top-3 left-0 right-0 mx-auto max-w-xs sm:max-w-sm flex p-3 text-sm text-white bg-red-600 rounded-md justify-between items-center cursor-pointer z-50">
        {{ error }}
        <button (click)="removeError()" class="flex items-center justify-center w-6 h-6 rounded-md text-white hover:bg-white/10">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-4 w-4" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
     }
    </div>
   }
  `,
})

export class Register{
 protected loader:boolean=false;
 protected error:string="";
 constructor(private AuthService:AuthService,private router: Router){ }

  onsubmit(value:{fullName:string,email:string,password:string}){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    if(value.fullName.length < 3){
          this.error="please enter name length over 3 character";
          return;
    }
    if(!emailRegex.test(value.email)){
        this.error="email not valid";
    }
    if(!passwordRegex.test(value.password)){
        this.error="password not valid";
    }

    this.loader=true;

    this.AuthService.register(value).subscribe({
        next: (res) => {  
        this.AuthService.saveToken(res.token);
        this.loader=false; 
        this.router.navigate(['/Dashboard/allequipment']); 
        
      },
      error: (err) => {
        this.error = err.error.error;
        this.loader=false;
      },
    })

  }

  removeError(){
    this.error="";
  }
}