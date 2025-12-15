import { Component, Input } from "@angular/core";

@Component({
    selector:"Error-comp",
    standalone:true,
    template:`
    
          <div class="rounded-md mt-1.5 bg-red-600 p-4 mb-2  ">
            <div class="flex">
                <div class="shrink-0">
                <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" class="size-5 text-white">
                    <path d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z" clip-rule="evenodd" fill-rule="evenodd" />
                </svg>
                </div>
                <div class="ml-3">
                <h3 class="text-sm font-medium text-white ">{{error}}</h3>
                
                </div>
            </div>
</div>
    `
})
export class Error{
    @Input ({required:true}) error !:string;
}