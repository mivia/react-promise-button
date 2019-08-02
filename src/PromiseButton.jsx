import React, { Component } from 'react';
import PropTypes from 'prop-types';
import makeCancellable from 'make-cancellable-promise';

import BUTTON_STATES from './constants';

class PromiseCancelledException extends Error {
  constructor(message, type) {
    super(message, type);
    this.name = 'PromiseCancelledException';
    this.message = message;
    this.type = type;
  }
}

const configProps = {
  children: PropTypes.node,
  className: PropTypes.string,
};

const isConfigObject = PropTypes.shape(configProps);

export default class StatefulButton extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    errorConfig: isConfigObject,
    onClick: PropTypes.func.isRequired,
    pendingConfig: isConfigObject,
    refreshTimeout: PropTypes.number,
    successConfig: isConfigObject,
  }

  static defaultProps = {
    refreshTimeout: 2000,
  };

  state = {
    buttonState: BUTTON_STATES.INIT,
  };

  componentDidUpdate() {
    clearTimeout(this.timeout);
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);

    if (this.cancellablePromise) {
      this.cancellablePromise.cancel();
    }
  }

  onClick = async () => {
    const {
      onClick,
      refreshTimeout,
    } = this.props;

    try {
      let promise = onClick();
      if (!(promise instanceof Promise)) {
        promise = Promise.resolve();
      }

      this.setState({ buttonState: BUTTON_STATES.PENDING });
      this.cancellablePromise = makeCancellable(promise);
      await this.cancellablePromise.promise;
      this.setState({ buttonState: BUTTON_STATES.SUCCESS });
    } catch (error) {
      if (error && error instanceof PromiseCancelledException) {
        return;
      }
      this.setState({ buttonState: BUTTON_STATES.ERROR });
    }

    this.timeout = setTimeout(() => {
      this.setState({ buttonState: BUTTON_STATES.INIT });
    }, refreshTimeout);
  }

  get buttonConfig() {
    const { buttonState } = this.state;
    const {
      errorConfig,
      successConfig,
      pendingConfig,
    } = this.props;

    const stateConfig = (() => {
      switch (buttonState) {
        case BUTTON_STATES.ERROR: return errorConfig;
        case BUTTON_STATES.PENDING: return pendingConfig;
        case BUTTON_STATES.SUCCESS: return successConfig;
        default: return {};
      }
    })();

    return {
      ...stateConfig,
    };
  }

  render() {
    const { buttonConfig } = this;
    const { buttonState } = this.state;
    const { className, children } = this.props;

    const buttonClassName = buttonConfig.className || className;
    const buttonChildren = buttonConfig.children || children;

    return (
      <button
        className={buttonClassName}
        disabled={buttonState === BUTTON_STATES.PENDING}
        onClick={this.onClick}
        type="button"
      >
        {buttonChildren}
      </button>
    );
  }
}
