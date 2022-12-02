import type { Image } from 'dummy/data/concert';

export type ContainerDimensions = {
  aspectRatio: number;
  height: number;
  width: number;
};

/*
  This recommendation system makes 3 assumptions:

  - Users prefer images whose aspect ratio is close to the container's.
  - Users prefer images whose height and width are larger than the container's.
  - If all images are smaller than the container, users want the image that is
    the largest of all. In other words, that image's height and width match the
    container's the closest.
*/
export function findBestFittingImage(
  images: Array<Image>,
  containerDimensions: ContainerDimensions
): string | undefined {
  if (images.length === 0) {
    return;
  }

  const { aspectRatio, height, width } = containerDimensions;

  const imagesRanked = images
    .map((image) => {
      const { url, metadata } = image;

      const imageHeight = metadata.height;
      const imageWidth = metadata.width;
      const imageAspectRatio = imageWidth / imageHeight;

      const arMetric = Math.abs(imageAspectRatio - aspectRatio);
      const hwMetric =
        ((imageHeight - height) ** 3 + (imageWidth - width) ** 3) ** (1 / 3);
      const hwTiebreaker =
        ((imageHeight - height) ** 2 + (imageWidth - width) ** 2) ** (1 / 2);

      return {
        url,
        arMetric,
        hwMetric: Number.isNaN(hwMetric) ? Infinity : hwMetric,
        hwTiebreaker,
      };
    })
    .sort((a, b) => {
      if (a.arMetric > b.arMetric) {
        return 1;
      }

      if (a.arMetric < b.arMetric) {
        return -1;
      }

      if (a.hwMetric > b.hwMetric) {
        return 1;
      }

      if (a.hwMetric < b.hwMetric) {
        return -1;
      }

      return a.hwTiebreaker - b.hwTiebreaker;
    });

  return imagesRanked[0]!.url;
}
