import { Biljka } from "./biljka.js";
export class Application1{

    constructor(podrucja,osobine){
        this.podrucja = podrucja;
        this.osobine = osobine;
        this.biljke = [];
        this.containerRezultati = null;
    }

    draw(container) {

        const header = document.createElement("h1");
        header.innerHTML= "Lekovito Bilje";
        header.classList.add("naslov");

        const sadrzaj = document.createElement("div");
        
        const pretraga = document.createElement("div");
        this.drawPretraga(pretraga);
        sadrzaj.appendChild(pretraga);

        const rezultat = document.createElement("div");
        rezultat.classList.add("rezultat");
        sadrzaj.appendChild(rezultat);


        container.appendChild(header);
        container.appendChild(sadrzaj);
    }


    drawPretraga(container) {
        
        const pretragaContainer = document.createElement("div");
        pretragaContainer.classList.add("pretragaContainer");
        container.appendChild(pretragaContainer);

        let labelaPodrucje = document.createElement("label");
        labelaPodrucje.innerHTML = "Podrucje";
        pretragaContainer.appendChild(labelaPodrucje);

        const selectPodrucja = document.createElement("select");
        selectPodrucja.classList.add("selectPodrucja");
        this.podrucja.forEach(element => {
            let options = document.createElement("option");
            options.value = element.identifikator;
            options.innerHTML = element.naziv;
            selectPodrucja.appendChild(options);
        });
        pretragaContainer.appendChild(selectPodrucja);

        
        this.osobine.forEach((element)=>{

            let labela = container.querySelector(`.label-${element.naziv}`);

            if(labela==null){

                labela = document.createElement("label");
                labela.innerHTML = element.naziv;
                labela.classList.add(`label-${element.naziv}`);
                pretragaContainer.appendChild(labela);
            }

            let select = container.querySelector(`.select-${element.naziv}`);
            if(select ==null)
            {
                select = document.createElement("select");
                select.classList.add(`select-${element.naziv}`);
                pretragaContainer.appendChild(select);
            }

            let options = document.createElement("option");
            options.value = element.identifikator;
            options.innerHTML=element.vrednost;
            select.appendChild(options);

        });
        
        let dugme = document.createElement("input");
        dugme.type = "button";
        dugme.value = "Pretrazi";
        dugme.classList.add("dugme");
         dugme.onclick=this.onClickDugme;
        pretragaContainer.appendChild(dugme);
        
    }

    onClickDugme = async ()  => {
        
        const p=document.querySelector(".selectPodrucja");
        const idpodrucje = p.value;
        let upit= `https://localhost:7011/Biljke/PreuzmiBiljke/${idpodrucje}?`;
        let queryOsobine = "?";
        let prvi = true;

        const unikati = new Set(this.osobine.map((osobine)=> osobine.naziv));

        unikati.forEach((osobine)=> {
            let ddOsobina = document.querySelector(`.select-${osobine}`);
            let idOsobine = ddOsobina.value;

            if(prvi) {
                prvi=false;
                queryOsobine += `osobineIDs=${idOsobine}`;
            }else {
                queryOsobine += `&osobineIDs=${idOsobine}`;
            }

        });

        console.log(upit);

        const biljke = await fetch(upit + queryOsobine).then((response) =>
        response.json());

        console.log(biljke);

        this.containerRezultati.r
    }


}