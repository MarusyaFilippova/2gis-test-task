export default class Model {
  constructor(cards) {
    this.initialData = cards;
    this.initializeState();
  }

  get state() {
    return this._state;
  }

  set state(newState) {
    this._state = newState;
  }

  deleteCard() {
    if (this.hasCards()) {
      this._state.pop();
    }
  }

  addNarrowCard() {
    this._state.push({type: `narrow`, index: this._state.length + 1});
  }

  addWideCard() {
    this._state.push({type: `wide`, index: this._state.length + 1});
  }

  initializeState() {
    this._state = this.initialData;
    this._state.forEach((card, index) => {
      card.index = index + 1;
    });
  }

  hasCards() {
    return this.state.length !== 0;
  }
}
