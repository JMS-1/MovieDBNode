import{c as u,f as m,h as s,ia as n,ra as p,sa as h,ta as v}from"./chunk-F3XRWPKK.js";var D=function(e){return e[e.BluRay=5]="BluRay",e[e.DVD=4]="DVD",e[e.RecordedDVD=3]="RecordedDVD",e[e.SuperVideoCD=2]="SuperVideoCD",e[e.Undefined=0]="Undefined",e[e.VideoCD=1]="VideoCD",e}(D||{}),S=function(e){return e[e.Deletable=2]="Deletable",e[e.Deleted=1]="Deleted",e[e.None=0]="None",e}(S||{}),f=function(e){return e[e.Box=2]="Box",e[e.Disk=4]="Disk",e[e.FeatureSet=1]="FeatureSet",e[e.Folder=5]="Folder",e[e.Shelf=3]="Shelf",e[e.Undefined=0]="Undefined",e}(f||{});var V=`
    query ($id: ID!) {
        recordings {
            findByContainer(containerId: $id) {
                _id fullName containerPosition
            }
        }
    }
`,j=(()=>{let d=class d extends v{constructor(t,a,i){super(t,"Container","containers","_id name description parentId parentLocation type",a,i),this.ignoredFields=new Set(["__typename","_id","allChildren","children","fullName","level"]),this.load()}fromServer(t){return t.type=f[t.type??f.Undefined],t}toServer(t){return t.type=f[t.type],t}createNew(){return{type:f.Undefined}}createMap(t){let a=super.createMap(t),i=l=>{if(typeof l.level=="number")return l.level;l.fullName=l.name;let r=l.parentId&&a[l.parentId];if(!r)return 0;r.allChildren?r.allChildren.add(l._id):r.allChildren=new Set([l._id]);let o=i(r);return l.fullName=`${r.fullName} > ${l.name}`,o+1};return t.forEach(l=>l.level=i(l)),t.forEach(l=>l.children=Array.from(l.allChildren||[]).map(r=>a[r]).sort((r,o)=>(r.name||r._id).toLocaleLowerCase().localeCompare((o.name||o._id).toLocaleLowerCase()))),a}getContents(t){let a=new u;return this._gql.call(V,{id:t},i=>a.next(i.recordings.findByContainer)),a}};d.\u0275fac=function(a){return new(a||d)(s(p),s(h),s(n))},d.\u0275prov=m({token:d,factory:d.\u0275fac});let e=d;return e})();export{D as a,S as b,f as c,j as d};
/**i18n:4f0ea12499191b9fb7bfd15ae35102ab286a3db89d761e221a76f1a80285e269*/
