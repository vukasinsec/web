import { Application } from "./app.js";
import { Predmet } from "./predmet.js";
import { Rok } from "./rok.js";

(async () => {
    let Predmeti = [];
    let Rokovi = [];

    try {
        const responsePredmeti = await fetch("https://localhost:5001/Predmet/PreuzmiPredmete");
        const predmeti = await responsePredmeti.json();

        predmeti.forEach(element => {
            let predmet = new Predmet(element.id, element.naziv);
            Predmeti.push(predmet);
            console.log(predmet);
        });

        const responseRokovi = await fetch("https://localhost:5001/IspitniRok/PreuzmiIspitneRokove");
        const rokovi = await responseRokovi.json();

        rokovi.forEach(r => {
            let rok = new Rok(r.id, r.naziv);
            Rokovi.push(rok);
            console.log(rok);
        });

        console.log("Predmetiii:", Predmeti);
        let app = new Application(Rokovi, Predmeti);
        app.draw(document.body);
    } catch (error) {
        console.error("Greška prilikom dohvatanja podataka:", error);
    }
})();
