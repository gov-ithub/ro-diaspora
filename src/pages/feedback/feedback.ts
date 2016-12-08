import { Component, ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';

import { SocialSharing } from 'ionic-native';

const DefaultButtons = [
  {
    label: "NU",
    value: 1,
    color: "dark",
  },
  { 
   label: "DA",
   value: 2,
   color: "light", 
  },
];

@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html'
})
export class PageFeedback {
  @ViewChild('slider') slider: Slides;
  sliderOptions = {
    pager: true,
    speed: 500
  };
  
  slides = [
    {content: 'Ai găsit ușor secția de vot selectată?', id: 1, buttons: DefaultButtons},
    {content: 'Secția de vot era poziționată corect pe hartă?', id: 2, buttons: DefaultButtons},
    {content: 'Era aglomerat sau nu la secția de vot?', id: 3, buttons: DefaultButtons},
  ];

  answerOptions = {
    da: 1,
    nu: 2,
  };
  
  constructor(
  ) {}

  nextSlide() {
    this.slider.slideNext();
  }

  answerQuestion(id: number, answer: number) {
    this.nextSlide();
    
  }

  whatsappShare() {
    SocialSharing.shareViaWhatsApp(
      "Mesaj pe WhatsApp",
      null, // image
      "http://ithub.gov.ro", // url
    ).then(() => { 
      console.log('success');
    }, () => {
      console.log('fail');
    });
  }

  facebookShare() {
    SocialSharing.shareViaFacebook(
      "Mesaj pe Facebook",
      null, // image
      "http://ithub.gov.ro", // url
    ).then(() => { 
      console.log('success');
    }, () => {
      console.log('fail');
    });
  }

  twitterShare() {
    SocialSharing.shareViaTwitter(
      "Mesaj pe Twitter",
      null, // image
      "http://ithub.gov.ro", // url
    ).then(() => { 
      console.log('success');
    }, () => {
      console.log('fail');
    });
  }
}
