/**
 * Created by Blagoj on 4/28/2017.
 */


export class Item {

    name: string;
    url: string;
    hidden: boolean;
    icon: string;

    temperature: number;
    clouds: string;
    UVIndex: string;
    badgeColor: string;
    recommendation1: string;
    recommendation2: string;
    recommendation3: string;
    HoursGraph: Array<number>;
    UVGraph: Array<number>;
    algalConcentration: string;
    recommendedHours: string;



    constructor(public n: string, public u: string, public h: boolean, public i: string) {
        this.name = n;
        this.url = u;
        this.hidden = h;
        this.icon = i;
    }




}