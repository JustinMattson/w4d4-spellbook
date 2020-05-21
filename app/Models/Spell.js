export default class Spell {
  constructor(data) {
    //console.log("model");
    this.id = data._id;
    this.name = data.name;
    this.description = data.description || data.desc.join(" ");
    this.range = data.range;
    this.duration = data.duration;
    this.index = data.index;
  }

  get Template() {
    return /*html*/ `
    <div class="card">
    <div class="card-body">
       ${this.subTemplate}
      <h4 class="card-title">${this.name}</h4>
      <p class="card-text">${this.range} | ${this.duration}</p>
      <p class="card-text">${this.description}</p>
    </div>
  </div>
  `;
  }
  get subTemplate() {
    if (this.index) {
      return `
          <i class="fas fa-arrow-left action text-success" onclick="app.spellsController.learnSpell()"></i>
          `;
    }
    return `
      <i class="fas fa-times action text-danger" onclick="app.spellsController.removeSpell()"></i>
      `;
  }
}
