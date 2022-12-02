import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import type { Image } from 'dummy/data/concert';

interface WidgetsWidget3TourScheduleResponsiveImageComponentArgs {
  images: Array<Image>;
}

export default class WidgetsWidget3TourScheduleResponsiveImageComponent extends Component<WidgetsWidget3TourScheduleResponsiveImageComponentArgs> {
  @tracked imageSource?: string;

  @action setImageSource(imageSource?: string): void {
    this.imageSource = imageSource;
  }
}
