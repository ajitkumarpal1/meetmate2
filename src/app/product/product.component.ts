import { Component, OnInit,Input, Inject } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router,ActivatedRoute} from '@angular/router';
import { AlldataService } from '../alldata.service';
import { AdminComponent} from '../admin/admin.component';


//import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { CommonService } from '../common.service';
import { from } from 'rxjs'

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  par;
  product;
  picarry:string[]= new Array<string>();
  show=0;
  det="";
  userdata;
  product_userdata;
  rating=0;
  ratinglist;
  flag;

  constructor(private sst :Router,private http:HttpClient, private comm:CommonService,private route:ActivatedRoute,private alld:AlldataService,private admin:AdminComponent) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(param=>{
      this.par = {...param.keys, ... param};    
      this.par = this.par["params"];
      this.picarry=[];
      this.userdata=this.alld.userdataget();
      this.comm.product_by_id(this.par["productID"]).subscribe(resp=>{
        this.product=resp;
        let tamp="http://localhost/reachbisiness/pics/";
        for (let index= 0; index <this.product.product_pic.length;index++) 
        {
          if(this.product.product_pic[index]!=',')
          {
            tamp+=this.product.product_pic[index];
          }
          else
          {
            //lert(tamp);
            this.picarry.push(tamp);
            tamp="http://localhost/reachbisiness/pics/";
          }
        }
        for (let index = 0; index  <this.product.product_details.length; index++) {
          if(this.product.product_details[index]=='\n')
        {
          this.det+="<br>";
        }
        else{
          this.det+=this.product.product_details[index];
        }
          
        }
        this.comm.user_by_id(this.product.userID).subscribe(resp=>{
          this.product_userdata=resp;
        });
        this.comm.get_ratin_productID(this.par["productID"]).subscribe(resp=>{
          this.ratinglist=resp;
          for (let i = 0; i <  this.ratinglist.length; i++) {
            this.comm.user_by_id(this.ratinglist[i].from_rating_id).subscribe(resp=>{
              this.ratinglist[i].full_name=resp[i].full_name;
              this.ratinglist[i].profil_pic=resp[i].profil_pic;
            });
            
          }
        })
        this.comm.chack_like_product(this.userdata[0].userID,this.product.productID).subscribe(resp=>{
          this.flag=resp;
        });
      });
    });
  }
  plusSlides(v)
  {
    this.show=this.show+v;
  }
  currentSlide(v)
  {
    this.show=v;
  }
  ratingf(v)
  {
    this.rating =v;
  }
  insert(obj)
  {
    if(this.rating<=0)
    {
      alert("plise silect rating");
      return;
    }
    else
    {
      var objfinal =  new  FormData();
      objfinal.set("from_rating_id",this.userdata[0].userID);
      objfinal.set("rating",""+this.rating);
      objfinal.set("comment",obj.comment);
      objfinal.set("productID",this.product.productID);
      this.comm.product_rating(objfinal).subscribe(resp=>{
        alert(resp);
      });
    }
    /* alert(obj.comment);
    alert(this.rating); */
  }
  
  like_unlike_froduct(flag)
  {
    this.comm.like_unlike_froduct(this.userdata[0].userID,flag,this.product.productID).subscribe(resp=>{
      if(flag=="like")
      {
        this.flag=1;
      }
      else{
        this.flag=0;
      }
    });
  }
  sms()
  {
    this.comm.pm("i am intrested in"+this.product.product_name,this.product_userdata[0].userID,this.userdata[0].userID).subscribe(resp=>{
      alert(resp);
    })
    
  }
}
