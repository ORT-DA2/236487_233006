"use strict";(self.webpackChunkangular_template=self.webpackChunkangular_template||[]).push([[115],{1115:(mt,x,n)=>{n.r(x),n.d(x,{default:()=>at});var l=n(6895),N=n(8498),h=n(2648),D=n(2474),O=n(1989),c=n(5593),E=n(1795),Z=n(9507),y=n(1493),d=n(4281),a=n(4006),F=n(2684),I=n(6228),V=n(1019),P=n(2722),g=n(6632),u=n(9450),J=n(7579),f=n(7772),v=n(4891),t=n(4650),C=n(9653),U=n(7185),p=n(1422);const M=["dynamicForm"],w=function(o){return{severity:"error",summary:"Error",detail:o}},Y=function(o){return[o]};function z(o,i){1&o&&t._UZ(0,"p-messages",5),2&o&&t.Q6J("value",t.VKq(5,Y,t.VKq(3,w,i.ngIf)))("showTransitionOptions","300ms")("hideTransitionOptions","300ms")}const k=[{type:d.fS.SELECT,name:"option",label:"Usuario/email",select:{options:[{id:v.p.EMAIL,description:"email"},{id:v.p.USERNAME,description:"username"}]}},{type:d.fS.TEXT,name:"id",label:"ID",placeholder:"Usuario/Email",validators:[a.kI.required,F.J,a.kI.maxLength(100)]},{type:d.fS.TEXT,name:"password",label:"Password",validators:[a.kI.required,a.kI.minLength(8),a.kI.maxLength(100),I.q],placeholder:"Password",attrs:{type:"password"}}];let Q=(()=>{class o{get form(){return this.dynamicForm.form}constructor(e,r){this.store=e,this.toast=r,this.structure$=this.store.select(u.A.selectLoginStructure),this.data$=this.store.select(u.A.selectLoginData),this.error$=this.store.select(u.A.selectError),this.componentDestroyed$=new J.x}ngOnInit(){this.buildForm()}ngAfterViewInit(){this.patchSelect(),this.watchForSelectChange()}submit(){this.dynamicForm.submitted(),this.form.valid?this.store.dispatch(g.Y.login()):this.handleInvalidForm()}updateForm(e){this.store.dispatch(g.Y.updateLoginData({state:e}))}buildForm(){this.store.dispatch(g.Y.setLoginStructure({structure:k}))}patchSelect(){this.form.controls.option.patchValue(v.p.EMAIL)}updateIdValidators(){this.form.controls.id.clearValidators(),this.form.controls.option.value===v.p.EMAIL?this.setEmailValidators():this.setUsernameValidators(),this.form.controls.id.updateValueAndValidity()}setEmailValidators(){this.form.controls.id.setValidators([F.J,a.kI.required,a.kI.maxLength(100)])}setUsernameValidators(){this.form.controls.id.setValidators([V.t,a.kI.maxLength(12),a.kI.required])}handleInvalidForm(){this.toast.error("Form submission failed. Please correct the highlighted fields.","Error")}watchForSelectChange(){this.form.controls.option.valueChanges.pipe((0,P.R)(this.componentDestroyed$)).subscribe(()=>{this.form.controls.id.patchValue(""),this.updateIdValidators()})}ngOnDestroy(){this.form.reset(),this.componentDestroyed$.next(),this.componentDestroyed$.complete()}}return o.\u0275fac=function(e){return new(e||o)(t.Y36(C.yh),t.Y36(U._W))},o.\u0275cmp=t.Xpm({type:o,selectors:[["login-form"]],viewQuery:function(e,r){if(1&e&&t.Gf(M,7),2&e){let s;t.iGM(s=t.CRH())&&(r.dynamicForm=s.first)}},standalone:!0,features:[t.jDz],decls:9,vars:10,consts:[[1,"form-container"],[3,"value","showTransitionOptions","hideTransitionOptions",4,"ngIf"],[1,"form",3,"data$","structure$","updateForm"],["dynamicForm",""],["label","Sign In","icon","pi pi-sign-in",3,"loading","click"],[3,"value","showTransitionOptions","hideTransitionOptions"]],template:function(e,r){if(1&e&&(t.TgZ(0,"div",0),t.YNc(1,z,1,7,"p-messages",1),t.ALo(2,"async"),t.TgZ(3,"dynamic-form",2,3),t.NdJ("updateForm",function(m){return r.updateForm(m)}),t.qZA(),t.TgZ(5,"div")(6,"p-button",4),t.NdJ("click",function(){return r.submit()}),t.ALo(7,"async"),t.ALo(8,"async"),t.qZA()()()),2&e){const s=t.MAs(4);let m;t.xp6(1),t.Q6J("ngIf",t.lcZ(2,4,r.error$)),t.xp6(2),t.Q6J("data$",r.data$)("structure$",r.structure$),t.xp6(3),t.Q6J("loading","PENDING"===t.lcZ(7,6,s.form.statusChanges)&&null!==(m=t.lcZ(8,8,s.formSubmitted$))&&void 0!==m&&m)}},dependencies:[l.ez,l.O5,l.Ov,c.hJ,c.zx,h.N,p.r,f.$,f.V,E.T,D.I],styles:["@media screen and (min-width: 1200px){.login-container[_ngcontent-%COMP%]{max-width:550px}}.form-container[_ngcontent-%COMP%]{display:flex;flex-direction:column}.form-container[_ngcontent-%COMP%]   .form[_ngcontent-%COMP%]{margin-bottom:12px}"],changeDetection:0}),o})();var H=n(2453),b=n(8736),L=n(1624);const X=o=>{const i=o.get("password"),e=o.get("passwordConfirmation");return i&&e&&i.value!==e.value?{passwordsNotMatch:!0}:null};var G=n(8675),j=n(9300),K=n(590),W=n(1724),T=n(7352),A=n(2805),S=n(3900),$=n(4004);let B=(()=>{class o{constructor(e){this.registerService=e}validate(e){return(0,A.H)(300).pipe((0,S.w)(()=>this.registerService.checkEmail(e.value).pipe((0,$.U)(r=>r.length?{emailExists:!0}:null))))}}return o.\u0275fac=function(e){return new(e||o)(t.LFG(T.s))},o.\u0275prov=t.Yz7({token:o,factory:o.\u0275fac,providedIn:"root"}),o})(),q=(()=>{class o{constructor(e){this.registerService=e}validate(e){return(0,A.H)(300).pipe((0,S.w)(()=>this.registerService.checkUsername(e.value).pipe((0,$.U)(r=>r.length?{usernameExists:!0}:null))))}}return o.\u0275fac=function(e){return new(e||o)(t.LFG(T.s))},o.\u0275prov=t.Yz7({token:o,factory:o.\u0275fac,providedIn:"root"}),o})();const _=["dynamicForm"];function tt(o,i){1&o&&t._UZ(0,"error-badge",4),2&o&&t.Q6J("error",i.ngIf)}let et=(()=>{class o{constructor(e,r,s,m,lt){this.store=e,this.registerService=r,this.toast=s,this.uniqueEmailValidator=m,this.uniqueUsernameValidator=lt,this.structure$=this.store.select(b.L.selectStructure),this.data$=this.store.select(b.L.selectData),this.error$=this.store.select(u.A.selectRegisterError)}ngOnInit(){this.initForm()}get form(){return this.dynamicForm.form}updateForm(e){this.store.dispatch(L.i.updateData({state:e}))}onSubmit(){this.dynamicForm.submitted(),this.form.statusChanges.pipe((0,G.O)(this.form.status),(0,j.h)(e=>e===p.P.VALID||e===p.P.INVALID),(0,K.P)()).subscribe(e=>e===p.P.VALID?this.emitFormValue():this.showFormError())}emitFormValue(){this.store.dispatch(g.Y.register({newUser:this.form.value}))}showFormError(){this.toast.error("Form submission failed. Please correct the highlighted fields.","Error")}initForm(){const e=[{type:d.fS.TEXT,name:"firstName",label:"First Name",validators:[a.kI.required,a.kI.maxLength(50)]},{type:d.fS.TEXT,name:"lastName",label:"Last Name",validators:[a.kI.required,a.kI.maxLength(50)]},{type:d.fS.TEXT,name:"email",label:"Email",validators:[a.kI.required,F.J,a.kI.maxLength(100)],asyncValidators:[this.uniqueEmailValidator.validate.bind(this.uniqueEmailValidator)],attrs:{type:"email"}},{type:d.fS.TEXT,name:"username",label:"Username",validators:[a.kI.required,V.t,a.kI.maxLength(12)],asyncValidators:[this.uniqueUsernameValidator.validate.bind(this.uniqueUsernameValidator)]},{type:d.fS.TEXT,name:"password",label:"Password",validators:[a.kI.required,a.kI.minLength(8),a.kI.maxLength(100),I.q],attrs:{type:"password"}},{type:d.fS.TEXT,name:"passwordConfirmation",label:"Password confirmation",validators:[a.kI.required,a.kI.minLength(8),a.kI.maxLength(100),I.q],attrs:{type:"password"},groupErrors:[{type:"passwordsNotMatch",message:"Passwords should match"}]},{type:d.fS.FORM_GROUP,name:null,validators:[X]}];this.store.dispatch(L.i.setStructure({structure:e}))}ngOnDestroy(){this.store.dispatch(L.i.destroyForm()),this.store.dispatch(g.Y.resetRegister())}}return o.\u0275fac=function(e){return new(e||o)(t.Y36(C.yh),t.Y36(T.s),t.Y36(U._W),t.Y36(B),t.Y36(q))},o.\u0275cmp=t.Xpm({type:o,selectors:[["register-form"]],viewQuery:function(e,r){if(1&e&&t.Gf(_,7),2&e){let s;t.iGM(s=t.CRH())&&(r.dynamicForm=s.first)}},standalone:!0,features:[t.jDz],decls:7,vars:10,consts:[[3,"error",4,"ngIf"],[3,"data$","structure$","updateForm"],["dynamicForm",""],["label","Submit",1,"button","submit-button",3,"loading","click"],[3,"error"]],template:function(e,r){if(1&e&&(t.YNc(0,tt,1,1,"error-badge",0),t.ALo(1,"async"),t.TgZ(2,"dynamic-form",1,2),t.NdJ("updateForm",function(m){return r.updateForm(m)}),t.qZA(),t.TgZ(4,"p-button",3),t.NdJ("click",function(){return r.onSubmit()}),t.ALo(5,"async"),t.ALo(6,"async"),t.qZA()),2&e){const s=t.MAs(3);t.Q6J("ngIf",t.lcZ(1,4,r.error$)),t.xp6(2),t.Q6J("data$",r.data$)("structure$",r.structure$),t.xp6(2),t.Q6J("loading","PENDING"===t.lcZ(5,6,s.form.statusChanges)&&!!t.lcZ(6,8,s.formSubmitted$))}},dependencies:[l.ez,l.O5,l.Ov,h.N,p.r,f.$,c.hJ,c.zx,W.Z],changeDetection:0}),o})();var R=n(1558);const ot=function(){return{maxWidth:"680px"}};function nt(o,i){if(1&o){const e=t.EpF();t.TgZ(0,"p-dialog",1)(1,"article",2)(2,"header")(3,"h1",3),t._uU(4,"Register"),t.qZA(),t.TgZ(5,"p-button",4),t.NdJ("click",function(){t.CHM(e);const s=t.oxw();return t.KtG(s.closeDialog())}),t.qZA()(),t._UZ(6,"register-form"),t.qZA()()}2&o&&(t.Akn(t.DdM(7,ot)),t.Q6J("visible",!0)("modal",!0)("draggable",!1)("resizable",!1)("showHeader",!1))}let rt=(()=>{class o{onKeydownHandler(e){this.closeDialog()}constructor(e){this.dialogService=e,this.dialog$=this.dialogService.dialog$}closeDialog(){this.dialogService.closeDialog(Z.iR.Register)}}return o.\u0275fac=function(e){return new(e||o)(t.Y36(R.x))},o.\u0275cmp=t.Xpm({type:o,selectors:[["register-dialog"]],hostBindings:function(e,r){1&e&&t.NdJ("keydown.escape",function(m){return r.onKeydownHandler(m)},!1,t.evT)},standalone:!0,features:[t.jDz],decls:2,vars:3,consts:[[3,"visible","modal","draggable","resizable","style","showHeader",4,"ngIf"],[3,"visible","modal","draggable","resizable","showHeader"],[1,"dialog-container"],[1,"color-main"],["icon","pi pi-times","styleClass","p-button-rounded p-button-outlined p-button-text p-button-sm",3,"click"]],template:function(e,r){if(1&e&&(t.YNc(0,nt,7,8,"p-dialog",0),t.ALo(1,"async")),2&e){let s;t.Q6J("ngIf",null==(s=t.lcZ(1,1,r.dialog$))?null:s.register)}},dependencies:[l.ez,l.O5,l.Ov,h.N,c.hJ,c.zx,H.EV,f.$,y.S,y.V,et],styles:["@media (max-width: 450px){.page-container[_ngcontent-%COMP%]{padding:0}  .p-dialog .p-dialog-content{padding:10px 15px 20px}}"],changeDetection:0}),o})();var it=n(4688);function st(o,i){1&o&&t._UZ(0,"loading")}let at=(()=>{class o{constructor(e,r){this.dialogManager=e,this.store=r,this.loading$=this.store.select(u.A.selectLoading)}openRegisterDialog(){this.dialogManager.openDialog(Z.iR.Register,{title:"Register"})}}return o.\u0275fac=function(e){return new(e||o)(t.Y36(R.x),t.Y36(C.yh))},o.\u0275cmp=t.Xpm({type:o,selectors:[["app-login"]],standalone:!0,features:[t.jDz],decls:15,vars:3,consts:[[1,"flex","h-100"],[1,"surface-section","w-full","lg:w-7","xl:w-6","p-6","md:p-8","login-container"],[1,"mb-5"],["src","assets/blogger-logo-icon.png","alt","Image","height","70",1,"mb-3"],[1,"text-900","text-3xl","font-medium","mb-3"],[1,"text-600","font-medium","mr-2"],[1,"font-medium","no-underline","text-blue-500","cursor-pointer",3,"click"],[4,"ngIf"],[1,"hidden","md:block","w-7","xl:w-full","bg-no-repeat","bg-cover",2,"background-image","url('assets/images/signin.jpg')"]],template:function(e,r){1&e&&(t.TgZ(0,"div",0)(1,"div",1)(2,"div",2),t._UZ(3,"img",3),t.TgZ(4,"div",4),t._uU(5,"Welcome Back"),t.qZA(),t.TgZ(6,"span",5),t._uU(7,"Don't have an account?"),t.qZA(),t.TgZ(8,"a",6),t.NdJ("click",function(){return r.openRegisterDialog()}),t._uU(9,"Create one today!"),t.qZA()(),t.YNc(10,st,1,0,"loading",7),t.ALo(11,"async"),t._UZ(12,"login-form"),t.qZA(),t._UZ(13,"div",8),t.qZA(),t._UZ(14,"register-dialog")),2&e&&(t.xp6(10),t.Q6J("ngIf",t.lcZ(11,1,r.loading$)))},dependencies:[l.ez,l.O5,l.Ov,N.C,h.N,O.nD,c.hJ,E.T,y.S,Q,D.I,it.N,rt],changeDetection:0}),o})()}}]);