(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{j2iy:function(e,t,a){"use strict";a.r(t);var r=a("ofXK"),i=a("tyNb"),n=a("Pn5l"),o=a("LOCc"),s=a("PVWW"),c=a("3Pt+");class l extends c.t{static ValidateUrl(e){return e.value.startsWith("https")&&e.value.includes(".io")?null:{validUrl:!0}}static NoWhitespaceValidator(e){const t=e.value.toString();return!t.replace(/\s/g,"").length&&t.length>0?{whitespace:!0}:null}static validateCharacters(e){if(e.value&&e.value.length>0){const t=e.value.match(/[^\s\w,.:&\/()+%'`@-]/);return t&&t.length?{invalid_characters:t}:null}return null}static numbersOnly(e){if(e.value&&e.value.length>0){const t=e.value.match("^[0-9]*$");return t&&t.length?null:{numbers_only:!0}}return null}static numberAndDecimal(e){if(e.value&&e.value.length>0){const t=e.value.match(/^[-+]?[0-9]+(\.[0-9]+)?$/);return t&&t.length?null:{numbers_decimal_only:!0}}return null}static validateCNIC(e){if(e.value&&e.value.length>0){const t=e.value.match("^[0-9+]{5}-[0-9+]{7}-[0-9]{1}$");return t&&t.length?null:{invalid_cnic:!0}}return null}static positiveOnly(e){return e.value<0?{positiveOnly:!0}:null}static validYear(e){return moment().year(),null}static notFutureDate(e){const t=new Date(e.value).getTime();return(new Date).getTime()>t?null:{isFutureDate:!0}}static dropdownValidator(e){return parseInt(e.value,10)>0?null:{notValid:!0}}}var m=a("sne2"),u=a("fXoL"),d=a("0IaG"),b=a("+gEL"),p=a("/t3+"),f=a("XiUz"),g=a("NFeN"),h=a("bTqV"),x=a("EwFO"),U=a("kmnG"),v=a("qFsG"),y=a("6H7S"),w=a("d3UM"),V=a("7syL"),C=a("FKr1"),F=a("iadO");function I(e,t){if(1&e&&(u.Vb(0,"mat-form-field",18),u.Vb(1,"mat-label"),u.Hc(2,"User Name"),u.Ub(),u.Qb(3,"input",24),u.Vb(4,"mat-icon",15),u.Hc(5,"personal_pin"),u.Ub(),u.Vb(6,"mat-error"),u.Qb(7,"app-mat-error",16),u.Ub(),u.Ub()),2&e){const e=u.hc();u.Cb(7),u.nc("control",e.userForm.get("username"))}}function S(e,t){if(1&e&&(u.Vb(0,"mat-form-field",13),u.Vb(1,"mat-label"),u.Hc(2,"First Name"),u.Ub(),u.Qb(3,"input",25),u.Vb(4,"mat-icon",15),u.Hc(5,"account_circle"),u.Ub(),u.Vb(6,"mat-error"),u.Qb(7,"app-mat-error",16),u.Ub(),u.Ub()),2&e){const e=u.hc();u.Cb(7),u.nc("control",e.userForm.get("firstName"))}}function L(e,t){if(1&e&&(u.Vb(0,"mat-form-field",13),u.Vb(1,"mat-label"),u.Hc(2,"Middle Name"),u.Ub(),u.Qb(3,"input",26),u.Vb(4,"mat-icon",15),u.Hc(5,"account_circle"),u.Ub(),u.Vb(6,"mat-error"),u.Qb(7,"app-mat-error",16),u.Ub(),u.Ub()),2&e){const e=u.hc();u.Cb(7),u.nc("control",e.userForm.get("middleName"))}}function D(e,t){if(1&e&&(u.Vb(0,"mat-form-field",13),u.Vb(1,"mat-label"),u.Hc(2,"Last Name"),u.Ub(),u.Qb(3,"input",27),u.Vb(4,"mat-icon",15),u.Hc(5,"account_circle"),u.Ub(),u.Vb(6,"mat-error"),u.Qb(7,"app-mat-error",16),u.Ub(),u.Ub()),2&e){const e=u.hc();u.Cb(7),u.nc("control",e.userForm.get("lastName"))}}function k(e,t){if(1&e&&(u.Vb(0,"mat-option",28),u.Hc(1),u.Ub()),2&e){const e=t.$implicit;u.nc("value",e.id),u.Cb(1),u.Jc(" ",e.name," ")}}function H(e,t){if(1&e&&(u.Vb(0,"mat-form-field",13),u.Vb(1,"mat-label"),u.Hc(2,"Date of Birth"),u.Ub(),u.Qb(3,"input",29),u.Qb(4,"mat-datepicker-toggle",30),u.Qb(5,"mat-datepicker",null,31),u.Vb(7,"mat-error"),u.Qb(8,"app-mat-error",16),u.Ub(),u.Ub()),2&e){const e=u.uc(6),t=u.hc();u.Cb(3),u.nc("matDatepicker",e),u.Cb(1),u.nc("for",e),u.Cb(4),u.nc("control",t.userForm.get("dateOfBirth"))}}function N(e,t){if(1&e&&(u.Vb(0,"mat-option",28),u.Hc(1),u.Ub()),2&e){const e=t.$implicit;u.nc("value",e.id),u.Cb(1),u.Jc(" ",e.name," ")}}function O(e,t){if(1&e&&(u.Vb(0,"mat-form-field",18),u.Vb(1,"mat-label"),u.Hc(2,"Gender"),u.Ub(),u.Vb(3,"mat-select",32),u.Fc(4,N,2,2,"mat-option",20),u.Ub(),u.Vb(5,"mat-icon",15),u.Hc(6,"face"),u.Ub(),u.Vb(7,"mat-error"),u.Qb(8,"app-mat-error",16),u.Ub(),u.Ub()),2&e){const e=u.hc();u.Cb(4),u.nc("ngForOf",e.genderList),u.Cb(4),u.nc("control",e.userForm.get("gender"))}}function _(e,t){if(1&e&&(u.Vb(0,"mat-option",28),u.Hc(1),u.Ub()),2&e){const e=t.$implicit;u.nc("value",e.id),u.Cb(1),u.Jc(" ",e.name," ")}}function A(e,t){if(1&e&&(u.Vb(0,"mat-form-field",18),u.Vb(1,"mat-label"),u.Hc(2,"Nationality"),u.Ub(),u.Vb(3,"mat-select",33),u.Fc(4,_,2,2,"mat-option",20),u.Ub(),u.Vb(5,"mat-icon",15),u.Hc(6,"outlined_flag"),u.Ub(),u.Vb(7,"mat-error"),u.Qb(8,"app-mat-error",16),u.Ub(),u.Ub()),2&e){const e=u.hc();u.Cb(4),u.nc("ngForOf",e.nationalityList),u.Cb(4),u.nc("control",e.userForm.get("nationalityId"))}}function M(e,t){if(1&e&&(u.Vb(0,"mat-option",28),u.Hc(1),u.Ub()),2&e){const e=t.$implicit;u.nc("value",e.id),u.Cb(1),u.Jc(" ",e.name," ")}}function Q(e,t){if(1&e&&(u.Vb(0,"mat-form-field",18),u.Vb(1,"mat-label"),u.Hc(2,"Status"),u.Ub(),u.Vb(3,"mat-select",34),u.Fc(4,M,2,2,"mat-option",20),u.Ub(),u.Vb(5,"mat-icon",15),u.Hc(6,"lock_open"),u.Ub(),u.Vb(7,"mat-error"),u.Qb(8,"app-mat-error",16),u.Ub(),u.Ub()),2&e){const e=u.hc();u.Cb(4),u.nc("ngForOf",e.statusList),u.Cb(4),u.nc("control",e.userForm.get("status"))}}const R=function(){return{delay:"50ms",scale:"0.2"}},T=function(e){return{value:"*",params:e}},E=function(){return{delay:"100ms",x:"-25px"}};let P=(()=>{class e extends n.a{constructor(e,t){super(),this.matDialogRef=e,this.data=t,this.nationalityList=m.d,this.genderList=m.b,this.statusList=m.e,this.sendResponse=new u.o}requiredIfUpdating(e){return t=>t.parent&&e()?c.t.required(t):null}ngOnInit(){this.permissions=this._authUserService.getPermissionsByModule("User"),this.userForm=new c.h({id:new c.e(this.data.user.id),username:new c.e(this.data.user.username,[this.requiredIfUpdating(()=>!this.userForm.get("id").value)]),firstName:new c.e(this.data.user.firstName,[this.requiredIfUpdating(()=>this.userForm.get("id").value)]),middleName:new c.e(this.data.user.middleName,[this.requiredIfUpdating(()=>this.userForm.get("id").value)]),lastName:new c.e(this.data.user.lastName,[this.requiredIfUpdating(()=>this.userForm.get("id").value)]),contactNo:new c.e(this.data.user.contactNo,[c.t.required,l.numbersOnly]),gender:new c.e(this.data.user.gender,[this.requiredIfUpdating(()=>this.userForm.get("id").value)]),email:new c.e(this.data.user.email,[c.t.required,c.t.email]),dateOfBirth:new c.e(this.data.user.dateOfBirth,[this.requiredIfUpdating(()=>this.userForm.get("id").value)]),nationalityId:new c.e(this.data.user.nationalityId,[this.requiredIfUpdating(()=>this.userForm.get("id").value)]),roles:new c.e(this.data.user.roles.map(e=>e.id),[c.t.required]),status:new c.e(this.data.user.status,[this.requiredIfUpdating(()=>this.userForm.get("id").value)])}),this.roles=this.data.roles}onSubmit(){let e=Object.assign({},this.userForm.value);e.roles=this.userForm.value.roles.map(e=>({id:e})),e=Object(b.b)(e),this.sendResponse.emit(e)}}return e.\u0275fac=function(t){return new(t||e)(u.Pb(d.f),u.Pb(d.a))},e.\u0275cmp=u.Jb({type:e,selectors:[["app-user-form"]],outputs:{sendResponse:"sendResponse"},features:[u.zb],decls:54,vars:25,consts:[[1,"dialog-content-wrapper"],[1,"mat-accent","m-0"],["fxFlex","","fxLayout","row","fxLayoutAlign","space-between center"],["fxLayout","row","fxLayoutAlign","start center",1,"logo","mb-24","mb-md-0"],[1,"logo-icon","mr-12"],[1,"logo-text"],["mat-icon-button","","aria-label","Close dialog",3,"click"],["mat-dialog-content","","fusePerfectScrollbar","",1,"p-24","m-0"],["fxLayout","row"],["fxLayout","column","fxLayoutAlign","start","fxFlex","1 0","name","userForm","novalidate","",1,"p-24","mr-24",3,"formGroup","ngSubmit"],["fxLayout","row wrap","fxLayout.lt-lg","column","fxLayoutAlign.lt-lg","center","fxLayoutGap","10px","fxLayoutAlign","start center","fxFlex","1 1 auto"],["appearance","outline","fxFlex","48","class","pr-4",4,"ngIf"],["appearance","outline","fxFlex","48","class","pl-4",4,"ngIf"],["appearance","outline","fxFlex","48",1,"pl-4"],["matInput","","formControlName","email"],["matSuffix","",1,"secondary-text"],[3,"control"],["matInput","","formControlName","contactNo"],["appearance","outline","fxFlex","48",1,"pr-4"],["formControlName","roles","multiple",""],[3,"value",4,"ngFor","ngForOf"],["fxLayoutGap","10px","fxLayout","row","fxLayoutAlign","end center",1,"actions"],["type","button","mat-raised-button","","color","secondary","aria-label","Follow",3,"click"],["appPermission","","type","submit","mat-raised-button","","color","accent","aria-label","Send Message",3,"permissions","type","disabled"],["matInput","","formControlName","username"],["matInput","","formControlName","firstName"],["matInput","","formControlName","middleName"],["matInput","","formControlName","lastName"],[3,"value"],["matInput","","formControlName","dateOfBirth",3,"matDatepicker"],["matSuffix","",3,"for"],["picker",""],["formControlName","gender"],["formControlName","nationalityId"],["formControlName","status"]],template:function(e,t){1&e&&(u.Vb(0,"div",0),u.Vb(1,"mat-toolbar",1),u.Vb(2,"mat-toolbar-row",2),u.Vb(3,"div",3),u.Vb(4,"mat-icon",4),u.Hc(5," people "),u.Ub(),u.Vb(6,"span",5),u.Hc(7),u.Ub(),u.Ub(),u.Vb(8,"button",6),u.dc("click",(function(e){return t.matDialogRef.close()})),u.Vb(9,"mat-icon"),u.Hc(10,"close"),u.Ub(),u.Ub(),u.Ub(),u.Ub(),u.Vb(11,"div",7),u.Vb(12,"div",8),u.Vb(13,"form",9),u.dc("ngSubmit",(function(e){return t.onSubmit()})),u.Vb(14,"div",10),u.Fc(15,I,8,1,"mat-form-field",11),u.Fc(16,S,8,1,"mat-form-field",12),u.Fc(17,L,8,1,"mat-form-field",12),u.Fc(18,D,8,1,"mat-form-field",12),u.Vb(19,"mat-form-field",13),u.Vb(20,"mat-label"),u.Hc(21,"Email"),u.Ub(),u.Qb(22,"input",14),u.Vb(23,"mat-icon",15),u.Hc(24,"email"),u.Ub(),u.Vb(25,"mat-error"),u.Qb(26,"app-mat-error",16),u.Ub(),u.Ub(),u.Vb(27,"mat-form-field",13),u.Vb(28,"mat-label"),u.Hc(29,"Contact No"),u.Ub(),u.Qb(30,"input",17),u.Vb(31,"mat-icon",15),u.Hc(32,"phone"),u.Ub(),u.Vb(33,"mat-error"),u.Qb(34,"app-mat-error",16),u.Ub(),u.Ub(),u.Vb(35,"mat-form-field",18),u.Vb(36,"mat-label"),u.Hc(37,"Role"),u.Ub(),u.Vb(38,"mat-select",19),u.Fc(39,k,2,2,"mat-option",20),u.Ub(),u.Vb(40,"mat-icon",15),u.Hc(41,"security"),u.Ub(),u.Vb(42,"mat-error"),u.Qb(43,"app-mat-error",16),u.Ub(),u.Ub(),u.Fc(44,H,9,3,"mat-form-field",12),u.Fc(45,O,9,2,"mat-form-field",11),u.Fc(46,A,9,2,"mat-form-field",11),u.Fc(47,Q,9,2,"mat-form-field",11),u.Ub(),u.Vb(48,"div",21),u.Vb(49,"button",22),u.dc("click",(function(e){return t.matDialogRef.close()})),u.Hc(50," Cancel "),u.Ub(),u.Hc(51," \xa0\xa0\xa0 "),u.Vb(52,"button",23),u.Hc(53," Submit "),u.Ub(),u.Ub(),u.Ub(),u.Ub(),u.Ub(),u.Ub()),2&e&&(u.Cb(4),u.nc("@animate",u.qc(20,T,u.pc(19,R))),u.Cb(2),u.nc("@animate",u.qc(23,T,u.pc(22,E))),u.Cb(1),u.Jc(" ",t.data.user.id?"Update":"Create"," User "),u.Cb(6),u.nc("formGroup",t.userForm),u.Cb(2),u.nc("ngIf",!t.data.user.id),u.Cb(1),u.nc("ngIf",t.data.user.firstName),u.Cb(1),u.nc("ngIf",t.data.user.id),u.Cb(1),u.nc("ngIf",t.data.user.id),u.Cb(8),u.nc("control",t.userForm.get("email")),u.Cb(8),u.nc("control",t.userForm.get("contactNo")),u.Cb(5),u.nc("ngForOf",t.roles),u.Cb(4),u.nc("control",t.userForm.get("roles")),u.Cb(1),u.nc("ngIf",t.data.user.id),u.Cb(1),u.nc("ngIf",t.data.user.id),u.Cb(1),u.nc("ngIf",t.data.user.id),u.Cb(1),u.nc("ngIf",t.data.user.id),u.Cb(5),u.nc("permissions",t.permissions)("type",t.data.user.id?"edit":"create")("disabled",t.userForm.invalid))},directives:[p.a,p.c,f.a,f.c,f.b,g.a,h.b,d.d,x.a,c.u,c.p,c.i,f.d,r.t,U.c,U.f,v.b,c.c,c.o,c.g,U.g,U.b,y.a,w.a,r.s,V.a,C.n,F.b,F.d,F.a],styles:["@media screen and (max-width:599px){.app-user-form{width:100%}}@media screen and (min-width:600px){.app-user-form{width:60%}}.app-user-form .mat-form-field-appearance-outline .mat-form-field-prefix,.app-user-form .mat-form-field-appearance-outline .mat-form-field-suffix{top:0}.app-user-form .mat-dialog-container{padding:0}.app-user-form .dialog-content-wrapper{max-height:85vh;display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}"],encapsulation:2}),e})();var $=a("IbRh"),q=a("+0xr"),z=a("M9IT"),G=a("Dh3D"),B=a("IJgu");function J(e,t){if(1&e&&(u.Tb(0),u.Vb(1,"div",7),u.Qb(2,"div",8),u.Vb(3,"div",9),u.Hc(4),u.Ub(),u.Ub(),u.Sb()),2&e){const e=t.$implicit;u.Cb(4),u.Ic(e.name)}}let j=(()=>{class e{constructor(){}ngOnInit(){}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=u.Jb({type:e,selectors:[["app-detail-item"]],inputs:{module:"module"},decls:12,vars:2,consts:[["fxLayout","row","fxLayoutAlign","start center"],["fxFlex","","fxFlexLayout","column",1,"info"],[1,"title"],[2,"margin-left","50px"],["fxLayout","row wrap","fxLayoutAlign","start center",1,"tags"],["fxLayout","row","fxLayoutAlign","start center",1,"title",2,"padding-top","5px"],[4,"ngFor","ngForOf"],["fxLayout","row","fxLayoutAlign","start center",1,"tag",2,"background-color","rgba(0, 0, 0, 0.08)"],[1,"tag-color",2,"background-color","rgb(56, 142, 60)"],[1,"tag-label"]],template:function(e,t){1&e&&(u.Vb(0,"div",0),u.Vb(1,"div",1),u.Vb(2,"div",2),u.Vb(3,"strong"),u.Hc(4,"Module:"),u.Ub(),u.Vb(5,"span",3),u.Hc(6),u.Ub(),u.Ub(),u.Vb(7,"div",4),u.Vb(8,"div",5),u.Vb(9,"strong"),u.Hc(10,"Permissions: \xa0 \xa0"),u.Ub(),u.Ub(),u.Fc(11,J,5,1,"ng-container",6),u.Ub(),u.Ub(),u.Ub()),2&e&&(u.Cb(6),u.Ic(t.module.name),u.Cb(5),u.nc("ngForOf",t.module.permissions))},directives:[f.c,f.b,f.a,r.s],styles:['app-detail-item{display:block;position:relative;padding:10px;text-transform:none;cursor:pointer;-webkit-box-flex:1;flex:1 1 100%;max-width:45%}app-detail-item .handle{height:48px;line-height:48px;cursor:move;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}app-detail-item.move-disabled .handle{display:none}app-detail-item .tags .tag{font-size:11px;border-radius:2px;margin:8px 4px 0 0;padding:3px 8px}app-detail-item .tags .tag .tag-color{width:8px;height:8px;margin-right:8px;border-radius:50%}app-detail-item.completed .notes,app-detail-item.completed .title{text-decoration:line-through}app-detail-item .info{margin:0 16px 0 8px}app-detail-item .info .title{font-size:15px;font-weight:600}app-detail-item .info .notes{margin-top:4px}app-detail-item .buttons .is-starred{margin:0 0 0 16px}app-detail-item .buttons .is-important{margin:0}app-detail-item.has-handle [ngxdraghandle],app-detail-item.has-handle [ngxDragHandle],app-detail-item:not(.has-handle):not(.move-disabled){cursor:move}app-detail-item .ngx-dnd-content{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}app-detail-item.gu-mirror{position:fixed!important;margin:0!important;z-index:9999!important;opacity:.8;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=80)";filter:alpha(opacity=80);box-shadow:0 4px 5px -2px rgba(0,0,0,.2),0 7px 10px 1px rgba(0,0,0,.14),0 2px 16px 1px rgba(0,0,0,.12)}app-detail-item.gu-hide{display:none!important}app-detail-item.gu-unselectable{-webkit-user-select:none!important;-moz-user-select:none!important;-ms-user-select:none!important;user-select:none!important}app-detail-item.gu-transit{opacity:.2;-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=20)";filter:alpha(opacity=20)}'],encapsulation:2,data:{animation:s.a}}),e})();function W(e,t){if(1&e&&(u.Tb(0),u.Qb(1,"app-detail-item",10),u.Sb()),2&e){const e=t.$implicit;u.Cb(1),u.nc("module",e)}}const X=function(){return{delay:"50ms",scale:"0.2"}},K=function(e){return{value:"*",params:e}},Z=function(){return{delay:"100ms",x:"-25px"}};let Y=(()=>{class e{constructor(e,t){this.matDialogRef=e,this.data=t}ngOnInit(){}}return e.\u0275fac=function(t){return new(t||e)(u.Pb(d.f),u.Pb(d.a))},e.\u0275cmp=u.Jb({type:e,selectors:[["app-user-detail"]],decls:14,vars:10,consts:[[1,"dialog-content-wrapper"],[1,"mat-accent","m-0"],["fxFlex","","fxLayout","row","fxLayoutAlign","space-between center"],["fxLayout","row","fxLayoutAlign","start center",1,"logo","mb-24","mb-md-0"],[1,"logo-icon","mr-12"],[1,"logo-text"],["mat-icon-button","","aria-label","Close dialog",3,"click"],["mat-dialog-content","","fusePerfectScrollbar","",1,"p-24","m-0"],["fxLayout","row wrap","fxLayout.lt-lg","column","fxLayoutAlign.lt-lg","center","fxLayoutGap","20px","fxLayoutAlign","start center","fxFlex","1 1 auto"],[4,"ngFor","ngForOf"],[3,"module"]],template:function(e,t){1&e&&(u.Vb(0,"div",0),u.Vb(1,"mat-toolbar",1),u.Vb(2,"mat-toolbar-row",2),u.Vb(3,"div",3),u.Vb(4,"mat-icon",4),u.Hc(5," person "),u.Ub(),u.Vb(6,"span",5),u.Hc(7),u.Ub(),u.Ub(),u.Vb(8,"button",6),u.dc("click",(function(e){return t.matDialogRef.close()})),u.Vb(9,"mat-icon"),u.Hc(10,"close"),u.Ub(),u.Ub(),u.Ub(),u.Ub(),u.Vb(11,"div",7),u.Vb(12,"div",8),u.Fc(13,W,2,1,"ng-container",9),u.Ub(),u.Ub(),u.Ub()),2&e&&(u.Cb(4),u.nc("@animate",u.qc(5,K,u.pc(4,X))),u.Cb(2),u.nc("@animate",u.qc(8,K,u.pc(7,Z))),u.Cb(1),u.Jc(" ",t.data.firstName+" "+t.data.lastName," "),u.Cb(6),u.nc("ngForOf",t.data.modules))},directives:[p.a,p.c,f.a,f.c,f.b,g.a,h.b,d.d,x.a,f.d,r.s,j],styles:["@media screen and (max-width:599px){.app-user-detail{width:100%}}@media screen and (min-width:600px){.app-user-detail{width:70%}}.app-user-detail .mat-form-field-appearance-outline .mat-form-field-prefix,.app-user-detail .mat-form-field-appearance-outline .mat-form-field-suffix{top:0}.app-user-detail .mat-dialog-container{padding:0}.app-user-detail .dialog-content-wrapper{max-height:85vh;display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}.app-user-detail .item-container{margin-left:50px;margin-top:10px}.app-user-detail .role-container{border-bottom:1px solid;width:100%;padding:10px}"],encapsulation:2,data:{animation:s.a}}),e})();var ee=a("cp0P");const te="/api/v1/entitlements/users";var ae=a("NXL+"),re=a("rTjo");let ie=(()=>{class e{constructor(e){this._networkService=e,this.modules=[]}createUser(e){return this._networkService.post("/api/v1/entitlements/invitations",e)}getUserById(e){return this._networkService.getById(`${te}/${e}`)}getUsers(){return this._networkService.getAll(te)}getRoles(){return this._networkService.getAll(ae.c)}editUser(e,t){return this._networkService.onUpdate(`${te}/${e}`,t)}deleteUser(e){return this._networkService.onDelete(`${te}/${e}`)}forkUserData(){return Object(ee.a)([this.getUsers(),this.getRoles()])}mapModules(e){return this.modules=[],this.makeFlat(e,""),this.modules}makeFlat(e,t){e.forEach(e=>{e.parent=t,this.modules.push(e),e.sub_modules&&this.makeFlat(e.sub_modules,e.name)})}}return e.\u0275fac=function(t){return new(t||e)(u.Zb(re.a))},e.\u0275prov=u.Lb({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();var ne=a("B9zo");function oe(e,t){if(1&e&&(u.Vb(0,"div",20),u.Hc(1),u.Ub()),2&e){const e=u.hc();u.Fb("p-16  message-box ",e.errorType," "),u.Cb(1),u.Jc(" ",e.responseMessage," ")}}function se(e,t){if(1&e&&(u.Vb(0,"mat-header-cell"),u.Hc(1),u.Ub()),2&e){const e=u.hc().$implicit,t=u.hc();u.Cb(1),u.Ic(e.includes("action")?"Action":t.camelToSentenceCase(e))}}function ce(e,t){if(1&e&&(u.Vb(0,"span"),u.Hc(1),u.Ub()),2&e){const e=u.hc().$implicit,t=u.hc().$implicit,a=u.hc();u.Cb(1),u.Ic(e[a.camelToSnakeCase(t)])}}function le(e,t){if(1&e){const e=u.Wb();u.Vb(0,"mat-icon",26),u.dc("click",(function(t){u.yc(e);const a=u.hc().$implicit;return u.hc(2).confirmDialog(a.id)})),u.Hc(1,"delete"),u.Ub(),u.Hc(2," \xa0\xa0 "),u.Vb(3,"mat-icon",27),u.dc("click",(function(t){u.yc(e);const a=u.hc().$implicit;return u.hc(2).openDialog(a)})),u.Hc(4,"mode_edit"),u.Ub(),u.Vb(5,"mat-icon",27),u.dc("click",(function(t){u.yc(e);const a=u.hc().$implicit;return u.hc(2).onDetail(a.id)})),u.Hc(6,"explore"),u.Ub()}if(2&e){const e=u.hc(3);u.nc("permissions",e.userPermissions)("type","delete")}}function me(e,t){if(1&e&&(u.Vb(0,"mat-cell"),u.Fc(1,ce,2,1,"span",24),u.Fc(2,le,7,2,"ng-template",null,25,u.Gc),u.Ub()),2&e){const e=u.uc(3),t=u.hc().$implicit;u.Cb(1),u.nc("ngIf",!t.includes("action"))("ngIfElse",e)}}function ue(e,t){1&e&&(u.Tb(0,21),u.Fc(1,se,2,1,"mat-header-cell",22),u.Fc(2,me,4,2,"mat-cell",23),u.Sb()),2&e&&u.nc("matColumnDef",t.$implicit)}function de(e,t){1&e&&u.Qb(0,"mat-header-row")}const be=function(){return{y:"100%"}},pe=function(e){return{value:"*",params:e}};function fe(e,t){1&e&&u.Qb(0,"mat-row"),2&e&&u.nc("@animate",u.qc(2,pe,u.pc(1,be)))}const ge=function(){return{delay:"50ms",scale:"0.2"}},he=function(){return{delay:"100ms",x:"-25px"}},xe=[{path:"",component:(()=>{class e extends n.a{constructor(e,t){super("User"),this._matDialog=e,this._service=t,this.pageSize=o.a.PAGE_SIZE,this.pageSizeOptions=o.a.PAGE_SIZE_OPTIONS,this.displayedColumns=["username","firstName","lastName","gender","email","contactNo","status","actions"],this.dataSource=new q.k}ngOnInit(){super.ngOnInit(),this.username=new c.e(""),this.initSearch(),this.getData()}loadAllUsers(){this._service.getUsers().subscribe(e=>{this.responseMessage="",this.users=e},e=>{this.errorType="error",this.responseMessage=m.c.UNKNOWN})}getData(){this._service.forkUserData().subscribe(e=>{[this.users,this.roles]=e,this.dataSource=new q.k(this.users),this.dataSource.paginator=this.paginator,this.dataSource.sort=this.sort},e=>{console.log(e)})}initSearch(){this.username.valueChanges.subscribe(e=>{this.loadAllUsers()})}camelToSnakeCase(e){return Object(b.c)(e)}openDialog(e){var t=this;this.dialogRef=this._matDialog.open(P,{data:{roles:this.roles,user:e&&e.id?Object(b.f)(e):new $.a},panelClass:"app-user-form"}).componentInstance.sendResponse.subscribe(e=>{e.id?t.editUser(e):t.createUser(e)})}onDetail(e){this._service.getUserById(e).subscribe(e=>{this.openUserDetailModal(e)},e=>super.onError(e))}openUserDetailModal(e){e.modules=this._service.mapModules(e.modules),e=Object(b.f)(e),this.dialogRef=this._matDialog.open(Y,{data:e,panelClass:"app-user-detail"})}camelToSentenceCase(e){return Object(b.a)(e)}confirmDialog(e){const t=new B.b("Confirm Action",m.c.REMOVE_CONFIRMATION);this._matDialog.open(B.a,{data:t,disableClose:!0,panelClass:"app-confirm-dialog",hasBackdrop:!0}).afterClosed().subscribe(t=>{t&&this.deleteUser(e)})}createUser(e){this._service.createUser(e).subscribe(e=>{this.errorType="success",this.responseMessage=m.c.CREATED("User");const t=this.dataSource.data;t.push(e),this.updateGrid(t),this._matDialog.closeAll()},e=>super.onError(e))}hideMessage(){setTimeout(()=>{this.responseMessage=""},2e3)}editUser(e){this._service.editUser(e.id,e).subscribe(t=>{this.errorType="success",this.responseMessage=m.c.UPDATED("Module");const a=this.dataSource.data.findIndex(t=>t.id==e.id);this.users[a]=t,this.updateGrid(this.users),this.hideMessage(),this._matDialog.closeAll()},e=>super.onError(e))}deleteUser(e){this._service.deleteUser(e).subscribe(t=>{const a=this.dataSource.data.findIndex(t=>t.id==e);this.users.splice(a,1),this.updateGrid(this.users),this.errorType="success",this.hideMessage(),this.responseMessage=m.c.DELETED("User")},e=>super.onError(e))}updateGrid(e){this.dataSource.data=e,this.dataSource.paginator=this.paginator,this.dataSource.sort=this.sort}}return e.\u0275fac=function(t){return new(t||e)(u.Pb(d.b),u.Pb(ie))},e.\u0275cmp=u.Jb({type:e,selectors:[["app-user"]],viewQuery:function(e,t){var a;1&e&&(u.Mc(z.a,!0),u.Mc(G.a,!0)),2&e&&(u.tc(a=u.ec())&&(t.paginator=a.first),u.tc(a=u.ec())&&(t.sort=a.first))},features:[u.zb],decls:26,vars:17,consts:[[1,"page-container","page-layout","carded","fullwidth","inner-scroll"],[1,"top-bg","accent"],[1,"center"],["fxLayout","column","fxLayoutAlign","center center","fxLayout.gt-sm","row","fxLayoutAlign.gt-sm","space-between center",1,"header","accent"],["fxLayout","row","fxLayoutAlign","start center",1,"logo","mb-24","mb-md-0"],[1,"logo-icon","s-32","mr-16"],[1,"logo-text","h1"],[1,"search-wrapper","mx-32","mx-md-0"],["fxFlex","","fxLayout","row","fxLayoutAlign","start center",1,"search"],["placeholder","Search for a user",3,"formControl"],["mat-raised-button","","color","accent",1,"add-product-button","fuse-white","mt-24","mt-md-0",3,"click"],["fusePerfectScrollbar","",1,"content-card"],["fxLayout","row","fxLayoutAlign","center",3,"class",4,"ngIf"],["matSort","","matSortActive","username","matSortDirection","asc","matSortDisableClear","",3,"dataSource"],["table",""],[3,"matColumnDef",4,"ngFor","ngForOf"],[4,"matHeaderRowDef"],[4,"matRowDef","matRowDefColumns"],["showFirstLastButtons","",3,"pageIndex","pageSize","pageSizeOptions"],["paginator",""],["fxLayout","row","fxLayoutAlign","center"],[3,"matColumnDef"],[4,"matHeaderCellDef"],[4,"matCellDef"],[4,"ngIf","ngIfElse"],["action",""],["appPermission","","color","warn","type","button",3,"permissions","type","click"],["type","button",3,"click"]],template:function(e,t){1&e&&(u.Vb(0,"div",0),u.Qb(1,"div",1),u.Vb(2,"div",2),u.Vb(3,"div",3),u.Vb(4,"div",4),u.Vb(5,"mat-icon",5),u.Hc(6," people "),u.Ub(),u.Vb(7,"span",6),u.Hc(8," Users "),u.Ub(),u.Ub(),u.Vb(9,"div",7),u.Vb(10,"div",8),u.Vb(11,"mat-icon"),u.Hc(12,"search"),u.Ub(),u.Qb(13,"input",9),u.Ub(),u.Ub(),u.Vb(14,"button",10),u.dc("click",(function(e){return t.openDialog(null)})),u.Vb(15,"span"),u.Hc(16,"ADD NEW USER"),u.Ub(),u.Ub(),u.Ub(),u.Vb(17,"div",11),u.Fc(18,oe,2,4,"div",12),u.Vb(19,"mat-table",13,14),u.Fc(21,ue,3,1,"ng-container",15),u.Fc(22,de,1,0,"mat-header-row",16),u.Fc(23,fe,1,4,"mat-row",17),u.Ub(),u.Qb(24,"mat-paginator",18,19),u.Ub(),u.Ub(),u.Ub()),2&e&&(u.Cb(5),u.nc("@animate",u.qc(12,pe,u.pc(11,ge))),u.Cb(2),u.nc("@animate",u.qc(15,pe,u.pc(14,he))),u.Cb(6),u.nc("formControl",t.username),u.Cb(5),u.nc("ngIf",t.responseMessage.length>0),u.Cb(1),u.nc("dataSource",t.dataSource),u.Cb(2),u.nc("ngForOf",t.displayedColumns),u.Cb(1),u.nc("matHeaderRowDef",t.displayedColumns),u.Cb(1),u.nc("matRowDefColumns",t.displayedColumns),u.Cb(1),u.nc("pageIndex",0)("pageSize",t.pageSize)("pageSizeOptions",t.pageSizeOptions))},directives:[ne.a,f.c,f.b,g.a,f.a,c.c,c.o,c.f,h.b,x.a,r.t,q.j,r.s,q.g,q.i,z.a,q.c,q.e,q.b,q.d,q.a,V.a,q.f,q.h],styles:["app-user{width:100%}"],encapsulation:2,data:{animation:s.a}}),e})()}];let Ue=(()=>{class e{}return e.\u0275mod=u.Nb({type:e}),e.\u0275inj=u.Mb({factory:function(t){return new(t||e)},imports:[[i.k.forChild(xe)],i.k]}),e})();var ve=a("5HBU"),ye=a("PCNd"),we=a("W/RB");a.d(t,"UserModule",(function(){return Ve}));let Ve=(()=>{class e{}return e.\u0275mod=u.Nb({type:e}),e.\u0275inj=u.Mb({factory:function(t){return new(t||e)},imports:[[r.c,ye.a,ve.a,Ue,we.a]]}),e})()}}]);