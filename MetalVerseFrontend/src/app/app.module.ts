import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { JwtModule } from "@auth0/angular-jwt";

import { AppComponent } from './app.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ForumComponent } from './components/forum/forum.component';
import { AnnouncementsComponent } from './components/announcements/announcements.component';
import { RockStreamsComponent } from './components/rock-streams/rock-streams.component';
import { FutureEventsComponent } from './components/future-events/future-events.component';
import { InboxComponent } from './components/inbox/inbox.component';
import { BackendHttpService } from './services/backend.service';
import { RouterModule } from '@angular/router';
import { RegistrationSucessComponent } from './components/register/register-success/registration-success.component';
import { CreateAnnouncementsComponent } from './components/announcements/create-announcement/create-announcement.component';
import { PostCommentsComponent } from './components/forum/post-comments/post-comments.component';
import { ViewAnnouncementComponent } from './components/announcements/view-announcement/view-announcement.component';
import { CreatePostComponent } from './components/forum/create-post/create-post.component';
import { ViewEventComponent } from './components/future-events/view-event/view-event.component';
import { CreateEventComponent } from './components/future-events/create-event/create-event.component';
import { AuthGuard } from './guard/auth.guard';


export function tokenGetter() { 
  return localStorage.getItem("jwt"); 
}


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    RegistrationSucessComponent,
    LoginComponent,
    ForumComponent,
    AnnouncementsComponent,
    CreateAnnouncementsComponent,
    RockStreamsComponent,
    FutureEventsComponent,
    InboxComponent,
    PostCommentsComponent,
    ViewAnnouncementComponent,
    CreatePostComponent,
    ViewEventComponent,
    CreateEventComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["https://metalverseapidemo.azurewebsites.net"],
        disallowedRoutes: []
      }
    }),
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent},
      { path: 'register', component: RegisterComponent},
      { path: 'register-success', component: RegistrationSucessComponent},
      { path: 'forum', component: ForumComponent, canActivate: [AuthGuard]},
      { path: 'forum/:id', component: PostCommentsComponent, canActivate: [AuthGuard]},
      { path: 'create-post', component: CreatePostComponent, canActivate: [AuthGuard]},
      { path: 'announcements', component: AnnouncementsComponent, canActivate: [AuthGuard]},
      { path: 'announcements/:id', component: ViewAnnouncementComponent, canActivate: [AuthGuard]},
      { path: 'create-announcement', component: CreateAnnouncementsComponent, canActivate: [AuthGuard]},
      { path: 'events', component: FutureEventsComponent, canActivate: [AuthGuard]},
      { path: 'events/:id', component: ViewEventComponent, canActivate: [AuthGuard]},
      { path: 'create-event', component: CreateEventComponent, canActivate: [AuthGuard]},
      { path: 'stream', component: RockStreamsComponent, canActivate: [AuthGuard]},
      { path: 'inbox', component: InboxComponent, canActivate: [AuthGuard]},
      { path: '', redirectTo: 'login', pathMatch: 'full'}
  ])
  ],
  providers: [BackendHttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
