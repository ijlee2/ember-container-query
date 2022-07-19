import type { Image } from 'dummy/data/concert';
import { findBestFittingImage as _findBestFittingImage } from 'dummy/utils/components/widgets/widget-3';
import type { Dimensions } from 'ember-container-query/modifiers/container-query';
import { modifier, NamedArgs, PositionalArgs } from 'ember-modifier';

interface FindBestFittingImageModifierSignature {
  Args: {
    Named: {
      dimensions?: Dimensions;
      images?: Array<Image>;
      onQuery: (imageSource?: string) => void;
    };
    Positional: [];
  };
  Element: Element;
}

export default modifier(function findBestFittingImage(
  element: Element,
  _: PositionalArgs<FindBestFittingImageModifierSignature>,
  named: NamedArgs<FindBestFittingImageModifierSignature>
) {
  const { dimensions, images, onQuery } = named;

  if (!dimensions || !images) {
    onQuery();
    return;
  }

  const imageSource = _findBestFittingImage(images, dimensions);
  onQuery(imageSource);
});
