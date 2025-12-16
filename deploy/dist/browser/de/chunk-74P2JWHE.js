import{a as I}from"./chunk-TY5WUM4V.js";import{b as u}from"./chunk-F36R7FHD.js";import{Ia as x,Ja as $,a as m,b as _,d as y,i as S,l as a}from"./chunk-VMUMGGBD.js";var i=[];for(let r=0;r<256;++r)i.push((r+256).toString(16).slice(1));function v(r,t=0){return(i[r[t+0]]+i[r[t+1]]+i[r[t+2]]+i[r[t+3]]+"-"+i[r[t+4]]+i[r[t+5]]+"-"+i[r[t+6]]+i[r[t+7]]+"-"+i[r[t+8]]+i[r[t+9]]+"-"+i[r[t+10]]+i[r[t+11]]+i[r[t+12]]+i[r[t+13]]+i[r[t+14]]+i[r[t+15]]).toLowerCase()}var f,O=new Uint8Array(16);function g(){if(!f){if(typeof crypto>"u"||!crypto.getRandomValues)throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");f=crypto.getRandomValues.bind(crypto)}return f(O)}var b=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),c={randomUUID:b};function w(r,t,o){var n;r=r||{};let e=r.random??((n=r.rng)==null?void 0:n.call(r))??g();if(e.length<16)throw new Error("Random bytes length must be >= 16");if(e[6]=e[6]&15|64,e[8]=e[8]&63|128,t){if(o=o||0,o<0||o+16>t.length)throw new RangeError(`UUID byte range ${o}:${o+15} is out of buffer bounds`);for(let s=0;s<16;++s)t[o+s]=e[s];return t}return v(e)}function D(r,t,o){return c.randomUUID&&!t&&!r?c.randomUUID():w(r,t,o)}var l=D;var U=`
    _id name rentTo series containerId containerPosition containerType created description fullName genres languages rating deleteType
    links { description name url }
`,N=`
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
              view { ${U} }
          }
      }
  }
`,T={correlationId:"",deleteType:u.None,firstPage:0,forExport:!1,fullName:"",genres:[],language:"",pageSize:15,rating:void 0,rent:void 0,series:[],sort:"fullName",sortOrder:"Ascending"},G=(()=>{let t=class t{constructor(e,n,s){this._gql=e,this._config=s,this._query=new y({correlationId:"",count:0,genres:[],languages:[],total:0,view:[]}),this._rootSeries="",this._seriesMap={},this._filter=JSON.parse(JSON.stringify(T)),this._seriesWatch=n.map.subscribe(d=>(this._seriesMap=d,this.reload())),this.reload()}get result(){return this._query}get pageSize(){return this._filter.pageSize}set pageSize(e){e<1||!Number.isSafeInteger(e)||e===this._filter.pageSize||(this._filter.pageSize=e,this.reload())}get page(){return this._filter.firstPage}set page(e){e<0||!Number.isSafeInteger(e)||e===this._filter.firstPage||this.reload(e)}get language(){return this._filter.language||""}set language(e){e!==this._filter.language&&(this._filter.language=e,this.reload())}get rent(){return this._filter.rent}set rent(e){e!==this._filter.rent&&(this._filter.rent=e,this.reload())}get fullName(){return this._filter.fullName||""}set fullName(e){e!==this._filter.fullName&&(this._filter.fullName=e,this.reload())}get series(){return this._rootSeries||""}set series(e){e!==this._rootSeries&&(this._rootSeries=e,this.reload())}get genres(){return this._filter.genres||[]}set genres(e){JSON.stringify(e)!==JSON.stringify(this._filter.genres)&&(this._filter.genres=e,this.reload())}get rating(){return this._filter.rating}set rating(e){e!==this._filter.rating&&(this._filter.rating=e,this.reload())}get deleteType(){return this._filter.deleteType}set deleteType(e){e!==this._filter.deleteType&&(this._filter.deleteType=e,this.reload())}get sortColumn(){return this._filter.sort}get sortOrder(){return this._filter.sortOrder}sort(e){e===this._filter.sort?this._filter.sortOrder=this._filter.sortOrder==="Ascending"?"Descending":"Ascending":(this._filter.sort=e,this._filter.sortOrder=e==="fullName"?"Ascending":"Descending"),this.reload()}reset(){this._filter=JSON.parse(JSON.stringify(T)),this._rootSeries="",this.reload()}reload(e=0){this._filter.firstPage=e;let n=l(),s=this.filter;s.correlationId=n,this._gql.call(N,s,d=>{var h;let p=d.recordings.query;p.correlationId===s.correlationId&&((h=this._query)==null||h.next(p))})}openExport(){let e=this.filter;this._gql.call(N,_(m({},e),{correlationId:l(),firstPage:0,forExport:!0,pageSize:1e5,sort:"fullName",sortOrder:"Ascending"}),()=>window.open(`${this._config.server}/export`,"_blank"))}get filter(){var n;let e=JSON.parse(JSON.stringify(this._filter));return this._rootSeries&&(e.series=(((n=this._seriesMap[this._rootSeries])==null?void 0:n.allChildren)||[]).concat(this._rootSeries)),e.deleteType!=null&&(e.deleteType=u[e.deleteType]),e}ngOnDestroy(){this._seriesWatch.unsubscribe(),this._query.complete()}};t.\u0275fac=function(n){return new(n||t)(a($),a(I),a(x))},t.\u0275prov=S({token:t,factory:t.\u0275fac,providedIn:"root"});let r=t;return r})();export{l as a,U as b,G as c};
/**i18n:ca2b98f88e038f658fd3a013647fb90822f69a47c44668dd041b701a047489a6*/
