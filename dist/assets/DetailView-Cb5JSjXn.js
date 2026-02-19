import{u as Z,a as q,b as J,i as m,c as Q,d as tt,e as F,w as _,R as x,g as H,f as K,h as X,C as M,j as et,r as A,k as i,l as G,m as rt,A as at,X as it,Y as nt,T as ot,n as lt}from"./index-CP2Z2EMF.js";var st=["x1","y1","x2","y2","key"],ct=["offset"];function w(t){"@babel/helpers - typeof";return w=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},w(t)}function I(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter(function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable})),a.push.apply(a,r)}return a}function g(t){for(var e=1;e<arguments.length;e++){var a=arguments[e]!=null?arguments[e]:{};e%2?I(Object(a),!0).forEach(function(r){dt(t,r,a[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):I(Object(a)).forEach(function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(a,r))})}return t}function dt(t,e,a){return e=ht(e),e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}function ht(t){var e=ut(t,"string");return w(e)=="symbol"?e:e+""}function ut(t,e){if(w(t)!="object"||!t)return t;var a=t[Symbol.toPrimitive];if(a!==void 0){var r=a.call(t,e);if(w(r)!="object")return r;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}function b(){return b=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var a=arguments[e];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(t[r]=a[r])}return t},b.apply(this,arguments)}function V(t,e){if(t==null)return{};var a=ft(t,e),r,n;if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(t);for(n=0;n<l.length;n++)r=l[n],!(e.indexOf(r)>=0)&&Object.prototype.propertyIsEnumerable.call(t,r)&&(a[r]=t[r])}return a}function ft(t,e){if(t==null)return{};var a={};for(var r in t)if(Object.prototype.hasOwnProperty.call(t,r)){if(e.indexOf(r)>=0)continue;a[r]=t[r]}return a}var xt=function(e){var a=e.fill;if(!a||a==="none")return null;var r=e.fillOpacity,n=e.x,l=e.y,s=e.width,d=e.height,h=e.ry;return x.createElement("rect",{x:n,y:l,ry:h,width:s,height:d,stroke:"none",fill:a,fillOpacity:r,className:"recharts-cartesian-grid-bg"})};function Y(t,e){var a;if(x.isValidElement(t))a=x.cloneElement(t,e);else if(F(t))a=t(e);else{var r=e.x1,n=e.y1,l=e.x2,s=e.y2,d=e.key,h=V(e,st),c=et(h,!1);c.offset;var o=V(c,ct);a=x.createElement("line",b({},o,{x1:r,y1:n,x2:l,y2:s,fill:"none",key:d}))}return a}function gt(t){var e=t.x,a=t.width,r=t.horizontal,n=r===void 0?!0:r,l=t.horizontalPoints;if(!n||!l||!l.length)return null;var s=l.map(function(d,h){var c=g(g({},t),{},{x1:e,y1:d,x2:e+a,y2:d,key:"line-".concat(h),index:h});return Y(n,c)});return x.createElement("g",{className:"recharts-cartesian-grid-horizontal"},s)}function vt(t){var e=t.y,a=t.height,r=t.vertical,n=r===void 0?!0:r,l=t.verticalPoints;if(!n||!l||!l.length)return null;var s=l.map(function(d,h){var c=g(g({},t),{},{x1:d,y1:e,x2:d,y2:e+a,key:"line-".concat(h),index:h});return Y(n,c)});return x.createElement("g",{className:"recharts-cartesian-grid-vertical"},s)}function mt(t){var e=t.horizontalFill,a=t.fillOpacity,r=t.x,n=t.y,l=t.width,s=t.height,d=t.horizontalPoints,h=t.horizontal,c=h===void 0?!0:h;if(!c||!e||!e.length)return null;var o=d.map(function(u){return Math.round(u+n-n)}).sort(function(u,f){return u-f});n!==o[0]&&o.unshift(0);var y=o.map(function(u,f){var j=!o[f+1],v=j?n+s-u:o[f+1]-u;if(v<=0)return null;var p=f%e.length;return x.createElement("rect",{key:"react-".concat(f),y:u,x:r,height:v,width:l,stroke:"none",fill:e[p],fillOpacity:a,className:"recharts-cartesian-grid-bg"})});return x.createElement("g",{className:"recharts-cartesian-gridstripes-horizontal"},y)}function yt(t){var e=t.vertical,a=e===void 0?!0:e,r=t.verticalFill,n=t.fillOpacity,l=t.x,s=t.y,d=t.width,h=t.height,c=t.verticalPoints;if(!a||!r||!r.length)return null;var o=c.map(function(u){return Math.round(u+l-l)}).sort(function(u,f){return u-f});l!==o[0]&&o.unshift(0);var y=o.map(function(u,f){var j=!o[f+1],v=j?l+d-u:o[f+1]-u;if(v<=0)return null;var p=f%r.length;return x.createElement("rect",{key:"react-".concat(f),x:u,y:s,width:v,height:h,stroke:"none",fill:r[p],fillOpacity:n,className:"recharts-cartesian-grid-bg"})});return x.createElement("g",{className:"recharts-cartesian-gridstripes-vertical"},y)}var pt=function(e,a){var r=e.xAxis,n=e.width,l=e.height,s=e.offset;return H(K(g(g(g({},M.defaultProps),r),{},{ticks:X(r,!0),viewBox:{x:0,y:0,width:n,height:l}})),s.left,s.left+s.width,a)},bt=function(e,a){var r=e.yAxis,n=e.width,l=e.height,s=e.offset;return H(K(g(g(g({},M.defaultProps),r),{},{ticks:X(r,!0),viewBox:{x:0,y:0,width:n,height:l}})),s.top,s.top+s.height,a)},k={horizontal:!0,vertical:!0,stroke:"#ccc",fill:"none",verticalFill:[],horizontalFill:[]};function R(t){var e,a,r,n,l,s,d=Z(),h=q(),c=J(),o=g(g({},t),{},{stroke:(e=t.stroke)!==null&&e!==void 0?e:k.stroke,fill:(a=t.fill)!==null&&a!==void 0?a:k.fill,horizontal:(r=t.horizontal)!==null&&r!==void 0?r:k.horizontal,horizontalFill:(n=t.horizontalFill)!==null&&n!==void 0?n:k.horizontalFill,vertical:(l=t.vertical)!==null&&l!==void 0?l:k.vertical,verticalFill:(s=t.verticalFill)!==null&&s!==void 0?s:k.verticalFill,x:m(t.x)?t.x:c.left,y:m(t.y)?t.y:c.top,width:m(t.width)?t.width:c.width,height:m(t.height)?t.height:c.height}),y=o.x,u=o.y,f=o.width,j=o.height,v=o.syncWithTicks,p=o.horizontalValues,E=o.verticalValues,O=Q(),z=tt();if(!m(f)||f<=0||!m(j)||j<=0||!m(y)||y!==+y||!m(u)||u!==+u)return null;var W=o.verticalCoordinatesGenerator||pt,$=o.horizontalCoordinatesGenerator||bt,P=o.horizontalPoints,N=o.verticalPoints;if((!P||!P.length)&&F($)){var L=p&&p.length,C=$({yAxis:z?g(g({},z),{},{ticks:L?p:z.ticks}):void 0,width:d,height:h,offset:c},L?!0:v);_(Array.isArray(C),"horizontalCoordinatesGenerator should return Array but instead it returned [".concat(w(C),"]")),Array.isArray(C)&&(P=C)}if((!N||!N.length)&&F(W)){var D=E&&E.length,S=W({xAxis:O?g(g({},O),{},{ticks:D?E:O.ticks}):void 0,width:d,height:h,offset:c},D?!0:v);_(Array.isArray(S),"verticalCoordinatesGenerator should return Array but instead it returned [".concat(w(S),"]")),Array.isArray(S)&&(N=S)}return x.createElement("g",{className:"recharts-cartesian-grid"},x.createElement(xt,{fill:o.fill,fillOpacity:o.fillOpacity,x:o.x,y:o.y,width:o.width,height:o.height,ry:o.ry}),x.createElement(gt,b({},o,{offset:c,horizontalPoints:P,xAxis:O,yAxis:z})),x.createElement(vt,b({},o,{offset:c,verticalPoints:N,xAxis:O,yAxis:z})),x.createElement(mt,b({},o,{horizontalPoints:P})),x.createElement(yt,b({},o,{verticalPoints:N})))}R.displayName="CartesianGrid";const U=(...t)=>t.filter((e,a,r)=>!!e&&e.trim()!==""&&r.indexOf(e)===a).join(" ").trim();const wt=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();const jt=t=>t.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,a,r)=>r?r.toUpperCase():a.toLowerCase());const T=t=>{const e=jt(t);return e.charAt(0).toUpperCase()+e.slice(1)};var kt={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};const Ot=t=>{for(const e in t)if(e.startsWith("aria-")||e==="role"||e==="title")return!0;return!1};const zt=A.forwardRef(({color:t="currentColor",size:e=24,strokeWidth:a=2,absoluteStrokeWidth:r,className:n="",children:l,iconNode:s,...d},h)=>A.createElement("svg",{ref:h,...kt,width:e,height:e,stroke:t,strokeWidth:r?Number(a)*24/Number(e):a,className:U("lucide",n),...!l&&!Ot(d)&&{"aria-hidden":"true"},...d},[...s.map(([c,o])=>A.createElement(c,o)),...Array.isArray(l)?l:[l]]));const Pt=(t,e)=>{const a=A.forwardRef(({className:r,...n},l)=>A.createElement(zt,{ref:l,iconNode:e,className:U(`lucide-${wt(T(t))}`,`lucide-${t}`,r),...n}));return a.displayName=T(t),a};const Nt=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],B=Pt("x",Nt),Ct=({metric:t,onClose:e})=>{const a=t.trend.map((r,n)=>({name:`Session ${n+1}`,value:r}));return i.jsxs("div",{className:"detail-overlay",onClick:e,children:[i.jsxs("div",{className:"detail-modal animate-in",onClick:r=>r.stopPropagation(),children:[i.jsxs("div",{className:"modal-header",children:[i.jsxs("div",{className:"modal-title-group",children:[i.jsx("span",{className:"modal-subtitle",children:"Performance Analytics"}),i.jsxs("h3",{className:"modal-title",children:[t.name," Trends"]})]}),i.jsx("button",{className:"close-button",onClick:e,children:i.jsx(B,{size:20,strokeWidth:2.5})})]}),i.jsxs("div",{className:"modal-body",children:[i.jsxs("div",{className:"detail-stats",children:[i.jsxs("div",{className:"detail-stat-item",children:[i.jsx("span",{className:"stat-label",children:"Current Value"}),i.jsxs("div",{className:"stat-value-group",children:[i.jsx("span",{className:"stat-value",style:{color:t.color},children:G(t.value)}),i.jsx("span",{className:"stat-unit",children:t.unit})]})]}),i.jsxs("div",{className:"detail-stat-item",children:[i.jsx("span",{className:"stat-label",children:"Last Session"}),i.jsxs("div",{className:"stat-value-group",children:[i.jsx("span",{className:"stat-value",children:G(t.trend[t.trend.length-2])}),i.jsx("span",{className:"stat-unit",children:t.unit})]})]}),i.jsxs("div",{className:"detail-stat-item",children:[i.jsx("span",{className:"stat-label",children:"Session Average"}),i.jsxs("div",{className:"stat-value-group",children:[i.jsx("span",{className:"stat-value",children:G(t.trend.reduce((r,n)=>r+n,0)/t.trend.length)}),i.jsx("span",{className:"stat-unit",children:t.unit})]})]})]}),i.jsx("div",{className:"chart-container",children:i.jsx(rt,{width:"100%",height:320,children:i.jsxs(at,{data:a,margin:{top:20,right:20,left:0,bottom:0},children:[i.jsxs("defs",{children:[i.jsxs("linearGradient",{id:"colorValue",x1:"0",y1:"0",x2:"0",y2:"1",children:[i.jsx("stop",{offset:"5%",stopColor:t.color,stopOpacity:.6}),i.jsx("stop",{offset:"95%",stopColor:t.color,stopOpacity:0})]}),i.jsxs("filter",{id:"shadowDetail",children:[i.jsx("feGaussianBlur",{stdDeviation:"3",result:"blur"}),i.jsx("feComposite",{in:"SourceGraphic",in2:"blur",operator:"over"})]})]}),i.jsx(R,{strokeDasharray:"3 3",vertical:!1,stroke:"rgba(255,255,255,0.03)"}),i.jsx(it,{dataKey:"name",stroke:"var(--secondary-text)",fontSize:11,fontWeight:600,tickLine:!1,axisLine:!1,dy:10}),i.jsx(nt,{stroke:"var(--secondary-text)",fontSize:11,fontWeight:600,tickLine:!1,axisLine:!1,dx:-10,unit:t.unit==="%"?"%":""}),i.jsx(ot,{contentStyle:{backgroundColor:"rgba(26, 26, 36, 0.9)",backdropFilter:"blur(8px)",border:"1px solid var(--glass-border)",borderRadius:"12px",boxShadow:"var(--shadow)",color:"white"},itemStyle:{color:t.color,fontWeight:700},cursor:{stroke:"rgba(255,255,255,0.1)",strokeWidth:2}}),i.jsx(lt,{type:"monotone",dataKey:"value",stroke:t.color,fillOpacity:1,fill:"url(#colorValue)",strokeWidth:4,animationDuration:1500,filter:"url(#shadowDetail)"})]})})})]}),i.jsx("div",{className:"modal-footer",children:i.jsxs("div",{className:"insight-card",children:[i.jsxs("div",{className:"insight-icon",style:{backgroundColor:`${t.color}20`,color:t.color},children:[i.jsx(B,{size:16})," "]}),i.jsxs("p",{className:"insight-text",children:["Performance has increased by ",i.jsx("strong",{style:{color:"var(--success-color)"},children:"5.4%"})," compared to the previous 7-day average. The current trajectory suggests meeting the seasonal target within 2 weeks."]})]})})]}),i.jsx("style",{children:`
        .detail-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.4);
          backdrop-filter: blur(10px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          animation: fadeIn 0.4s ease;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .detail-modal {
          background-color: var(--card-bg);
          backdrop-filter: var(--glass-blur);
          width: 90%;
          max-width: 860px;
          border-radius: 24px;
          border: 1px solid var(--glass-border);
          overflow: hidden;
          box-shadow: var(--shadow);
        }
        
        .modal-header {
          padding: 28px 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--border-color);
        }
        
        .modal-subtitle {
          font-size: 11px;
          text-transform: uppercase;
          color: var(--accent-color);
          font-weight: 800;
          letter-spacing: 2px;
        }
        
        .modal-title {
          font-size: 28px;
          font-weight: 900;
          color: var(--primary-text);
          margin-top: 4px;
          letter-spacing: -0.5px;
        }
        
        .close-button {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--glass-border);
          color: var(--secondary-text);
          cursor: pointer;
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .close-button:hover {
          background: rgba(239, 68, 68, 0.15);
          color: var(--danger-color);
          border-color: var(--danger-color);
          transform: rotate(90deg);
        }
        
        .modal-body {
          padding: 40px;
        }
        
        .detail-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          margin-bottom: 48px;
        }
        
        .detail-stat-item {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 20px;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 16px;
          border: 1px solid var(--border-color);
        }
        
        .stat-label {
          font-size: 12px;
          color: var(--secondary-text);
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .stat-value-group {
          display: flex;
          align-items: baseline;
          gap: 6px;
        }
        
        .stat-value {
          font-size: 32px;
          font-weight: 900;
          line-height: 1;
        }
        
        .stat-unit {
          font-size: 14px;
          color: var(--secondary-text);
          font-weight: 600;
        }
        
        .chart-container {
          background: rgba(0, 0, 0, 0.2);
          padding: 24px;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.03);
          box-shadow: inset 0 2px 10px rgba(0,0,0,0.2);
        }
        
        .modal-footer {
          padding: 28px 40px;
          background-color: rgba(255, 255, 255, 0.01);
          border-top: 1px solid var(--border-color);
        }

        .insight-card {
          display: flex;
          align-items: center;
          gap: 16px;
          background: rgba(59, 130, 246, 0.05);
          padding: 16px;
          border-radius: 12px;
          border: 1px solid rgba(59, 130, 246, 0.1);
        }

        .insight-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        
        .insight-text {
          font-size: 14px;
          color: var(--secondary-text);
          line-height: 1.6;
          font-weight: 500;
        }
      `})]})};export{Ct as default};
