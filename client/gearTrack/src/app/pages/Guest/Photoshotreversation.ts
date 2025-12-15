import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Error } from "../../components/Error/Error";
import { GuestService } from "../../services/GuestSevice";

@Component({
    selector:"PhotoShot-comp",
    standalone:true,
    imports: [FormsModule, Error],
    template:`
      
<div class="h-screen flex justify-center items-center">
  <form method="POST" class="space-y-2 bg-[#1f1f1f] w-full max-w-2xl mx-auto p-10 rounded-2xl shadow-2xl shadow-black/50 border border-zinc-700">

  <h1 class="text-4xl font-extrabold text-[#4fda2c] text-center mb-8 tracking-wider">
    Project Submission Form
  </h1>
  
  <div class="flex flex-col sm:flex-row gap-6">
    <div class="flex-1">
      <label for="fullName" class="block text-sm font-medium text-zinc-300 mb-2">Full Name</label>
      <input 
        (ngModelChange)="error=''"
        [(ngModel)]="fullName"
        id="fullName" 
        type="text" 
        name="fullName" 
        required 
        autocomplete="fullName"
        placeholder="Enter your full name"
        class="block w-full rounded-xl px-4 py-3 text-base text-white border border-zinc-700 placeholder-zinc-500 focus:ring-2 focus:ring-[#4fda2c] focus:border-transparent shadow-inner transition-all duration-300"
      />
    </div>

    <div class="flex-1">
      <label for="companyName" class="block text-sm font-medium text-zinc-300 mb-2">Company Name</label>
      <input 
        (ngModelChange)="error=''"
        [(ngModel)]="companyName"
        id="companyName" 
        type="text" 
        name="companyName" 
        required 
        placeholder="Enter company name"
        class="block w-full rounded-xl px-4 py-3 text-base text-white border border-zinc-700 placeholder-zinc-500 focus:ring-2 focus:ring-[#4fda2c] focus:border-transparent shadow-inner transition-all duration-300"
      />
    </div>
  </div>

  <div class="flex flex-col sm:flex-row gap-6">
    <div class="flex-1">
      <label for="shotLocation" class="block text-sm font-medium text-zinc-300 mb-2">Shot Location</label>
      <input 
        (ngModelChange)="error=''"
        [(ngModel)]="shotLocation"
        id="shotLocation" 
        type="text" 
        name="shotLocation" 
        required 
        placeholder="Enter the location"
        class="block w-full rounded-xl px-4 py-3 text-base text-white border border-zinc-700 placeholder-zinc-500 focus:ring-2 focus:ring-[#4fda2c] focus:border-transparent shadow-inner transition-all duration-300"
      />
    </div>

    <div class="flex-1">
      <label for="phoneNumber" class="block text-sm font-medium text-zinc-300 mb-2">Phone Number</label>
      <input 
        (ngModelChange)="error=''"
        [(ngModel)]="phoneNumber"
        id="phoneNumber" 
        type="tel" 
        name="phoneNumber" 
        required 
        placeholder="Enter your phone number"
        class="block w-full rounded-xl px-4 py-3 text-base text-white border border-zinc-700 placeholder-zinc-500 focus:ring-2 focus:ring-[#4fda2c] focus:border-transparent shadow-inner transition-all duration-300"
      />
    </div>
  </div>

  <div>
    <label for="note" class="block text-sm font-medium text-zinc-300 mb-2">Note / Project Details</label>
    <textarea 
      (ngModelChange)="error=''"
      [(ngModel)]="note"
      id="note" 
      name="note" 
      rows="4" 
      required 
      placeholder="Write details about your project, requirements, and budget expectations."
      class="block w-full rounded-xl px-4 py-3 text-base text-white border border-zinc-700 placeholder-zinc-500 focus:ring-2 focus:ring-[#4fda2c] focus:border-transparent shadow-inner transition-all duration-300"
    ></textarea>
  </div>

  <div>
    <label for="date" class="block text-sm font-medium text-zinc-300 mb-2">Preferred Date</label>
    <input 
      (ngModelChange)="error=''"
      [(ngModel)]="date"
      id="date" 
      type="date" 
      name="date" 
      required
      class="block w-full rounded-xl px-4 py-3 text-base text-white border border-zinc-700 placeholder-zinc-500 focus:ring-2 focus:ring-[#4fda2c] focus:border-transparent shadow-inner transition-all duration-300"
    />
  </div>

  <div class="mt-8 text-center">
    <button
      (click)="onsubmit()" 
      type="submit" 
      class="w-1/2 min-w-[200px] m-auto cursor-pointer flex justify-center py-3 px-6 rounded-full bg-[#4eda2c] text-white font-extrabold text-lg shadow-2xl shadow-[#4eda2c]/40 hover:bg-[#3fc12a] hover:scale-105 transition-transform duration-300 focus:outline-none focus:ring-4 focus:ring-[#4eda2c]/50"
    >
      SEND REQUEST
    </button>
  </div>
  
  @if(error){
    <Error-comp [error]="error"/>
  }
</form>
</div>




    `
})
export class PhotoShot{
fullName:string="";
companyName:string="";
shotLocation:string="";
phoneNumber:string="";
note:string="";
date:string="5/5/2025";

error:string="";

constructor(private GuestService:GuestService){}


onsubmit(){
    const body={fullName:this.fullName,companyName:this.companyName,shotLocation:this.shotLocation,phoneNumber:this.phoneNumber,note:this.note,date:new Date(this.date).toISOString()};
  this.GuestService.guestReversation(body).subscribe({
    next:(res)=>{
      alert("success");
      this.fullName="";
      this.companyName="";
      this.shotLocation="";
      this.phoneNumber="";
      this.note="";
      this.date="";
      this.error="";
    },
    error:(err)=>{
      this.error=err.error.error;
    }
  })
}
}