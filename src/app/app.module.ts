import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { PageHomepage } from '../pages/homepage/homepage';
import { PageNews } from '../pages/news/news';

import { NewsService } from '../providers/news'

@NgModule({
  declarations: [
    MyApp,
    PageHomepage,
    PageNews
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PageHomepage,
    PageNews
  ],
  providers: [
    NewsService
  ]
})
export class AppModule {}
