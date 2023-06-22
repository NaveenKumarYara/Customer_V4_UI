export class CompanyProfile {
    public CompanyName: string;
    public WebSite: string;
    public ContactEmail: string;
    public TwitterURL: string;
    public LinkedInURL: string;
    public FacebookURL: string;
    public HomeCountryCodeId: string;
    public CountryPhoneCode: string;
    public HomeAreaCode: string;
    public HomePhone: string;
    public MobileCountryCodeId: string;
    public MobileCountryCode: string;
    public MobilePhone: string;
    public Zipcode: string;
    public CityId: number;
    public CityName: string;
    public StateId: number;
    public StateName: string;
    public CountryId: number;
    public CountryName: string;
    public Address1: string;
    public Address2: string;
}



export class companysize
{
    CompanySizeId:number;
    CompanySize:string;
}

export class ConfigurePassword {
    // public ShowForgotPassword: boolean;
    // public ShowRegisterPassword: boolean;
    public Id: boolean;
    // public Display: boolean;
    public Code: string;
    public IsEnabled: boolean;
}