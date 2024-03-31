import { Component, OnInit,Input, Inject } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { CommonService } from '../common.service';
import { AlldataService } from '../alldata.service';
import { from } from 'rxjs';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;

    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
export class password implements ErrorStateMatcher {
  pt: any;
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));

  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  pt="";
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8)
  ]);

  matcher = new MyErrorStateMatcher();
  password = new password();
  hide = true;
  
  constructor(private sst :Router,private http:HttpClient,@Inject(LOCAL_STORAGE)private storage: StorageService, private comm:CommonService,private alld:AlldataService) { }
  userdata;

  ngOnInit(): void {
  }
  loginaction(fd)
  {
    var username = fd.value.email;
    var password = fd.value.password;

    
    this.comm.login(username,password).subscribe(resp=>{ 
      //this.http.get("http://localhost/angular/select.php?email="+username+"&password="+password).subscribe(resp=>{
         this.userdata = <any[]> resp;
          if(this.userdata.length == 1)
          {
            alert("login");
            this.storage.set("email",username);
            this.storage.set("cod",password);
            this.alld.userdata( this.userdata);
            this.sst.navigateByUrl("/");
          }
          else    
          {
             alert("invalid user name and password");
          }
      })
  }

}
