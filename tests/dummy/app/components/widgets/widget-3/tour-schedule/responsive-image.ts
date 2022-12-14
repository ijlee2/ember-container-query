import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import type { Image } from 'dummy/data/concert';
import { findBestFittingImage } from 'dummy/utils/components/widgets/widget-3';
import type { Dimensions } from 'ember-container-query/modifiers/container-query';

interface WidgetsWidget3TourScheduleResponsiveImageComponentArgs {
  images: Array<Image>;
}

export default class WidgetsWidget3TourScheduleResponsiveImageComponent extends Component<WidgetsWidget3TourScheduleResponsiveImageComponentArgs> {
  @tracked imageSource?: string;

  @action setImageSource({ dimensions }: { dimensions: Dimensions }): void {
    const { images } = this.args;

    this.imageSource = findBestFittingImage(images, dimensions);
  }
}
