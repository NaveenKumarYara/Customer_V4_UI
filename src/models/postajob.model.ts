import { Jobskills } from './jobskills.model';
import { Qualifications } from './qualifications.model';
export class Postajob {

  public Jobskills: Jobskills[];
  public Responsibilities: string[];
  public Qualification: Qualifications;

  ishavingdoaminexperience: string;
  domainexpertisewith: string[];
  typeofperson: string;
  jobtitle: string;
}
