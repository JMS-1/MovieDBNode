"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[390],{7390:(U,u,l)=>{l.r(u),l.d(u,{SeriesModule:()=>G});var a=l(9808),c=l(2382),d=l(147),e=l(1223),E=l(6279),M=l(4387),g=l(5982),v=l(7886),T=l(7005),O=l(2722);function R(n,o){if(1&n){const t=e.EpF();e.TgZ(0,"div",20),e.NdJ("click",function(){e.CHM(t);const i=e.oxw(2);return e.KtG(i.onRemove())}),e.SDv(1,21),e.qZA()}}const m=function(n){return{disabled:n}},N=function(n){return{errors:n}},p=function(n){return{error:n}};function F(n,o){if(1&n){const t=e.EpF();e.TgZ(0,"div")(1,"div",1)(2,"div",2),e.NdJ("click",function(){e.CHM(t);const i=e.oxw();return e.KtG(i.reload())}),e.SDv(3,3),e.qZA(),e.TgZ(4,"div",4),e.NdJ("click",function(){e.CHM(t);const i=e.oxw();return e.KtG(i.onSave())}),e.SDv(5,5),e.qZA(),e.YNc(6,R,2,0,"div",6),e.qZA(),e.TgZ(7,"div",7)(8,"div",8)(9,"label"),e.SDv(10,9),e.qZA(),e.TgZ(11,"semantic-single-select",10),e.NdJ("selectedChange",function(i){e.CHM(t);const r=e.oxw();return e.KtG(r.parentId=i)}),e.qZA()(),e._UZ(12,"app-validation-errors",11),e.TgZ(13,"div",12)(14,"label"),e.SDv(15,13),e.qZA(),e.TgZ(16,"div",14)(17,"input",15),e.NdJ("ngModelChange",function(i){e.CHM(t);const r=e.oxw();return e.KtG(r.name=i)}),e.qZA()()(),e._UZ(18,"app-validation-errors",11),e.TgZ(19,"div",8)(20,"label"),e.SDv(21,16),e.qZA(),e.TgZ(22,"div",14)(23,"textarea",17),e.NdJ("ngModelChange",function(i){e.CHM(t);const r=e.oxw();return e.KtG(r.description=i)}),e.qZA()()(),e._UZ(24,"app-validation-errors",11),e.qZA(),e.TgZ(25,"app-semantic-modal",18),e.NdJ("closed",function(){e.CHM(t);const i=e.oxw();return e.KtG(i.confirm=!1)})("confirm",function(){e.CHM(t);const i=e.oxw();return e.KtG(i.onConfirm())}),e.tHW(26,19),e._UZ(27,"strong"),e.N_p(),e.qZA()()}if(2&n){const t=e.oxw();e.xp6(2),e.Q6J("ngClass",e.VKq(15,m,!t.edit.isDirty)),e.xp6(2),e.Q6J("ngClass",e.VKq(17,m,!t.edit.isDirty||t.edit.validationErrors)),e.xp6(2),e.Q6J("ngIf",t.editId),e.xp6(1),e.Q6J("ngClass",e.VKq(19,N,t.edit.validationErrors)),e.xp6(1),e.Q6J("ngClass",e.VKq(21,p,null==t.edit.validationErrors?null:t.edit.validationErrors.parentId)),e.xp6(3),e.Q6J("items",t.parentAsItems)("selected",t.parentId),e.xp6(1),e.Q6J("list",null==t.edit.validationErrors?null:t.edit.validationErrors.parentId),e.xp6(1),e.Q6J("ngClass",e.VKq(23,p,null==t.edit.validationErrors?null:t.edit.validationErrors.name)),e.xp6(4),e.Q6J("ngModel",t.name),e.xp6(1),e.Q6J("list",null==t.edit.validationErrors?null:t.edit.validationErrors.name),e.xp6(1),e.Q6J("ngClass",e.VKq(25,p,null==t.edit.validationErrors?null:t.edit.validationErrors.description)),e.xp6(4),e.Q6J("ngModel",t.description),e.xp6(1),e.Q6J("list",null==t.edit.validationErrors?null:t.edit.validationErrors.description),e.xp6(1),e.Q6J("show",t.confirm)}}let P=(()=>{class n extends M.U{constructor(t){super(),this._service=t,this._map={},this.parentAsItems=[]}getEditService(){return this._service}reload(){super.reload();const t=new Set,s=i=>{t.add(i._id);for(const r of i.children||[])s(r)};if(this.editId&&"@"!==this.editId){const i=this._map[this.editId];i&&s(i)}this.parentAsItems=Object.keys(this._map).filter(i=>!t.has(i)).map(i=>this._map[i]).sort((i,r)=>i.fullName.toLocaleLowerCase().localeCompare(r.fullName.toLocaleLowerCase())).map(i=>({key:i._id,text:i.fullName}))}ngOnInit(){super.ngOnInit(),this._all=this._service.map.subscribe(t=>{this._map=t,this.reload()})}ngOnDestroy(){var t;super.ngOnDestroy(),null===(t=this._all)||void 0===t||t.unsubscribe()}onSave(){this.edit&&this._service.addOrUpdate(this.editId,this.edit)}onConfirm(){this._service.remove(this.editId),this.confirm=!1}get name(){var t;return(null===(t=this.edit)||void 0===t?void 0:t.name)||""}set name(t){this.edit&&(this.edit.name=t)}get description(){var t;return(null===(t=this.edit)||void 0===t?void 0:t.description)||""}set description(t){this.edit&&(this.edit.description=t)}get parentId(){var t;return(null===(t=this.edit)||void 0===t?void 0:t.parentId)||""}set parentId(t){this.edit&&(this.edit.parentId=t||void 0)}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(g._))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-series-form"]],features:[e.qOj],decls:1,vars:1,consts:function(){let o,t,s,i,r,f,C,h;return o="Cancel",t="Save",s="Parent Series",i="(none)",r="Name",f="Description",C="\n          Deleting a Series can\n          " + "\ufffd#27\ufffd" + "\n          not\n          " + "\ufffd/#27\ufffd" + "\n          be undone. Do you really want to delete this Series?\n        ",h="Delete",[[4,"ngIf"],[1,"actions"],[1,"ui","button",3,"ngClass","click"],o,[1,"ui","primary","button",3,"ngClass","click"],t,["class","ui negative button",3,"click",4,"ngIf"],[1,"ui","form",3,"ngClass"],[1,"field",3,"ngClass"],s,["hint",i,3,"items","selected","selectedChange"],[3,"list"],[1,"required","field",3,"ngClass"],r,[1,"ui","input"],["type","text",3,"ngModel","ngModelChange"],f,["rows","5",3,"ngModel","ngModelChange"],[3,"show","closed","confirm"],C,[1,"ui","negative","button",3,"click"],h]},template:function(t,s){1&t&&e.YNc(0,F,28,27,"div",0),2&t&&e.Q6J("ngIf",s.edit)},dependencies:[a.mk,a.O5,v.u,c.Fj,c.JJ,c.On,T.z,O.H],styles:["[_nghost-%COMP%]{width:100%;height:100%;padding-right:.5em;overflow:auto}"]}),n})();var I=l(3771);const A=function(n){return["/series",n]};let $=(()=>{class n{constructor(){this.series=void 0}}return n.\u0275fac=function(t){return new(t||n)},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-series-item"]],inputs:{series:"series"},decls:2,vars:4,consts:[[1,"item",3,"routerLink"]],template:function(t,s){1&t&&(e.TgZ(0,"div",0),e._uU(1),e.qZA()),2&t&&(e.Q6J("routerLink",e.VKq(2,A,s.series._id)),e.xp6(1),e.Oqu(s.series.name))},dependencies:[d.rH],styles:["[_nghost-%COMP%]{overflow:hidden}.item[_ngcontent-%COMP%]{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}"]}),n})();const x=function(n){return{active:n}};function L(n,o){if(1&n&&e._UZ(0,"app-series-item",4),2&n){const t=o.$implicit,s=e.oxw();e.Akn("margin-left: "+t.level+"em"),e.Q6J("ngClass",e.VKq(4,x,t._id===s.selected))("series",t)}}let y=(()=>{class n{constructor(t){this._service=t,this.selected="",this.items=[],this.all=[],this._map={},this._filter=""}ngOnInit(){this._query=this._service.map.subscribe(t=>{this._map=t,this.all=Object.keys(t).map(s=>t[s]).sort((s,i)=>s.fullName.toLocaleLowerCase().localeCompare(i.fullName.toLocaleLowerCase())),this.refreshFilter()})}get filter(){return this._filter}set filter(t){this._filter=t,this.refreshFilter()}refreshFilter(){const t=(this._filter||"").toLocaleLowerCase(),s=new Set(this.all.filter(i=>!t||i.fullName.toLocaleLowerCase().indexOf(t)>=0).map(i=>i._id));for(let i of Array.from(s))for(;;){const r=this._map[i];if(!r)break;s.add(i),i=r.parentId||""}this.items=this.all.filter(i=>s.has(i._id))}ngOnDestroy(){var t;null===(t=this._query)||void 0===t||t.unsubscribe()}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(g._))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-series-list"]],inputs:{selected:"selected"},decls:4,vars:3,consts:function(){let o;return o="Search...",[[1,"complete"],["hint",o,3,"text","clearable","textChange"],[1,"ui","selection","list"],["class","item",3,"ngClass","series","style",4,"ngFor","ngForOf"],[1,"item",3,"ngClass","series"]]},template:function(t,s){1&t&&(e.TgZ(0,"div",0)(1,"semantic-search",1),e.NdJ("textChange",function(r){return s.filter=r}),e.qZA(),e.TgZ(2,"div",2),e.YNc(3,L,1,6,"app-series-item",3),e.qZA()()),2&t&&(e.xp6(1),e.Q6J("text",s.filter)("clearable",!0),e.xp6(2),e.Q6J("ngForOf",s.items))},dependencies:[a.mk,a.sg,I.g,$],styles:["[_nghost-%COMP%]{width:100%;height:100%;overflow:auto}.complete[_ngcontent-%COMP%]{display:grid;grid-template-rows:auto 1fr;height:100%;overflow:hidden}.complete[_ngcontent-%COMP%] > .ui.list[_ngcontent-%COMP%]{row-gap:10em;padding:.5em;overflow:auto;background:#ffffff}.complete[_ngcontent-%COMP%] > .ui.list[_ngcontent-%COMP%] > .item[_ngcontent-%COMP%] + .item[_ngcontent-%COMP%]{margin-top:.5em}.complete[_ngcontent-%COMP%] > .ui.list[_ngcontent-%COMP%] > .item[_ngcontent-%COMP%]:not(.active):not(:hover){color:#666;background:#dddddd}"]}),n})(),S=(()=>{class n{constructor(t){this._route=t,this.selected=""}ngOnInit(){this._query=this._route.params.subscribe(t=>this.selected=t.id)}ngOnDestroy(){var t;null===(t=this._query)||void 0===t||t.unsubscribe()}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(d.gz))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-series"]],decls:3,vars:2,consts:[[1,"page"],["list","",3,"selected"],["detail","",3,"selected"]],template:function(t,s){1&t&&(e.TgZ(0,"app-master-detail",0),e._UZ(1,"app-series-list",1)(2,"app-series-form",2),e.qZA()),2&t&&(e.xp6(1),e.Q6J("selected",s.selected),e.xp6(1),e.Q6J("selected",s.selected))},dependencies:[E.B,P,y],styles:["[_nghost-%COMP%]{width:100%;height:100%;overflow:hidden}.page[_ngcontent-%COMP%]{width:100%;height:100%;overflow:hidden}"]}),n})();const w=[{component:S,path:"",pathMatch:"full"},{component:S,path:":id"}];let Z=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[d.Bz.forChild(w),d.Bz]}),n})();var J=l(1075);let G=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[a.ez,J.m,d.Bz,c.u5,Z]}),n})()}}]);