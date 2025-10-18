import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export class UiForm {
  @tracked data: Record<string, unknown> = {
    donation: 1000,
    email: 'zoey@emberjs.com',
    message: 'I 🧡 CSS modules!',
    name: 'Zoey',
    sortBy: 'name:asc',
    subscribe: true,
  };

  @action updateData({ key, value }: { key: string; value: unknown }): void {
    this.data = {
      ...this.data,
      [key]: value,
    };
  }
}
