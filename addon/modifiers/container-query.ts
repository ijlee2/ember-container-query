import Modifier from 'ember-modifier';

interface ContainerQueryModifierSignature {
  Args: {
    Named: {};
    Positional: [];
  };
  Element: Element;
}

export default class ContainerQueryModifier extends Modifier<ContainerQueryModifierSignature> {
  modify(element: Element): void {
    this.queryContainer(element);
  }

  private queryContainer(element: Element): void {
    console.log(element);
  }
}
