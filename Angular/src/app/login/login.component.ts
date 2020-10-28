import { Component, OnInit,Input } from '@angular/core';
import {Router} from '@angular/router';
import { NgForm } from '@angular/forms';
import { SharedService } from '../shared.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  
  constructor(private service:SharedService, private route:Router) { };

  
  @Input() user:any;

  token:any;
  auth:any;

  Name:string;
  Email:string;
  Password:string;

  ngOnInit(): void {
    // this.Name = this.user.Name;
    // this.Email = this.user.Email;
    // this.Password = this.user.Password;
    this.resetForm();
  }

  resetForm(form?:NgForm){
    if(form != null){
      form.reset();
      this.user = {
        UserName:'',
        Password:'',
        Email:''
      }
    }  
  };

  LoginClick(){

    var u ={
      Name: this.Name,
      Email: this.Email,
      Password: this.Password
    }

    this.service.getUserLogin(u.Name, u.Password).subscribe(
      res => {
        alert("Login Success");
        this.route.navigate(['/quotes']);
      },
      error => {
        alert("Wrong Password or Name");
      }
        
    )
  };

  SignupClick(){
    var u ={
      Name: this.Name,
      Email: this.Email,
      Password: this.Password
    }

    this.service.getUserExist(u.Name,u.Email).subscribe(
      res => {
        alert("User exist");
      },
      error =>{
        this.service.addUser(u).subscribe(
          res => {
            alert("Add New User Success");
          }
        )

      }
    )
    
  }


}
