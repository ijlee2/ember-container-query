import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class WidgetsWidget3TourScheduleResponsiveImageComponent extends Component {
  @tracked src;

  @action setImageSource(dimensions) {
    const { aspectRatio, height, width } = dimensions;

    if (!aspectRatio) {
      return;
    }

    const imagesRanked = this.args.images
      .map(image => {
        const { path, fileName, metadata } = image;

        const imageHeight = metadata.height;
        const imageWidth = metadata.width;
        const imageAspectRatio = imageWidth / imageHeight;

        const arMetric = Math.abs(imageAspectRatio - aspectRatio);
        const hwMetric = ((imageHeight - height) ** 3 + (imageWidth - width) ** 3) ** (1/3);

        return {
          src: `/${path}/${fileName}`,
          arMetric,
          hwMetric: Number.isNaN(hwMetric) ? Infinity : hwMetric
        };
      })
      .sort((a, b) => {
        if (a.arMetric > b.arMetric) return 1;
        if (a.arMetric < b.arMetric) return -1;

        if (a.hwMetric > b.hwMetric) return 1;
        if (a.hwMetric < b.hwMetric) return -1;

        return 0;
      });

    this.src = imagesRanked[0].src;
  }
}