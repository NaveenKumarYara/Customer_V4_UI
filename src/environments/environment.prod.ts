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
  production: true, // http://api.tenendus.com:109 0 // http://arytic.com:1120/
  jobTitleEndpoint: 'http://arytic.com:1120/JobsAPI/api/GetJobTitles',
    getskillsEndpoint: 'http://arytic.com:1120/ProfileAPI/api/GetSkills',
    addSkillsEndpoint: 'http://arytic.com:1120/ProfileAPI/api/AddSkill',
    GetPersonTypeEndPoint : 'http://arytic.com:1120/JobsAPI/api/GetPersonType?',
    // locationwisejobtitlesendpoint: " http://arytic.com:1120/JobsAPI/api/GetLocationWiseJobsCount",
    SuggestJobTitleEndPoint : 'http://arytic.com:1120/JobsAPI/api/SuggestedJobTitles?',
    SuggestJobCategoryEndPoint : 'http://arytic.com:1120/JobsAPI/api/SuggestedJobCategory?',
    draftCategory: 'http://arytic.com:1120/JobsAPI/api/GetDraftCategory',
    educationcriteriaendpoint: 'http://arytic.com:1120/JobsAPI/api/GetQualification',
    addneweducationEndpoint: 'http://arytic.com:1120/ProfileAPI/api/SaveQualification',
    employmentTypeendpoint: 'http://arytic.com:1120/JobsAPI/api/GetEmploymentType',
    salaryTypeendpoint: 'http://arytic.com:1120/JobsAPI/api/GetSalaryType',
    contractDurationendpoint : 'http://arytic.com:1120/JobsAPI/api/GetContractDuration',
    workAuthorizationendpoint : 'http://arytic.com:1120/JobsAPI/api/GetWorkauthorization',
    interviewtypeendpoint: 'http://arytic.com:1120/JobsAPI/api/GetInterviewType',
    NotificationEndPoint: 'http://arytic.com:1120/IdentityAPI/api/GetNotification?',
    GetCustomerContacts: 'http://arytic.com:1120/ProfileAPI/api/GetCustomerContacts?',
    listofJobsEndpoint: 'http://arytic.com:1120/JobsAPI/api/GetCustomerJobs?',
    activatejobEndpoint: 'http://arytic.com:1120/JobsAPI/api/ActivateJob?jobId=1000108',
    deactivatejobEndpoint: 'http://arytic.com:1120/JobsAPI/api/DeactivateJob?jobId=1000108&customerId=1&isActive=false',
    JobDetailsofCustomer: 'http://arytic.com:1120/JobsAPI/api/GetJobDetailCustomer?',
    GetUserId: 'http://arytic.com:1120/ProfileAPI/api/GetUserId?',
    discTestEndpoint : 'http://arytic.com:1120/JobsAPI/api/GetDisc',
    updateemail: 'http://arytic.com:1120/IdentityAPI/api/UpdateEmail',
    updatepassword: 'http://arytic.com:1120/IdentityAPI/api/UpdatePassword',
    // interviewProcess : 'http://localhost:54226/api/ScheduleInterview',
    Login: 'http://arytic.com:1120/IdentityAPI/api/CustomerLogin',
    ForgotPassword: 'http://arytic.com:1120/IdentityAPI/api/ForgotPassword',
    ResetPassword: 'http://arytic.com:1120/IdentityAPI/api/ResetPassword',
    CustomerTokenLogin:  'http://arytic.com:1120/IdentityAPI/api/CustomerTokenLogin',
    InviteContact: 'http://arytic.com:1120/EmailAPI/api/EmailInviteContact',
    signUp: 'http://arytic.com:1120/IdentityAPI/api/CustomerRegistration',
    postjob : 'http://arytic.com:1120/JobsAPI/api/CreateJob',
    addRoles: 'http://arytic.com:1120/ProfileAPI/api/SaveRoles',
    getRoles: 'http://arytic.com:1120/ProfileAPI/api/GetRolesAndResponsibility',
    domaincriteriaendpoint: 'http://arytic.com:1120/ProfileAPI/api/GetDomainName',
    getCustomerUsersendpoint: 'http://arytic.com:1120/ProfileAPI/api/GetCustomerContacts?',
    customerPreferredLocationendpoint: 'http://arytic.com:1120/JobsAPI/api/GetCustomerPreferredLocation?',
    getCitiesendpoint: 'http://arytic.com:1120/ProfileAPI/api/GetCities?',
    jobCategoryEndpoint: 'http://arytic.com:1120/JobsAPI/api/GetJobCategory',
    profileLink: 'http://arytic.com:1120/ProfileAPI/api/GetProfileLink?',
    scheduleInterview : 'http://arytic.com:1120/ReferralAPI/api/ScheduleInterview',
    EmailVaild: 'http://arytic.com:1120/IdentityAPI/api/ValidateEmail?',
    EmailInvite: 'http://arytic.com:1120/EmailAPI/api/RegisterCustomer',
    ActivateUser: 'http://arytic.com:1120/IdentityAPI/api/ActivateUser?',
    Deletedraft: 'http://arytic.com:1120/JobsAPI/api/DeleteDraftedJob?',
    ValidateUser: 'http://arytic.com:1120/ProfileAPI/api/ValidateUser?',
    GetCustomerClients : 'http://arytic.com:1120/ProfileAPI/api/GetCustomerClients',
    GetCustomerDepartments: 'http://arytic.com:1120/ProfileAPI/api/GetCustomerDepartments',
    GetJobDepartment: 'http://arytic.com:1120/JobsAPI/api/GetJobDepartment',
    // SearchClients: 'http://arytic.com:1120/ProfileAPI/api/SearchClients',
    // SearchDepartments: 'http://arytic.com:1120/ProfileAPI/api/SearchDepartments',
   // postjob : 'http://arytic.com:1120/JobsAPI/api/CreateJob?',

   SearchClients: 'http://arytic.com:1120/ProfileAPI/api/SearchClients',
   SearchDepartments: 'http://arytic.com:1120/ProfileAPI/api/SearchDepartments',
   searchdepartmentendpoint: 'http://arytic.com:1120/ProfileAPI/api/SearchDepartments',
   searchclientsendpoint: 'http://arytic.com:1120/ProfileAPI/api/SearchClients',
   getDraftClient: 'http://arytic.com:1120/JobsAPI/api/GetJobClient',

    SearchProfile: 'http://arytic.com:1120/JobsAPI/api/SearchCandidateProfiles',
    JobdetailsBasicInfoEndpoint: 'http://arytic.com:1120/JobsAPI/api/GetJobBasicInfo?',

        JobdetailsStatisticsEndpoint:
        'http://arytic.com:1120/JobsAPI/api/GetJobStatistics?',

    JobdetailsProfileEndpoint:
        'http://arytic.com:1120/JobsAPI/api/GetProfiles?',

    MatchingDetailEndPoint:
        'http://arytic.com:1120/JobsAPI/api/GetJobMatchingPercentage',

     VideoProfileEndPoint:
        'http://arytic.com:1120/ProfileAPI/api/GetVideoSizzles',
    GetAutoSearch: 'http://arytic.com:1120/JobsAPI/api/GetAutoSearch',

    GetJobsFilterBy: 'http://arytic.com:1120/JobsAPI/api/SearchJobFilter?',

    GetProfileAutoSearch: 'http://arytic.com:1120/ProfileAPI/api/ProfileAutoSearch',

    GetCitySearch: 'http://arytic.com:1120/ProfileAPI/api/GetCities',

    JobdetailsSuggestedProfileEndpoint:
        'http://arytic.com:1120/JobsAPI/api/GetMatchedProfiles?',

    RecentJobs: 'http://arytic.com:1120/JobsAPI/api/GetCustomerJobs?',

    RecentApplicants: 'http://arytic.com:1120/JobsAPI/api/GetApplicants?',

    DashboardStatistics: 'http://arytic.com:1120/ProfileAPI/api/GetDashboardStatistics?',

    ApplicantStatistics: 'http://arytic.com:1120/JobsAPI/api/GetApplicantStatistics?',

    CompanyProfileBasicInfo: 'http://arytic.com:1120/ProfileAPI/api/GetCompanyBasicInfo?',

    CompanyProfileOtherInfo: 'http://arytic.com:1120/ProfileAPI/api/GetOtherInfo?',

    GetAboutCompany: 'http://arytic.com:1120/ProfileAPI/api/GetAboutCompany?',

    GetCompanyLogo: 'http://arytic.com:1120/ProfileAPI/api/GetCompanyLogo?',

    CompanyTechnologies: 'http://arytic.com:1120/ProfileAPI/api/GetCompanyTechnology?',

    CompanySpecialities: 'http://arytic.com:1120/ProfileAPI/api/GetCompanySpeciality?',

    CompanyWhitePapers: 'http://arytic.com:1120/ProfileAPI/api/GetCompanyWhitePaper?',

    ComapnyAchivements: 'http://arytic.com:1120/ProfileAPI/api/GetCompanyAchievement?',

    CompanyPartnerships: 'http://arytic.com:1120/ProfileAPI/api/GetCompanyPartner?',

    CompanyCertifications: 'http://arytic.com:1120/ProfileAPI/api/GetCompanyCertification?',

    CompanyCultures : 'http://arytic.com:1120/ProfileAPI/api/GetCompanyCulture?',

    CompanyNewsPapers : 'http://arytic.com:1120/ProfileAPI/api/GetCompanyNewsInfo?',

    GetCompanyBenfits : 'http://arytic.com:1120/ProfileAPI/api/GetCompanyBenefit?',

    JobsProfileCount: 'http://arytic.com:1120/JobsAPI/api/GetProfileCount?',

    GetJobDetialCustomerComments: 'http://arytic.com:1120/JobsAPI/api/GetJobComments?',

    CompanyProfileLocationInfo: 'http://arytic.com:1120/JobsAPI/api/GetCustomerPreferredLocation?',

    EditDraft: 'http://arytic.com:1120/JobsAPI/api/GetDraftedJobs?',

    InterviewScheduleType: 'http://arytic.com:1120/JobsAPI/api/GetInterviewScheduleType?',

    SearchCandidateProfiles: 'http://arytic.com:1120/JobsAPI/api/SearchCandidateProfiles'
};
