import { App } from "./app.js";

const gradovi = await fetch("https://localhost:5001/Grad/PreuzmiGradove").then(r => r.json());
const app = new App(gradovi);
app.draw(document.body);
