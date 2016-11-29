import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { PageMap } from '../pages/map/map';
import { PageNews } from '../pages/news/news';

import { NewsService } from '../providers/news';

@NgModule({
  declarations: [
    MyApp,
    PageMap,
    PageNews
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PageMap,
    PageNews
  ],
  providers: [
    NewsService
  ]
})
export class AppModule {}
