import{b as t,C as o,V as r}from"./three.module.DBLrAFqm.js";const i=`
 float lunarFront(vec3 localPoint,float albedo){return .5+(localPoint.x*.927+localPoint.y*.375)*.35+(albedo-.6)*.22;}
 float lunarErosion(float progress){return smoothstep(.27,.70,progress)*1.45-.2;}
 float lunarRelease(vec3 localPoint,float albedo,float progress){
  float front=lunarFront(localPoint,albedo);
  return smoothstep(front-.16,front+.16,lunarErosion(progress));
 }
`,u=e=>e?["/scene/directory-moon/albedo.jpg","/scene/directory-moon/normal.png"]:["/scene/directory-moon/albedo-display.webp","/scene/directory-moon/normal-4k.webp"];function s(e,a){return new t({transparent:!0,uniforms:{uAlbedo:{value:e},uNormalMap:{value:a},uLight:{value:new r(.38,.12,1).normalize()},uPaper:{value:new o},uLightInk:{value:new o},uDarkInk:{value:new o},uDark:{value:0},uProgress:{value:0},uToneDepth:{value:1}},vertexShader:`varying vec2 vUv;varying vec3 vNormal,vView,vSurfacePoint;
      void main(){vUv=uv;vSurfacePoint=normalize(mat3(modelMatrix)*position);vNormal=normalize(normalMatrix*normal);
        vec4 mv=modelViewMatrix*vec4(position,1.);vView=mv.xyz;gl_Position=projectionMatrix*mv;}`,fragmentShader:`uniform sampler2D uAlbedo,uNormalMap;
      uniform vec3 uPaper,uLightInk,uDarkInk,uLight;uniform float uDark,uProgress,uToneDepth;
      varying vec2 vUv;varying vec3 vNormal,vView,vSurfacePoint;
      ${i}
      void main(){
        vec3 N=normalize(vNormal);
        vec3 q1=dFdx(vView),q2=dFdy(vView);vec2 s1=dFdx(vUv),s2=dFdy(vUv);
        vec3 T=normalize(q1*s2.y-q2*s1.y),B=normalize(-q1*s2.x+q2*s1.x);
        vec3 terrain=texture2D(uNormalMap,vUv).xyz*2.-1.;terrain.xy*=1.2;
        vec3 detail=normalize(mat3(T,B,N)*normalize(terrain));
        float elevationLight=dot(detail,normalize(uLight)),sun=dot(N,normalize(uLight));
        // Terrain only perturbs a narrow band along the terminator. The moon
        // keeps one continuous silhouette, while crater rims catch grazing light.
        float rimDetail=clamp(elevationLight-sun,-.22,.22)*.14*exp(-abs(sun)*14.);
        float illuminated=smoothstep(-.035,.075,sun+rimDetail);
        float albedo=pow(dot(texture2D(uAlbedo,vUv).rgb,vec3(.2126,.7152,.0722)),1./2.2);
        float grazing=pow(1.-max(sun,0.),1.7);
        float terrainShade=clamp((sun-elevationLight)*1.35,-.22,.22);
        float pigment=clamp(.18+pow(1.-albedo,1.3)*.76+grazing*.12+terrainShade,.10,.88);
        vec3 litPaper=mix(uPaper,uDarkInk,pigment);
        float luminance=clamp((.32+albedo*.76)*(.44+.56*pow(max(elevationLight,0.),.38)),.07,1.);
        luminance=pow(luminance,mix(1.,1.35,uToneDepth));
        vec3 litNight=mix(uDarkInk,uLightInk,luminance);
        float earthshine=.008+(1.-albedo)*.022+pow(1.-N.z,3.)*.008;
        vec3 shadowPaper=mix(uPaper,uDarkInk,earthshine);
        vec3 shadowNight=mix(uPaper,uLightInk,.006+albedo*.012);
        vec3 color=mix(mix(shadowPaper,litPaper,illuminated),mix(shadowNight,litNight,illuminated),uDark);
        float opacity=1.-lunarRelease(normalize(vSurfacePoint),albedo,uProgress);
        if(opacity<.001)discard;
        gl_FragColor=vec4(color,opacity);
        #include <colorspace_fragment>
      }`})}function m(e,a){e.uniforms.uLight.value.set(Math.sin(a)*Math.cos(.32),Math.sin(a)*Math.sin(.32),Math.cos(a)).normalize()}function v(e,a){e.rotation.set(0,-Math.PI/2+a*.0072,.11)}export{i as a,s as d,u as m,v as r,m as s};
