import type ContainerQueryComponent from 'ember-container-query/components/container-query';
import type AspectRatioHelper from 'ember-container-query/helpers/aspect-ratio';
import type HeightHelper from 'ember-container-query/helpers/height';
import type WidthHelper from 'ember-container-query/helpers/width';
import type ContainerQueryModifier from 'ember-container-query/modifiers/container-query';

export default interface EmberContainerQueryRegistry {
  ContainerQuery: typeof ContainerQueryComponent;
  'aspect-ratio': typeof AspectRatioHelper;
  'container-query': typeof ContainerQueryModifier;
  height: typeof HeightHelper;
  width: typeof WidthHelper;
}
