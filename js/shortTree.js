(function(){
	
	/**
	 * Constructeur
	 */
	ShortTree = function(body, stage, x, y, scale) {
		this.body = body;		// Body box2d
		this.skin = null;		// Repr�sentation graphique
		this.stage = stage;		// Stage EaselJS
		this.scale = scale;		// Echelle
		this.x = x;				// Position X
		this.y = y;				// Position y
		this.init();			// Initialiser le short tree			
	};
	
	/**
	 * Classe ShortTree
	 */
	ShortTree.prototype = {
		
		init: function() {
			var bitmap = new createjs.Bitmap("img/shortTree.png");	// image associ�e
			// Positionner l'image
			bitmap.x = this.x;
			bitmap.y = this.y;
			// Repositionner le centre de l'image
			bitmap.regX = 50;
			bitmap.regY = 102;
			// Ajouter l'image au Stage
			this.stage.addChild(bitmap);
			// Appliquer la repr�sentation graphique � l'objet
			this.skin = bitmap;
		}
			
	};
	
}());