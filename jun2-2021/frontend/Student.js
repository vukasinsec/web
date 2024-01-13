

export class Student {

    constructor(indeks,ime,prezime,predmet,rok,ocena)
    {
        this.indeks = indeks;
        this.ime = ime;
        this.prezime = prezime;
        this.predmet = predmet;
        this.rok = rok;
        this.ocena = ocena;
    }

    popuniTabelu(container){

        let vrsta = document.createElement("tr");
        container.appendChild(vrsta);

        let kockicaUVrsti = document.createElement("td");
        kockicaUVrsti.innerHTML=this.indeks;
        vrsta.appendChild(kockicaUVrsti);

        kockicaUVrsti = document.createElement("td");
        kockicaUVrsti.innerHTML=this.ime;
        vrsta.appendChild(kockicaUVrsti);

        kockicaUVrsti = document.createElement("td");
        kockicaUVrsti.innerHTML=this.prezime;
        vrsta.appendChild(kockicaUVrsti);

        kockicaUVrsti = document.createElement("td");
        kockicaUVrsti.innerHTML=this.predmet;
        vrsta.appendChild(kockicaUVrsti);

        kockicaUVrsti = document.createElement("td");
        kockicaUVrsti.innerHTML=this.rok;
        vrsta.appendChild(kockicaUVrsti);

        kockicaUVrsti = document.createElement("td");
        kockicaUVrsti.innerHTML=this.ocena;
        vrsta.appendChild(kockicaUVrsti);

    }

}