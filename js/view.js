import Handlebars from 'handlebars/lib/handlebars';

export default class View {
  constructor() {
    const handlebarsTemplate = this._getHandlebarsTemplate();
    this.compiledTemplate = Handlebars.compile(handlebarsTemplate);
    this.shoudUpdateElement = true;
    this.shownCardsNumber = 2; // Количество карточек которые будут отрисованы (на экране видим только 2 верхние)
  }

  get element() {
    if (this.shoudUpdateElement) {
      this._element = this.render();
      this.shoudUpdateElement = false;
      this.bind();
    }
    return this._element;
  }

  get template() {
    const cards = this.cards.slice();
    const shownCards = cards.splice(cards.length - this.shownCardsNumber, this.shownCardsNumber);
    return this.compiledTemplate({allCards: shownCards});
  }

  setCards(newCards) {
    this.shoudUpdateElement = true;
    this.cards = newCards;
  }

  _getHandlebarsTemplate() {
    return `
      {{#each allCards}}
        <article class="card card--{{type}}">
          <div class="card__circle">
            <span class="card__index">{{index}}</span>
          </div>
        </article>
      {{/each}}`;
  }

  render() {
    const outer = document.createElement(`section`);
    outer.classList.add(`cards`);
    outer.innerHTML = this.template.trim();
    return outer;
  }

  bind() {
    const cards = this.element.querySelectorAll(`.card`);
    cards.forEach((card) => {
      card.addEventListener(`click`, (evt) => {
        evt.preventDefault();
        this.onClick(evt);
      });
    });
    const container = this.element;
    container.addEventListener(`mouseenter`, this.omMouseEnter);
    container.addEventListener(`mouseleave`, this.onMouseLeave);
  }

  onClick() {}

  omMouseEnter() {}

  onMouseLeave() {}
}

