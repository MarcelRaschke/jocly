exports.view=View={Game:{},Board:{},Move:{}},function(){function e(e,a,t,i,r){var o=e.getVCoord(i),n=Math.floor(i/s),l=i%s,d=e.getVCoord(r),c=Math.floor(r/s),m=r%s,u={"-1,-1":-135,"-1,0":180,"-1,1":135,"0,-1":-90,"0,1":90,"1,-1":-45,"1,0":0,"1,1":45},p={"-1,-1":135,"-1,0":180,"-1,1":-135,"0,-1":90,"0,1":-90,"1,-1":45,"1,0":0,"1,1":-45},g={"-1,-1":0,"-1,0":1,"-1,1":2,"0,-1":3,"0,1":4,"1,-1":5,"1,0":6,"1,1":7},h=e.mViewAs==JocGame.PLAYER_B?180:0,v=t?"arrowscrum":"arrow#"+g[c-n+","+(m-l)];a.updateGadget(v,{base:{visible:!0,x:(d[0]+o[0])/2,y:(d[1]+o[1])/2,rotate:u[c-n+","+(m-l)]+h},"3d":{scale:[.1,.1,.1],rotate:p[c-n+","+(m-l)]+h}})}function a(e,a,t,s,i){function r(){0==--o&&i()}for(var o=1,n=0;n<t.pieces.length;n++){var l=t.pieces[n],d=s.pieces[n];l.sc!=d.sc&&(o++,e.updateGadget("player#"+n,{base:{rotate:l.s==a.mViewAs?0:180},"3d":{morphing:l.sc?[0,0,1,0,0,0,0,0,0,0,0]:[1,0,0,0,0,0,0,0,0,0,0,0],rotate:1==a.mViewAs?l.a:180+l.a}},500,r))}r()}function t(e,a,t,i,r,o,n){function l(){0==--m&&n()}function d(){if(S==w.length)return e.updateGadget("player#"+i,{base:{x:u[0],y:u[1]},"3d":{rotate:(a.mViewAs==JocGame.PLAYER_A?0:180)+c.a}},500),void l();var t=w[S++];e.updateGadget("player#"+i,{base:{x:T[0]+(u[0]-T[0])*(S/w.length),y:T[1]+(u[1]-T[1])*(S/w.length)},"3d":{morphing:t,rotate:(a.mViewAs==JocGame.PLAYER_A?180:0)+E}},50,d)}var c=t.pieces[i],m=1,u=a.getVCoord(r),p=c.p,g=Math.floor(p/s),h=p%s,v=Math.floor(r/s),f=r%s,E={"-1,-1":135,"-1,0":180,"-1,1":-135,"0,-1":90,"0,1":-90,"1,-1":45,"1,0":0,"1,1":-45}[v-g+","+(f-h)],b={"-1,-1":-135,"-1,0":180,"-1,1":135,"0,-1":-90,"0,1":90,"1,-1":-45,"1,0":0,"1,1":45}[v-g+","+(f-h)];e.updateGadget("player#"+i,{"2d":{rotate:(a.mViewAs==JocGame.PLAYER_A?0:180)+b}});var w=[[0,0,0,1,0,0,0,0,0,0,0,0],[0,0,0,0,1,0,0,0,0,0,0,0],[0,0,0,0,0,1,0,0,0,0,0,0],[0,0,0,0,0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,1,0,0,0,0],[0,0,0,0,0,0,0,0,1,0,0,0],[0,0,0,0,0,0,0,0,0,1,0,0],[0,0,0,0,0,0,0,0,0,0,1,0],[1,0,0,0,0,0,0,0,0,0,0,0]],S=0,T=a.getVCoord(c.p);if(d(),o>=0){m++;var y=a.getVCoord(o);e.updateGadget("ball",{base:{x:y[0],y:y[1]}},500,function(){l()})}}var s,i,r,o=!0;View.Game.xdInit=function(e){function a(e){var a=this;return this.getResource("smoothedfilegeo|0|"+r+"/res/xd-view/meshes/stade-screen.js",function(t,s){for(var i=[],r=0;r<s.length;r++)if("mat.screen"==s[r].name){var o=s[r].clone();o.map=e,o.overdraw=!0,i.push(o)}else{var o=s[r].clone();o.shading=THREE.FlatShading,i.push(o)}var n=new THREE.Mesh(t,new THREE.MultiMaterial(i));n.visible=!1,a.objectReady(n)}),null}function t(a){e.createGadget("player#"+u++,{"2d":{type:"sprite",z:4,file:r+"/res/images/regular.png",clipwidth:125,clipheight:125,clipx:a==JocGame.PLAYER_A?125:0,clipy:0},"3d":{type:"meshfile",file:r+"/res/xd-view/meshes/player-anim.js",scale:[p,p,p],z:30,materials:{"mat.short":{map:a==JocGame.PLAYER_A?r+"/res/xd-view/meshes/teama-text.jpg":r+"/res/xd-view/meshes/teamb-text.jpg"}},morphing:[1,0,0,0,0,0,0,0,0,0,0,0]}})}var r=this.mViewOptions.fullPath;s=this.mOptions.width,i=this.mOptions.height,e.createGadget("board",{"2d":{type:"canvas"}});for(var n=0;n<0;n++){var l=Math.PI/4+2*Math.PI/0*n;e.createGadget("slight#"+n,{"3d":{type:"custom3d",create:function(){var e=new THREE.SpotLight(16777215,.7);return e.castShadow=!0,e.shadowDarkness=.25,e.shadowCameraNear=3,e.shadowCameraFar=20,e.shadowCameraFov=90,e.shadowMapWidth=1024,e.shadowMapHeight=1024,e.shadowCascade=!0,e.shadowCascadeCount=3,e.shadowCascadeNearZ=[-1,.995,.998],e.shadowCascadeFarZ=[.995,.998,1],e.shadowCascadeWidth=[1024,1024,1024],e.shadowCascadeHeight=[1024,1024,1024],e},y:5e3*Math.sin(l),x:5e3*Math.cos(l),z:6e3}})}e.createGadget("boardgrass",{"2d":{type:"sprite",file:r+"/res/xd-view/meshes/scrumfield8x12.jpg",clipwidth:700,clipheight:1200,clipx:50,clipy:48,z:-1}});for(var d=0;d<2;d++)e.createGadget("field-ad#"+d,{"2d":{clipwidth:300,clipheight:100,clipx:0,clipy:0,z:5,opacity:.5},regular:{type:"sprite",file:r+"/res/xd-view/meshes/field-ad.jocly.jpg"},regularsg:{type:"sprite",file:r+"/res/xd-view/meshes/field-ad.sg.jpg"},regularhnk:{type:"sprite",file:r+"/res/xd-view/meshes/field-ad.hnk.jpg"},regularlr:{type:"sprite",file:r+"/res/xd-view/meshes/field-ad.lr.jpg"},regularea:{type:"sprite",file:r+"/res/xd-view/meshes/field-ad.ea.jpg"},regularcc:{type:"sprite",file:r+"/res/xd-view/meshes/field-ad.cc.jpg"},regulartb:{type:"sprite",file:r+"/res/xd-view/meshes/field-ad.tb.jpg"},regularmc:{type:"sprite",file:r+"/res/xd-view/meshes/field-ad.mc.jpg"},regulardhl:{type:"sprite",file:r+"/res/xd-view/meshes/field-ad.dhl.jpg"}});e.createGadget("screenlighta",{"3d":{type:"custom3d",create:function(){var e=new THREE.SpotLight(16777215,1.2,0,1.05,1,2);return e.castShadow=!1,e},y:-7e3,z:300,rotateX:90}}),e.createGadget("screenlightb",{"3d":{type:"custom3d",create:function(){var e=new THREE.SpotLight(16777215,1.2,0,1.05,1,2);return e.castShadow=!1,e},y:7e3,z:300,rotateX:90}}),e.createGadget("stadium",{"3d":{type:"meshfile",file:r+"/res/xd-view/meshes/stade4.js",scale:[1.3,1.3,1.3],flatShading:!0,z:-210,smooth:0}}),e.createGadget("stadiumxtra",{"3d":{type:"meshfile",file:r+"/res/xd-view/meshes/stade2-xtra.js",scale:[1.3,1.3,1.3],flatShading:!0,z:-210,click:function(){o=!0}},scrum3djocly:{materials:{"mat.pub.large.panels":{map:r+"/res/xd-view/meshes/pubs.jocly.jpg"},"poteaux.pub":{map:r+"/res/xd-view/meshes/pubs.jocly.jpg"}}},scrum3dsg:{materials:{"mat.pub.large.panels":{map:r+"/res/xd-view/meshes/pubs.sg.jpg"},"poteaux.pub":{map:r+"/res/xd-view/meshes/pubs.sg.jpg"}}},scrum3dhnk:{materials:{"mat.pub.large.panels":{map:r+"/res/xd-view/meshes/pubs.hnk.jpg"},"poteaux.pub":{map:r+"/res/xd-view/meshes/pubs.hnk.jpg"}}},scrum3dlr:{materials:{"mat.pub.large.panels":{map:r+"/res/xd-view/meshes/pubs.lr.jpg"},"poteaux.pub":{map:r+"/res/xd-view/meshes/pubs.lr.jpg"}}},scrum3dea:{materials:{"mat.pub.large.panels":{map:r+"/res/xd-view/meshes/pubs.ea.jpg"},"poteaux.pub":{map:r+"/res/xd-view/meshes/pubs.ea.jpg"}}},scrum3dcc:{materials:{"mat.pub.large.panels":{map:r+"/res/xd-view/meshes/pubs.cc.jpg"},"poteaux.pub":{map:r+"/res/xd-view/meshes/pubs.cc.jpg"}}},scrum3dmc:{materials:{"mat.pub.large.panels":{map:r+"/res/xd-view/meshes/pubs.mc.jpg"},"poteaux.pub":{map:r+"/res/xd-view/meshes/pubs.mc.jpg"}}},scrum3dtb:{materials:{"mat.pub.large.panels":{map:r+"/res/xd-view/meshes/pubs.tb.jpg"},"poteaux.pub":{map:r+"/res/xd-view/meshes/pubs.tb.jpg"}}},scrum3ddhl:{materials:{"mat.pub.large.panels":{map:r+"/res/xd-view/meshes/pubs.dhl.jpg"},"poteaux.pub":{map:r+"/res/xd-view/meshes/pubs.dhl.jpg"}}}});e.createGadget("videoa",{"3d":{type:"video3d",makeMesh:function(e){return a.call(this,e)},z:3e3,y:1e4,scale:[2.6,2.6,2.6]},scrum3dsg:{type:"videofile3d",src:r+"/videos/sg.webm"},scrum3dhnk:{type:"videofile3d",src:r+"/videos/hnk.webm"},scrum3dea:{type:"videofile3d",src:r+"/videos/ea.webm"},scrum3dcc:{type:"videofile3d",src:r+"/videos/cc.webm"},scrum3dlr:{type:"videofile3d",src:r+"/videos/lr.webm"},scrum3dtb:{type:"videofile3d",src:r+"/videos/tb.webm"},scrum3dmc:{type:"videofile3d",src:r+"/videos/mc2.webm"},scrum3ddhl:{type:"videofile3d",src:r+"/videos/dhl.webm"}}),e.createGadget("videob",{"3d":{type:"video3d",makeMesh:function(e){return a.call(this,e)},z:3e3,y:-1e4,scale:[2.6,2.6,2.6]},scrum3dsg:{type:"videofile3d",src:r+"/videos/sg.webm"},scrum3dhnk:{type:"videofile3d",src:r+"/videos/hnk.webm"},scrum3dea:{type:"videofile3d",src:r+"/videos/ea.webm"},scrum3dcc:{type:"videofile3d",src:r+"/videos/cc.webm"},scrum3dlr:{type:"videofile3d",src:r+"/videos/lr.webm"},scrum3dtb:{type:"videofile3d",src:r+"/videos/tb.webm"},scrum3dmc:{type:"videofile3d",src:r+"/videos/mc2.webm"},scrum3ddhl:{type:"videofile3d",src:r+"/videos/dhl.webm"}}),e.createGadget("surround",{"3d":{harbor:!1,type:"custom3d",width:1e5,height:1e5,depth:1e5,scale:[1,1,1],rotate:90,create:function(){var e=r+"/res/xd-view/textures/skybox/",a=[e+"px.jpg",e+"nx.jpg",e+"py.jpg",e+"ny.jpg",e+"pz.jpg",e+"nz.jpg"],t=(new THREE.CubeTextureLoader).load(a),s=new THREE.MeshBasicMaterial({color:16777215,envMap:t,refractionRatio:.95}),i={uniforms:{tCube:{type:"t",value:null},tFlip:{type:"f",value:-1}},vertexShader:["varying vec3 vViewPosition;","void main() {","vec4 mPosition = modelMatrix * vec4( position, 1.0 );","vViewPosition = cameraPosition - mPosition.xyz;","gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );","}"].join("\n"),fragmentShader:["uniform samplerCube tCube;","uniform float tFlip;","varying vec3 vViewPosition;","void main() {","vec3 wPos = cameraPosition - vViewPosition;","gl_FragColor = textureCube( tCube, vec3( tFlip * wPos.x, wPos.yz ) );","}"].join("\n")};i.uniforms.tCube.value=t;var s=new THREE.ShaderMaterial({fragmentShader:i.fragmentShader,vertexShader:i.vertexShader,uniforms:i.uniforms,depthWrite:!1,side:THREE.BackSide});return new THREE.Mesh(new THREE.CubeGeometry(3e3,3e3,3e3),s)}}}),e.createGadget("ocean",{"3d":{harbor:!1,type:"meshfile",file:r+"/res/xd-view/meshes/ocean.js",scale:[200,200,3],z:-50,smooth:0}}),e.createGadget("ground",{"3d":{type:"custommesh3d",z:-40,create:function(){var e=new THREE.CubeGeometry(8,.08,13),a=this;return(new THREE.TextureLoader).load(r+"/res/xd-view/meshes/scrumfield8x12.jpg",function(t){t.wrapS=t.wrapT=THREE.RepeatWrapping,t.format=THREE.RGBFormat;var s=new THREE.MeshPhongMaterial({color:8947848,map:t,shininess:0}),i=new THREE.Mesh(e,s);a.objectReady(i)}),null},receiveShadow:!0,scale:[1.04,1.04,1.04]}});for(var c=0;c<i*s;c++){this.getVCoord(c);!function(a){e.createGadget("cell#"+a,{"2d":{type:"element",initialClasses:(Math.floor(a/s)+a%s)%2?"cell-white cell-white-rugby":"cell-black cell-black-rugby",z:1},"3d":{type:"meshfile",file:r+"/res/xd-view/meshes/target.js",flatShading:!0,smooth:0,z:-50,castShadow:!1,scale:[.5,.5,.5],materials:{square:{transparent:!0,opacity:0},ring:{color:16777215,opacity:0,transparent:!0}},holdClick:function(a){o=!1;var t=a.point;e.updateGadget("camera",{"3d":{targetX:0,targetY:t.z/$this.SCALE3D,traveling:!0}},1e3)}}}),e.createGadget("text#"+a,{"2d":{type:"element",initialClasses:"xd-notation",display:function(e,t,s){e.css({"font-size":.6*s+"pt","line-height":1*s+"px"}).text(a)}},"3d":{type:"custommesh3d",rotateX:-90,create:function(){var e=this;return this.getResource("font|"+r+"/res/xd-view/fonts/helvetiker_regular.typeface.json",function(t){var s=new THREE.TextGeometry(""+(a+1),{size:.2,height:.05,curveSegments:6,font:t}),i=new THREE.MeshPhongMaterial,r=new THREE.Mesh(s,i);e.objectReady(r)}),null},color:8947848}})}(c)}for(var m=this.mOptions.initial,u=0,p=.16,g=0;g<m.a.length;g++)t(JocGame.PLAYER_A);for(var g=0;g<m.b.length;g++)t(JocGame.PLAYER_B);e.createGadget("ball",{"2d":{type:"sprite",z:4,file:this.mViewOptions.fullPath+"/res/images/regular.png",clipwidth:125,clipheight:125,clipx:250,clipy:0},"3d":{type:"meshfile",file:r+"/res/xd-view/meshes/scrum-ball.js",scale:[.2,.2,.2],smooth:0,z:500,rotate:45,rotateX:45,materials:{Material:{shininess:10,specular:{r:.1,g:.1,b:.1}}}}}),e.createGadget("arrowscrum",{"2d":{type:"sprite",z:4,width:400,height:400,file:this.mViewOptions.fullPath+"/res/images/regular.png",clipwidth:125,clipheight:125,clipx:500,clipy:0},"3d":{type:"meshfile",file:r+"/res/xd-view/meshes/arrowscrum.js",flatShading:!0,z:250}});for(var g=0;g<8;g++)e.createGadget("arrow#"+g,{"2d":{type:"sprite",z:4,width:400,height:400,file:this.mViewOptions.fullPath+"/res/images/regular.png",clipwidth:125,clipheight:125,clipx:375,clipy:0},"3d":{type:"meshfile",file:r+"/res/xd-view/meshes/arrow.js",flatShading:!0,z:250}})},View.Game.getVCoord=function(e){this.mViewAs==JocGame.PLAYER_B&&(e=s*i-1-e);var a=i-1-Math.floor(e/s);return[r*(e%s+.5)-2625,r*(a+.5)-6300]},View.Game.xdBuildScene=function(e){var a=this;r=Math.min(5250/s,12600/i);for(var t=0;t<0;t++)e.updateGadget("slight#"+t,{"3d":{visible:!0}});e.updateGadget("stadium",{"3d":{visible:!1}}),e.updateGadget("stadiumxtra",{"3d":{visible:!0}}),e.updateGadget("screenlighta",{"3d":{visible:!0}}),e.updateGadget("screenlightb",{"3d":{visible:!0}}),e.updateGadget("pubvideoa",{"3d":{visible:!0}}),e.updateGadget("pubvideob",{"3d":{visible:!0}}),e.updateGadget("surround",{"3d":{visible:!0}}),e.updateGadget("ocean",{"3d":{visible:!0}}),e.updateGadget("ground",{"3d":{visible:!0}}),e.updateGadget("boardgrass",{"2d":{visible:!0,width:5250+2*r,height:12600}}),e.updateGadget("board",{"2d":{visible:!0,draw:function(e,t){a.scrumDrawBoard2(e,t,5250+2*r,12600,2)},width:5250+2*r,height:12600}});for(var o=0;o<2;o++)e.updateGadget("field-ad#"+o,{"2d":{width:3*r,height:r,rotate:90+180*o,x:3*r*(0==o?1:-1),visible:!0}});for(var n=0;n<i*s;n++){var l=this.getVCoord(n);e.updateGadget("cell#"+n,{base:{visible:!0,x:l[0],y:l[1]},"2d":{width:r,height:r}}),e.updateGadget("text#"+n,{base:{visible:a.mNotation},"2d":{width:r/4,height:r/4,x:l[0]-.32*r,y:l[1]-.37*r},"3d":{x:l[0]-.37*r,y:l[1]+.37*r}})}e.updateGadget("videoa",{"3d":{visible:!0,rotate:180,playerSide:1}}),e.updateGadget("videob",{"3d":{visible:!0,rotate:0,playerSide:-1}})},View.Board.xdDisplay=function(a,t){for(var s=0;s<this.pieces.length;s++){var i=this.pieces[s],r=t.getVCoord(i.p);a.updateGadget("player#"+s,{base:{visible:!0,x:r[0],y:r[1],rotate:i.s==t.mViewAs?0:180},"3d":{rotate:1==t.mViewAs?i.a:180+i.a,morphing:i.sc?[0,0,1,0,0,0,0,0,0,0,0]:[1,0,0,0,0,0,0,0,0,0,0,0]}})}var o=t.getVCoord(this.ball);a.updateGadget("ball",{base:{visible:!0,x:o[0],y:o[1]},"3d":{z:500}}),this.scrum?e(t,a,!0,this.ball,this.scrumExit):a.updateGadget("arrowscrum",{base:{visible:!1}})},View.Board.xdBuildHTStateMachine=function(a,r,o){function n(e,t){function s(){switch(t){case"normal":r.smQueueEvent("E_CLICK",{pos:i,piece:n,index:l,ball:d});break;case"cancel":r.smQueueEvent("E_CANCEL",{pos:i,piece:n,index:l,ball:d})}}var i,n=null,l=-1,d=!1;if("object"==typeof e)n=e,i=n.p;else{var i=e;l=j.board[i],l>=0?n=j.pieces[l]:i==N&&(d=!0)}var c="";switch(t){case"normal":c=o.mShowMoves?"choice-view":"";break;case"cancel":c="choice-cancel"}var m=o.mShowMoves||"cancel"==t;a.updateGadget("cell#"+i,{base:{click:s},"2d":{classes:c},"3d":{castShadow:!1,receiveShadow:!0,materials:{square:{},ring:{color:"cancel"==t?16729088:2258688,opacity:m?1:0,transparent:!m}}}}),n?a.updateGadget("player#"+l,{base:{click:s}}):d&&a.updateGadget("ball",{base:{click:s}})}function l(e){for(var a in j.pieces){var t=j.pieces[a];t.s==j.mWho&&e(a,t.p)}}function d(t,s){e(o,a,!1,t,s)}function c(e){for(var t=0;t<s*i;t++)a.updateGadget("cell#"+t,{base:{click:null},"2d":{classes:""},"3d":{materials:{ring:{opacity:0,transparent:!0}}}});for(var r in j.pieces){j.pieces[r];a.updateGadget("player#"+r,{base:{click:null}})}a.updateGadget("ball",{base:{click:null}});for(var r=0;r<8;r++)a.updateGadget("arrow#"+r,{base:{visible:!1}})}function m(e){P?o.ScrumEachDirection(j.ball,function(e){var a=j.board[e];a>=0&&j.pieces[a].s==j.mWho&&n(e,"normal")}):l(function(e,a){n(a,"normal")})}function u(e){V.seg1f=e.pos,V.seg1i=e.index}function p(e){n(V.seg1f,"cancel"),P?(n(j.ball,"normal"),d(V.seg1f,j.ball)):o.ScrumEachDirection(V.seg1f,function(e){j.board[e]<0&&(n(e,"normal"),d(V.seg1f,e))})}function g(e){V.seg1i=-1,V.seg1f=-1}function h(e){e.ball?r.smQueueEvent("E_CLICK_BALL",e):r.smQueueEvent("E_CLICK_CELL",e)}function v(e){o.ScrumEachDirection(N,function(e){if(j.board[e]<0){var a=0;o.ScrumEachDirection(e,function(e){j.board[e]!=-1&&e!=V.seg1f||e==N||e==V.seg1t||a++}),a>0&&(n(e,"normal"),d(N,e))}}),n(N,"cancel")}function f(e){V.seg1t=e.pos}function E(e){t(a,o,j,V.seg1i,V.seg1t,V.seg1b,function(){r.smQueueEvent("E_ANIMATE_END",{})})}function b(e){V.seg1b=e.pos,N=e.pos}function w(e){V.seg2i=e.index,V.seg2f=e.pos}function S(e){l(function(e,a){e!=V.seg1i&&n(a,"normal")}),V.seg1b>=0?n(V.seg1b,"cancel"):n(V.seg1t,"cancel")}function T(e){V.seg1t=-1}function y(e){var t=o.getVCoord(V.seg1f);a.updateGadget("player#"+V.seg1i,{base:{x:t[0],y:t[1]}});var t=o.getVCoord(j.ball);a.updateGadget("ball",{base:{x:t[0],y:t[1]}}),N=j.ball,V.seg1i=-1,V.seg1f=-1,V.seg1t=-1,V.seg1b=-1}function x(e){n(V.seg2f,"cancel"),o.ScrumEachDirection(V.seg2f,function(e){(e==V.seg1f||j.board[e]<0&&e!=V.seg1t)&&(n(e,"normal"),d(V.seg2f,e))})}function C(e){V.seg2f=-1,V.seg2i=-1}function _(e){V.seg2t=e.pos}function L(e){t(a,o,j,V.seg2i,V.seg2t,V.seg2b,function(){r.smQueueEvent("E_ANIMATE_END",{})})}function G(e){o.ScrumEachDirection(N,function(e){if(e==V.seg1f||j.board[e]<0&&e!=V.seg1t&&e!=V.seg2f){var a=0;o.ScrumEachDirection(e,function(e){j.board[e]!=-1&&e!=V.seg1f&&e!=V.seg2f||e==N||e==V.seg1t||e==V.seg2t||a++}),a>0&&(n(e,"normal"),d(N,e))}}),n(N,"cancel")}function A(e){var a={seg:[{f:V.seg1f,t:V.seg1t}]};V.seg1b>=0&&(a.seg[0].b=V.seg1b),V.seg2f>=0&&(a.seg.push({f:V.seg2f,t:V.seg2t}),V.seg2b>=0&&(a.seg[1].b=V.seg2b));var t=j.ball;V.seg1b>=0&&(t=V.seg1b),V.seg2b>=0&&(t=V.seg2b);var s=0;o.ScrumEachDirection(t,function(e){(e==V.seg1f||e==V.seg2f||j.board[e]<0)&&e!=V.seg1t&&e!=V.seg2t&&s++}),1==s&&o.PlaySound("whistle"),o.HumanMove(a)}function D(e){V.seg2b=e.pos}function M(e){if(k||P)r.smQueueEvent("E_MOVE_END",{});else{var a=Math.floor(N/s);0==a&&j.mWho==JocGame.PLAYER_B||a==i-1&&j.mWho==JocGame.PLAYER_A?r.smQueueEvent("E_MOVE_END",{}):r.smQueueEvent("E_CONTINUE",{})}}var j=this,P=!1,k=this.first;this.scrum&&o.ScrumEachDirection(this.ball,function(e){var a=j.board[e];a>=0&&j.pieces[a].s==j.mWho&&(P=!0)});var V={seg1i:-1,seg1f:-1,seg1t:-1,seg1b:-1,seg2i:-1,seg2f:-1,seg2t:-1,seg2b:-1},N=this.ball;r.smTransition("S_INIT","E_INIT","S_SELECT1",[]),r.smEntering("S_SELECT1",[m]),r.smTransition("S_SELECT1","E_CLICK","S_SELECT1D",[u]),r.smLeaving("S_SELECT1",[c]),r.smEntering("S_SELECT1D",[p]),r.smTransition("S_SELECT1D","E_CLICK",null,[h]),r.smTransition("S_SELECT1D","E_CANCEL","S_SELECT1",[g]),r.smTransition("S_SELECT1D","E_CLICK_CELL","S_ANIMATE1",[f]),r.smTransition("S_SELECT1D","E_CLICK_BALL","S_SELECT1B",[f]),r.smLeaving("S_SELECT1D",[c]),r.smEntering("S_SELECT1B",[v]),r.smTransition("S_SELECT1B","E_CLICK","S_ANIMATE1",[b]),r.smTransition("S_SELECT1B","E_CANCEL","S_SELECT1D",[T]),r.smLeaving("S_SELECT1B",[c]),r.smEntering("S_ANIMATE1",[E]),r.smTransition("S_ANIMATE1","E_ANIMATE_END",null,[M]),r.smTransition("S_ANIMATE1","E_MOVE_END",null,[A]),r.smTransition("S_ANIMATE1","E_CONTINUE","S_SELECT2",[]),r.smEntering("S_SELECT2",[S]),r.smTransition("S_SELECT2","E_CLICK","S_SELECT2D",[w]),r.smTransition("S_SELECT2","E_CANCEL","S_SELECT1",[y]),r.smLeaving("S_SELECT2",[c]),r.smEntering("S_SELECT2D",[x]),r.smTransition("S_SELECT2D","E_CLICK",null,[h]),r.smTransition("S_SELECT2D","E_CANCEL","S_SELECT2",[C]),r.smTransition("S_SELECT2D","E_CLICK_CELL","S_ANIMATE2",[_]),r.smTransition("S_SELECT2D","E_CLICK_BALL","S_SELECT2B",[_]),r.smLeaving("S_SELECT2D",[c]),r.smEntering("S_SELECT2B",[G]),r.smTransition("S_SELECT2B","E_CLICK","S_ANIMATE2",[D]),r.smLeaving("S_SELECT2B",[c]),r.smEntering("S_ANIMATE2",[L]),r.smTransition("S_ANIMATE2","E_ANIMATE_END","S_DONE",[A]),r.smTransition(["S_SELECT1","S_SELECT1D","S_SELECT1B","S_ANIMATE1","S_SELECT2","S_SELECT2D","S_SELECT2B","S_ANIMATE2","S_DONE"],"E_END","S_DONE",[]),r.smEntering("S_DONE",[c])},View.Board.xdPlayedMove=function(e,s,i){function r(){a(e,s,o,s.mOldBoard,function(){s.MoveShown()})}var o=this;return t(e,s,s.mOldBoard,this.board[i.seg[0].t],i.seg[0].t,i.seg[0].b,function(){i.seg.length>1?t(e,s,s.mOldBoard,o.board[i.seg[1].t],i.seg[1].t,i.seg[1].b,function(){r(),o.scrum&&s.PlaySound("whistle")}):(r(),o.scrum&&s.PlaySound("whistle"))}),!1},View.Game.scrumDrawDashLine=function(e,a,t,s,i,r,o){var n=0;if(s!=a){n=(i-t)/(s-a);for(var l=t-n*a,d=0;d<r;d++){var c=a+(s-a)/r*(d+(100-o)/200),m=a+(s-a)/r*(d+o/100+(100-o)/200),u=n*c+l,p=n*m+l;e.moveTo(c,u),e.lineTo(m,p)}}else for(var d=0;d<r;d++){var u=t+(i-t)/r*(d+(100-o)/200),p=t+(i-t)/r*(d+o/100+(100-o)/200);e.moveTo(a,u),e.lineTo(a,p)}},View.Game.scrumDraw15metersMarks=function(e,a,t,s,i,r){var o=r+15*s/t;e.moveTo(o,a-i/2),e.lineTo(o,a+i/2),o=r+s*(t-15)/t,e.moveTo(o,a-i/2),e.lineTo(o,a+i/2)},View.Game.scrumDraw22texts=function(e,a,t,s,i){e.save(),e.fillStyle="rgba(255,255,255,0.3)",e.font=t/3+"pt Arial",e.translate(i,a),e.rotate(-Math.PI/2),e.textAlign="center",e.fillText("22",0,t/3+2),e.fillText("22",0,s-4),e.restore()},View.Game.scrumDrawGoals=function(e,a,t,s,i,r){var o=s-2*r,n=t;e.beginPath(),e.strokeStyle="rgba(255,255,255,1.0)",e.lineWidth=4*a;var l=10.8*n/100,d=r/3;y=r,x=0+(n-l)/2,e.moveTo(x,y),e.lineTo(x-d,y-d);var c=0+(n+l)/2;e.moveTo(c,y),e.lineTo(c+d,y-d),e.moveTo(c+d/3,y-d/3),e.lineTo(x-d/3,y-d/3),y=o+r,x=0+(n-l)/2,e.moveTo(x,y),e.lineTo(x-d,y+d),c=0+(n+l)/2,e.moveTo(c,y),e.lineTo(c+d,y+d),e.moveTo(c+d/3,y+d/3),e.lineTo(x-d/3,y+d/3),e.closePath(),e.stroke(),e.stroke()},View.Game.scrumDrawBoard2=function(e,a,t,s,i){e.translate(-t/2,-s/2),e.fillStyle="rgba(0,185,0,0.3)",e.beginPath(),e.rect(0,0,t,s),e.closePath(),e.fill(),this.scrumDrawGoals(e,a,t,s,i,r)},View.Game.scrumDrawBoard=function(e,a,t,s,i){e.translate(-t/2,-s/2),e.fillStyle="rgb(0,185,0)",e.beginPath(),e.rect(0,0,t,s),e.closePath(),e.fill();var o=s-2*r,n=r,l=t-i*r,d=i*r/2;e.beginPath(),e.strokeStyle="rgba(255,255,255,0.8)",e.lineWidth=2*a,e.moveTo(d,n),e.lineTo(d+l,n),e.moveTo(d,n+o),e.lineTo(d+l,n+o),e.closePath(),e.stroke(),e.moveTo(d,0),e.lineTo(d,s),e.moveTo(d+l,0),e.lineTo(d+l,s),e.stroke(),e.strokeStyle="rgba(255,255,255,0.4)",e.beginPath();var c=n+22*o/100,m=r;e.moveTo(d,c),e.lineTo(d+l,c),this.scrumDraw15metersMarks(e,c,60,l,m,d),this.scrumDraw22texts(e,c,r,l,d);var c=n+o/2;e.moveTo(d,c),e.lineTo(d+l,c),this.scrumDraw15metersMarks(e,c,60,l,m,d),c=n+o-22*o/100,e.moveTo(d,c),e.lineTo(d+l,c),this.scrumDraw15metersMarks(e,c,60,l,m,d),e.closePath(),e.stroke(),this.scrumDraw22texts(e,c,r,l,d),e.beginPath(),e.strokeStyle="rgba(255,255,255,0.3)",c=n+5*o/100,this.scrumDrawDashLine(e,d+5*l/60,c,d+55*l/60,c,6,60),c=n+o-5*o/100,this.scrumDrawDashLine(e,d+5*l/60,c,d+55*l/60,c,6,60),e.closePath(),e.stroke(),e.beginPath(),e.strokeStyle="rgba(255,255,255,0.3)",c=n+o/2-10*o/100,this.scrumDrawDashLine(e,d+5*l/60,c,d+55*l/60,c,6,60),c=n+o/2+10*o/100,this.scrumDrawDashLine(e,d+5*l/60,c,d+55*l/60,c,6,60),e.closePath(),e.stroke(),e.beginPath(),e.strokeStyle="rgba(255,255,255,0.3)";var u=d+5*l/60;this.scrumDrawDashLine(e,u,n,u,s-n,40,30);var u=d+55*l/60;this.scrumDrawDashLine(e,u,n,u,s-n,40,30),e.closePath(),e.stroke();var p=r/3;e.beginPath(),e.strokeStyle="rgba(255,255,255,1.0)",e.lineWidth=2*a,e.moveTo(d,n),e.lineTo(d-p/3,n-p/6),e.moveTo(d+l,n),e.lineTo(d+l+p/3,n-p/6),e.moveTo(d,n+o),e.lineTo(d-p/3,n+o+p/6),e.moveTo(d+l,n+o),e.lineTo(d+l+p/3,n+o+p/6),e.closePath(),e.stroke(),this.scrumDrawGoals(e,a,t,s,i,r)},View.Board.xdShowEnd=function(e,a){function t(){0==--s&&a.EndShown()}if(o=!0,this.mWinner==JocGame.DRAW)return!0;for(var s=1,i=0;i<this.pieces.length;i++){this.pieces[i].s==this.mWinner&&(s++,function(a){e.updateGadget("player#"+a,{"3d":{morphing:[0,0,0,0,0,0,0,0,0,0,0,1]}},1e3,function(){e.updateGadget("player#"+a,{"3d":{morphing:[1,0,0,0,0,0,0,0,0,0,0,0]}},1e3,t)})}(i))}return e.updateGadget("ball",{"3d":{z:0}},1e3,function(){e.updateGadget("ball",{"3d":{z:500}},1e3,function(){t()})}),!1}}();