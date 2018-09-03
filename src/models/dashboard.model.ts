import { Offer } from './offer.model';

export class Dashboard {
 
  public CountryCode: string;
  public CurrencyCode: string;
  public CustomerId: string;
  public CustomerName: string;
  public LanguageCode: string;
  public OpportunityDescription: string;
  public OpportunityId: string;
  public Origin: string;
  public PartnerId: string;
  public PartnerName: string;
  public PartnerPricingTier: string;

     // public Description: string;
      public Offer: Offer[];
  constructor(
    CountryCode: string,
    CurrencyCode: string,
    CustomerId: string,
    LanguageCode: string,
    OpportunityDescription: string,
    OpportunityId: string,
    Origin: string,
    PartnerId: string,
    PartnerName: string,
    PartnerPricingTier: string,
    offers: Offer[]) {
    this.CountryCode = CountryCode;
    this.CurrencyCode = CurrencyCode;
    this.CustomerId = CustomerId;
    this.LanguageCode = LanguageCode;
    this.OpportunityDescription = OpportunityDescription;
    this.OpportunityId = OpportunityId;
    this.Origin = OpportunityDescription;
    this.PartnerId = PartnerId;
    this.PartnerName = PartnerName;
    this.PartnerPricingTier = PartnerPricingTier;
    this.Offer = offers;
    }
}
