import { Profile} from './profile';

export class JobdetailsProfile {
  public TotalProfileCount: number;
  public TotalPages: number;
  public Profile: Profile[];
}

export class MatchingParameterDetails{
  public Role : number;
  public  TotalExp: number;
  public  Domain: number;
  public   Experience: number;
  public  Rating: number;
  public  Skillfit_Total: number;
  public  Jobfit_Total: number;
}