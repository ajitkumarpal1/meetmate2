import { Component, OnInit,Inject } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';
import { AlldataService } from '../alldata.service';

@Component({
  selector: 'app-creatgroup',
  templateUrl: './creatgroup.component.html',
  styleUrls: ['./creatgroup.component.css']
})
export class CreatgroupComponent implements OnInit {
  adduser= new Array<any>();
  userdata;
  input="@gmail.com";
  group:any[]=new Array<any>();
  member_ids="";
  group_nname="";
  admin_ids="";
  constructor(private sst :Router,private http:HttpClient,@Inject(LOCAL_STORAGE) private storage: StorageService,private comm:CommonService,private alld:AlldataService,private rout:Router) { }

  ngOnInit(): void {
    this.userdata=this.alld.userdataget();
    this.group=this.alld.gat_grouplist();
    this.admin_ids=this.userdata[0].userID;
    this.member_ids=this.userdata[0].userID+"\\,"
    if(this.group.length <= 0)
    {
      this.comm.gat_groupname_by_id(this.userdata[0].userID).subscribe(resp=>{
        this.group=<any[]>resp;
        //alert (this.group[0].group_name);
      })
    }
  }
  add(mail)
  {
    if(mail==this.userdata[0].email)
    {
      alert("it's your email");
      this.input="";
      return;
    }
    for (let index = 0; index < this.adduser.length; index++) {
      if(this.adduser[index].email==mail)
      {
        alert("this user alredi add");
        this.input="";
        return;
      }
      
    }
    this.comm.user_by_mail(mail).subscribe(resp=>{
      if(resp!="")
      {
        
        this.adduser.push(resp);
        this.member_ids+=this.adduser[this.adduser.length-1].userID+"\\,"
        this.input="";
      }
      else
      {
        alert("this user not exist.\n rechack email");
        this.input="";
      }
    });
  }
  create_group()
  {
    if(this.adduser.length != 0  && this.group_nname!="")
    {
      this.comm.create_group(this.userdata[0].userID,this.group_nname,this.admin_ids,this.member_ids).subscribe(resp=>{
        this.comm.gat_groupname_by_id(this.userdata[0].userID).subscribe(resp=>{
          this.alld.grouplist(resp);
          this.sst.navigateByUrl("/chat");
        })
      });
    }
    else
    {
      alert("atlis one group mamber nasesari")
    }
    //this.comm.create_group(userID,group_name,admin_ids,member_ids).subscribe(resp=>{});
    //this.comm.create_group(userID,group_name,admin_ids,member_ids).subscribe(resp=>{});
  }
  saverange(val)
  {
    if(val.length>=3)
    {
      for (let i = 0; i < this.group.length; i++) {
        if(this.group[i].group_name==val)
        {
          alert("this groupm name alredy criated")
          break;
        }
      }
    }
    else{
      alert("group nmae is too smal");
    }
  }

}
