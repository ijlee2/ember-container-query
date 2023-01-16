import templateOnlyComponent from '@ember/component/template-only';

interface WidgetsWidget1ItemComponentSignature {
  Args: {
    title: string;
  };
}

const WidgetsWidget1ItemComponent =
  templateOnlyComponent<WidgetsWidget1ItemComponentSignature>();

export default WidgetsWidget1ItemComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-1::Item': typeof WidgetsWidget1ItemComponent;
  }
}
