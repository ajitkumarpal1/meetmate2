import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import{tap} from "rxjs/operators";
import { promise } from 'selenium-webdriver';


@Injectable({
  providedIn: 'root'
})
export class CommonService {
  path="localhost/reachbisiness";
  
  constructor(private sst :Router,private http:HttpClient) { }
 
    login(email:any,password:any)
    {
      console.log("==>>","http://"+this.path+"/login.php?email="+email+"&password="+password);
      
      return this.http.get("http://"+this.path+"/login.php?email="+email+"&password="+password);
    }
    registration(obj)
    {
      var objfinal =  new  FormData();
      objfinal.set("fullname",obj.name);
      objfinal.set("cnumber",obj.phone);
      objfinal.set("email",obj.email);
      objfinal.set("password",obj.password);

      return this.http.post("http://"+this.path+"/signup.php",objfinal);
    }
    update(ffile)
    {
      
      return this.http.post("http://"+this.path+"/updateprofile.php",ffile);
    }
    gps():Promise<any>
    {
      return new Promise((resolve,reject)=>{

        navigator.geolocation.getCurrentPosition(resp=>{
          resolve ({lng:resp.coords.longitude,lat:resp.coords.latitude});
        })
      })
    }
    getUserLike(userID,likeID)
    {
      return this.http.get("http://localhost/reachbisiness/getUserLike.php?userID="+userID+"&likeID="+likeID);
    }
    getAllPostById(userID)
    {
      return this.http.get("http://localhost/reachbisiness/getAllPostById.php?userID="+userID);
    }
    userLike(userID,likeID)
    {
      return this.http.get("http://localhost/reachbisiness/userLike.php?userID="+userID+"&likeID="+likeID);
    }
    mach(userID,likeID)
    {
      return this.http.get("http://localhost/reachbisiness/mach.php?userID="+userID+"&likeID="+likeID);
    }
    produact(pdata)
    {
      return this.http.post("http://"+this.path+"/product.php",pdata);
    }
    search_user(search,mor)
    {
      return this.http.get("http://"+this.path+"/search.php?search="+search+"&time="+mor);
    }
    search_product(search,mor)
    {
      return this.http.get("http://"+this.path+"/search_product.php?search="+search+"&time="+mor);
    }
    search_post(search,mor)
    {
      return this.http.get("http://"+this.path+"/searchPost.php?search="+search+"&time="+mor);
    }
    user_by_id(userid)
    {
      return this.http.get("http://"+this.path+"/user_by_id.php?userID="+userid);
    }
    product_by_userID(userid)
    {
      return this.http.get("http://"+this.path+"/product_by_userID.php?userID="+userid);
    }
    product_by_id(id)
    {
      return this.http.get("http://"+this.path+"/product_by_id.php?productID="+id);
    }
    follow_list(userid:any)
    {
      return this.http.get("http://"+this.path+"/follow_list.php?userID="+userid);
    }
    follow(id,userid)
    {
      return this.http.get("http://"+this.path+"/followe_by_id.php?userID="+userid+"&followeID="+id);
    }
    unfollow(id,userid)
    {
      return this.http.get("http://"+this.path+"/unfollowe_by_id.php?userID="+userid+"&followeID="+id);
    }
    user_by_mail(email)
    {
      return this.http.get("http://"+this.path+"/user_by_mail.php?mail="+email);
    }
    gat_groupname_by_id(userID)
    {
      return this.http.get("http://"+this.path+"/gat_groupname_by_id.php?userID="+userID);
    }
    create_group(userID,group_name,admin_ids,member_ids)
    {
      return this.http.get("http://"+this.path+"/create_group.php?creat_id="+userID+"&group_name="+group_name+"&admin_ids="+admin_ids+"&member_ids="+member_ids);
    }
    get_member(group_id)
    {
      return this.http.get("http://"+this.path+"/get_member.php?group_id="+group_id);
    }
    chat(obj)
    {
      return this.http.post("http://"+this.path+"/chat.php",obj);
    }
    gat_chat_by_gid(group_id)
    {
      return this.http.get("http://"+this.path+"/gat_chat_by_gid.php?group_id="+group_id);
    }
    get_fild()
    {
      return this.http.get("http://"+this.path+"/get_fild.php");
    }
    product_rating(obj)
    {
      return this.http.post("http://"+this.path+"/product_rating.php",obj);
    }
    get_ratin_productID(prductid)
    {
      return this.http.get("http://"+this.path+"/get_ratin_productID.php?productID="+prductid);
    }
    loop_lode_chat(group_id,sr_no)
    {
      return this.http.get("http://"+this.path+"/loop_lode_chat.php?group_id="+group_id+"&sr_no="+sr_no);
    }
    like_unlike_froduct(userID,flag,productID)
    {
      return this.http.get("http://"+this.path+"/like_unlike_froduct.php?userID="+userID+"&flag="+flag+"&productID="+productID);
    }
    chack_like_product(userID,productID)
    {
      return this.http.get("http://"+this.path+"/chack_like_product.php?userID="+userID+"&productID="+productID);
    }
    get_like_list(userID)
    {
      return this.http.get("http://"+this.path+"/get_like_list.php?userID="+userID);
    }
    pm(pm,get_id,send_id)
    {
      return this.http.get("http://"+this.path+"/pm.php?pm="+pm+"&get_id="+get_id+"&send_id="+send_id);
    }
    get_pm_list(userID)
    {
      return this.http.get("http://"+this.path+"/get_pm_list.php?userID="+userID);
    }
    put_search_history(userID,search)
    {
      return this.http.get("http://"+this.path+"/put_search_history.php?userID="+userID+"&search="+search);
    }
    get_product_for_home(userID)
    {
      return this.http.get("http://"+this.path+"/get_product_for_home.php?userID="+userID);
    }
    get_pm_by_id(get_id,send_id)
    {
      return this.http.get("http://"+this.path+"/get_pm_by_id.php?get_id="+get_id+"&send_id="+send_id);
    }
    live_pm_chat(get_id,send_id,sr_no)
    {
      return this.http.get("http://"+this.path+"/live_pm_chat.php?get_id="+get_id+"&send_id="+send_id+"&sr_no="+sr_no);
    }
    get_notification(userID)
    {
      return this.http.get("http://"+this.path+"/get_notification.php?userID="+userID);
    }
    post(object)
    {
      return this.http.post("http://"+this.path+"/post.php",object);
    }
    getPostByid(object)
    {      
      return this.http.post("http://"+this.path+"/getPostByid.php",object);
    }
}