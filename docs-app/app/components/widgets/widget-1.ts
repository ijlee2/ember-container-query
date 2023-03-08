import templateOnlyComponent from '@ember/component/template-only';

interface WidgetsWidget1ComponentSignature {}

const WidgetsWidget1Component =
  templateOnlyComponent<WidgetsWidget1ComponentSignature>();

export default WidgetsWidget1Component;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-1': typeof WidgetsWidget1Component;
  }
}
