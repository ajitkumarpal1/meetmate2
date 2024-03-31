import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { from } from 'rxjs';
import { CommonService } from '../common.service';
import {FormControl, Validators} from '@angular/forms';

export class InputErrorsExample {
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  hide = true;
  constructor( private comm:CommonService,private rout:Router) { }

  ngOnInit(): void {
  }
  registration(rdata:any)
  {
    
    this.comm.registration(rdata).subscribe(resp=>{
      
        alert(resp);
         if(resp == "success")
         {
          this.rout.navigateByUrl("/login");
         }
  }); 
 
  } 
  /* registration(formval)
    {
    var objfinal;
    //var stu;  
    objfinal.fullname = formval.uname;
    objfinal.email  = formval.email;
    objfinal.mobilenumber = formval.mob;
    objfinal.password =  formval.upassword;
    
    this.comm.registration(objfinal).subscribe(resp=>{

        alert(resp);
         if(resp == "success")
         {
          this.rout.navigateByUrl("/login") 
         }
         else
         {
              alert("Registration fail");
         }
    });
    //this.rout.navigateByUrl("/login")

    } */

}
