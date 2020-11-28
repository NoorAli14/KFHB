function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["service-requests-service-requests-module"], {
  /***/
  "./src/app/features/service-requests/service-requests-routing.module.ts":
  /*!******************************************************************************!*\
    !*** ./src/app/features/service-requests/service-requests-routing.module.ts ***!
    \******************************************************************************/

  /*! exports provided: ServiceRequestRoutingModule */

  /***/
  function srcAppFeaturesServiceRequestsServiceRequestsRoutingModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ServiceRequestRoutingModule", function () {
      return ServiceRequestRoutingModule;
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
      path: '',
      redirectTo: 'list',
      pathMatch: ''
    }, {
      path: 'list',
      loadChildren: function loadChildren() {
        return __webpack_require__.e(
        /*! import() | views-requests-list-requests-list-module */
        "views-requests-list-requests-list-module").then(__webpack_require__.bind(null,
        /*! ./views/requests-list/requests-list.module */
        "./src/app/features/service-requests/views/requests-list/requests-list.module.ts")).then(function (m) {
          return m.RequestsListModule;
        });
      }
    }, {
      path: 'details',
      loadChildren: function loadChildren() {
        return Promise.all(
        /*! import() | views-request-details-request-details-module */
        [__webpack_require__.e("default~setting-setting-module~views-request-details-request-details-module"), __webpack_require__.e("views-request-details-request-details-module")]).then(__webpack_require__.bind(null,
        /*! ./views/request-details/request-details.module */
        "./src/app/features/service-requests/views/request-details/request-details.module.ts")).then(function (m) {
          return m.RequestDetailsModule;
        });
      }
    }];

    var ServiceRequestRoutingModule = function ServiceRequestRoutingModule() {
      _classCallCheck(this, ServiceRequestRoutingModule);
    };

    ServiceRequestRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
      type: ServiceRequestRoutingModule
    });
    ServiceRequestRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
      factory: function ServiceRequestRoutingModule_Factory(t) {
        return new (t || ServiceRequestRoutingModule)();
      },
      imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
    });

    (function () {
      (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](ServiceRequestRoutingModule, {
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
      });
    })();
    /*@__PURE__*/


    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ServiceRequestRoutingModule, [{
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
  "./src/app/features/service-requests/service-requests.module.ts":
  /*!**********************************************************************!*\
    !*** ./src/app/features/service-requests/service-requests.module.ts ***!
    \**********************************************************************/

  /*! exports provided: ServiceRequestModule */

  /***/
  function srcAppFeaturesServiceRequestsServiceRequestsModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "ServiceRequestModule", function () {
      return ServiceRequestModule;
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


    var _service_requests_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ./service-requests-routing.module */
    "./src/app/features/service-requests/service-requests-routing.module.ts");

    var ServiceRequestModule = function ServiceRequestModule() {
      _classCallCheck(this, ServiceRequestModule);
    };

    ServiceRequestModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
      type: ServiceRequestModule
    });
    ServiceRequestModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
      factory: function ServiceRequestModule_Factory(t) {
        return new (t || ServiceRequestModule)();
      },
      imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _service_requests_routing_module__WEBPACK_IMPORTED_MODULE_2__["ServiceRequestRoutingModule"]]]
    });

    (function () {
      (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](ServiceRequestModule, {
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _service_requests_routing_module__WEBPACK_IMPORTED_MODULE_2__["ServiceRequestRoutingModule"]]
      });
    })();
    /*@__PURE__*/


    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ServiceRequestModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
          declarations: [],
          imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _service_requests_routing_module__WEBPACK_IMPORTED_MODULE_2__["ServiceRequestRoutingModule"]]
        }]
      }], null, null);
    })();
    /***/

  }
}]);
//# sourceMappingURL=service-requests-service-requests-module-es5.js.map