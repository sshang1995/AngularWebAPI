import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
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

}