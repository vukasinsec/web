import { Application1 } from "./application1.js";

const podrucja = await fetch("https://localhost:7011/Podrucja/PreuzmiPodrcuja").then(response => response.json());

const osobine = await fetch("https://localhost:7011/Osobine/PreuzmiOsobine").then(response => response.json());


const app = new Application1(podrucja,osobine);
app.draw(document.body);

