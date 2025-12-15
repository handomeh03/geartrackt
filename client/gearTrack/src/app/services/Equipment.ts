import { Injectable, signal } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { EquipmentItem } from "../interfaces";


@Injectable({providedIn:"root"})
export class EquipmentSevice{
Equipment = signal<EquipmentItem[]>([]); 
orginalEquipment = signal<EquipmentItem[]>([]);

 

   constructor(private http: HttpClient) {}


   getAllEquipments():Observable<any>{
     return this.http.get("http://localhost:8080/api/Equipment/getAllEquipment");
   }
   getAllavaibleEquipment(filter:string):Observable<any>{
    return this.http.get(`http://localhost:8080/api/Equipment/getAvailableEquipment/${filter}`);
   }
   searchEquipment(value:string,token:string):Observable<any>{
    return this.http.get(`http://localhost:8080/api/Equipment/searchEquipment?name=${value}`,{
     headers: {
      Authorization: `Bearer ${token}`
    }
    });
   }
   deleteEquipment(id:string,token:String):Observable<any>{
    return this.http.delete(`http://localhost:8080/api/Equipment/deleteEquipment/${id}`,{
      headers:{
         Authorization: `Bearer ${token}`
      }
    });
   }
   addEquipmwnt(value:{code:string,name:string,category:string,condition:string,location:string,note:string},token:string):Observable<any>{
          return this.http.post("http://localhost:8080/api/Equipment/addEquipment",value,{
         headers: {
      Authorization: `Bearer ${token}`
    }
    })
   }
   editEquipment(value:{code:string,name:string,category:string,condition:string,location:string,note:string},token:string,id:string):Observable<any>{
    
    return this.http.patch(`http://localhost:8080/api/Equipment/editEquipment/${id}`,value,{
      headers:{
          Authorization: `Bearer ${token}`
      }
    })
   }
}