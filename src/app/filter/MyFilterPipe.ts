import { Pipe, PipeTransform } from '@angular/core';
import { Jobskills } from '../../models/jobskills.model';

@Pipe({
    name: 'myfilter',
    pure: false
})
export class MyFilterPipe implements PipeTransform {
  transform(items: any[], filter: Jobskills): any {
        if (!items || !filter) {
            return items;
    }
    return items.filter(item => item.name.indexOf(filter.SkillType) !== -1);
    }
}
