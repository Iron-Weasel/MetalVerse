import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
import { RegistrationSucessComponent } from './components/register/registration-success.component';
import { CreateAnnouncementsComponent } from './components/announcements/create-announcement.component';
import { PostCommentsComponent } from './components/post-comments/post-comments.component';

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
    PostCommentsComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, RouterModule.forRoot([
      { path: 'login', component: LoginComponent},
      { path: 'register', component: RegisterComponent},
      { path: 'register-success', component: RegistrationSucessComponent},
      { path: 'forum', component: ForumComponent},
      { path: 'forum/:id', component: PostCommentsComponent},
      { path: 'announcements', component: AnnouncementsComponent},
      { path: 'create-announcement', component: CreateAnnouncementsComponent},
      { path: 'events', component: FutureEventsComponent},
      { path: 'stream', component: RockStreamsComponent},
      { path: 'inbox', component: InboxComponent},
      { path: '', redirectTo: 'login', pathMatch: 'full'}
  ])
  ],
  providers: [BackendHttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
