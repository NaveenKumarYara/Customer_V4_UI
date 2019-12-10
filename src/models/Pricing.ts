export class plansoffered
{
 id:number;
 planName:string;
 dailyCharges:string;
}

export class featuresOffered
{
    id:number;
    featureName:string;
    price:number; 
    featureComment:string;   
}

export class  planFeatures
{
    id:number;
    planid:number;
    featureid:number;

}