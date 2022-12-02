import Component from '@glimmer/component';
import type { Track } from 'dummy/data/album';

interface TracksComponentArgs {
  tracks?: Array<Track>;
}

export default class TracksComponent extends Component<TracksComponentArgs> {
  get tracks(): Array<Track> {
    return this.args.tracks ?? [];
  }
}
