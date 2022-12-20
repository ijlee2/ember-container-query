import type ContainerQueryComponent from 'ember-container-query/components/container-query';
import type CqAspectRatioHelper from 'ember-container-query/helpers/cq-aspect-ratio';
import type CqHeightHelper from 'ember-container-query/helpers/cq-height';
import type CqWidthHelper from 'ember-container-query/helpers/cq-width';
import type ContainerQueryModifier from 'ember-container-query/modifiers/container-query';

export default interface EmberContainerQueryRegistry {
  ContainerQuery: typeof ContainerQueryComponent;
  'container-query': typeof ContainerQueryModifier;
  'cq-aspect-ratio': typeof CqAspectRatioHelper;
  'cq-height': typeof CqHeightHelper;
  'cq-width': typeof CqWidthHelper;
}
