import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { mobilenav } from '../../components/DashboardComp/MobileNav';
import { UserService } from '../../services/userservice';
import { loader } from '../../components/Loader/Loader';

@Component({
  selector: 'Dashboard',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [RouterLink, RouterOutlet, CommonModule, mobilenav, CommonModule, loader],
  template: `
    @if(loader){
    <loader [color]="false" />
    }@else {
    <el-dialog>
      <dialog id="sidebar" class="m-0 p-0 backdrop:bg-transparent lg:hidden">
        <el-dialog-backdrop
          class="fixed inset-0 bg-[#0a0a0ab0] transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        ></el-dialog-backdrop>
        <div tabindex="0" class="fixed inset-0 flex focus:outline focus:outline-0">
          <el-dialog-panel
            class="group/dialog-panel relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            <div
              class="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out group-data-[closed]/dialog-panel:opacity-0"
            >
              <button type="button" command="close" commandfor="sidebar" class="-m-2.5 p-2.5">
                <span class="sr-only">Close sidebar</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  data-slot="icon"
                  aria-hidden="true"
                  class="size-6 text-white"
                >
                  <path d="M6 18 18 6M6 6l12 12" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </button>
            </div>

            <!-- Sidebar component, swap this element with another sidebar if you like -->
            <div
              class="relative flex grow flex-col gap-y-5 overflow-y-auto bg-[#0a0a0a] px-6 pb-2 ring-1 ring-white/10 "
            >
              <div class="relative flex h-16 shrink-0 items-center">
                <img src="./LOGO W.svg" alt="Your Company" class="h-8 w-auto " />
              </div>
              <nav class="flex flex-1 flex-col">
                <ul role="list" class="flex flex-1 flex-col gap-y-7">
                  @if(UserService.user()?.role=="admin"){
                    <li>
                    <ul role="list" class="-mx-2 space-y-1">
                      @for(m of adminMenu;track m.name)
                        { @if(m.name === "log out"){
                      <li (click)="onclickAdminMenu(m.name)">
                        <a
                          (click)="deleteLocalatorage()"
                          [routerLink]="m.path"
                          [ngClass]="{
                            'bg-white/5 text-white': m.current,
                            'text-gray-400 hover:bg-white/5 hover:text-white': !m.current
                          }"
                          class="group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-white"
                        >
                          

                          {{ m.name }}
                        </a>
                      </li>
                      } @else {
                      <li (click)="onclickAdminMenu(m.name)">
                        <a
                          [routerLink]="m.path"
                          [ngClass]="{
                            'bg-white/5 text-white': m.current,
                            'text-gray-400 hover:bg-white/5 hover:text-white': !m.current
                          }"
                          class="group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-white"
                        >
                    
                          {{ m.name }}
                        </a>
                      </li>
                      } }
                    </ul>
                  </li>
                  }@else{
                    <li>
                    <ul role="list" class="-mx-2 space-y-1">
                      @for(m of staffMenu;track m.name){ @if(m.name === "log out"){
                      <li (click)="onclickStaffMenu(m.name)">
                        <a
                          (click)="deleteLocalatorage()"
                          [routerLink]="m.path"
                          [ngClass]="{
                            'bg-white/5 text-white': m.current,
                            'text-gray-400 hover:bg-white/5 hover:text-white': !m.current
                          }"
                          class="group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-white"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1.5"
                            class="size-6 shrink-0"
                          >
                            <path
                              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>

                          {{ m.name }}
                        </a>
                      </li>
                      } @else {
                      <li (click)="onclickStaffMenu(m.name)">
                        <a
                          [routerLink]="m.path"
                          [ngClass]="{
                            'bg-white/5 text-white': m.current,
                            'text-gray-400 hover:bg-white/5 hover:text-white': !m.current
                          }"
                          class="group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-white"
                        >
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1.5"
                            class="size-6 shrink-0"
                          >
                            <path
                              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>

                          {{ m.name }}
                        </a>
                      </li>
                      } }
                    </ul>
                  </li>
                  }
                </ul>
              </nav>
            </div>
          </el-dialog-panel>
        </div>
      </dialog>
    </el-dialog>

    <!-- Static sidebar for desktop -->
    <div class="hidden bg-[#0a0a0a] lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 px-6 ">
        <div class="flex h-16 shrink-0 items-center">
          <img src="./LOGO W.svg" alt="Your Company" class="h-8 w-auto " />
           
        </div>
        <nav class="flex flex-1 flex-col">
          <ul role="list" class="flex flex-1 flex-col gap-y-7">
            @if(UserService.user()?.role=="admin"){

            <li>
              <ul role="list" class="-mx-2 space-y-1">
                @for(m of adminMenu;track m.name){ @if(m.name === "log out"){
                <li (click)="onclickAdminMenu(m.name)">
                  <a
                    (click)="deleteLocalatorage()"
                    [routerLink]="m.path"
                    [ngClass]="{
                      'bg-white/5 text-white': m.current,
                      'text-gray-400 hover:bg-white/5 hover:text-white': !m.current
                    }"
                    class="group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-white"
                  >
                    {{ m.name }}
                  </a>
                </li>
                } @else {
                <li (click)="onclickAdminMenu(m.name)">
                  <a
                    [routerLink]="m.path"
                    [ngClass]="{
                      'bg-white/5 text-white': m.current,
                      'text-gray-400 hover:bg-white/5 hover:text-white': !m.current
                    }"
                    class="group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-white"
                  >
                    {{ m.name }}
                  </a>
                </li>
                } }
              </ul>
            </li>

            }@else{ 

               <li>
              <ul role="list" class="-mx-2 space-y-1">
                @for(m of staffMenu;track m.name){ @if(m.name === "log out"){
                <li (click)="onclickStaffMenu(m.name)">
                  <a
                    (click)="deleteLocalatorage()"
                    [routerLink]="m.path"
                    [ngClass]="{
                      'bg-white/5 text-white': m.current,
                      'text-gray-400 hover:bg-white/5 hover:text-white': !m.current
                    }"
                    class="group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-white"
                  >
                    {{ m.name }}
                  </a>
                </li>
                } @else {
                <li (click)="onclickStaffMenu(m.name)">
                  <a
                    [routerLink]="m.path"
                    [ngClass]="{
                      'bg-white/5 text-white': m.current,
                      'text-gray-400 hover:bg-white/5 hover:text-white': !m.current
                    }"
                    class="group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold text-white"
                  >
                    {{ m.name }}
                  </a>
                </li>
                } }
              </ul>
            </li>
            }

            <li class="-mx-6 mt-auto">
              <a
                href="#"
                class="flex items-center gap-x-4 px-6 py-3 text-sm/6 font-semibold text-white hover:bg-white/5"
              >
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                  class="size-8 rounded-full bg-gray-800 outline outline-1 -outline-offset-1 outline-white/10"
                />
                <span class="sr-only">Your profile</span>
                <span aria-hidden="true">{{ UserService.user()?.fullName }}</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>

    <mobilenav-comp />

    <main class="py-10 lg:pl-72">
      <div class="px-4 sm:px-6 lg:px-8 ">
        <router-outlet />
      </div>
    </main>
    }
  `,
})
export class Dashboard implements OnInit {
  staffMenu = [
    { name: 'Avaible equipment', path: 'allequipment', current: true },
    {name :"all Trips" ,path:"allTrips", current:false},
    { name: 'Reverstation Staff', path: 'ReverstationStaff', current: false },
    { name: 'log out', path: '/login', current: false },
  ];
  adminMenu = [
    { name: 'all equipment', path: 'allequipment', current: true },
    {name :"all Trips" ,path:"allTrips", current:false},
    {name:'reversation PhotoShot',path:"reversationPhotoShot", current: false},
    { name: 'Audit Log', path: 'auditlog', current: false },
    { name: 'log out', path: '/login', current: false },
    
  ];

  loader: boolean = true;

  constructor(protected UserService: UserService) {}

  ngOnInit(): void {
    this.getme();
  }

  getme() {
    const token = sessionStorage.getItem('token') || '';

    this.UserService.getMe(token).subscribe({
      next: (res) => {
        this.UserService.user.set(res.user);

        this.loader = false;
      },
      error: (err) => {
        console.log(err.error.error);
        this.loader = false;
      },
    });
  }

  deleteLocalatorage() {
    sessionStorage.removeItem('token');
  }

  onclickAdminMenu(name: string) {
    this.adminMenu = this.adminMenu.map((e) => {
      if (e.name == name) {
        return { ...e, current: true };
      } else {
        return { ...e, current: false };
      }
    });
  }

  onclickStaffMenu(name: string) {
    this.staffMenu = this.staffMenu.map((e) => {
      if (e.name == name) {
        return { ...e, current: true };
      } else {
        return { ...e, current: false };
      }
    });
  }
}
