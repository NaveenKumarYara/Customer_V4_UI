// export const environment = {
//   production: true,
//  OfferApiUrl: 'https://orca-ux-g1-blue.cfapps.pcf1.vc1.pcf.dell.com/#/opportunity/'
// };
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  OfferApiUrl: 'https://orca-ux-g1-blue.cfapps.pcf1.vc1.pcf.dell.com/#/opportunity/',
  production: true,
  jobTitleEndpoint: 'http://api.tenendus.com:1090/JobsAPI/api/GetJobTitles',
  getskillsEndpoint: 'http://api.tenendus.com:1090/ProfileAPI/api/GetSkills',
  addSkillsEndpoint: 'http://api.tenendus.com:1090/ProfileAPI/api/AddSkill',
  GetPersonTypeEndPoint : 'http://api.tenendus.com:1090/JobsAPI/api/GetPersonType?',
  // locationwisejobtitlesendpoint: "http://api.tenendus.com:1090/JobsAPI/api/GetLocationWiseJobsCount",
  educationcriteriaendpoint: 'http://api.tenendus.com:1090/JobsAPI/api/GetQualification',
  employmentTypeendpoint: 'http://api.tenendus.com:1090/JobsAPI/api/GetEmploymentType',
  interviewtypeendpoint: 'http://api.tenendus.com:1090/JobsAPI/api/GetInterviewType',
  NotificationEndPoint: 'http://api.tenendus.com:1090/IdentityAPI/api/GetNotification?',
  listofJobsEndpoint: 'http://api.tenendus.com:1090/JobsAPI/api/GetCustomerJobs?',
  activatejobEndpoint: 'http://api.tenendus.com:1090/JobsAPI/api/ActivateJob?jobId=1000108',
  deactivatejobEndpoint: 'http://api.tenendus.com:1090/JobsAPI/api/DeactivateJob?jobId=1000108&customerId=1&isActive=false',
  JobDetailsofCustomer: 'http://api.tenendus.com:1090/JobsAPI/api/GetJobDetailCustomer?',
  discTestEndpoint : 'http://api.tenendus.com:1090/JobsAPI/api/GetDisc',
  updateemail:'http://api.tenendus.com:1090/IdentityAPI/api/UpdateEmail',
  updatepassword:'http://api.tenendus.com:1090/IdentityAPI/api/UpdatePassword',
  // interviewProcess : 'http://localhost:54226/api/ScheduleInterview',
  Login: 'http://api.tenendus.com:1090/IdentityAPI/api/CustomerLogin',
  signUp: 'http://api.tenendus.com:1090/IdentityAPI/api/CustomerRegistration',
  postjob : 'http://api.tenendus.com:1090/JobsAPI/api/CreateJob',
  addRoles: 'http://api.tenendus.com:1090/ProfileAPI/api/SaveRoles',
  getRoles: 'http://api.tenendus.com:1090/ProfileAPI/api/GetRolesAndResponsibility',
  domaincriteriaendpoint: 'http://api.tenendus.com:1090/ProfileAPI/api/GetDomainName',
  getCustomerUsersendpoint: 'http://api.tenendus.com:1090/ProfileAPI/api/GetCustomerContacts?',
   customerPreferredLocationendpoint: 'http://api.tenendus.com:1090/JobsAPI/api/GetCustomerPreferredLocation?',
  jobCategoryEndpoint: 'http://api.tenendus.com:1090/JobsAPI/api/GetJobCategory',
  scheduleInterview : 'http://api.tenendus.com:1090/ReferralAPI/api/ScheduleInterview',
 // postjob : 'http://api.tenendus.com:1090/JobsAPI/api/CreateJob?',


  JobdetailsBasicInfoEndpoint:
      'http://api.tenendus.com:1090/JobsAPI/api/GetJobBasicInfo?',

      JobdetailsStatisticsEndpoint:
      'http://api.tenendus.com:1090/JobsAPI/api/GetJobStatistics?',

  JobdetailsProfileEndpoint:
      'http://api.tenendus.com:1090/JobsAPI/api/GetProfiles?',

  MatchingDetailEndPoint:
      'http://api.tenendus.com:1090/JobsAPI/api/GetJobMatchingPercentage',

  JobdetailsSuggestedProfileEndpoint:
      'http://api.tenendus.com:1090/JobsAPI/api/GetMatchedProfiles?',

  RecentJobs: 'http://api.tenendus.com:1090/JobsAPI/api/GetCustomerJobs?',

  RecentApplicants: 'http://api.tenendus.com:1090/JobsAPI/api/GetApplicants?',

  DashboardStatistics: 'http://api.tenendus.com:1090/ProfileAPI/api/GetDashboardStatistics?',

  ApplicantStatistics: 'http://api.tenendus.com:1090/JobsAPI/api/GetApplicantStatistics?',

  CompanyProfileBasicInfo: 'http://api.tenendus.com:1090/ProfileAPI/api/GetCompanyBasicInfo?',

  CompanyProfileOtherInfo: 'http://api.tenendus.com:1090/ProfileAPI/api/GetOtherInfo?',

  GetAboutCompany: 'http://api.tenendus.com:1090/ProfileAPI/api/GetAboutCompany?',

  GetCompanyLogo: 'http://api.tenendus.com:1090/ProfileAPI/api/GetCompanyLogo?',

  CompanyTechnologies: 'http://api.tenendus.com:1090/ProfileAPI/api/GetCompanyTechnology?',

  CompanySpecialities: 'http://api.tenendus.com:1090/ProfileAPI/api/GetCompanySpeciality?',

  CompanyWhitePapers: 'http://api.tenendus.com:1090/ProfileAPI/api/GetCompanyWhitePaper?',

  ComapnyAchivements: 'http://api.tenendus.com:1090/ProfileAPI/api/GetCompanyAchievement?',

  CompanyPartnerships: 'http://api.tenendus.com:1090/ProfileAPI/api/GetCompanyPartner?',

  CompanyCertifications: 'http://api.tenendus.com:1090/ProfileAPI/api/GetCompanyCertification?',

  CompanyCultures : 'http://api.tenendus.com:1090/ProfileAPI/api/GetCompanyCulture?',

  CompanyNewsPapers : 'http://api.tenendus.com:1090/ProfileAPI/api/GetCompanyNewsInfo?',

  GetCompanyBenfits : 'http://api.tenendus.com:1090/ProfileAPI/api/GetCompanyBenefit?',

  JobsProfileCount: 'http://api.tenendus.com:1090/JobsAPI/api/GetProfileCount?',

  GetJobDetialCustomerComments: 'http://api.tenendus.com:1090/JobsAPI/api/GetJobComments?',

  CompanyProfileLocationInfo: 'http://api.tenendus.com:1090/JobsAPI/api/GetCustomerPreferredLocation?'
};
