import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { MyApp } from './app.component';

import { PageMap } from '../pages/map/map';
import { ModalMap } from '../pages/map/modal';
import { PageNews } from '../pages/news/news';

import { PositionService } from '../providers/position';
import { NewsService } from '../providers/news';
import { MarkersService } from '../providers/markers';

@NgModule({
  declarations: [
    MyApp,
    PageMap,
    ModalMap,
    PageNews
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PageMap,
    ModalMap,
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
