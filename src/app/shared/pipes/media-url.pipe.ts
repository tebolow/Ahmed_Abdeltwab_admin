import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environments/environment';

@Pipe({
  name: 'mediaUrl',
  standalone: true
})
export class MediaUrlPipe implements PipeTransform {
  transform(value: string | null | undefined): string {
    if (!value) return '';
    if (/^(https?:)?\/\//i.test(value) || value.startsWith('blob:') || value.startsWith('data:')) {
      return value;
    }
    return environment.staticURL + value;
  }
}

