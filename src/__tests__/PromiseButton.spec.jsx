import React from 'react';
import { shallow } from 'enzyme';
import { waitForState } from 'enzyme-async-helpers';

import PromiseButton from '../PromiseButton';
import BUTTON_STATES from '../constants';

describe('<PromiseButton /> component', () => {
  const onClickSuccess = jest.fn(() => Promise.resolve());
  const onClickFail = jest.fn(() => Promise.reject());

  it('uses props children text when no config is provided', () => {
    const component = shallow(
      <PromiseButton
        onClick={onClickSuccess}
      >
        test text
      </PromiseButton>,
    );

    expect(component.text()).toBe('test text');
  });

  it('applies pendingConfig when promise succeeds', () => {
    const buttonPendingText = 'pending';
    const props = {
      onClick: onClickSuccess,
      pendingConfig: {
        children: (
          <span>
            {buttonPendingText}
          </span>
        ),
      },
    };
    const component = shallow(
      <PromiseButton {...props}>
          test text
      </PromiseButton>,
    );
    component.setState({
      buttonState: BUTTON_STATES.PENDING,
    });

    expect(component.text()).toBe(buttonPendingText);
  });

  it('applies successConfig when promise succeeds', async () => {
    const buttonSuccessText = 'success';
    const props = {
      onClick: onClickSuccess,
      successConfig: {
        children: (
          <span>
            {buttonSuccessText}
          </span>
        ),
      },
    };
    const component = shallow(
      <PromiseButton {...props}>
        test text
      </PromiseButton>,
    );

    component.find('button').simulate('click');
    expect(props.onClick).toBeCalled();
    await waitForState(component, state => state.buttonState === BUTTON_STATES.SUCCESS);
    expect(component.find('span').text()).toBe(buttonSuccessText);
  });

  it('applies errorConfig when promise fails', async () => {
    const buttonErrorText = 'error';
    const props = {
      onClick: onClickFail,
      errorConfig: {
        children: (
          <span>
            {buttonErrorText}
          </span>
        ),
      },
    };
    const component = shallow(
      <PromiseButton {...props}>
          test text
      </PromiseButton>,
    );

    component.find('button').simulate('click');
    expect(props.onClick).toBeCalled();
    await waitForState(component, state => state.buttonState === BUTTON_STATES.ERROR);
    expect(component.find('span').text()).toBe(buttonErrorText);
  });

  it('uses props children when promise succeeded and successConfig was not provided', async () => {
    const buttonInitText = 'init';
    const props = {
      onClick: onClickSuccess,
      errorConfig: {
        children: (
          <span>
            {'error'}
          </span>
        ),
      },
    };
    const component = shallow(
      <PromiseButton {...props}>
        {buttonInitText}
      </PromiseButton>,
    );

    component.find('button').simulate('click');
    expect(props.onClick).toBeCalled();
    await waitForState(component, state => state.buttonState === BUTTON_STATES.SUCCESS);
    expect(component.text()).toBe(buttonInitText);
  });

  it('uses props children text when promise failed and errorConfig was not provided', async () => {
    const buttonInitText = 'init';
    const props = {
      onClick: onClickFail,
      successConfig: {
        children: (
          <span>
            sucess
          </span>
        ),
      },
    };
    const component = shallow(
      <PromiseButton {...props}>
        {buttonInitText}
      </PromiseButton>,
    );

    component.find('button').simulate('click');
    expect(props.onClick).toBeCalled();
    await waitForState(component, state => state.buttonState === BUTTON_STATES.ERROR);
    expect(component.text()).toBe(buttonInitText);
  });

  it('disables button when button state is PENDING', () => {
    const props = {
      onClick: onClickSuccess,
    };
    const component = shallow(
      <PromiseButton {...props}>
          test text
      </PromiseButton>,
    );
    component.setState({
      buttonState: BUTTON_STATES.PENDING,
    });
    component.update();

    expect(component.prop('disabled')).toBe(true);
  });
});
