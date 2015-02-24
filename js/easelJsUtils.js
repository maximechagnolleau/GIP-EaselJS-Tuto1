(function(){
	
	var Graphics = createjs.Graphics;
	var Shape = createjs.Shape;
	
	/**
	 * Constructeur
	 */
	EaselJsUtils = function(stage) {
		this.stage = stage;
	};
	
	/**
	 * Classe EaselJsUtils
	 */
	EaselJsUtils.prototype = {
			
			/**
			 * Cr�er et afficher un m�dia
			 * @param String src : source du m�dia
			 * @param Number x : position x
			 * @param Number y : position y
			 * @param Object options : options
			 * - Array scale : �chelle
			 * @returns {Bitmap}
			 */
			createBitmap: function(src, x, y, options) {
				// D�finir la source et la position du m�dia
				var bitmap = new createjs.Bitmap(src);
				bitmap.x = x;
				bitmap.y = y;
				// Appliquer les options
				if (options) {
					// Mise � l'�chelle
					if (options.scale) {
						bitmap.scaleX = options.scale[0];
						bitmap.scaleY = options.scale[1];
					}
				}
				// Ajouter le Bitmap au Stage et le retourner
				this.stage.addChild(bitmap);
				return bitmap;
			},
			
			/**
			 * Cr�er une image "Bloc d'herbe"
			 * @param Number x : position x
			 * @param Number y : position y
			 * @param Object options : options
			 * - Array scale : �chelle
			 * @returns {Bitmap}
			 */
			createGrassBlock: function(x, y, options) {
				return this.createBitmap("img/GrassBlock.png", x, y, options);
			},
			
			/**
			 * Cr�er une image "Arbre - petit"
			 * @param Number x : position x
			 * @param Number y : position y
			 * @param Object options : options
			 * - Array scale : �chelle
			 * @returns {Bitmap}
			 */
			createShortTree: function(x, y, options) {
				return this.createBitmap("img/ShortTree.png", x, y, options);
			},
			
			/**
			 * Cr�er une image "Arbre - grand"
			 * @param Number x : position x
			 * @param Number y : position y
			 * @param Object options : options
			 * - Array scale : �chelle
			 * @returns {Bitmap}
			 */
			createTallTree: function(x, y, options) {
				return this.createBitmap("img/TallTree.png", x, y, options);
			},
			
			/**
			 * Cr�er une image "Rocher"
			 * @param Number x : position x
			 * @param Number y : position y
			 * @param Object options : options
			 * - Array scale : �chelle
			 * @returns {Bitmap}
			 */
			createRock: function(x, y, options) {
				return this.createBitmap("img/Rock.png", x, y, options);
			},
			
			/**
			 * Cr�er une image "Cochon"
			 * @param Number x : position x
			 * @param Number y : position y
			 * @param Object options : options
			 * - Array scale : �chelle
			 * @returns {Bitmap}
			 */
			createPig: function(x, y, options) {
				return this.createBitmap("img/pig.png", x, y, options);
			},
			
			/**
			 * Cr�er une image "Nuage"
			 * @param Number x : position x
			 * @param Number y : position y
			 * @param Object options : options
			 * - Array scale : �chelle
			 * @returns {Bitmap}
			 */
			createCloud: function(x, y, options) {
				return this.createBitmap("img/cloud.png", x, y, options);
			},
			
			/**
			 * Afficher du texte
			 * @param String text : le texte � afficher
			 * @param String font : police d'�criture et style
			 * @param Number x : position x
			 * @param Number y : position y
			 * @param Object options : options
			 * - String color : couleur du texte
			 * - String textAlign : alignement du texte
			 * - String cursor : type de pointeur souris
			 * @returns {Text}
			 */
			createText: function(text, font, x, y, options) {
				// D�finir le texte, la police et la position
				var txt = new createjs.Text();
				txt.font = font;
				txt.text = text;
				txt.x = x;
				txt.y = y;
				// Appliquer les options
				if (options) {
					if (options.color) {
						txt.color = options.color;
					}
					if (options.textAlign) {
						txt.textAlign = options.textAlign;
					}
					if (options.cursor) {
						txt.cursor = options.cursor;
					}
				}
				// Ajouter le Text au Stage et le retourner
				this.stage.addChild(txt);
				return txt;
			},
			
			/**
			 * Dessiner un rectangle avec coins arrondis
			 * @param Number x : position x de la forme
			 * @param Number y : position y de la forme
			 * @param Number w : largeur de la forme
			 * @param Number h : hauteur de la forme
			 * @param Array rgb : couleur de la forme
			 * @param Object options : options
			 * - Number opactiy : opacit� de la forme
			 * - Number radius : rayon des angles de la forme
			 * @returns {Shape}
			 */
			createRoundRect: function(x, y, w, h, rgb, options) {
				// Cr�er la forme
				var graphic = new Graphics();
				var opacity = 1;
				var radius = 90;
				if (options) {
					if (options.opacity) {
						opacity = options.opacity;
					}
					if (options.radius) {
						radius = options.radius;
					}
				}
				graphic.beginFill(Graphics.getRGB(rgb[0], rgb[1], rgb[2], opacity));
				graphic.drawRoundRect(x,  y,  w,  h,  radius);
				// Ajouter la forme au stage
				var shape = new Shape(graphic);
				this.stage.addChild(shape);
				return shape;
			},
			
			/**
			 * Dessiner un cerle
			 * @param Number x : position x de la forme
			 * @param Number y : position y de la forme
			 * @param Number radius : rayon du cercle
			 * @param Array rgb : couleur de la forme
			 * @param Object options : options
			 * - Number opacity : opacit� de la forme
			 * @returns {Shape}
			 */
			createCircle: function(x, y, radius, rgb, options) {
				// Cr�er la forme
				var graphic = new Graphics();
				var opacity = 1;
				if (options) {
					if (options.opacity) {
						opacity = options.opacity;
					}
				}
				graphic.beginFill(Graphics.getRGB(rgb[0], rgb[1], rgb[2], opacity));
				graphic.drawCircle(x, y, radius);
				// Ajouter la forme au stage
				var shape = new Shape(graphic);
				this.stage.addChild(shape);
				return shape;
			}
			
	};
	
}());