import App from './containers/App';
import Home from './containers/Home';
import NoMatch from './containers/NoMatch';
import Page1 from './containers/Page1';
import Page2 from './containers/Page2';

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

export default routes;
