"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[468],{9468:(Te,N,s)=>{s.r(N),s.d(N,{RecordingModule:()=>Ee});var d=s(6895),c=s(433),p=s(8902),m=s(4387),e=s(8256),M=s(9378),u=s(7886),I=s(7005),A=s(8197),f=s(2722);const S=function(i){return{error:i}};function P(i,o){if(1&i){const n=e.EpF();e.TgZ(0,"div",2)(1,"label"),e.SDv(2,3),e.qZA(),e.TgZ(3,"semantic-single-select",4),e.NdJ("selectedChange",function(r){e.CHM(n);const _=e.oxw();return e.KtG(_.container=r)}),e.qZA()()}if(2&i){const n=e.oxw();e.Q6J("ngClass",e.VKq(3,S,null==n.edit.validationErrors?null:n.edit.validationErrors.containerId)),e.xp6(3),e.Q6J("items",n.ordered)("selected",n.container)}}function h(i,o){if(1&i&&e._UZ(0,"app-validation-errors",5),2&i){const n=e.oxw();e.Q6J("list",null==n.edit.validationErrors?null:n.edit.validationErrors.containerId)}}function G(i,o){if(1&i){const n=e.EpF();e.TgZ(0,"div",2)(1,"label"),e.SDv(2,6),e.qZA(),e.TgZ(3,"div",7)(4,"input",8),e.NdJ("ngModelChange",function(r){e.CHM(n);const _=e.oxw();return e.KtG(_.position=r)}),e.qZA()()()}if(2&i){const n=e.oxw();e.Q6J("ngClass",e.VKq(2,S,null==n.edit.validationErrors?null:n.edit.validationErrors.containerPosition)),e.xp6(4),e.Q6J("ngModel",n.position)}}function x(i,o){if(1&i&&e._UZ(0,"app-validation-errors",5),2&i){const n=e.oxw();e.Q6J("list",null==n.edit.validationErrors?null:n.edit.validationErrors.containerPosition)}}let D=(()=>{class i{constructor(n){this._service=n,this.ordered=[]}ngOnInit(){this._container=this._service.map.subscribe(n=>this.ordered=Object.keys(n).map(t=>({key:t,text:n[t].fullName||t})).sort((t,r)=>t.text.toLocaleLowerCase().localeCompare(r.text.toLocaleLowerCase())))}ngOnDestroy(){this._container?.unsubscribe()}get container(){return this.edit?.containerId||""}set container(n){this.edit&&(this.edit.containerId=n||void 0)}get position(){return this.edit?.containerPosition||""}set position(n){this.edit&&(this.edit.containerPosition=n)}}return i.\u0275fac=function(n){return new(n||i)(e.Y36(A.J))},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-recording-container"]],inputs:{edit:"edit"},decls:4,vars:4,consts:function(){let o,n,t;return o="Storage",n="(assign Storage)",t="Location",[["class","field",3,"ngClass",4,"ngIf"],[3,"list",4,"ngIf"],[1,"field",3,"ngClass"],o,["hint",n,3,"items","selected","selectedChange"],[3,"list"],t,[1,"ui","input"],["type","text",3,"ngModel","ngModelChange"]]},template:function(n,t){1&n&&(e.YNc(0,P,4,5,"div",0),e.YNc(1,h,1,1,"app-validation-errors",1),e.YNc(2,G,5,4,"div",0),e.YNc(3,x,1,1,"app-validation-errors",1)),2&n&&(e.Q6J("ngIf",t.edit),e.xp6(1),e.Q6J("ngIf",t.edit),e.xp6(1),e.Q6J("ngIf",t.edit),e.xp6(1),e.Q6J("ngIf",t.edit))},dependencies:[d.mk,d.O5,u.u,c.Fj,c.JJ,c.On,f.H]}),i})();var L=s(7926),v=s(2612);const k=function(i){return{error:i}};function y(i,o){if(1&i){const n=e.EpF();e.TgZ(0,"div",2)(1,"label"),e.SDv(2,3),e.qZA(),e.TgZ(3,"semantic-multi-select",4),e.NdJ("selectedChange",function(r){e.CHM(n);const _=e.oxw();return e.KtG(_.genres=r)}),e.qZA()()}if(2&i){const n=e.oxw();e.Q6J("ngClass",e.VKq(3,k,null==n.edit.validationErrors?null:n.edit.validationErrors.genres)),e.xp6(3),e.Q6J("items",n.ordered)("selected",n.genres)}}function Z(i,o){if(1&i&&e._UZ(0,"app-validation-errors",5),2&i){const n=e.oxw();e.Q6J("list",null==n.edit.validationErrors?null:n.edit.validationErrors.genres)}}let J=(()=>{class i{constructor(n){this._service=n,this.ordered=[]}ngOnInit(){this._query=this._service.map.subscribe(n=>this.ordered=Object.keys(n).map(t=>({key:t,text:n[t].name||t})).sort((t,r)=>t.text.toLocaleLowerCase().localeCompare(r.text.toLocaleLowerCase())))}ngOnDestroy(){this._query?.unsubscribe()}get genres(){return this.edit?.genres||[]}set genres(n){this.edit&&(this.edit.genres=n)}}return i.\u0275fac=function(n){return new(n||i)(e.Y36(L.c))},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-recording-genre"]],inputs:{edit:"edit"},decls:2,vars:2,consts:function(){let o,n;return o="Categories",n="(assign Categories)",[["class","field",3,"ngClass",4,"ngIf"],[3,"list",4,"ngIf"],[1,"field",3,"ngClass"],o,["hint",n,3,"items","selected","selectedChange"],[3,"list"]]},template:function(n,t){1&n&&(e.YNc(0,y,4,5,"div",0),e.YNc(1,Z,1,1,"app-validation-errors",1)),2&n&&(e.Q6J("ngIf",t.edit),e.xp6(1),e.Q6J("ngIf",t.edit))},dependencies:[d.mk,d.O5,u.u,v.O]}),i})();var U=s(1641);const Q=function(i){return{error:i}};function w(i,o){if(1&i){const n=e.EpF();e.TgZ(0,"div",2)(1,"label"),e.SDv(2,3),e.qZA(),e.TgZ(3,"semantic-multi-select",4),e.NdJ("selectedChange",function(r){e.CHM(n);const _=e.oxw();return e.KtG(_.languages=r)}),e.qZA()()}if(2&i){const n=e.oxw();e.Q6J("ngClass",e.VKq(3,Q,null==n.edit.validationErrors?null:n.edit.validationErrors.languages)),e.xp6(3),e.Q6J("items",n.ordered)("selected",n.languages)}}function X(i,o){if(1&i&&e._UZ(0,"app-validation-errors",5),2&i){const n=e.oxw();e.Q6J("list",null==n.edit.validationErrors?null:n.edit.validationErrors.languages)}}let b=(()=>{class i{constructor(n){this._service=n,this.ordered=[]}ngOnInit(){this._query=this._service.map.subscribe(n=>this.ordered=Object.keys(n).map(t=>({key:t,text:n[t].name||t})).sort((t,r)=>t.text.toLocaleLowerCase().localeCompare(r.text.toLocaleLowerCase())))}ngOnDestroy(){this._query?.unsubscribe()}get languages(){return this.edit?.languages||[]}set languages(n){this.edit&&(this.edit.languages=n)}}return i.\u0275fac=function(n){return new(n||i)(e.Y36(U.T))},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-recording-language"]],inputs:{edit:"edit"},decls:2,vars:2,consts:function(){let o,n;return o="Languages",n="(assign Languages)",[["class","field",3,"ngClass",4,"ngIf"],[3,"list",4,"ngIf"],[1,"field",3,"ngClass"],o,["hint",n,3,"items","selected","selectedChange"],[3,"list"]]},template:function(n,t){1&n&&(e.YNc(0,w,4,5,"div",0),e.YNc(1,X,1,1,"app-validation-errors",1)),2&n&&(e.Q6J("ngIf",t.edit),e.xp6(1),e.Q6J("ngIf",t.edit))},dependencies:[d.mk,d.O5,u.u,v.O]}),i})();function F(i,o){if(1&i){const n=e.EpF();e.TgZ(0,"i",8),e.NdJ("click",function(){e.CHM(n);const r=e.oxw(2);return e.KtG(r.addLink())}),e.qZA()}}function K(i,o){if(1&i&&(e.TgZ(0,"a",11),e._uU(1),e.qZA()),2&i){const n=o.$implicit;e.Q6J("href",n.url,e.LSH)("title",n.description),e.xp6(1),e.hij("\xa0",n.name,"\xa0")}}function q(i,o){if(1&i&&(e.TgZ(0,"div",9),e.YNc(1,K,2,3,"a",10),e.qZA()),2&i){const n=e.oxw(2);e.xp6(1),e.Q6J("ngForOf",n.links)}}const z=function(i){return{active:i}};function Y(i,o){if(1&i){const n=e.EpF();e.TgZ(0,"div",13),e.NdJ("click",function(){const _=e.CHM(n).$implicit,l=e.oxw(3);return e.KtG(l.active=_)}),e._uU(1),e.qZA()}if(2&i){const n=o.$implicit,t=e.oxw(3);e.Q6J("ngClass",e.VKq(2,z,n===t.active)),e.xp6(1),e.hij(" \xa0",n.name,"\xa0 ")}}function V(i,o){if(1&i&&(e.TgZ(0,"div",9),e.YNc(1,Y,2,4,"div",12),e.qZA()),2&i){const n=e.oxw(2);e.xp6(1),e.Q6J("ngForOf",n.links)}}const R=function(i){return{error:i}};function H(i,o){if(1&i){const n=e.EpF();e.TgZ(0,"div",14)(1,"div",15)(2,"label"),e.SDv(3,16),e.qZA(),e.TgZ(4,"div",17)(5,"input",18),e.NdJ("ngModelChange",function(r){e.CHM(n);const _=e.oxw(2);return e.KtG(_.name=r)}),e.qZA()()(),e._UZ(6,"app-validation-errors",19),e.TgZ(7,"div",15)(8,"label"),e.SDv(9,20),e.qZA(),e.TgZ(10,"div",17)(11,"input",18),e.NdJ("ngModelChange",function(r){e.CHM(n);const _=e.oxw(2);return e.KtG(_.url=r)}),e.qZA()()(),e._UZ(12,"app-validation-errors",19),e.TgZ(13,"div",1)(14,"label"),e.SDv(15,21),e.qZA(),e.TgZ(16,"div",17)(17,"textarea",22),e.NdJ("ngModelChange",function(r){e.CHM(n);const _=e.oxw(2);return e.KtG(_.description=r)}),e.qZA()()(),e._UZ(18,"app-validation-errors",19),e.TgZ(19,"button",23),e.NdJ("click",function(){e.CHM(n);const r=e.oxw(2);return e.KtG(r.delLink())}),e.SDv(20,24),e.qZA()()}if(2&i){const n=e.oxw(2);e.xp6(1),e.Q6J("ngClass",e.VKq(9,R,null==n.edit.validationErrors?null:n.edit.validationErrors["links["+n.current+"].name"])),e.xp6(4),e.Q6J("ngModel",n.name),e.xp6(1),e.Q6J("list",null==n.edit.validationErrors?null:n.edit.validationErrors["links["+n.current+"].name"]),e.xp6(1),e.Q6J("ngClass",e.VKq(11,R,null==n.edit.validationErrors?null:n.edit.validationErrors["links["+n.current+"].url"])),e.xp6(4),e.Q6J("ngModel",n.url),e.xp6(1),e.Q6J("list",null==n.edit.validationErrors?null:n.edit.validationErrors["links["+n.current+"].url"]),e.xp6(1),e.Q6J("ngClass",e.VKq(13,R,null==n.edit.validationErrors?null:n.edit.validationErrors["links["+n.current+"].description"])),e.xp6(4),e.Q6J("ngModel",n.description),e.xp6(1),e.Q6J("list",null==n.edit.validationErrors?null:n.edit.validationErrors["links["+n.current+"].description"])}}const j=function(i,o){return{edit:i,eye:o}};function B(i,o){if(1&i){const n=e.EpF();e.TgZ(0,"div",1)(1,"label",2)(2,"div"),e.SDv(3,3),e.qZA(),e.TgZ(4,"i",4),e.NdJ("click",function(){e.CHM(n);const r=e.oxw();return e.KtG(r.expanded=!r.expanded)}),e.qZA(),e.YNc(5,F,1,0,"i",5),e.qZA(),e.YNc(6,q,2,1,"div",6),e.YNc(7,V,2,1,"div",6),e.YNc(8,H,21,15,"div",7),e.qZA()}if(2&i){const n=e.oxw();e.Q6J("ngClass",e.VKq(6,R,null==n.edit.validationErrors?null:n.edit.validationErrors.series)),e.xp6(4),e.Q6J("ngClass",e.WLB(8,j,!n.expanded,n.expanded)),e.xp6(1),e.Q6J("ngIf",n.expanded),e.xp6(1),e.Q6J("ngIf",!n.expanded),e.xp6(1),e.Q6J("ngIf",n.expanded),e.xp6(1),e.Q6J("ngIf",n.expanded&&n.current>=0)}}let W=(()=>{class i{constructor(){this.active=void 0,this.expanded=!1}get links(){return this.edit?.links||[]}addLink(){if(this.edit){const n={name:"",url:""};this.edit.links=[...this.edit.links||[],n],this.active=n}}delLink(){if(this.edit){const n=this.edit.links||[],t=n.findIndex(r=>r===this.active);t>=0&&(n.splice(t,1),this.edit.links=n)}}get current(){return this.edit?.links?.findIndex(n=>n===this.active)??-1}validate(){this.edit&&(this.edit.links=this.edit.links||[])}get name(){return this.active?.name||""}set name(n){this.active&&(this.active.name=n,this.validate())}get url(){return this.active?.url||""}set url(n){this.active&&(this.active.url=n,this.validate())}get description(){return this.active?.description||""}set description(n){this.active&&(this.active.description=n,this.validate())}}return i.\u0275fac=function(n){return new(n||i)},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-recording-link"]],inputs:{edit:"edit"},decls:1,vars:1,consts:function(){let o,n,t,r,_;return o="Links",n="Name",t="URL",r="Description",_="Delete",[["class","field",3,"ngClass",4,"ngIf"],[1,"field",3,"ngClass"],[1,"label"],o,[1,"ui","link","icon",3,"ngClass","click"],["class","ui link add icon",3,"click",4,"ngIf"],["class","links",4,"ngIf"],["class","ui form edit",4,"ngIf"],[1,"ui","link","add","icon",3,"click"],[1,"links"],["target","_blank","class","ui button",3,"href","title",4,"ngFor","ngForOf"],["target","_blank",1,"ui","button",3,"href","title"],["class","ui button",3,"ngClass","click",4,"ngFor","ngForOf"],[1,"ui","button",3,"ngClass","click"],[1,"ui","form","edit"],[1,"required","field",3,"ngClass"],n,[1,"ui","input"],["type","text",3,"ngModel","ngModelChange"],[3,"list"],t,r,["row","5",3,"ngModel","ngModelChange"],[1,"ui","negative","button",3,"click"],_]},template:function(n,t){1&n&&e.YNc(0,B,9,11,"div",0),2&n&&e.Q6J("ngIf",t.edit)},dependencies:[d.mk,d.sg,d.O5,u.u,c.Fj,c.JJ,c.On],styles:[".field[_ngcontent-%COMP%]{padding-bottom:1em}.field[_ngcontent-%COMP%] > label.label[_ngcontent-%COMP%]{display:grid;grid-template-columns:auto auto auto;column-gap:.5em;align-items:center;justify-content:flex-start}.field[_ngcontent-%COMP%] > .edit[_ngcontent-%COMP%]{margin:1em 1em 0}"]}),i})();var ee=s(5982);const ne=function(i){return{error:i}};function ie(i,o){if(1&i){const n=e.EpF();e.TgZ(0,"div",2)(1,"label"),e.SDv(2,3),e.qZA(),e.TgZ(3,"semantic-single-select",4),e.NdJ("selectedChange",function(r){e.CHM(n);const _=e.oxw();return e.KtG(_.series=r)}),e.qZA()()}if(2&i){const n=e.oxw();e.Q6J("ngClass",e.VKq(3,ne,null==n.edit.validationErrors?null:n.edit.validationErrors.series)),e.xp6(3),e.Q6J("items",n.ordered)("selected",n.series)}}function te(i,o){if(1&i&&e._UZ(0,"app-validation-errors",5),2&i){const n=e.oxw();e.Q6J("list",null==n.edit.validationErrors?null:n.edit.validationErrors.series)}}let oe=(()=>{class i{constructor(n){this._service=n,this.ordered=[]}ngOnInit(){this._series=this._service.map.subscribe(n=>this.ordered=Object.keys(n).map(t=>({key:t,text:n[t].fullName||t})).sort((t,r)=>t.text.toLocaleLowerCase().localeCompare(r.text.toLocaleLowerCase())))}ngOnDestroy(){this._series?.unsubscribe()}get series(){return this.edit?.series||""}set series(n){this.edit&&(this.edit.series=n||void 0)}}return i.\u0275fac=function(n){return new(n||i)(e.Y36(ee._))},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-recording-series"]],inputs:{edit:"edit"},decls:2,vars:2,consts:function(){let o,n;return o="Series",n="(assign Series)",[["class","field",3,"ngClass",4,"ngIf"],[3,"list",4,"ngIf"],[1,"field",3,"ngClass"],o,["hint",n,3,"items","selected","selectedChange"],[3,"list"]]},template:function(n,t){1&n&&(e.YNc(0,ie,4,5,"div",0),e.YNc(1,te,1,1,"app-validation-errors",1)),2&n&&(e.Q6J("ngIf",t.edit),e.xp6(1),e.Q6J("ngIf",t.edit))},dependencies:[d.mk,d.O5,u.u,f.H]}),i})();var re=s(4061);const _e=["selector"],se=function(i){return{error:i}};function de(i,o){if(1&i&&(e.TgZ(0,"div",2)(1,"label"),e.SDv(2,3),e.qZA(),e.TgZ(3,"div",4,5),e._UZ(5,"i",6)(6,"div",7),e.TgZ(7,"div",8)(8,"div",9),e.SDv(9,10),e.qZA(),e.TgZ(10,"div",11),e.SDv(11,12),e.qZA(),e.TgZ(12,"div",13),e.SDv(13,14),e.qZA(),e.TgZ(14,"div",15),e.SDv(15,16),e.qZA(),e.TgZ(16,"div",17),e.SDv(17,18),e.qZA(),e.TgZ(18,"div",19),e.SDv(19,20),e.qZA()()()()),2&i){const n=e.oxw();e.Q6J("ngClass",e.VKq(1,se,null==n.edit.validationErrors?null:n.edit.validationErrors.containerType))}}function le(i,o){if(1&i&&e._UZ(0,"app-validation-errors",21),2&i){const n=e.oxw();e.Q6J("list",null==n.edit.validationErrors?null:n.edit.validationErrors.containerType)}}let ce=(()=>{class i{ngAfterViewInit(){const n=$(this.selector?.nativeElement);n.dropdown({forceSelection:!1,onChange:t=>this.edit&&(this.edit.containerType=parseInt(t,10))}),setTimeout(()=>{n.dropdown("set exactly",`${this.edit?.containerType||re.w.Undefined}`),n.css("visibility","")},100)}ngOnDestroy(){$(this.selector?.nativeElement)?.dropdown("destroy")}}return i.\u0275fac=function(n){return new(n||i)},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-recording-type"]],viewQuery:function(n,t){if(1&n&&e.Gf(_e,5),2&n){let r;e.iGM(r=e.CRH())&&(t.selector=r.first)}},inputs:{edit:"edit"},decls:2,vars:2,consts:function(){let o,n,t,r,_,l,C;return o="Type of Media",n="(unknown)",t="Video CD",r="Super-Video CD",_="DVD (burned)",l="DVD (baught)",C="Blu-Ray",[["class","required field",3,"ngClass",4,"ngIf"],[3,"list",4,"ngIf"],[1,"required","field",3,"ngClass"],o,[1,"ui","selection","fluid","dropdown",2,"visibility","hidden"],["selector",""],[1,"dropdown","icon"],[1,"default","text"],[1,"menu"],["data-value","0",1,"item"],n,["data-value","1",1,"item"],t,["data-value","2",1,"item"],r,["data-value","3",1,"item"],_,["data-value","4",1,"item"],l,["data-value","5",1,"item"],C,[3,"list"]]},template:function(n,t){1&n&&(e.YNc(0,de,20,3,"div",0),e.YNc(1,le,1,1,"app-validation-errors",1)),2&n&&(e.Q6J("ngIf",t.edit),e.xp6(1),e.Q6J("ngIf",t.edit))},dependencies:[d.mk,d.O5,u.u]}),i})();function ae(i,o){if(1&i){const n=e.EpF();e.TgZ(0,"div",23),e.NdJ("click",function(){e.CHM(n);const r=e.oxw(2);return e.KtG(r.onRemove())}),e.SDv(1,24),e.qZA()}}const E=function(i){return{disabled:i}},ge=function(i){return{errors:i}},T=function(i){return{error:i}};function ue(i,o){if(1&i){const n=e.EpF();e.TgZ(0,"div")(1,"div",1)(2,"div",2),e.NdJ("click",function(){e.CHM(n);const r=e.oxw();return e.KtG(r.reload())}),e.SDv(3,3),e.qZA(),e.TgZ(4,"div",4),e.NdJ("click",function(){e.CHM(n);const r=e.oxw();return e.KtG(r.onSave(!1))}),e.SDv(5,5),e.qZA(),e.TgZ(6,"div",2),e.NdJ("click",function(){e.CHM(n);const r=e.oxw();return e.KtG(r.onSave(!0))}),e.SDv(7,6),e.qZA(),e.TgZ(8,"div",7),e.NdJ("click",function(){e.CHM(n);const r=e.oxw();return e.KtG(r.onClone())}),e.SDv(9,8),e.qZA(),e.YNc(10,ae,2,0,"div",9),e.qZA(),e.TgZ(11,"div",10)(12,"div",11)(13,"label"),e.SDv(14,12),e.qZA(),e.TgZ(15,"div",13)(16,"input",14),e.NdJ("ngModelChange",function(r){e.CHM(n);const _=e.oxw();return e.KtG(_.name=r)}),e.qZA()()(),e._UZ(17,"app-validation-errors",15)(18,"app-recording-link",16),e.TgZ(19,"div",17)(20,"label"),e.SDv(21,18),e.qZA(),e.TgZ(22,"div",13)(23,"textarea",19),e.NdJ("ngModelChange",function(r){e.CHM(n);const _=e.oxw();return e.KtG(_.description=r)}),e.qZA()()(),e._UZ(24,"app-validation-errors",15)(25,"app-recording-series",16)(26,"app-recording-type",16)(27,"app-recording-genre",16)(28,"app-recording-language",16)(29,"app-recording-container",16),e.TgZ(30,"div",17)(31,"label"),e.SDv(32,20),e.qZA(),e.TgZ(33,"div",13)(34,"input",14),e.NdJ("ngModelChange",function(r){e.CHM(n);const _=e.oxw();return e.KtG(_.rentTo=r)}),e.qZA()()(),e._UZ(35,"app-validation-errors",15),e.qZA(),e.TgZ(36,"app-semantic-modal",21),e.NdJ("closed",function(){e.CHM(n);const r=e.oxw();return e.KtG(r.confirm=!1)})("confirm",function(){e.CHM(n);const r=e.oxw();return e.KtG(r.onConfirm())}),e.tHW(37,22),e._UZ(38,"strong"),e.N_p(),e.qZA()()}if(2&i){const n=e.oxw();e.xp6(2),e.Q6J("ngClass",e.VKq(21,E,!n.edit.isDirty)),e.xp6(2),e.Q6J("ngClass",e.VKq(23,E,!n.edit.isDirty||n.edit.validationErrors)),e.xp6(2),e.Q6J("ngClass",e.VKq(25,E,!n.edit.isDirty||n.edit.validationErrors)),e.xp6(4),e.Q6J("ngIf",n.editId),e.xp6(1),e.Q6J("ngClass",e.VKq(27,ge,n.edit.validationErrors)),e.xp6(1),e.Q6J("ngClass",e.VKq(29,T,null==n.edit.validationErrors?null:n.edit.validationErrors.name)),e.xp6(4),e.Q6J("ngModel",n.name),e.xp6(1),e.Q6J("list",null==n.edit.validationErrors?null:n.edit.validationErrors.name),e.xp6(1),e.Q6J("edit",n.edit),e.xp6(1),e.Q6J("ngClass",e.VKq(31,T,null==n.edit.validationErrors?null:n.edit.validationErrors.description)),e.xp6(4),e.Q6J("ngModel",n.description),e.xp6(1),e.Q6J("list",null==n.edit.validationErrors?null:n.edit.validationErrors.description),e.xp6(1),e.Q6J("edit",n.edit),e.xp6(1),e.Q6J("edit",n.edit),e.xp6(1),e.Q6J("edit",n.edit),e.xp6(1),e.Q6J("edit",n.edit),e.xp6(1),e.Q6J("edit",n.edit),e.xp6(1),e.Q6J("ngClass",e.VKq(33,T,null==n.edit.validationErrors?null:n.edit.validationErrors.rentTo)),e.xp6(4),e.Q6J("ngModel",n.rentTo),e.xp6(1),e.Q6J("list",null==n.edit.validationErrors?null:n.edit.validationErrors.rentTo),e.xp6(1),e.Q6J("show",n.confirm)}}const Ce=[{component:(()=>{class i extends m.U{constructor(n,t){super(),this._service=n,this._route=t}getEditService(){return this._service}ngOnInit(){super.ngOnInit(),this._params=this._route.params.subscribe(n=>{this.select(n.id),this._service.id="@"===this.editId?"":this.editId})}ngOnDestroy(){super.ngOnDestroy(),this._params?.unsubscribe()}onSave(n){this.edit&&this._service.save(this.editId,this.edit,n)}onClone(){this.edit&&this._service.clone(this.edit)}onConfirm(){this._service.remove(this.editId),this.confirm=!1}get name(){return this.edit?.name||""}set name(n){this.edit&&(this.edit.name=n)}get description(){return this.edit?.description||""}set description(n){this.edit&&(this.edit.description=n)}get rentTo(){return this.edit?.rentTo||""}set rentTo(n){this.edit&&(this.edit.rentTo=n)}}return i.\u0275fac=function(n){return new(n||i)(e.Y36(M.s),e.Y36(p.gz))},i.\u0275cmp=e.Xpm({type:i,selectors:[["app-recording"]],features:[e.qOj],decls:1,vars:1,consts:function(){let o,n,t,r,_,l,C,a,O;return o="Cancel",n="Save and exit",t="Save and Clone",r="Clone",_="Name",l="Description",C="Rent to",a="\n          Das L\xF6schen einer Aufzeichnung kann\n          " + "\ufffd#38\ufffd" + "\n          nicht\n          " + "\ufffd/#38\ufffd" + "\n          r\xFCckg\xE4ngig gemacht werden. Soll die Aufzeichnung wirklich endg\xFCltig entfernt werden?\n        ",O="Delete",[[4,"ngIf"],[1,"actions"],[1,"ui","button",3,"ngClass","click"],o,[1,"ui","primary","button",3,"ngClass","click"],n,t,[1,"ui","button",3,"click"],r,["class","ui negative button",3,"click",4,"ngIf"],[1,"ui","form",3,"ngClass"],[1,"required","field",3,"ngClass"],_,[1,"ui","input"],["type","text",3,"ngModel","ngModelChange"],[3,"list"],[3,"edit"],[1,"field",3,"ngClass"],l,["rows","5",3,"ngModel","ngModelChange"],C,[3,"show","closed","confirm"],a,[1,"ui","negative","button",3,"click"],O]},template:function(n,t){1&n&&e.YNc(0,ue,39,35,"div",0),2&n&&e.Q6J("ngIf",t.edit)},dependencies:[d.mk,d.O5,u.u,c.Fj,c.JJ,c.On,I.z,D,J,b,W,oe,ce],styles:["[_nghost-%COMP%]{width:100%;height:100%;padding:0 1em;overflow:auto}"]}),i})(),path:":id"}];let Re=(()=>{class i{}return i.\u0275fac=function(n){return new(n||i)},i.\u0275mod=e.oAB({type:i}),i.\u0275inj=e.cJS({imports:[p.Bz.forChild(Ce),p.Bz]}),i})();var pe=s(1075);let Ee=(()=>{class i{}return i.\u0275fac=function(n){return new(n||i)},i.\u0275mod=e.oAB({type:i}),i.\u0275inj=e.cJS({imports:[d.ez,pe.m,c.u5,Re]}),i})()}}]);