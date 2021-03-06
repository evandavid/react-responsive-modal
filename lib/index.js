'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var cx = _interopDefault(require('classnames'));
var PropTypes = _interopDefault(require('prop-types'));
var reactLifecyclesCompat = require('react-lifecycles-compat');
var Portal = _interopDefault(require('react-minimalist-portal'));
var CSSTransition = _interopDefault(require('react-transition-group/CSSTransition'));
var noScroll = _interopDefault(require('no-scroll'));

var CloseIcon = function CloseIcon(_ref) {
  var classes = _ref.classes,
      classNames = _ref.classNames,
      styles = _ref.styles,
      closeIconSize = _ref.closeIconSize,
      closeIconSvgPath = _ref.closeIconSvgPath,
      onClickCloseIcon = _ref.onClickCloseIcon;
  return React__default.createElement(
    'button',
    {
      className: cx(classes.closeButton, classNames.closeButton),
      style: styles.closeButton,
      onClick: onClickCloseIcon
    },
    React__default.createElement(
      'svg',
      {
        className: cx(classes.closeIcon, classNames.closeIcon),
        style: styles.closeIcon,
        xmlns: 'http://www.w3.org/2000/svg',
        width: closeIconSize,
        height: closeIconSize,
        viewBox: '0 0 36 36'
      },
      closeIconSvgPath
    )
  );
};

CloseIcon.propTypes = {
  classNames: PropTypes.object.isRequired,
  styles: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  closeIconSize: PropTypes.number.isRequired,
  closeIconSvgPath: PropTypes.node.isRequired,
  onClickCloseIcon: PropTypes.func.isRequired
};

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = ".styles_overlay__CLSq- {\n  background: rgba(0, 0, 0, 0.75);\n  display: flex;\n  align-items: flex-start;\n  justify-content: center;\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  overflow-y: auto;\n  overflow-x: hidden;\n  z-index: 1000;\n  padding: 1.2rem;\n}\n.styles_overlayCenter__YHoO7 {\n  align-items: center;\n}\n.styles_modal__gNwvD {\n  max-width: 800px;\n  position: relative;\n  padding: 1.2rem;\n  background: #ffffff;\n  background-clip: padding-box;\n  box-shadow: 0 12px 15px 0 rgba(0, 0, 0, 0.25);\n}\n.styles_closeButton__20ID4 {\n  position: absolute;\n  top: 14px;\n  right: 14px;\n  border: none;\n  padding: 0;\n  background-color: transparent;\n  display: flex;\n}\n.styles_closeIcon__1QwbI {\n}\n.styles_transitionEnter__3j_-a {\n  opacity: 0.01;\n}\n.styles_transitionEnterActive___eQs7 {\n  opacity: 1;\n  transition: opacity 500ms cubic-bezier(0.23, 1, 0.32, 1);\n}\n.styles_transitionExit__1KmEf {\n  opacity: 1;\n}\n.styles_transitionExitActive__1nQXw {\n  opacity: 0.01;\n  transition: opacity 500ms cubic-bezier(0.23, 1, 0.32, 1);\n}\n";
var cssClasses = { "overlay": "styles_overlay__CLSq-", "overlayCenter": "styles_overlayCenter__YHoO7", "modal": "styles_modal__gNwvD", "closeButton": "styles_closeButton__20ID4", "closeIcon": "styles_closeIcon__1QwbI", "transitionEnter": "styles_transitionEnter__3j_-a", "transitionEnterActive": "styles_transitionEnterActive___eQs7", "transitionExit": "styles_transitionExit__1KmEf", "transitionExitActive": "styles_transitionExitActive__1nQXw" };
styleInject(css, { "insertAt": "top" });

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var scrollbarSize = void 0;

