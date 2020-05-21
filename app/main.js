import SpellsController from "./Controllers/SpellsController.js";

class App {
  spellsController = new SpellsController();
}
console.log("main");

window["app"] = new App();
