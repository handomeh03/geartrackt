import { Component, effect, OnInit, signal } from "@angular/core";
import { UserService } from "../../services/userservice";
import { Error } from "../../components/Error/Error";
import { loader } from "../../components/Loader/Loader";

@Component({
    selector:"auditLog",
    standalone:true,
    imports:[Error,loader],
    template:`
      
@if(loader){
  <loader [color]="true"/>
}@else {
  <div class="px-4 sm:px-6 lg:p-8">
  <div class="sm:flex sm:items-center">
    <div class="sm:flex-auto">
      <h1 class="text-2xl font-bold  mb-2">Audit Log</h1>
      <p class="text-gray-700 text-sm">Overview of all user actions in the system.</p>
    </div>
  </div>

  <!-- Check if logs are empty -->
  @if(this.UserService.auditLogs().length==0){
    <Error-comp [error]="error"/>
  }@else{
  
  <div class="mt-6 overflow-x-auto rounded-xl  bg-zinc-900">
    <table class="min-w-full divide-y divide-gray-700 ">
      <thead class="bg-zinc-900 text-gray-200">
        <tr>
          <th class="px-6 py-3 text-left text-sm font-semibold">User</th>
          <th class="px-6 py-3 text-left text-sm font-semibold">Action</th>
          <th class="px-6 py-3 text-left text-sm font-semibold">Collection</th>
          <th class="px-6 py-3 text-left text-sm font-semibold">Document ID</th>
          <th class="px-6 py-3 text-left text-sm font-semibold">Created At</th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-800">
        @for (log of UserService.auditLogs(); track log._id) {
          <tr class="hover:bg-black/10 transition-colors duration-200 cursor-pointer">
            <td class="px-6 py-4 text-sm text-gray-800 font-medium">{{ log.user?.fullName || 'Unknown' }}</td>
            <td class="px-6 py-4 text-sm text-gray-800">{{ log?.action }}</td>
            <td class="px-6 py-4 text-sm text-gray-800">{{ log?.collectionName }}</td>
            <td class="px-6 py-4 text-sm text-gray-800">{{ log?.documentId }}</td>
            <td class="px-6 py-4 text-sm text-gray-800">{{ log.createdAt.split("T")[0] || "unknown" }}</td>
          </tr>
        }
      </tbody>
    </table>
  </div>

  <!-- Pagination -->
  <nav class="flex justify-center mt-4 space-x-2">
    <button (click)="prePage()"
      class="flex items-center justify-center h-10 px-4 rounded-md bg-zinc-900 text-gray-100 hover:bg-zinc-700 transition disabled:opacity-50 disabled:cursor-not-allowed">
      <svg class="w-5 h-5" viewBox="0 0 20 20" fill="none">
        <path d="M12 15L7 10l5-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <button (click)="nextPage()"
      class="flex items-center justify-center h-10 px-4 rounded-md bg-zinc-900 text-gray-100 hover:bg-zinc-700 transition disabled:opacity-50 disabled:cursor-not-allowed">
      <svg class="w-5 h-5" viewBox="0 0 20 20" fill="none">
        <path d="M8 5l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  </nav>

  }
</div>

}





    `
})
export class auditlog implements OnInit {
 protected UserService:UserService;
 private token=sessionStorage.getItem("token") || "";
 loader:boolean=false;

 error:string="";

 page=signal(1);
 limit=signal(5);

constructor(UserService: UserService) {
    this.UserService = UserService;

    effect(() => {
      this.page();
      this.limit();
      this.getAuditLog();
    });
  }

   ngOnInit(): void{
      this.UserService.auditLogs.set([]);
    }
   

  nextPage() {
    this.page.set(this.page()+1);
    this.UserService.auditLogs.set([]);
  }

  prePage() {
    if (this.page() > 1) {
      this.page.set(this.page()-1);
      this.UserService.auditLogs.set([]);
    }
  }


getAuditLog() {
   this.loader=true;
  this.UserService
    .getAuditLog(this.token, String(this.page()), String(this.limit()))
    .subscribe({
      next: (res) => {
        this.UserService.auditLogs.set(res.auditLog);
        this.loader=false;
        
      },
      error: (err) => { 
        this.error=err.error.error;
        this.loader=false;
      }
    });
}


 
}