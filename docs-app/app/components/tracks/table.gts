import type { TOC } from '@ember/component/template-only';
import type { Track } from 'docs-app/data/album';
import add from 'docs-app/helpers/add';

import styles from './table.module.css';

interface TracksTableSignature {
  Args: {
    tracks?: Track[];
  };
}

const TracksTable: TOC<TracksTableSignature> = <template>
  <table data-test-table="Tracks">
    <thead>
      <tr>
        <th class={{styles.track-number}}>#</th>
        <th>Title</th>
        <th class={{styles.track-length}}>Length</th>
        <th class={{styles.track-is-explicit}}>Explicit</th>
      </tr>
    </thead>

    <tbody>
      {{#each @tracks as |track index|}}
        <tr data-test-row>
          <td>
            {{add index 1}}
          </td>
          <td data-test-column="Title">
            {{track.name}}
          </td>
          <td align="right" data-test-column="Length">
            {{track.length}}
          </td>
          <td align="center" data-test-column="Explicit">
            {{if track.isExplicit "Yes"}}
          </td>
        </tr>
      {{/each}}
    </tbody>
  </table>
</template>;

export default TracksTable;
