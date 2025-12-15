import { Component, OnInit } from "@angular/core";
import { UserService } from "../../services/userservice";
import { FormsModule } from "@angular/forms";
import { Error } from "../../components/Error/Error";

@Component({
    selector:"Photoshot-comp",
    standalone:true,
    imports: [FormsModule, Error],
    template:`
 <div class="h-screen flex justify-center items-center  ">
  <div class="w-full p-8 max-w-lg mx-auto bg-zinc-900 rounded-lg shadow-lg space-y-6 border border-gray-700">
  <h2 class="text-3xl text-white font-semibold text-center">
    Reservation Form
  </h2>

  <!-- Staff Selection -->
  <label class="block">
    <span class="text-md text-gray-300 font-medium mb-1">Select Staff:</span>
    <select
      [(ngModel)]="selectedStaffId"
      class="mt-1 block w-full border border-gray-600 rounded-lg p-3 bg-zinc-900 text-white focus:outline-none focus:ring-2 focus:ring-[#4eda2c]"
    >
      <option class="text-gray-400 bg-zinc-900" value="">Choose a staff</option>
      @for (user of UserService.avaibaleStaff(); track user._id) {
        <option class="text-white bg-zinc-900" [value]="user._id">
          {{ user.fullName }}
        </option>
      }
    </select>
  </label>

  <!-- Date Selection -->
  <label class="block">
    <span class="text-md text-gray-300 font-medium mb-1">Select Date:</span>
    <input
      type="date"
      [(ngModel)]="selectedDate"
      class="mt-1 block w-full border border-gray-600 rounded-lg p-3 bg-zinc-900   text-white focus:outline-none focus:ring-2 focus:ring-[#4eda2c]"
    />
  </label>

  <!-- Submit Button -->
  <button
    (click)="staffReversation()"
    class="w-full bg-[#4eda2c] hover:cursor-pointer text-white py-3 rounded-lg shadow-md hover:bg-green-600 transition duration-200 transform hover:scale-105 font-semibold"
  >
    Submit Reservation
  </button>

  <!-- Error Message Display -->
  @if(error){
    <Error-comp [error]="error" class="mt-4 text-center text-red-500 text-sm font-medium"/>
  }
</div>

 </div>



    `
})
export class ReverstationStaff implements OnInit{
 token = sessionStorage.getItem("token") || "";
 selectedDate:string="5/5/2020";
 selectedStaffId:string="";
 error:string="";


 constructor(protected UserService:UserService){}
 ngOnInit(): void {
     this.getavaibalUser();
 }

 getavaibalUser(){   
    this.UserService.getAvaibleStaff(this.token).subscribe({
        next:(res)=>{
            this.UserService.avaibaleStaff.set(res.avaibleUser);
            
        },
        error:(err)=>{
              this.error=err.error.error;
        }
    })
 }

 staffReversation(){
    
    this.UserService.StaffReversation(this.token,new Date(this.selectedDate).toISOString(),this.selectedStaffId).subscribe({
        next:(res)=>{
               alert("the email is send");
               this.error="";
        },
        error:(err)=>{
            this.error=err.error.error;
        }
    })
 }
}