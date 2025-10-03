import { ContainerQuery } from 'ember-container-query';

import RouteTemplate from 'ember-route-template';

export default RouteTemplate(<template>
<div>
  <h1>Welcome!</h1>

  <ContainerQuery>
    <p>
      This is the
      <code>test-app</code>
      for
      <code>ember-container-query</code>. Did you want to run
      the
      <code>docs-app</code>
      instead?
    </p>
  </ContainerQuery>
</div>
</template>);
