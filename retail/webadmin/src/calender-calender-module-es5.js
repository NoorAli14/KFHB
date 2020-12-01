function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["calender-calender-module"], {
  /***/
  "./src/app/features/calender/calender-routing.module.ts":
  /*!**************************************************************!*\
    !*** ./src/app/features/calender/calender-routing.module.ts ***!
    \**************************************************************/

  /*! exports provided: CalenderRoutingModule */

  /***/
  function srcAppFeaturesCalenderCalenderRoutingModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "CalenderRoutingModule", function () {
      return CalenderRoutingModule;
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
      redirectTo: 'working-week',
      pathMatch: 'full'
    }, {
      path: "working-days",
      loadChildren: function loadChildren() {
        return Promise.all(
        /*! import() | working-day-working-day-module */
        [__webpack_require__.e("default~leave-leave-module~working-day-working-day-module"), __webpack_require__.e("working-day-working-day-module")]).then(__webpack_require__.bind(null,
        /*! ./working-day/working-day.module */
        "./src/app/features/calender/working-day/working-day.module.ts")).then(function (m) {
          return m.WorkingDayModule;
        });
      }
    }, {
      path: "holidays",
      loadChildren: function loadChildren() {
        return __webpack_require__.e(
        /*! import() | holiday-holiday-module */
        "holiday-holiday-module").then(__webpack_require__.bind(null,
        /*! ./holiday/holiday.module */
        "./src/app/features/calender/holiday/holiday.module.ts")).then(function (m) {
          return m.HolidayModule;
        });
      }
    }, {
      path: "leaves",
      loadChildren: function loadChildren() {
        return Promise.all(
        /*! import() | leave-leave-module */
        [__webpack_require__.e("default~leave-leave-module~working-day-working-day-module"), __webpack_require__.e("leave-leave-module")]).then(__webpack_require__.bind(null,
        /*! ./leave/leave.module */
        "./src/app/features/calender/leave/leave.module.ts")).then(function (m) {
          return m.LeaveModule;
        });
      }
    }];

    var CalenderRoutingModule = function CalenderRoutingModule() {
      _classCallCheck(this, CalenderRoutingModule);
    };

    CalenderRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
      type: CalenderRoutingModule
    });
    CalenderRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
      factory: function CalenderRoutingModule_Factory(t) {
        return new (t || CalenderRoutingModule)();
      },
      imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
    });

    (function () {
      (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](CalenderRoutingModule, {
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
      });
    })();
    /*@__PURE__*/


    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](CalenderRoutingModule, [{
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
  "./src/app/features/calender/calender.module.ts":
  /*!******************************************************!*\
    !*** ./src/app/features/calender/calender.module.ts ***!
    \******************************************************/

  /*! exports provided: CalenderModule */

  /***/
  function srcAppFeaturesCalenderCalenderModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "CalenderModule", function () {
      return CalenderModule;
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


    var _calender_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ./calender-routing.module */
    "./src/app/features/calender/calender-routing.module.ts");
    /* harmony import */


    var _fuse_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @fuse/components */
    "./src/@fuse/components/index.ts");
    /* harmony import */


    var _fuse_shared_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @fuse/shared.module */
    "./src/@fuse/shared.module.ts");
    /* harmony import */


    var _shared_modules_material_material_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! @shared/modules/material/material.module */
    "./src/app/shared/modules/material/material.module.ts");
    /* harmony import */


    var _shared_shared_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! @shared/shared.module */
    "./src/app/shared/shared.module.ts");

    var CalenderModule = function CalenderModule() {
      _classCallCheck(this, CalenderModule);
    };

    CalenderModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
      type: CalenderModule
    });
    CalenderModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
      factory: function CalenderModule_Factory(t) {
        return new (t || CalenderModule)();
      },
      imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _calender_routing_module__WEBPACK_IMPORTED_MODULE_2__["CalenderRoutingModule"], _shared_shared_module__WEBPACK_IMPORTED_MODULE_6__["SharedModule"], _fuse_components__WEBPACK_IMPORTED_MODULE_3__["FuseSidebarModule"], _fuse_shared_module__WEBPACK_IMPORTED_MODULE_4__["FuseSharedModule"], _shared_modules_material_material_module__WEBPACK_IMPORTED_MODULE_5__["MaterialModule"]]]
    });

    (function () {
      (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](CalenderModule, {
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _calender_routing_module__WEBPACK_IMPORTED_MODULE_2__["CalenderRoutingModule"], _shared_shared_module__WEBPACK_IMPORTED_MODULE_6__["SharedModule"], _fuse_components__WEBPACK_IMPORTED_MODULE_3__["FuseSidebarModule"], _fuse_shared_module__WEBPACK_IMPORTED_MODULE_4__["FuseSharedModule"], _shared_modules_material_material_module__WEBPACK_IMPORTED_MODULE_5__["MaterialModule"]]
      });
    })();
    /*@__PURE__*/


    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](CalenderModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
          declarations: [],
          imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _calender_routing_module__WEBPACK_IMPORTED_MODULE_2__["CalenderRoutingModule"], _shared_shared_module__WEBPACK_IMPORTED_MODULE_6__["SharedModule"], _fuse_components__WEBPACK_IMPORTED_MODULE_3__["FuseSidebarModule"], _fuse_shared_module__WEBPACK_IMPORTED_MODULE_4__["FuseSharedModule"], _shared_modules_material_material_module__WEBPACK_IMPORTED_MODULE_5__["MaterialModule"]]
        }]
      }], null, null);
    })();
    /***/

  }
}]);
//# sourceMappingURL=calender-calender-module-es5.js.map