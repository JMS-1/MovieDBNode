"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[390],{7390:(G,m,l)=>{l.r(m),l.d(m,{SeriesModule:()=>J});var a=l(6895),d=l(433),c=l(8902),e=l(8256),h=l(6279),E=l(4387),g=l(5982),M=l(7886),T=l(7005),v=l(2722);function O(n,o){if(1&n){const t=e.EpF();e.TgZ(0,"div",20),e.NdJ("click",function(){e.CHM(t);const i=e.oxw(2);return e.KtG(i.onRemove())}),e.SDv(1,21),e.qZA()}}const u=function(n){return{disabled:n}},R=function(n){return{errors:n}},p=function(n){return{error:n}};function F(n,o){if(1&n){const t=e.EpF();e.TgZ(0,"div")(1,"div",1)(2,"div",2),e.NdJ("click",function(){e.CHM(t);const i=e.oxw();return e.KtG(i.reload())}),e.SDv(3,3),e.qZA(),e.TgZ(4,"div",4),e.NdJ("click",function(){e.CHM(t);const i=e.oxw();return e.KtG(i.onSave())}),e.SDv(5,5),e.qZA(),e.YNc(6,O,2,0,"div",6),e.qZA(),e.TgZ(7,"div",7)(8,"div",8)(9,"label"),e.SDv(10,9),e.qZA(),e.TgZ(11,"semantic-single-select",10),e.NdJ("selectedChange",function(i){e.CHM(t);const r=e.oxw();return e.KtG(r.parentId=i)}),e.qZA()(),e._UZ(12,"app-validation-errors",11),e.TgZ(13,"div",12)(14,"label"),e.SDv(15,13),e.qZA(),e.TgZ(16,"div",14)(17,"input",15),e.NdJ("ngModelChange",function(i){e.CHM(t);const r=e.oxw();return e.KtG(r.name=i)}),e.qZA()()(),e._UZ(18,"app-validation-errors",11),e.TgZ(19,"div",8)(20,"label"),e.SDv(21,16),e.qZA(),e.TgZ(22,"div",14)(23,"textarea",17),e.NdJ("ngModelChange",function(i){e.CHM(t);const r=e.oxw();return e.KtG(r.description=i)}),e.qZA()()(),e._UZ(24,"app-validation-errors",11),e.qZA(),e.TgZ(25,"app-semantic-modal",18),e.NdJ("closed",function(){e.CHM(t);const i=e.oxw();return e.KtG(i.confirm=!1)})("confirm",function(){e.CHM(t);const i=e.oxw();return e.KtG(i.onConfirm())}),e.tHW(26,19),e._UZ(27,"strong"),e.N_p(),e.qZA()()}if(2&n){const t=e.oxw();e.xp6(2),e.Q6J("ngClass",e.VKq(15,u,!t.edit.isDirty)),e.xp6(2),e.Q6J("ngClass",e.VKq(17,u,!t.edit.isDirty||t.edit.validationErrors)),e.xp6(2),e.Q6J("ngIf",t.editId),e.xp6(1),e.Q6J("ngClass",e.VKq(19,R,t.edit.validationErrors)),e.xp6(1),e.Q6J("ngClass",e.VKq(21,p,null==t.edit.validationErrors?null:t.edit.validationErrors.parentId)),e.xp6(3),e.Q6J("items",t.parentAsItems)("selected",t.parentId),e.xp6(1),e.Q6J("list",null==t.edit.validationErrors?null:t.edit.validationErrors.parentId),e.xp6(1),e.Q6J("ngClass",e.VKq(23,p,null==t.edit.validationErrors?null:t.edit.validationErrors.name)),e.xp6(4),e.Q6J("ngModel",t.name),e.xp6(1),e.Q6J("list",null==t.edit.validationErrors?null:t.edit.validationErrors.name),e.xp6(1),e.Q6J("ngClass",e.VKq(25,p,null==t.edit.validationErrors?null:t.edit.validationErrors.description)),e.xp6(4),e.Q6J("ngModel",t.description),e.xp6(1),e.Q6J("list",null==t.edit.validationErrors?null:t.edit.validationErrors.description),e.xp6(1),e.Q6J("show",t.confirm)}}let N=(()=>{class n extends E.U{constructor(t){super(),this._service=t,this._map={},this.parentAsItems=[]}getEditService(){return this._service}reload(){super.reload();const t=new Set,s=i=>{t.add(i._id);for(const r of i.children||[])s(r)};if(this.editId&&"@"!==this.editId){const i=this._map[this.editId];i&&s(i)}this.parentAsItems=Object.keys(this._map).filter(i=>!t.has(i)).map(i=>this._map[i]).sort((i,r)=>i.fullName.toLocaleLowerCase().localeCompare(r.fullName.toLocaleLowerCase())).map(i=>({key:i._id,text:i.fullName}))}ngOnInit(){super.ngOnInit(),this._all=this._service.map.subscribe(t=>{this._map=t,this.reload()})}ngOnDestroy(){super.ngOnDestroy(),this._all?.unsubscribe()}onSave(){this.edit&&this._service.addOrUpdate(this.editId,this.edit)}onConfirm(){this._service.remove(this.editId),this.confirm=!1}get name(){return this.edit?.name||""}set name(t){this.edit&&(this.edit.name=t)}get description(){return this.edit?.description||""}set description(t){this.edit&&(this.edit.description=t)}get parentId(){return this.edit?.parentId||""}set parentId(t){this.edit&&(this.edit.parentId=t||void 0)}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(g._))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-series-form"]],features:[e.qOj],decls:1,vars:1,consts:function(){let o,t,s,i,r,f,C;return o=" Verwerfen ",t=" Speichern ",s="\xDCbergeordnete Ablage",i="Name",r="Beschreibung",f=" Das L\xF6schen einer Serie kann " + "\ufffd#27\ufffd" + "nicht" + "\ufffd/#27\ufffd" + " r\xFCckg\xE4ngig gemacht werden. Soll die Serie wirklich endg\xFCltig entfernt werden? ",C="L\xF6schen",[[4,"ngIf"],[1,"actions"],[1,"ui","button",3,"ngClass","click"],o,[1,"ui","primary","button",3,"ngClass","click"],t,["class","ui negative button",3,"click",4,"ngIf"],[1,"ui","form",3,"ngClass"],[1,"field",3,"ngClass"],s,["hint","(keine)",3,"items","selected","selectedChange"],[3,"list"],[1,"required","field",3,"ngClass"],i,[1,"ui","input"],["type","text",3,"ngModel","ngModelChange"],r,["rows","5",3,"ngModel","ngModelChange"],[3,"show","closed","confirm"],f,[1,"ui","negative","button",3,"click"],C]},template:function(t,s){1&t&&e.YNc(0,F,28,27,"div",0),2&t&&e.Q6J("ngIf",s.edit)},dependencies:[a.mk,a.O5,M.u,d.Fj,d.JJ,d.On,T.z,v.H],styles:["[_nghost-%COMP%]{width:100%;height:100%;padding-right:.5em;overflow:auto}"]}),n})();var I=l(3771);const P=function(n){return["/series",n]};let A=(()=>{class n{constructor(){this.series=void 0}}return n.\u0275fac=function(t){return new(t||n)},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-series-item"]],inputs:{series:"series"},decls:2,vars:4,consts:[[1,"item",3,"routerLink"]],template:function(t,s){1&t&&(e.TgZ(0,"div",0),e._uU(1),e.qZA()),2&t&&(e.Q6J("routerLink",e.VKq(2,P,s.series._id)),e.xp6(1),e.Oqu(s.series.name))},dependencies:[c.rH],styles:["[_nghost-%COMP%]{overflow:hidden}.item[_ngcontent-%COMP%]{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}"]}),n})();const x=function(n){return{active:n}};function $(n,o){if(1&n&&e._UZ(0,"app-series-item",4),2&n){const t=o.$implicit,s=e.oxw();e.Akn("margin-left: "+t.level+"em"),e.Q6J("ngClass",e.VKq(4,x,t._id===s.selected))("series",t)}}let L=(()=>{class n{constructor(t){this._service=t,this.selected="",this.items=[],this.all=[],this._map={},this._filter=""}ngOnInit(){this._query=this._service.map.subscribe(t=>{this._map=t,this.all=Object.keys(t).map(s=>t[s]).sort((s,i)=>s.fullName.toLocaleLowerCase().localeCompare(i.fullName.toLocaleLowerCase())),this.refreshFilter()})}get filter(){return this._filter}set filter(t){this._filter=t,this.refreshFilter()}refreshFilter(){const t=(this._filter||"").toLocaleLowerCase(),s=new Set(this.all.filter(i=>!t||i.fullName.toLocaleLowerCase().indexOf(t)>=0).map(i=>i._id));for(let i of Array.from(s))for(;;){const r=this._map[i];if(!r)break;s.add(i),i=r.parentId||""}this.items=this.all.filter(i=>s.has(i._id))}ngOnDestroy(){this._query?.unsubscribe()}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(g._))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-series-list"]],inputs:{selected:"selected"},decls:4,vars:3,consts:function(){let o;return o="Suche...",[[1,"complete"],["hint",o,3,"text","clearable","textChange"],[1,"ui","selection","list"],["class","item",3,"ngClass","series","style",4,"ngFor","ngForOf"],[1,"item",3,"ngClass","series"]]},template:function(t,s){1&t&&(e.TgZ(0,"div",0)(1,"semantic-search",1),e.NdJ("textChange",function(r){return s.filter=r}),e.qZA(),e.TgZ(2,"div",2),e.YNc(3,$,1,6,"app-series-item",3),e.qZA()()),2&t&&(e.xp6(1),e.Q6J("text",s.filter)("clearable",!0),e.xp6(2),e.Q6J("ngForOf",s.items))},dependencies:[a.mk,a.sg,I.g,A],styles:["[_nghost-%COMP%]{width:100%;height:100%;overflow:auto}.complete[_ngcontent-%COMP%]{display:grid;grid-template-rows:auto 1fr;height:100%;overflow:hidden}.complete[_ngcontent-%COMP%] > .ui.list[_ngcontent-%COMP%]{row-gap:10em;padding:.5em;overflow:auto;background:#ffffff}.complete[_ngcontent-%COMP%] > .ui.list[_ngcontent-%COMP%] > .item[_ngcontent-%COMP%] + .item[_ngcontent-%COMP%]{margin-top:.5em}.complete[_ngcontent-%COMP%] > .ui.list[_ngcontent-%COMP%] > .item[_ngcontent-%COMP%]:not(.active):not(:hover){color:#666;background:#dddddd}"]}),n})(),S=(()=>{class n{constructor(t){this._route=t,this.selected=""}ngOnInit(){this._query=this._route.params.subscribe(t=>this.selected=t.id)}ngOnDestroy(){this._query?.unsubscribe()}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(c.gz))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-series"]],decls:3,vars:2,consts:[[1,"page"],["list","",3,"selected"],["detail","",3,"selected"]],template:function(t,s){1&t&&(e.TgZ(0,"app-master-detail",0),e._UZ(1,"app-series-list",1)(2,"app-series-form",2),e.qZA()),2&t&&(e.xp6(1),e.Q6J("selected",s.selected),e.xp6(1),e.Q6J("selected",s.selected))},dependencies:[h.B,N,L],styles:["[_nghost-%COMP%]{width:100%;height:100%;overflow:hidden}.page[_ngcontent-%COMP%]{width:100%;height:100%;overflow:hidden}"]}),n})();const y=[{component:S,path:"",pathMatch:"full"},{component:S,path:":id"}];let w=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[c.Bz.forChild(y),c.Bz]}),n})();var Z=l(1075);let J=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[a.ez,Z.m,c.Bz,d.u5,w]}),n})()}}]);