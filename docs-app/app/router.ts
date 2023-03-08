import EmberRouter from '@embroider/router';

import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('album');
  this.route('dashboard');
  this.route('form');
  this.route('products');

  this.route('not-found', { path: '*' });
});
