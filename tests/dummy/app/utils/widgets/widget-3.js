/*
  This recommendation system makes 2 assumptions:

  - Users prefer images whose aspect ratio is close to the container's.
  - Users prefer images whose height and width are larger than the container's.
*/
export function findBestFittingImage(images, containerDimensions) {
  if (images.length === 0) {
    return;
  }

  const { aspectRatio, height, width } = containerDimensions;

  const imagesRanked = images.map(image => {
    const { url, metadata } = image;

    const imageHeight = metadata.height;
    const imageWidth = metadata.width;
    const imageAspectRatio = imageWidth / imageHeight;

    const arMetric = Math.abs(imageAspectRatio - aspectRatio);
    const hwMetric = ((imageHeight - height) ** 3 + (imageWidth - width) ** 3) ** (1/3);

    return {
      url,
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

  return imagesRanked[0].url;
}