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
}
