import { Component, OnInit,Input } from '@angular/core';
import {Router} from '@angular/router';
import { NgForm } from '@angular/forms';
import { SharedService } from '../shared.service';
import * as jwt from 'jsonwebtoken';


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
  ConfirmPassword:string;

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
        Email:'',
        ConfirmPassword:''
      }
    }  
  };

  LoginClick(){

    var u ={
      Name: this.Name,
      // Email: this.Email,
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
    // var payload = {name: u.Name, password:u.Password };
    // var token = jwt.sign(payload,'secretKey');
    // alert(token);
  };

  SignupClick(){
    var u ={
      Name: this.Name,
      Email: this.Email,
      Password: this.Password
    }

    var confirmpassword = this.ConfirmPassword;

    this.service.getUserExist(u.Name,u.Email).subscribe(
      res => {
        alert("User exist");
      },
      error =>{
        this.service.addUser(u).subscribe(
          res => {
            // let payload = {name: u.Name, password:u.Password };
            // let token = jwt.sign(payload,'secretKey');
            // alert(token);
            if(
              u.Name != null &&
              u.Email != null &&
              u.Password != null )
              {
                if (confirmpassword == u.Password){
                  alert("Add User success");
                }else{
                  alert("Password and confirm Password does not match "+this.ConfirmPassword+' ' + u.Password)
                  this.service.deleteUser(u.Name).subscribe();
                }
                
              } else{
                alert("please insert all values")
              }
           
          },
          error => {
             alert("Cannot Add new User")
          }
        )

      }
    )
    
  }


}
