import { Component, OnInit,Input, Inject } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router,ActivatedRoute} from '@angular/router';

//import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { CommonService } from '../common.service';
import { AlldataService } from '../alldata.service';
import { from } from 'rxjs'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  product;

  constructor(private sst :Router,private http:HttpClient, private comm:CommonService,private alld:AlldataService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    var userd=this.alld.userdataget();
    this.comm.get_product_for_home(userd[0].userID).subscribe(resp=>{ 
      this.product=resp;
      for (let i = 0; i < this.product.length; i++) {
        var temp=0;
        this.product[i].pic="http://localhost/reachbisiness/pics/";
        for (let j = 0; j < this.product[i]['product_pic'].length; j++) {
          if(this.product[i]['product_pic'][j]!=',')
          {
            this.product[i].pic+=this.product[i]['product_pic'][j];
          }
          else{
            break;
            temp++;
            this.product[i].pic[temp]="http://localhost/reachbisiness/pics/";
          }
        }
      } 
      
    });
  }
  

}
