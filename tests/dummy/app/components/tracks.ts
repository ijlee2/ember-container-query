import templateOnlyComponent from '@ember/component/template-only';
import type { Track } from 'dummy/data/album';

interface TracksComponentSignature {
  Args: {
    tracks?: Array<Track>;
  };
  Element: HTMLElement;
}

const TracksComponent = templateOnlyComponent<TracksComponentSignature>();

export default TracksComponent;
