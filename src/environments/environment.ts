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
    listofJobsEndpoint: "http://api.tenendus.com:1090/JobsAPI/api/GetCustomerJobs?customerId=1&userId=5&sortBy=0&status=0&pageNumber=1&numberOfRows=",
    activatejobEndpoint: "http://api.tenendus.com:1090/JobsAPI/api/ActivateJob?jobId=1000108",
    deactivatejobEndpoint: "http://api.tenendus.com:1090/JobsAPI/api/DeleteJob?jobId=1000108&customerId=1&isActive=false",

    JobDetailsofCustomer:"http://api.tenendus.com:1090/JobsAPI/api/GetJobDetailCustomer?customerId=1&jobId=1000100",

    JobdetailsBasicInfoEndpoint:
        "http://api.tenendus.com:1090/JobsAPI/api/GetJobBasicInfo?customerId=1&jobId=1000100",

        JobdetailsStatisticsEndpoint:
        "http://api.tenendus.com:1090/JobsAPI/api/GetJobStatistics?jobId=1000100",

    JobdetailsProfileEndpoint:
        "http://api.tenendus.com:1090/JobsAPI/api/GetProfiles?customerId=1&userId=5",
        
    JobdetailsSuggestedProfileEndpoint:
        "http://api.tenendus.com:1090/JobsAPI/api/GetMatchedProfiles?customerId=1&userId=5",

    RecentJobs: "http://api.tenendus.com:1090/JobsAPI/api/GetCustomerJobs?customerId=1&userId=5&sortBy=0&status=0&pageNumber=1&numberOfRows=5",

    RecentApplicants: "http://api.tenendus.com:1090/JobsAPI/api/GetApplicants?customerId=1&userId=5&page=1&numberOfRows=5",

    DashboardStatistics: "http://api.tenendus.com:1090/ProfileAPI/api/GetDashboardStatistics?customerId=1&userId=5&filter=0",

    ApplicantStatistics: "http://api.tenendus.com:1090/JobsAPI/api/GetApplicantStatistics?customerId=1&userId=5&filter=0",

    CompanyProfileBasicInfo: "http://api.tenendus.com:1090/ProfileAPI/api/GetCompanyBasicInfo?customerId=1",

    CompanyProfileOtherInfo: "http://api.tenendus.com:1090/ProfileAPI/api/GetOtherInfo?customerId=1",
     
    GetAboutCompany:"http://api.tenendus.com:1090/ProfileAPI/api/GetAboutCompany?customerId=1",

    GetCompanyLogo: "http://api.tenendus.com:1090/ProfileAPI/api/GetCompanyLogo?customerId=1",

    CompanyTechnologies: "http://api.tenendus.com:1090/ProfileAPI/api/GetCompanyTechnology?customerId=1&companyTechnologyId=0",

    CompanySpecialities: "http://api.tenendus.com:1090/ProfileAPI/api/GetCompanySpeciality?customerId=1&companySpecialityId=0",

    CompanyWhitePapers: "http://api.tenendus.com:1090/ProfileAPI/api/GetCompanyWhitePaper?customerId=1",

    ComapnyAchivements: "http://api.tenendus.com:1090/ProfileAPI/api/GetCompanyAchievement?customerId=42&companyAchievementId=0",

    CompanyPartnerships:"http://api.tenendus.com:1090/ProfileAPI/api/GetCompanyPartner?customerId=1&companyPartnerId=0",

    CompanyCertifications: "http://api.tenendus.com:1090/ProfileAPI/api/GetCompanyCertification?customerId=1&companyCertificationId=0",

    CompanyCultures : "http://api.tenendus.com:1090/ProfileAPI/api/GetCompanyCulture?customerId=1&companyCultureId=0",

    CompanyNewsPapers : "http://api.tenendus.com:1090/ProfileAPI/api/GetCompanyNewsInfo?customerId=1&companyNewsInfoId=0",

    GetCompanyBenfits : "http://api.tenendus.com:1090/ProfileAPI/api/GetCompanyBenefit?customerId=1&companyBenefitId=0",

    GetJobDetialCustomerComments:"http://api.tenendus.com:1090/JobsAPI/api/GetJobComments?jobId=1000101",

    CompanyProfileLocationInfo: "http://api.tenendus.com:1090/JobsAPI/api/GetCustomerPreferredLocation?customerId=1"
}
