import{c as o}from"./chunk-XONQTC6V.js";import{Ba as f,Fa as m,Ga as u,Ha as y,c as s,i as c,l as p}from"./chunk-H3AGR35F.js";var h=`
    query ($id: ID!) {
        recordings {
            findByContainer(containerId: $id) {
                _id fullName containerPosition
            }
        }
    }
`,j=(()=>{let a=class a extends y{constructor(e,i,n){super(e,"Container","containers","_id name description parentId parentLocation type",i,n),this.ignoredFields=new Set(["__typename","_id","allChildren","children","fullName","level"]),this.load()}fromServer(e){return e.type=o[e.type??o.Undefined],e}toServer(e){return e.type=o[e.type],e}createNew(){return{type:o.Undefined}}createMap(e){let i=super.createMap(e),n=r=>{if(typeof r.level=="number")return r.level;r.fullName=r.name;let t=r.parentId&&i[r.parentId];if(!t)return 0;t.allChildren?t.allChildren.add(r._id):t.allChildren=new Set([r._id]);let l=n(t);return r.fullName=`${t.fullName} > ${r.name}`,l+1};return e.forEach(r=>r.level=n(r)),e.forEach(r=>r.children=Array.from(r.allChildren||[]).map(t=>i[t]).sort((t,l)=>(t.name||t._id).toLocaleLowerCase().localeCompare((l.name||l._id).toLocaleLowerCase()))),i}getContents(e){let i=new s;return this._gql.call(h,{id:e},n=>i.next(n.recordings.findByContainer)),i}};a.\u0275fac=function(i){return new(i||a)(p(m),p(u),p(f))},a.\u0275prov=c({token:a,factory:a.\u0275fac});let d=a;return d})();export{j as a};
/**i18n:a81502aaa6c235164e05e21a700811bd0f875766fa20fd8a698be98cd7fa9431*/
