import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { MyApp } from './app.component';

import { PageWelcome } from '../pages/welcome/welcome';
import { PageMap } from '../pages/map/map';
import { PageMapView } from '../pages/map-view/map-view';
import { PageInfo } from '../pages/info/info';

import { PositionService } from '../providers/position';
import { MarkersService } from '../providers/markers';

@NgModule({
  declarations: [
    MyApp,
    PageWelcome,
    PageMap,
    PageMapView,
    PageInfo,
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PageWelcome,
    PageMap,
    PageMapView,
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
