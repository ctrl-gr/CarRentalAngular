import { Pipe, PipeTransform } from "@angular/core";
import { orderBy } from 'lodash';



@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(array: any, key: string, orderType: any): any[] {
    if (orderType != 'asc') {
      orderType = 'desc'
    } else {
      orderType = 'asc'
    }

    return orderBy(array, [key], [orderType]);
  }
}
