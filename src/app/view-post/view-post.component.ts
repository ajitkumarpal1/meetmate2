import { Component, OnInit, Input, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AlldataService } from '../alldata.service';
import { AdminComponent } from '../admin/admin.component';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

  par;
  data;

  constructor(private sst: Router, private http: HttpClient, private comm: CommonService, private route: ActivatedRoute, private alld: AlldataService, private admin: AdminComponent) { }


  ngOnInit(): void {
    this.route.queryParamMap.subscribe(param => {
      this.par = { ...param.keys, ...param };
      this.par = this.par["params"];
      
      
      var objfinal =new  FormData();
      objfinal.set("postId",this.par.postID);
      this.comm.getPostByid(objfinal).subscribe(resp => {
        this.data=resp;
      }) 
    });
  }

}
