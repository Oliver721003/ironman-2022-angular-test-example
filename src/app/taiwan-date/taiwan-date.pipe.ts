import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'taiwanDate',
})
export class TaiwanDatePipe implements PipeTransform {
  transform(date: string | Date): string {
    const d = typeof date === 'string' ? new Date(date) : date;
    const year = d.getFullYear() - 1911;
    return `民國 ${year} 年 ${d.getMonth() + 1} 月 ${d.getDate()} 日`;
  }
}
