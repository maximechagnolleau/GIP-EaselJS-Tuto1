(function() {

	var clouds = []; // tableau de nuages
	
	// Initialisation
	$(document).ready(function() {
		init();
	});
	
	// Fonction d'initialisation
	this.init = function() {
		prepareStage();
		addRoundRects();
		addCircles();
		addBitmaps();
		addTitle();
		addMenu();
		startTicker(30);
	};
	
	// Préparer le stage et instancier EaselJsUtils
	this.prepareStage = function() {
		this.canvas = $('#gipCanvas').get(0);
		this.stage = new createjs.Stage(this.canvas);
		this.stage.enableMouseOver(30); // activer la gestion des événement de survol de la souris
		easelJsUtils = new EaselJsUtils(this.stage);
	};
	
	// Ajouter les formes "rectangles coins arrondis"
	this.addRoundRects = function() {
		easelJsUtils.createRoundRect(750, 100, 100, 400, [65, 136, 178], {opacity: 0.2});
		easelJsUtils.createRoundRect(-20, 210, 100, 290, [106, 10, 171], {opacity: 0.1, radius: 30});
	};
	
	// Ajouter les formes "cercles"
	this.addCircles = function() {
		easelJsUtils.createCircle(750, 550, 180, [65, 136, 178], {opacity: 0.4});
		easelJsUtils.createCircle(550, 550, 100, [106, 10, 171], {opacity: 0.2});
		easelJsUtils.createCircle(50, 500, 200, [65, 136, 178], {opacity: 0.5});
	};
	
	// Ajouter les bitmaps
	this.addBitmaps = function() {
		// Ajout des blocs "herbe"
		for (var i = -30; i<830; i+=101) {
			easelJsUtils.createGrassBlock(i, 500);
		}
		// Ajout des éléments de décor
		easelJsUtils.createShortTree(25, 410);
		easelJsUtils.createRock(-20, 435, {scale:[0.8, 0.8]});
		easelJsUtils.createRock(690, 480, {scale:[0.5, 0.5]});
		easelJsUtils.createTallTree(710, 405);
		// Ajout des cochons
		easelJsUtils.createPig(120, 450);
		easelJsUtils.createPig(620, 480, {scale:[0.7, 0.7]});
		// Ajout des nuages
		clouds.push(easelJsUtils.createCloud(10, 20));
		clouds.push(easelJsUtils.createCloud(500, 100, {scale:[0.7, 0.7]}));
	};
	
	// Afficher le titre
	this.addTitle = function() {
		easelJsUtils.createText("game in progress", "66px umberto", 400, 80, {color: '#FF4040', textAlign: 'center'});
	};
	
	// Afficher les entrées du menu
	this.addMenu = function() {
		var txtJouer = easelJsUtils.createText("Jouer", "bold 40px impact", 400, 240, {color: '#FFAA00', textAlign: 'center', cursor: 'pointer'});
		txtJouer.addEventListener('mouseover', handleTextOver);
		txtJouer.addEventListener('mouseout', handleTextOut);
		txtJouer.addEventListener('click', function(){alert("JOUER !");});
		
		var txtOptions = easelJsUtils.createText("Options", "bold 40px impact", 400, 300, {color: '#FFAA00', textAlign: 'center', cursor: 'pointer'});
		txtOptions.addEventListener('mouseover', handleTextOver);
		txtOptions.addEventListener('mouseout', handleTextOut);
		txtOptions.addEventListener('click', function(){alert("OPTIONS !");});
		
		var txtAide = easelJsUtils.createText("Aide", "bold 40px impact", 400, 360, {color: '#FFAA00', textAlign: 'center', cursor: 'pointer'});
		txtAide.addEventListener('mouseover', handleTextOver);
		txtAide.addEventListener('mouseout', handleTextOut);
		txtAide.addEventListener('click', function(){alert("AIDE !");});
	};
	
	// Evenement mouseover sur le texte
	this.handleTextOver = function(evt) {
		evt.target.scaleX = 1.2;
		evt.target.scaleY = 1.2;
	};
	
	// Evenement mouseout sur le texte
	this.handleTextOut = function(evt) {
		evt.target.scaleX = 1;
		evt.target.scaleY = 1;
	};
	
	// Démarrer le ticker
	this.startTicker = function(fps) {
		createjs.Ticker.setFPS(fps);
		createjs.Ticker.addEventListener("tick", function(){
			clouds.forEach(function(cloud){
				cloud.x += 2;
				if (cloud.x > 900) {
					cloud.x = -500;
				}
			});
			this.stage.update();
		});
	};

}());