import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  private STORAGE_LANG_KEY = 'lang';
  private curLang: Language;

  constructor() {
    const lang = (localStorage.getItem(this.STORAGE_LANG_KEY));
    this.curLang = (lang && lang !== "null") ? (lang as Language) : Language.ITALIAN;
  }

  translate(key: string): string {
    try {
      const value: string = TRANSLATIONS[key][this.curLang];
      return value ?? key;
    } catch (error) {
      return key;
    }
  }

  changeLanguage(lang: Language): boolean {
    if(this.isCurrentLanguage(lang)) return false;
    this.curLang = lang;
    localStorage.setItem(this.STORAGE_LANG_KEY, lang);
    return true;
  }

  changeLanguageFromString(value: string): boolean {
    let lang = Language.ENGLISH;
    switch (value) {
      case 'en':
        lang = Language.ENGLISH
        break;
      case 'it':
        lang = Language.ITALIAN;
        break;
      default:
        lang = Language.ITALIAN;
        break;
    }
    return this.changeLanguage(lang);
  }

  isCurrentLanguage(lang: Language) {
    return this.curLang === lang;
  }

  getCurrentLanguage() { return this.curLang; }
}

export enum Language {
  ENGLISH = 'en',
  ITALIAN = 'it',
}

const TRANSLATIONS: any = {
  'loading': {
    'en': 'LOADING',
    'it': 'CARICAMENTO',
  },
  'AGRICULTURAL_PRODUCTS': {
    'en': 'Agricultural Products',
    'it': 'Prodotti Agricoli',
  },
  'PROCESSED_PRODUCTS': {
    'en': 'Processed Products',
    'it': 'Prodotti Processati',
  },
  'NON_FOOD_PRODUCTS': {
    'en': 'Non Food Products',
    'it': 'Prodotti Non Alimentari',
  },
}
