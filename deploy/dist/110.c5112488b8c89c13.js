"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[110],{2110:(q,d,c)=>{c.r(d),c.d(d,{RecordingsModule:()=>J});var l=c(6895),a=c(8902),h=c(1075),e=c(8256),g=c(2998),f=c(4004);function _(n,r){return n.pipe((0,f.U)(t=>Object.keys(t).map(i=>({key:i,text:t[i][r]||i})).sort((i,s)=>i.text.toLocaleLowerCase().localeCompare(s.text.toLocaleLowerCase()))))}var p=c(7926),T=c(2612);let R=(()=>{class n{constructor(t,i){this._genres=t,this._recordings=i,this.orderedAsItems=[],this._subscription=_(this._genres.map,"name").subscribe(s=>this.orderedAsItems=s)}ngOnDestroy(){this._subscription.unsubscribe()}get selected(){return this._recordings.genres||[]}set selected(t){this._recordings.genres=t}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(p.c),e.Y36(g.k))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-genre-filter"]],decls:1,vars:2,consts:function(){let r;return r=$localize`:@@filter.genre:(alle Kategorien)`,[["hint",r,3,"items","selected","selectedChange"]]},template:function(t,i){1&t&&(e.TgZ(0,"semantic-multi-select",0),e.NdJ("selectedChange",function(o){return i.selected=o}),e.qZA()),2&t&&e.Q6J("items",i.orderedAsItems)("selected",i.selected)},dependencies:[T.O]}),n})();var m=c(1641),u=c(2722);let E=(()=>{class n{constructor(t,i){this._languages=t,this._recordings=i,this.orderedAsItems=[],this._subscription=_(this._languages.map,"name").subscribe(s=>this.orderedAsItems=s)}ngOnDestroy(){this._subscription.unsubscribe()}get selected(){return this._recordings.language}set selected(t){this._recordings.language=t}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(m.T),e.Y36(g.k))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-language-filter"]],decls:1,vars:2,consts:function(){let r;return r=$localize`:@@filter.language:(alle Sprachen)`,[["hint",r,3,"items","selected","selectedChange"]]},template:function(t,i){1&t&&(e.TgZ(0,"semantic-single-select",0),e.NdJ("selectedChange",function(o){return i.selected=o}),e.qZA()),2&t&&e.Q6J("items",i.orderedAsItems)("selected",i.selected)},dependencies:[u.H]}),n})();function S(n,r){if(1&n){const t=e.EpF();e.TgZ(0,"a",2),e.NdJ("click",function(){const o=e.CHM(t).$implicit;return e.KtG(o.onClick())}),e._uU(1),e.qZA()}if(2&n){const t=r.$implicit;e.Q6J("ngClass",t.className),e.xp6(1),e.Oqu(t.count)}}const N=[15,30,50,75,100,250];let O=(()=>{class n{constructor(t){this._recordingService=t}get size(){return this._recordingService.pageSize}get items(){return N.map(t=>({className:{active:t===this.size,item:!0},count:t,onClick:()=>this._recordingService.pageSize=t}))}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(g.k))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-page-size-filter"]],decls:2,vars:1,consts:[[1,"ui","menu"],[3,"ngClass","click",4,"ngFor","ngForOf"],[3,"ngClass","click"]],template:function(t,i){1&t&&(e.TgZ(0,"div",0),e.YNc(1,S,2,2,"a",1),e.qZA()),2&t&&(e.xp6(1),e.Q6J("ngForOf",i.items))},dependencies:[l.mk,l.sg]}),n})();const M=function(n,r){return{active:n,disabled:r}};function P(n,r){if(1&n){const t=e.EpF();e.TgZ(0,"a",3),e.NdJ("click",function(){const o=e.CHM(t).$implicit,D=e.oxw();return e.KtG(o.page&&D.setPage(o.page))}),e._uU(1),e.qZA()}if(2&n){const t=r.$implicit,i=e.oxw();e.Q6J("ngClass",e.WLB(2,M,t.page===i.curPage,!t.page)),e.xp6(1),e.Oqu(t.page||"...")}}let v=(()=>{class n{constructor(t){this._recordingService=t,this._result={correlationId:"",count:0,genres:[],languages:[],total:0,view:[]},this.maxPage=0,this.pages=[]}get curPage(){return this._recordingService.page+1}setPage(t){t<1||t>this.maxPage||(this._recordingService.page=t-1)}ngOnInit(){this._recordings=this._recordingService.result.subscribe(t=>{this.maxPage=t.count>0?Math.ceil(t.count/this._recordingService.pageSize):0,this.pages=function A(n,r){const t=[];if(n<1)return t;if(t.push({page:1}),n<8){for(let i=2;i<=n;i++)t.push({page:i});return t}if(r<=5){for(let i=2;i<=5;i++)t.push({page:i});return t.push({page:void 0}),t.push({page:n}),t}if(t.push({page:void 0}),r>=n-4){for(let i=n-4;i<=n;i++)t.push({page:i});return t}for(let i=r-1;i<=r+1;i++)t.push({page:i});return t.push({page:void 0}),t.push({page:n}),t}(this.maxPage,this.curPage),this._result=t})}ngOnDestroy(){this._recordings?.unsubscribe()}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(g.k))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-pagination"]],decls:10,vars:1,consts:[[1,"ui","pagination","menu"],[1,"item",3,"click"],["class","item",3,"ngClass","click",4,"ngFor","ngForOf"],[1,"item",3,"ngClass","click"]],template:function(t,i){1&t&&(e.TgZ(0,"div",0)(1,"a",1),e.NdJ("click",function(){return i.setPage(1)}),e._uU(2,"\xab"),e.qZA(),e.TgZ(3,"a",1),e.NdJ("click",function(){return i.setPage(i.curPage-1)}),e._uU(4,"\u27e8"),e.qZA(),e.YNc(5,P,2,5,"a",2),e.TgZ(6,"a",1),e.NdJ("click",function(){return i.setPage(i.curPage+1)}),e._uU(7,"\u27e9"),e.qZA(),e.TgZ(8,"a",1),e.NdJ("click",function(){return i.setPage(i.maxPage)}),e._uU(9,"\xbb"),e.qZA()()),2&t&&(e.xp6(5),e.Q6J("ngForOf",i.pages))},dependencies:[l.mk,l.sg]}),n})();const F=["recording",""];function I(n,r){if(1&n&&e._UZ(0,"i",1),2&n){const t=e.oxw();e.Q6J("title",t.rent)}}let y=(()=>{class n{constructor(t,i){this._languages=t,this._genres=i,this.item=void 0,this.languages="",this.genres=""}get rent(){return this.item.rentTo||""}ngOnInit(){this._genreQuery=this._genres.map.subscribe(t=>{this.genres=(this.item.genres||[]).map(i=>t[i]?.name||i).sort().join(", ")||"\xa0"}),this._languageQuery=this._languages.map.subscribe(t=>{this.languages=(this.item.languages||[]).map(i=>t[i]?.name||i).sort().join(", ")||"\xa0"})}ngOnDestroy(){this._languageQuery?.unsubscribe(),this._genreQuery?.unsubscribe()}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(m.T),e.Y36(p.c))},n.\u0275cmp=e.Xpm({type:n,selectors:[["","recording",""]],inputs:{item:"item"},attrs:F,decls:15,vars:8,consts:[["class","ui icon user outline",3,"title",4,"ngIf"],[1,"ui","icon","user","outline",3,"title"]],template:function(t,i){1&t&&(e.TgZ(0,"td")(1,"div")(2,"div"),e._uU(3),e.qZA(),e.YNc(4,I,1,1,"i",0),e.qZA()(),e.TgZ(5,"td")(6,"div"),e._uU(7),e.ALo(8,"date"),e.qZA()(),e.TgZ(9,"td")(10,"div"),e._uU(11),e.qZA()(),e.TgZ(12,"td")(13,"div"),e._uU(14),e.qZA()()),2&t&&(e.xp6(3),e.Oqu(i.item.fullName),e.xp6(1),e.Q6J("ngIf",!!i.rent),e.xp6(3),e.Oqu(e.xi3(8,5,i.item.created,"dd.MM.yyyy HH:mm:ss")),e.xp6(4),e.Oqu(i.languages),e.xp6(3),e.Oqu(i.genres))},dependencies:[l.O5,l.uU],styles:["td[_ngcontent-%COMP%]{padding:0 .5em;cursor:pointer}td[_ngcontent-%COMP%]   div[_ngcontent-%COMP%]{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}td[_ngcontent-%COMP%]:nth-child(1){width:40em;min-width:40em;max-width:40em}td[_ngcontent-%COMP%]:nth-child(1) > div[_ngcontent-%COMP%]{display:grid;grid-template-columns:1fr auto;column-gap:.5em;align-items:center}td[_ngcontent-%COMP%]:nth-child(2){width:12em;min-width:12em;max-width:12em}td[_ngcontent-%COMP%]:nth-child(3), td[_ngcontent-%COMP%]:nth-child(4){width:20em;min-width:20em;max-width:20em}"]}),n})();const $=function(n){return["/recordings",n]};function Z(n,r){if(1&n&&e._UZ(0,"tr",7),2&n){const t=r.$implicit;e.Q6J("item",t)("routerLink",e.VKq(2,$,t._id))}}const C=function(n,r,t){return{sorted:n,ascending:r,descending:t}};let L=(()=>{class n{constructor(t){this._service=t,this._result={correlationId:"",count:0,genres:[],languages:[],total:0,view:[]}}get items(){return this._result.view}ngOnInit(){this._query=this._service.result.subscribe(t=>this._result=t)}ngOnDestroy(){this._query?.unsubscribe()}sort(t){this._service.sort(t)}get ascending(){return"Ascending"===this._service.sortOrder}get sortName(){return"fullName"===this._service.sortColumn}get sortDate(){return"created"===this._service.sortColumn}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(g.k))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-recording-table"]],decls:15,vars:11,consts:function(){let r,t,i,s;return r=$localize`:@@recordings.name: Name `,t=$localize`:@@recordings.created: Erstellt `,i=$localize`:@@recordings.languge:Sprachen`,s=$localize`:@@recordings.genres:Kategorien`,[[1,"ui","celled","collapsing","fixed","sortable","striped","unstackable","compact","table"],[3,"ngClass","click"],r,t,i,s,["recording","",3,"item","routerLink",4,"ngFor","ngForOf"],["recording","",3,"item","routerLink"]]},template:function(t,i){1&t&&(e.TgZ(0,"table",0)(1,"thead")(2,"tr")(3,"th",1),e.NdJ("click",function(){return i.sort("fullName")}),e.SDv(4,2),e.qZA(),e.TgZ(5,"th",1),e.NdJ("click",function(){return i.sort("created")}),e.SDv(6,3),e.qZA(),e.TgZ(7,"th")(8,"div"),e.SDv(9,4),e.qZA()(),e.TgZ(10,"th")(11,"div"),e.SDv(12,5),e.qZA()()()(),e.TgZ(13,"tbody"),e.YNc(14,Z,1,4,"tr",6),e.qZA()()),2&t&&(e.xp6(3),e.Q6J("ngClass",e.kEZ(3,C,i.sortName,i.ascending,!i.ascending)),e.xp6(2),e.Q6J("ngClass",e.kEZ(7,C,i.sortDate,i.ascending,!i.ascending)),e.xp6(9),e.Q6J("ngForOf",i.items))},dependencies:[l.mk,l.sg,a.rH,y]}),n})(),G=(()=>{class n{constructor(t){this._recordings=t,this.orderedAsItems=[{key:"1",text:$localize`:@@filter.rent.yes:verliehen`},{key:"0",text:$localize`:@@filter.rent.no:nicht verliehen`}]}get selected(){return"boolean"==typeof this._recordings.rent?this._recordings.rent?"1":"0":""}set selected(t){this._recordings.rent=""===t?void 0:"1"===t}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(g.k))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-rent-filter"]],decls:1,vars:2,consts:function(){let r;return r=$localize`:@@filter.rent:(verliehen egal)`,[["hint",r,3,"items","selected","selectedChange"]]},template:function(t,i){1&t&&(e.TgZ(0,"semantic-single-select",0),e.NdJ("selectedChange",function(o){return i.selected=o}),e.qZA()),2&t&&e.Q6J("items",i.orderedAsItems)("selected",i.selected)},dependencies:[u.H]}),n})();var b=c(5982);let w=(()=>{class n{constructor(t,i){this._series=t,this._recordings=i,this.orderedAsItems=[],this._subscription=_(this._series.map,"fullName").subscribe(s=>this.orderedAsItems=s)}ngOnDestroy(){this._subscription.unsubscribe()}get selected(){return this._recordings.series}set selected(t){this._recordings.series=t}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(b._),e.Y36(g.k))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-series-filter"]],decls:1,vars:2,consts:function(){let r;return r=$localize`:@@filter.series:(alle Serien)`,[["hint",r,3,"items","selected","selectedChange"]]},template:function(t,i){1&t&&(e.TgZ(0,"semantic-single-select",0),e.NdJ("selectedChange",function(o){return i.selected=o}),e.qZA()),2&t&&e.Q6J("items",i.orderedAsItems)("selected",i.selected)},dependencies:[u.H]}),n})();var k=c(3771);let X=(()=>{class n{constructor(t){this._recordings=t}get filter(){return this._recordings.fullName}set filter(t){this._recordings.fullName=t}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(g.k))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-text-filter"]],decls:1,vars:1,consts:function(){let r;return r=$localize`:@@hint.text:Suche...`,[["hint",r,3,"text","textChange"]]},template:function(t,i){1&t&&(e.TgZ(0,"semantic-search",0),e.NdJ("textChange",function(o){return i.filter=o}),e.qZA()),2&t&&e.Q6J("text",i.filter)},dependencies:[k.g]}),n})();const U=[{component:(()=>{class n{constructor(t){this._service=t,this._result={correlationId:"",count:0,genres:[],languages:[],total:0,view:[]},this.of=$localize`:@@recordings.count: von `}get total(){return this._result.total}get count(){return this._result.count}onExport(){this._service.openExport()}ngOnInit(){this._query=this._service.result.subscribe(t=>this._result=t)}ngOnDestroy(){this._query?.unsubscribe()}clear(){this._service.reset()}}return n.\u0275fac=function(t){return new(t||n)(e.Y36(g.k))},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-recordings"]],decls:19,vars:3,consts:function(){let r,t;return r=$localize`:@@recordings.export:Exportieren`,t=$localize`:@@recordings.new:Neue Suche`,[[1,"page"],[1,"headline"],[1,"ui","compact","segment","counts"],[1,"ui","button",3,"click"],r,[1,"ui","segment","filter"],[1,"search"],t,[1,"sizer"],[1,"results"]]},template:function(t,i){1&t&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2),e._uU(3),e.qZA(),e.TgZ(4,"button",3),e.NdJ("click",function(){return i.onExport()}),e.SDv(5,4),e.qZA()(),e.TgZ(6,"div",5)(7,"div",6),e._UZ(8,"app-text-filter"),e.TgZ(9,"div",3),e.NdJ("click",function(){return i.clear()}),e.SDv(10,7),e.qZA()(),e._UZ(11,"app-language-filter")(12,"app-genre-filter")(13,"app-series-filter")(14,"app-rent-filter"),e.qZA(),e.TgZ(15,"div",8),e._UZ(16,"app-page-size-filter")(17,"app-pagination"),e.qZA(),e._UZ(18,"app-recording-table",9),e.qZA()),2&t&&(e.xp6(3),e.lnq("",i.count,"",i.of,"",i.total,""))},dependencies:[R,E,O,v,L,G,w,X],styles:["[_nghost-%COMP%]{width:100%;height:100%;overflow:hidden}.page[_ngcontent-%COMP%]{display:grid;grid-template-rows:auto auto auto 1fr;row-gap:1em;width:100%;height:100%;padding:1em;overflow:hidden}.page[_ngcontent-%COMP%] > .ui.segment[_ngcontent-%COMP%]{margin:0}.page[_ngcontent-%COMP%] > .headline[_ngcontent-%COMP%]{display:grid;grid-template-columns:auto auto;align-items:center;justify-content:space-between}.page[_ngcontent-%COMP%] > .filter[_ngcontent-%COMP%]{display:grid;grid-template-rows:auto;grid-auto-flow:row;row-gap:.5em}.page[_ngcontent-%COMP%] > .filter[_ngcontent-%COMP%] > .search[_ngcontent-%COMP%]{display:grid;grid-template-columns:1fr auto;column-gap:.5em;align-items:center}.page[_ngcontent-%COMP%] > .sizer[_ngcontent-%COMP%]{display:grid;grid-template-columns:auto auto;column-gap:.5em;align-items:center;justify-content:flex-start}.page[_ngcontent-%COMP%] > .results[_ngcontent-%COMP%]{width:100%;height:100%;overflow:auto}"]}),n})(),path:""}];let z=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[a.Bz.forChild(U),a.Bz]}),n})(),J=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[l.ez,a.Bz,h.m,z]}),n})()}}]);