import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { containerQuery, type Dimensions } from 'ember-container-query';

import type { Image } from '../../../../data/concert';
import { findBestFittingImage } from '../../../../utils/components/widgets/widget-3';
import styles from './responsive-image.css';

interface WidgetsWidget3TourScheduleResponsiveImageSignature {
  Args: {
    images: Image[];
  };
}

export default class WidgetsWidget3TourScheduleResponsiveImageComponent extends Component<WidgetsWidget3TourScheduleResponsiveImageSignature> {
  @tracked imageSource?: string;

  @action setImageSource({ dimensions }: { dimensions: Dimensions }): void {
    const { images } = this.args;

    this.imageSource = findBestFittingImage(images, dimensions);
  }

  <template>
    <div
      class={{styles.image-container}}
      {{containerQuery debounce=300 onQuery=this.setImageSource}}
    >
      {{#if this.imageSource}}
        {{! template-lint-disable no-redundant-role }}
        <img
          alt=""
          class={{styles.image}}
          data-test-image="Concert"
          role="presentation"
          src={{this.imageSource}}
        />
        {{! template-lint-enable no-redundant-role }}
      {{/if}}
    </div>
  </template>
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-3::TourSchedule::ResponsiveImage': typeof WidgetsWidget3TourScheduleResponsiveImageComponent;
  }
}
