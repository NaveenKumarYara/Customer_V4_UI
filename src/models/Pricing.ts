export class PlanFeature
{
    plansoffered : Plan[] = [];
    featuresOffered : Features[]  = [];
}


export class Plan
{
 id:number;
 planName:string;
 dailyCharges:string;
}

export class Features
{
    id:number;
    featureName:string;
    price:number; 
    featureComment:string;   
}