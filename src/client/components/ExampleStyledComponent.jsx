import React from 'react';
import styled, { css } from 'styled-components';

const Button = styled.button`
  border-radius: 3px;
  padding: 0.25em 1em;
  margin: 0 1em;
  background: transparent;
  color: purple;
  border: 2px solid purple;

  ${props => props.primary && css`
    background: purple;
    color: white;
  `}
`;

class Test extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Button>Normal Button</Button>
        <Button primary>Primary Button</Button>
      </div>
    );
  }
}

export default Test;
