import Component from '@glimmer/component';

import type { Track } from '../../data/album';

interface TracksListComponentSignature {
  Args: {
    numColumns?: number;
    tracks?: Array<Track>;
  };
}

export default class TracksListComponent extends Component<TracksListComponentSignature> {
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

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Tracks::List': typeof TracksListComponent;
  }
}
