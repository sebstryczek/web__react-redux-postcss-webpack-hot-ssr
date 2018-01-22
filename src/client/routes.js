import App from './containers/App';
import Home from './containers/Home';
import NoMatch from './containers/NoMatch';
import Page1 from './containers/Page1';
import Page2 from './containers/Page2';

const routes = [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/page1',
    component: Page1
  },
  {
    path: '/page2',
    component: Page2
  },
  {
    path: '*',
    component: NoMatch
  }
]

/*
All routes with root component (here: App), can be define as nested routes, and render from index.jsx by RenderRoutes(routes) - insted of render App component. In that case, in App component should be <RenderRoutes routes={this.props.route.routes} /> to render nested routes.
I dont used it, because:
1. I prefer flat routes array
2. React hot loader not working - when i do any changes, webpack refreshing whole page
const routes = [
  {
    path: '/',
    component: App,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home
      },
      {
        path: '/home',
        component: Home
      },
      {
        path: '/page1',
        component: Page1
      },
      {
        path: '/page2',
        component: Page2
      },
      {
        path: '*',
        component: NoMatch
      }
    ]
  }
]
*/

export default routes;
