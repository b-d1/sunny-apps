/**
 * Created by Blagoj on 4/28/2017.
 */


export class Item {

    name: string;
    url: string;
    hidden: boolean;
    icon: string;
    explanation1: string;
    explanation2: string;
    temperature: number;
    clouds: string;
    algalb: number;
    UVIndex: number;
    badgeColor: string;
    recommendation: string;
    gData1: Array<number>;
    gdata2: Array<number>;
    recommendedHours: string;



    constructor(public n: string, public u: string, public h: boolean, public i: string) {
        this.name = n;
        this.url = u;
        this.hidden = h;
        this.icon = i;
    }




}