import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'removeduplicates'
})
export class RemovePipe implements PipeTransform{
   transform(value: any): any{
       let unique = {};
       value.forEach(function(i) {
         if(!unique[i]) {
           unique[i] = true;
         }
       });
       return Object.keys(unique);
    }
}