import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import type { Image } from 'dummy/data/concert';
import { findBestFittingImage } from 'dummy/utils/components/widgets/widget-3';
import type { Dimensions } from 'ember-container-query/modifiers/container-query';

interface WidgetsWidget3TourScheduleResponsiveImageComponentSignature {
  Args: {
    images: Array<Image>;
  };
}

export default class WidgetsWidget3TourScheduleResponsiveImageComponent extends Component<WidgetsWidget3TourScheduleResponsiveImageComponentSignature> {
  @tracked imageSource?: string;

  @action setImageSource({ dimensions }: { dimensions: Dimensions }): void {
    const { images } = this.args;

    this.imageSource = findBestFittingImage(images, dimensions);
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-3::TourSchedule::ResponsiveImage': typeof WidgetsWidget3TourScheduleResponsiveImageComponent;
  }
}
