/*
 * Copyright(c) 2013-2014 - jocly.com
 *
 * You are allowed to use and modify this source code as long as it is exclusively for use in the Jocly API. 
 *
 * Original authors: Jocly team
 *
 */
 

(function() {
	
	var geometry = Model.Game.cbBoardGeometryGrid(10,8);
	
	Model.Game.cbDefine = function() {
		
		return {
			
			geometry: geometry,
			
			pieceTypes: {

				0: {
					name: 'pawn-w',
					aspect: 'fr-pawn',
					graph: this.cbPawnGraph(geometry,1),
					value: 1,
					abbrev: '',
					fenAbbrev: 'P',
					epCatch: true,
				},
				
				1: {
					name: 'ipawn-w',
					aspect: 'fr-pawn',
					graph: this.cbInitialPawnGraph(geometry,1),
					value: 1,
					abbrev: '',
					fenAbbrev: 'P',
					initial: [{s:1,p:10},{s:1,p:11},{s:1,p:12},{s:1,p:13},{s:1,p:14},{s:1,p:15},{s:1,p:16},{s:1,p:17},{s:1,p:18},{s:1,p:19}],
					epTarget: true,
				},
				
				2: {
					name: 'pawn-b',
					aspect: 'fr-pawn',
					graph: this.cbPawnGraph(geometry,-1),
					value: 1,
					abbrev: '',
					fenAbbrev: 'P',
					epCatch: true,
				},

				3: {
					name: 'ipawn-b',
					aspect: 'fr-pawn',
					graph: this.cbInitialPawnGraph(geometry,-1),
					value: 1,
					abbrev: '',
					fenAbbrev: 'P',
					initial: [{s:-1,p:60},{s:-1,p:61},{s:-1,p:62},{s:-1,p:63},{s:-1,p:64},{s:-1,p:65},{s:-1,p:66},{s:-1,p:67},{s:-1,p:68},{s:-1,p:69}],
					epTarget: true,
				},
				
				4: {
					name: 'knight',
					aspect: 'fr-knight',
					graph: this.cbKnightGraph(geometry),
					value: 2.9,
					abbrev: 'N',
					initial: [{s:1,p:1},{s:1,p:8},{s:-1,p:71},{s:-1,p:78}],
				},
				
				5: {
					name: 'bishop',
					aspect: 'fr-bishop',
					graph: this.cbBishopGraph(geometry),
					value: 3.1,
					abbrev: 'B',
					initial: [{s:1,p:3},{s:1,p:6},{s:-1,p:73},{s:-1,p:76}],
				},

				6: {
					name: 'rook',
					aspect: 'fr-rook',
					graph: this.cbRookGraph(geometry),
					value: 5,
					abbrev: 'R',
					initial: [{s:1,p:0},{s:1,p:9},{s:-1,p:70},{s:-1,p:79}],
					castle: true,
				},

				7: {
					name: 'queen',
					aspect: 'fr-queen',
					graph: this.cbQueenGraph(geometry),
					value: 9,
					abbrev: 'Q',
					initial: [{s:1,p:4},{s:-1,p:74}],
				},
				
				8: {
					name: 'king',
					aspect: 'fr-king',
					isKing: true,
					graph: this.cbKingGraph(geometry),
					abbrev: 'K',
					initial: [{s:1,p:5},{s:-1,p:75}],
				},
				
				9: {
					name: 'chancellor',
					aspect: 'fr-marshall',							
					graph: this.cbMergeGraphs(geometry,
            			this.cbRookGraph(geometry),
						this.cbKnightGraph(geometry)),
					value: 7.8,
					abbrev: 'C',
					initial: [{s:1,p:7},{s:-1,p:77}],
				},
				
	            10: {
	            	name: 'archbishop',
	            	aspect: 'fr-cardinal',
					graph: this.cbMergeGraphs(geometry,
            			this.cbBishopGraph(geometry),
						this.cbKnightGraph(geometry)),
	            	value: 6,
	            	abbrev: 'A',
	            	initial: [{s:1,p:2},{s:-1,p:72}],
	            },				
			},
			
			promote: function(aGame,piece,move) {
				if(piece.t==1)
					return [0];
				else if(piece.t==3)
					return [2];
				else if(piece.t==0 && geometry.R(move.t)==7)
					return [4,5,6,7,9,10];
				else if(piece.t==2 && geometry.R(move.t)==0)
					return [4,5,6,7,9,10];
				return [];
			},
			
			castle: {
				"5/0": {k:[4,3,2],r:[1,2,3],n:"O-O-O"},
				"5/9": {k:[6,7,8],r:[8,7],n:"O-O"},
				"75/70": {k:[74,73,72],r:[71,72,73],n:"O-O-O"},
				"75/79": {k:[76,77,78],r:[78,77],n:"O-O"},
			},
		};
	}
	
})();