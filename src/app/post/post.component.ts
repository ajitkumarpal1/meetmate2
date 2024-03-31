import { Component, OnInit,Inject } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { CommonService } from '../common.service';
import { Router } from '@angular/router';
import { AlldataService } from '../alldata.service';



@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  file;
  selectedFile=new Array<any>();
  filepath;
  temp=new Array<any>();
  arr=new Array<any>();
  string="";
  userdata;
  aa="";
  tag='#emanple1#emanple2';
  
  favoriteSeason: string;
  seasons: string[] = ['pic', 'video', 'string'];

  constructor(private sst :Router,private http:HttpClient,@Inject(LOCAL_STORAGE) private storage: StorageService,private comm:CommonService,private alld:AlldataService,private rout:Router) { }

  ngOnInit(): void {
    this.userdata=this.alld.userdataget();
    
  }
  onFileChanged(event,files)
  {
    this.selectedFile.push(event.target.files[0]);
    var reader1=new FileReader()
    this.filepath = reader1;

    reader1.readAsDataURL(files[0]);
    reader1.onload = (event)=>
    {
      this.file = reader1.result;
      this.temp.push(this.file);
      this.arr.push(this.favoriteSeason);
      this.string=this.string+'*';
      this.aa="";
    
    }
  }
  add(text)
  {
    this.string=this.string+text;
    this.temp.push(text);
    this.arr.push(this.favoriteSeason);
    this.aa="";
    
  }
  uplod()
  {
    var objfinal =new  FormData();
    objfinal.set("userID",this.userdata[0].userID);
    objfinal.set("tag",this.tag);
    alert(this.tag)
    for (let i = 0; i < this.arr.length; i++) 
    {
      objfinal.set("types["+i+"]",this.arr[i]);
    }
    objfinal.set("string",this.string);
    if(this.selectedFile)
    {
      for(var i=0;i<this.selectedFile.length;i++)
      {
        objfinal.append('file'+i, this.selectedFile[i], this.selectedFile[i].name);
      }
    }
    else{
      //alert (" pic")
      //return;
    }
    /* objfinal.set('tag',this.tag) */
    /* console.log(objfinal.tag,"======>>>>>",objfinal); */
    this.comm.post(objfinal).subscribe(resp=>{
      alert(resp);
      //this.sst.navigateByUrl("/product?productID="+resp);
    });
  }
}
