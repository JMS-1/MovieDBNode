import{c as s,f as u,h as o,ha as m,qa as n,ra as p,sa as h}from"./chunk-WC7MP575.js";var v=function(e){return e[e.BluRay=5]="BluRay",e[e.DVD=4]="DVD",e[e.RecordedDVD=3]="RecordedDVD",e[e.SuperVideoCD=2]="SuperVideoCD",e[e.Undefined=0]="Undefined",e[e.VideoCD=1]="VideoCD",e}(v||{}),D=function(e){return e[e.Deletable=2]="Deletable",e[e.Deleted=1]="Deleted",e[e.None=0]="None",e}(D||{}),d=function(e){return e[e.Box=2]="Box",e[e.Disk=4]="Disk",e[e.FeatureSet=1]="FeatureSet",e[e.Folder=5]="Folder",e[e.Shelf=3]="Shelf",e[e.Undefined=0]="Undefined",e}(d||{});var c=`
    query ($id: ID!) {
        recordings {
            findByContainer(containerId: $id) {
                _id fullName containerPosition
            }
        }
    }
`,I=(()=>{class e extends h{constructor(t,a,i){super(t,"Container","containers","_id name description parentId parentLocation type",a,i),this.ignoredFields=new Set(["__typename","_id","allChildren","children","fullName","level"]),this.load()}fromServer(t){return t.type=d[t.type??d.Undefined],t}toServer(t){return t.type=d[t.type],t}createNew(){return{type:d.Undefined}}createMap(t){let a=super.createMap(t),i=l=>{if(typeof l.level=="number")return l.level;l.fullName=l.name;let r=l.parentId&&a[l.parentId];if(!r)return 0;r.allChildren?r.allChildren.add(l._id):r.allChildren=new Set([l._id]);let f=i(r);return l.fullName=`${r.fullName} > ${l.name}`,f+1};return t.forEach(l=>l.level=i(l)),t.forEach(l=>l.children=Array.from(l.allChildren||[]).map(r=>a[r]).sort((r,f)=>(r.name||r._id).toLocaleLowerCase().localeCompare((f.name||f._id).toLocaleLowerCase()))),a}getContents(t){let a=new s;return this._gql.call(c,{id:t},i=>a.next(i.recordings.findByContainer)),a}static{this.\u0275fac=function(a){return new(a||e)(o(n),o(p),o(m))}}static{this.\u0275prov=u({token:e,factory:e.\u0275fac})}}return e})();export{v as a,D as b,d as c,I as d};
/**i18n:89832ca10e07b9b22f7f6c4347886c9b71cd69873c1434137d79347a92194613*/
