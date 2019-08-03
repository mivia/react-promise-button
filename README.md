[![Build Status](https://travis-ci.com/mivia/react-promise-button.svg?branch=master)](https://travis-ci.com/mivia/react-promise-button) ![dependencies](https://img.shields.io/david/mivia/react-promise-button.svg) ![dev dependencies](https://img.shields.io/david/dev/mivia/react-promise-button.svg)

# React-Promise-Button
A promise-button for you react app.
## Installation
Add react-promise-button to your project by executing `npm install @mivia/react-promise-button` or `yarn add @mivia/react-promise-button`.
## Demo
[Preview](https://mivia.github.io/react-promise-button/) available!
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
## User guide
### Props
|Prop name|Description|Default value|Example values|
|----|----|----|----|
|className|Class name(s) that will be added to the button element.|n/a|`"class1 class2"`|
|onClick|A required callback function returning a promise.|n/a|() => Promise.resolve()|
|pendingConfig|Config including className and children that decorates the button when promise is pending.|||
|successConfig|Config including className and children that decorates the button when promise has been successful.|||
|errorConfig|Config including className and children that decorates the button when promise has failed.|||
|refreshTimeout|Time that has to pass before switching back to initial config of the button after the promise is done, in miliseconds.|`2000`|`3000`|

