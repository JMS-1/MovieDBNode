import{a as S}from"./chunk-2KZ3TLGY.js";import{a as p,b as h,d as c,f as m,h as n,pa as _,qa as y}from"./chunk-QZNXIC6G.js";var a,O=new Uint8Array(16);function u(){if(!a&&(a=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||typeof msCrypto<"u"&&typeof msCrypto.getRandomValues=="function"&&msCrypto.getRandomValues.bind(msCrypto),!a))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return a(O)}var x=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;function b(t){return typeof t=="string"&&x.test(t)}var v=b;var i=[];for(l=0;l<256;++l)i.push((l+256).toString(16).substr(1));var l;function T(t){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:0,e=(i[t[r+0]]+i[t[r+1]]+i[t[r+2]]+i[t[r+3]]+"-"+i[t[r+4]]+i[t[r+5]]+"-"+i[t[r+6]]+i[t[r+7]]+"-"+i[t[r+8]]+i[t[r+9]]+"-"+i[t[r+10]]+i[t[r+11]]+i[t[r+12]]+i[t[r+13]]+i[t[r+14]]+i[t[r+15]]).toLowerCase();if(!v(e))throw TypeError("Stringified UUID is invalid");return e}var $=T;function q(t,r,e){t=t||{};var s=t.random||(t.rng||u)();if(s[6]=s[6]&15|64,s[8]=s[8]&63|128,r){e=e||0;for(var o=0;o<16;++o)r[e+o]=s[o];return r}return $(s)}var f=q;var w=`
    _id name rentTo series containerId containerPosition containerType created description fullName genres languages rating deleteType
    links { description name url }
`,I=`
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
              view { ${w} }
          }
      }
  }
`,N={correlationId:"",deleteType:void 0,firstPage:0,forExport:!1,fullName:"",genres:[],language:"",pageSize:15,rating:void 0,rent:void 0,series:[],sort:"fullName",sortOrder:"Ascending"},W=(()=>{class t{constructor(e,s,o){this._gql=e,this._config=o,this._query=new c({correlationId:"",count:0,genres:[],languages:[],total:0,view:[]}),this._rootSeries="",this._seriesMap={},this._filter=JSON.parse(JSON.stringify(N)),this._seriesWatch=s.map.subscribe(g=>(this._seriesMap=g,this.reload())),this.reload()}get result(){return this._query}get pageSize(){return this._filter.pageSize}set pageSize(e){e<1||!Number.isSafeInteger(e)||e===this._filter.pageSize||(this._filter.pageSize=e,this.reload())}get page(){return this._filter.firstPage}set page(e){e<0||!Number.isSafeInteger(e)||e===this._filter.firstPage||this.reload(e)}get language(){return this._filter.language||""}set language(e){e!==this._filter.language&&(this._filter.language=e,this.reload())}get rent(){return this._filter.rent}set rent(e){e!==this._filter.rent&&(this._filter.rent=e,this.reload())}get fullName(){return this._filter.fullName||""}set fullName(e){e!==this._filter.fullName&&(this._filter.fullName=e,this.reload())}get series(){return this._rootSeries||""}set series(e){e!==this._rootSeries&&(this._rootSeries=e,this.reload())}get genres(){return this._filter.genres||[]}set genres(e){JSON.stringify(e)!==JSON.stringify(this._filter.genres)&&(this._filter.genres=e,this.reload())}get rating(){return this._filter.rating}set rating(e){e!==this._filter.rating&&(this._filter.rating=e,this.reload())}get deleteType(){return this._filter.deleteType}set deleteType(e){e!==this._filter.deleteType&&(this._filter.deleteType=e,this.reload())}get sortColumn(){return this._filter.sort}get sortOrder(){return this._filter.sortOrder}sort(e){e===this._filter.sort?this._filter.sortOrder=this._filter.sortOrder==="Ascending"?"Descending":"Ascending":(this._filter.sort=e,this._filter.sortOrder=e==="fullName"?"Ascending":"Descending"),this.reload()}reset(){this._filter=JSON.parse(JSON.stringify(N)),this._rootSeries="",this.reload()}reload(e=0){this._filter.firstPage=e;let s=f(),o=this.filter;o.correlationId=s,this._gql.call(I,o,g=>{let d=g.recordings.query;d.correlationId===o.correlationId&&this._query?.next(d)})}openExport(){let e=this.filter;this._gql.call(I,h(p({},e),{correlationId:f(),firstPage:0,forExport:!0,pageSize:1e5,sort:"fullName",sortOrder:"Ascending"}),()=>window.open(`${this._config.server}/export`,"_blank"))}get filter(){let e=JSON.parse(JSON.stringify(this._filter));return this._rootSeries&&(e.series=(this._seriesMap[this._rootSeries]?.allChildren||[]).concat(this._rootSeries)),e}ngOnDestroy(){this._seriesWatch.unsubscribe(),this._query.complete()}static{this.\u0275fac=function(s){return new(s||t)(n(y),n(S),n(_))}}static{this.\u0275prov=m({token:t,factory:t.\u0275fac,providedIn:"root"})}}return t})();export{f as a,w as b,W as c};
/**i18n:2ffc8da911ed55a95e008fcf9110eedd1169d4773ce3fe42367fab0ac6b43ffd*/
