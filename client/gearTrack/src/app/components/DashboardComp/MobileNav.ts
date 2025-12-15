import { Component } from "@angular/core";

@Component({
    selector:"mobilenav-comp",
    standalone:true,
    template:`
    <div class="sticky top-0 z-40 flex items-center gap-x-6 bg-[#0a0a0a] px-4 py-4 shadow sm:px-6 lg:hidden ">
  <button type="button" command="show-modal" commandfor="sidebar" class="-m-2.5 p-2.5 text-gray-400 hover:text-white lg:hidden">
    <span class="sr-only">Open sidebar</span>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" data-slot="icon" aria-hidden="true" class="size-6">
      <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  </button>
  <div class="flex-1 text-sm/6 font-semibold text-white">Dashboard</div>
  <a href="#">
    <span class="sr-only">Your profile</span>
    <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" class="size-8 rounded-full bg-gray-800 outline outline-1 -outline-offset-1 outline-white/10" />
  </a>
</div>
    
    `
})
export class mobilenav{
    
}