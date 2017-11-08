'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactColor = require('react-color');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PickerDialog = function PickerDialog(_ref) {
  var value = _ref.value,
      onClick = _ref.onClick,
      onChange = _ref.onChange;
  return _react2.default.createElement(
    'div',
    { style: { position: 'absolute', zIndex: '2',marginLeft:-80,marginTop:-300} },
    _react2.default.createElement('div', {
      style: { position: 'fixed', top: '0px', right: '0px', bottom: '0px', left: '0px' },
      onClick: onClick
    }),
    _react2.default.createElement(_reactColor.ChromePicker, {
      color: value,
      onChange: onChange
    })
  );
};

PickerDialog.propTypes = {
  value: _react.PropTypes.string,
  onChange: _react.PropTypes.func,
  onClick: _react.PropTypes.func
};

exports.default = PickerDialog;
module.exports = exports['default'];