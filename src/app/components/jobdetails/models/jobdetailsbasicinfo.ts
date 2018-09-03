import { JobLocations} from "./joblocations";
export class JobdetailsBasicInfo {  
  public JobInfoId: string;
  public CustomerId: string;
  public UserId: string;
  public JobId: string;
  public JobTitle: string;
  public JobStatus: string;
  public PostedOn: string;                
  public NumberOfVacancies: string;
  public TotalViewCount: string;
  public DislikesCount: string;
  public LikesCount: string;
  public JobLocations: JobLocations;
}
