import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class WidgetsWidget3TourScheduleResponsiveImageComponent extends Component {
  @tracked features = {};
  @tracked src;

  @action readImages() {
    const { images } = this.args;

    // Set container query features
    const dimensions = readDimensions(images);
    const boundaries = createBoundaries(dimensions);
    this.features = createFeatures(boundaries);

    // Categorize images by features
    const imagesCategorized = images.map(image => {
      const { path, fileName, metadata } = image;

      const imageHeight = metadata.height;
      const imageWidth = metadata.width;
      const imageAspectRatio = imageWidth / imageHeight;

      const featuresMet = [];

      let index = findBucketIndex(imageAspectRatio, boundaries.aspectRatio);
      featuresMet.push(`aspectratio-${index}`);

      index = findBucketIndex(imageHeight, boundaries.height);
      featuresMet.push(`height-${index}`);

      index = findBucketIndex(imageWidth, boundaries.width);
      featuresMet.push(`width-${index}`);

      return {
        src: `/${path}/${fileName}`,
        featuresMet
      };
    });

    this.imagesCategorized = imagesCategorized;
  }

  @action setImageSource(queryResults) {
    const containerFeatures = Object.keys(queryResults).reduce((accumulator, featureName) => {
      const meetsFeature = queryResults[featureName];

      if (meetsFeature) {
        accumulator.push(featureName);
      }

      return accumulator;

    }, []);

    const imagesRanked = this.imagesCategorized
      .map(image => {
        const { src, featuresMet } = image;
        let score = 0;

        containerFeatures.forEach(feature => {
          if (featuresMet.includes(feature)) {
            score++;
          }
        });

        return {
          src,
          score
        };
      })
      .sort((a, b) => {
        if (a.score < b.score) return 1;
        if (a.score > b.score) return -1;
        return 0;
      });

    this.src = imagesRanked[0].src;
  }
}


/* TODO: Move these to a utility file */
function sortNumbers(array) {
  return array.sort((a, b) => {
    if (a > b) return 1;
    if (b > a) return -1;
    return 0;
  });
}

function readDimensions(images = []) {
  const aspectRatios = new Set();
  const heights = new Set();
  const widths = new Set();

  images.forEach(({ metadata }) => {
    const { height, width } = metadata;
    const aspectRatio = width / height;

    aspectRatios.add(aspectRatio);
    heights.add(height);
    widths.add(width);
  });

  return {
    aspectRatio: sortNumbers([...aspectRatios]),
    height: sortNumbers([...heights]),
    width: sortNumbers([...widths])
  };
}

function createBoundaries(dimensions = {}) {
  const boundaries = {
    aspectRatio: [0],
    height: [0],
    width: [0]
  };

  for (const [dimension, values] of Object.entries(dimensions)) {
    // `i` is a bucket index
    for (let i = 0; i < values.length - 1; i++) {
      const geometricMean = Math.sqrt(values[i] * values[i + 1]);

      boundaries[dimension].push(geometricMean);
    }

    boundaries[dimension].push(Infinity);
  }

  return boundaries;
}

function createFeatures(boundaries = {}) {
  const features = {};

  for (const [dimension, values] of Object.entries(boundaries)) {
    // `i` is a bucket index
    for (let i = 0; i < values.length - 1; i++) {
      const featureName = `${dimension}-${i + 1}`.toLowerCase();

      features[featureName] = {
        dimension,
        min: values[i],
        max: values[i + 1]
      }
    }
  }

  return features;
}

function findBucketIndex(value, boundaries = []) {
  let index;

  for (let i = 0; i < boundaries.length - 1; i++) {
    if (boundaries[i] <= value && value < boundaries[i + 1]) {
      index = i;
      break;
    }
  }

  return index;
}