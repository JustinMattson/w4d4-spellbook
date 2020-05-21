import Spell from "../Models/Spell.js";
import store from "../store.js";

console.log("service");

const _spellApi = axios.create({
  baseURL: "https://bcw-sandbox.herokuapp.com/api/spells",
  timeout: 8000,
});

const _sandboxApi = axios.create({
  baseURL: "https://bcw-sandbox.herokuapp.com/api/blakejustin/spells",
  timeout: 8000,
});

class SpellsService {
  removeSpell() {
    _sandboxApi
      .delete(store.State.activeSpell.id)
      .then((res) => {
        this.getMySpells();
        store.commit("activeSpell", null);
      })
      .catch((e) => console.error(e));
  }
  learnSpell() {
    _sandboxApi
      .post("", store.State.activeSpell)
      .then((res) => {
        this.getMySpells();
      })
      .catch((e) => console.error(e));
  }
  getApiSpells() {
    _spellApi.get("").then((res) => {
      store.commit("apiSpells", res.data);
    });
  }

  setActiveSpell(id) {
    console.log(id);

    let spell = store.State.mySpells.find((s) => s.id == id);
    if (spell) {
      store.commit("activeSpell", spell);
    }
  }
  getSpellDetails(id) {
    _spellApi.get(id).then((res) => {
      let spells = new Spell(res.data);
      store.commit("activeSpell", spells);
    });
  }
  getMySpells() {
    _sandboxApi
      .get("")
      .then((res) => {
        let mySpells = res.data.data.map((s) => new Spell(s));
        store.commit("mySpells", mySpells);
      })
      .catch((e) => console.error(e));
  }

  constructor() {
    this.getApiSpells();
    this.getMySpells();
  }
}

const service = new SpellsService();
export default service;
