import{b as N,D as ge,n as xe,L as ye,R as ve,G as Se,C as V,S as we,M as K,c as Me,V as J,o as Q,d as be,e as ze,B as Pe,a as Z,p as ke,q as De,j as se,P as Ce,r as Te,H as Ae,f as Fe,O as _e,h as Le,i as H}from"./three.module.DBLrAFqm.js";import{d as Ue,s as le,a as Ie,r as Ee}from"./moon-material.D6ghfIzk.js";const ce=`
  float formationHash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
  float formationNoise(vec2 p){
    vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
    return mix(mix(formationHash(i),formationHash(i+vec2(1.,0.)),f.x),
      mix(formationHash(i+vec2(0.,1.)),formationHash(i+vec2(1.)),f.x),f.y);
  }
  float photoArrival(vec2 uv,float progress){
    vec2 q=(uv-vec2(.56,.55))*vec2(1.,1.25);
    float order=clamp(.15+length(q)*.92+(formationNoise(uv*4.2)-.5)*.42,0.,1.);
    float t=clamp((progress-(.42+order*.13))/(.37+order*.03),0.,1.);
    return t*t*t*(t*(t*6.-15.)+10.);
  }
  float photoCoverage(float arrival){return smoothstep(.46,.985,arrival);}
`;function We(){return new N({transparent:!0,depthWrite:!1,toneMapped:!1,uniforms:{uPhoto:{value:null},uProgress:{value:0}},vertexShader:`varying vec2 vUv;
      void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,fragmentShader:`uniform sampler2D uPhoto;uniform float uProgress;varying vec2 vUv;
      ${ce}
      void main(){
        float arrival=photoArrival(vUv,uProgress),coverage=photoCoverage(arrival);
        // Fine pigment fills the spaces between the settling points. The grain
        // has no clock: stopping or reversing scroll cannot make the image fizz.
        float grain=formationHash(floor(vUv*vec2(1800.,1200.)));
        float alpha=smoothstep(grain*.15,.84+grain*.16,coverage);
        if(alpha<.001)discard;
        gl_FragColor=vec4(texture2D(uPhoto,vUv).rgb,alpha);
        #include <colorspace_fragment>
      }`})}const ue=`
 vec3 lunarStream(float x,float lane,float scatter,vec2 size,float time){
  float angle=x*7.1+lane*.19+time*.016;
  vec3 point=vec3((x-.5)*size.x*1.45,
   sin(angle)*size.y*.14+scatter*size.y*.065+lane*size.y*.013,
   cos(angle+lane*.22)*210.);
  point.y+=sin(x*18.+lane*.25+time*.024)*size.y*.025;
  return point;
 }
`;let $;function Oe(){const F=$??new Uint8Array(262144),y=(o,a,n)=>{let r=Math.imul(o,374761393)^Math.imul(a,668265263)^Math.imul(n,2147483647);return r=Math.imul(r^r>>>13,1274126177),((r^r>>>16)>>>0)/4294967295},W=new Map;if(!$)for(const o of[4,8,16]){const a=new Float64Array(o*o*o);for(let n=0;n<o;n++)for(let r=0;r<o;r++)for(let h=0;h<o;h++)a[h+o*(r+o*n)]=y(h,r,n);W.set(o,a)}const m=(o,a,n,r)=>{const h=Math.floor(o),_=Math.floor(a),L=Math.floor(n),x=c=>c*c*(3-2*c),u=x(o-h),g=x(a-_),G=x(n-L),b=W.get(r),v=(c,z,P)=>b[(h+c)%r+r*((_+z)%r+r*((L+P)%r))],p=(c,z,P)=>c+(z-c)*P;return p(p(p(v(0,0,0),v(1,0,0),u),p(v(0,1,0),v(1,1,0),u),g),p(p(v(0,0,1),v(1,0,1),u),p(v(0,1,1),v(1,1,1),u),g),G)};if(!$)for(let o=0;o<64;o++)for(let a=0;a<64;a++)for(let n=0;n<64;n++)F[n+64*(a+64*o)]=Math.round(255*(m(n/16,a/16,o/16,4)*.57+m(n/8,a/8,o/8,8)*.28+m(n/4,a/4,o/4,16)*.15));$=F;const l=new ge(F,64,64,64);return l.format=xe,l.minFilter=l.magFilter=ye,l.wrapS=l.wrapT=l.wrapR=ve,l.unpackAlignment=1,l.needsUpdate=!0,l}function Ge(A,F,y,W,m=!1){const l=new Se,o=Oe();A.wrapS=A.wrapT=ve;const a=new V,n=new V,r=new V,h=new V,_=new V,L=new we(1,y?160:256,y?112:192),x=Ue(A,W),u=x.uniforms;u.uPaper.value=a,u.uLightInk.value=r,u.uDarkInk.value=h,le(x,.48);const g=new K(L,x);g.renderOrder=1,l.add(g);const G=new Me(1,1,1),b=[0,1,2].map(e=>{const i=new N({glslVersion:ze,transparent:!0,side:be,depthWrite:!1,depthTest:!1,uniforms:{uNoise:{value:o},uTime:{value:0},uOpacity:{value:1},uPaper:{value:a},uInk:{value:n},uSeed:{value:e*7.31},uLayer:{value:e},uGather:{value:0},uCenter:{value:new J},uExtent:{value:new J},uViewport:{value:new Q},uCamera:{value:new J}},vertexShader:`out vec3 vOrigin,vDirection;uniform vec3 uCamera;
        void main(){vOrigin=(inverse(modelMatrix)*vec4(uCamera,1.)).xyz;vDirection=position-vOrigin;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`,fragmentShader:`precision highp sampler3D;
        out vec4 outColor;
        #define gl_FragColor outColor
        uniform sampler3D uNoise;uniform float uTime,uOpacity,uSeed,uLayer,uGather;uniform vec3 uPaper,uInk,uCenter,uExtent;uniform vec2 uViewport;
        in vec3 vOrigin,vDirection;
        ${ue}
        float density(vec3 p){
          vec3 q=p+vec3(uTime*.0018+uSeed,0.,uSeed*.3);
          float n=texture(uNoise,q*vec3(1.4,.8,1.3)).r;
          q.y+=sin(q.x*7.+n*3.)*.13;
          float f=texture(uNoise,q*vec3(2.6,1.4,2.)).r;
          float detail=texture(uNoise,q*vec3(9.,3.,5.)).r;
          // The initially low mist bends into the very same stream as the dust.
          float worldX=uCenter.x+p.x*uExtent.x;
          float flowX=worldX/(uViewport.x*1.45)+.5;
          float streamY=lunarStream(flowX,1.+uLayer,0.,uViewport,uTime).y-uLayer*uViewport.y*.022;
          float centerY=(streamY-uCenter.y)/uExtent.y;
          float crossSection=mix((p.y+sin(p.x*4.+uSeed)*.065)*3.4,(p.y-centerY)*(8.+uLayer*2.),uGather);
          float shape=exp(-crossSection*crossSection)*smoothstep(.5,.18,abs(p.x))*smoothstep(.5,.25,abs(p.z));
          return smoothstep(.34,.66,n*.43+f*.37+detail*.2)*shape;
        }
        void main(){
          vec3 dir=normalize(vDirection),inv=1./dir;
          vec3 t0=(-.5-vOrigin)*inv,t1=(.5-vOrigin)*inv;
          vec3 lo=min(t0,t1),hi=max(t0,t1);
          float begin=max(max(lo.x,lo.y),lo.z),end=min(min(hi.x,hi.y),hi.z);
          if(begin>end)discard;begin=max(begin,0.);
          float stride=(end-begin)/float(${y?28:44});
          float jitter=fract(sin(dot(gl_FragCoord.xy,vec2(12.9898,78.233)))*43758.5453);
          vec4 sum=vec4(0.);
          for(int i=0;i<${y?28:44};i++){
            vec3 p=vOrigin+dir*(begin+(float(i)+jitter)*stride);
            float d=density(p);
            float lighting=clamp((density(p+vec3(-.04,.075,.04))-d)*2.5,-.2,.2);
            float a=(1.-exp(-d*stride*6.))*uOpacity;
            vec3 color=mix(uPaper,uInk,clamp(.18+d*.42+lighting,.04,.60));
            sum.rgb+=(1.-sum.a)*color*a;sum.a+=(1.-sum.a)*a;
            if(sum.a>.97)break;
          }
          if(sum.a<.002)discard;
          gl_FragColor=vec4(sum.rgb/max(sum.a,.001),sum.a);
          #include <colorspace_fragment>
        }`}),t=new K(G,i);return t.renderOrder=e===0?0:3,t.layers.set(e===0?1:2),l.add(t),t}),v=y?240:480,p=y?180:360,c=v*p,z=new Float32Array(c*2),P=new Float32Array(c*3);let X=21717;const B=()=>(X=Math.imul(X,1664525)+1013904223>>>0,X/4294967296);for(let e=0;e<p;e++)for(let i=0;i<v;i++){const t=e*v+i,s=B(),S=B(),M=B();z.set([(i+.15+s*.7)/v,(e+.15+S*.7)/p],t*2),P.set([s,S,M],t*3)}const U=new Pe;U.setAttribute("position",new Z(new Float32Array(c*3),3)),U.setAttribute("uv",new Z(z,2)),U.setAttribute("aSeed",new Z(P,3));const pe=new ke,f={uMap:{value:A},uMoonProgress:{value:.45},uPhoto:{value:F},uProgress:{value:0},uTime:{value:0},uMoon:{value:new se},uMoonRotation:{value:new De},uEnd:{value:new se},uSize:{value:new Q},uDpr:{value:1},uDirectory:{value:m?1:0},uWeights:{value:new Float32Array([1,0,0,0,0,0])},uPaper:{value:a},uInk:{value:_},uLight:u.uLight,uDark:u.uDark,uLightInk:u.uLightInk,uDarkInk:u.uDarkInk},ee=new N({uniforms:f,transparent:!0,depthWrite:!1,vertexShader:`attribute vec3 aSeed;uniform float uProgress,uMoonProgress,uTime,uDpr,uDirectory,uWeights[6],uDark;uniform vec4 uMoon,uEnd;uniform vec2 uSize;
      uniform sampler2D uMap;uniform mat3 uMoonRotation;uniform vec3 uPaper,uInk,uLight,uLightInk,uDarkInk;
      varying vec2 vUv;varying float vAlpha,vMix,vSoft;varying vec3 vSurfaceColor;
      ${ce}
      ${Ie}
      ${ue}
      void main(){vUv=uv;vSurfaceColor=mix(uPaper,uInk,.6);
        if(uDirectory>.5){
          float tau=6.2831853,t=uTime*.06,r=uMoon.w;
          float a=aSeed.x*tau,spread=aSeed.y,depth=(aSeed.z-.5)*r*.5;
          // All six fields share the same particle identities, so they can morph.
          float ring=r*(1.08+spread*.40);
          vec3 photograph=vec3(cos(a+t*.15)*ring,sin(a+t*.15)*ring*.78,depth);
          float lane=floor(aSeed.z*4.);
          vec3 film=vec3((aSeed.x-.5)*r*3.8,sin(aSeed.x*6.+t+lane*.35)*r*.36+(spread-.5)*r*.1-r*.62,cos(aSeed.x*6.+t)*r*.5);
          float groove=r*(1.13+floor(spread*7.)*.048)+(aSeed.z-.5)*r*.018;
          vec3 record=vec3(cos(a+t*.32)*groove,sin(a+t*.32)*groove*.44-r*.28,sin(a+t*.32)*groove*.36);
          record.y+=sin(a*3.-t*2.)*r*.025;
          float cell=floor(aSeed.x*8.),turn=(spread-.5)*.65;
          vec3 work=vec3(cos(cell*tau/8.+turn)*r*1.34,sin(cell*tau/8.+turn)*r*1.10,depth*.4);
          work+=vec3(sin(t+cell),cos(t*.7+cell),0.)*r*.016;
          float line=floor(spread*5.);
          vec3 journal=vec3((aSeed.x-.5)*r*3.4,sin(aSeed.x*8.+line*.7+t*.35)*r*.09+line*r*.10-r*.8,depth*.6);
          journal.y+=(aSeed.z-.5)*r*.045;
          float latitude=acos(spread*2.-1.);
          vec3 about=vec3(sin(latitude)*cos(a+t*.12),cos(latitude),sin(latitude)*sin(a+t*.12))*r*(1.18+aSeed.z*.45);
          vec3 point=photograph*uWeights[0]+film*uWeights[1]+record*uWeights[2]+work*uWeights[3]+journal*uWeights[4]+about*uWeights[5];
          point+=uMoon.xyz;
          vec4 mv=modelViewMatrix*vec4(point,1.);gl_Position=projectionMatrix*mv;
          gl_PointSize=clamp((.65+aSeed.z*.5)*uDpr*(uSize.y*1.5/-mv.z),.6,2.4);
          vAlpha=(.09+aSeed.z*.15)*smoothstep(0.,.12,spread)*(1.-smoothstep(.88,1.,spread));
          vSoft=0.;vMix=0.;return;
        }
        // Match SphereGeometry's UV convention and the mesh's exact rotation.
        // Scrambled source identities spread the release across the visible face.
        float theta=aSeed.x*6.2831853,phi=acos(2.*aSeed.y-1.);
        vec2 moonUv=vec2(aSeed.x,1.-phi/3.14159265);
        vec3 localPoint=vec3(-sin(phi)*cos(theta),cos(phi),sin(phi)*sin(theta));
        vec3 normal=uMoonRotation*localPoint;
        vec3 shell=normal*uMoon.w*1.003+uMoon.xyz;
        float albedo=pow(dot(texture2D(uMap,moonUv).rgb,vec3(.2126,.7152,.0722)),1./2.2);
        float release=lunarRelease(normal,albedo,uMoonProgress);
        float age=lunarErosion(uMoonProgress)-lunarFront(normal,albedo);
        float sun=dot(normal,normalize(uLight));
        float pigment=clamp(.18+pow(1.-albedo,1.3)*.76+pow(1.-max(sun,0.),1.7)*.12,.10,.88);
        vec3 daylight=mix(uPaper,uDarkInk,pigment);
        vec3 night=mix(uDarkInk,uLightInk,clamp((.32+albedo*.76)*(.44+.56*pow(max(sun,0.),.38)),.07,1.));
        vSurfaceColor=mix(daylight,night,uDark);
        // Only a trace of ambient dust remains independent of the moon.
        float free=step(.995,aSeed.z);
        vec3 dust=vec3((aSeed.x-.5)*uSize.x*1.4,sin(aSeed.x*9.+uTime*.024)*uSize.y*.09+(aSeed.y-.5)*uSize.y*.2,aSeed.z*450.-200.);
        // Pigment first lifts from the eroding surface before joining the cloud.
        float lift=smoothstep(.02,.85,release);
        vec3 peel=shell+normal*uMoon.w*.045*lift;
        peel+=vec3(-normal.y,normal.x,.25)*sin(lift*3.14159265)*uMoon.w*.055;
        peel=mix(peel,dust,free);
        float a=mix(smoothstep(.04,.40,age),smoothstep(.30,.68,uProgress),free);
        float b=photoArrival(uv,uProgress)*mix(smoothstep(0.,.9,release),1.,free);
        float flowX=uv.x+(aSeed.x-.5)*.025;
        float lane=floor(aSeed.z*5.);
        float angle=flowX*7.1+lane*.19+uTime*.016;
        vec3 stream=lunarStream(flowX,lane,aSeed.y-.5,uSize,uTime);
        vec3 end=vec3(uEnd.xy+(uv-.5)*uEnd.zw,0.);
        vec3 origin=mix(peel,stream,a);
        // A continuous horizontal drift, with an invisible reset at each cycle.
        // Keep the original plume geometry; only the individual grains move.
        float wind=fract(aSeed.z+uTime*.055);
        float drifting=(1.-a)*release*(1.-b);
        origin.x-=wind*uMoon.w*.18*drifting;
        // An arcing approach keeps depth until the last part of each arrival.
        // The envelope is zero at both ends, including on a reverse scroll.
        float arc=sin(b*3.14159265)*(1.-b);
        vec3 drift=vec3(sin(angle+uv.y*4.),cos(angle*.7+uv.y*5.),sin(uv.x*5.+uv.y*3.));
        vec3 p=mix(origin,end,b)+drift*arc*vec3(uSize.x*.045,uSize.y*.065,160.);
        vec4 mv=modelViewMatrix*vec4(p,1.);gl_Position=projectionMatrix*mv;
        vSoft=step(.996,aSeed.y)*(1.-b);
        float spacing=max(uEnd.z/float(${v}),uEnd.w/float(${p}));
        float diameter=mix(1.05,spacing*1.15,smoothstep(.18,.82,b))+vSoft*4.;
        gl_PointSize=clamp(diameter*uDpr*(uSize.y*1.452/-mv.z),.7,12.);
        vAlpha=mix(smoothstep(0.,.42,release)*.86,.035,free)*(1.-photoCoverage(b));
        vAlpha*=mix(1.,.32,vSoft);
        vAlpha*=mix(1.,smoothstep(0.,.08,wind)*(1.-smoothstep(.85,1.,wind)),drifting);vMix=smoothstep(.08,.82,b);
        // A fully transparent point has no depth writes or visible blending.
        // Clip it before rasterization, preserving every nonzero-opacity point.
        if(vAlpha==0.)gl_Position=vec4(2.,2.,2.,1.);
      }`,fragmentShader:`uniform sampler2D uPhoto;varying vec2 vUv;varying float vAlpha,vMix,vSoft;varying vec3 vSurfaceColor;
      void main(){if(vAlpha==0.)discard;float d=length(gl_PointCoord-.5)*2.;if(d>1.)discard;
        vec3 color=mix(vSurfaceColor,texture2D(uPhoto,vUv).rgb,vMix);
        gl_FragColor=vec4(color,mix(1.-smoothstep(.35,1.,d),exp(-d*d*5.),vSoft)*vAlpha);
        #include <colorspace_fragment>
      }`}),j=new Ce(U,ee);j.frustumCulled=!1,j.renderOrder=2,l.add(j);const q=new Te(1,1,{type:Ae,depthBuffer:!1,stencilBuffer:!1}),te=new Fe,me=new _e(-1,1,1,-1,0,1),oe=new Le(2,2),ae=new N({uniforms:{uMist:{value:q.texture}},transparent:!0,depthTest:!1,depthWrite:!1,vertexShader:"varying vec2 vUv;void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}",fragmentShader:`uniform sampler2D uMist;varying vec2 vUv;void main(){
      vec4 mist=texture2D(uMist,vUv);if(mist.a<.001)discard;
      // Render targets accumulate premultiplied pigment; recover straight color
      // before the screen's normal alpha blend to avoid dark cloud fringes.
      gl_FragColor=vec4(mist.rgb/mist.a,mist.a);
      #include <colorspace_fragment>
    }`});te.add(new K(oe,ae));let re=0,ie=0;const fe=new Q;function de(e,i,t){if(!e.extensions.has("EXT_color_buffer_float")){const k=t.layers.mask;t.layers.enable(1),t.layers.enable(2),e.render(i,t),t.layers.mask=k;return}const s=e.getSize(fe),S=Math.max(1,Math.ceil(s.x*.65)),M=Math.max(1,Math.ceil(s.y*.65));(S!==re||M!==ie)&&(q.setSize(S,M),re=S,ie=M);const Y=t.layers.mask,I=e.autoClear;e.autoClear=!1,e.setRenderTarget(null),e.clear();const d=k=>{t.layers.set(k),e.setRenderTarget(q),e.clear(),e.render(i,t),e.setRenderTarget(null),e.render(te,me)};b[0].visible&&d(1),t.layers.set(0),e.render(i,t),b[1].visible&&d(2),t.layers.mask=Y,e.autoClear=I}return{group:l,count:c,render:de,setPhase(e,i){le(x,e),f.uWeights.value.set(i)},setPhoto(e){f.uPhoto.value=e},setPalette(e){a.set(e.paper),n.set(e.cloud),r.set(e.moonLight),h.set(e.moonShade),_.set(e.particle),u.uDark.value=a.r<.1?1:0},update(e,i,t,s,S,M,Y){const I=t<701,d=m?Math.min(t*.29,s*.31):Math.min(t*(I?.37:.255),s*.34),k=m?0:t*(I?0:.19),E=m?s*.035:s*(I?.145:.055);g.position.set(k,E,-90),g.scale.setScalar(d),Ee(g,88+e),f.uMoonRotation.value.setFromMatrix4(pe.makeRotationFromEuler(g.rotation));const ne=m?0:H.lerp(.45,.7,Math.pow(Math.min(1,i/.7),2));g.visible=i<.72,u.uProgress.value=ne,f.uMoonProgress.value=ne;const he=[[-t*.2,E-d*.32,-d-180,t*.9,s*.19,220],[t*.2,E-d*.98,d*.65,t*.93,s*.16,240],[-t*.28,E-d*1.42,d+100,t*.93,s*.13,180]],D=m?0:H.smoothstep(i,.08,.48);b.forEach((C,O)=>{const T=he[O],R=H.lerp;C.position.set(R(T[0],-t*.04,D),R(T[1],s*.015,D),T[2]),C.scale.set(R(T[3],t*1.65,D),R(T[4],s*.64,D),T[5]);const w=C.material.uniforms;w.uTime.value=e,w.uGather.value=D,w.uCenter.value.copy(C.position),w.uExtent.value.copy(C.scale),w.uViewport.value.set(t,s),w.uOpacity.value=(m?.36:R(O===0?.85:O===1?.38:.55,O===0?.7:O===1?.18:.1,D))*(1-H.smoothstep(i,.53,.83)),w.uCamera.value.copy(M.position),C.visible=i<.84&&w.uOpacity.value!==0}),f.uTime.value=e,f.uProgress.value=i,f.uMoon.value.set(k,E,-90,d),f.uEnd.value.copy(S),f.uSize.value.set(t,s),f.uDpr.value=Y,j.visible=i<.999},dispose(){q.dispose(),oe.dispose(),ae.dispose(),L.dispose(),x.dispose(),G.dispose(),b.forEach(e=>e.material.dispose()),o.dispose(),U.dispose(),ee.dispose()}}}export{We as a,Oe as c,Ge as l,ce as p};
