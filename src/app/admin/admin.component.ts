import { OnDestroy } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { Subscription } from 'rxjs';
import { Component, OnInit, Inject ,Input,Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { AlldataService } from '../alldata.service';
//import { timeStamp } from 'node:console';
import { Directive, HostListener } from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  mediaSub: any;
  deviceXs: any;
  topVal = 0;
  value = '';

  swidth;
  filter="";
  userdata:any;
  like_list;
  like_list_data=new Array<any>();
  pm_not=new Array<any>();
  notification=new Array<any>();
  notification_id;
  Component1=''
  constructor(private location: Location,public mediaObserver: MediaObserver ,private sst :Router,private http:HttpClient,@Inject(LOCAL_STORAGE) private storage: StorageService,private comm:CommonService,private rout:Router,private alld:AlldataService) { }

  ngOnInit(): void {
    this.mediaSub = this.mediaObserver.media$.subscribe((res: MediaChange) => {
      console.log(res.mqAlias,"ajit");
      this.deviceXs = res.mqAlias === "xs" ? true : false;
      if(res.mqAlias=='xs'){
        document.getElementById('side').classList.add('d-none')
      }else{
        document.getElementById('side').classList.remove('d-none')
      }
    })

    

    var mail=this.storage.get("email");
    var pass=this.storage.get("cod");
    if(mail && pass)
    {
       this.comm.login(mail,pass).subscribe(resp=>{ 
        this.userdata = <any[]> resp; 
            this.alld.userdata(this.userdata);
            this.comm.follow_list(this.userdata[0].userID).subscribe(resp=>{ 
              this.alld.follow_list(resp);
            })
            //get message  
            this.comm.get_pm_list(this.userdata[0].userID).subscribe(resp=>{ 
              this.pm_not=<any[]>resp;
              for (let i = 0; i < this.pm_not.length; i++) 
              {
                let tem=this.pm_not[i].get_id;
                if(this.pm_not[i].get_id==this.userdata[0].userID)
                {
                  tem=this.pm_not[i].send_id;
                }
                this.comm.user_by_id(tem).subscribe(resp=>{
                  this.pm_not[i].full_name=resp[0].full_name;
                  this.pm_not[i].profil_pic=resp[0].profil_pic;
                  this.pm_not[i].userID=resp[0].userID;
                });
              }
              //alert (this.pm_not[0].pm);
            })
            //get notification
            this.comm.get_notification(this.userdata[0].userID).subscribe(resp=>{ 
              this.notification_id=<any[]>resp;
                for (let i = 0; i < this.notification_id.length; i++) {
                  this.comm.product_by_id(this.notification_id[i]).subscribe(resp=>{
                    var tpic="http://localhost/reachbisiness/pics/";
                      for (let i = 0; i < resp['product_pic'].length; i++) {
                        if(resp['product_pic'][i]!=',')
                        {
                          tpic+=resp['product_pic'][i];
                        }
                        else
                        {
                          resp['product_pic']=tpic;
                          break;
                        }
                        
                      }
                      this.notification.push(resp);
                  })
                  
                }
              //alert (this.pm_not[0].pm);
            })
            //get group list
            this.comm.gat_groupname_by_id(this.userdata[0].userID).subscribe(resp=>{
              var tamp:any=resp;
              for (let i = 0; i < tamp.length; i++) {
                this.comm.user_by_id(tamp[i].creat_id).subscribe(resp1=>{
                  resp[i].full_name=resp1[0].full_name;
                });
              }
              this.alld.grouplist(resp);
            })
            //get product who like by user
            this.comm.get_like_list(this.userdata[0].userID).subscribe(resp=>{
              this.like_list=resp;
              this.alld.insert_like_list(resp);
              for (let i = 0; i < this.like_list.length; i++) {
                this.comm.product_by_id(this.like_list[i]).subscribe(resp=>{
                  var tpic="http://localhost/reachbisiness/pics/";
                    for (let i = 0; i < resp['product_pic'].length; i++) {
                      if(resp['product_pic'][i]!=',')
                      {
                        tpic+=resp['product_pic'][i];
                      }
                      else
                      {
                        resp['product_pic']=tpic;
                        break;
                      }
                      
                    }
                    this.like_list_data.push(resp);
                })
                
              }
            })
        })
        
         
    }
    else
    {
      alert("you are not login");
      this.comm.login('guest','').subscribe(resp=>{ 
        this.userdata = <any[]> resp; 
            this.alld.userdata(this.userdata);
            this.comm.follow_list(this.userdata[0].userID).subscribe(resp=>{ 
              this.alld.follow_list(resp);
            })
            //get message  
            this.comm.get_pm_list(this.userdata[0].userID).subscribe(resp=>{ 
              this.pm_not=<any[]>resp;
              for (let i = 0; i < this.pm_not.length; i++) 
              {
                let tem=this.pm_not[i].get_id;
                if(this.pm_not[i].get_id==this.userdata[0].userID)
                {
                  tem=this.pm_not[i].send_id;
                }
                this.comm.user_by_id(tem).subscribe(resp=>{
                  this.pm_not[i].full_name=resp[0].full_name;
                  this.pm_not[i].profil_pic=resp[0].profil_pic;
                  this.pm_not[i].userID=resp[0].userID;
                });
              }
              //alert (this.pm_not[0].pm);
            })
            //get notification
            this.comm.get_notification(this.userdata[0].userID).subscribe(resp=>{ 
              this.notification_id=<any[]>resp;
                for (let i = 0; i < this.notification_id.length; i++) {
                  this.comm.product_by_id(this.notification_id[i]).subscribe(resp=>{
                    var tpic="http://localhost/reachbisiness/pics/";
                      for (let i = 0; i < resp['product_pic'].length; i++) {
                        if(resp['product_pic'][i]!=',')
                        {
                          tpic+=resp['product_pic'][i];
                        }
                        else
                        {
                          resp['product_pic']=tpic;
                          break;
                        }
                        
                      }
                      this.notification.push(resp);
                  })
                  
                }
              //alert (this.pm_not[0].pm);
            })
            //get group list
            this.comm.gat_groupname_by_id(this.userdata[0].userID).subscribe(resp=>{
              var tamp:any=resp;
              for (let i = 0; i < tamp.length; i++) {
                this.comm.user_by_id(tamp[i].creat_id).subscribe(resp1=>{
                  resp[i].full_name=resp1[0].full_name;
                });
              }
              this.alld.grouplist(resp);
            })
            //get product who like by user
            this.comm.get_like_list(this.userdata[0].userID).subscribe(resp=>{
              this.like_list=resp;
              this.alld.insert_like_list(resp);
              for (let i = 0; i < this.like_list.length; i++) {
                this.comm.product_by_id(this.like_list[i]).subscribe(resp=>{
                  var tpic="http://localhost/reachbisiness/pics/";
                    for (let i = 0; i < resp['product_pic'].length; i++) {
                      if(resp['product_pic'][i]!=',')
                      {
                        tpic+=resp['product_pic'][i];
                      }
                      else
                      {
                        resp['product_pic']=tpic;
                        break;
                      }
                      
                    }
                    this.like_list_data.push(resp);
                })
                
              }
            })
        })
    }

    
  this.handleBodyClick();
  }
  @HostListener('document:click', ['$event'])
  onClick() {
    // Call your desired function here
    // For example:
    this.handleBodyClick();
  }

  handleBodyClick() {
    // Function logic to execute on body click
    console.log(window.location.href,'Body Clicked');
    const path = this.location.path();
    console.log('Path:', path);
    if(!path){
      this.Component1='Home'
    }else{
      this.Component1='';
      for (let index = 1; index < path.length; index++) {
        if(path[index]=='?')
        {
          break;
        }
        this.Component1+=path[index];
      }
      
    }
    
  }
  ngOnDestroy() {
    this.mediaSub.unsubscribe();

  }
  onScroll(e:any) {
    let scrollXs = this.deviceXs ? 55 : 73;
    if (e.srcElement.scrollTop < scrollXs) {
      this.topVal = e.srcElement.scrollTop;
    } else {
      this.topVal = scrollXs;
    }
  }
  sideBarScroll() {
    let e = this.deviceXs ? 160 : 130;
    return e - this.topVal;
  }

  logout()
  {
    localStorage.removeItem('email');
    localStorage.removeItem('cod'); 
    alert("logout");
    this.sst.navigateByUrl("/login");
  }
  update(name: any,pic: any)
  {
    alert("in");
    this.userdata[0].full_name=name;
    this.userdata[0].profil_pic=pic;
  }
  sear(val)
  {
    this.sst.navigateByUrl(`search?search=`+val.search);
  }
  
}
