import EmberRouter from '@ember/routing/router';
import config from 'dummy/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('album');
  this.route('dashboard');
  this.route('form');
  this.route('not-found', { path: '*' });
});
