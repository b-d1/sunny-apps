/**
 * Created by Blagoj on 4/28/2017.
 */


export class Item {

    name: string;
    url: string;
    hidden: boolean;


    constructor(public n: string, public u: string, public h: boolean) {
        this.name = n;
        this.url = u;
        this.hidden = h;
    }

}