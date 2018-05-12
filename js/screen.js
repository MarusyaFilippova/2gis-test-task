import View from "./view";

export default class Screen {
  constructor(model) {
    this.model = model;
    this.view = new View();
    this.container = document.querySelector(`.page`);
    window.history.replaceState(this.model.state, ``);
    this.init();
    this.updateView();
  }

  updateView() {
    this.container.innerHTML = ``;
    this.model.state = history.state;
    this.view.setCards(this.model.state);
    this.container.appendChild(this.view.element);
  }

  init() {
    window.addEventListener(`popstate`, () => this.updateView());
    this.view.onClick = (evt) => {
      if (evt.shiftKey && evt.altKey) {
        this.model.addWideCard();
      } else if (evt.shiftKey) {
        this.model.addNarrowCard();
      } else {
        this.model.deleteCard();
      }
      window.history.pushState(this.model.state, ``);
      this.updateView();
    };
    this.view.omMouseEnter = () => this.container.classList.add(`cancel-highlight`);
    this.view.onMouseLeave = () => this.container.classList.remove(`cancel-highlight`);
  }
}
