export class InsertJob {
    public JobId: number;
    public JobPositionId: string;
    public UserId: number;
    public CustomerId: number;
    public JobCategoryId: number;
    public JobTitle: string;
    public MinExperienceId: number;
    public MaxExperienceId: number;
    public CompleteDescription: boolean;
    public JobDescription: string;
    public TemplateSaveTitle:string;
    public XmlSkills: PjSkill[] = [];
    public XmlRoleId: PjRole[] = [];
    public NumberOfVacancies: number;
    public PreferredLocationId: string;
    public XmlQualifications: PjEducationDetails[] = [];
    public XmlDomains: PjDomain[] = [];
    public XmlPersonType: PjDisc[] = [];
    public EmploymentTypeId: number;
    public ContractDuration: string;
    public ContractExtended: boolean;
    public WorkAuthorizationId: number;
    public WorkAuthorizationType: string;
   // public PossibilityOfFullTime: boolean;
     public AfterWhatDuration: string;
    public SalaryTypeId: number;
    public MinimumSalary: string;
    public MaximumSalary: string;
    public HideSalary: boolean;
    public BonusOffered: boolean;
    public HiringProcessId: number;
    public HiringManagerId: number;
    public XmlTechnicalTeam: PjTechnicalTeam[] = [];
    public IsPrivate: boolean;
    public XmlAccessToUsers: PjJobAccessTo[] = [];
    public ExpiryDate: Date;
    public SaveAsTemplate: any;
    public StepNumber: number;
    public IsDrafted: boolean;
    public ClientName: string;
    public ClientId: number;
    public XmlDepartment: PjDepartments[] = [];
    public Draft: boolean;
    public RemoteWorkId: boolean;
    public Email: string;
    public JobPriority:number;
    public JobDue:number;
    public Industry : string;
    public  PositionType : string;
    public  Category: string;
    public  TitleInfo : string;
    public XmlKeyResponses :KeyRole[]=[];
    public MatchingCrieterias : SkillPostData[]=[];
  }
  export class PjSkill {
    public SkillName: string;
    public SkillType: boolean;
    public MinimumExp: number;
    public MaximumExp: number;
  }
// roles
  export class RoleJobTitle {
    JobTitle: string;
    Role: string;

  }
//skills
  export class SkillPostData {
    ParameerId: number;
    Percentage: number;
}

  // For GetRoles
  export class Roles {
    public RoleId: number;
    public Role: string;
    }

    export class RolesSave {
      UserId:number;
      JobId:number;
      ResponsebilityId:string;
      }
    // For edit Roles
    export class EditRoles {
      public RoleId: number;
      public RolesAndResponsibilities: string;
      }
  export class RoleModel {

    constructor(
        public RoleId: number,
        public RolesAndResponsibilities: string,
        public JobTitle: string
    ) { }
  }
  //
  export class PjRole {
    public RoleId: number;
  }
  export class PjDisc {
    public DiscTestId: number;
  }
export class DiscResult {
  public DISCTestId: number;
  public PersonType: string;
  public SubType: string;
  public Description: string;
  public checked: boolean;
}
  //
  export class Salary {
    constructor(
    public SalaryTypeId: number,
    public SalaryType: string) {}
    }
  export class GetDomain {
     public DomainId: number;
     public DomainName: string;
     public MinimumExperience: number;
     public MaximumExperience: number;
  }
  export class GetKeyRole
  {
    public DCode: string;
    public CustomerKeyResponsebility: number;
    public CustomerKeyMinExperienceId: number;
    public CustomerKeyMaxExperienceId: number;
  }
  export class PjDomain {
    public ExperienceRequired: boolean;
    public DomainId: number;
    public MinimumExperience: number;
    public MaximumExperience: number;
    public Description: string;
  }

  export class KeyRole {
    public CustomerKeyResponsebility: number;
    public CustomerKeyMinExperienceId: number;
    public CustomerKeyMaxExperienceId: number;
  }
  export class PjEducationDetails {
    public QualificationId: number;
    public IsActive: boolean;

  }
  export class PrefLocation {
    // public PreferredLocationId: number;
    constructor(
    public CityId: number= 0,
    public location: string= null
    ) {}
    }
    export class Cities {
      public CityId: number;
      public CityName: string;
      }

      export class MCities {
        public CityId: number;
        public CityName: string;
        }
  // related

  export class CustomerUsers {
      public  UserId: number;
      public FirstName: string;
      public Email:string;
  }
  export class ClientModel {
    public  ClientId: number;
    public ClientName: string;
} export class AutoSearchClient {
    public CustomerId: number;
    public  ClientName: string;
    public IsSuggested: boolean;
} export class AutoSearchDepartment {
  public CustomerId: number;
  public  DepartmentName: string;
  public IsSuggested: boolean;
}export class DepartmentModel {
    public DepartmentId: number;
    public CustomerDepartment: string;
     public DepartmentName: string;
}
export class GetDepartmentModel {
    public DepartmentId: number;
    public DepartmentName: string;
}
export class PjDepartments {
  public DepartmentId: number;
}
  //
  export class PjTechnicalTeam {
    public UserId: number;
  }

  export class PjJobAccessTo {
    public UserId: number;
    public CustomerId: number;
  }
  export class CategoryList {
    public JobCategoryId: number;
    public Category: string;
  }

  export class CategoryNewList
  {
    public Category: string;
  }

  export class MultipleJobIds
  {
    JobId:number;
  }

  export class JobReporting
  {
    
      UserId:number;
      CustomerId:number;
      JobId:number;
      HiringManager:string;
      
  }

  export class JobImmigrationSave
  {
   
    UserId:number;
    JobId:number;
    Immigration:string;
    
  }

  export class JobImmigrationGet
  {
   
    JobId:number;
    ImmigrationStatusId:number;
    ImmigrationStatus: string;
    Id: number;
    JobPriority: string;
    
  }

  export class AddResp {
    public RolesandResponsibilities: string;
    public Index: number;
  }


  export class JobLocationsDetails
  {
    CityId: number;
    CityName: string; 
  }

  export class jobDues
  {
    Id: number;
    DueIn: string;
  }

  export class jobImps
  {
    Id: number;
    JobPriority: string;
  }

  
  export class jobImmigration
  {
    ImmigrationStatusId: number;
    ImmigrationStatus: string;
  }

  export class jobImmigrationData
  {
    JobId: number;
    ImmigrationStatusId: number;
    ImmigrationStatus: string;
  }
  
