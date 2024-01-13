export class Klub {
    constructor(id, naziv, police) {
        this.id = id;
        this.police = police;
        this.naziv = naziv;
    }
    draw(host) {
        const glavna = document.createElement("glavna");
        glavna.classList.add("glavna");
        const levi = document.createElement("div");
        levi.classList.add("levi");
        const desni = document.createElement("div");
        desni.classList.add("desni");
        const telo = document.createElement("div");
        telo.classList.add("telo");
        const lbl = document.createElement("h1");

        lbl.innerHTML = "Video klub \"" + this.naziv + "\"";

        this.crtajLevi(levi);
        this.crtajPolice(desni);
        glavna.appendChild(lbl);
        telo.appendChild(levi);
        telo.appendChild(desni);
        glavna.appendChild(telo);
        host.appendChild(glavna);
    }

    // hoas(){
    //     this.police.forEach(p=>{
    //         const red = document.createElement("div");
    //         const radioButton = document.createElement("input");
    //         radioButton.type="radio";
    //         radioButton.value=p.id;
    //         radioButton.name=`${this.id}`;

    //         const labela = document.createElement("label");
    //         labela.innerHTML=p.oznaka;

    //         red.appendChild(radioButton);
    //         red.appendChild(labela);

    //     });
    // }

    crtajLevi(host) {
        this.police.forEach(p => {
            const div = document.createElement("div");
            const rb = document.createElement("input");
            rb.type = "radio";
            rb.value = p.id;
            rb.name = `${this.id}`;
            const lbl = document.createElement("label");
            lbl.innerHTML = p.oznaka;
            div.appendChild(rb);
            div.appendChild(lbl);
            host.appendChild(div);
        });
        const lbl = document.createElement("label");
        lbl.innerHTML = "Broj DVD-ova:";
        lbl.classList.add("margina");
        const dole = document.createElement("div");
        const input = document.createElement("input");
        input.classList.add(`input-${this.id}`);

        const btn = document.createElement("button");
        btn.innerHTML = "Dodaj na policu";
        btn.onclick = this.dodaj;
        btn.classList.add("btn");
        host.appendChild(lbl);
        host.appendChild(input);
        host.appendChild(btn);
    }
    crtajPolice(host) {
        const div = document.createElement("div");
        div.classList.add("police");
        this.police.forEach(p => {
            const red = document.createElement("div");
            red.classList.add("red");

            const oznaka = document.createElement("div");
            oznaka.innerHTML = p.oznaka;
            oznaka.classList.add("oznaka");

            const prikaz = document.createElement("div");
            prikaz.classList.add(`prikaz-${p.oznaka}-${this.id}`);

            red.appendChild(oznaka);
            red.appendChild(prikaz);

            for (let i = 0; i < p.trenutnoDiskova; i++) {
                const div = document.createElement("div");
                div.classList.add("dvd");
                let w = 100 / p.maxDiskova;
                div.style.width = `${w}%`;
                prikaz.appendChild(div);
            }
            const lbl = document.createElement("div");
            lbl.innerHTML = p.trenutnoDiskova + "/" + p.maxDiskova;
            lbl.classList.add("oznaka");

            red.appendChild(lbl);
            div.appendChild(red);
        });
        host.appendChild(div);
    }
    dodaj = async () => {
        const rb = document.querySelector(`input[type="radio"][name="${this.id}"]:checked`);
        if (rb == null) {
            alert("selektuj nesto");
            return
        }
        const ozn = rb.value;

        const inp = document.querySelector(`.input-${this.id}`).value;
        if (inp == "") {
            alert("unesite broj diskova");
            return;
        }
        const polica = this.police.filter(p => p.id == ozn);
        if (polica[0].trenutnoDiskova + parseInt(inp) > polica[0].maxDiskova) {
            alert("nema mesta na polici");
            return;
        }
        const rez = await fetch("https://localhost:5001/Polica/DodajDiskove/" + ozn + "/" + inp, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(r => r.json());
        polica[0].trenutnoDiskova += parseInt(inp);
        const desni = document.querySelector(".desni");
        desni.replaceChildren();
        this.crtajPolice(desni);

    }
}