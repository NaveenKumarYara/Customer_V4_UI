export class GetInterviewSortList
{
    public TotalCount: string;
    public Jobs: Jobs[];
}

export  class Jobs
{
    public JobTitle :string;
    public JobLocations :string;
    public InterviewDate :Date;
    public InterviewType :string;
    public StartTime :string;
    public CandidateProfilePic : string;
    public CandidateFirstName:string;
    public CandidateLastName:string;
    public HiringLeaderFirstName:string;
    public HiringLeaderLastName:string;     
    public  PhoneNumber :string;      
    public  SkypeId :string;
    public TravelExpence : boolean;
    public  AccessId :string;        
    public IsCandidateAccepted : boolean;
    public InterviewTypeId :number;
      
}