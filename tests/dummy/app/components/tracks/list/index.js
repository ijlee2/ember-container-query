import { action } from '@ember/object';
import Component from '@glimmer/component';

export default class TracksListComponent extends Component {
  get numColumns() {
    return this.args.numColumns ?? 1;
  }

  get numRows() {
    return Math.ceil(this.tracks.length / this.numColumns);
  }

  get tracks() {
    return this.args.tracks ?? [];
  }

  @action updateCssForRows(element) {
    element.style.gridTemplateColumns = `repeat(${this.numColumns}, minmax(0, 1fr))`;
    element.style.gridTemplateRows = `repeat(${this.numRows}, 1fr)`;
  }
}
