import templateOnlyComponent from '@ember/component/template-only';

interface WidgetsWidget4MemoSignature {}

const WidgetsWidget4MemoComponent =
  templateOnlyComponent<WidgetsWidget4MemoSignature>();

export default WidgetsWidget4MemoComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-4::Memo': typeof WidgetsWidget4MemoComponent;
  }
}
