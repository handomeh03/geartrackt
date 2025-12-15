import { Component, OnInit, signal } from '@angular/core';

import { TripsService } from '../../services/tripService';
import { Error } from '../../components/Error/Error';
import { AddTripDialog } from '../../components/TripsComp/AddTrip';
import { UserService } from '../../services/userservice';
import { itemDialog } from '../../components/TripsComp/ItemsDialog';
import { loader } from '../../components/Loader/Loader';

@Component({
  selector: 'trips',
  standalone: true,
  styleUrl: 'Trips.css',
  imports: [Error, AddTripDialog, itemDialog,loader],
  template: `
    @if(loader){
      <loader [color]="true"/>
    }@else {
      <div class="  flex flex-col items-start">
      @if(UserService.user()?.role=="staff"){
      <button
        (click)="onopen()"
        class=" m-auto mb-3  bg-zinc-900 hover:cursor-pointer text-white font-bold px-6 py-3 rounded-2xl shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300"
      >
        Make Trip
      </button>
      } @if(error ||TripsService.trips().length==0 ){
      
      <h1 class="text-center bg-red-600 p-4 text-white rounded-3xl text-4xl w-full">{{error || 'No Trips Founds'}}</h1>

      }@else {
     <div class="  w-full flex justify-center items-center">
      <div class="overflow-x-auto  rounded-lg ">
        <table class=" border-collapse  text-gray-700 border border-black/10">
          <thead class="bg-zinc-900 text-white">
            <tr>
              <th class="px-6 py-3 text-center uppercase tracking-wider">Trip ID</th>
              <th class="px-6 py-3 text-center uppercase tracking-wider">User</th>
              <th class="px-6 py-3 text-center uppercase tracking-wider">Location</th>
              <th class="px-6 py-3 text-center uppercase tracking-wider">Date</th>
              <th class="px-6 py-3 text-center uppercase tracking-wider">Status</th>
              <th class="px-6 py-3 text-center uppercase tracking-wider">Items</th>
              @if(UserService.user()?.role=="staff"){
              <th class="px-6 py-3 text-left uppercase tracking-wider">Check In</th>
              }
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            @for(e of TripsService.trips();track e._id){
            <tr class="hover:bg-gray-100 transition-all duration-300 ease-in-out cursor-pointer">
              <td class="px-6 py-4">{{ e._id.slice(15) }}</td>
              <td class="px-6 py-3">{{ e.user?.fullName }}</td>
              <td class="px-6 py-4 font-semibold">{{ e.location }}</td>
              <td class="px-6 py-4 ">{{ e.createdAt.split('T')[0] }}</td>
              <td class="px-6 py-4 font-semibold">{{ e.status }}</td>
              <td class="px-6 py-4">
                <button
                  (click)="onopenitemdialog(e._id)"
                  class="bg-zinc-900 w-30 cursor-pointer text-white px-4 py-2 rounded-full shadow-md hover:bg-gray-800 transition-all duration-300"
                >
                  Show Items
                </button>
              </td>
              @if(UserService.user()?.role=="staff"){
              <td class="px-6 py-4">
                <button
                  (click)="checkin(e._id)"
                  class="bg-zinc-900 w-30 cursor-pointer text-white px-4 py-2 rounded-full shadow-md hover:bg-gray-800 transition-all duration-300"
                >
                  Check In
                </button>
              </td>
              }
            </tr>
            }
          </tbody>
        </table>
      </div>
     </div>

      }
      <ItemsDialog
        [itemdialogFlag]="itemdialogFlag()"
        [tripSelected]="tripSelected()"
        [oncloseitemdialog]="oncloseitemdialog"
      />
      <AddTrip-dialog [addDialogFLag]="addDialogFLag()" [onclose]="onclose" />
    </div>
    }

  `,
})
export class Trips implements OnInit {
  private token = sessionStorage.getItem('token') || '';
  error: string = '';

  tripSelected = signal<string>('');
  loader:boolean=false;

  addDialogFLag = signal<boolean>(false);
  itemdialogFlag = signal<boolean>(false);
  constructor(protected TripsService: TripsService, protected UserService: UserService) {}

  ngOnInit(): void {
    this.error = '';
    if (this.UserService.user()?.role == 'admin') {
      this.getAlltripss();
    } else {
      this.getAlltripForOneStaff();
    }
  }
  onopenitemdialog = (id: string) => {
    this.itemdialogFlag.set(true);
    this.tripSelected.set(id);
  };
  oncloseitemdialog = () => {
    this.itemdialogFlag.set(false);
  };

  onopen = () => {
    this.addDialogFLag.set(true);
  };
  onclose = () => {
    this.addDialogFLag.set(false);
    if (this.UserService.user()?.role == 'admin') {
      this.getAlltripss();
    } else {
      this.getAlltripForOneStaff();
    }
  };

  checkin(id: string) {
    this.TripsService.Checkin(this.token, id).subscribe({
      next: (res) => {
        const current = this.TripsService.trips();

        this.TripsService.trips.set(
          current.map((e) => {
            if (e._id == id) {
              return res.trip;
            } else {
              return e;
            }
          })
        );
      },
      error: (err) => {
        this.error = err.error.error;
      },
    });
  }

  getAlltripForOneStaff() {
    this.loader=true;
    this.TripsService.getAllTripForStaff(this.token).subscribe({
      next: (res) => {
        this.error = '';
        this.TripsService.trips.set(res.trips);
        this.loader=false;
      },
      error: (err) => {
        this.error = err.error.error;
        this.loader=false;
      },
    });
  }
  getAlltripss() {
    this.loader=true;
    this.TripsService.getAllTrips(this.token).subscribe({
      next: (res) => {
        this.error = '';
        this.TripsService.trips.set(res.trips);
        this.loader=false;
      },
      error: (err) => {
        this.error = err.error.error;
        this.loader=false;
      },
    });
  }
}
