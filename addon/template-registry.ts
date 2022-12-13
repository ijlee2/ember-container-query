import type ContainerQueryComponent from 'ember-container-query/components/container-query';

export default interface EmberContainerQueryRegistry {
  ContainerQuery: typeof ContainerQueryComponent;
}
