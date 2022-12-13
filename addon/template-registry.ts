import type ContainerQueryComponent from 'ember-container-query/components/container-query';
import type CqAspectRatioHelper from 'ember-container-query/helpers/cq-aspect-ratio';

export default interface EmberContainerQueryRegistry {
  ContainerQuery: typeof ContainerQueryComponent;
  'cq-aspect-ratio': typeof CqAspectRatioHelper;
}
