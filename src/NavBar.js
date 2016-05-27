import NavigationBar from 'react-native-navbar';
import React, { Component, StyleSheet } from 'react';

const leftButton = (props = {}, transitioning) => {
  if (props.navLeft && React.isValidElement( props.navLeft ) ) {
    return props.navLeft;
  }

  let handler = () => {};
  let title = '';

  if (!transitioning && props.router && props.router.routes.length > 1) {
    handler = props.actions.pop;
    title = 'Back';
  }

  return {
    handler: props.navLeftHandler || handler,
    style: props.navLeftStyle || {},
    tintColor: props.navLeftColor || '#037AFF',
    title: props.navLeftTitle || title,
  };
};

const rightButton = (props = {}) => {
  if (props.navRight && React.isValidElement( props.navRight ) ) {
    return props.navRight;
  }

  return {
    handler: props.navRightHandler || (() => {}),
    style: props.navRightStyle || {},
    tintColor: props.navRightColor || '#037AFF',
    title: props.navRightTitle || '',
  };
};

const statusBar = props => ({
  hidden: props.statusHidden || false,
  style: props.statusStyle || 'default',
});

const title = props => {
  if (props.navTitle && React.isValidElement( props.navTitle ) ) {
    return props.navTitle;
  }

  return {
    style: props.navTitleStyle || {},
    tintColor: props.navTitleColor || '#030303',
    title: props.title || '',
  };
};

class NavBarBase extends Component {
  componentWillMount() {
    this.onDidFocusNavigationSub =
      this.props.navigator.navigationContext.addListener(
        'didfocus', this.onDidFocus.bind(this)
      );
    this.onWillFocusNavigationSub =
      this.props.navigator.navigationContext.addListener(
        'willfocus', this.onWillFocus.bind(this)
      );
  }

  componentWillUnmount() {
    if (this.onDidFocusNavigationSub) {
      this.onDidFocusNavigationSub.remove();
      this.onDidFocusNavigationSub = null;
    }

    if (this.onWillFocusNavigationSub) {
      this.onWillFocusNavigationSub.remove();
      this.onWillFocusNavigationSub = null;
    }
  }

  render() {
    return (
      <NavigationBar
        leftButton={leftButton(this.props, this.transitioning)}
        rightButton={rightButton(this.props)}
        statusBar={statusBar(this.props)}
        tintColor={this.props.navTint || 'white'}
        title={title(this.props)}
        style={this.props.style}
        />
    );
  }

  onDidFocus(event) {
    this.transitioning = false;
  }

  onWillFocus(event) {
    this.transitioning = true;
  }
}

class NavBar extends Component {
  render() {
    return <NavBarBase {...this.props} />;
  }
}

module.exports = { NavBar };
