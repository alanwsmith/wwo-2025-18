const t = {
  face: `
    <div class="face-item" data-receive="updateFaceItem" data-item="ITEM"></div>`, 

  shelf: `
    <button 
      class="shelf-item"
      data-send="updateShelfItem" 
      data-receive="updateShelfItem" 
      data-item="ITEM"></button>`,
}
const items = [
  "eyepatch", "glasses", "glasses-2", "glasses-3", "glasses-4", "glasses-5", "sunglasses", "sunglasses-2",
];

window.Trader = class {
  async body(_event, el){
    let svg = await this.api.fetchSVG("/svgs/body/thunder-t-shirt.svg");
    el.appendChild(svg);
    svg = await this.api.fetchSVG("/svgs/head/shaved-1.svg");
    el.appendChild(svg);
    svg = await this.api.fetchSVG("/svgs/face/smile.svg");
    el.appendChild(svg);
    for (let key of items) {
      let subs = [["ITEM", key]];
      let svg = await this.api.fetchSVG(`/svgs/accessories/${key}.svg`);
      let item = await this.api.useEl(t.face, subs);
      item.classList.add("hidden");
      item.appendChild(svg);
      el.appendChild(item);
    }
  }

  async shelf(_event, el) {
    for (let key of items) {
      let subs = [["ITEM", key]];
      let svg = await this.api.fetchSVG(`/svgs/accessories/${key}.svg`);
      svg.classList.add("face-svg");
      let item = await this.api.useEl(t.shelf, subs);
      item.appendChild(svg);
      el.appendChild(item);
    }
  }

  updateFaceItem(event, el) {
    if (this.api.match(event, el, "item")) {
      el.classList.remove("hidden");
    } else {
      el.classList.add("hidden");
    }
  }

  updateShelfItem(event, el) {
    if (this.api.match(event, el, "item")) {
      el.classList.add("current");
    } else {
      el.classList.remove("current");
    }
    this.api.forward(event, "updateFaceItem");
  }



};
