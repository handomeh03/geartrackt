import { Injectable, signal } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({providedIn:"root"})
export class AuthService{
    token:string="";
    

    constructor(private http: HttpClient) {}


    saveToken(token:string){
        this.token=token;
        sessionStorage.setItem("token", token);
    }

    login(value:{email:string,password:string}):Observable<any>{

        const body = {email: value.email,password: value.password};
        const res=this.http.post("http://localhost:8080/api/user/login",body);
         return res;
    }

    register(value:{fullName:String,email:string,password:string}):Observable<any>{
        const body={fullName:value.fullName,email:value.email,password:value.password};
        const res=this.http.post("http://localhost:8080/api/user/register",body);
        return res;
    }
 
}