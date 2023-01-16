import templateOnlyComponent from '@ember/component/template-only';

export interface WidgetsWidget4MemoHeaderComponentSignature {
  Args: {
    cqFeatures?: Record<'small' | 'large' | 'short', boolean>;
  };
}

const WidgetsWidget4MemoHeaderComponent =
  templateOnlyComponent<WidgetsWidget4MemoHeaderComponentSignature>();

export default WidgetsWidget4MemoHeaderComponent;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-4::Memo::Header': typeof WidgetsWidget4MemoHeaderComponent;
  }
}
