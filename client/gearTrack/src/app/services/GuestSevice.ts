import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { Observable } from "rxjs";
import { GuestReversation } from "../interfaces";

@Injectable({providedIn:"root"})
export class GuestService{
   photoshotReversation=signal<GuestReversation[] | []>([]);


    constructor(private http: HttpClient) {}

    guestReversation(body:{ fullName:string, companyName:string, shotLocation:string, phoneNumber:string, note:string, date:string }):Observable<any>{
         return this.http.post("http://localhost:8080/api/guest/reservephotoshoot",body);
    }
    getAllreversationPhotoShot(token:string):Observable<any>{
          return this.http.get("http://localhost:8080/api/guest/getAllReservePhotoshoot",{
            headers:{
                 Authorization: `Bearer ${token}`
            }
          });
    }
    assignStaff(token:string,reversationID:string,id:string):Observable<any>{
         return this.http.patch(`http://localhost:8080/api/guest/assignphotographer/${reversationID}`,{id},{
           headers:{
                 Authorization: `Bearer ${token}`
            }
         })
    }
}