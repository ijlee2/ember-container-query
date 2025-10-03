import Component from '@glimmer/component';
import add from 'docs-app/helpers/add';
import dynamicCssGrid from 'docs-app/modifiers/dynamic-css-grid';
import svgJar from 'ember-svg-jar/helpers/svg-jar';

import type { Track } from '../../data';
import styles from './list.css';

interface TracksListSignature {
  Args: {
    numColumns?: number;
    tracks?: Track[];
  };
}

export default class TracksListComponent extends Component<TracksListSignature> {
  styles = styles;

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
      class={{this.styles.list}}
      data-css-grid="{{this.numRows}} x {{this.numColumns}}"
      data-test-list="Tracks"
      {{dynamicCssGrid numColumns=this.numColumns numRows=this.numRows}}
    >
      {{#each @tracks as |track index|}}
        <li class={{this.styles.item}} data-test-item>
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
                class=this.styles.icon-explicit
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
