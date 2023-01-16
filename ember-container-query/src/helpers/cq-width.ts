import { deprecate } from '@ember/debug';

import WidthHelper from '../helpers/width';

deprecate(
  'The {{cq-width}} helper has been renamed to {{width}}. Please update the helper name in your template.',
  false,
  {
    for: 'ember-container-query',
    id: 'ember-container-query.rename-cq-width-helper',
    since: {
      available: '3.2.0',
      enabled: '3.2.0',
    },
    until: '4.0.0',
    url: 'https://github.com/ijlee2/../tree/3.2.0#api',
  }
);

export default WidthHelper;
