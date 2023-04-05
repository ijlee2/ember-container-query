import templateOnlyComponent from '@ember/component/template-only';

import type { Track } from '../../data/album';

interface TracksTableSignature {
  Args: {
    tracks?: Track[];
  };
}

const TracksTableComponent = templateOnlyComponent<TracksTableSignature>();

export default TracksTableComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Tracks::Table': typeof TracksTableComponent;
  }
}
