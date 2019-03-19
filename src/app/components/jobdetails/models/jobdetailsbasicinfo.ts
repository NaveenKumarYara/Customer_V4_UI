import { JobLocations} from './joblocations';
export class JobdetailsBasicInfo {
  public JobInfoId: string;
  public CustomerId: string;
  public UserId: string;
  public JobId: string;
  public ClientName : string;
  public Departments : string;
  public JobTitle: string;
  public JobStatus: string;
  public PostedOn: string;
  public IsActive: boolean;
  public NumberOfVacancies: string;
  public TotalViewCount: string;
  public DislikesCount: string;
  public LikesCount: string;
  public IsOpen: number;
  public JobLocations: JobLocations;
}
