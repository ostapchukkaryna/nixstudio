import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Translation, TranslocoLoader } from "@jsverse/transloco";

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  getTranslation(lang: string) {
    // Use HTTP for both browser and server environments
    // Angular's SSR will handle the HTTP request appropriately
    return this.http.get<Translation>(`./assets/i18n/${lang}.json`);
  }
}

