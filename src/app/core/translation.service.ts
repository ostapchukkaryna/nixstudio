import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TranslocoService } from '@jsverse/transloco';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  availableLangs = ['en', 'pl', 'ua'];
  defaultLang = 'pl';
  private isBrowser: boolean;

  constructor(
    private translocoService: TranslocoService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.initLanguage();
  }

  initLanguage() {
    this.translocoService.setAvailableLangs(this.availableLangs);
    this.translocoService.setDefaultLang(this.defaultLang);

    if (this.isBrowser) {
      const browserLang = navigator.language.split('-')[0];
      this.translocoService.setActiveLang(
        browserLang && this.availableLangs.includes(browserLang) ? browserLang : this.defaultLang
      );
    } else {
      // On server, use default language
      this.translocoService.setActiveLang(this.defaultLang);
    }
  }

  setLanguage(lang: string) {
    if (this.availableLangs.includes(lang)) {
      this.translocoService.setActiveLang(lang);
    }
  }

  getCurrentLanguage(): string {
    return this.translocoService.getActiveLang() || this.defaultLang;
  }
}
