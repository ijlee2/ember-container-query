import { modifier } from 'ember-modifier';

interface DynamicCssGridModifierSignature {
  Args: {
    Named: {
      numColumns: number;
      numRows: number;
    };
    Positional: [];
  };
  Element: HTMLElement;
}

const DynamicCssGridModifier = modifier<DynamicCssGridModifierSignature>(
  (element, _positional, named) => {
    const { numColumns, numRows } = named;

    element.style.gridTemplateColumns = `repeat(${numColumns}, minmax(0, 1fr))`;
    element.style.gridTemplateRows = `repeat(${numRows}, 1fr)`;
  },
);

export default DynamicCssGridModifier;
