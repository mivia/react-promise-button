import React, { PureComponent } from 'react';
import PromiseButton from '@mivia/promise-button';

import BUTTON_STATES from '../src/constants';

const pendingConfig = {
  className: `PromiseButton--${BUTTON_STATES.PENDING}`,
  children: (
    <span>
      Pending!
    </span>
  ),
};

const successConfig = {
  className: `PromiseButton--${BUTTON_STATES.SUCCESS}`,
  children: (
    <span>
      Success done!
    </span>
  ),
};

const errorConfig = {
  className: `PromiseButton--${BUTTON_STATES.ERROR}`,
  children: (
    <span>
      Error done!
    </span>
  ),
};

export default class Test extends PureComponent {
  onClickSuccess = () => new Promise((resolve) => {
    setTimeout(() => {
      resolve('Success!');
    }, 2000);
  })

  onClickError = () => new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('Error!'));
    }, 2000);
  })

  renderSuccessButton = () => (
    <PromiseButton
      onClick={this.onClickSuccess}
      pendingConfig={pendingConfig}
      successConfig={successConfig}
    >
      Gonna be success
    </PromiseButton>
  )

  renderErrorButton = () => (
    <PromiseButton
      className="check"
      errorConfig={errorConfig}
      onClick={this.onClickError}
      pendingConfig={pendingConfig}
    >
      Gonna be error
    </PromiseButton>
  )

  render() {
    return (
      <>
        {this.renderSuccessButton()}
        {this.renderErrorButton()}
      </>
    );
  }
}
