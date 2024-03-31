import { Component, OnInit,Inject } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';
import { AlldataService } from '../alldata.service';
import { AdminComponent } from '../admin/admin.component';




@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userdata;
  selectedFile;
  imgePath;
  imgURL:any;
  fild;
  constructor(private http:HttpClient,@Inject(LOCAL_STORAGE) private storage: StorageService,private comm:CommonService,private alld:AlldataService,private adm:AdminComponent,private rout:Router) { }

  ngOnInit(): any {
    this.userdata=this.alld.userdataget();
    this.comm.get_fild().subscribe(resp=>{
      this.fild=<any[]>resp;
    });

  }
  onFileChanged(event,files) {
    this.selectedFile = event.target.files[0]
    var reader1=new FileReader()
    this.imgePath = reader1;
    
    reader1.readAsDataURL(files[0]);
    reader1.onload = (event)=>
    {
    this.imgURL = reader1.result;
    }
  }
  data(obj)
  {
    var picadd=this.userdata[0].profil_pic.replace('http://localhost/reachbisiness/pics/','');
    var objfinal =  new  FormData();
    objfinal.set("full_name",obj.full_name);
    objfinal.set("profil_type",obj.profil_type);
    objfinal.set("comp_name",obj.comp_name);
    objfinal.set("email",this.userdata[0].email);
    objfinal.set("contact_no",obj.contact_no);
    objfinal.set("latitude",obj.latitude);
    objfinal.set("longitude",obj.longitude);
    objfinal.set("country",obj.country);
    objfinal.set("state",obj.state);
    objfinal.set("city",obj.city);
    objfinal.set("addres",obj.addres);
    objfinal.set("pic_cod",obj.pic_cod);
    objfinal.set("landmark",obj.landmark);
    objfinal.set("field",obj.field);
    objfinal.set("interest",obj.interest);
    objfinal.set("pic",obj.pic);
    objfinal.set("gender",obj.gender);
    objfinal.set("userID",this.userdata[0].userID);
    objfinal.set("pic",picadd); 
    if(this.selectedFile)
    {
      alert(this.userdata[0].userID)
    objfinal.append('profil_pic', this.selectedFile, this.selectedFile.name);
    var pic=this.imgURL;
    }
    else
    {
      var pic=this.userdata[0].profil_pic;
    }

    
    
    this.comm.update(objfinal).subscribe(resp=>{
      alert("ss");
      this.adm.update(obj.full_name,pic);
      
    });
  }
  getaddres()
  {
    this.comm.gps().then(resp=>{
      alert(resp.lng+"/"+resp.lat);
    });
  }
  ngOnDestroy()
  {
    var mail=this.storage.get("email");
    var pass=this.storage.get("cod");
    if(mail && pass)
    {
       this.comm.login(mail,pass).subscribe(resp=>{ 
        this.userdata = <any[]> resp;      
            
            this.alld.userdata(this.userdata);
        }) 
    }
  }
  

}
