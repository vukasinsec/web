export class Grad {
    constructor(id, ime, x, y, podaci) {
        this.id = id;
        this.ime = ime;
        this.x = x;
        this.y = y;
        this.podaci = podaci;
    }
    draw(host) {
        const div = document.createElement("div");
        div.classList.add("grad");

        const naslov = document.createElement("h3");
        naslov.classList.add("naslov");
        naslov.innerHTML = "Grad " + this.ime + " (" + this.x + " N, " + this.y + " E), godina: 2022.";
        div.appendChild(naslov);

        const cb = document.createElement("div");
        cb.classList.add(`cb-${this.id}`);
        const polje = [
            { naziv: "Temperatura", klasa: "temperatura" },
            { naziv: "Padavine", klasa: "padavine" },
            { naziv: "Suncani dani", klasa: "suncani" }
        ];
        polje.forEach((p, ind) => {
            const box = document.createElement("input");
            box.type = "radio";
            box.name = `cb-${this.id}`;
            box.value = ind + 1;
            if (ind == 0) {
                box.checked = true;
            }
            const lbl = document.createElement("label");
            lbl.innerHTML = p.naziv;

            cb.appendChild(box);
            cb.appendChild(lbl);
        });
        const dugme = document.createElement("div");
        const btn = document.createElement("button");
        btn.innerHTML = "Prikazi";
        dugme.classList.add("btn");

        div.appendChild(cb);
        dugme.appendChild(btn);
        div.appendChild(dugme);

        const prikaz = document.createElement("div");
        prikaz.classList.add(`prikaz-${this.id}`);

        div.appendChild(prikaz);
        host.appendChild(div);
        btn.onclick = () => this.drawPrikaz(prikaz);
        this.drawPrikaz(prikaz);
    }
    drawPrikaz(prikaz) {
        const host = prikaz;
        const cb = document.querySelector(`input[type="radio"][name="cb-${this.id}"]:checked`);
        let opt;
        if (cb == null) {
            opt = '1';
        }
        else
            opt = cb.value;
        host.replaceChildren();
        this.podaci.forEach(p => {
            const mesec = document.createElement("div");
            mesec.classList.add(`mesec-${this.id}-${p.mesec}`);
            mesec.style.cursor = "pointer";

            const stub = document.createElement("div");
            stub.classList.add(`stub-${this.id}`);

            this.drawStub(stub, opt, p);
            const lbl = document.createElement("label");
            lbl.innerHTML = p.mesec;

            mesec.onclick = () => this.izmeni(mesec, p.mesec);
            mesec.appendChild(stub);
            mesec.appendChild(lbl);

            let izbor = document.createElement("label");
            izbor.classList.add("podatak");
            if (opt == 1) {
                izbor.innerHTML = p.pTemperatura + " C";
            }
            else if (opt == 2) {
                izbor.innerHTML = p.kolicinaPadavina + " mm";
            }
            else {
                izbor.innerHTML = p.brSDana + " d";
            }
            mesec.appendChild(izbor);
            host.appendChild(mesec);
        });
    }
    drawStub(host, opt, p) {
        let max = -1;
        const div = document.createElement("div");
        div.classList.add("obojen");
        switch (opt) {
            case '1':
                this.podaci.forEach(p => {
                    if (p.pTemperatura > max) {
                        max = p.pTemperatura;
                    }
                });
                break;
            case '2':
                this.podaci.forEach(p => {
                    if (p.kolicinaPadavina > max) {
                        max = p.kolicinaPadavina;
                    }
                });
                break;
            case '3':
                this.podaci.forEach(p => {
                    if (p.brSDana > max) {
                        max = p.brSDana;
                    }
                });
                break;
        }
        let vis;
        if (opt == 1) {
            vis = p.pTemperatura / max;
        }
        else if (opt == 2) {
            vis = p.kolicinaPadavina / max;
        }
        else {
            vis = p.brSDana / max;
        }
        let h = vis * 100;
        div.style.height = `${h}px`;
        host.appendChild(div);
    }
    izmeni(div, mesec) {
        const prikaz = document.querySelector(`.prikaz-${this.id}`);
        div.onclick = false;
        const forma = document.createElement("div");
        forma.classList.add(`forma-${this.id}`);

        const lbl = document.createElement("label");
        lbl.innerHTML = `Mesec: ${mesec}`;

        const input = document.createElement("input");
        input.classList.add(`input-${this.id}-${mesec}`);

        const btn = document.createElement("button");
        btn.innerHTML = "Sacuvaj izmenu";
        btn.classList.add(`btnIzmena-${this.id}`);
        btn.onclick = () => this.sacuvaj(mesec);
        forma.appendChild(lbl);
        forma.appendChild(input);
        forma.appendChild(btn);
        prikaz.appendChild(forma);
    }
    async sacuvaj(m) {
        const mesec = document.querySelector(`.mesec-${this.id}-${m}`);
        const tmp = document.querySelector(`.input-${this.id}-${m}`).value;
        const cb = document.querySelector(`input[type="radio"][name="cb-${this.id}"]:checked`).value;
        let rez;
        const podatak = this.podaci.filter(p => p.mesec == m);
        if (cb == 1) {
            rez = await fetch("https://localhost:5001/MeteoroloskiPodatak/IzmeniTemperaturu/" + this.id + "/" + m + "/" + tmp, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(r => r.json());
            podatak[0].pTemperatura = rez.pTemperatura;
        }
        else if (cb == 2) {
            rez = await fetch("https://localhost:5001/MeteoroloskiPodatak/IzmeniPadavine/" + this.id + "/" + m + "/" + tmp, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(r => r.json());
            podatak[0].kolicinaPadavina = rez.kolicinaPadavina;
        }
        else {
            rez = await fetch("https://localhost:5001/MeteoroloskiPodatak/IzmeniDane/" + this.id + "/" + m + "/" + tmp, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(r => r.json());
            podatak[0].brSDana = rez.brSDana;
        }
        const prikaz = document.querySelector(`.prikaz-${this.id}`);
        this.drawPrikaz(prikaz);
    }
}