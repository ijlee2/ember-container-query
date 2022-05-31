import { action } from '@ember/object';
import Component from '@glimmer/component';
import type { Track } from 'dummy/data/album';

interface TracksListComponentArgs {
  numColumns?: number;
  tracks: Array<Track>;
}

export default class TracksListComponent extends Component<TracksListComponentArgs> {
  get numColumns(): number {
    return this.args.numColumns ?? 1;
  }

  get numRows(): number {
    return Math.ceil(this.args.tracks.length / this.numColumns);
  }

  @action updateCssForRows(element: HTMLElement): void {
    element.style.gridTemplateColumns = `repeat(${this.numColumns}, minmax(0, 1fr))`;
    element.style.gridTemplateRows = `repeat(${this.numRows}, 1fr)`;
  }
}
