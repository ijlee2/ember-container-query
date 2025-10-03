import type { TOC } from '@ember/component/template-only';
import { hash } from '@ember/helper';
import { ContainerQuery, height, width } from 'ember-container-query';
import { and } from 'ember-truth-helpers';

import type { Track } from '../data';
import TracksList from './tracks/list';
import TracksTable from './tracks/table';

interface TracksSignature {
  Args: {
    tracks?: Track[];
  };
}

const TracksComponent: TOC<TracksSignature> = <template>
  <ContainerQuery
    @features={{hash
      large=(width min=640)
      medium=(width max=640 min=480)
      small=(width max=480)
      tall=(height min=320)
    }}
    as |CQ|
  >
    {{#if (and CQ.features.large CQ.features.tall)}}
      <TracksTable @tracks={{@tracks}} />

    {{else}}
      <TracksList
        @numColumns={{if CQ.features.small 1 (if CQ.features.medium 2 3)}}
        @tracks={{@tracks}}
      />

    {{/if}}
  </ContainerQuery>
</template>;

export default TracksComponent;
