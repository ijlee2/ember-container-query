import { modifier, NamedArgs, PositionalArgs } from 'ember-modifier';

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

export default modifier(function dynamicCssGrid(
  element: Element,
  _: PositionalArgs<DynamicCssGridModifierSignature>,
  named: NamedArgs<DynamicCssGridModifierSignature>
): void {
  const { numColumns, numRows } = named;

  (
    element as HTMLElement
  ).style.gridTemplateColumns = `repeat(${numColumns}, minmax(0, 1fr))`;

  (element as HTMLElement).style.gridTemplateRows = `repeat(${numRows}, 1fr)`;
});
