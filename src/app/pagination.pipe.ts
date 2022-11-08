import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'pagination'})
export class PaginationPipe implements PipeTransform {

  transform(items: any[], itemsPerPage: number, page: number): any {

    return [ ...items.slice( itemsPerPage*(page) , itemsPerPage*(page+1)  )]
  }
}
