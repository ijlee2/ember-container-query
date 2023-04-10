import Component from '@glimmer/component';

import type { Track } from '../../data/album';

import styles from './table.css';

interface TracksTableSignature {
  Args: {
    tracks?: Track[];
  };
}

const TracksTableComponent = class extends Component<TracksTableSignature> {
  styles = styles;
};

export default TracksTableComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Tracks::Table': typeof TracksTableComponent;
  }
}
