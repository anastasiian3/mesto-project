export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = containerSelector;
  }

  renderItems() {
    this._renderedItems.reverse().forEach((item) => {
      this._renderer(item);
    });
  }

  addCard(card) {
    this._container.prepend(card);
  }
}

// export default class Section {
//     constructor({ data, renderer }, containerSelector) {
//       this._renderedItems = data;
//       this._renderer = renderer;
//       this._container = document.querySelector(containerSelector);
//     }

//     setItem(element) {
//       this._container.append(element);
//     }

//     clear() {
//       this._container.innerHTML = '';
//     }

//     renderItems() {
//       this.clear();

//       this._renderedItems.forEach(item => {
//         this._renderer(item);
//       });
//     }
//   }
