import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageCommunicationService {
  acceptedLanguages = ['en', 'fr', 'nl'];
  selectedLanguage: string;

  constructor(public translate: TranslateService) { }

  init() {
    this.translate.addLangs(this.acceptedLanguages);

    if (!localStorage.getItem('language')) {
      this.changeLanguage(window.navigator.language.slice(0, 2));
    } else {
      this.changeLanguage(localStorage.getItem('language'));
    }

    this.translate.setDefaultLang('en');
  }

  changeLanguage(language: string) {
    if (this.acceptedLanguages.findIndex(x => x === language) === -1) {
      language = 'en';
    }
    localStorage.setItem('language', language);
    this.translate.use(localStorage.getItem('language'));
    this.selectedLanguage = localStorage.getItem('language');
  }
}