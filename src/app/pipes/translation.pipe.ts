import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from '../services/translation.service';

@Pipe({
  name: 'translation',
  standalone: true
})
export class TranslationPipe implements PipeTransform {

  constructor(private translation: TranslationService) {}

  transform(key: string): string {
    return this.translation.translate(key);
  }
}
