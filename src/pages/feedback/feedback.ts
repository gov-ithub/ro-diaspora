import { Component, ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { Storage } from '@ionic/storage';

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

  answerOptions = {
    da: 1,
    nu: 2,
  };

  slides = [];
  
  private allSlides = [
    {content: 'Ai găsit ușor secția de vot selectată?', id: 1, buttons: DefaultButtons},
    {content: 'Secția de vot era poziționată corect pe hartă?', id: 2, buttons: DefaultButtons},
    {content: 'Era aglomerat sau nu la secția de vot?', id: 3, buttons: DefaultButtons},
  ];
  
  constructor(
    private storage: Storage
  ) {}

  ionViewDidLoad() {
    this.storage.keys().then(data => {
      let length = this.allSlides.length;
      for (let i = 0; i < length; i++) {
        let slide = this.allSlides[i];
        if (data.indexOf(this.getQuestionKey(slide.id)) == -1) {
          this.slides.push(slide);
        }
      }
    });
  }

  private getQuestionKey(id: number) {
    return 'feedback-' + id;
  }

  nextSlide() {
    this.slider.slideNext();
  }

  answerQuestion(id: number, answer: number) {
    this.nextSlide();
    this.storage.set(
      this.getQuestionKey(id),
      answer
    );    
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
