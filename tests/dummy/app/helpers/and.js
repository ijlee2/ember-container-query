import { helper } from '@ember/component/helper';

export default helper(
  function and(params) {
    return params[0] && params[1];
  }
);