import { Component, Input, OnInit } from '@angular/core';
import { Error } from '../../components/Error/Error';
import { UserService } from '../../services/userservice';
import { FormsModule } from '@angular/forms';
import { GuestService } from '../../services/GuestSevice';

@Component({
  selector: 'assignStaffdialog',
  standalone: true,
  template: `
    @if(assingFlag){
    <div
      class="fixed inset-0 bg-[#0000004a] bg-opacity-50 flex items-center justify-center z-50 p-4 sm:p-6"
    >
      <div
        class="bg-zinc-900 text-white rounded-lg w-full max-w-md sm:max-w-lg md:max-w-xl p-6 shadow-lg relative overflow-y-auto max-h-[90vh]"
      >
        <h2 class="text-xl sm:text-2xl font-bold mb-4">assign Staff</h2>

        <label class="block">
          <span class="text-white">Select staff:</span>
          <select
            [(ngModel)]="selectedStaffId"
            class="mt-1 text-white block w-full border rounded-lg p-2"
          >
            <option class="text-white bg-zinc-900" value="">Choose a staff</option>

            @for (user of UserService.avaibaleStaff(); track user._id) {
            <option class="text-white bg-zinc-900" [value]="user._id">
              {{ user.fullName }}
            </option>
            }
          </select>
        </label>

        <div class="mt-2.5 flex flex-col sm:flex-row justify-end gap-3">
          <button (click)="changeFlag()" class="px-4 py-2 bg-white/10 rounded hover:bg-white/20 w-full sm:w-auto">
            Cancel
          </button>
          <button
             (click)="assignStaff()"
            class="px-4 py-2 bg-[#4eda2c] rounded hover:bg-[#40c325] text-white w-full sm:w-auto"
          >
            Add
          </button>
        </div>
        @if(error){
        <Error-comp [error]="error" />
        }
      </div>
    </div>
    }
  `,
  imports: [Error, FormsModule],
})
export class assignStaffdialog implements OnInit {
  @Input({ required: true }) assingFlag!: boolean;
  @Input ({required:true}) changeFlag !: ()=>void;
  @Input({required:true}) selectedReversation!:string;
  error: string = '';
  selectedStaffId: string = '';
  private token = sessionStorage.getItem('token') || '';
  

  constructor(protected UserService: UserService,private GuestService:GuestService) {}


  ngOnInit(): void {
    this.getavaibleStaff();
  }
  getavaibleStaff() {
    this.UserService.getAvaibleStaff(this.token).subscribe({
      next: (res) => {
        this.UserService.avaibaleStaff.set(res.avaibleUser);
      },
      error: (err) => {
        this.error = err.error.error;
        console.log(err);
      },
    });
  }
  assignStaff(){
       this.GuestService.assignStaff(this.token,this.selectedReversation,this.selectedStaffId).subscribe({
        next:(res)=>{
            const current=this.GuestService.photoshotReversation();
            this.GuestService.photoshotReversation.set(current.map((e)=>{
                if(e._id==this.selectedReversation){
                    return res.updateRecivePhotoShoot
                }
                else{
                    return e;
                }
            }))
            this.changeFlag();
            alert("success");
            
        },
        error:(err)=>{
           this.error=err.error.error;
        }
       })
  }
}
