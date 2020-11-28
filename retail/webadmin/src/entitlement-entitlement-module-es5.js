function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["entitlement-entitlement-module"], {
  /***/
  "./src/app/features/entitlement/entitlement-routing.module.ts":
  /*!********************************************************************!*\
    !*** ./src/app/features/entitlement/entitlement-routing.module.ts ***!
    \********************************************************************/

  /*! exports provided: EntitlementRoutingModule */

  /***/
  function srcAppFeaturesEntitlementEntitlementRoutingModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "EntitlementRoutingModule", function () {
      return EntitlementRoutingModule;
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
      redirectTo: 'user',
      pathMatch: 'full'
    }, {
      path: "user",
      loadChildren: function loadChildren() {
        return Promise.all(
        /*! import() | user-user-module */
        [__webpack_require__.e("common"), __webpack_require__.e("user-user-module")]).then(__webpack_require__.bind(null,
        /*! ./user/user.module */
        "./src/app/features/entitlement/user/user.module.ts")).then(function (m) {
          return m.UserModule;
        });
      }
    }, {
      path: "role",
      loadChildren: function loadChildren() {
        return __webpack_require__.e(
        /*! import() | role-role-module */
        "role-role-module").then(__webpack_require__.bind(null,
        /*! ./role/role.module */
        "./src/app/features/entitlement/role/role.module.ts")).then(function (m) {
          return m.RoleModule;
        });
      }
    }];

    var EntitlementRoutingModule = function EntitlementRoutingModule() {
      _classCallCheck(this, EntitlementRoutingModule);
    };

    EntitlementRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
      type: EntitlementRoutingModule
    });
    EntitlementRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
      factory: function EntitlementRoutingModule_Factory(t) {
        return new (t || EntitlementRoutingModule)();
      },
      imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
    });

    (function () {
      (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](EntitlementRoutingModule, {
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
      });
    })();
    /*@__PURE__*/


    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](EntitlementRoutingModule, [{
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
  "./src/app/features/entitlement/entitlement.module.ts":
  /*!************************************************************!*\
    !*** ./src/app/features/entitlement/entitlement.module.ts ***!
    \************************************************************/

  /*! exports provided: EntitlementModule */

  /***/
  function srcAppFeaturesEntitlementEntitlementModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "EntitlementModule", function () {
      return EntitlementModule;
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


    var _entitlement_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ./entitlement-routing.module */
    "./src/app/features/entitlement/entitlement-routing.module.ts");

    var EntitlementModule = function EntitlementModule() {
      _classCallCheck(this, EntitlementModule);
    };

    EntitlementModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
      type: EntitlementModule
    });
    EntitlementModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
      factory: function EntitlementModule_Factory(t) {
        return new (t || EntitlementModule)();
      },
      imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _entitlement_routing_module__WEBPACK_IMPORTED_MODULE_2__["EntitlementRoutingModule"]]]
    });

    (function () {
      (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](EntitlementModule, {
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _entitlement_routing_module__WEBPACK_IMPORTED_MODULE_2__["EntitlementRoutingModule"]]
      });
    })();
    /*@__PURE__*/


    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](EntitlementModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
          declarations: [],
          imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _entitlement_routing_module__WEBPACK_IMPORTED_MODULE_2__["EntitlementRoutingModule"]]
        }]
      }], null, null);
    })();
    /***/

  }
}]);
//# sourceMappingURL=entitlement-entitlement-module-es5.js.map