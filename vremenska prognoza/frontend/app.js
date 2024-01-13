import { Grad } from "./grad.js";

export class App {
    constructor(gradovi) {
        this.gradovi = gradovi;
    }
    draw(host) {
        const glavna = document.createElement("div");
        glavna.classList.add("glavna");

        this.gradovi.forEach(g => {
            const grad = new Grad(g.id, g.ime, g.x, g.y, g.podaci);
            grad.draw(glavna);
        });
        host.appendChild(glavna);
    }
}