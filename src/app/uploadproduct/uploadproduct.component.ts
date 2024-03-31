import { Component, OnInit,Inject } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';
import { AlldataService } from '../alldata.service';


@Component({
  selector: 'app-uploadproduct',
  templateUrl: './uploadproduct.component.html',
  styleUrls: ['./uploadproduct.component.css']
})
export class UploadproductComponent implements OnInit {
  product_pic;
  selectedFile=new Array<any>();
  imgePath;
  userdata;
  temp=new Array<any>();
  productlist;
  constructor(private sst :Router,private http:HttpClient,@Inject(LOCAL_STORAGE) private storage: StorageService,private comm:CommonService,private alld:AlldataService,private rout:Router) { }

  ngOnInit(): void {
    this.userdata=this.alld.userdataget();
    this.productlist=this.alld.get_product_list();
      if(this.productlist.length==0)
      {
        this.comm.product_by_userID(this.userdata[0].userID).subscribe(resp=>{
          var len=<any[]>resp;
          for (let index = 0; index < len.length; index++) {
            var tamp="http://localhost/reachbisiness/pics/";
            for (let inloop = 0; inloop < resp[index].product_pic.length; inloop++) {
            
              if(resp[index].product_pic[inloop]!=',')
              {
                tamp+=resp[index].product_pic[inloop];
              }
              else
              {
                break;
              }
            }
            resp[index].product_pic=tamp;
        }
        this.productlist=<any[]>resp;
        this.alld.insert_product_list(this.productlist);
      })
      }
    
  }
  onFileChanged(event,files)
  {
    this.selectedFile.push(event.target.files[0]);
    var reader1=new FileReader()
    this.imgePath = reader1;

    reader1.readAsDataURL(files[0]);
    reader1.onload = (event)=>
    {
      this.product_pic = reader1.result;
      this.temp.push(this.product_pic);
    alert(this.temp.length);
    }
  }
  product(ffile)
  {
    for (let index = 0; index < this.productlist.length; index++) {
      if(this.productlist[index].product_name==ffile.product_name)
      {
        alert("this product name is aalrady avelable")
        return;
      }
    }
    var objfinal =  new  FormData();
    //alert ("aaaa"+this.userdata[0].userID);
    objfinal.set("product_name",ffile.product_name);
    objfinal.set("product_details",ffile.product_details);
    objfinal.set("mrp",ffile.price);
    objfinal.set("quantity",ffile.quantity);
    objfinal.set("userID",this.userdata[0].userID);
    objfinal.set("retail_price",'0');
    objfinal.set("nop",this.temp.length.toString());

   

    console.log(ffile);
    if(this.selectedFile)
    {
      for(var i=0;i<this.temp.length;i++)
      {
        objfinal.append('product_pic'+i, this.selectedFile[i], this.selectedFile[i].name);
      }
    }
    else{
      alert (" pic")
      return;
    }

    
    
    this.comm.produact(objfinal).subscribe(resp=>{
      alert("resp");
      alert(resp);
      this.sst.navigateByUrl("/product?productID="+resp);
    });
  }
}