import type { TOC } from '@ember/component/template-only';
import { hash } from '@ember/helper';
import { ContainerQuery, width } from 'ember-container-query';

import type { Concert } from '../../../data/concert';
import styles from './tour-schedule.css';
import WidgetsWidget3TourScheduleResponsiveImage from './tour-schedule/responsive-image';

interface WidgetsWidget3TourScheduleSignature {
  Args: {
    concert: Concert;
  };
}

const WidgetsWidget3TourScheduleComponent: TOC<WidgetsWidget3TourScheduleSignature> =
  <template>
    <ContainerQuery
      @features={{hash small=(width max=400)}}
      @dataAttributePrefix="cq"
      class={{styles.container}}
    >
      <div class={{styles.splash}}>
        <div class={{styles.splash-image-container}}>
          {{#if @concert.images}}
            <WidgetsWidget3TourScheduleResponsiveImage
              @images={{@concert.images}}
            />

          {{else}}
            <div class={{styles.placeholder-image}}></div>

          {{/if}}
        </div>

        <div class={{styles.concert-date-container}}>
          <time class={{styles.concert-date}}>
            {{@concert.date}}
          </time>
        </div>

        <div class={{styles.venue-name-container}}>
          <a class={{styles.concert-link}} href="#">
            <div class={{styles.venue-name}}>
              {{@concert.name}}
            </div>
          </a>
        </div>
      </div>
    </ContainerQuery>
  </template>

export default WidgetsWidget3TourScheduleComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-3::TourSchedule': typeof WidgetsWidget3TourScheduleComponent;
  }
}
