import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TripsService } from '../../services/tripService';
import { Error } from '../Error/Error';

@Component({
  selector: 'ItemsDialog',
  standalone: true,
  imports:[Error],
  template: `
    @if(itemdialogFlag){
    @if(error  || TripsService.itemOftrip().length==0){
        <Error-comp [error]="error || 'no item found'"/>
    }@else {
        

         <div class="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div
        class="bg-zinc-900 text-white rounded-xl w-full max-w-2xl p-6 shadow-2xl border border-white/10"
      >
        <!-- Header -->
        <h2 class="text-2xl font-bold mb-4 text-[#4eda2c]">Equipment Details</h2>

        <!-- Table -->
        <div class="overflow-auto border border-white/10 rounded-lg">
          <table class="min-w-full text-white text-sm">
            <thead class="bg-black/50 border-b border-white/10">
              <tr>
                <th class="text-left py-3 px-4">Item ID</th>
                <th class="text-left py-3 px-4">Item Name</th>
                <th class="text-left py-3 px-4">Item Code</th>
              </tr>
            </thead>

            <tbody>
              @for(e of TripsService.itemOftrip(); track e._id){

              <tr class="border-b border-white/10 hover:bg-white/10 transition">
                <td class="py-3 px-4">{{ e._id }}</td>
                <td class="py-3 px-4 font-semibold">{{ e.name }}</td>
                <td class="py-3 px-4">{{ e.code }}</td>
              </tr>
              }
            </tbody>
          </table>
        </div>

        <div class="flex justify-end mt-5">
          <button
            (click)="oncloseitemdialog()"
            class="px-4 py-2 bg-[#4eda2c] text-white cursor-pointer font-bold rounded-lg hover:bg-[#3eb322] transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
    }

    }
  `,
})
export class itemDialog implements OnChanges {
  @Input({ required: true }) itemdialogFlag!: boolean;
  @Input({ required: true }) tripSelected!: string;
  @Input({ required: true }) oncloseitemdialog!: () => void;

  error:string="";

  constructor(protected TripsService: TripsService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['tripSelected'] && !changes['tripSelected'].firstChange) {
      this.getitemOftrip();
    }
  }

  getitemOftrip() {
    this.TripsService.getItemOfTrip(this.tripSelected).subscribe({
      next: (res) => {
        this.TripsService.itemOftrip.set(res.items);
        
      },
      error: (err) => {
        this.error=err.error.error;
      },
    });
  }
}
