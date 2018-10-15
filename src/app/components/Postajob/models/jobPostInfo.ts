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
    public PossibilityOfFullTime: boolean;
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
    public SaveAsTemplate: boolean;
    public StepNumber: number;
    public IsDrafted: boolean;
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
  export class Roles{
    public RoleId :number;
    public Role:string;
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
  public checked :boolean;
}
  //
  export class GetDomain {
     public DomainId: number;
     public DomainName: string;
  }
  export class PjDomain {
    public ExperienceRequired: boolean;
    public DomainId: number;
    public MinimumExperience: number;
    public MaximumExperience: number;
    public Description: string;
  }
  export class PjEducationDetails {
    public QualificationId: number;
    public IsActive: boolean;

  }
  export class PrefLocation{
    public locationId:number;
    public location:string;
    }
  // related

  export class CustomerUsers {
      //public  JobAccessId: number;
     // public JobId: number;
      public  UserId: number;
      public FirstName: string;
     // public  MiddleName: string;
      //public  LastName: string;
      ///public  ProfilePic: string;
      //public CustomerId: number;
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
