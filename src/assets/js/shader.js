/* Fundo do topo: líquido escuro e brilhante com borda verde-limão (WebGL puro, sem bibliotecas).
   Começa depois do carregamento para não atrasar o conteúdo, roda em resolução reduzida,
   pausa fora da tela e respeita "reduzir movimento". Sem WebGL, fica o gradiente do CSS. */
(function () {
  "use strict";
  var canvas = document.querySelector("[data-shader]");
  if (!canvas) return;

  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var coarse = window.matchMedia && matchMedia("(pointer: coarse)").matches;

  var VS = "attribute vec2 a;void main(){gl_Position=vec4(a,0.0,1.0);}";
  var FS = [
    "precision mediump float;",
    "uniform vec2 uRes;uniform float uTime;uniform vec2 uMouse;",
    "float hash(vec2 p){p=fract(p*vec2(234.34,435.345));p+=dot(p,p+34.23);return fract(p.x*p.y);}",
    "float noise(vec2 p){vec2 i=floor(p);vec2 f=fract(p);vec2 u=f*f*(3.0-2.0*f);",
    " return mix(mix(hash(i),hash(i+vec2(1.0,0.0)),u.x),mix(hash(i+vec2(0.0,1.0)),hash(i+vec2(1.0,1.0)),u.x),u.y);}",
    "float fbm(vec2 p){float v=0.0;float a=0.5;for(int i=0;i<4;i++){v+=a*noise(p);p=p*2.03+vec2(1.7,9.2);a*=0.5;}return v;}",
    "float field(vec2 p,float t){",
    " vec2 q=vec2(fbm(p+vec2(0.0,t*0.6)),fbm(p+vec2(4.1,-t*0.5)));",
    " vec2 w=p+1.3*q+0.18*uMouse;",
    " float b=sin(w.x*2.2-w.y*2.7+t*1.2+fbm(w*0.9)*3.4);",
    " return smoothstep(0.0,0.42,b)+0.22*b;",
    "}",
    "void main(){",
    " vec2 uv=gl_FragCoord.xy/uRes;",
    " vec2 p=(gl_FragCoord.xy-0.5*uRes)/min(uRes.x,uRes.y)*1.45;",
    " float t=uTime*0.11;",
    " float e=0.005;",
    " float h=field(p,t);",
    " float hx=field(p+vec2(e,0.0),t);",
    " float hy=field(p+vec2(0.0,e),t);",
    " vec3 n=normalize(vec3((h-hx)/e,(h-hy)/e,2.0));",
    " vec3 V=vec3(0.0,0.0,1.0);",
    " vec3 L1=normalize(vec3(-0.5,0.75,0.55));",
    " float s1=pow(max(dot(n,normalize(L1+V)),0.0),36.0);",
    " float rim=pow(1.0-clamp(n.z,0.0,1.0),3.2);",
    " float envLime=smoothstep(0.6,1.0,dot(n.xy,normalize(vec2(0.75,-0.55))));",
    " float envSoft=smoothstep(-0.2,0.9,dot(n.xy,normalize(vec2(-0.55,0.8))));",
    " float body=clamp(h,0.0,1.0);",
    " vec3 lime=vec3(0.773,0.941,0.290);",
    " vec3 col=vec3(0.016,0.02,0.015);",
    " col+=vec3(0.07,0.08,0.065)*envSoft*body;",
    " col+=lime*envLime*0.5;",
    " col+=lime*rim*1.5;",
    " col+=vec3(0.85,0.92,0.8)*s1*0.55*body;",
    " float vig=smoothstep(1.35,0.15,length((uv-vec2(0.7,0.55))*vec2(1.0,1.2)));",
    " col*=mix(0.42,1.0,vig);",
    " col+=(hash(gl_FragCoord.xy+fract(uTime))-0.5)*0.02;",
    " gl_FragColor=vec4(col,1.0);",
    "}",
  ].join("\n");

  function start() {
    var gl = canvas.getContext("webgl", { antialias: false, alpha: false, depth: false, stencil: false, powerPreference: "low-power" });
    if (!gl) return;

    function sh(type, src) {
      var s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
    }
    var v = sh(gl.VERTEX_SHADER, VS);
    var f = sh(gl.FRAGMENT_SHADER, FS);
    if (!v || !f) return;
    var prog = gl.createProgram();
    gl.attachShader(prog, v);
    gl.attachShader(prog, f);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    var buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    var loc = gl.getAttribLocation(prog, "a");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    var uRes = gl.getUniformLocation(prog, "uRes");
    var uTime = gl.getUniformLocation(prog, "uTime");
    var uMouse = gl.getUniformLocation(prog, "uMouse");

    var scale = coarse ? 0.45 : 0.6;
    function resize() {
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var w = Math.max(1, Math.round(canvas.clientWidth * dpr * scale));
      var h = Math.max(1, Math.round(canvas.clientHeight * dpr * scale));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    }

    var mouse = [0, 0];
    var target = [0, 0];
    if (!coarse && !reduce) {
      window.addEventListener("pointermove", function (e) {
        target[0] = (e.clientX / window.innerWidth) * 2 - 1;
        target[1] = -((e.clientY / window.innerHeight) * 2 - 1);
      }, { passive: true });
    }

    var t0 = performance.now();
    var offset = 40.0;
    function draw(now) {
      resize();
      mouse[0] += (target[0] - mouse[0]) * 0.04;
      mouse[1] += (target[1] - mouse[1]) * 0.04;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, offset + (now - t0) / 1000);
      gl.uniform2f(uMouse, mouse[0], mouse[1]);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }

    draw(t0);
    canvas.classList.add("on");
    if (reduce) {
      window.addEventListener("resize", function () { draw(performance.now()); });
      return;
    }

    var visible = true;
    var raf = 0;
    var last = 0;
    var frameMs = 1000 / (coarse ? 30 : 45);
    function loop(now) {
      raf = 0;
      if (!visible || document.hidden) return;
      if (now - last >= frameMs) {
        last = now;
        draw(now);
      }
      raf = requestAnimationFrame(loop);
    }
    function kick() { if (!raf && visible && !document.hidden) raf = requestAnimationFrame(loop); }
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (en) { visible = en[0].isIntersecting; kick(); }).observe(canvas);
    }
    document.addEventListener("visibilitychange", kick);
    kick();
  }

  function later() {
    if ("requestIdleCallback" in window) requestIdleCallback(start, { timeout: 1200 });
    else setTimeout(start, 200);
  }
  if (document.readyState === "complete") later();
  else window.addEventListener("load", later);
})();
