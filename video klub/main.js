import { App } from "./app.js";
const klub = await fetch("https://localhost:5001/VideoKlub/PreuzmiVideoKlubove")
    .then(r => r.json());
const app = new App(klub);
app.draw(document.body);