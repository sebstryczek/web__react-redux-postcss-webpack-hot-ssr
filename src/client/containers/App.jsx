import React from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import routes from '../routes';
import RenderRoutes from '../components/helpers/RenderRoutes';
import Page3 from './Page3';
import Example from '../components/Example';

import { fetchData } from '../actions/fetchDataActions';

import './App.css';

class App extends React.Component {
  componentDidMount() {
    this.props.fetchData();
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
  }

  render() {
    const data = this.props.data || [];
    return (
      <div>
        <h1>App</h1>
        <Example />
        {
          this.props.data && this.props.data.map(
            (item, i) => <p key={i}>{item}</p>
          )
        }
        <RenderRoutes routes={routes} />
        <Route path="/page3/" component={Page3} />
        <Route path="/page4/" render={() => <h2>Page 4</h2>} />
        <Route exact path="/page4/sub" render={() => <h2>Page 4 Sub</h2>} />
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return { ...state };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: () => dispatch(fetchData())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
