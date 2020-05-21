import SpellsService from "../Services/SpellsService.js";
import store from "../store.js";

//Private
function _drawApiSpells() {
  let spells = store.State.apiSpells;
  let template = "";
  spells.forEach((spell) => {
    template += `<li class="action" onclick="app.spellsController.getSpellDetails('${spell.id}')" >${spell.name}</li>`;
  });

  document.getElementById("apiSpells").innerHTML = template;
}

function _drawActiveSpell() {
  let spell = store.State.activeSpell;
  if (spell) {
    document.getElementById("activeSpell").innerHTML = spell.Template;
  } else {
    document.getElementById("activeSpell").innerHTML = "";
  }
}

function _drawMySpells() {
  let spells = store.State.mySpells;
  let template = "";
  spells.forEach((spell) => {
    template += `<li class="action" onclick="app.spellsController.setActiveSpell('${spell.id}')" >${spell.name}</li>`;
  });

  document.getElementById("mySpells").innerHTML = template;
}
console.log("constructor");

//Public
export default class SpellsController {
  constructor() {
    store.subscribe("mySpells", _drawMySpells);
    store.subscribe("apiSpells", _drawApiSpells);
    store.subscribe("activeSpell", _drawActiveSpell);
  }
  getSpellDetails(id) {
    //console.log(name);
    SpellsService.getSpellDetails(id);
  }

  learnSpell() {
    SpellsService.learnSpell();
  }
  setActiveSpell(id) {
    console.log(id);
    SpellsService.setActiveSpell(id);
  }
  removeSpell() {
    SpellsService.removeSpell();
  }
}
