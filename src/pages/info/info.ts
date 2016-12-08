import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { PageFAQ } from '../faq/faq';

@Component({
  selector: 'page-info',
  templateUrl: 'info.html'
})
export class PageInfo {
  FAQPage = PageFAQ;

  constructor(public navCtrl: NavController) {}
}
