import templateOnlyComponent from '@ember/component/template-only';

interface WidgetsWidget4ComponentSignature {}

const WidgetsWidget4Component =
  templateOnlyComponent<WidgetsWidget4ComponentSignature>();

export default WidgetsWidget4Component;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-4': typeof WidgetsWidget4Component;
  }
}
