"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[933],{7933:(B,m,c)=>{c.r(m),c.d(m,{ContainerModule:()=>H});var d=c(6895),C=c(433),p=c(8902),e=c(8256),S=c(6279),_=c(4061),R=c(4387),f=c(8197),A=c(7886),P=c(7005),y=c(2722);const F={[_.j.Box]:"briefcase",[_.j.Disk]:"hdd",[_.j.FeatureSet]:"zip",[_.j.Folder]:"folder",[_.j.Shelf]:"building",[_.j.Undefined]:"help"};let T=(()=>{class t{constructor(){this.type=_.j.Undefined}get iconType(){return F[this.type]||"help"}}return t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-container-icon"]],inputs:{type:"type"},decls:1,vars:1,consts:[[1,"ui","icon",3,"ngClass"]],template:function(n,o){1&n&&e._UZ(0,"i",0),2&n&&e.Q6J("ngClass",o.iconType)},dependencies:[d.mk]}),t})();const I=["selector"];let x=(()=>{class t{constructor(){this.selected=_.j.Undefined,this.selectedChange=new e.vpe}setSelected(n){$(this.selector?.nativeElement)?.dropdown("set exactly","number"==typeof n?`${n}`:[])}ngAfterViewInit(){const n=$(this.selector?.nativeElement);n.dropdown({forceSelection:!1,onChange:o=>this.selectedChange.emit(parseInt(o,10))}),setTimeout(()=>{this.setSelected(this.selected),n.css("visibility","")},100)}ngOnChanges(n){const o=n.selected;o&&this.setSelected(o.currentValue)}ngOnDestroy(){$(this.selector?.nativeElement)?.dropdown("destroy")}}return t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-component-type"]],viewQuery:function(n,o){if(1&n&&e.Gf(I,5),2&n){let i;e.iGM(i=e.CRH())&&(o.selector=i.first)}},inputs:{selected:"selected"},outputs:{selectedChange:"selectedChange"},features:[e.TTD],decls:23,vars:6,consts:[[1,"ui","selection","dropdown",2,"visibility","hidden"],["selector",""],[1,"dropdown","icon"],[1,"default","text"],[1,"menu"],["data-value","0",1,"item"],[3,"type"],["data-value","1",1,"item"],["data-value","2",1,"item"],["data-value","3",1,"item"],["data-value","5",1,"item"],["data-value","4",1,"item"]],template:function(n,o){1&n&&(e.TgZ(0,"div",0,1),e._UZ(2,"i",2)(3,"div",3),e.TgZ(4,"div",4)(5,"div",5),e._UZ(6,"app-container-icon",6),e._uU(7,"(unbekannt) "),e.qZA(),e.TgZ(8,"div",7),e._UZ(9,"app-container-icon",6),e._uU(10,"Kleine DVD Box "),e.qZA(),e.TgZ(11,"div",8),e._UZ(12,"app-container-icon",6),e._uU(13,"Gro\xdfe DVD Box "),e.qZA(),e.TgZ(14,"div",9),e._UZ(15,"app-container-icon",6),e._uU(16,"Regal(fach) "),e.qZA(),e.TgZ(17,"div",10),e._UZ(18,"app-container-icon",6),e._uU(19,"Dateiverzeichnis "),e.qZA(),e.TgZ(20,"div",11),e._UZ(21,"app-container-icon",6),e._uU(22,"(Externe) Festplatte "),e.qZA()()()),2&n&&(e.xp6(6),e.Q6J("type",0),e.xp6(3),e.Q6J("type",1),e.xp6(3),e.Q6J("type",2),e.xp6(3),e.Q6J("type",3),e.xp6(3),e.Q6J("type",5),e.xp6(3),e.Q6J("type",4))},dependencies:[T],styles:[".ui.selection.dropdown[_ngcontent-%COMP%] > .text[_ngcontent-%COMP%]{width:12em}"]}),t})();function Z(t,r){if(1&t){const n=e.EpF();e.TgZ(0,"div",24),e.NdJ("click",function(){e.CHM(n);const i=e.oxw(2);return e.KtG(i.onRemove())}),e.SDv(1,25),e.qZA()}}const L=function(t){return["/recordings",t]};function b(t,r){if(1&t&&(e.TgZ(0,"tr",30)(1,"td"),e._uU(2),e.qZA(),e.TgZ(3,"td",31),e._uU(4),e.qZA()()),2&t){const n=r.$implicit;e.Q6J("routerLink",e.VKq(3,L,n._id)),e.xp6(2),e.Oqu(n.fullName),e.xp6(2),e.Oqu(n.containerPosition)}}function w(t,r){if(1&t&&(e.TgZ(0,"table",26)(1,"thead")(2,"tr")(3,"th"),e.SDv(4,27),e.qZA(),e.TgZ(5,"th"),e.SDv(6,28),e.qZA()()(),e.TgZ(7,"tbody"),e.YNc(8,b,5,5,"tr",29),e.qZA()()),2&t){const n=e.oxw(2);e.xp6(8),e.Q6J("ngForOf",n.contents)}}const h=function(t){return{disabled:t}},U=function(t){return{errors:t}},g=function(t){return{error:t}};function J(t,r){if(1&t){const n=e.EpF();e.TgZ(0,"div")(1,"div",1)(2,"div",2),e.NdJ("click",function(){e.CHM(n);const i=e.oxw();return e.KtG(i.reload())}),e.SDv(3,3),e.qZA(),e.TgZ(4,"div",4),e.NdJ("click",function(){e.CHM(n);const i=e.oxw();return e.KtG(i.onSave())}),e.SDv(5,5),e.qZA(),e.YNc(6,Z,2,0,"div",6),e.qZA(),e.TgZ(7,"div",7)(8,"div",8)(9,"label"),e.SDv(10,9),e.qZA(),e.TgZ(11,"semantic-single-select",10),e.NdJ("selectedChange",function(i){e.CHM(n);const s=e.oxw();return e.KtG(s.parentId=i)}),e.qZA()(),e._UZ(12,"app-validation-errors",11),e.TgZ(13,"div",12)(14,"label"),e.SDv(15,13),e.qZA(),e.TgZ(16,"div",14)(17,"input",15),e.NdJ("ngModelChange",function(i){e.CHM(n);const s=e.oxw();return e.KtG(s.name=i)}),e.qZA()()(),e._UZ(18,"app-validation-errors",11),e.TgZ(19,"div",12)(20,"label"),e.SDv(21,16),e.qZA(),e.TgZ(22,"app-component-type",17),e.NdJ("selectedChange",function(i){e.CHM(n);const s=e.oxw();return e.KtG(s.type=i)}),e.qZA()(),e._UZ(23,"app-validation-errors",11),e.TgZ(24,"div",8)(25,"label"),e.SDv(26,18),e.qZA(),e.TgZ(27,"div",14)(28,"textarea",19),e.NdJ("ngModelChange",function(i){e.CHM(n);const s=e.oxw();return e.KtG(s.description=i)}),e.qZA()()(),e._UZ(29,"app-validation-errors",11),e.TgZ(30,"div",8)(31,"label"),e.SDv(32,20),e.qZA(),e.TgZ(33,"div",14)(34,"input",15),e.NdJ("ngModelChange",function(i){e.CHM(n);const s=e.oxw();return e.KtG(s.parentLocation=i)}),e.qZA()()(),e._UZ(35,"app-validation-errors",11),e.qZA(),e.YNc(36,w,9,1,"table",21),e.TgZ(37,"app-semantic-modal",22),e.NdJ("closed",function(){e.CHM(n);const i=e.oxw();return e.KtG(i.confirm=!1)})("confirm",function(){e.CHM(n);const i=e.oxw();return e.KtG(i.onConfirm())}),e.tHW(38,23),e._UZ(39,"strong"),e.N_p(),e.qZA()()}if(2&t){const n=e.oxw();e.xp6(2),e.Q6J("ngClass",e.VKq(22,h,!n.edit.isDirty)),e.xp6(2),e.Q6J("ngClass",e.VKq(24,h,!n.edit.isDirty||n.edit.validationErrors)),e.xp6(2),e.Q6J("ngIf",n.editId),e.xp6(1),e.Q6J("ngClass",e.VKq(26,U,n.edit.validationErrors)),e.xp6(1),e.Q6J("ngClass",e.VKq(28,g,null==n.edit.validationErrors?null:n.edit.validationErrors.parentId)),e.xp6(3),e.Q6J("items",n.parentAsItems)("selected",n.parentId),e.xp6(1),e.Q6J("list",null==n.edit.validationErrors?null:n.edit.validationErrors.parentId),e.xp6(1),e.Q6J("ngClass",e.VKq(30,g,null==n.edit.validationErrors?null:n.edit.validationErrors.name)),e.xp6(4),e.Q6J("ngModel",n.name),e.xp6(1),e.Q6J("list",null==n.edit.validationErrors?null:n.edit.validationErrors.name),e.xp6(1),e.Q6J("ngClass",e.VKq(32,g,null==n.edit.validationErrors?null:n.edit.validationErrors.type)),e.xp6(3),e.Q6J("selected",n.type),e.xp6(1),e.Q6J("list",null==n.edit.validationErrors?null:n.edit.validationErrors.type),e.xp6(1),e.Q6J("ngClass",e.VKq(34,g,null==n.edit.validationErrors?null:n.edit.validationErrors.description)),e.xp6(4),e.Q6J("ngModel",n.description),e.xp6(1),e.Q6J("list",null==n.edit.validationErrors?null:n.edit.validationErrors.description),e.xp6(1),e.Q6J("ngClass",e.VKq(36,g,null==n.edit.validationErrors?null:n.edit.validationErrors.parentLocation)),e.xp6(4),e.Q6J("ngModel",n.parentLocation),e.xp6(1),e.Q6J("list",null==n.edit.validationErrors?null:n.edit.validationErrors.parentLocation),e.xp6(1),e.Q6J("ngIf",n.contents.length>0),e.xp6(1),e.Q6J("show",n.confirm)}}let G=(()=>{class t extends R.U{constructor(n){super(),this._service=n,this._map={},this.contents=[],this.parentAsItems=[]}getEditService(){return this._service}reload(){super.reload();const n=this._contents;n&&(this._contents=void 0,n.unsubscribe()),this.contents=[];const o=new Set,i=s=>{o.add(s._id);for(const a of s.children||[])i(a)};if(this.editId&&"@"!==this.editId){const s=this._map[this.editId];s&&i(s),this._contents=this._service.getContents(this.editId).subscribe(a=>this.contents=a)}this.parentAsItems=Object.keys(this._map).filter(s=>!o.has(s)).map(s=>this._map[s]).sort((s,a)=>s.fullName.toLocaleLowerCase().localeCompare(a.fullName.toLocaleLowerCase())).map(s=>({key:s._id,text:s.fullName}))}ngOnInit(){super.ngOnInit(),this._all=this._service.map.subscribe(n=>{this._map=n,this.reload()})}ngOnDestroy(){super.ngOnDestroy(),this._all?.unsubscribe(),this._contents?.unsubscribe()}onSave(){this.edit&&this._service.addOrUpdate(this.editId,this.edit)}onConfirm(){this._service.remove(this.editId),this.confirm=!1}get name(){return this.edit?.name||""}set name(n){this.edit&&(this.edit.name=n)}get description(){return this.edit?.description||""}set description(n){this.edit&&(this.edit.description=n)}get parentId(){return this.edit?.parentId||""}set parentId(n){this.edit&&(this.edit.parentId=n||void 0)}get parentLocation(){return this.edit?.parentLocation||""}set parentLocation(n){this.edit&&(this.edit.parentLocation=n)}get type(){return this.edit?.type??_.j.Undefined}set type(n){this.edit&&(this.edit.type=n)}}return t.\u0275fac=function(n){return new(n||t)(e.Y36(f.J))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-container-form"]],features:[e.qOj],decls:1,vars:1,consts:function(){let r,n,o,i,s,a,u,M,E,v,N;return r="Cancel",n="Save",o="\xDCbergeordnete Ablage",i="Name",s="Art der Ablage",a="Beschreibung",u="Position in der \xFCbergeordneten Ablage",M="\n          Das L\xF6schen einer Ablage kann\n          " + "\ufffd#39\ufffd" + "\n          nicht\n          " + "\ufffd/#39\ufffd" + "\n          r\xFCckg\xE4ngig gemacht werden. Soll die Ablage wirklich endg\xFCltig entfernt werden?\n        ",E="Delete",v="Aufzeichnung",N="Position",[[4,"ngIf"],[1,"actions"],[1,"ui","button",3,"ngClass","click"],r,[1,"ui","primary","button",3,"ngClass","click"],n,["class","ui negative button",3,"click",4,"ngIf"],[1,"ui","form",3,"ngClass"],[1,"field",3,"ngClass"],o,["hint","(keine)",3,"items","selected","selectedChange"],[3,"list"],[1,"required","field",3,"ngClass"],i,[1,"ui","input"],["type","text",3,"ngModel","ngModelChange"],s,[3,"selected","selectedChange"],a,["rows","5",3,"ngModel","ngModelChange"],u,["class","ui celled collapsing fixed sortable striped unstackable compact table contents",4,"ngIf"],[3,"show","closed","confirm"],M,[1,"ui","negative","button",3,"click"],E,[1,"ui","celled","collapsing","fixed","sortable","striped","unstackable","compact","table","contents"],v,N,[3,"routerLink",4,"ngFor","ngForOf"],[3,"routerLink"],[2,"text-align","center"]]},template:function(n,o){1&n&&e.YNc(0,J,40,38,"div",0),2&n&&e.Q6J("ngIf",o.edit)},dependencies:[p.rH,d.mk,d.sg,d.O5,A.u,C.Fj,C.JJ,C.On,P.z,y.H,x],styles:["[_nghost-%COMP%]{width:100%;height:100%;padding-right:.5em;overflow:auto}"]}),t})();var Q=c(3771);const q=function(t){return["/containers",t]};let D=(()=>{class t{constructor(){this.container=void 0}}return t.\u0275fac=function(n){return new(n||t)},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-container-item"]],inputs:{container:"container"},decls:4,vars:5,consts:[[1,"item",3,"routerLink"],[3,"type"],[1,"content"]],template:function(n,o){1&n&&(e.TgZ(0,"div",0),e._UZ(1,"app-container-icon",1),e.TgZ(2,"div",2),e._uU(3),e.qZA()()),2&n&&(e.Q6J("routerLink",e.VKq(3,q,o.container._id)),e.xp6(1),e.Q6J("type",o.container.type),e.xp6(2),e.Oqu(o.container.name))},dependencies:[p.rH,T],styles:["[_nghost-%COMP%]{overflow:hidden}.item[_ngcontent-%COMP%]{display:grid;grid-template-columns:auto 1fr;align-items:center;overflow:hidden}.item[_ngcontent-%COMP%] > .content[_ngcontent-%COMP%]{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}"]}),t})();const X=function(t){return{active:t}};function k(t,r){if(1&t&&e._UZ(0,"app-container-item",4),2&t){const n=r.$implicit,o=e.oxw();e.Akn("margin-left: "+n.level+"em"),e.Q6J("ngClass",e.VKq(4,X,n._id===o.selected))("container",n)}}let z=(()=>{class t{constructor(n){this._service=n,this.selected="",this.items=[],this.map={},this.all=[],this._filter=""}ngOnInit(){this._query=this._service.map.subscribe(n=>{const o=Object.keys(n).map(a=>n[a]).filter(a=>!a.parentId||!n[a.parentId]);o.sort((a,u)=>(a.name||a._id).toLocaleLowerCase().localeCompare((u.name||u._id).toLocaleLowerCase()));const i=[],s=a=>{i.push(a),a.children?.forEach(s)};o.forEach(s),this.all=i,this.map=n,this.refreshFilter()})}get filter(){return this._filter}set filter(n){this._filter=n,this.refreshFilter()}refreshFilter(){const n=(this._filter||"").toLocaleLowerCase(),o=new Set(this.all.filter(i=>!n||(i.fullName||i.name||i._id).toLocaleLowerCase().indexOf(n)>=0).map(i=>i._id));for(let i of Array.from(o))for(;;){const s=this.map[i];if(!s)break;o.add(i),i=s.parentId||""}this.items=this.all.filter(i=>o.has(i._id))}ngOnDestroy(){this._query?.unsubscribe()}}return t.\u0275fac=function(n){return new(n||t)(e.Y36(f.J))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-container-list"]],inputs:{selected:"selected"},decls:4,vars:3,consts:function(){let r;return r="Suche...",[[1,"complete"],["hint",r,3,"text","clearable","textChange"],[1,"ui","selection","list"],["class","item",3,"ngClass","container","style",4,"ngFor","ngForOf"],[1,"item",3,"ngClass","container"]]},template:function(n,o){1&n&&(e.TgZ(0,"div",0)(1,"semantic-search",1),e.NdJ("textChange",function(s){return o.filter=s}),e.qZA(),e.TgZ(2,"div",2),e.YNc(3,k,1,6,"app-container-item",3),e.qZA()()),2&n&&(e.xp6(1),e.Q6J("text",o.filter)("clearable",!0),e.xp6(2),e.Q6J("ngForOf",o.items))},dependencies:[d.mk,d.sg,Q.g,D],styles:["[_nghost-%COMP%]{width:100%;height:100%;overflow:auto}.complete[_ngcontent-%COMP%]{display:grid;grid-template-rows:auto 1fr;height:100%;overflow:hidden}.complete[_ngcontent-%COMP%] > .ui.list[_ngcontent-%COMP%]{row-gap:10em;padding:.5em;overflow:auto;background:#ffffff}.complete[_ngcontent-%COMP%] > .ui.list[_ngcontent-%COMP%] > .item[_ngcontent-%COMP%] + .item[_ngcontent-%COMP%]{margin-top:.5em}.complete[_ngcontent-%COMP%] > .ui.list[_ngcontent-%COMP%] > .item[_ngcontent-%COMP%]:not(.active):not(:hover){color:#666;background:#dddddd}"]}),t})(),O=(()=>{class t{constructor(n){this._route=n,this.selected=""}ngOnInit(){this._query=this._route.params.subscribe(n=>this.selected=n.id)}ngOnDestroy(){this._query?.unsubscribe()}}return t.\u0275fac=function(n){return new(n||t)(e.Y36(p.gz))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-container"]],decls:3,vars:2,consts:[[1,"page"],["list","",3,"selected"],["detail","",3,"selected"]],template:function(n,o){1&n&&(e.TgZ(0,"app-master-detail",0),e._UZ(1,"app-container-list",1)(2,"app-container-form",2),e.qZA()),2&n&&(e.xp6(1),e.Q6J("selected",o.selected),e.xp6(1),e.Q6J("selected",o.selected))},dependencies:[S.B,G,z],styles:["[_nghost-%COMP%]{width:100%;height:100%;overflow:hidden}.page[_ngcontent-%COMP%]{width:100%;height:100%;overflow:hidden}"]}),t})();const K=[{component:O,path:"",pathMatch:"full"},{component:O,path:":id"}];let V=(()=>{class t{}return t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[p.Bz.forChild(K),p.Bz]}),t})();var j=c(1075);let H=(()=>{class t{}return t.\u0275fac=function(n){return new(n||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[V,d.ez,j.m,p.Bz,C.u5]}),t})()}}]);