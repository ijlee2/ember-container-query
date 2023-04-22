import { hash } from '@ember/helper';
import Component from '@glimmer/component';
import { ContainerQuery, width } from 'ember-container-query';

import type { Concert } from '../../../data/concert';
import styles from './tour-schedule.css';
import WidgetsWidget3TourScheduleResponsiveImage from './tour-schedule/responsive-image';

interface WidgetsWidget3TourScheduleSignature {
  Args: {
    concert: Concert;
  };
}

export default class WidgetsWidget3TourScheduleComponent extends Component<WidgetsWidget3TourScheduleSignature> {
  styles = styles;

  <template>
    <ContainerQuery
      @features={{hash small=(width max=400)}}
      @dataAttributePrefix="cq"
      class={{this.styles.container}}
    >
      <div class={{this.styles.splash}}>
        <div class={{this.styles.splash-image-container}}>
          {{#if @concert.images}}
            <WidgetsWidget3TourScheduleResponsiveImage
              @images={{@concert.images}}
            />

          {{else}}
            <div class={{this.styles.placeholder-image}}></div>

          {{/if}}
        </div>

        <div class={{this.styles.concert-date-container}}>
          <time class={{this.styles.concert-date}}>
            {{@concert.date}}
          </time>
        </div>

        <div class={{this.styles.venue-name-container}}>
          <a href="#" class={{this.styles.concert-link}}>
            <div class={{this.styles.venue-name}}>
              {{@concert.name}}
            </div>
          </a>
        </div>
      </div>
    </ContainerQuery>
  </template>
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-3::TourSchedule': typeof WidgetsWidget3TourScheduleComponent;
  }
}