var Modal = function (_Component) {
  _inherits(Modal, _Component);

  _createClass(Modal, null, [{
    key: 'getDerivedStateFromProps',
    value: function getDerivedStateFromProps(nextProps, prevState) {
      if (!prevState.showPortal && nextProps.open) {
        return {
          showPortal: true
        };
      }
      return null;
    }
  }]);

  function Modal(props) {
    _classCallCheck(this, Modal);

    var _this = _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this, props));

    _this.handleOpen = function () {
      _this.blockScroll();
      document.addEventListener('keydown', _this.handleKeydown);
    };

    _this.handleClose = function () {
      _this.unblockScroll();
      document.removeEventListener('keydown', _this.handleKeydown);
    };

    _this.handleClickOverlay = function (event) {
      if (_this.shouldClose === null) {
        _this.shouldClose = true;
      }

      if (!_this.shouldClose) {
        _this.shouldClose = null;
        return;
      }

      if (_this.props.onOverlayClick) {
        _this.props.onOverlayClick(event);
      }

      if (_this.props.closeOnOverlayClick) {
        _this.props.onClose(event);
      }

      _this.shouldClose = null;
    };

    _this.handleClickCloseIcon = function (event) {
      _this.props.onClose(event);
    };

    _this.handleKeydown = function (event) {
      if (event.keyCode !== 27) {
        return;
      }

      if (_this.props.onEscKeyDown) {
        _this.props.onEscKeyDown(event);
      }

      if (_this.props.closeOnEsc) {
        _this.props.onClose(event);
      }
    };

    _this.handleModalEvent = function () {
      _this.shouldClose = false;
    };

    _this.handleEntered = function () {
      if (_this.props.onEntered) {
        _this.props.onEntered();
      }
    };

    _this.handleExited = function () {
      if (_this.props.onExited) {
        _this.props.onExited();
      }

      _this.setState({ showPortal: false });
      _this.unblockScroll();
    };

    _this.unblockScroll = function () {
      var openedModals = document.getElementsByClassName(_this.props.classes.modal);

      if (openedModals.length === 1) {
        var header = document.getElementById('header');
        var shadowTable = document.getElementById('shadowTable');
        var affected = document.querySelectorAll('[data-affectedbymodal="true"]');
        var hasScrollbar = window.innerWidth > document.documentElement.clientWidth;
        if (hasScrollbar) _this.scrollWidth = _this.getScrollbarSize();else _this.scrollWidth = 0;

        noScroll.off();
        if (header) header.setAttribute('style', 'left: 0px !important');
        if (shadowTable) shadowTable.style.left = '50%';
        if (affected && affected.length) {
          for (var i = 0; i < affected.length; i++) {
            affected[i].setAttribute('style', 'left: 0px !important');
          }
        }
      }
    };

    _this.state = {
      showPortal: props.open
    };
    _this.shouldClose = null;
    _this.scrollWidth = 15;
    return _this;
  }

  _createClass(Modal, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var hasScrollbar = window.innerWidth > document.documentElement.clientWidth;

      if (hasScrollbar) this.scrollWidth = this.getScrollbarSize();else this.scrollWidth = 0;

      if (this.props.open) {
        this.handleOpen();
      }
    }
  }, {
    key: 'getScrollbarSize',
    value: function getScrollbarSize() {
      if (typeof scrollbarSize !== 'undefined') return scrollbarSize;
      var doc = document.documentElement;
      var dummyScroller = document.createElement('div');
      dummyScroller.setAttribute('style', 'width:99px;height:99px;' + 'position:absolute;top:-9999px;overflow:scroll;');
      doc.appendChild(dummyScroller);
      scrollbarSize = dummyScroller.offsetWidth - dummyScroller.clientWidth;
      doc.removeChild(dummyScroller);
      return scrollbarSize;
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevState.showPortal && !this.state.showPortal) {
        this.handleClose();
      } else if (!prevProps.open && this.props.open) {
        this.handleOpen();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      var app = document.getElementById('app');
      if (app) app.style.filter = 'none';
      noScroll.off();
      if (this.props.open) {
        this.handleClose();
      }
    }
  }, {
    key: 'blockScroll',


    // eslint-disable-next-line class-methods-use-this
    value: function blockScroll() {
      var app = document.getElementById('app');
      if (app) app.style.filter = 'blur(4px)';
      var header = document.getElementById('header');
      var shadowTable = document.getElementById('shadowTable');
      var affected = document.querySelectorAll('[data-affectedbymodal="true"]');
      var hasScrollbar = window.innerWidth > document.documentElement.clientWidth;
      if (hasScrollbar) this.scrollWidth = this.getScrollbarSize();else this.scrollWidth = 0;
      noScroll.on();
      if (header) header.setAttribute('style', 'left: -' + (this.scrollWidth ? this.scrollWidth - 7 : 0) + 'px !important');
      if (shadowTable) {
        if (this.scrollWidth * -1 < 0) {
          shadowTable.style.left = 'calc(50% - ' + this.scrollWidth + 'px)';
        } else {
          shadowTable.style.left = 'calc(50% - ' + this.scrollWidth * -1 + 'px)';
        }
      }
      if (affected && affected.length) {
        for (var i = 0; i < affected.length; i++) {
          affected[i].setAttribute('style', 'left: -' + this.scrollWidth + 'px !important');
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          open = _props.open,
          center = _props.center,
          classes = _props.classes,
          classNames = _props.classNames,
          styles = _props.styles,
          showCloseIcon = _props.showCloseIcon,
          closeIconSize = _props.closeIconSize,
          closeIconSvgPath = _props.closeIconSvgPath,
          animationDuration = _props.animationDuration;
      var showPortal = this.state.showPortal;


      if (!showPortal) {
        return null;
      }

      return React__default.createElement(
        Portal,
        null,
        React__default.createElement(
          CSSTransition,
          {
            'in': open,
            appear: true,
            classNames: {
              appear: classNames.transitionEnter || classes.transitionEnter,
              appearActive: classNames.transitionEnterActive || classes.transitionEnterActive,
              enter: classNames.transitionEnter || classes.transitionEnter,
              enterActive: classNames.transitionEnterActive || classes.transitionEnterActive,
              exit: classNames.transitionExit || classes.transitionExit,
              exitActive: classNames.transitionExitActive || classes.transitionExitActive
            },
            timeout: animationDuration,
            onEntered: this.handleEntered,
            onExited: this.handleExited,
            onExiting: function onExiting() {
              var app = document.getElementById('app');
              if (app) app.style.filter = 'none';
            }
          },
          React__default.createElement(
            'div',
            {
              className: cx(classes.overlay, center ? classes.overlayCenter : null, classNames.overlay),
              onClick: this.handleClickOverlay,
              style: styles.overlay
            },
            React__default.createElement(
              'div',
              {
                className: cx(classes.modal, classNames.modal),
                style: styles.modal,
                onMouseDown: this.handleModalEvent,
                onMouseUp: this.handleModalEvent,
                onClick: this.handleModalEvent
              },
              this.props.children,
              showCloseIcon && React__default.createElement(CloseIcon, {
                classes: classes,
                classNames: classNames,
                styles: styles,
                closeIconSize: closeIconSize,
                closeIconSvgPath: closeIconSvgPath,
                onClickCloseIcon: this.handleClickCloseIcon
              })
            )
          )
        )
      );
    }
  }]);

  return Modal;
}(React.Component);

