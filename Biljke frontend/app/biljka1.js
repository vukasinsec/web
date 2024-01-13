export class Biljka
{

    constructor(id,naziv,slikaUrl,brVidjenja,podrucje){

        this.brVidjenja = brVidjenja;
        this.id = id;
        this.naziv = naziv;
        this.slikaUrl = slikaUrl;
        this.podrucje = podrucje;

    }


    drawBiljka(container)
    {


        const slicica=document.createElement("div");
        slicica.classList.add("slicica");
        

        const img=document.createElement("img");
        img.innerHTML=this.slikaUrl;
        slicica.appendChild(img);

        const naziv=document.createElement("p");
        naziv.innerHTML=this.naziv;
        slicica.appendChild(naziv);

        const brVidjenja = document.createElement("p");
        brVidjenja.classList.add(`biljka-${this.id}`);
        brVidjenja.innerHTML = `Broj vidjenja: ${this.brVidjenja}`;
        slicica.appendChild(brVidjenja);

        const btnVidjena = document.createElement("button");
        btnVidjena.innerHTML = "Vidjena";
        btnVidjena.onclick = this.onClickVidjena;
        btnVidjena.classList.add("btn-vidjena");
        slicica.appendChild(btnVidjena);

        container.appendChild(slicica);


    }

    onClickVidjena = async () => {

        const result = await fetch(`https://localhost:7011/Biljke/UpisiVidjenje/${this.id}/${this.podrucje}`,{
            method: "POST",
            body: JSON.stringify({
                latitude: 90,
                longitude: 180,
                datumIVreme: "2024-01-11T13:01:02.005Z"
            }),
            headers:{
                "Content-Type": "application/json",
            }
        }).then(r=>{
            if(r.ok){
                this.brVidjenja++;

                const brv = document.querySelector(`.naziv-${this.id}`);
                brv.innerHTML=`Broj vidjenja: ${this.brVidjenja}`;

                var btn = document.querySelector(`.dugme-${this.id}`).disabled=true;
            }
        });



    }
    
}