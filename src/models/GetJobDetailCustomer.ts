import { JobLocations } from './joblocations';
import {JobRequiredDomain} from './JobRequiredDomain';
import {JobRequiredSkills} from './JobRequiredSkills';
import {JobResponsibility} from './JobResponsibility';
import { Qualifications } from './qualifications.model';
import { CustomerUsers, Roles, GetDomain, EditRoles, DepartmentModel } from '../app/components/Postajob/models/jobPostInfo';
import { Jobskills } from './jobskills.model';
import { SkillPostData } from './skill.model';

export class GetJobDetailCustomer {
    JobInfo: JobInfo;
    JobLocation: JobLocations[];
    JobRequiredDomain: GetDomain[];
    JobRequiredSkills: Jobskills [];
    JobResponsibility: EditRoles [];
    EducationDetails: Qualifications [];
    JobDepartments: DepartmentModel [];
    TechnicalTeam: any ;
    MatchingCrieterias : SkillPostData[];
}
// export class GetJobDetailsCustomer {
//     JobInfo:JobInfo;
//     JobLocation: JobLocations[];
//     JobRequiredDomain: GetDomain[];
//     JobRequiredSkills: Jobskills [];
//     JobResponsibility: EditRoles [];
//     EducationDetails: Qualifications [];
//     TechnicalTeam: any ;
// }

export class ReportingTeam
{
    FirstName:string;
    UserId:number;
}
export class JobInfo {
    JobInfoId: number;
    JobId: number;
    JobPositionId: string;
    UserId: number;
    CustomerId: number;
    JobCategoryId: number;
    JobCategory: string;
    JobTitle: string;
    MinExperienceId: number;
    MaxExperienceId: number;
    MinExperience: string;
    MaxExperience: string;
    CompleteDescription: boolean;
    JobDescription: string;
    NumberOfVacancies: number;
    EmploymentTypeId: number;
    EmploymentType: string;
    SalaryTypeId: number;
    SalaryType: string;
    MinimumSalary: string;
    MaximumSalary: string;
    BonusOffered: string;
    ContractDuration: string;
    // ContractExtended: boolean;
    WorkAuthorizationId: number;
    WorkAuthorizationType: string;
   // PossibilityOfFullTime: string; renamed to WorkAuthorizationType
    AfterWhatDuration: string;
    InterviewType: string;
    HiringProcessId: number;
    HiringManagerId: number;
    ReportingManager: ReportingTeam[];
    IsActive: boolean;
    StatusId: number;
    FirstName: string;
    LastName: string;
    EmailId: string;
    PhoneNumber: string;
    CompanyName: string;
    CompanyDescription: string;
    CompanyLogo: string;
    WebSite: string;
    FromTime: string;
    ToTime: string;
    TimeZoneId: string;
    TimeZone: string;
    PostedOn: string;
    ModifiedDate: string;
    PostedBy: string;
    ExpiryDate: string;
    SaveAsTemplate: string;
    RemoteWorkId: number;
    RemoteWorkType: string;
    Travel: string;
    TravelPercentage: string;
    IsPrivate: boolean;
    JobAccessTo: string;
    JobStatus: string;
    StepNumber: string;
    IsDrafted: boolean;
    VideoSizzleId: number;
    VideoURL: string;
    VideoFormat: string;
    ClientId: number;
    ClientName: string;
}
