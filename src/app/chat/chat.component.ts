import { Component, OnInit,Inject } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';
import { AlldataService } from '../alldata.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  select_group="";
  group_list;
  userdata
  member;
  memberdata;
  chats=new Array<any>();
  risent_chats=new Array<any>();
  latid;
  constructor(private sst :Router,private http:HttpClient,@Inject(LOCAL_STORAGE) private storage: StorageService,private comm:CommonService,private alld:AlldataService,private rout:Router) { }

  ngOnInit(): void {
    this.userdata=this.alld.userdataget();
    this.group_list=this.alld.gat_grouplist();
    if(this.group_list.length==0)
    {
    this.comm.gat_groupname_by_id(this.userdata[0].userID).subscribe(resp=>{
              let tamp:any=resp;
              for (let i = 0; i < tamp.length; i++) {
                this.comm.user_by_id(tamp[i].creat_id).subscribe(resp1=>{
                  resp[i].full_name=resp1[0].full_name;
                });
              }
              this.group_list=<any[]>resp;
      //alert (this.group[0].group_name);
    })
    }
  }
  active_group(groupid)
  {
    this.memberdata=[]
    this.comm.get_member(groupid).subscribe(resp=>{
      this.member=<any[]>resp;
      for (let i = 0; i < this.member.length; i++) {
        this.comm.user_by_id(this.member[i]).subscribe(resp=>{
          if(i==0)
          {
            this.memberdata=<any[]>resp;
          }
          else{
            this.memberdata=this.memberdata.concat(<any[]> resp);
          }
        })
      }
      
       this.comm.gat_chat_by_gid(groupid).subscribe(resp=>{
        this.chats=<any[]>resp;
        for (let i = 0; i < this.chats.length; i++) {
          for (let j = 0; j < this.memberdata.length; j++) {
            if(this.chats[i].member_id==this.memberdata[j].userID)
            {
              this.chats[i].full_name=this.memberdata[j].full_name;
              this.chats[i].profil_pic=this.memberdata[j].profil_pic;
              this.chats[i].registration_date=this.memberdata[j].registration_date;
            }
            if(this.chats[i].full_name==undefined)
            {
             //lode users alert (this.chats[i].comment+","+this.chats[i].userID);
            }
          }
        }
        this.real_time(groupid);
      }) 
    }) 
  }
  real_time(groupid)
  {
    this.latid=this.chats[this.chats.length-1].sr_no;
        this.comm.loop_lode_chat(groupid,this.latid).subscribe(resp=>{
          if(this.risent_chats.length==0)
          {
            //this.risent_chats.push(resp);
            this.risent_chats=<any[]>resp;
          }
          else
          {
            this.risent_chats.push(resp);
          }
          this.comm.user_by_id(resp[0].member_id).subscribe(resp1=>{
              this.risent_chats[this.risent_chats.length-1].full_name=resp1[0].full_name;
              this.risent_chats[this.risent_chats.length-1].profil_pic=resp1[0].profil_pic;
              this.risent_chats[this.risent_chats.length-1].registration_date=resp1[0].registration_date;
              
              this.chats.push(this.risent_chats[0]);
              this.risent_chats=[];
              this.real_time(groupid);
          });
        })
  }

  chat(val)
  {
    var objfinal =  new  FormData();
    
      objfinal.set("group_id",this.select_group);
      objfinal.set("member_id",this.userdata[0].userID);
      objfinal.set("type","string");
      objfinal.set("comment",val);
        
    this.comm.chat(objfinal).subscribe(resp=>{
      /* var objfinal =  new  FormData();
          this.chats.push(objfinal);
          this.chats[this.chats.length].member_id=this.userdata[0].userID;
          this.chats[this.chats.length].full_name=this.userdata[0].full_name;
          this.chats[this.chats.length].profil_pic=this.userdata[0].profil_pic;
          this.chats[this.chats.length].registration_date=Date();
          this.chats[this.chats.length].comment=val;
           */
    })  
  }

}
