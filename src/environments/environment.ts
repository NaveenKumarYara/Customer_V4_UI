// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    jobTitleEndpoint: 'http://api.tenendus.com:1090/JobsAPI/api/GetJobTitles',
    getskillsEndpoint: 'http://api.tenendus.com:1090/ProfileAPI/api/GetSkills',
    addSkillsEndpoint: 'http://api.tenendus.com:1090/ProfileAPI/api/AddSkill',
    GetPersonTypeEndPoint : 'http://api.tenendus.com:1090/JobsAPI/api/GetPersonType?',
    // locationwisejobtitlesendpoint: "http://api.tenendus.com:1090/JobsAPI/api/GetLocationWiseJobsCount",
    SuggestJobTitleEndPoint : ' http://api.tenendus.com:1090/JobsAPI/api/SuggestedJobTitles?',
    SuggestJobCategoryEndPoint : ' http://api.tenendus.com:1090/JobsAPI/api/SuggestedJobCategory?',
    draftCategory: 'http://api.tenendus.com:1090/JobsAPI/api/GetDraftCategory',
    educationcriteriaendpoint: 'http://api.tenendus.com:1090/JobsAPI/api/GetQualification',
    addneweducationEndpoint: 'http://api.tenendus.com:1090/ProfileAPI/api/SaveQualification',
    employmentTypeendpoint: 'http://api.tenendus.com:1090/JobsAPI/api/GetEmploymentType',
    salaryTypeendpoint: 'http://api.tenendus.com:1090/JobsAPI/api/GetSalaryType',
    contractDurationendpoint : 'http://api.tenendus.com:1090/JobsAPI/api/GetContractDuration',
    workAuthorizationendpoint : 'http://api.tenendus.com:1090/JobsAPI/api/GetWorkauthorization',
    interviewtypeendpoint: 'http://api.tenendus.com:1090/JobsAPI/api/GetInterviewType',
    NotificationEndPoint: 'http://api.tenendus.com:1090/IdentityAPI/api/GetNotification?',
    GetCustomerContacts: 'http://api.tenendus.com:1090/ProfileAPI/api/GetCustomerContacts?',
    listofJobsEndpoint: 'http://api.tenendus.com:1090/JobsAPI/api/GetCustomerJobs?',
    activatejobEndpoint: 'http://api.tenendus.com:1090/JobsAPI/api/ActivateJob?jobId=1000108',
    deactivatejobEndpoint: 'http://api.tenendus.com:1090/JobsAPI/api/DeactivateJob?jobId=1000108&customerId=1&isActive=false',
    JobDetailsofCustomer: 'http://api.tenendus.com:1090/JobsAPI/api/GetJobDetailCustomer?',
    GetUserId: 'http://api.tenendus.com:1090/ProfileAPI/api/GetUserId?',
    discTestEndpoint : 'http://api.tenendus.com:1090/JobsAPI/api/GetDisc',
    updateemail: 'http://api.tenendus.com:1090/IdentityAPI/api/UpdateEmail',
    updatepassword: 'http://api.tenendus.com:1090/IdentityAPI/api/UpdatePassword',
    // interviewProcess : 'http://localhost:54226/api/ScheduleInterview',
    Login: 'http://api.tenendus.com:1090/IdentityAPI/api/CustomerLogin',
    ForgotPassword: 'http://api.tenendus.com:1090/IdentityAPI/api/ForgotPassword',
    ResetPassword: 'http://api.tenendus.com:1090/IdentityAPI/api/ResetPassword',
    CustomerTokenLogin:  'http://api.tenendus.com:1090/IdentityAPI/api/CustomerTokenLogin',
    InviteContact: 'http://api.tenendus.com:1090/EmailAPI/api/EmailInviteContact',
    signUp: 'http://api.tenendus.com:1090/IdentityAPI/api/CustomerRegistration',
    postjob : 'http://api.tenendus.com:1090/JobsAPI/api/CreateJob',
    addRoles: 'http://api.tenendus.com:1090/ProfileAPI/api/SaveRoles',
    getRoles: 'http://api.tenendus.com:1090/ProfileAPI/api/GetRolesAndResponsibility',
    domaincriteriaendpoint: 'http://api.tenendus.com:1090/ProfileAPI/api/GetDomainName',
    getCustomerUsersendpoint: 'http://api.tenendus.com:1090/ProfileAPI/api/GetCustomerContacts?',
    customerPreferredLocationendpoint: 'http://api.tenendus.com:1090/JobsAPI/api/GetCustomerPreferredLocation?',
    getCitiesendpoint: 'http://api.tenendus.com:1090/ProfileAPI/api/GetCities?',
    jobCategoryEndpoint: 'http://api.tenendus.com:1090/JobsAPI/api/GetJobCategory',
    profileLink: 'http://api.tenendus.com:1090/ProfileAPI/api/GetProfileLink?',
    scheduleInterview : 'http://api.tenendus.com:1090/ReferralAPI/api/ScheduleInterview',
    EmailVaild: 'http://api.tenendus.com:1090/IdentityAPI/api/ValidateEmail?',
    EmailInvite: 'http://api.tenendus.com:1090/EmailAPI/api/RegisterCustomer',
    ActivateUser: 'http://api.tenendus.com:1090/IdentityAPI/api/ActivateUser?',
    Deletedraft: 'http://api.tenendus.com:1090/JobsAPI/api/DeleteDraftedJob?',
    ValidateUser: 'http://api.tenendus.com:1090/ProfileAPI/api/ValidateUser?',
    GetCustomerClients : 'http://api.tenendus.com:1090/ProfileAPI/api/GetCustomerClients',
    getDraftClient: 'http://api.tenendus.com:1090/JobsAPI/api/GetJobClient',
    GetCustomerDepartments: 'http://api.tenendus.com:1090/ProfileAPI/api/GetCustomerDepartments',
    GetJobDepartment: 'http://api.tenendus.com:1090/JobsAPI/api/GetJobDepartment',
   // SearchClients: 'http://api.tenendus.com:1090/ProfileAPI/api/SearchClients',
    // SearchDepartments: 'http://api.tenendus.com:1090/ProfileAPI/api/SearchDepartments',
   // postjob : 'http://api.tenendus.com:1090/JobsAPI/api/CreateJob?',
    searchclientsendpoint: 'http://api.tenendus.com:1090/ProfileAPI/api/SearchClients',
    searchdepartmentendpoint: 'http://api.tenendus.com:1090/ProfileAPI/api/SearchDepartments',
    SearchProfile: 'http://api.tenendus.com:1090/JobsAPI/api/SearchCandidateProfiles',
    JobdetailsBasicInfoEndpoint: 'http://api.tenendus.com:1090/JobsAPI/api/GetJobBasicInfo?',
    JobdetailsStatisticsEndpoint: 'http://api.tenendus.com:1090/JobsAPI/api/GetJobStatistics?',
    JobdetailsProfileEndpoint: 'http://api.tenendus.com:1090/JobsAPI/api/GetProfiles?',
    MatchingDetailEndPoint: 'http://api.tenendus.com:1090/JobsAPI/api/GetJobMatchingPercentage',
     VideoProfileEndPoint: 'http://api.tenendus.com:1090/ProfileAPI/api/GetVideoSizzles',
    GetAutoSearch: 'http://api.tenendus.com:1090/JobsAPI/api/GetAutoSearch',
    GetJobsFilterBy: 'http://api.tenendus.com:1090/JobsAPI/api/SearchJobFilter?',
    GetProfileAutoSearch: 'http://api.tenendus.com:1090/ProfileAPI/api/ProfileAutoSearch',
    GetCitySearch: 'http://api.tenendus.com:1090/ProfileAPI/api/GetCities',
    JobdetailsSuggestedProfileEndpoint: 'http://api.tenendus.com:1090/JobsAPI/api/GetMatchedProfiles?',
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
    CompanyProfileLocationInfo: 'http://api.tenendus.com:1090/JobsAPI/api/GetCustomerPreferredLocation?',
    EditDraft: 'http://api.tenendus.com:1090/JobsAPI/api/GetDraftedJobs?',
    InterviewScheduleType: 'http://api.tenendus.com:1090/JobsAPI/api/GetInterviewScheduleType?',
    SearchCandidateProfiles: 'http://api.tenendus.com:1090/JobsAPI/api/SearchCandidateProfiles',
    DeleteCustomerClients: 'http://api.tenendus.com:1090/ProfileAPI/api/DeleteCustomerClients?',

    DeleteCustomerDepartments: 'http://api.tenendus.com:1090/ProfileAPI/api/DeleteCustomerDepartments?',
    baseUrll : 'http://api.tenendus.com:1090/'

    // jobTitleEndpoint: 'http://arytic.com:1120/JobsAPI/api/GetJobTitles',
    // getskillsEndpoint: 'http://arytic.com:1120/ProfileAPI/api/GetSkills',
    // addSkillsEndpoint: 'http://arytic.com:1120/ProfileAPI/api/AddSkill',
    // GetPersonTypeEndPoint : 'http://arytic.com:1120/JobsAPI/api/GetPersonType?',
    // SuggestJobTitleEndPoint : 'http://arytic.com:1120/JobsAPI/api/SuggestedJobTitles?',
    // SuggestJobCategoryEndPoint : 'http://arytic.com:1120/JobsAPI/api/SuggestedJobCategory?',
    // draftCategory: 'http://arytic.com:1120/JobsAPI/api/GetDraftCategory',
    // educationcriteriaendpoint: 'http://arytic.com:1120/JobsAPI/api/GetQualification',
    // addneweducationEndpoint: 'http://arytic.com:1120/ProfileAPI/api/SaveQualification',
    // employmentTypeendpoint: 'http://arytic.com:1120/JobsAPI/api/GetEmploymentType',
    // salaryTypeendpoint: 'http://arytic.com:1120/JobsAPI/api/GetSalaryType',
    // contractDurationendpoint : 'http://arytic.com:1120/JobsAPI/api/GetContractDuration',
    // workAuthorizationendpoint : 'http://arytic.com:1120/JobsAPI/api/GetWorkauthorization',
    // interviewtypeendpoint: 'http://arytic.com:1120/JobsAPI/api/GetInterviewType',
    // NotificationEndPoint: 'http://arytic.com:1120/IdentityAPI/api/GetNotification?',
    // GetCustomerContacts: 'http://arytic.com:1120/ProfileAPI/api/GetCustomerContacts?',
    // listofJobsEndpoint: 'http://arytic.com:1120/JobsAPI/api/GetCustomerJobs?',
    // activatejobEndpoint: 'http://arytic.com:1120/JobsAPI/api/ActivateJob?jobId=1000108',
    // deactivatejobEndpoint: 'http://arytic.com:1120/JobsAPI/api/DeactivateJob?jobId=1000108&customerId=1&isActive=false',
    // JobDetailsofCustomer: 'http://arytic.com:1120/JobsAPI/api/GetJobDetailCustomer?',
    // GetUserId: 'http://arytic.com:1120/ProfileAPI/api/GetUserId?',
    // discTestEndpoint : 'http://arytic.com:1120/JobsAPI/api/GetDisc',
    // updateemail: 'http://arytic.com:1120/IdentityAPI/api/UpdateEmail',
    // updatepassword: 'http://arytic.com:1120/IdentityAPI/api/UpdatePassword',
    // Login: 'http://arytic.com:1120/IdentityAPI/api/CustomerLogin',
    // ForgotPassword: 'http://arytic.com:1120/IdentityAPI/api/ForgotPassword',
    // ResetPassword: 'http://arytic.com:1120/IdentityAPI/api/ResetPassword',
    // CustomerTokenLogin:  'http://arytic.com:1120/IdentityAPI/api/CustomerTokenLogin',
    // InviteContact: 'http://arytic.com:1120/EmailAPI/api/EmailInviteContact',
    // signUp: 'http://arytic.com:1120/IdentityAPI/api/CustomerRegistration',
    // postjob : 'http://arytic.com:1120/JobsAPI/api/CreateJob',
    // addRoles: 'http://arytic.com:1120/ProfileAPI/api/SaveRoles',
    // getRoles: 'http://arytic.com:1120/ProfileAPI/api/GetRolesAndResponsibility',
    // domaincriteriaendpoint: 'http://arytic.com:1120/ProfileAPI/api/GetDomainName',
    // getCustomerUsersendpoint: 'http://arytic.com:1120/ProfileAPI/api/GetCustomerContacts?',
    // customerPreferredLocationendpoint: 'http://arytic.com:1120/JobsAPI/api/GetCustomerPreferredLocation?',
    // getCitiesendpoint: 'http://arytic.com:1120/ProfileAPI/api/GetCities?',
    // jobCategoryEndpoint: 'http://arytic.com:1120/JobsAPI/api/GetJobCategory',
    // profileLink: 'http://arytic.com:1120/ProfileAPI/api/GetProfileLink?',
    // scheduleInterview : 'http://arytic.com:1120/ReferralAPI/api/ScheduleInterview',
    // EmailVaild: 'http://arytic.com:1120/IdentityAPI/api/ValidateEmail?',
    // EmailInvite: 'http://arytic.com:1120/EmailAPI/api/RegisterCustomer',
    // ActivateUser: 'http://arytic.com:1120/IdentityAPI/api/ActivateUser?',
    // Deletedraft: 'http://arytic.com:1120/JobsAPI/api/DeleteDraftedJob?',
    // ValidateUser: 'http://arytic.com:1120/ProfileAPI/api/ValidateUser?',
    // GetCustomerClients : 'http://arytic.com:1120/ProfileAPI/api/GetCustomerClients',
    // GetCustomerDepartments: 'http://arytic.com:1120/ProfileAPI/api/GetCustomerDepartments',
    // GetJobDepartment: 'http://arytic.com:1120/JobsAPI/api/GetJobDepartment',
    // SearchClients: 'http://arytic.com:1120/ProfileAPI/api/SearchClients',
    // SearchDepartments: 'http://arytic.com:1120/ProfileAPI/api/SearchDepartments',
    // searchdepartmentendpoint: 'http://arytic.com:1120/ProfileAPI/api/SearchDepartments',
    // searchclientsendpoint: 'http://arytic.com:1120/ProfileAPI/api/SearchClients',
    // getDraftClient: 'http://arytic.com:1120/JobsAPI/api/GetJobClient',
    // SearchProfile: 'http://arytic.com:1120/JobsAPI/api/SearchCandidateProfiles',
    // JobdetailsBasicInfoEndpoint: 'http://arytic.com:1120/JobsAPI/api/GetJobBasicInfo?',
    // JobdetailsStatisticsEndpoint: 'http://arytic.com:1120/JobsAPI/api/GetJobStatistics?',
    // JobdetailsProfileEndpoint: 'http://arytic.com:1120/JobsAPI/api/GetProfiles?',
    // MatchingDetailEndPoint: 'http://arytic.com:1120/JobsAPI/api/GetJobMatchingPercentage',
    // VideoProfileEndPoint: 'http://arytic.com:1120/ProfileAPI/api/GetVideoSizzles',
    // GetAutoSearch: 'http://arytic.com:1120/JobsAPI/api/GetAutoSearch',
    // GetJobsFilterBy: 'http://arytic.com:1120/JobsAPI/api/SearchJobFilter?',
    // GetProfileAutoSearch: 'http://arytic.com:1120/ProfileAPI/api/ProfileAutoSearch',
    // GetCitySearch: 'http://arytic.com:1120/ProfileAPI/api/GetCities',
    // JobdetailsSuggestedProfileEndpoint: 'http://arytic.com:1120/JobsAPI/api/GetMatchedProfiles?',
    // RecentJobs: 'http://arytic.com:1120/JobsAPI/api/GetCustomerJobs?',
    // RecentApplicants: 'http://arytic.com:1120/JobsAPI/api/GetApplicants?',
    // DashboardStatistics: 'http://arytic.com:1120/ProfileAPI/api/GetDashboardStatistics?',
    // ApplicantStatistics: 'http://arytic.com:1120/JobsAPI/api/GetApplicantStatistics?',
    // CompanyProfileBasicInfo: 'http://arytic.com:1120/ProfileAPI/api/GetCompanyBasicInfo?',
    // CompanyProfileOtherInfo: 'http://arytic.com:1120/ProfileAPI/api/GetOtherInfo?',
    // GetAboutCompany: 'http://arytic.com:1120/ProfileAPI/api/GetAboutCompany?',
    // GetCompanyLogo: 'http://arytic.com:1120/ProfileAPI/api/GetCompanyLogo?',
    // CompanyTechnologies: 'http://arytic.com:1120/ProfileAPI/api/GetCompanyTechnology?',
    // CompanySpecialities: 'http://arytic.com:1120/ProfileAPI/api/GetCompanySpeciality?',
    // CompanyWhitePapers: 'http://arytic.com:1120/ProfileAPI/api/GetCompanyWhitePaper?',
    // ComapnyAchivements: 'http://arytic.com:1120/ProfileAPI/api/GetCompanyAchievement?',
    // CompanyPartnerships: 'http://arytic.com:1120/ProfileAPI/api/GetCompanyPartner?',
    // CompanyCertifications: 'http://arytic.com:1120/ProfileAPI/api/GetCompanyCertification?',
    // CompanyCultures : 'http://arytic.com:1120/ProfileAPI/api/GetCompanyCulture?',
    // CompanyNewsPapers : 'http://arytic.com:1120/ProfileAPI/api/GetCompanyNewsInfo?',
    // GetCompanyBenfits : 'http://arytic.com:1120/ProfileAPI/api/GetCompanyBenefit?',
    // JobsProfileCount: 'http://arytic.com:1120/JobsAPI/api/GetProfileCount?',
    // GetJobDetialCustomerComments: 'http://arytic.com:1120/JobsAPI/api/GetJobComments?',
    // CompanyProfileLocationInfo: 'http://arytic.com:1120/JobsAPI/api/GetCustomerPreferredLocation?',
    // EditDraft: 'http://arytic.com:1120/JobsAPI/api/GetDraftedJobs?',
    // InterviewScheduleType: 'http://arytic.com:1120/JobsAPI/api/GetInterviewScheduleType?',
    // SearchCandidateProfiles: 'http://arytic.com:1120/JobsAPI/api/SearchCandidateProfiles',
    // baseUrll : 'http://arytic.com:1120/'
};
