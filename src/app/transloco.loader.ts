import { HttpClient } from '@angular/common/http';
import {
  Translation,
  TRANSLOCO_LOADER,
  TranslocoLoader,
  TranslocoConfig,
  TRANSLOCO_CONFIG,
} from '@ngneat/transloco';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  constructor(private http: HttpClient) {}

  getTranslation = (langPath: string) =>
    this.http.get<Translation>(`/assets/i18n/${langPath}.json`);
}

export const translocoConfig = {
  provide: TRANSLOCO_CONFIG,
  useClass: TranslocoHttpLoader,
  useValue: {
    listenToLangChange: true,
    availableLangs: ['fr', 'en'],
    fallbackLang: 'en',
    defaultLang: 'fr',
    reRenderOnLangChange: true,
    prodMode: environment.production,
  } as TranslocoConfig,
};

export const translocoLoader = {
  provide: TRANSLOCO_LOADER,
  useClass: TranslocoHttpLoader,
};
