import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule }    from '@angular/http';
import { TabsPage } from '../pages/tabs/tabs';
import { WalksService } from '../providers/walks.service'; 
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { WalkPage } from '../pages/walk/walk';
import { WalkMap } from '../pages/walk/walk-map.component';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage, 
    WalkPage,
    WalkMap
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule,

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage, 
    WalkPage,
    WalkMap
  ],
  providers: [
    StatusBar,
    SplashScreen,
    WalksService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
   
  ]
})
export class AppModule {}
