import templateOnlyComponent from '@ember/component/template-only';

export interface WidgetsWidget4MemoBodyComponentSignature {
  Args: {
    cqFeatures?: Record<'small' | 'large' | 'short', boolean>;
  };
}

const WidgetsWidget4MemoBodyComponent =
  templateOnlyComponent<WidgetsWidget4MemoBodyComponentSignature>();

export default WidgetsWidget4MemoBodyComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-4::Memo::Body': typeof WidgetsWidget4MemoBodyComponent;
  }
}
