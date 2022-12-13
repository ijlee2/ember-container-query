import type ContainerQueryComponent from 'ember-container-query/components/container-query';
import type CqAspectRatioHelper from 'ember-container-query/helpers/cq-aspect-ratio';
import type CqHeightHelper from 'ember-container-query/helpers/cq-height';

export default interface EmberContainerQueryRegistry {
  ContainerQuery: typeof ContainerQueryComponent;
  'cq-aspect-ratio': typeof CqAspectRatioHelper;
  'cq-height': typeof CqHeightHelper;
}
