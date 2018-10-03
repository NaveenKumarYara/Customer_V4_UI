// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
    production: false,
    jobTitleEndpoint: "http://api.tenendus.com:1090/JobsAPI/api/GetJobTitles",
    getskillsEndpoint: "http://api.tenendus.com:1090/JobsAPI/api/GetSkill",
    locationwisejobtitlesendpoint: "http://api.tenendus.com:1090/JobsAPI/api/GetLocationWiseJobsCount",
    educationcriteriaendpoint: "http://api.tenendus.com:1090/JobsAPI/api/GetQualification",
    employmentTypeendpoint: "http://api.tenendus.com:1090/JobsAPI/api/GetEmploymentType",
    interviewtypeendpoint: "http://api.tenendus.com:1090/JobsAPI/api/GetInterviewType",
    NotificationEndPoint: "http://api.tenendus.com:1090/IdentityAPI/api/GetNotification?userId=5",
    listofJobsEndpoint: "http://api.tenendus.com:1090/JobsAPI/api/GetCustomerJobs?",
    activatejobEndpoint: "http://api.tenendus.com:1090/JobsAPI/api/ActivateJob?jobId=1000108",
    deactivatejobEndpoint: "http://api.tenendus.com:1090/JobsAPI/api/DeleteJob?jobId=1000108&customerId=1&isActive=false",
    JobDetailsofCustomer:"http://api.tenendus.com:1090/JobsAPI/api/GetJobDetailCustomer?customerId=1&jobId=1000100",

    jobCategoryEndpoint: 'http://api.tenendus.com:1090/JobsAPI/api/GetJobCategory',

    postjob : 'http://api.tenendus.com:1090/JobsAPI/api/CreateJob?',


    JobdetailsBasicInfoEndpoint:
        'http://api.tenendus.com:1090/JobsAPI/api/GetJobBasicInfo?customerId=1&jobId=1000100',

        JobdetailsStatisticsEndpoint:
        'http://api.tenendus.com:1090/JobsAPI/api/GetJobStatistics?jobId=1000100',

    JobdetailsProfileEndpoint:
        'http://api.tenendus.com:1090/JobsAPI/api/GetProfiles?customerId=1&userId=5',

    MatchingDetailEndPoint:
        'http://api.tenendus.com:1090/JobsAPI/api/GetJobMatchingPercentage',

    JobdetailsSuggestedProfileEndpoint:
        'http://api.tenendus.com:1090/JobsAPI/api/GetMatchedProfiles?customerId=1&userId=5',

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

    GetJobDetialCustomerComments: 'http://api.tenendus.com:1090/JobsAPI/api/GetJobComments?jobId=1000100',

    CompanyProfileLocationInfo: 'http://api.tenendus.com:1090/JobsAPI/api/GetCustomerPreferredLocation?'
};
