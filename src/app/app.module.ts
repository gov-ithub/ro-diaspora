import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { PageHomepage } from '../pages/homepage/homepage';
import { Page2 } from '../pages/page2/page2';

@NgModule({
  declarations: [
    MyApp,
    PageHomepage,
    Page2
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PageHomepage,
    Page2
  ],
  providers: []
})
export class AppModule {}
