import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { MyApp } from './app.component';

import { PageMap } from '../pages/map/map';
import { PageMapView } from '../pages/map-view/map-view';
import { PageFAQ } from '../pages/faq/faq';
import { PageFeedback } from '../pages/feedback/feedback';
import { PageInfo } from '../pages/info/info';

import { PositionService } from '../providers/position';
import { MarkersService } from '../providers/markers';

import { LinkyModule } from 'angular2-linky';

@NgModule({
  declarations: [
    MyApp,
    PageMap,
    PageMapView,
    PageFAQ,
    PageFeedback,
    PageInfo,
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    LinkyModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PageMap,
    PageMapView,
    PageFAQ,
    PageFeedback,
    PageInfo,
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    },
    PositionService,
    MarkersService,
    Storage
  ]
})
export class AppModule {}
