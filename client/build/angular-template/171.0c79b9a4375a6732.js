"use strict";(self.webpackChunkangular_template=self.webpackChunkangular_template||[]).push([[171],{4171:(M,i,e)=>{e.r(i),e.d(i,{default:()=>v});var a=e(6895),_=e(6434),E=e(6935),O=e(9841),l=e(9646),d=e(262),r=e(8126),f=e(2474),t=e(4650),m=e(9653),D=e(4688);function g(n,o){1&n&&t._UZ(0,"loading")}let v=(()=>{class n{constructor(s){this.store=s,this.articles$=this.store.select(r.q.selectEntities),this.loading$=this.store.select(r.q.selectLoading),this.vm$=(0,O.a)({articles:this.articles$,loading:this.loading$,editing:(0,l.of)(!0),showFromAuthor:(0,l.of)(!1)}).pipe((0,d.K)(this.handleError))}ngOnInit(){this.store.dispatch(_.u.loadOffensiveArticles())}handleError(s){return console.log("[ArticleListVM - ERROR",s),(0,l.of)(!0)}ngOnDestroy(){this.store.dispatch(_.u.reset())}}return n.\u0275fac=function(s){return new(s||n)(t.Y36(m.yh))},n.\u0275cmp=t.Xpm({type:n,selectors:[["article-management"]],standalone:!0,features:[t.jDz],decls:6,vars:5,consts:[[1,"private-page-container"],[3,"vm$","canDelete"],[4,"ngIf"]],template:function(s,c){1&s&&(t.TgZ(0,"div",0)(1,"h1"),t._uU(2,"Article Management"),t.qZA(),t._UZ(3,"article-list",1),t.YNc(4,g,1,0,"loading",2),t.ALo(5,"async"),t.qZA()),2&s&&(t.xp6(3),t.Q6J("vm$",c.vm$)("canDelete",!1),t.xp6(1),t.Q6J("ngIf",t.lcZ(5,3,c.loading$)))},dependencies:[a.ez,a.O5,a.Ov,E.P,f.I,D.N],changeDetection:0}),n})()}}]);