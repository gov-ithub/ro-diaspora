import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';

import { PageMap } from '../pages/map/map';
import { PageMapView } from '../pages/map-view/map-view';
import { PageNews } from '../pages/news/news';

import { PositionService } from '../providers/position';
import { NewsService } from '../providers/news';
import { MarkersService } from '../providers/markers';

@NgModule({
  declarations: [
    MyApp,
    PageMap,
    PageMapView,
    PageNews
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PageMap,
    PageMapView,
    PageNews
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    },
    PositionService,
    NewsService,
    MarkersService
  ]
})
export class AppModule {}
