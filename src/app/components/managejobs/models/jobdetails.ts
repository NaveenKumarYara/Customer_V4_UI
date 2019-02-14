import { Jobs } from './jobs';

export class JobDetails {
  public TotalCount: string; /*// no field for applied count*/
  public TotalPages: string;
  public Jobs: Jobs[];
  public CustomerId:string;
  public UserId:string;
  public JobId:string;
  public EmployementDetail: string;
  public SaveAsTemplate: string;
  public ReferralCount: string;
  public StatusId: string;
  public RemoteWorkType: string;
  public Travel: string;
  public TravelPercentage: string;
  public TotalViewCount: string;
  public NumberOfLikes: string;
  public NumberOfDislikes: string;
  public SuggestedDate: string;
  public Datewisecount: string; /*// for now considered under suggested count .. need to check with Anil*/
  public IsLiked: string;
  public FirstName: string;
  public LastName: string;
  public ProfilePic: string;
  public Comments: string;
  public InterviewDate: string;
  public StartTime: string;
  public NumberOfVacancies: string;
  public IsCandidateAccepted: string;
  public IsCPNewDate: string;
  public IsCustomerAccepted: string;
  public ReferralCode: string;
  public ReferByList: string[];
  public ShortListedCount: string;
  public InterviewedCount: string;
  public JobStatusId: string;
  public MiddleName: string;

}
