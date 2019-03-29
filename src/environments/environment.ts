// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    jobTitleEndpoint: 'http://v1.tenendus.com:1020/JobsAPI/api/GetJobTitles',
    getskillsEndpoint: 'http://v1.tenendus.com:1020/ProfileAPI/api/GetSkills',
    addSkillsEndpoint: 'http://v1.tenendus.com:1020/ProfileAPI/api/AddSkill',
    GetPersonTypeEndPoint : 'http://v1.tenendus.com:1020/JobsAPI/api/GetPersonType?',
    // locationwisejobtitlesendpoint: "http://v1.tenendus.com:1020/JobsAPI/api/GetLocationWiseJobsCount",
    SuggestJobTitleEndPoint : ' http://v1.tenendus.com:1020/JobsAPI/api/SuggestedJobTitles?',
    SuggestJobCategoryEndPoint : ' http://v1.tenendus.com:1020/JobsAPI/api/SuggestedJobCategory?',
    draftCategory: 'http://v1.tenendus.com:1020/JobsAPI/api/GetDraftCategory',
    educationcriteriaendpoint: 'http://v1.tenendus.com:1020/JobsAPI/api/GetQualification',
    addneweducationEndpoint: 'http://v1.tenendus.com:1020/ProfileAPI/api/SaveQualification',
    employmentTypeendpoint: 'http://v1.tenendus.com:1020/JobsAPI/api/GetEmploymentType',
    salaryTypeendpoint: 'http://v1.tenendus.com:1020/JobsAPI/api/GetSalaryType',
    contractDurationendpoint : 'http://v1.tenendus.com:1020/JobsAPI/api/GetContractDuration',
    workAuthorizationendpoint : 'http://v1.tenendus.com:1020/JobsAPI/api/GetWorkauthorization',
    interviewtypeendpoint: 'http://v1.tenendus.com:1020/JobsAPI/api/GetInterviewType',
    NotificationEndPoint: 'http://v1.tenendus.com:1020/IdentityAPI/api/GetNotification?',
    GetCustomerContacts: 'http://v1.tenendus.com:1020/ProfileAPI/api/GetCustomerContacts?',
    listofJobsEndpoint: 'http://v1.tenendus.com:1020/JobsAPI/api/GetCustomerJobs?',
    activatejobEndpoint: 'http://v1.tenendus.com:1020/JobsAPI/api/ActivateJob?jobId=1000108',
    deactivatejobEndpoint: 'http://v1.tenendus.com:1020/JobsAPI/api/DeactivateJob?jobId=1000108&customerId=1&isActive=false',
    JobDetailsofCustomer: 'http://v1.tenendus.com:1020/JobsAPI/api/GetJobDetailCustomer?',
    GetUserId: 'http://v1.tenendus.com:1020/ProfileAPI/api/GetUserId?',
    discTestEndpoint : 'http://v1.tenendus.com:1020/JobsAPI/api/GetDisc',
    updateemail: 'http://v1.tenendus.com:1020/IdentityAPI/api/UpdateEmail',
    updatepassword: 'http://v1.tenendus.com:1020/IdentityAPI/api/UpdatePassword',
    // interviewProcess : 'http://localhost:54226/api/ScheduleInterview',
    Login: 'http://v1.tenendus.com:1020/IdentityAPI/api/CustomerLogin',
    ForgotPassword: 'http://v1.tenendus.com:1020/IdentityAPI/api/ForgotPassword',
    ResetPassword: 'http://v1.tenendus.com:1020/IdentityAPI/api/ResetPassword',
    CustomerTokenLogin:  'http://v1.tenendus.com:1020/IdentityAPI/api/CustomerTokenLogin',
    InviteContact: 'http://v1.tenendus.com:1020/EmailAPI/api/EmailInviteContact',
    signUp: 'http://v1.tenendus.com:1020/IdentityAPI/api/CustomerRegistration',
    postjob : 'http://v1.tenendus.com:1020/JobsAPI/api/CreateJob',
    addRoles: 'http://v1.tenendus.com:1020/ProfileAPI/api/SaveRoles',
    getRoles: 'http://v1.tenendus.com:1020/ProfileAPI/api/GetRolesAndResponsibility',
    domaincriteriaendpoint: 'http://v1.tenendus.com:1020/ProfileAPI/api/GetDomainName',
    getCustomerUsersendpoint: 'http://v1.tenendus.com:1020/ProfileAPI/api/GetCustomerContacts?',
    customerPreferredLocationendpoint: 'http://v1.tenendus.com:1020/JobsAPI/api/GetCustomerPreferredLocation?',
    getCitiesendpoint: 'http://v1.tenendus.com:1020/ProfileAPI/api/GetCities?',
    jobCategoryEndpoint: 'http://v1.tenendus.com:1020/JobsAPI/api/GetJobCategory',
    profileLink: 'http://v1.tenendus.com:1020/ProfileAPI/api/GetProfileLink?',
    scheduleInterview : 'http://v1.tenendus.com:1020/ReferralAPI/api/ScheduleInterview',
    EmailVaild: 'http://v1.tenendus.com:1020/IdentityAPI/api/ValidateEmail?',
    EmailInvite: 'http://v1.tenendus.com:1020/EmailAPI/api/RegisterCustomer',
    ActivateUser: 'http://v1.tenendus.com:1020/IdentityAPI/api/ActivateUser?',
    Deletedraft: 'http://v1.tenendus.com:1020/JobsAPI/api/DeleteDraftedJob?',
    ValidateUser: 'http://v1.tenendus.com:1020/ProfileAPI/api/ValidateUser?',
    GetCustomerClients : 'http://v1.tenendus.com:1020/ProfileAPI/api/GetCustomerClients',
    getDraftClient: 'http://v1.tenendus.com:1020/JobsAPI/api/GetJobClient',
    GetCustomerDepartments: 'http://v1.tenendus.com:1020/ProfileAPI/api/GetCustomerDepartments',
    GetJobDepartment: 'http://v1.tenendus.com:1020/JobsAPI/api/GetJobDepartment',
   // SearchClients: 'http://v1.tenendus.com:1020/ProfileAPI/api/SearchClients',
    // SearchDepartments: 'http://v1.tenendus.com:1020/ProfileAPI/api/SearchDepartments',
   // postjob : 'http://v1.tenendus.com:1020/JobsAPI/api/CreateJob?',
    searchclientsendpoint: 'http://v1.tenendus.com:1020/ProfileAPI/api/SearchClients',
    searchdepartmentendpoint: 'http://v1.tenendus.com:1020/ProfileAPI/api/SearchDepartments',
    SearchProfile: 'http://v1.tenendus.com:1020/JobsAPI/api/SearchCandidateProfiles',
    JobdetailsBasicInfoEndpoint: 'http://v1.tenendus.com:1020/JobsAPI/api/GetJobBasicInfo?',
    JobdetailsStatisticsEndpoint: 'http://v1.tenendus.com:1020/JobsAPI/api/GetJobStatistics?',
    JobdetailsProfileEndpoint: 'http://v1.tenendus.com:1020/JobsAPI/api/GetProfiles?',
    MatchingDetailEndPoint: 'http://v1.tenendus.com:1020/JobsAPI/api/GetJobMatchingPercentage',
     VideoProfileEndPoint: 'http://v1.tenendus.com:1020/ProfileAPI/api/GetVideoSizzles',
    GetAutoSearch: 'http://v1.tenendus.com:1020/JobsAPI/api/GetAutoSearch',
    GetJobsFilterBy: 'http://v1.tenendus.com:1020/JobsAPI/api/SearchJobFilter?',
    GetProfileAutoSearch: 'http://v1.tenendus.com:1020/ProfileAPI/api/ProfileAutoSearch',
    GetCitySearch: 'http://v1.tenendus.com:1020/ProfileAPI/api/GetCities',
    JobdetailsSuggestedProfileEndpoint: 'http://v1.tenendus.com:1020/JobsAPI/api/GetMatchedProfiles?',
    RecentJobs: 'http://v1.tenendus.com:1020/JobsAPI/api/GetCustomerJobs?',
    RecentApplicants: 'http://v1.tenendus.com:1020/JobsAPI/api/GetApplicants?',
    DashboardStatistics: 'http://v1.tenendus.com:1020/ProfileAPI/api/GetDashboardStatistics?',
    ApplicantStatistics: 'http://v1.tenendus.com:1020/JobsAPI/api/GetApplicantStatistics?',
    CompanyProfileBasicInfo: 'http://v1.tenendus.com:1020/ProfileAPI/api/GetCompanyBasicInfo?',
    CompanyProfileOtherInfo: 'http://v1.tenendus.com:1020/ProfileAPI/api/GetOtherInfo?',
    GetAboutCompany: 'http://v1.tenendus.com:1020/ProfileAPI/api/GetAboutCompany?',
    GetCompanyLogo: 'http://v1.tenendus.com:1020/ProfileAPI/api/GetCompanyLogo?',
    CompanyTechnologies: 'http://v1.tenendus.com:1020/ProfileAPI/api/GetCompanyTechnology?',
    CompanySpecialities: 'http://v1.tenendus.com:1020/ProfileAPI/api/GetCompanySpeciality?',
    CompanyWhitePapers: 'http://v1.tenendus.com:1020/ProfileAPI/api/GetCompanyWhitePaper?',
    ComapnyAchivements: 'http://v1.tenendus.com:1020/ProfileAPI/api/GetCompanyAchievement?',
    CompanyPartnerships: 'http://v1.tenendus.com:1020/ProfileAPI/api/GetCompanyPartner?',
    CompanyCertifications: 'http://v1.tenendus.com:1020/ProfileAPI/api/GetCompanyCertification?',
    CompanyCultures : 'http://v1.tenendus.com:1020/ProfileAPI/api/GetCompanyCulture?',
    CompanyNewsPapers : 'http://v1.tenendus.com:1020/ProfileAPI/api/GetCompanyNewsInfo?',
    GetCompanyBenfits : 'http://v1.tenendus.com:1020/ProfileAPI/api/GetCompanyBenefit?',
    JobsProfileCount: 'http://v1.tenendus.com:1020/JobsAPI/api/GetProfileCount?',
    GetJobDetialCustomerComments: 'http://v1.tenendus.com:1020/JobsAPI/api/GetJobComments?',
    CompanyProfileLocationInfo: 'http://v1.tenendus.com:1020/JobsAPI/api/GetCustomerPreferredLocation?',
    EditDraft: 'http://v1.tenendus.com:1020/JobsAPI/api/GetDraftedJobs?',
    InterviewScheduleType: 'http://v1.tenendus.com:1020/JobsAPI/api/GetInterviewScheduleType?',
    SearchCandidateProfiles: 'http://v1.tenendus.com:1020/JobsAPI/api/SearchCandidateProfiles',
    DeleteCustomerClients: 'http://v1.tenendus.com:1020/ProfileAPI/api/DeleteCustomerClients?',

    DeleteCustomerDepartments: 'http://v1.tenendus.com:1020/ProfileAPI/api/DeleteCustomerDepartments?',
    baseUrll : 'http://v1.tenendus.com:1020/',
    customerLogin: 'http://demo.arytic.com/customerlogin',
    customerSignUp: 'http://demo.arytic.com/customersignup',
    ForgotPasswordurl:'http://demo.arytic.com/ForgotPassword',
    CandidateSignUp:'http://demo.arytic.com/candidatesignup'

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
