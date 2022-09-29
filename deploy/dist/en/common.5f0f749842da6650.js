"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[592],{7886:(_,u,l)=>{l.d(u,{u:()=>s});var e=l(8256),a=l(6895);function r(n,i){if(1&n&&(e.TgZ(0,"li",6),e._uU(1),e.qZA()),2&n){const t=i.$implicit;e.xp6(1),e.Oqu(t.message||t.field)}}function d(n,i){if(1&n&&(e.TgZ(0,"div",1)(1,"div",2),e.SDv(2,3),e.qZA(),e.TgZ(3,"ul",4),e.YNc(4,r,2,1,"li",5),e.qZA()()),2&n){const t=e.oxw();e.xp6(4),e.Q6J("ngForOf",t.list)}}let s=(()=>{class n{constructor(){this.list=void 0}}return n.\u0275fac=function(t){return new(t||n)},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-validation-errors"]],inputs:{list:"list"},decls:1,vars:1,consts:function(){let i;return i="Bitte Eingaben kontrollieren",[["class","ui error message",4,"ngIf"],[1,"ui","error","message"],[1,"ui","header"],i,[1,"list"],["class","content",4,"ngFor","ngForOf"],[1,"content"]]},template:function(t,o){1&t&&e.YNc(0,d,5,1,"div",0),2&t&&e.Q6J("ngIf",o.list)},dependencies:[a.sg,a.O5],styles:[".ui.error.message[_ngcontent-%COMP%]{display:block;margin-top:1em}"]}),n})()},4387:(_,u,l)=>{l.d(u,{U:()=>a});var e=l(8256);let a=(()=>{class r{constructor(){this.selected="",this.editId="",this.confirm=!1}onRemove(){this.confirm=!0}reload(){this.edit="@"===this.editId?void 0:this._editFactory?.(this.editId)}select(s){this.editId=s?"NEW"!==s&&s||"":"@",this.reload()}ngOnInit(){this._query=this.getEditService().editFactory.subscribe(s=>{this._editFactory=s,this.reload()})}ngOnChanges(s){const n=s.selected;!n||!n.firstChange&&n.currentValue===n.previousValue||this.select(n.currentValue)}ngOnDestroy(){this._query?.unsubscribe()}}return r.\u0275fac=function(s){return new(s||r)},r.\u0275cmp=e.Xpm({type:r,selectors:[["ng-component"]],inputs:{selected:"selected"},features:[e.TTD],decls:0,vars:0,template:function(s,n){},encapsulation:2}),r})()},6279:(_,u,l)=>{l.d(u,{B:()=>d});var e=l(8256);const a=[[["","list",""]],[["","detail",""]]],r=["[list]","[detail]"];let d=(()=>{class s{}return s.\u0275fac=function(i){return new(i||s)},s.\u0275cmp=e.Xpm({type:s,selectors:[["app-master-detail"]],ngContentSelectors:r,decls:3,vars:0,consts:[[1,"root"]],template:function(i,t){1&i&&(e.F$t(a),e.TgZ(0,"div",0),e.Hsn(1),e.Hsn(2,1),e.qZA())},styles:[".root[_ngcontent-%COMP%]{display:grid;grid-template-columns:20vw 1fr;column-gap:.5em;width:calc(100% - 2em);height:calc(100% - 1em);margin:0 1em 1em;overflow:hidden}"]}),s})()},7005:(_,u,l)=>{l.d(u,{z:()=>d});var e=l(8256);const a=["dialog"],r=["*"];let d=(()=>{class s{constructor(){this.title="Best\xe4tigung erforderlich",this.show=!1,this.closed=new e.vpe,this.confirm=new e.vpe}onClose(){$(this.dialog?.nativeElement)?.modal("hide")}onConfirm(){this.confirm.emit()}ngAfterViewInit(){$(this.dialog?.nativeElement).modal({onHidden:()=>this.closed.emit()})}ngOnChanges(i){const t=i.show;!t||$(this.dialog?.nativeElement)?.modal(t.currentValue?"show":"hide")}ngOnDestroy(){$(this.dialog?.nativeElement)?.modal("destroy")}}return s.\u0275fac=function(i){return new(i||s)},s.\u0275cmp=e.Xpm({type:s,selectors:[["app-semantic-modal"]],viewQuery:function(i,t){if(1&i&&e.Gf(a,5),2&i){let o;e.iGM(o=e.CRH())&&(t.dialog=o.first)}},inputs:{title:"title",show:"show"},outputs:{closed:"closed",confirm:"confirm"},features:[e.TTD],ngContentSelectors:r,decls:11,vars:1,consts:[[1,"ui","modal"],["dialog",""],[1,"header"],[1,"content"],[1,"actions"],[1,"ui","negative","button",3,"click"],[1,"ui","primary","button",3,"click"]],template:function(i,t){1&i&&(e.F$t(),e.TgZ(0,"div",0,1)(2,"div",2),e._uU(3),e.qZA(),e.TgZ(4,"div",3),e.Hsn(5),e.qZA(),e.TgZ(6,"div",4)(7,"div",5),e.NdJ("click",function(){return t.onConfirm()}),e._uU(8,"Ja"),e.qZA(),e.TgZ(9,"div",6),e.NdJ("click",function(){return t.onClose()}),e._uU(10,"Nein"),e.qZA()()()),2&i&&(e.xp6(3),e.Oqu(t.title))}}),s})()},2612:(_,u,l)=>{l.d(u,{O:()=>s});var e=l(8256),a=l(6895);const r=["multiSelect"];function d(n,i){if(1&n&&(e.TgZ(0,"div",6),e._uU(1),e.qZA()),2&n){const t=i.$implicit;e.uIk("data-value",t.key),e.xp6(1),e.hij(" ",t.text," ")}}let s=(()=>{class n{constructor(){this.hint="(bitte ausw\xE4hlen)",this.selected=[],this.selectedChange=new e.vpe,this.items=[],this._events=!0}setSelected(t){this._events=!1;try{$(this.dropdown?.nativeElement)?.dropdown("set exactly",t||[])}finally{this._events=!0}}ngAfterViewInit(){const t=$(this.dropdown?.nativeElement);t.dropdown({forceSelection:!1,fullTextSearch:!0,ignoreDiacritics:!0,match:"text",onChange:o=>this._events&&this.selectedChange.emit((o||"").split(",").map(c=>c.trim()).filter(c=>c))}),setTimeout(()=>{this.setSelected(this.selected),t.css("visibility","")},100)}ngOnChanges(t){const o=t.selected;o&&this.setSelected(o.firstChange?o.previousValue:o.currentValue)}ngOnDestroy(){$(this.dropdown?.nativeElement)?.dropdown("destroy")}}return n.\u0275fac=function(t){return new(t||n)},n.\u0275cmp=e.Xpm({type:n,selectors:[["semantic-multi-select"]],viewQuery:function(t,o){if(1&t&&e.Gf(r,5),2&t){let c;e.iGM(c=e.CRH())&&(o.dropdown=c.first)}},inputs:{hint:"hint",selected:"selected",items:"items"},outputs:{selectedChange:"selectedChange"},features:[e.TTD],decls:7,vars:2,consts:[[1,"ui","clearable","search","multiple","selection","fluid","dropdown",2,"visibility","hidden"],["multiSelect",""],[1,"dropdown","icon"],[1,"default","text"],[1,"menu"],["class","item",4,"ngFor","ngForOf"],[1,"item"]],template:function(t,o){1&t&&(e.TgZ(0,"div",0,1),e._UZ(2,"i",2),e.TgZ(3,"div",3),e._uU(4),e.qZA(),e.TgZ(5,"div",4),e.YNc(6,d,2,2,"div",5),e.qZA()()),2&t&&(e.xp6(4),e.Oqu(o.hint),e.xp6(2),e.Q6J("ngForOf",o.items))},dependencies:[a.sg]}),n})()},3771:(_,u,l)=>{l.d(u,{g:()=>n});var e=l(8256),a=l(6895),r=l(433);const d=["search"],s=function(i,t,o){return{search:i,close:t,link:o}};let n=(()=>{class i{constructor(){this.hint="Suche...",this.text="",this.clearable=!1,this.textChange=new e.vpe}onChange(o){this.textChange.emit(o)}clear(){this.clearable&&this.onChange("")}}return i.\u0275fac=function(o){return new(o||i)},i.\u0275cmp=e.Xpm({type:i,selectors:[["semantic-search"]],viewQuery:function(o,c){if(1&o&&e.Gf(d,5),2&o){let m;e.iGM(m=e.CRH())&&(c.search=m.first)}},inputs:{hint:"hint",text:"text",clearable:"clearable"},outputs:{textChange:"textChange"},decls:4,vars:7,consts:[[1,"ui","fluid","icon","input"],["search",""],["type","text",3,"placeholder","ngModel","ngModelChange"],[1,"ui","icon",3,"ngClass","click"]],template:function(o,c){1&o&&(e.TgZ(0,"div",0,1)(2,"input",2),e.NdJ("ngModelChange",function(p){return c.text=p})("ngModelChange",function(p){return c.onChange(p)}),e.qZA(),e.TgZ(3,"i",3),e.NdJ("click",function(){return c.clear()}),e.qZA()()),2&o&&(e.xp6(2),e.Q6J("placeholder",c.hint)("ngModel",c.text),e.xp6(1),e.Q6J("ngClass",e.kEZ(3,s,!c.text||!c.clearable,c.clearable&&c.text,c.clearable&&c.text)))},dependencies:[a.mk,r.Fj,r.JJ,r.On]}),i})()},2722:(_,u,l)=>{l.d(u,{H:()=>s});var e=l(8256),a=l(6895);const r=["singleSelect"];function d(n,i){if(1&n&&(e.TgZ(0,"div",6),e._uU(1),e.qZA()),2&n){const t=i.$implicit;e.uIk("data-value",t.key),e.xp6(1),e.hij(" ",t.text," ")}}let s=(()=>{class n{constructor(){this.hint="(bitte ausw\xE4hlen)",this.selected="",this.selectedChange=new e.vpe,this.items=[],this._events=!0}setSelected(t){this._events=!1;try{$(this.dropdown?.nativeElement)?.dropdown("set exactly",t||[])}finally{this._events=!0}}ngAfterViewInit(){const t=$(this.dropdown?.nativeElement);t.dropdown({forceSelection:!1,fullTextSearch:!0,ignoreDiacritics:!0,match:"text",onChange:o=>this._events&&this.selectedChange.emit(o)}),setTimeout(()=>{this.setSelected(this.selected),t.css("visibility","")},100)}ngOnChanges(t){const o=t.selected;o&&this.setSelected(o.firstChange?o.previousValue:o.currentValue)}ngOnDestroy(){$(this.dropdown?.nativeElement)?.dropdown("destroy")}}return n.\u0275fac=function(t){return new(t||n)},n.\u0275cmp=e.Xpm({type:n,selectors:[["semantic-single-select"]],viewQuery:function(t,o){if(1&t&&e.Gf(r,5),2&t){let c;e.iGM(c=e.CRH())&&(o.dropdown=c.first)}},inputs:{hint:"hint",selected:"selected",items:"items"},outputs:{selectedChange:"selectedChange"},features:[e.TTD],decls:7,vars:2,consts:[[1,"ui","search","clearable","selection","fluid","dropdown",2,"visibility","hidden"],["singleSelect",""],[1,"dropdown","icon"],[1,"default","text"],[1,"menu"],["class","item",4,"ngFor","ngForOf"],[1,"item"]],template:function(t,o){1&t&&(e.TgZ(0,"div",0,1),e._UZ(2,"i",2),e.TgZ(3,"div",3),e._uU(4),e.qZA(),e.TgZ(5,"div",4),e.YNc(6,d,2,2,"div",5),e.qZA()()),2&t&&(e.xp6(4),e.Oqu(o.hint),e.xp6(2),e.Q6J("ngForOf",o.items))},dependencies:[a.sg]}),n})()}}]);