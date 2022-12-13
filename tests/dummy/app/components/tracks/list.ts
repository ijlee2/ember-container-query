import Component from '@glimmer/component';
import type { Track } from 'dummy/data/album';

interface TracksListComponentArgs {
  numColumns?: number;
  tracks?: Array<Track>;
}

export default class TracksListComponent extends Component<TracksListComponentArgs> {
  get numColumns(): number {
    const { numColumns } = this.args;

    return numColumns ?? 1;
  }

  get numRows(): number {
    const { tracks } = this.args;

    if (!tracks) {
      return 0;
    }

    return Math.ceil(tracks.length / this.numColumns);
  }
}
