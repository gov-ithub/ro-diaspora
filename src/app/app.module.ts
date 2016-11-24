import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { PageHomepage } from '../pages/homepage/homepage';
import { PageNews } from '../pages/news/news';

import { AgmCoreModule } from 'angular2-google-maps/core';
import { GeoLocationService } from '../providers/geo-location';
import { NewsService } from '../providers/news';

@NgModule({
  declarations: [
    MyApp,
    PageHomepage,
    PageNews
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({apiKey: 'AIzaSyBbFOmMJagRxPAR-TiLbsep1uqtXl9xl0s'})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PageHomepage,
    PageNews
  ],
  providers: [
    GeoLocationService,
    NewsService
  ]
})
export class AppModule {}
