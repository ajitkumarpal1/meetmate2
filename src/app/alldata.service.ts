import { Injectable } from '@angular/core';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AlldataService {
  
  user=new Array<any>();
  followid=new Array<any>();
  group_list=new Array<any>();
  product=new Array<any>();
  like_list=new Array<any>();
  //subject;

  constructor(private sst :Router) { }
  userdata(user)
  {
    
   
    this.user=user;
    
  }/* 
  sendMessage(message) {
    this.subject=message;
  }
  setuserdata(userdata:any) {
    this.userdata=userdata;
  } */
  userdataget()
  {
    return this.user;
  }
  follow_list(list)
  {
    this.followid=list;
  }
  get_follow_list()
  {
    return this.followid;
  }
  grouplist(list)
  {
    this.group_list=list;
  }
  gat_grouplist()
  {
    return this.group_list;
  }
  get_product_list()
  {
    return this.product;
  }
  insert_product_list(product)
  {
    this.product=product;
  }
  insert_like_list(list)
  {
    this.like_list=list;
  }
}
