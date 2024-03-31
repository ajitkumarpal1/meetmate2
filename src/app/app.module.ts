import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';

/* import { NotefoundComponent } from './notefound/notefound.component'; */
import { CommonService } from './common.service';

import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { UploadproductComponent } from './uploadproduct/uploadproduct.component';
import { SearchComponent } from './search/search.component';
import { ViewprofileComponent } from './viewprofile/viewprofile.component';
import { ProductComponent } from './product/product.component';
import { ChatComponent } from './chat/chat.component';
import { CreatgroupComponent } from './creatgroup/creatgroup.component';
import { PerchatComponent } from './perchat/perchat.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { PostComponent } from './post/post.component';
import { MatTabsModule } from '@angular/material/tabs';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MatRadioModule } from '@angular/material/radio';
import { ViewPostComponent } from './view-post/view-post.component';
//import {AgmMap,AgmCoreModule,MapsAPILoader  } from '@agm/core';

const app: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'Uploadproduct', component: UploadproductComponent },
      { path: 'search', component: SearchComponent },
      { path: 'viewprofile', component: ViewprofileComponent },
      { path: 'product', component: ProductComponent },
      { path: 'chat', component: ChatComponent },
      { path: 'creatgroup', component: CreatgroupComponent },
      { path: 'personal_message', component: PerchatComponent },
      { path: 'post', component: PostComponent },
      { path: 'viewpost', component: ViewPostComponent },
    ],
  },

  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: '**', component: HomeComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    ProfileComponent,
    UploadproductComponent,
    SearchComponent,
    ViewprofileComponent,
    ProductComponent,
    ChatComponent,
    CreatgroupComponent,
    PerchatComponent,
    PostComponent,
    ViewPostComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(app),
    FlexLayoutModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    MatCardModule,
    MatListModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    MatBadgeModule,
    MatChipsModule,
    CommonModule,
    MatTabsModule,
    AngularEditorModule,
    MatRadioModule,
    /* AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAI3ae3yzl_SsVQD3KPTU4dMKfhO4eL4ww'
    }) */
  ],
  providers: [CommonService],
  bootstrap: [AppComponent],
})
export class AppModule {}
