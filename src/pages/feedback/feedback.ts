import { Component, ViewChild } from '@angular/core';
import { Slides, Platform } from 'ionic-angular';
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
    {
      content: 'Ai găsit ușor secția de vot selectată?', 
      id: 1, 
      buttons: DefaultButtons,
      status: { active: true },
    },
    {
      content: 'Secția de vot era poziționată corect pe hartă?', 
      id: 2, 
      buttons: DefaultButtons,
      status: { active: true },
    },
    {
      content: 'Era aglomerat sau nu la secția de vot?', 
      id: 3,
      buttons: DefaultButtons,
      status: { active: true },
    },
  ];
  
  private unregisterBackButtonOverride; 

  constructor(
    private storage: Storage,
    private platform: Platform,
  ) {}

  ionViewDidLoad() {
    this.storage.keys().then(data => {
      let length = this.allSlides.length;
      for (let i = 0; i < length; i++) {
        let slide = this.allSlides[i];
        if (data.indexOf(this.getQuestionKey(slide.id)) == -1) {
          this.slides.push(slide);
        } else {
          this.storage.get(this.getQuestionKey(slide.id)).then((val) => {
            this.slides.push({
              content: slide.content,
              id: slide.id,
              status: { active: false, answer: val === 1 ? 'NU' : 'DA' },
            });
          });
        }
      }
    });
  }

  private getQuestionKey(id: number) {
    return 'feedback-' + id;
  }

  private registerBackButtonOverride() {
    this.unregisterBackButtonOverride = this.platform.registerBackButtonAction(
      () => { this.slider.slidePrev(); },
      101,
    );   
  }

  nextSlide() {
    this.slider.slideNext();
  }

  onSlideChanged() {
    if (this.slider.isBeginning()) {
      this.unregisterBackButtonOverride();
      this.unregisterBackButtonOverride = null;
    } else {
      if (!this.unregisterBackButtonOverride) {
        this.registerBackButtonOverride();
      }
    }
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
      "Unde votezi dacă ești român și locuiești în străinătate? Găsește cea mai apropiată secție de vot cu ROdiaspora - aplicația românului de pretutindeni!",
      "http://ithub.gov.ro/wp-content/uploads/2016/12/8a4314ac88ce12b296a747f869b651b7-1.jpg", 
      "http://ithub.gov.ro/2016/12/11/rodiaspora/", 
    ).then(() => { 
      console.log('success');
    }, () => {
      console.log('fail');
    });
  }

  facebookShare() {
    SocialSharing.shareViaFacebook(
      "Unde votezi dacă ești român și locuiești în străinătate? Găsește cea mai apropiată secție de vot cu ROdiaspora - aplicația românului de pretutindeni!",
      null,
      "http://ithub.gov.ro/2016/12/09/rodiaspora/", 
    ).then(() => { 
      console.log('success');
    }, () => {
      console.log('fail');
    });
  }

  twitterShare() {
    SocialSharing.shareViaTwitter(
      "Unde votezi dacă ești român și locuiești în străinătate? Găsește cea mai apropiată secție de vot cu ROdiaspora - aplicația românului de pretutindeni!",
      "http://ithub.gov.ro/wp-content/uploads/2016/12/8a4314ac88ce12b296a747f869b651b7    -1.jpg", 
      "http://ithub.gov.ro/2016/12/11/rodiaspora/", 
    ).then(() => { 
      console.log('success');
    }, () => {
      console.log('fail');
    });
  }
}
