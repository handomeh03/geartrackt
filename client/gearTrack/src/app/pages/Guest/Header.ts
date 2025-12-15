import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'Header-comp',
  standalone: true,
  imports:[RouterLink],
  template: `
    <div class="bg-black">
  <div class="px-4 py-5 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
    <div class="flex items-center justify-between">
      
      <a href="/" class="inline-flex items-center">
        <img width="80" [src]="'/LOGO W.svg'" alt="Logo"/>
      </a>

      
      <ul class="hidden lg:flex items-center space-x-8">
        <li>
          <a [routerLink]="'register'" class="text-white font-medium tracking-wide transition-colors duration-200 hover:text-gray-300">
            Sign up
          </a>
        </li>
        <li>
          <a [routerLink]="'login'" class="bg-white text-black px-6 h-12 flex items-center justify-center rounded shadow-md font-medium tracking-wide transition duration-200 hover:bg-gray-300">
            log in
          </a>
        </li>
      </ul>

      <!-- Mobile Menu Button -->
      <div class="lg:hidden">
        <button (click)="changeFlagMobileMenu()" class="p-2 rounded focus:outline-none focus:ring-2 focus:ring-white">
          <svg class="w-6 h-6 text-white" viewBox="0 0 24 24">
            <path fill="currentColor" d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"/>
            <path fill="currentColor" d="M23,6H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"/>
            <path fill="currentColor" d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile Menu -->
    @if(openMobileMenu){
        <div class="lg:hidden mt-4">
      <div class="p-5 bg-black border border-gray-700 rounded shadow-sm">
        <div class="flex items-center justify-between mb-4">
          <a href="/" class="inline-flex items-center">
            <img width="80" [src]="'/LOGO W.svg'" alt="Logo"/>
          </a>
          <button (click)="changeFlagMobileMenu()" class="p-2 rounded hover:bg-gray-800 transition">
            <svg class="w-5 text-white" viewBox="0 0 24 24">
              <path fill="currentColor" d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3C5.3,3.9,4.7,3.9,4.3,4.3s-0.4,1,0,1.4l6.3,6.3-6.3,6.3c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.4,0.4,1,0.4,1.4,0s0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"/>
            </svg>
          </button>
        </div>

        <nav>
          <ul class="space-y-4">
            <li>
              <a [routerLink]="'register'" class="w-full h-12 flex items-center justify-center bg-white text-black rounded shadow-md font-medium tracking-wide transition hover:bg-gray-300">
                Sign up
              </a>
            </li>
            <li>
              <a [routerLink]="'login'" class="w-full h-12 flex items-center justify-center bg-white text-black rounded shadow-md font-medium tracking-wide transition hover:bg-gray-300">
                Log in
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    }
  </div>
  
</div>

  `,
})
export class Header {
  openMobileMenu = false;
  changeFlagMobileMenu() {
    this.openMobileMenu = !this.openMobileMenu;
  }
}
