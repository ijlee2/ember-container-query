import { inject as service } from '@ember/service';
import Component from '@glimmer/component';

export default class NavigationMenuComponent extends Component {
  @service router;

  get rootRoute() {
    const rootRoute = (this.router.currentURL || '').split('/')[1];

    return rootRoute || 'index';
  }
}
