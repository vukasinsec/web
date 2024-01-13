import { Student } from "./Student.js";

export class Application {

    constructor(rokovi,predmeti) {
        this.Rokovi = rokovi;
        this.Predmeti = predmeti;
    }

    draw(container)
    {

        const glavniDiv = document.createElement("div");
        glavniDiv.classList.add("glavniDiv");
        container.appendChild(glavniDiv);

        const levo = document.createElement("div");
        levo.classList.add("levo");
        glavniDiv.appendChild(levo);
        this.levoDraw(levo);

        const desno = document.createElement("div");
        desno.classList.add("desno");
        glavniDiv.appendChild(desno);

        const tabela = document.createElement("table");
        tabela.className="tabela";
        desno.appendChild(tabela);

        let th = document.createElement("thead");
        let headeri = ["Indeks","Ime","Prezime","Predmet","Ispitni rok","Ocena"];

        headeri.forEach(h=>{
            let tr = document.createElement("th");
            tr.innerHTML = h;
            th.appendChild(tr);
        });

        let tb = document.createElement("tbody");

        tabela.appendChild(th);
        tabela.appendChild(tb);


    }

    levoDraw(levo)
    {
        console.log("Predmeti:", this.Predmeti);

        let lblIspit = document.createElement("label");
        lblIspit.innerHTML = "Ispit: ";
        levo.appendChild(lblIspit);

        let dropDown = document.createElement("select");
        levo.appendChild(dropDown);

        this.Predmeti.forEach(p=>{
            console.log(p.naziv);
            let opcija = document.createElement("option");
            opcija.innerHTML=p.naziv;
            opcija.value=p.id;
            dropDown.appendChild(opcija);
        });

        let lblRok = document.createElement("label");
        lblRok.classList="lblRok";
        lblRok.innerHTML="Rok:";
        levo.appendChild(lblRok);

        let rokoviDiv = document.createElement("div");
        rokoviDiv.className="rokoviDiv";
        levo.appendChild(rokoviDiv);

        let leviRok = document.createElement("div");
        leviRok.className="leviRok";
        rokoviDiv.appendChild(leviRok);

        let desniRok = document.createElement("div");
        desniRok.className="desniRok";
        rokoviDiv.appendChild(desniRok);

        this.Rokovi.forEach((r,index) => {

            let red = document.createElement("div");
            let cb = document.createElement("input");
            cb.type = "checkbox";
            cb.value = r.id;

            if(r.id===1)
                cb.checked=true;
            red.appendChild(cb);
            let labela = document.createElement("label");
            labela.innerHTML = r.naziv;
            red.appendChild(labela);

            if(index%2==0)
                leviRok.appendChild(red);
            else
                desniRok.appendChild(red);
        });

        

        let btnNadji = document.createElement("button");
        btnNadji.className="btnNadji";
        btnNadji.innerHTML="Nadji";
        btnNadji.onclick=this.btnNadjiFunkcija();
        levo.appendChild(btnNadji);

        let indeksDiv = document.createElement("div");
        indeksDiv.classList="indeksDiv";
        levo.appendChild(indeksDiv);

        let lblIndeks = document.createElement("label");
        lblIndeks.className="lblIndeks";
        lblIndeks.innerHTML="Indeks:";
        indeksDiv.appendChild(lblIndeks);

        let inputIndeks = document.createElement("input");
        inputIndeks.type="text";
        inputIndeks.className="indeks";
        inputIndeks.classList="inputIndeks";
        indeksDiv.appendChild(inputIndeks);

        let ocenaDiv = document.createElement("div");
        ocenaDiv.classList="ocenaDiv";
        levo.appendChild(ocenaDiv);

        let lblOcena = document.createElement("label");
        lblOcena.className="lblOcena";
        lblOcena.innerHTML="Ocena:";
        indeksDiv.appendChild(lblOcena);

        let inputOcena = document.createElement("input");
        inputOcena.type="text";
        inputOcena.className="ocena";
        inputOcena.classList="inputOcena";
        indeksDiv.appendChild(inputOcena);

        let btnUpisi = document.createElement("button");
        btnUpisi.innerHTML="Upisi";
        btnUpisi.onclick=this.btnUpisiFunkcija();
        levo.appendChild(btnUpisi)
    }

    nacrtajTabelu(tb,podaci)
    {
        tb.innerHTML="";
        podaci.forEach(p=>{
            p.popuniTabelu(tb);
        })
    }

    btnNadjiFunkcija(){

        let idPredmeta = document.querySelector("select").value;
        let selektovani = document.querySelectorAll("input[type=checkbox]:checked");
        console.log(selektovani);

        // if(selektovani.length===0){
        //     alert("Selektujte rokove!");
        //     return;
        // }

        let string = "";

        selektovani.forEach((s,index)=>{
            string+=s.value;
            if(index<selektovani.length-1)
                string+="/";
        });

        console.log(string);

        let Podaci=[];
        fetch("https://localhost:5001/Spoj/Pretrazi/" + idPredmeta + "/" + string)
        .then(data => data.json()) // Ispravljeno
        .then(podaci => {
            podaci.forEach(pod => {
                let p = new Student(pod.index, pod.ime, pod.prezime, pod.predmet, pod.rok, pod.ocena);
                Podaci.push(p);
                console.log(p);
            });
            let host = document.querySelector("tbody");
            console.log(host);
            this.nacrtajTabelu(host, Podaci);
        });
        

    }

    btnUpisiFunkcija() {
        let idPredmeta = document.querySelector("select").value;
        
        
        let rok = document.querySelector("input[type=checkbox]:checked").value;
    
        if (!rok) {
            alert("Morate selektovati jedan rok!");
            return;
        }
    
        let ocena = document.querySelector(".ocena").value;
        console.log("eee");
        console.log(ocena);
        if (ocena === "" || ocena < 6 || ocena > 10) {
            alert("Nevalidna ocena");
            return;
        }
    
        let index = document.querySelector(".indeks").value;
    
        fetch("https://localhost:5001/Spoj/DodajSpoj/" + index + "/" + idPredmeta + "/" + rok + "/" + ocena, {
            method: "PUT"
        }).then(rez => {
            if (rez.ok) {
                let Podaci = [];
                fetch("https://localhost:5001/Spoj/PreuzmiZaStudentaIndex/" + index).then(data => {
                    data.json().then(podaci => {
                        podaci.forEach(pod => {
                            let p = new Student(pod.index, pod.ime, pod.prezime, pod.predmet, pod.rok, pod.ocena);
                            Podaci.push(p);
                            console.log(p);
                        });
                        let host = document.querySelector("tbody");
                        console.log(host);
                        this.nacrtajTabelu(host, Podaci);
                    });
                });
            } else {
                alert("Došlo je do greške");
                return;
            }
        });
    }
    

}
