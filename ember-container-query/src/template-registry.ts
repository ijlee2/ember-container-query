import type ContainerQueryComponent from './components/container-query';
import type AspectRatioHelper from './helpers/aspect-ratio';
import type HeightHelper from './helpers/height';
import type WidthHelper from './helpers/width';
import type ContainerQueryModifier from './modifiers/container-query';

export default interface EmberContainerQueryRegistry {
  ContainerQuery: typeof ContainerQueryComponent;
  'aspect-ratio': typeof AspectRatioHelper;
  'container-query': typeof ContainerQueryModifier;
  height: typeof HeightHelper;
  width: typeof WidthHelper;
}
