import { Component, EventEmitter, Output } from "@angular/core";
import {FormsModule} from '@angular/forms';

@Component({
    selector:"Login-form",
    standalone:true,
    imports:[FormsModule],
    template:`
    
     <form method="POST" class="space-y-6">
      <div>
        <label for="email" class="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">Email address</label>
         <div class="mt-2">
          <input [(ngModel)]="email" id="email" type="email" name="email" required autocomplete="email"class="block w-full rounded-md  px-3 py-1.5 text-base text-white outline-1 -outline-offset-1  placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#4fda2cb6] sm:text-sm/6 " />
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm/6 font-medium text-gray-900 dark:text-gray-100">Password</label>
         
        </div>
        <div class="mt-2">
          <input [(ngModel)]="password" id="password" type="password" name="password" required autocomplete="current-password" class="block w-full rounded-md  px-3 py-1.5 text-base text-white outline-1 -outline-offset-1  placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#4fda2cb6] sm:text-sm/6 " />
        </div>
      </div>

      
      <div>
        <button (click)="onclick($event)"  type="submit" class="flex w-full justify-center rounded-md bg-[#4eda2c] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-[#4fda2cb6] hover:cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2   ">log in</button>
      </div>
    </form>
    `
})

export class LoginForm{
 email :string="";
 password :string="";

 @ Output() onsubmitForm=new EventEmitter<{email:string,password:string}>();

 onclick(e:Event){
  e.preventDefault();
  this.onsubmitForm.emit({email:this.email,password:this.password});
 }

}