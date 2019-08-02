[![Build Status](https://travis-ci.com/mivia/react-promise-button.svg?branch=master)](https://travis-ci.com/mivia/react-promise-button) ![dependencies](https://img.shields.io/david/mivia/react-promise-button.svg) ![dev dependencies](https://img.shields.io/david/dev/mivia/react-promise-button.svg)

# React-Promise-Button
A promise-button for you react app.
## Installation
Add react-promise-button to your project by executing `npm install @mivia/react-promise-button` or `yarn add @mivia/react-promise-button`.
## Demo
## Usage
Here's an example of basic usage:
```js
import React, { Component } from 'react';
import PromiseButton from '@mivia/promise-button';

const pendingConfig = {
  className: `PromiseButton--pending`,
  children: (
    <span>
      Pending!
    </span>
  ),
};

const successConfig = {
  className: `PromiseButton--success`,
  children: (
    <span>
      Success done!
    </span>
  ),
};

export default class Example extends Component {
  onClickSuccess = () => new Promise((resolve) => {
    setTimeout(() => {
      resolve('Success!');
    }, 2000);
  })

  render() {
    return (
      <PromiseButton
        onClick={this.onClickSuccess}
        pendingConfig={pendingConfig}
        successConfig={successConfig}
      >
        Gonna be success
      </PromiseButton>
    );
  }
}
```
