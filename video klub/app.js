import { Klub } from "./klub.js";

export class App {
    constructor(klubovi) {
        this.klubovi = klubovi;
    }
    draw(host) {
        this.klubovi.forEach(k => {
            const klub = new Klub(k.id, k.naziv, k.police);
            klub.draw(host);
        });
    }
}