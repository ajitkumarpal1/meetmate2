import { Component, OnInit, Input, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AlldataService } from '../alldata.service';
import { AdminComponent } from '../admin/admin.component';


//import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';
import { CommonService } from '../common.service';
import { from } from 'rxjs'
import { stringify } from 'querystring';

@Component({
  selector: 'app-viewprofile',
  templateUrl: './viewprofile.component.html',
  styleUrls: ['./viewprofile.component.css']
})
export class ViewprofileComponent implements OnInit {
  par;
  user;
  products;
  followid;
  userdata;
  last = 0;
  thisuserFol;
  followerPopup = 'd-none';
  followingPopup = 'd-none';
  followersList: any;
  followingList: any;
  allPost;
  love = 0;
  mach1 = '';
  constructor(private sst: Router, private http: HttpClient, private comm: CommonService, private route: ActivatedRoute, private alld: AlldataService, private admin: AdminComponent) { }

  ngOnInit(): void {

    this.route.queryParamMap.subscribe(param => {
      this.par = '';
      this.user = '';
      this.products = '';
      this.followid = '';
      this.userdata = '';
      this.last = 0;
      this.thisuserFol = '';
      this.followerPopup = 'd-none';
      this.followingPopup = 'd-none';
      this.followersList = '';
      this.followingList = '';
      this.allPost = "";
      this.love = 0;
      this.par = { ...param.keys, ...param };
      this.par = this.par["params"];
      this.mach1 = '';
      //this.admin.test();

      this.comm.product_by_userID(this.par["userid"]).subscribe(resp => {
        var len = <any[]>resp;
        
        for (let index = 0; index < len.length; index++) {
          var tamp = "http://localhost/reachbisiness/pics/";
          for (let inloop = 0; inloop < resp[index].product_pic.length; inloop++) {

            if (resp[index].product_pic[inloop] != ',') {
              tamp += resp[index].product_pic[inloop];
            }
            else {
              break;
            }
          }
          resp[index].product_pic = tamp;
        }


        this.products = <any[]>resp;

      })
      
      this.comm.follow_list(this.par["userid"]).subscribe(resp => {
        this.thisuserFol = resp;
        this.thisuserFol.following.forEach(element => {
          /* alert('http://localhost/reachbisiness/user_by_id.php?userID='+element) */
          this.comm.user_by_id(element).subscribe(resp => {

            if (!this.followingList) {
              this.followingList = []; // Initialize the followersList if it's undefined
            }
            this.followingList.push(resp[0])
            console.log('22222>>>', this.followingList);

          })
        });
        this.thisuserFol.followers.forEach(element => {
          this.comm.user_by_id(element).subscribe(resp => {
            if (!this.followersList) {
              this.followersList = []; // Initialize the followersList if it's undefined
            }
            this.followersList.push(resp[0])
            console.log('XXXX>>>', this.followersList);

          })
        });
        
      })
      this.comm.getAllPostById(this.par["userid"]).subscribe(resp => {
        this.allPost = resp;
      })
      this.user = this.comm.user_by_id(this.par["userid"]).subscribe(resp => {
        this.user = resp;

        this.followid = this.alld.get_follow_list();

        this.user[0].follow = 0;
        var r = this.alld.userdataget();

        for (var i = 0; i < this.followid.following.length; i++) {
          if (this.user[0].userID == this.followid.following[i]) {
            this.last = i;
            this.user[0].follow = 1;
            break;
          }
        }
        this.userdata = this.alld.userdataget();
        this.mach();
        this.comm.getUserLike(this.par["userid"], this.userdata[0].userID).subscribe(resp => {
          if (resp == 'liked') {
            this.love = 1;
          }
        })

      })
    });
  }
  userLike() {
    const response = confirm("Are you sure you want to do that?\n you can't undo this step.");

    if (response) {
      this.comm.userLike(this.par["userid"], this.userdata[0].userID).subscribe(resp => {
        this.love = 1;
      })
    }

  }
  mach() {
    this.comm.mach(this.par["userid"], this.userdata[0].userID).subscribe(resp => {
    
      this.mach1 = resp.toString();
      /* alert(this.mach1) */
    })
  }
  popup1() {
    if (this.followerPopup != 'd-none') {
      this.followerPopup = 'd-none';

    }
    else {
      this.followerPopup = 'show';
    }
  }
  popup2() {
    if (this.followingPopup != 'd-none') {
      this.followingPopup = 'd-none';

    }
    else {
      this.followingPopup = 'show';
    }
  }
  follow() {
    this.comm.follow(this.par["userid"], this.userdata[0].userID).subscribe(resp => {
      this.followid.following.push(this.par["userid"]);
      this.user[0].follow = 1;
      this.last = this.followid.following.length - 1;
    })
  }
  unfollow() {
    this.comm.unfollow(this.par["userid"], this.userdata[0].userID).subscribe(resp => {
      this.user[0].follow = 0;
      delete this.followid.following[this.last];
      /* for (var i = 0; i < this.followid.length; i++) 
        {
          if(this.par["userid"]== this.followid[i])
          {
            delete this.followid[i];
            break;
          }
        } */
    })
  }


}
