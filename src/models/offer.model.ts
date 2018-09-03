export class Offer {
  public Id: string;
  public AssetOrAgreementDescription: string;
  public AssetOrAgreementId: string;
  public ContractId: string;
  public ManufacturerId: string;
  public OfferDescription: string;
  public OfferCategory: string;
  public OfferType: string;      

  constructor(Id: string,
    AssetOrAgreementDescription: string,
    AssetOrAgreementId: string,
    ContractId: string,
    ManufacturerId: string,
    OfferDescription:string,
    OfferCategory: string,
    OfferType: string
    )
  {
      this.Id = Id;
      this.AssetOrAgreementDescription = AssetOrAgreementDescription;
      this.AssetOrAgreementId = AssetOrAgreementId;
      this.ContractId = ContractId;
      this.ManufacturerId = ManufacturerId;
      this.OfferDescription = OfferDescription;
      this.OfferCategory = OfferCategory;
      this.OfferType = OfferType;
    }
}
