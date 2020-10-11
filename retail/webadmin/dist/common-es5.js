function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common"], {
  /***/
  "./src/app/shared/services/validator-service/validator.service.ts":
  /*!************************************************************************!*\
    !*** ./src/app/shared/services/validator-service/validator.service.ts ***!
    \************************************************************************/

  /*! exports provided: ValidatorService */

  /***/
  function srcAppSharedServicesValidatorServiceValidatorServiceTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ValidatorService", function () {
      return ValidatorService;
    });
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");

    var ValidatorService =
    /*#__PURE__*/
    function (_angular_forms__WEBPA) {
      _inherits(ValidatorService, _angular_forms__WEBPA);

      var _super = _createSuper(ValidatorService);

      function ValidatorService() {
        _classCallCheck(this, ValidatorService);

        return _super.apply(this, arguments);
      }

      _createClass(ValidatorService, null, [{
        key: "ValidateUrl",
        // constructor() { super() }
        // ValidateUrl(control: AbstractControl) {
        value: function ValidateUrl(control) {
          if (!control.value.startsWith('https') || !control.value.includes('.io')) {
            return {
              validUrl: true
            };
          }

          return null;
        }
      }, {
        key: "NoWhitespaceValidator",
        value: function NoWhitespaceValidator(control) {
          var str = control.value.toString();

          if (!str.replace(/\s/g, '').length && str.length > 0) {
            return {
              whitespace: true
            };
          } else {
            return null;
          }
        }
      }, {
        key: "validateCharacters",
        value: function validateCharacters(control) {
          var validCharacters = /[^\s\w,.:&\/()+%'`@-]/; // first check if the control has a value

          if (control.value && control.value.length > 0) {
            // match the control value against the regular expression
            var matches = control.value.match(validCharacters); // if there are matches return an object, else return null.

            return matches && matches.length ? {
              invalid_characters: matches
            } : null;
          } else {
            return null;
          }
        }
      }, {
        key: "numbersOnly",
        value: function numbersOnly(control) {
          var regex = '^[0-9]*$';

          if (control.value && control.value.length > 0) {
            var matches = control.value.match(regex);
            return matches && matches.length ? null : {
              numbers_only: true
            };
          } else {
            return null;
          }
        }
      }, {
        key: "numberAndDecimal",
        value: function numberAndDecimal(control) {
          var regex = /^[-+]?[0-9]+(\.[0-9]+)?$/;

          if (control.value && control.value.length > 0) {
            var matches = control.value.match(regex);
            return matches && matches.length ? null : {
              numbers_decimal_only: true
            };
          } else {
            return null;
          }
        }
      }, {
        key: "validateCNIC",
        value: function validateCNIC(control) {
          var regex = '^[0-9+]{5}-[0-9+]{7}-[0-9]{1}$';

          if (control.value && control.value.length > 0) {
            var matches = control.value.match(regex);
            return matches && matches.length ? null : {
              invalid_cnic: true
            };
          } else {
            return null;
          }
        }
      }, {
        key: "positiveOnly",
        value: function positiveOnly(control) {
          if (control.value < 0) {
            return {
              positiveOnly: true
            };
          } else {
            return null;
          }
        }
      }, {
        key: "validYear",
        value: function validYear(control) {
          var currentYear = moment().year();
          var val = control.value;

          if (val) {
            return null;
          } else {
            return null;
          }
        }
      }, {
        key: "notFutureDate",
        value: function notFutureDate(control) {
          var date = new Date(control.value).getTime();
          return new Date().getTime() > date ? null : {
            isFutureDate: true
          };
        }
      }, {
        key: "dropdownValidator",
        value: function dropdownValidator(control) {
          if (parseInt(control.value, 10) > 0) {
            return null;
          } else {
            return {
              notValid: true
            };
          }
        }
      }]);

      return ValidatorService;
    }(_angular_forms__WEBPACK_IMPORTED_MODULE_0__["Validators"]);
    /***/

  }
}]);
//# sourceMappingURL=common-es5.js.map