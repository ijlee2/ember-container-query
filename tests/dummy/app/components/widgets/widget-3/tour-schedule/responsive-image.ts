import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { findBestFittingImage } from 'dummy/utils/components/widgets/widget-3';
import type { ContainerDimensions } from 'dummy/utils/components/widgets/widget-3';
import type { Image } from 'dummy/data/concert';

interface WidgetsWidget3TourScheduleResponsiveImageComponentArgs {
  images: Array<Image>;
}

export default class WidgetsWidget3TourScheduleResponsiveImageComponent extends Component<WidgetsWidget3TourScheduleResponsiveImageComponentArgs> {
  @tracked src?: string;

  @action setImageSource(dimensions: ContainerDimensions): void {
    /*
      I added a guard just in case <ContainerQuery> has yet to compute
      the container's width and height. We can check the aspect ratio
      to determine if all 3 dimensions are defined.

      In practice--at least, when I ran the app locally--all dimensions
      were defined by the time `setImageSource` was called.
    */
    if (dimensions.aspectRatio === undefined) {
      return;
    }

    this.src = findBestFittingImage(this.args.images, dimensions);
  }
}
