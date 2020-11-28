function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["features-features-module"], {
  /***/
  "./src/app/features/features-routing.module.ts":
  /*!*****************************************************!*\
    !*** ./src/app/features/features-routing.module.ts ***!
    \*****************************************************/

  /*! exports provided: FeaturesRoutingModule */

  /***/
  function srcAppFeaturesFeaturesRoutingModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "FeaturesRoutingModule", function () {
      return FeaturesRoutingModule;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");

    var routes = [{
      path: "",
      redirectTo: 'ent',
      pathMatch: 'full'
    }, {
      path: 'ent',
      loadChildren: function loadChildren() {
        return __webpack_require__.e(
        /*! import() | entitlement-entitlement-module */
        "entitlement-entitlement-module").then(__webpack_require__.bind(null,
        /*! ./entitlement/entitlement.module */
        "./src/app/features/entitlement/entitlement.module.ts")).then(function (m) {
          return m.EntitlementModule;
        });
      }
    }, {
      path: 'calender',
      loadChildren: function loadChildren() {
        return __webpack_require__.e(
        /*! import() | calender-calender-module */
        "calender-calender-module").then(__webpack_require__.bind(null,
        /*! ./calender/calender.module */
        "./src/app/features/calender/calender.module.ts")).then(function (m) {
          return m.CalenderModule;
        });
      }
    }, {
      path: 'setting',
      loadChildren: function loadChildren() {
        return Promise.all(
        /*! import() | setting-setting-module */
        [__webpack_require__.e("default~setting-setting-module~views-request-details-request-details-module"), __webpack_require__.e("common"), __webpack_require__.e("setting-setting-module")]).then(__webpack_require__.bind(null,
        /*! ./setting/setting.module */
        "./src/app/features/setting/setting.module.ts")).then(function (m) {
          return m.SettingModule;
        });
      }
    }, {
      path: 'error',
      loadChildren: function loadChildren() {
        return __webpack_require__.e(
        /*! import() | error-error-module */
        "error-error-module").then(__webpack_require__.bind(null,
        /*! ./error/error.module */
        "./src/app/features/error/error.module.ts")).then(function (m) {
          return m.ErrorModule;
        });
      }
    }, {
      path: 'refferals',
      loadChildren: function loadChildren() {
        return __webpack_require__.e(
        /*! import() | referrals-referrals-module */
        "referrals-referrals-module").then(__webpack_require__.bind(null,
        /*! ./referrals/referrals.module */
        "./src/app/features/referrals/referrals.module.ts")).then(function (m) {
          return m.ReferralsModule;
        });
      }
    }, {
      path: 'req',
      loadChildren: function loadChildren() {
        return __webpack_require__.e(
        /*! import() | service-requests-service-requests-module */
        "service-requests-service-requests-module").then(__webpack_require__.bind(null,
        /*! ./service-requests/service-requests.module */
        "./src/app/features/service-requests/service-requests.module.ts")).then(function (m) {
          return m.ServiceRequestModule;
        });
      }
    }, {
      path: '**',
      redirectTo: 'error'
    }];

    var FeaturesRoutingModule = function FeaturesRoutingModule() {
      _classCallCheck(this, FeaturesRoutingModule);
    };

    FeaturesRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
      type: FeaturesRoutingModule
    });
    FeaturesRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
      factory: function FeaturesRoutingModule_Factory(t) {
        return new (t || FeaturesRoutingModule)();
      },
      imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
    });

    (function () {
      (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](FeaturesRoutingModule, {
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
      });
    })();
    /*@__PURE__*/


    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](FeaturesRoutingModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
          imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)],
          exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        }]
      }], null, null);
    })();
    /***/

  },

  /***/
  "./src/app/features/features.module.ts":
  /*!*********************************************!*\
    !*** ./src/app/features/features.module.ts ***!
    \*********************************************/

  /*! exports provided: FeaturesModule */

  /***/
  function srcAppFeaturesFeaturesModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "FeaturesModule", function () {
      return FeaturesModule;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
    /* harmony import */


    var _features_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ./features-routing.module */
    "./src/app/features/features-routing.module.ts");

    var FeaturesModule = function FeaturesModule() {
      _classCallCheck(this, FeaturesModule);
    };

    FeaturesModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
      type: FeaturesModule
    });
    FeaturesModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
      factory: function FeaturesModule_Factory(t) {
        return new (t || FeaturesModule)();
      },
      imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _features_routing_module__WEBPACK_IMPORTED_MODULE_2__["FeaturesRoutingModule"]]]
    });

    (function () {
      (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](FeaturesModule, {
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _features_routing_module__WEBPACK_IMPORTED_MODULE_2__["FeaturesRoutingModule"]]
      });
    })();
    /*@__PURE__*/


    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](FeaturesModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
          declarations: [],
          imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _features_routing_module__WEBPACK_IMPORTED_MODULE_2__["FeaturesRoutingModule"]]
        }]
      }], null, null);
    })();
    /***/

  }
}]);
//# sourceMappingURL=features-features-module-es5.js.map