(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["common"],{

/***/ "./src/app/shared/services/validator-service/validator.service.ts":
/*!************************************************************************!*\
  !*** ./src/app/shared/services/validator-service/validator.service.ts ***!
  \************************************************************************/
/*! exports provided: ValidatorService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ValidatorService", function() { return ValidatorService; });
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");

class ValidatorService extends _angular_forms__WEBPACK_IMPORTED_MODULE_0__["Validators"] {
    // constructor() { super() }
    // ValidateUrl(control: AbstractControl) {
    static ValidateUrl(control) {
        if (!control.value.startsWith('https') || !control.value.includes('.io')) {
            return { validUrl: true };
        }
        return null;
    }
    static NoWhitespaceValidator(control) {
        const str = control.value.toString();
        if (!str.replace(/\s/g, '').length && str.length > 0) {
            return { whitespace: true };
        }
        else {
            return null;
        }
    }
    static validateCharacters(control) {
        const validCharacters = /[^\s\w,.:&\/()+%'`@-]/;
        // first check if the control has a value
        if (control.value && control.value.length > 0) {
            // match the control value against the regular expression
            const matches = control.value.match(validCharacters);
            // if there are matches return an object, else return null.
            return matches && matches.length ? { invalid_characters: matches } : null;
        }
        else {
            return null;
        }
    }
    static numbersOnly(control) {
        const regex = '^[0-9]*$';
        if (control.value && control.value.length > 0) {
            const matches = control.value.match(regex);
            return matches && matches.length ? null : { numbers_only: true };
        }
        else {
            return null;
        }
    }
    static numberAndDecimal(control) {
        const regex = /^[-+]?[0-9]+(\.[0-9]+)?$/;
        if (control.value && control.value.length > 0) {
            const matches = control.value.match(regex);
            return matches && matches.length ? null : { numbers_decimal_only: true };
        }
        else {
            return null;
        }
    }
    static validateCNIC(control) {
        const regex = '^[0-9+]{5}-[0-9+]{7}-[0-9]{1}$';
        if (control.value && control.value.length > 0) {
            const matches = control.value.match(regex);
            return matches && matches.length ? null : { invalid_cnic: true };
        }
        else {
            return null;
        }
    }
    static positiveOnly(control) {
        if (control.value < 0) {
            return { positiveOnly: true };
        }
        else {
            return null;
        }
    }
    static validYear(control) {
        const currentYear = moment().year();
        const val = control.value;
        if (val) {
            return null;
        }
        else {
            return null;
        }
    }
    static notFutureDate(control) {
        const date = new Date(control.value).getTime();
        return new Date().getTime() > date ? null : { isFutureDate: true };
    }
    static dropdownValidator(control) {
        if (parseInt(control.value, 10) > 0) {
            return null;
        }
        else {
            return { notValid: true };
        }
    }
}


/***/ })

}]);
//# sourceMappingURL=common-es2015.js.map