import { Component, Input, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { EquipmentSevice } from '../../services/Equipment';
import { FormsModule } from '@angular/forms';
import { Error } from '../Error/Error';
import { TripsService } from '../../services/tripService';
import { EquipmentItem } from '../../interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'AddTrip-dialog',
  standalone: true,
  styleUrl: 'addtrip.css',
  template: `
    @if(addDialogFLag){
    <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 sm:p-6">
      <div class="flex min-h-screen   p-6 items-center justify-center lg:min-w-full ">
        <ul
          role="list"
          class="mx-auto max-h-[90vh]  w-1/2  sm:w-full  p-10 overflow-hidden  max-w-3xl divide-white/10 rounded-xl border border-zinc-600 bg-zinc-900 px-4 md:w-8/12 "
        >
          <!-- Heading and Location Input -->
          <li class="py-4 text-2xl text-white">
            <div
              class="flex flex-col gap-4 md:flex-row items-start md:items-center justify-between"
            >
              <h1>Create Checkout List</h1>
              <input
                (ngModelChange)="rest()"
                [(ngModel)]="location"
                placeholder="Location*"
                class="rounded-md bg-white px-2 py-2 text-base text-zinc-900 w-full md:w-auto"
                type="text"
              />
            </div>
          </li>

          <!-- Categories (Responsive Scroll) -->
          <li
            class="flex overflow-x-scroll hide-scrollbar  md:overflow-visible scroll-smooth gap-2 py-4"
          >
            @for(e of menu; track e.id){
            <div
              (click)="onclickMenu(e.id)"
              [ngClass]="{ border: e.current } "
              class="cursor-pointer flex items-center gap-2 rounded-xl border bg-white/20 hover:border px-4 py-2 font-semibold text-white hover:bg-white/20"
            >
              {{ e.name }}
            </div>
            }
          </li>

          <!-- Product List (Responsive Grid) -->
         <div class="h-[300px] overflow-y-scroll hide-scrollbar">
           @if(EquipmentSevice.Equipment().length==0|| error){
          <div class="h-64 flex justify-center items-center">
            <h1 class="text-center bg-zinc-600 p-4 text-white rounded-3xl text-4xl w-full">
              {{ error || 'No Trips Founds' }}
            </h1>
          </div>
          }@else {
          <li
            class="grid grid-cols-1 gap-2  sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4  py-4"
          >
            @for(e of EquipmentSevice.Equipment();track e._id){
            <div
              [ngClass]="{
                'bg-green-400/40 text-white  duration-200 ': isSelected(e),
                'bg-white text-black': !isSelected(e),
                'hover:bg-[#f1f1f1] hover:shadow-lg': !isSelected(e),
                
              }"
              (click)="toggleSelection(e)"
              class="flex  items-center gap-2 rounded-xl overflow-hidden h-18 cursor-pointer font-semibold transition-all duration-300"
            >
              <!-- Image Section -->
              <div class="w-18 h-full ">
                <img [src]="e.photo" class="w-full h-full object-cover   duration-300" alt="{{ e.name }}" />
              </div>

              <!-- Text Section -->
              <div class="flex flex-col capitalize items-center text-center pr-2">
                <p
                  [ngClass]="{
                    'text-white/90': isSelected(e),
                    'text-black': !isSelected(e)
                  }"
                  class="text-lg font-semibold truncate"
                >
                  {{ e.name }}
                </p>
               
              </div>
            </div>

            }

            <!-- Add more products as needed -->
          </li>
          }
         </div>

          <!-- Buttons (Stacked on small screens) -->
          <li class="flex flex-col sm:flex-row justify-between gap-4 mt-4">
            <button
              (click)="onclose(); rest()"
              class="bg-white cursor-pointer py-2 px-4 rounded-lg w-full sm:w-auto"
            >
              Cancel
            </button>
            <button
              (click)="addTrip()"
              class="bg-green-600 cursor-pointer rounded-xl px-4 py-2 text-white w-full sm:w-auto"
            >
              create
            </button>
          </li>
        </ul>
      </div>
    </div>

    }
  `,
  imports: [FormsModule, Error, CommonModule],
})
export class AddTripDialog implements OnInit, OnChanges {
  error: string = '';
  private token = sessionStorage.getItem('token') || '';
  filter = 'ALL';

  @Input({ required: true }) onclose!: () => void;
  @Input({ required: true }) addDialogFLag!: boolean;
  menu = [
    { id: 1, name: 'ALL', current: true },
    { id: 2, name: 'camrea', current: false },
    { id: 3, name: 'lens', current: false },
    { id: 4, name: 'lighting', current: false },
    { id: 5, name: 'audio', current: false },
    { id: 6, name: 'drone', current: false },
    { id: 7, name: 'accessories', current: false },
  ];

  selectedEquipment: EquipmentItem[] = [];
  location: string = '';
  constructor(protected EquipmentSevice: EquipmentSevice, private TripsService: TripsService) {}

  ngOnInit(): void {
    this.getAvaibleItem();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['addDialogFLag']) {
      this.getAvaibleItem();
    }
  }
  onclickMenu(id: number) {
    this.error = '';
    this.menu = this.menu.map((e) => {
      if (id == e.id) {
        this.filter = e.name;
        return { ...e, current: true };
      } else {
        return { ...e, current: false };
      }
    });
    this.getAvaibleItem();
  }

  addTrip() {
    this.TripsService.makeTrip(this.selectedEquipment, this.location, this.token).subscribe({
      next: (res) => {
        this.onclose();
        this.selectedEquipment = [];
        this.location = '';
      },
      error: (err) => {
        this.error = err.error.error;
      },
    });
  }

  getAvaibleItem() {
    this.EquipmentSevice.getAllavaibleEquipment(this.filter).subscribe({
      next: (res) => {
        this.EquipmentSevice.Equipment.set(res.Equipments);
      },
      error: (err) => {
        this.EquipmentSevice.Equipment.set([]);
        this.error = err.error.error;
        console.log(this.error);
      },
    });
  }

  toggleSelection(e: EquipmentItem) {
    const index = this.selectedEquipment.findIndex((item) => item._id === e._id);

    if (index === -1) {
      this.selectedEquipment.push(e);
    } else {
      this.selectedEquipment.splice(index, 1);
    }
  }

  isSelected(e: EquipmentItem): boolean {
    return this.selectedEquipment.some((item) => item._id === e._id);
  }

  rest() {
    this.error = '';
    this.selectedEquipment = [];
  }
}
