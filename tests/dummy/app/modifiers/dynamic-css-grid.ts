import { modifier } from 'ember-modifier';

interface DynamicCssGridModifierSignature {
  Args: {
    Named: {
      numColumns: number;
      numRows: number;
    };
    Positional: [];
  };
  Element: Element;
}

const DynamicCssGridModifier = modifier<DynamicCssGridModifierSignature>(
  (element, _positional, named) => {
    const { numColumns, numRows } = named;

    (
      element as HTMLElement
    ).style.gridTemplateColumns = `repeat(${numColumns}, minmax(0, 1fr))`;

    (element as HTMLElement).style.gridTemplateRows = `repeat(${numRows}, 1fr)`;
  },
  { eager: false }
);

export default DynamicCssGridModifier;
