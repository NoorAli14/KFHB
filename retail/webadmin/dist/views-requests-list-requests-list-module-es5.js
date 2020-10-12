function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["views-requests-list-requests-list-module"], {
  /***/
  "./src/app/features/service-requests/views/requests-list/requests-list-routing.module.ts":
  /*!***********************************************************************************************!*\
    !*** ./src/app/features/service-requests/views/requests-list/requests-list-routing.module.ts ***!
    \***********************************************************************************************/

  /*! exports provided: RequestListRoutingModule */

  /***/
  function srcAppFeaturesServiceRequestsViewsRequestsListRequestsListRoutingModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "RequestListRoutingModule", function () {
      return RequestListRoutingModule;
    });
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! @angular/router */
    "./node_modules/@angular/router/__ivy_ngcc__/fesm2015/router.js");
    /* harmony import */


    var _requests_list_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ./requests-list.component */
    "./src/app/features/service-requests/views/requests-list/requests-list.component.ts");

    var routes = [{
      path: "",
      component: _requests_list_component__WEBPACK_IMPORTED_MODULE_2__["RequestsListComponent"]
    }];

    var RequestListRoutingModule = function RequestListRoutingModule() {
      _classCallCheck(this, RequestListRoutingModule);
    };

    RequestListRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
      type: RequestListRoutingModule
    });
    RequestListRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
      factory: function RequestListRoutingModule_Factory(t) {
        return new (t || RequestListRoutingModule)();
      },
      imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forChild(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
    });

    (function () {
      (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](RequestListRoutingModule, {
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
      });
    })();
    /*@__PURE__*/


    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](RequestListRoutingModule, [{
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
  "./src/app/features/service-requests/views/requests-list/requests-list.component.ts":
  /*!******************************************************************************************!*\
    !*** ./src/app/features/service-requests/views/requests-list/requests-list.component.ts ***!
    \******************************************************************************************/

  /*! exports provided: RequestsListComponent */

  /***/
  function srcAppFeaturesServiceRequestsViewsRequestsListRequestsListComponentTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "RequestsListComponent", function () {
      return RequestsListComponent;
    });
    /* harmony import */


    var _shared_components_base_base_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
    /*! @shared/components/base/base.component */
    "./src/app/shared/components/base/base.component.ts");
    /* harmony import */


    var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
    /*! ../../../../config */
    "./src/app/config/index.ts");
    /* harmony import */


    var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! @angular/core */
    "./node_modules/@angular/core/__ivy_ngcc__/fesm2015/core.js");
    /* harmony import */


    var _fuse_animations__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @fuse/animations */
    "./src/@fuse/animations/index.ts");
    /* harmony import */


    var _shared_constants_messages_constant__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @shared/constants/messages.constant */
    "./src/app/shared/constants/messages.constant.ts");
    /* harmony import */


    var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! @angular/forms */
    "./node_modules/@angular/forms/__ivy_ngcc__/fesm2015/forms.js");
    /* harmony import */


    var _angular_material_table__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! @angular/material/table */
    "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/table.js");
    /* harmony import */


    var _angular_material_paginator__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
    /*! @angular/material/paginator */
    "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/paginator.js");
    /* harmony import */


    var _angular_material_sort__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
    /*! @angular/material/sort */
    "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/sort.js");
    /* harmony import */


    var _shared_helpers_global_helper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
    /*! @shared/helpers/global.helper */
    "./src/app/shared/helpers/global.helper.ts");
    /* harmony import */


    var _shared_components_confirm_dialog_confirm_dialog_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
    /*! @shared/components/confirm-dialog/confirm-dialog.component */
    "./src/app/shared/components/confirm-dialog/confirm-dialog.component.ts");
    /* harmony import */


    var _angular_material_dialog__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
    /*! @angular/material/dialog */
    "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/dialog.js");
    /* harmony import */


    var _fuse_directives_fuse_inner_scroll_fuse_inner_scroll_directive__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
    /*! @fuse/directives/fuse-inner-scroll/fuse-inner-scroll.directive */
    "./src/@fuse/directives/fuse-inner-scroll/fuse-inner-scroll.directive.ts");
    /* harmony import */


    var _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
    /*! @angular/flex-layout/flex */
    "./node_modules/@angular/flex-layout/__ivy_ngcc__/esm2015/flex.js");
    /* harmony import */


    var _angular_material_icon__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
    /*! @angular/material/icon */
    "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/icon.js");
    /* harmony import */


    var _angular_material_button__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(
    /*! @angular/material/button */
    "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/button.js");
    /* harmony import */


    var _fuse_directives_fuse_perfect_scrollbar_fuse_perfect_scrollbar_directive__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(
    /*! @fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive */
    "./src/@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive.ts");
    /* harmony import */


    var _shared_components_message_box_message_box_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(
    /*! ../../../../shared/components/message-box/message-box.component */
    "./src/app/shared/components/message-box/message-box.component.ts");
    /* harmony import */


    var _angular_common__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(
    /*! @angular/common */
    "./node_modules/@angular/common/__ivy_ngcc__/fesm2015/common.js");
    /* harmony import */


    var _shared_components_default_text_default_text_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(
    /*! ../../../../shared/components/default-text/default-text.component */
    "./src/app/shared/components/default-text/default-text.component.ts");
    /* harmony import */


    var _shared_directives_permission_permission_directive__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(
    /*! ../../../../shared/directives/permission/permission.directive */
    "./src/app/shared/directives/permission/permission.directive.ts");
    /* harmony import */


    var _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(
    /*! @angular/material/tooltip */
    "./node_modules/@angular/material/__ivy_ngcc__/fesm2015/tooltip.js");

    function RequestsListComponent_ng_container_16_mat_header_cell_2_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-header-cell", 20);

        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        var key_r694 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;

        var ctx_r695 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate"](key_r694.includes("action") ? "Action" : ctx_r695.camelToSentenceCase(key_r694));
      }
    }

    function RequestsListComponent_ng_container_16_mat_cell_3_span_1_span_1_ng_container_1_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0);

        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
      }

      if (rf & 2) {
        var element_r698 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](3).$implicit;

        var key_r694 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;

        var ctx_r708 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", element_r698[ctx_r708.camelToSnakeCase(key_r694)], " ");
      }
    }

    function RequestsListComponent_ng_container_16_mat_cell_3_span_1_span_1_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span");

        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, RequestsListComponent_ng_container_16_mat_cell_3_span_1_span_1_ng_container_1_Template, 2, 1, "ng-container", 21);

        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);

        var _r705 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](7);

        var key_r694 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;

        var ctx_r707 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", ctx_r707.camelToSnakeCase(key_r694).indexOf("created") < 0)("ngIfElse", _r705);
      }
    }

    function RequestsListComponent_ng_container_16_mat_cell_3_span_1_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "span");

        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, RequestsListComponent_ng_container_16_mat_cell_3_span_1_span_1_Template, 2, 2, "span", 21);

        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        var element_r698 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;

        var _r701 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](3);

        var key_r694 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;

        var ctx_r700 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", element_r698[ctx_r700.camelToSnakeCase(key_r694)])("ngIfElse", _r701);
      }
    }

    function RequestsListComponent_ng_container_16_mat_cell_3_ng_template_2_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "app-default-text");
      }
    }

    function RequestsListComponent_ng_container_16_mat_cell_3_ng_template_4_mat_icon_8_Template(rf, ctx) {
      if (rf & 1) {
        var _r717 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-icon", 29);

        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function RequestsListComponent_ng_container_16_mat_cell_3_ng_template_4_mat_icon_8_Template_mat_icon_click_0_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r717);

          var element_r698 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2).$implicit;

          var ctx_r715 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);

          return ctx_r715.confirmDialog("invite", element_r698["id"]);
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "near_me");

        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      }
    }

    function RequestsListComponent_ng_container_16_mat_cell_3_ng_template_4_Template(rf, ctx) {
      if (rf & 1) {
        var _r720 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵgetCurrentView"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-icon", 25);

        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function RequestsListComponent_ng_container_16_mat_cell_3_ng_template_4_Template_mat_icon_click_0_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r720);

          var element_r698 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;

          var ctx_r718 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);

          return ctx_r718.confirmDialog("delete", element_r698["id"]);
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "delete");

        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](2, " \xA0\xA0 ");

        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "mat-icon", 26);

        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function RequestsListComponent_ng_container_16_mat_cell_3_ng_template_4_Template_mat_icon_click_3_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r720);

          var element_r698 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;

          var ctx_r721 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);

          return ctx_r721.openDialog(element_r698);
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](4, "mode_edit");

        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, " \xA0\xA0 ");

        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](6, "mat-icon", 27);

        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("click", function RequestsListComponent_ng_container_16_mat_cell_3_ng_template_4_Template_mat_icon_click_6_listener($event) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵrestoreView"](_r720);

          var element_r698 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;

          var ctx_r723 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);

          return ctx_r723.onDetail(element_r698["id"]);
        });

        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](7, "explore");

        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](8, RequestsListComponent_ng_container_16_mat_cell_3_ng_template_4_mat_icon_8_Template, 2, 0, "mat-icon", 28);

        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](9, " \xA0\xA0 ");
      }

      if (rf & 2) {
        var element_r698 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;

        var ctx_r704 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"](2);

        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("permissions", ctx_r704.userPermissions)("type", "delete");

        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](8);

        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", element_r698["status"] === "PENDING");
      }
    }

    function RequestsListComponent_ng_container_16_mat_cell_3_ng_template_6_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](0);

        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipe"](1, "date");
      }

      if (rf & 2) {
        var element_r698 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;

        var key_r694 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;

        var ctx_r706 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]();

        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtextInterpolate1"](" ", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpipeBind2"](1, 1, element_r698[ctx_r706.camelToSnakeCase(key_r694)], "mediumDate"), " ");
      }
    }

    function RequestsListComponent_ng_container_16_mat_cell_3_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "mat-cell");

        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](1, RequestsListComponent_ng_container_16_mat_cell_3_span_1_Template, 2, 2, "span", 21);

        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, RequestsListComponent_ng_container_16_mat_cell_3_ng_template_2_Template, 1, 0, "ng-template", null, 22, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);

        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](4, RequestsListComponent_ng_container_16_mat_cell_3_ng_template_4_Template, 10, 3, "ng-template", null, 23, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);

        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](6, RequestsListComponent_ng_container_16_mat_cell_3_ng_template_6_Template, 2, 4, "ng-template", null, 24, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplateRefExtractor"]);

        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
      }

      if (rf & 2) {
        var _r703 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵreference"](5);

        var key_r694 = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵnextContext"]().$implicit;

        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngIf", !key_r694.includes("action"))("ngIfElse", _r703);
      }
    }

    function RequestsListComponent_ng_container_16_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerStart"](0, 17);

        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](1, "\n} ");

        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](2, RequestsListComponent_ng_container_16_mat_header_cell_2_Template, 2, 1, "mat-header-cell", 18);

        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](3, RequestsListComponent_ng_container_16_mat_cell_3_Template, 8, 2, "mat-cell", 19);

        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementContainerEnd"]();
      }

      if (rf & 2) {
        var key_r694 = ctx.$implicit;

        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("matColumnDef", key_r694);
      }
    }

    function RequestsListComponent_mat_header_row_17_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "mat-header-row");
      }
    }

    var _c0 = function _c0() {
      return {
        y: "100%"
      };
    };

    var _c1 = function _c1(a1) {
      return {
        value: "*",
        params: a1
      };
    };

    function RequestsListComponent_mat_row_18_Template(rf, ctx) {
      if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](0, "mat-row");
      }

      if (rf & 2) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("@animate", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](2, _c1, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](1, _c0)));
      }
    }

    var _c2 = function _c2() {
      return {
        delay: "50ms",
        scale: "0.2"
      };
    };

    var _c3 = function _c3() {
      return {
        delay: "100ms",
        x: "-25px"
      };
    };

    var RequestsListComponent =
    /*#__PURE__*/
    function (_shared_components_ba) {
      _inherits(RequestsListComponent, _shared_components_ba);

      var _super = _createSuper(RequestsListComponent);

      function RequestsListComponent(_matDialog, injector) {
        var _this;

        _classCallCheck(this, RequestsListComponent);

        _this = _super.call(this, injector);
        _this._matDialog = _matDialog;
        _this.pageSize = _config__WEBPACK_IMPORTED_MODULE_1__["CONFIG"].PAGE_SIZE;
        _this.pageSizeOptions = _config__WEBPACK_IMPORTED_MODULE_1__["CONFIG"].PAGE_SIZE_OPTIONS;
        _this.displayedColumns = ['Request Type', 'Customer RIM', 'Customer Mobile', 'Customer Email', 'Request Date', 'Status'];
        _this.dataSource = new _angular_material_table__WEBPACK_IMPORTED_MODULE_6__["MatTableDataSource"]();
        return _this;
      }

      _createClass(RequestsListComponent, [{
        key: "ngOnInit",
        value: function ngOnInit() {
          _get(_getPrototypeOf(RequestsListComponent.prototype), "ngOnInit", this).call(this);

          this.username = new _angular_forms__WEBPACK_IMPORTED_MODULE_5__["FormControl"]('');
          this.initSearch();
        }
      }, {
        key: "initSearch",
        value: function initSearch() {
          this.username.valueChanges.subscribe(function (text) {});
        }
      }, {
        key: "camelToSnakeCase",
        value: function camelToSnakeCase(text) {
          return Object(_shared_helpers_global_helper__WEBPACK_IMPORTED_MODULE_9__["camelToSnakeCaseText"])(text);
        }
      }, {
        key: "camelToSentenceCase",
        value: function camelToSentenceCase(text) {
          return Object(_shared_helpers_global_helper__WEBPACK_IMPORTED_MODULE_9__["camelToSentenceCase"])(text);
        }
      }, {
        key: "confirmDialog",
        value: function confirmDialog(type, id) {
          var message = type === 'invite' ? Object(_shared_helpers_global_helper__WEBPACK_IMPORTED_MODULE_9__["removeRandom"])(_shared_constants_messages_constant__WEBPACK_IMPORTED_MODULE_4__["MESSAGES"].RESEND_INVITE()) : Object(_shared_helpers_global_helper__WEBPACK_IMPORTED_MODULE_9__["removeRandom"])(_shared_constants_messages_constant__WEBPACK_IMPORTED_MODULE_4__["MESSAGES"].REMOVE_CONFIRMATION());
          var dialogData = new _shared_components_confirm_dialog_confirm_dialog_component__WEBPACK_IMPORTED_MODULE_10__["ConfirmDialogModel"]('Confirm Action', message);

          var dialogRef = this._matDialog.open(_shared_components_confirm_dialog_confirm_dialog_component__WEBPACK_IMPORTED_MODULE_10__["ConfirmDialogComponent"], {
            data: dialogData,
            disableClose: true,
            panelClass: 'app-confirm-dialog',
            hasBackdrop: true
          });

          dialogRef.afterClosed().subscribe(function (status) {
            if (status) {//   type === 'invite' ? this.resendInvitation(id) : this.deleteUser(id)
            }
          });
        }
      }, {
        key: "updateGrid",
        value: function updateGrid(data) {
          this.dataSource.data = data;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      }]);

      return RequestsListComponent;
    }(_shared_components_base_base_component__WEBPACK_IMPORTED_MODULE_0__["BaseComponent"]);

    RequestsListComponent.ɵfac = function RequestsListComponent_Factory(t) {
      return new (t || RequestsListComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_material_dialog__WEBPACK_IMPORTED_MODULE_11__["MatDialog"]), _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdirectiveInject"](_angular_core__WEBPACK_IMPORTED_MODULE_2__["Injector"]));
    };

    RequestsListComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({
      type: RequestsListComponent,
      selectors: [["app-requests-list"]],
      viewQuery: function RequestsListComponent_Query(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_angular_material_paginator__WEBPACK_IMPORTED_MODULE_7__["MatPaginator"], true);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_angular_material_sort__WEBPACK_IMPORTED_MODULE_8__["MatSort"], true);
        }

        if (rf & 2) {
          var _t;

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.paginator = _t.first);
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.sort = _t.first);
        }
      },
      features: [_angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵInheritDefinitionFeature"]],
      decls: 21,
      vars: 17,
      consts: [[1, "page-container", "page-layout", "carded", "fullwidth", "inner-scroll"], [1, "top-bg", "accent"], [1, "center"], ["fxLayout", "column", "fxLayoutAlign", "center center", "fxLayout.gt-sm", "row", "fxLayoutAlign.gt-sm", "space-between center", 1, "header", "accent"], ["fxLayout", "row", "fxLayoutAlign", "start center", 1, "logo", "mb-24", "mb-md-0"], [1, "logo-icon", "s-32", "mr-16"], [1, "logo-text", "h1"], ["mat-raised-button", "", "color", "accent", 1, "add-product-button", "fuse-white", "mt-24", "mt-md-0"], ["fusePerfectScrollbar", "", 1, "content-card"], [3, "type", "message"], ["matSort", "", "matSortActive", "username", "matSortDirection", "asc", "matSortDisableClear", "", 3, "dataSource"], ["table", ""], [3, "matColumnDef", 4, "ngFor", "ngForOf"], [4, "matHeaderRowDef"], [4, "matRowDef", "matRowDefColumns"], ["showFirstLastButtons", "", 3, "pageIndex", "pageSize", "pageSizeOptions"], ["paginator", ""], [3, "matColumnDef"], ["class", "text-center", 4, "matHeaderCellDef"], [4, "matCellDef"], [1, "text-center"], [4, "ngIf", "ngIfElse"], ["defaultText", ""], ["action", ""], ["date", ""], ["appPermission", "", "matTooltip", "Delete user", "color", "warn", "type", "button", 3, "permissions", "type", "click"], ["type", "button", "matTooltip", "Delete user", 3, "click"], ["type", "button", "matTooltip", "Explore", 3, "click"], ["color", "success", "matTooltip", "Resend Invitation", "type", "button", 3, "click", 4, "ngIf"], ["color", "success", "matTooltip", "Resend Invitation", "type", "button", 3, "click"]],
      template: function RequestsListComponent_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](1, "div", 1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "div", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "div", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "div", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "mat-icon", 5);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](6, " credit_card ");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "span", 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8, " Service Request Summary ");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](9, "button", 7);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](10, "span");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](11, "DOWNLOAD REPORT");

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](12, "div", 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](13, "app-message-box", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](14, "mat-table", 10, 11);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](16, RequestsListComponent_ng_container_16_Template, 4, 1, "ng-container", 12);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](17, RequestsListComponent_mat_header_row_17_Template, 1, 0, "mat-header-row", 13);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtemplate"](18, RequestsListComponent_mat_row_18_Template, 1, 4, "mat-row", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelement"](19, "mat-paginator", 15, 16);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](5);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("@animate", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](12, _c1, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](11, _c2)));

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("@animate", _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction1"](15, _c1, _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵpureFunction0"](14, _c3)));

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](6);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("type", ctx.errorType)("message", ctx.responseMessage);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("dataSource", ctx.dataSource);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("ngForOf", ctx.displayedColumns);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("matHeaderRowDef", ctx.displayedColumns);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("matRowDefColumns", ctx.displayedColumns);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵproperty"]("pageIndex", 0)("pageSize", ctx.pageSize)("pageSizeOptions", ctx.pageSizeOptions);
        }
      },
      directives: [_fuse_directives_fuse_inner_scroll_fuse_inner_scroll_directive__WEBPACK_IMPORTED_MODULE_12__["FuseInnerScrollDirective"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_13__["DefaultLayoutDirective"], _angular_flex_layout_flex__WEBPACK_IMPORTED_MODULE_13__["DefaultLayoutAlignDirective"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_14__["MatIcon"], _angular_material_button__WEBPACK_IMPORTED_MODULE_15__["MatButton"], _fuse_directives_fuse_perfect_scrollbar_fuse_perfect_scrollbar_directive__WEBPACK_IMPORTED_MODULE_16__["FusePerfectScrollbarDirective"], _shared_components_message_box_message_box_component__WEBPACK_IMPORTED_MODULE_17__["MessageBoxComponent"], _angular_material_table__WEBPACK_IMPORTED_MODULE_6__["MatTable"], _angular_common__WEBPACK_IMPORTED_MODULE_18__["NgForOf"], _angular_material_table__WEBPACK_IMPORTED_MODULE_6__["MatHeaderRowDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_6__["MatRowDef"], _angular_material_paginator__WEBPACK_IMPORTED_MODULE_7__["MatPaginator"], _angular_material_table__WEBPACK_IMPORTED_MODULE_6__["MatColumnDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_6__["MatHeaderCellDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_6__["MatCellDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_6__["MatHeaderCell"], _angular_material_table__WEBPACK_IMPORTED_MODULE_6__["MatCell"], _angular_common__WEBPACK_IMPORTED_MODULE_18__["NgIf"], _shared_components_default_text_default_text_component__WEBPACK_IMPORTED_MODULE_19__["DefaultTextComponent"], _shared_directives_permission_permission_directive__WEBPACK_IMPORTED_MODULE_20__["PermissionDirective"], _angular_material_tooltip__WEBPACK_IMPORTED_MODULE_21__["MatTooltip"], _angular_material_table__WEBPACK_IMPORTED_MODULE_6__["MatHeaderRow"], _angular_material_table__WEBPACK_IMPORTED_MODULE_6__["MatRow"]],
      pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_18__["DatePipe"]],
      styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2ZlYXR1cmVzL3NlcnZpY2UtcmVxdWVzdHMvdmlld3MvcmVxdWVzdHMtbGlzdC9yZXF1ZXN0cy1saXN0LmNvbXBvbmVudC5zY3NzIn0= */"],
      encapsulation: 2,
      data: {
        animation: _fuse_animations__WEBPACK_IMPORTED_MODULE_3__["fuseAnimations"]
      }
    });
    /*@__PURE__*/

    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵsetClassMetadata"](RequestsListComponent, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"],
        args: [{
          selector: 'app-requests-list',
          templateUrl: './requests-list.component.html',
          styleUrls: ['./requests-list.component.scss'],
          animations: _fuse_animations__WEBPACK_IMPORTED_MODULE_3__["fuseAnimations"],
          encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ViewEncapsulation"].None
        }]
      }], function () {
        return [{
          type: _angular_material_dialog__WEBPACK_IMPORTED_MODULE_11__["MatDialog"]
        }, {
          type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["Injector"]
        }];
      }, {
        paginator: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ViewChild"],
          args: [_angular_material_paginator__WEBPACK_IMPORTED_MODULE_7__["MatPaginator"], {
            static: false
          }]
        }],
        sort: [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["ViewChild"],
          args: [_angular_material_sort__WEBPACK_IMPORTED_MODULE_8__["MatSort"], {
            static: false
          }]
        }]
      });
    })();
    /***/

  },

  /***/
  "./src/app/features/service-requests/views/requests-list/requests-list.module.ts":
  /*!***************************************************************************************!*\
    !*** ./src/app/features/service-requests/views/requests-list/requests-list.module.ts ***!
    \***************************************************************************************/

  /*! exports provided: RequestsListModule */

  /***/
  function srcAppFeaturesServiceRequestsViewsRequestsListRequestsListModuleTs(module, __webpack_exports__, __webpack_require__) {
    "use strict";

    __webpack_require__.r(__webpack_exports__);
    /* harmony export (binding) */


    __webpack_require__.d(__webpack_exports__, "RequestsListModule", function () {
      return RequestsListModule;
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


    var _requests_list_routing_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
    /*! ./requests-list-routing.module */
    "./src/app/features/service-requests/views/requests-list/requests-list-routing.module.ts");
    /* harmony import */


    var _fuse_shared_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
    /*! @fuse/shared.module */
    "./src/@fuse/shared.module.ts");
    /* harmony import */


    var _shared_shared_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
    /*! @shared/shared.module */
    "./src/app/shared/shared.module.ts");
    /* harmony import */


    var _shared_modules_material_material_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
    /*! @shared/modules/material/material.module */
    "./src/app/shared/modules/material/material.module.ts");
    /* harmony import */


    var _requests_list_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
    /*! ./requests-list.component */
    "./src/app/features/service-requests/views/requests-list/requests-list.component.ts");

    var RequestsListModule = function RequestsListModule() {
      _classCallCheck(this, RequestsListModule);
    };

    RequestsListModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
      type: RequestsListModule
    });
    RequestsListModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
      factory: function RequestsListModule_Factory(t) {
        return new (t || RequestsListModule)();
      },
      imports: [[_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _shared_shared_module__WEBPACK_IMPORTED_MODULE_4__["SharedModule"], _fuse_shared_module__WEBPACK_IMPORTED_MODULE_3__["FuseSharedModule"], _requests_list_routing_module__WEBPACK_IMPORTED_MODULE_2__["RequestListRoutingModule"], _shared_modules_material_material_module__WEBPACK_IMPORTED_MODULE_5__["MaterialModule"]]]
    });

    (function () {
      (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](RequestsListModule, {
        declarations: [_requests_list_component__WEBPACK_IMPORTED_MODULE_6__["RequestsListComponent"]],
        imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _shared_shared_module__WEBPACK_IMPORTED_MODULE_4__["SharedModule"], _fuse_shared_module__WEBPACK_IMPORTED_MODULE_3__["FuseSharedModule"], _requests_list_routing_module__WEBPACK_IMPORTED_MODULE_2__["RequestListRoutingModule"], _shared_modules_material_material_module__WEBPACK_IMPORTED_MODULE_5__["MaterialModule"]]
      });
    })();
    /*@__PURE__*/


    (function () {
      _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](RequestsListModule, [{
        type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
        args: [{
          declarations: [_requests_list_component__WEBPACK_IMPORTED_MODULE_6__["RequestsListComponent"]],
          imports: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"], _shared_shared_module__WEBPACK_IMPORTED_MODULE_4__["SharedModule"], _fuse_shared_module__WEBPACK_IMPORTED_MODULE_3__["FuseSharedModule"], _requests_list_routing_module__WEBPACK_IMPORTED_MODULE_2__["RequestListRoutingModule"], _shared_modules_material_material_module__WEBPACK_IMPORTED_MODULE_5__["MaterialModule"]]
        }]
      }], null, null);
    })();
    /***/

  }
}]);
//# sourceMappingURL=views-requests-list-requests-list-module-es5.js.map