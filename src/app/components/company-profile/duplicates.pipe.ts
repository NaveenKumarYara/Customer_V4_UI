import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash'; 
@Pipe({
    name: 'duplicates'
})
export class duplicatePipe implements PipeTransform{
   transform(value: any): any{
        if(value!== undefined && value!== null){
            return _.uniqBy(value, 'name');
        }
        return value;
    }
}