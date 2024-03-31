import { Component, OnInit,Input, Inject } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router,ActivatedRoute} from '@angular/router';

//import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { CommonService } from '../common.service';
import { AlldataService } from '../alldata.service';
import { from } from 'rxjs'

@Component({
  selector: 'app-perchat',
  templateUrl: './perchat.component.html',
  styleUrls: ['./perchat.component.css']
})
export class PerchatComponent implements OnInit {
  par;
  shousers=0;
  shochat=0;
  userdata;
  fuser;
  chat;
  pm_note
  constructor(private sst :Router,private http:HttpClient, private comm:CommonService,private alld:AlldataService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.userdata=this.alld.userdataget();
    this.route.queryParamMap.subscribe(param=>{
      this.par = {...param.keys, ... param};    
      this.par = this.par["params"];
      this.comm.user_by_id(this.par['userid']).subscribe(resp=>{ 
        this.fuser=resp;
      });
      this.comm.get_pm_list(this.userdata[0].userID).subscribe(resp=>{ 
        this.pm_note=<any[]>resp;
        for (let i = 0; i < this.pm_note.length; i++) 
        {
          let tem=this.pm_note[i].get_id;
          if(this.pm_note[i].get_id==this.userdata[0].userID)
          {
            tem=this.pm_note[i].send_id;
          }
          this.comm.user_by_id(tem).subscribe(resp=>{
            this.pm_note[i].full_name=resp[0].full_name;
            this.pm_note[i].profil_pic=resp[0].profil_pic;
            this.pm_note[i].userID=resp[0].userID;
          });
        }
        //alert (this.pm_not[0].pm);
      })
      this.comm.get_pm_by_id(this.par['userid'],this.userdata[0].userID).subscribe(resp=>{ 
        this.chat=resp;
        this.live_chat();
      }); 
    });
  }
  live_chat()
  {
    var sr=0;
    if(this.chat.length>0)
    {
      sr=this.chat[this.chat.length-1].sr_no;
    }
    
    this.comm.live_pm_chat(this.userdata[0].userID,this.par['userid'],sr).subscribe(resp=>{
      let t=<any[]>resp;
      this.chat.push(resp[0]);
      this.live_chat();
    });
  }
  sms(comm)
  {
    this.comm.pm(comm,this.par['userid'],this.userdata[0].userID).subscribe(resp=>{
      var temp:any=Object.assign({},this.chat);
      
      temp.sr_no=resp;
      temp.pm=comm;
      temp.send_id=this.userdata[0].userID;
      temp.get_id=this.par['userid'];
      temp.time='recent'; 
      this.chat.push(temp);
    })
    
  }

}
