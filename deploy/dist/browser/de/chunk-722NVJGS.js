import{a as $}from"./chunk-SLI6VMN6.js";import{a as c,b as m,d as _,f as y,h as a,qa as S,ra as x}from"./chunk-F3XRWPKK.js";var l,T=new Uint8Array(16);function d(){if(!l&&(l=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||typeof msCrypto<"u"&&typeof msCrypto.getRandomValues=="function"&&msCrypto.getRandomValues.bind(msCrypto),!l))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return l(T)}var v=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;function q(t){return typeof t=="string"&&v.test(t)}var I=q;var i=[];for(f=0;f<256;++f)i.push((f+256).toString(16).substr(1));var f;function w(t){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,o=(i[t[r+0]]+i[t[r+1]]+i[t[r+2]]+i[t[r+3]]+"-"+i[t[r+4]]+i[t[r+5]]+"-"+i[t[r+6]]+i[t[r+7]]+"-"+i[t[r+8]]+i[t[r+9]]+"-"+i[t[r+10]]+i[t[r+11]]+i[t[r+12]]+i[t[r+13]]+i[t[r+14]]+i[t[r+15]]).toLowerCase();if(!I(o))throw TypeError("Stringified UUID is invalid");return o}var N=w;function E(t,r,o){t=t||{};var e=t.random||(t.rng||d)();if(e[6]=e[6]&15|64,e[8]=e[8]&63|128,r){o=o||0;for(var s=0;s<16;++s)r[o+s]=e[s];return r}return N(e)}var g=E;var P=`
    _id name rentTo series containerId containerPosition containerType created description fullName genres languages rating deleteType
    links { description name url }
`,O=`
  query (
      $correlationId: ID
      $deleteType: RecordingDeleteType
      $firstPage: Int!
      $forExport: Boolean
      $fullName: String
      $genres: [String!]
      $language: String
      $pageSize: Int!
      $rating: Int
      $rent: Boolean
      $series: [String!]
      $sort: RecordingSort!
      $sortOrder: SortDirection!
  ) {
      recordings {
          query(
              correlationId: $correlationId
              deleteType: $deleteType
              firstPage: $firstPage
              forExport: $forExport
              fullName: $fullName
              genres: $genres
              language: $language
              pageSize: $pageSize
              rating: $rating
              rent: $rent
              series: $series
              sort: $sort
              sortOrder: $sortOrder
          ) {
              correlationId count total
              genres { _id count }
              languages { _id count }
              view { ${P} }
          }
      }
  }
`,b={correlationId:"",deleteType:void 0,firstPage:0,forExport:!1,fullName:"",genres:[],language:"",pageSize:15,rating:void 0,rent:void 0,series:[],sort:"fullName",sortOrder:"Ascending"},Q=(()=>{let r=class r{constructor(e,s,n){this._gql=e,this._config=n,this._query=new _({correlationId:"",count:0,genres:[],languages:[],total:0,view:[]}),this._rootSeries="",this._seriesMap={},this._filter=JSON.parse(JSON.stringify(b)),this._seriesWatch=s.map.subscribe(u=>(this._seriesMap=u,this.reload())),this.reload()}get result(){return this._query}get pageSize(){return this._filter.pageSize}set pageSize(e){e<1||!Number.isSafeInteger(e)||e===this._filter.pageSize||(this._filter.pageSize=e,this.reload())}get page(){return this._filter.firstPage}set page(e){e<0||!Number.isSafeInteger(e)||e===this._filter.firstPage||this.reload(e)}get language(){return this._filter.language||""}set language(e){e!==this._filter.language&&(this._filter.language=e,this.reload())}get rent(){return this._filter.rent}set rent(e){e!==this._filter.rent&&(this._filter.rent=e,this.reload())}get fullName(){return this._filter.fullName||""}set fullName(e){e!==this._filter.fullName&&(this._filter.fullName=e,this.reload())}get series(){return this._rootSeries||""}set series(e){e!==this._rootSeries&&(this._rootSeries=e,this.reload())}get genres(){return this._filter.genres||[]}set genres(e){JSON.stringify(e)!==JSON.stringify(this._filter.genres)&&(this._filter.genres=e,this.reload())}get rating(){return this._filter.rating}set rating(e){e!==this._filter.rating&&(this._filter.rating=e,this.reload())}get deleteType(){return this._filter.deleteType}set deleteType(e){e!==this._filter.deleteType&&(this._filter.deleteType=e,this.reload())}get sortColumn(){return this._filter.sort}get sortOrder(){return this._filter.sortOrder}sort(e){e===this._filter.sort?this._filter.sortOrder=this._filter.sortOrder==="Ascending"?"Descending":"Ascending":(this._filter.sort=e,this._filter.sortOrder=e==="fullName"?"Ascending":"Descending"),this.reload()}reset(){this._filter=JSON.parse(JSON.stringify(b)),this._rootSeries="",this.reload()}reload(e=0){this._filter.firstPage=e;let s=g(),n=this.filter;n.correlationId=s,this._gql.call(O,n,u=>{var h;let p=u.recordings.query;p.correlationId===n.correlationId&&((h=this._query)==null||h.next(p))})}openExport(){let e=this.filter;this._gql.call(O,m(c({},e),{correlationId:g(),firstPage:0,forExport:!0,pageSize:1e5,sort:"fullName",sortOrder:"Ascending"}),()=>window.open(`${this._config.server}/export`,"_blank"))}get filter(){var s;let e=JSON.parse(JSON.stringify(this._filter));return this._rootSeries&&(e.series=(((s=this._seriesMap[this._rootSeries])==null?void 0:s.allChildren)||[]).concat(this._rootSeries)),e}ngOnDestroy(){this._seriesWatch.unsubscribe(),this._query.complete()}};r.\u0275fac=function(s){return new(s||r)(a(x),a($),a(S))},r.\u0275prov=y({token:r,factory:r.\u0275fac,providedIn:"root"});let t=r;return t})();export{g as a,P as b,Q as c};
/**i18n:4f0ea12499191b9fb7bfd15ae35102ab286a3db89d761e221a76f1a80285e269*/
