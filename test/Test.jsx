import React, { PureComponent } from 'react';
import PromiseButton from '@mivia/react-promise-button';

import './Test.less';
import warningIcon from './warning.svg';
import loadingIcon from './loading.svg';
import tickIcon from './tick.svg';

const pendingConfig = {
  className: 'orange',
  children: (
    <img alt="loading icon" src={loadingIcon} />
  ),
};

const successConfig = {
  className: 'green',
  children: (
    <>
      <span>
        Success done!
      </span>
      <img alt="tick icon" className="TickIcon" src={tickIcon} />
    </>
  ),
};

const errorConfig = {
  className: 'red',
  children: (
    <>
      <span>
        Error done!
      </span>
      <img alt="warning icon" className="WarningIcon" src={warningIcon} />
    </>
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

  renderNoPendingConfigButton = () => (
    <>
      <p>
        Callback function returning resolving promise triggers only
        success or error config when pending config was not provided:
      </p>
      <PromiseButton
        className="blue"
        onClick={this.onClickSuccess}
        successConfig={successConfig}
      >
      No pending config
      </PromiseButton>
    </>
  )

  renderNoPromiseButton = () => (
    <>
      <p>
        Callback function that does not return a promise does not crash the button
         - callback function is turned into immidiate resolving promise:
      </p>
      <PromiseButton
        className="blue"
        onClick={() => {}}
        pendingConfig={pendingConfig}
        successConfig={successConfig}
      >
      No promise
      </PromiseButton>
    </>
  )

  renderSuccessButton = () => (
    <>
      <p>
        Callback function returning resolving promise triggers pending & success config:
      </p>
      <PromiseButton
        className="blue"
        onClick={this.onClickSuccess}
        pendingConfig={pendingConfig}
        successConfig={successConfig}
      >
      Gonna be success
      </PromiseButton>
    </>
  )

  renderErrorButton = () => (
    <>
      <p>
        Callback function returning rejecting promise triggers pending & error config:
      </p>
      <PromiseButton
        className="blue"
        errorConfig={errorConfig}
        onClick={this.onClickError}
        pendingConfig={pendingConfig}
      >
      Gonna be error
      </PromiseButton>
    </>
  )

  render() {
    return (
      <>
        <h2>React-Promise-Button</h2>
        <div className="Container">
          <div className="Button-wrapper">
            {this.renderSuccessButton()}
          </div>
          <div className="Button-wrapper">
            {this.renderErrorButton()}
          </div>
          <div className="Button-wrapper">
            {this.renderNoPromiseButton()}
          </div>
          <div className="Button-wrapper">
            {this.renderNoPendingConfigButton()}
          </div>
        </div>
      </>
    );
  }
}
