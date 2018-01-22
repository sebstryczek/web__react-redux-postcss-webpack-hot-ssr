import React from 'react';
import { Switch, Route } from 'react-router-dom';


const RenderRoutes = ({routes}) =>
  <Switch>
    {routes.map((route, i) => (
      <Route key={route.key || i}
        path={ route.path }
        exact={ route.exact }
        strict={ route.strict }
        render={ props => (<route.component {...props} route={route} />) }
      />
    ))}
  </Switch>

export default RenderRoutes;
