import { Injectable, signal } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'
import { ItemReservation, LogEntry, staffAvauble, userInterFace } from "../interfaces";

@Injectable({providedIn:"root"})
export class UserService{
  
   user = signal<userInterFace | null>(null);
   auditLogs=signal<LogEntry[]>([]);
   itemsReservation=signal<ItemReservation[]>([]);
   avaibaleStaff=signal<staffAvauble[]|null>([]);


   constructor(private http: HttpClient) {}

getMe(token: string): Observable<any> {
  return this.http.get("http://localhost:8080/api/user/me", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}
getAuditLog(token:string,page:string,limit:string):Observable<any>{
   return this.http.get( `http://localhost:8080/api/user/getAuditLog?page=${page}&limit=${limit}`,{
    headers:{
      Authorization: `Bearer ${token}`
    }
   })

}
putIncharge(token:string,itemId:string):Observable<any>{
  return this.http.patch(`http://localhost:8080/api/Equipment/changeStatusItem/${itemId}`,{},{
    headers:{
      Authorization: `Bearer ${token}`
    }
  })
}


getItemReversation(token:string,page:string,limit:string):Observable<any>{
        return this.http.get(`http://localhost:8080/api/Equipment/getAllReversationForOneStaff`,{
          headers:{
            Authorization: `Bearer ${token}`
          }
        })
}


getAvaibleStaff(token:string):Observable<any>{
   return this.http.get("http://localhost:8080/api/staff/getAllStaffAvaible",{
     headers:{
       Authorization: `Bearer ${token}`
    }
   })
}

StaffReversation(token:string,selectedDate:string,selectedStaffId:string){
  const body={reciverStaffId:selectedStaffId,date:selectedDate};
  return this.http.post("http://localhost:8080/api/staff/sendStaffReversation",body,{
     headers:{
       Authorization: `Bearer ${token}`
    }
  });
}
}

