import type ContainerQueryComponent from './components/container-query.ts';
import type AspectRatioHelper from './helpers/aspect-ratio.ts';
import type HeightHelper from './helpers/height.ts';
import type WidthHelper from './helpers/width.ts';
import type ContainerQueryModifier from './modifiers/container-query.ts';

export default interface EmberContainerQueryRegistry {
  ContainerQuery: typeof ContainerQueryComponent;
  'aspect-ratio': typeof AspectRatioHelper;
  'container-query': typeof ContainerQueryModifier;
  height: typeof HeightHelper;
  width: typeof WidthHelper;
}
