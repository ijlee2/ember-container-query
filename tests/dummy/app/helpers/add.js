import { helper } from '@ember/component/helper';

export default helper(function add(params) {
  return params.reduce((accumulator, value) => accumulator + value, 0);
});
