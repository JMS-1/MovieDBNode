import{a as v}from"./chunk-VL7C426R.js";import{b as d}from"./chunk-5QXNMT3O.js";import{Ea as x,Fa as $,a as m,b as _,d as y,i as S,l as a}from"./chunk-TLQ6C6QU.js";var l,q=new Uint8Array(16);function p(){if(!l&&(l=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||typeof msCrypto<"u"&&typeof msCrypto.getRandomValues=="function"&&msCrypto.getRandomValues.bind(msCrypto),!l))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return l(q)}var N=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;function w(t){return typeof t=="string"&&N.test(t)}var I=w;var i=[];for(f=0;f<256;++f)i.push((f+256).toString(16).substr(1));var f;function E(t){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,o=(i[t[r+0]]+i[t[r+1]]+i[t[r+2]]+i[t[r+3]]+"-"+i[t[r+4]]+i[t[r+5]]+"-"+i[t[r+6]]+i[t[r+7]]+"-"+i[t[r+8]]+i[t[r+9]]+"-"+i[t[r+10]]+i[t[r+11]]+i[t[r+12]]+i[t[r+13]]+i[t[r+14]]+i[t[r+15]]).toLowerCase();if(!I(o))throw TypeError("Stringified UUID is invalid");return o}var O=E;function P(t,r,o){t=t||{};var e=t.random||(t.rng||p)();if(e[6]=e[6]&15|64,e[8]=e[8]&63|128,r){o=o||0;for(var s=0;s<16;++s)r[o+s]=e[s];return r}return O(e)}var g=P;var D=`
    _id name rentTo series containerId containerPosition containerType created description fullName genres languages rating deleteType
    links { description name url }
`,T=`
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
              view { ${D} }
          }
      }
  }
`,b={correlationId:"",deleteType:d.None,firstPage:0,forExport:!1,fullName:"",genres:[],language:"",pageSize:15,rating:void 0,rent:void 0,series:[],sort:"fullName",sortOrder:"Ascending"},K=(()=>{let r=class r{constructor(e,s,n){this._gql=e,this._config=n,this._query=new y({correlationId:"",count:0,genres:[],languages:[],total:0,view:[]}),this._rootSeries="",this._seriesMap={},this._filter=JSON.parse(JSON.stringify(b)),this._seriesWatch=s.map.subscribe(u=>(this._seriesMap=u,this.reload())),this.reload()}get result(){return this._query}get pageSize(){return this._filter.pageSize}set pageSize(e){e<1||!Number.isSafeInteger(e)||e===this._filter.pageSize||(this._filter.pageSize=e,this.reload())}get page(){return this._filter.firstPage}set page(e){e<0||!Number.isSafeInteger(e)||e===this._filter.firstPage||this.reload(e)}get language(){return this._filter.language||""}set language(e){e!==this._filter.language&&(this._filter.language=e,this.reload())}get rent(){return this._filter.rent}set rent(e){e!==this._filter.rent&&(this._filter.rent=e,this.reload())}get fullName(){return this._filter.fullName||""}set fullName(e){e!==this._filter.fullName&&(this._filter.fullName=e,this.reload())}get series(){return this._rootSeries||""}set series(e){e!==this._rootSeries&&(this._rootSeries=e,this.reload())}get genres(){return this._filter.genres||[]}set genres(e){JSON.stringify(e)!==JSON.stringify(this._filter.genres)&&(this._filter.genres=e,this.reload())}get rating(){return this._filter.rating}set rating(e){e!==this._filter.rating&&(this._filter.rating=e,this.reload())}get deleteType(){return this._filter.deleteType}set deleteType(e){e!==this._filter.deleteType&&(this._filter.deleteType=e,this.reload())}get sortColumn(){return this._filter.sort}get sortOrder(){return this._filter.sortOrder}sort(e){e===this._filter.sort?this._filter.sortOrder=this._filter.sortOrder==="Ascending"?"Descending":"Ascending":(this._filter.sort=e,this._filter.sortOrder=e==="fullName"?"Ascending":"Descending"),this.reload()}reset(){this._filter=JSON.parse(JSON.stringify(b)),this._rootSeries="",this.reload()}reload(e=0){this._filter.firstPage=e;let s=g(),n=this.filter;n.correlationId=s,this._gql.call(T,n,u=>{var c;let h=u.recordings.query;h.correlationId===n.correlationId&&((c=this._query)==null||c.next(h))})}openExport(){let e=this.filter;this._gql.call(T,_(m({},e),{correlationId:g(),firstPage:0,forExport:!0,pageSize:1e5,sort:"fullName",sortOrder:"Ascending"}),()=>window.open(`${this._config.server}/export`,"_blank"))}get filter(){var s;let e=JSON.parse(JSON.stringify(this._filter));return this._rootSeries&&(e.series=(((s=this._seriesMap[this._rootSeries])==null?void 0:s.allChildren)||[]).concat(this._rootSeries)),e.deleteType!=null&&(e.deleteType=d[e.deleteType]),e}ngOnDestroy(){this._seriesWatch.unsubscribe(),this._query.complete()}};r.\u0275fac=function(s){return new(s||r)(a($),a(v),a(x))},r.\u0275prov=S({token:r,factory:r.\u0275fac,providedIn:"root"});let t=r;return t})();export{g as a,D as b,K as c};
/**i18n:61df9ff10622d2ebc260c6f282f5158e23adeafa46cfc1233e723ebdfa1a4602*/
