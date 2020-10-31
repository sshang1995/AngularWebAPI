import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SharedService {
readonly APIUrl="https://localhost:44319/api";

  constructor(private http:HttpClient) { }

  getQuotesList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/quotes');
  }

  getQuote(val:any){
    return this.http.get(this.APIUrl+'/quotes/'+val);
  }

  addQuotes(val:any){
    return this.http.post(this.APIUrl+'/quotes',val)
  }

  updateQuotes(id:any,val:any){
    return this.http.put(this.APIUrl+'/quotes/'+id,val)
  }

  deleteQuotes(val:any){
    return this.http.delete(this.APIUrl+'/quotes/'+val)
  }

  getUserList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/users');
  }

  getUser(val:any){
   
    return this.http.get(this.APIUrl+'/users/'+val)
  }

  getUserLogin(name:any, password: any){
   
    return this.http.get(this.APIUrl+'/users?name='+name+'&password='+password)
  }

  getUserExist(name:any, email: any){
   
    return this.http.get(this.APIUrl+'/users?name='+name+'&email='+email)
  }

  addUser(val:any){
    return this.http.post(this.APIUrl+'/users',val)
  }

  deleteUser(name:any){
    return this.http.delete(this.APIUrl+'/users?name='+ name)
  }

  getToken(name:any, password:any){
    let body = new URLSearchParams();
    body.set('username',name);
    body.set('password', password);
    body.set('grant-type',"password")
    let options ={
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }
    return this.http.post("https://localhost:44319/token",body.toString(), options) 
  }

}