Modal.propTypes = {
  /**
   * Is the modal closable when user press esc key.
   */
  closeOnEsc: PropTypes.bool,
  /**
   * Is the modal closable when user click on overlay.
   */
  closeOnOverlayClick: PropTypes.bool,
  /**
   * Callback fired when the Modal is open and the animation is finished.
   */
  onEntered: PropTypes.func,
  /**
   * Callback fired when the Modal has exited and the animation is finished.
   */
  onExited: PropTypes.func,
  /**
   * Callback fired when the Modal is requested to be closed by a click on the overlay or when user press esc key.
   */
  onClose: PropTypes.func.isRequired,
  /**
   * Callback fired when the escape key is pressed.
   */
  onEscKeyDown: PropTypes.func,
  /**
   * Callback fired when the overlay is clicked.
   */
  onOverlayClick: PropTypes.func,
  /**
   * Control if the modal is open or not.
   */
  open: PropTypes.bool.isRequired,
  /**
   * An object containing classNames to style the modal, can have properties 'overlay' (classname for overlay div), 'modal' (classname for modal content div), 'closeButton' (classname for the button that contain the close icon), 'closeIcon' (classname for close icon svg). You can customize the transition with 'transitionEnter', 'transitionEnterActive', 'transitionExit', 'transitionExitActive'
   */
  classNames: PropTypes.object,
  /**
   * An object containing the styles objects to style the modal, can have properties 'overlay', 'modal', 'closeButton', 'closeIcon'.
   */
  styles: PropTypes.object,
  /**
   * The content of the modal.
   */
  children: PropTypes.node,
  /**
   * @internal
   */
  classes: PropTypes.object,
  /**
   * Is the dialog centered (**when you don't have a lot of content**).
   */
  center: PropTypes.bool,
  /**
   * Show the close icon.
   */
  showCloseIcon: PropTypes.bool,
  /**
   * Close icon size.
   */
  closeIconSize: PropTypes.number,
  /**
   * A valid svg path to show as icon.
   */
  closeIconSvgPath: PropTypes.node,
  /**
   * Animation duration in milliseconds.
   */
  animationDuration: PropTypes.number
};

Modal.defaultProps = {
  classes: cssClasses,
  closeOnEsc: true,
  closeOnOverlayClick: true,
  onEntered: null,
  onExited: null,
  onEscKeyDown: null,
  onOverlayClick: null,
  showCloseIcon: true,
  closeIconSize: 28,
  closeIconSvgPath: React__default.createElement('path', { d: 'M28.5 9.62L26.38 7.5 18 15.88 9.62 7.5 7.5 9.62 15.88 18 7.5 26.38l2.12 2.12L18 20.12l8.38 8.38 2.12-2.12L20.12 18z' }),
  classNames: {},
  styles: {},
  children: null,
  center: false,
  animationDuration: 500
};

reactLifecyclesCompat.polyfill(Modal);

module.exports = Modal;
//# sourceMappingURL=index.js.map
