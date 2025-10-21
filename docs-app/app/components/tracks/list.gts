import Component from '@glimmer/component';
import type { Track } from 'docs-app/data/album';
import add from 'docs-app/helpers/add';
import dynamicCssGrid from 'docs-app/modifiers/dynamic-css-grid';
import svgJar from 'ember-svg-jar/helpers/svg-jar';

import styles from './list.module.css';

interface TracksListSignature {
  Args: {
    numColumns?: number;
    tracks?: Track[];
  };
}

export default class TracksList extends Component<TracksListSignature> {
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

  <template>
    <ul
      class={{styles.list}}
      data-css-grid="{{this.numRows}} x {{this.numColumns}}"
      data-test-list="Tracks"
      {{dynamicCssGrid numColumns=this.numColumns numRows=this.numRows}}
    >
      {{#each @tracks as |track index|}}
        <li class={{styles.item}} data-test-item>
          <div>
            {{add index 1}}.
            <span data-test-field="Title">
              {{track.name}}
            </span>
          </div>

          {{#if track.isExplicit}}
            <span aria-label="Explicit" data-test-field="Explicit">
              {{svgJar
                "alpha-e-box"
                class=styles.icon-explicit
                desc="Letter E, which stands for explicit"
                role="img"
              }}
            </span>
          {{/if}}
        </li>
      {{/each}}
    </ul>
  </template>
}
