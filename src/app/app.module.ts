import { environment } from '../environments/environment';
import { LoginModule } from './log-in/log-in.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './general/navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { RegistryModule } from './registry/registry.module';
import { RegistryService } from './registry/services/registry.service';
import { HttpClientModule } from '@angular/common/http';
import { StickerModule } from './stickers/sticker.module';
import { UserService } from './share/services/user-services/user.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { HomePageModule } from './home/home-page.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AngularFireAuth } from 'angularfire2/auth';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    HomePageModule,
    MatToolbarModule,
    LoginModule,
    StickerModule,
    BrowserAnimationsModule,
    RegistryModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    MatSnackBarModule
  ],
  providers: [RegistryService, UserService, AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
