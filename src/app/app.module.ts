import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { PageMap } from '../pages/map/map';
import { PageNews } from '../pages/news/news';
import { PageDetail } from '../pages/detail/detail';

import { NewsService } from '../providers/news';
import { MarkersService } from '../providers/markers';

@NgModule({
  declarations: [
    MyApp,
    PageMap,
    PageNews,
    PageDetail,
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PageMap,
    PageNews,
    PageDetail,
  ],
  providers: [
    NewsService,
    MarkersService
  ]
})
export class AppModule {}
