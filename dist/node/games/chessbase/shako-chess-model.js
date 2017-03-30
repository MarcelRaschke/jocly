exports.model=Model={Game:{},Board:{},Move:{}},function(){var t;Model.Game.cbConstants={MASK:65535,FLAG_MOVE:65536,FLAG_CAPTURE:131072,FLAG_STOP:262144,FLAG_SCREEN_CAPTURE:524288,FLAG_CAPTURE_KING:1048576,FLAG_CAPTURE_NO_KING:2097152};var e="undefined"!=typeof Int32Array;Model.Game.cbUseTypedArrays=e,Model.Game.cbTypedArray=function(t){if(e){var i=new Int32Array(t.length);return i.set(t),i}for(var r=[],a=t.length,s=0;s<a;s++)r.push(t[s]);return r},Model.Game.cbShortRangeGraph=function(t,e,i,r){var a=this;void 0===r&&(r=196608);for(var s={},n=0;n<t.boardSize;n++)s[n]=[],(!i||n in i)&&e.forEach(function(e){var o=t.Graph(n,e);null!=o&&(!i||o in i)&&s[n].push(a.cbTypedArray([o|r]))});return s},Model.Game.cbLongRangeGraph=function(t,e,i,r,a){var s=this;void 0!==r&&null!=r||(r=196608),a||(a=1/0);for(var n={},o=0;o<t.boardSize;o++)n[o]=[],(!i||o in i)&&e.forEach(function(e){for(var h=[],p=t.Graph(o,e),c=0;null!=p&&(!i||p in i)&&(h.push(p|r),++c!=a);)p=t.Graph(p,e);h.length>0&&n[o].push(s.cbTypedArray(h))});return n},Model.Game.cbNullGraph=function(t){for(var e={},i=0;i<t.boardSize;i++)e[i]=[];return e},Model.Game.cbAuthorGraph=function(t){for(var e={},i=0;i<t.boardSize;i++){e[i]=[];for(var r=0;r<t.boardSize;r++)e[i].push([2293760|r])}return e},Model.Game.cbMergeGraphs=function(t){for(var e=[],i=0;i<t.boardSize;i++){e[i]=[];for(var r=1;r<arguments.length;r++)e[i]=e[i].concat(arguments[r][i])}return e},Model.Game.cbGetThreatGraph=function(){function t(e,i){for(var r in n){var a=n[r];if(!(a.p.length<i.length+1)){for(var s=!0,o=0;o<i.length;o++)if(i[o]!=a.p[o]){s=!1;break}if(s){var h=a.p[i.length],p=e[h];void 0===p&&(p={e:{}},e[h]=p),a.p.length==i.length+1&&(p.t=a.t,p.ts=a.ts,p.tk=a.tk,delete n[r]),i.push(h),t(p.e,i),i.pop()}}}}var e=this;this.cbUseScreenCapture=!1,this.cbUseCaptureKing=!1,this.cbUseCaptureNoKing=!1;for(var i={1:[],"-1":[]},r=[],a=0;a<this.g.boardSize;a++)this.g.pTypes.forEach(function(t,i){t.graph[a].forEach(function(t){for(var s=[],n=0;n<t.length;n++){var o=t[n];1048576&o?(e.cbUseCaptureKing=!0,s.unshift({d:65535&o,a:a,tk:i})):2097152&o?(e.cbUseCaptureNoKing=!0,s.unshift({d:65535&o,a:a,tnk:i})):131072&o?s.unshift({d:65535&o,a:a,t:i}):262144&o?s.unshift({d:65535&o,a:a}):524288&o&&(e.cbUseScreenCapture=!0,s.unshift({d:65535&o,a:a,ts:i}))}s.length>0&&r.push(s)})});var s={};r.forEach(function(t){t.forEach(function(e,i){var r=s[e.d];void 0===r&&(r={},s[e.d]=r);for(var a=[],n=i+1;n<t.length;n++)a.push(t[n].d);a.push(e.a);var o=a.join(","),h=r[o];void 0===h&&(h={p:a,t:{},ts:{},tk:{}},r[o]=h),void 0!==e.t?h.t[e.t]=!0:void 0!==e.tk?h.tk[e.tk]=!0:void 0!==e.ts&&(h.ts[e.ts]=!0)})});for(var a=0;a<e.g.boardSize;a++){var n=s[a],o={};t(o,[]),i[1][a]=o,i[-1][a]=o}return i},Model.Game.InitGame=function(){var e=this;this.cbVar=t=this.cbDefine(),this.g.boardSize=this.cbVar.geometry.boardSize,this.g.pTypes=this.cbGetPieceTypes(),this.g.threatGraph=this.cbGetThreatGraph(),this.g.distGraph=this.cbVar.geometry.GetDistances(),this.cbPiecesCount=0,this.g.castleablePiecesCount={1:0,"-1":0};for(var i in t.pieceTypes){var r=t.pieceTypes[i];if(r.castle){(r.initial||[]).forEach(function(t){e.g.castleablePiecesCount[t.s]++})}r.initial&&(this.cbPiecesCount+=r.initial.length)}for(var a=[],i=0;i<this.cbPiecesCount;i++)a.push(i);var s=Object.keys(t.pieceTypes);this.zobrist=new JocGame.Zobrist({board:{type:"array",size:this.cbVar.geometry.boardSize,values:a},who:{values:["1","-1"]},type:{type:"array",size:this.cbPiecesCount,values:s}})},Model.Game.cbGetPieceTypes=function(){for(var t=[],e={},i=0;i<this.cbVar.geometry.boardSize;i++)e[i]=[];for(var r in this.cbVar.pieceTypes){var a=this.cbVar.pieceTypes[r];t[r]={graph:a.graph||e,abbrev:a.abbrev||"",value:a.isKing?100:a.value||1,isKing:!!a.isKing,castle:!!a.castle,epTarget:!!a.epTarget,epCatch:!!a.epCatch}}return t},Model.Board.Init=function(t){this.zSign=0},Model.Board.InitialPosition=function(i){var r=this;this.board=e?new Int16Array(i.g.boardSize):[];for(var a=0;a<i.g.boardSize;a++)this.board[a]=-1;if(this.kings={},this.pieces=[],this.ending={1:!1,"-1":!1},this.lastMove=null,i.cbVar.castle&&(this.castled={1:!1,"-1":!1}),this.zSign=i.zobrist.update(0,"who",-1),this.noCaptCount=0,i.mInitial)i.mInitial.pieces.forEach(function(t){var e={};for(var i in t)t.hasOwnProperty(i)&&(e[i]=t[i]);r.pieces.push(e)}),i.mInitial.lastMove&&(this.lastMove={f:i.mInitial.lastMove.f,t:i.mInitial.lastMove.t}),void 0!==i.mInitial.noCaptCount&&(this.noCaptCount=i.mInitial.noCaptCount);else for(var s in i.cbVar.pieceTypes)for(var n=i.cbVar.pieceTypes[s],o=n.initial||[],h=0;h<o.length;h++){var p=o[h],c={s:p.s,t:parseInt(s),p:p.p,m:!1};this.pieces.push(c)}if(this.pieces.sort(function(t,e){if(t.s!=e.s)return e.s-t.s;var r=i.cbVar.pieceTypes[t.t].value||100,a=i.cbVar.pieceTypes[e.t].value||100;return r!=a?r-a:t.p-e.p}),this.pieces.forEach(function(t,e){t.i=e,r.board[t.p]=e,i.g.pTypes[t.t].isKing&&(r.kings[t.s]=t.p),r.zSign=i.zobrist.update(r.zSign,"board",e,t.p),r.zSign=i.zobrist.update(r.zSign,"type",t.t,e)}),i.mInitial&&i.mInitial.enPassant){var a=t.geometry.PosByName(i.mInitial.enPassant);if(a>=0){var l,u=t.geometry.C(a),v=t.geometry.R(a);l=1==i.mInitial.turn?t.geometry.POS(u,v-1):t.geometry.POS(u,v+1),this.epTarget={p:a,i:this.board[l]}}}},Model.Board.CopyFrom=function(t){if(e)this.board=new Int16Array(t.board.length),this.board.set(t.board);else{this.board=[];for(var i=t.board,r=i.length,a=0;a<r;a++)this.board.push(i[a])}this.pieces=[];for(var s=t.pieces.length,a=0;a<s;a++){var n=t.pieces[a];this.pieces.push({s:n.s,p:n.p,t:n.t,i:n.i,m:n.m})}this.kings={1:t.kings[1],"-1":t.kings[-1]},this.check=t.check,t.lastMove?this.lastMove={f:t.lastMove.f,t:t.lastMove.t,c:t.lastMove.c}:this.lastMove=null,this.ending={1:t.ending[1],"-1":t.ending[-1]},void 0!==t.castled&&(this.castled={1:t.castled[1],"-1":t.castled[-1]}),this.noCaptCount=t.noCaptCount,t.epTarget?this.epTarget={p:t.epTarget.p,i:t.epTarget.i}:this.epTarget=null,this.mWho=t.mWho,this.zSign=t.zSign},Model.Board.cbApplyCastle=function(t,e,i){var r=t.cbVar.castle[e.f+"/"+e.cg],a=r.r[r.r.length-1],s=this.pieces[this.board[e.cg]],n=r.k[r.k.length-1],o=this.pieces[this.board[e.f]];return i&&(this.zSign=t.zobrist.update(this.zSign,"board",s.i,e.cg),this.zSign=t.zobrist.update(this.zSign,"board",s.i,a),this.zSign=t.zobrist.update(this.zSign,"board",o.i,e.f),this.zSign=t.zobrist.update(this.zSign,"board",o.i,n)),s.p=a,s.m=!0,this.board[e.cg]=-1,o.p=n,o.m=!0,this.board[e.f]=-1,this.board[a]=s.i,this.board[n]=o.i,this.castled[s.s]=!0,this.kings[o.s]=n,[{i:s.i,f:a,t:-1},{i:o.i,f:n,t:e.f,kp:e.f,who:o.s,m:!1},{i:s.i,f:-1,t:e.cg,m:!1,cg:!1}]},Model.Board.cbQuickApply=function(t,e){if(void 0!==e.cg)return this.cbApplyCastle(t,e,!1);var i=[],r=this.board[e.f],a=this.pieces[r];if(null!=e.c){i.unshift({i:e.c,f:-1,t:this.pieces[e.c].p});var s=this.pieces[e.c];this.board[s.p]=-1,s.p=-1}var n=this.kings[a.s];return t.g.pTypes[a.t].isKing&&(this.kings[a.s]=e.t),i.unshift({i:r,f:e.t,t:e.f,kp:n,who:a.s,ty:a.t}),a.p=e.t,void 0!==e.pr&&(a.t=e.pr),this.board[e.f]=-1,this.board[e.t]=r,i},Model.Board.cbQuickUnapply=function(t,e){for(var i=0;i<e.length;i++){var r=e[i],a=this.pieces[r.i];r.f>=0&&(a.p=-1,this.board[r.f]=-1),r.t>=0&&(a.p=r.t,this.board[r.t]=r.i),void 0!==r.m&&(a.m=r.m),void 0!==r.kp&&(this.kings[r.who]=r.kp),void 0!=r.ty&&(a.t=r.ty),void 0!=r.cg&&(this.castled[a.s]=r.cg)}},Model.Board.ApplyMove=function(t,e){var i=this.pieces[this.board[e.f]];if(void 0!==e.cg)this.cbApplyCastle(t,e,!0);else{if(this.zSign=t.zobrist.update(this.zSign,"board",i.i,e.f),this.board[i.p]=-1,void 0!==e.pr&&(this.zSign=t.zobrist.update(this.zSign,"type",i.t,i.i),i.t=e.pr,this.zSign=t.zobrist.update(this.zSign,"type",i.t,i.i)),null!=e.c){var r=this.pieces[e.c];this.zSign=t.zobrist.update(this.zSign,"board",r.i,r.p),this.board[r.p]=-1,r.p=-1,r.m=!0,this.noCaptCount=0}else this.noCaptCount++;i.p=e.t,i.m=!0,this.board[e.t]=i.i,this.zSign=t.zobrist.update(this.zSign,"board",i.i,e.t),t.g.pTypes[i.t].isKing&&(this.kings[i.s]=e.t)}this.check=!!e.ck,this.lastMove={f:e.f,t:e.t,c:e.c},void 0!==e.ko&&(this.ending[i.s]=e.ko),void 0!==e.ept?this.epTarget={p:e.ept,i:i.i}:this.epTarget=null,this.zSign=t.zobrist.update(this.zSign,"who",-this.mWho),this.zSign=t.zobrist.update(this.zSign,"who",this.mWho)},Model.Board.Evaluate=function(i){function r(e){var i=1/0;for(var r in t.geometry.corners)i=Math.min(i,h.distGraph[s.kings[e]][r]);return i-Math.sqrt(h.boardSize)}var a="debug"==arguments[3],s=this;this.mEvaluation=0;var n,o=this.mWho,h=i.g;if(e)n={1:{count:new Uint8Array(h.pTypes.length),byType:{}},"-1":{count:new Uint8Array(h.pTypes.length),byType:{}}};else{n={1:{count:[],byType:{}},"-1":{count:[],byType:{}}};for(var p=0;p<h.pTypes.length;p++)n[1].count[p]=n[-1].count[p]=0}if(i.mOptions.preventRepeat&&i.GetRepeatOccurence(this)>2)return this.mFinished=!0,void(this.mWinner=i.cbOnPerpetual?o*i.cbOnPerpetual:JocGame.DRAW);for(var c={1:0,"-1":0},l={1:h.distGraph[this.kings[-1]],"-1":h.distGraph[this.kings[1]]},u={1:0,"-1":0},v={1:0,"-1":0},b={1:0,"-1":0},f={1:0,"-1":0},g={1:!1,"-1":!1},d=this.pieces,m=d.length,p=0;p<m;p++){var G=d[p];if(G.p>=0){var y=G.s,M=h.pTypes[G.t];M.isKing?g[y]=G.m:c[y]+=M.value,M.castle&&!G.m&&f[y]++,v[y]++,u[y]+=l[y][G.p],b[y]+=t.geometry.distEdge[G.p];var C=n[y];C.count[G.t]++;var S=C.byType;void 0===S[G.t]?S[G.t]=[G]:S[G.t].push(G)}}if(this.lastMove&&null!=this.lastMove.c){var G=this.pieces[this.board[this.lastMove.t]];c[-G.s]+=this.cbStaticExchangeEval(i,G.p,G.s,{piece:G})}var k={1:0,"-1":0},A={1:0,"-1":0},T={1:0,"-1":0};this.ending[1]&&(A[1]=(u[1]-Math.sqrt(h.boardSize))/v[1],t.geometry.corners&&(T[1]=r(1))),this.ending[-1]&&(A[-1]=(u[-1]-Math.sqrt(h.boardSize))/v[-1],t.geometry.corners&&(T[1]=r(-1)));var z={pieceValue:c[1]-c[-1],pieceValueRatio:(c[1]-c[-1])/(c[1]+c[-1]+1),posValue:b[1]-b[-1],averageDistKing:u[1]/v[1]-u[-1]/v[-1],check:this.check?-o:0,endingKingFreedom:k[1]-k[-1],endingDistKing:A[1]-A[-1],distKingCorner:T[1]-T[-1]};t.castle&&(z.castle=(this.castled[1]?1:g[1]?0:f[1]/(h.castleablePiecesCount[1]+1))-(this.castled[-1]?1:g[-1]?0:f[-1]/(h.castleablePiecesCount[-1]+1))),t.evaluate&&t.evaluate.call(this,i,z,n);var E=i.mOptions.levelOptions;for(var P in z){var R=z[P],w=E[P+"Factor"]||0,O=R*w;a&&console.log(P,"=",R,"*",w,"=>",O),this.mEvaluation+=O}a&&console.log("Evaluation",this.mEvaluation)},Model.Board.cbGeneratePseudoLegalMoves=function(t){function e(e,a){var s=t.cbVar.promote;if(!s)return void r.push(a);var n=s.call(i,t,e,a);if(null!=n)if(0==n.length)r.push(a);else if(1==n.length)a.pr=n[0],r.push(a);else for(var o=0;o<n.length;o++){var h=n[o];r.push({f:a.f,t:a.t,c:a.c,pr:h,ept:a.ept,ep:a.ep,a:a.a})}}for(var i=this,r=[],a=t.cbVar,s=this.mWho,n=!a.castle||this.check||this.castled[s]?null:[],o=-1,h=this.pieces.length,p=0;p<h;p++){var c=this.pieces[p];if(!(c.p<0||c.s!=s)){var l=t.g.pTypes[c.t];l.isKing&&(c.m?n=null:o=c),n&&l.castle&&!c.m&&n.push(c);var u,v;u=l.graph[c.p],v=u.length;for(var b=0;b<v;b++)for(var f=u[b],g=!1,d=f.length,m=null,G=0;G<d;G++){var y=f[G],M=65535&y,C=this.board[M];if(!(C<0)||l.epCatch&&this.epTarget&&this.epTarget.p==M){if(!(524288&y)){var S;S=C<0?this.pieces[this.epTarget.i]:this.pieces[C],!(S.s!=c.s&&131072&y)||1048576&y&&!t.g.pTypes[S.t].isKing||2097152&y&&t.g.pTypes[S.t].isKing||e(c,{f:c.p,t:M,c:S.i,a:l.abbrev,ep:C<0});break}if(g){var S=this.pieces[C];S.s!=c.s&&e(c,{f:c.p,t:M,c:S.i,a:l.abbrev});break}g=!0}else 65536&y&&0==g&&e(c,{f:c.p,t:M,c:null,a:l.abbrev,ept:null!=m&&l.epTarget?m:void 0});m=M}}}if(n)for(var p=0;p<n.length;p++){var k=n[p],A=t.cbVar.castle[o.p+"/"+k.p];if(A){for(var T=!0,b=0;b<A.r.length;b++){var z=A.r[b];if(this.board[z]>=0&&z!=o.p&&z!=k.p){T=!1;break}}if(T){for(var E=!0,b=0;b<A.k.length;b++){var z=A.k[b];if(this.board[z]>=0&&z!=k.p&&z!=o.p||this.cbGetAttackers(t,z,s).length>0){E=!1;break}}E&&r.push({f:o.p,t:A.k[A.k.length-1],c:null,cg:k.p})}}}return r},Model.Board.cbStaticExchangeEval=function(t,e,i,r){var a=0,s=this.cbGetSmallestAttacker(t,e,i);if(s){var n=this.mWho;this.mWho=s.s;var o=this.cbQuickApply(t,{f:s.p,t:e,c:r.piece.i}),h=t.g.pTypes[r.piece.t].value;r.piece=s,a=Math.max(0,h-this.cbStaticExchangeEval(t,e,-i,r)),this.cbQuickUnapply(t,o),this.mWho=n}return a},Model.Board.cbGetSmallestAttacker=function(t,e,i){var r=this.cbGetAttackers(t,e,i);if(0==r.length)return null;for(var a=1/0,s=null,n=r.length,o=0;o<n;o++){var h=r[o],p=t.g.pTypes[h.t].value;p<a&&(a=p,s=h)}return s},Model.Board.cbCollectAttackers=function(t,e,i,r){for(var a in e){var s=e[a],n=this.board[a];if(n<0)this.cbCollectAttackers(t,s.e,i,r);else{var o=this.pieces[n];o.s==-t&&(s.t&&o.t in s.t||r&&s.tk&&o.t in s.tk)&&i.push(o)}}},Model.Board.cbCollectAttackersScreen=function(t,e,i,r,a){for(var s in e){var n=e[s],o=this.board[s];if(o<0)this.cbCollectAttackersScreen(t,n.e,i,r,a);else{var h=this.pieces[o];!a&&h.s==-t&&(n.t&&h.t in n.t||r&&n.tk&&h.t in n.tk)?i.push(h):a?a&&h.s==-t&&n.ts&&h.t in n.ts&&i.push(h):this.cbCollectAttackersScreen(t,n.e,i,r,!0)}}},Model.Board.cbGetAttackers=function(t,e,i,r){var a=[];return t.cbUseScreenCapture?this.cbCollectAttackersScreen(i,t.g.threatGraph[i][e],a,r,!1):this.cbCollectAttackers(i,t.g.threatGraph[i][e],a,r),a},Model.Board.GenerateMoves=function(t){var e=this.cbGeneratePseudoLegalMoves(t);this.mMoves=[];for(var i=!0,r=this.kings[this.mWho],a=e.length,s=0;s<a;s++){var n=e[s],o=this.cbQuickApply(t,n);if(!(this.cbGetAttackers(t,this.kings[this.mWho],this.mWho,!0).length>0)){var h=this.cbGetAttackers(t,this.kings[-this.mWho],-this.mWho,!0).length>0;n.ck=h,this.mMoves.push(n),n.f!=r&&(i=!1)}this.cbQuickUnapply(t,o)}if(0==this.mMoves.length)this.mFinished=!0,this.mWinner=t.cbOnStaleMate?t.cbOnStaleMate*this.mWho:JocGame.DRAW,this.check&&(this.mWinner=-this.mWho);else if(this.ending[this.mWho]){if(!i)for(var s=0;s<this.mMoves.length;s++)this.mMoves[s].ko=!1}else if(!this.ending[this.mWho]&&i&&!this.check)for(var s=0;s<this.mMoves.length;s++)this.mMoves[s].ko=!0},Model.Board.GetSignature=function(){return this.zSign},Model.Move.Init=function(t){for(var e in t)t.hasOwnProperty(e)&&(this[e]=t[e])},Model.Move.Equals=function(t){return this.f==t.f&&this.t==t.t&&this.pr==t.pr},Model.Move.CopyFrom=function(t){this.Init(t)},Model.Move.ToString=function(){if(this.compact)return this.compact;var e;if(void 0!==this.cg?e=t.castle[this.f+"/"+this.cg].n:(e=this.a||"",e+=t.geometry.PosName(this.f),null==this.c?e+="-":e+="x",e+=t.geometry.PosName(this.t)),void 0!==this.pr){var i=t.pieceTypes[this.pr];i&&i.abbrev&&i.abbrev.length>0&&!i.silentPromo&&(e+="="+i.abbrev)}return this.ck&&(e+="+"),e},Model.Board.CompactMoveString=function(e,i,r){"function"!=typeof i.ToString&&(i=e.CreateMove(i));var a=i.ToString(),s=/^([A-Z]?)([a-z])([1-9][0-9]*)([-x])([a-z])([1-9][0-9]*)(.*?)$/.exec(a);if(!s)return a;var n=s[7];if(r||(r={}),r.value||(r.value=[]),0==r.value.length){var o=this.mMoves;this.mMoves&&0!=this.mMoves.length||this.GenerateMoves(e);for(var h=0;h<this.mMoves.length;h++){var p=this.mMoves[h];"function"!=typeof p.ToString&&(p=e.CreateMove(p)),r.value.push({str:p.ToString(),move:p})}this.mMoves=o}var c=[];if(r.value.forEach(function(t){var e=/^([A-Z]?[a-z][1-9][0-9]*[-x][a-z][1-9][0-9]*)(.*?)$/.exec(t.str);e&&t.move.t==i.t&&(t.move.a||"")==s[1]&&e[2]==n&&c.push(t.move)}),1==c.length)return""==s[1]&&"x"==s[4]?s[2]+"x"+s[5]+s[6]+s[7]:s[1]+("x"==s[4]?"x":"")+s[5]+s[6]+s[7];if(t.geometry.CompactCrit)for(var l="",h=0;;h++){var u=t.geometry.CompactCrit(i.f,h);if(null==u)return a;l+=u;for(var v=[],b=0;b<c.length;b++){var f=c[b];t.geometry.CompactCrit(f.f,h)==u&&v.push(f)}if(console.assert(v.length>0),1==v.length)return s[1]+l+("x"==s[4]?"x":"")+s[5]+s[6]+s[7];c=v}return a},Model.Board.cbIntegrity=function(t){function e(t,e){t||console.error(e)}for(var i=this,r=0;r<this.board.length;r++){var a=this.board[r];if(a>=0){var s=i.pieces[a];e(void 0!==s,"no piece at pos"),e(s.p==r,"piece has different pos")}}for(var a=0;a<this.pieces.length;a++){var s=this.pieces[a];s.p>=0&&e(i.board[s.p]==a,"board index mismatch")}},Model.Game.Import=function(e,i){var r,a=[],s={1:{},"-1":{}},n=null,o=0;if("pjn"==e){var h={status:!1,error:"parse"},p=i.split(" ");if(6!=p.length)return console.warn("FEN should have 6 parts"),h;var c=p[0].split("/"),l=t.geometry.fenHeight||t.geometry.height;if(c.length!=l)return console.warn("FEN board should have",l,"rows, got",c.length),h;var u={};for(var v in t.pieceTypes){var b=t.pieceTypes[v],f=b.fenAbbrev||b.abbrev||"X";u[f.toUpperCase()]={s:1,t:v},u[f.toLowerCase()]={s:-1,t:v}}var g=t.geometry.FenRowPos||function(e,i){return(t.geometry.height-1-e)*t.geometry.width+i};if(c.forEach(function(e,i){for(var r=0,s=0;s<e.length;s++){var n=e.substr(s,1),o=u[n];if(void 0!==o){var p=g(i,r);r++;for(var c={s:o.s,t:o.t,p:p},l=!0,v=t.pieceTypes[c.t].initial||[],b=0;b<v.length;b++){var f=v[b];f.s==c.s&&f.p==p&&(l=!1)}c.m=l,a.push(c)}else{if(isNaN(parseInt(n)))return console.warn("FEN invalid board spec",n),h;r+=parseInt(n)}}}),a.sort(function(t,e){return e.s-t.s}),"w"==p[1])r=1;else{if("b"!=p[1])return console.warn("FEN invalid turn spec",p[1]),h;r=-1}s[1].k=p[2].indexOf("K")>=0,s[1].q=p[2].indexOf("Q")>=0,s[-1].k=p[2].indexOf("k")>=0,s[-1].q=p[2].indexOf("q")>=0,n="-"==p[3]?null:p[3];var d=parseInt(p[4]);isNaN(d)||(o=d);var m={pieces:a,turn:r,castle:s,enPassant:n,noCaptCount:o};return t.importGame&&t.importGame.call(this,m,e,i),{status:!0,initial:m}}return{status:!1,error:"unsupported"}}}(),function(){Model.Game.cbBoardGeometryGrid=function(t,e){function i(e){return e%t}function r(e){return Math.floor(e/t)}function a(e,i){return i*t+e}function s(s,n){var o=i(s),h=r(s),p=o+n[0],c=h+n[1];return p<0||p>=t||c<0||c>=e?null:a(p,c)}function n(t){return String.fromCharCode("a".charCodeAt(0)+i(t))+(r(t)+1)}function o(t){var e=/^([a-z])([0-9]+)$/.exec(t);return e?a(e[1].charCodeAt(0)-"a".charCodeAt(0),parseInt(e[2])-1):-1}function h(t,e){return 0==e?String.fromCharCode("a".charCodeAt(0)+i(t)):1==e?r(t)+1:null}function p(){for(var a=[],s=0;s<t*e;s++){var n=[];a.push(n);for(var o=0;o<t*e;o++){var h=r(s),p=i(s),c=r(o),l=i(o);n.push(Math.max(Math.abs(h-c),Math.abs(p-l)))}}return a}return{boardSize:t*e,width:t,height:e,C:i,R:r,POS:a,Graph:s,PosName:n,PosByName:o,CompactCrit:h,GetDistances:p,distEdge:function(){for(var a=[],s=0;s<t*e;s++){var n=i(s),o=r(s);a[s]=Math.min(n,Math.abs(t-n-1),o,Math.abs(e-o-1))}return a}(),corners:function(){var i={};return i[a(0,0)]=1,i[a(0,e-1)]=1,i[a(t-1,0)]=1,i[a(t-1,e-1)]=1,i}()}},Model.Game.cbPawnGraph=function(t,e,i){for(var r=this,a={},s=0;s<t.boardSize;s++)if(!i||s in i){var n=[],o=t.Graph(s,[0,e]);null!=o&&(!i||o in i)&&n.push(r.cbTypedArray([o|r.cbConstants.FLAG_MOVE])),[-1,1].forEach(function(a){var o=t.Graph(s,[a,e]);null!=o&&(!i||o in i)&&n.push(r.cbTypedArray([o|r.cbConstants.FLAG_CAPTURE]))}),a[s]=n}else a[s]=[];return a},Model.Game.cbInitialPawnGraph=function(t,e,i){for(var r=this,a={},s=0;s<t.boardSize;s++)if(!i||s in i){var n=[],o=t.Graph(s,[0,e]);if(null!=o&&(!i||o in i)){var h=[o|r.cbConstants.FLAG_MOVE],p=t.Graph(o,[0,e]);null!=p&&(!i||p in i)&&h.push(p|r.cbConstants.FLAG_MOVE),n.push(r.cbTypedArray(h))}[-1,1].forEach(function(a){var o=t.Graph(s,[a,e]);null!=o&&(!i||o in i)&&n.push(r.cbTypedArray([o|r.cbConstants.FLAG_CAPTURE]))}),a[s]=n}else a[s]=[];return a},Model.Game.cbKingGraph=function(t,e){return this.cbShortRangeGraph(t,[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]],e)},Model.Game.cbKnightGraph=function(t,e){return this.cbShortRangeGraph(t,[[2,-1],[2,1],[-2,-1],[-2,1],[-1,2],[-1,-2],[1,2],[1,-2]],e)},Model.Game.cbHorseGraph=function(t){for(var e=this,i={},r=0;r<t.boardSize;r++)i[r]=[],[[1,0,2,-1],[1,0,2,1],[-1,0,-2,-1],[-1,0,-2,1],[0,1,-1,2],[0,-1,-1,-2],[0,1,1,2],[0,-1,1,-2]].forEach(function(a){var s=t.Graph(r,[a[0],a[1]]);if(null!=s){var n=t.Graph(r,[a[2],a[3]]);null!=n&&i[r].push(e.cbTypedArray([s|e.cbConstants.FLAG_STOP,n|e.cbConstants.FLAG_MOVE|e.cbConstants.FLAG_CAPTURE]))}});return i},Model.Game.cbRookGraph=function(t,e){return this.cbLongRangeGraph(t,[[0,-1],[0,1],[-1,0],[1,0]],e)},Model.Game.cbBishopGraph=function(t,e){return this.cbLongRangeGraph(t,[[1,-1],[1,1],[-1,1],[-1,-1]],e)},Model.Game.cbQueenGraph=function(t,e){return this.cbLongRangeGraph(t,[[0,-1],[0,1],[-1,0],[1,0],[1,-1],[1,1],[-1,1],[-1,-1]],e)},Model.Game.cbXQGeneralGraph=function(t,e){for(var i=this,r={},a=0;a<t.boardSize;a++)r[a]=[],[[-1,0,!1],[0,-1,!0],[0,1,!0],[1,0,!1]].forEach(function(s){var n=[],o=t.Graph(a,s);if(null!=o&&((!e||o in e)&&n.push(o|i.cbConstants.FLAG_MOVE|i.cbConstants.FLAG_CAPTURE),s[2]))for(var h=t.Graph(o,s);null!=h;)!e||h in e?n.push(h|i.cbConstants.FLAG_CAPTURE|i.cbConstants.FLAG_CAPTURE_KING):n.push(h|i.cbConstants.FLAG_STOP),h=t.Graph(h,s);n.length>0&&r[a].push(i.cbTypedArray(n))});return r},Model.Game.cbXQSoldierGraph=function(t,e){return this.cbShortRangeGraph(t,[[0,e]])},Model.Game.cbXQPromoSoldierGraph=function(t,e){return this.cbShortRangeGraph(t,[[0,e],[-1,0],[1,0]])},Model.Game.cbXQAdvisorGraph=function(t,e){return this.cbShortRangeGraph(t,[[1,1],[-1,1],[1,-1],[-1,-1]],e)},Model.Game.cbXQCannonGraph=function(t){return this.cbLongRangeGraph(t,[[0,-1],[0,1],[-1,0],[1,0]],null,this.cbConstants.FLAG_MOVE|this.cbConstants.FLAG_SCREEN_CAPTURE)},Model.Game.cbXQElephantGraph=function(t,e){for(var i=this,r={},a=0;a<t.boardSize;a++)r[a]=[],(!e||a in e)&&[[1,1,2,2],[1,-1,2,-2],[-1,1,-2,2],[-1,-1,-2,-2]].forEach(function(s){var n=t.Graph(a,[s[0],s[1]]);if(null!=n){var o=t.Graph(a,[s[2],s[3]]);null!=o&&(!e||o in e)&&r[a].push(i.cbTypedArray([n|i.cbConstants.FLAG_STOP,o|i.cbConstants.FLAG_MOVE|i.cbConstants.FLAG_CAPTURE]))}});return r},Model.Game.cbSilverGraph=function(t,e){return this.cbShortRangeGraph(t,[[0,e],[-1,-1],[-1,1],[1,-1],[1,1]])},Model.Game.cbFersGraph=function(t,e){return this.cbShortRangeGraph(t,[[-1,-1],[-1,1],[1,-1],[1,1]])},Model.Game.cbSchleichGraph=function(t,e){return this.cbShortRangeGraph(t,[[-1,0],[1,0],[0,-1],[0,1]])},Model.Game.cbAlfilGraph=function(t,e){return this.cbShortRangeGraph(t,[[-2,-2],[-2,2],[2,2],[2,-2]])}}(),function(){var t=Model.Game.cbBoardGeometryGrid(10,10);Model.Game.cbDefine=function(){var e=this.cbShortRangeGraph(t,[[-1,-1],[-1,1],[1,-1],[1,1],[-2,-2],[-2,2],[2,-2],[2,2]]);return{geometry:t,pieceTypes:{0:{name:"pawn-w",aspect:"fr-pawn",graph:this.cbPawnGraph(t,1),value:.9,abbrev:"",fenAbbrev:"P",initial:[],epCatch:!0},1:{name:"pawn-b",aspect:"fr-pawn",graph:this.cbPawnGraph(t,-1),value:.9,abbrev:"",fenAbbrev:"P",initial:[],epCatch:!0},2:{name:"ipawn-w",aspect:"fr-pawn",graph:this.cbInitialPawnGraph(t,1),value:.9,abbrev:"",fenAbbrev:"P",initial:[{s:1,p:20},{s:1,p:21},{s:1,p:22},{s:1,p:23},{s:1,p:24},{s:1,p:25},{s:1,p:26},{s:1,p:27},{s:1,p:28},{s:1,p:29}],epTarget:!0},3:{name:"ipawn-b",aspect:"fr-pawn",graph:this.cbInitialPawnGraph(t,-1),value:.9,abbrev:"",fenAbbrev:"P",initial:[{s:-1,p:70},{s:-1,p:71},{s:-1,p:72},{s:-1,p:73},{s:-1,p:74},{s:-1,p:75},{s:-1,p:76},{s:-1,p:77},{s:-1,p:78},{s:-1,p:79}],epTarget:!0},4:{name:"knight",aspect:"fr-knight",graph:this.cbKnightGraph(t),value:2.7,abbrev:"N",initial:[{s:1,p:12},{s:1,p:17},{s:-1,p:82},{s:-1,p:87}]},5:{name:"bishop",aspect:"fr-bishop",graph:this.cbBishopGraph(t),value:3.2,abbrev:"B",initial:[{s:1,p:13},{s:1,p:16},{s:-1,p:83},{s:-1,p:86}]},6:{name:"rook",aspect:"fr-rook",graph:this.cbRookGraph(t),value:5,abbrev:"R",initial:[{s:1,p:11},{s:1,p:18},{s:-1,p:81},{s:-1,p:88}],castle:!0},7:{name:"queen",aspect:"fr-queen",graph:this.cbQueenGraph(t),value:8,abbrev:"Q",initial:[{s:1,p:14},{s:-1,p:84}]},8:{name:"king",aspect:"fr-king",isKing:!0,graph:this.cbKingGraph(t),abbrev:"K",initial:[{s:1,p:15},{s:-1,p:85}]},9:{name:"elephant",aspect:"fr-elephant",graph:e,value:2.6,abbrev:"E",initial:[{s:1,p:10},{s:1,p:19},{s:-1,p:80},{s:-1,p:89}]},10:{name:"cannon",aspect:"fr-cannon2",graph:this.cbXQCannonGraph(t),value:4.9,abbrev:"C",initial:[{s:1,p:0},{s:1,p:9},{s:-1,p:90},{s:-1,p:99}]}},castle:{"15/11":{k:[14,13],r:[12,13,14],n:"O-O-O"},"15/18":{k:[16,17],r:[17,16],n:"O-O"},"85/81":{k:[84,83],r:[82,83,84],n:"O-O-O"},"85/88":{k:[86,87],r:[87,86],n:"O-O"}},promote:function(e,i,r){return 2==i.t?[0]:3==i.t?[1]:0==i.t&&9==t.R(r.t)?[4,5,6,7,9,10]:1==i.t&&0==t.R(r.t)?[4,5,6,7,9,10]:[]}}}}();