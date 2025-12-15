import { HttpClient } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { Observable } from "rxjs";
import { Equipment, EquipmentItem } from "../interfaces";

@Injectable({ providedIn: 'root' })
export class TripsService {
  trips = signal<any[]>([]);
  itemOftrip=signal<Equipment[]>([]);

  constructor(private http: HttpClient) { }

  getAllTrips(token: string): Observable<any> {
    return this.http.get('http://localhost:8080/api/Equipment/getAllTrips', {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
  

  getAllTripForStaff(token: string): Observable<any> {
    return this.http.get('http://localhost:8080/api/Equipment/getAllTripForOneStaff', {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  makeTrip(items:EquipmentItem[],location:string, token: string): Observable<any> {
     const value={items,location}
    return this.http.post('http://localhost:8080/api/Equipment/trip/chckout', value, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }
  getItemOfTrip(id:string):Observable<any>{
   return this.http.get(`http://localhost:8080/api/Equipment/getItemOfTrip/${id}`)
  }

  Checkin(token:string,id:string):Observable<any>{
      return this.http.patch(`http://localhost:8080/api/Equipment/checkin/trip/${id}`,{},{
        headers: { Authorization: `Bearer ${token}` }
      })
  }
}
