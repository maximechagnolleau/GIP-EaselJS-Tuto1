(function() {
	
	// EaselJS
	var Ticker = createjs.Ticker;
	var gipCanvas;				//  canvas easeljs
	var stage;					// stage easeljs
	
	// Box2d Web
	var box2dCanvas; // canvas box2d
	var box2dUtils; // classe utilitaire box2d
	var context; 	// contexte 2d
	var SCALE = 30; // �chelle
	var world;		// world box2d
	var canvasWidth, canvasHeight;	// dimensions du canvas
	
	// Gestion de la souris
	var mouseX = undefined; // position x de la souris
	var mouseY = undefined;	// position y de la souris
	var mouseVec; // les coordonn�es de la souris sous forme de vecteur (b2Vec2)
	var isMouseDown = false; // le clic est-il enfonc� ?
	var mouseJoint = false; // la liaison de type "souris"
	var canvasPosition; // la position du canvas
	var selectedBody; // le body s�lectionn�
	var b2Vec2 = Box2D.Common.Math.b2Vec2;
	var b2AABB = Box2D.Collision.b2AABB;
	var b2Body = Box2D.Dynamics.b2Body;
	
	// pigs
	var pigs = [];
	// clouds
	var clouds = [];
	
	// debug box2d ?
	var box2dDebug = false;
	
	// Initialisation
	$(document).ready(function() {
		init();
	});
	
	// Fonction d'initialisation
	this.init = function() {
		prepareStage();		// pr�parer l'environnement graphique
		prepareBox2d();		// pr�parer l'environnement physique
		
		// Graphics
		addRoundRects();	// ajout des "rectangles"
		addCircles();		// ajout des "cercles"
		addGrass();			// ajout d'�l�ments "grass"
		addClouds();		// ajout d'�l�ments "clouds"
		
		// Physics
		addPigs();			// ajout d'�l�ments physiques dynamiques (pigs)
		addShortTrees();	// ajout d'�l�ments physiques statiques (short trees)
		
		// Ajouter les listeners d'�v�nements souris	
		window.addEventListener('mousedown', handleMouseDown);
		window.addEventListener('mouseup', handleMouseUp);
		
		/// Initialiser bouton
		initBtn();
		
		startTicker(30);	// lancer le ticker
	};
	
	// Pr�parer l'environnement graphique
	this.prepareStage = function() {
		// r�cup�rer le canvas GIP
		gipCanvas = $('#gipCanvas').get(0);
		// cr�er le Stage
		stage = new createjs.Stage(gipCanvas);
		// Classe utilitaire EaselJS
		easelJsUtils = new EaselJsUtils(stage);
	};
	
	// Pr�parer l'environnement physique
	this.prepareBox2d = function() {
		box2dCanvas = $('#box2dCanvas').get(0);
		canvasWidth = parseInt(box2dCanvas.width);
		canvasHeight = parseInt(box2dCanvas.height);
		canvasPosition = $(box2dCanvas).position();
		context = box2dCanvas.getContext('2d');
		box2dUtils = new Box2dUtils(SCALE);
		world = box2dUtils.createWorld(context); // box2DWorld
		setWorldBounds(); // d�finir les limites de l'environnement
	};
	
	// Cr�er les limites de l'environnement
	this.setWorldBounds = function() {
		// Cr�er le "sol" et le "plafond" de notre environnement physique
		ground = box2dUtils.createBox(world, 400, canvasHeight - 10, 400, 10, null, true, 'ground');
		ceiling = box2dUtils.createBox(world, 400, -5, 400, 1, null, true, 'ceiling');
		
		// Cr�er les "murs" de notre environnement physique
		leftWall = box2dUtils.createBox(world, -5, canvasHeight, 1, canvasHeight, null, true, 'leftWall');
		leftWall = box2dUtils.createBox(world, canvasWidth + 5, canvasHeight, 1, canvasHeight, null, true, 'leftWall');
	};
	
	// Ajouter les formes "rectangles coins arrondis"
	this.addRoundRects = function() {
		easelJsUtils.createRoundRect(50, 100, 100, 600, [65, 136, 178], {opacity: 0.2});
		easelJsUtils.createRoundRect(-20, 210, 100, 400, [106, 10, 171], {opacity: 0.1, radius: 30});
		easelJsUtils.createRoundRect(300, 210, 100, 400, [65, 136, 178], {opacity: 0.4, radius: 30});
		easelJsUtils.createRoundRect(330, 410, 100, 200, [65, 136, 178], {opacity: 0.2, radius: 30});
	};
	
	// Ajouter les formes "cercles"
	this.addCircles = function() {
		easelJsUtils.createCircle(750, 350, 250, [65, 136, 178], {opacity: 0.4});
		easelJsUtils.createCircle(550, 550, 100, [106, 10, 171], {opacity: 0.2});
		easelJsUtils.createCircle(50, 500, 200, [65, 136, 178], {opacity: 0.5});
	};
	
	// Ajout des nuages
	this.addClouds = function() {
		clouds.push(easelJsUtils.createCloud(10, 20));
		clouds.push(easelJsUtils.createCloud(500, 100, {scale:[0.7, 0.7]}));		
	};
	
	// Ajout des cochons
	this.addPigs = function() {
		// Cr�er 30 "Pigs" plac�s al�atoirement dans l'environnement
		for (var i=0; i<30; i++) {
			var pig = box2dUtils.createPig(world, stage, Math.random() * canvasWidth, Math.random() * canvasHeight - 400 / SCALE);
			pigs.push(pig);	// conserver les cochons dans un tableau
		}
	};
	
	// Ajout des buissons
	this.addShortTrees = function() {
		box2dUtils.createShortTree(world, stage, 300, 400);
		box2dUtils.createShortTree(world, stage, 100, 100);
		box2dUtils.createShortTree(world, stage, 650, 250);
	};
	
	// Ajout des blocs "herbe"
	this.addGrass = function() {
		for (var i = -30; i<830; i+=101) {
			easelJsUtils.createGrassBlock(i, 530);
		}
	};
	
	// D�marrer le ticker
	this.startTicker = function(fps) {
		Ticker.setFPS(fps);
		Ticker.addEventListener("tick", tick);
	};
	
	// Mise � jour de l'environnement
	this.tick = function() {
		
		// Mettre � jour les cochons
		for (var i=0; i < pigs.length; i++) {
			pigs[i].update();
		}
		
		// Mettre � jour les nuages
		clouds.forEach(function(cloud){
			cloud.x += 2;
			if (cloud.x > 900) {
				cloud.x = -500;
			}
		});
		
		// Mouse Down et pas de liaison
		if (isMouseDown && (!mouseJoint)) {
			var body = getBodyAtMouse();
            if (body) {
            	mouseJoint = box2dUtils.createMouseJoint(world, body, mouseX, mouseY);
            	body.SetAwake(true);
            }
        }
        // Liaison existante
		if (mouseJoint) {
        	if (isMouseDown) {
        		mouseJoint.SetTarget(new b2Vec2(mouseX, mouseY));
            } else {
            	world.DestroyJoint(mouseJoint);
            	mouseJoint = null;
            }
        }
		
		// box2d
		world.Step(1 / 15,  10, 10);
		world.DrawDebugData();
		world.ClearForces();
		
		// easelJS
		stage.update();
	};
	
	// Gestion de l'�v�nement "Mouse Down"
	this.handleMouseDown = function(evt) {
		isMouseDown = true;
		handleMouseMove(evt);
		window.addEventListener('mousemove', handleMouseMove);
	}
	
	/** GESTION DE LA SOURIS **/
	
	// Gestion de l'�v�nement "Mouse Up"
	this.handleMouseUp = function(evt) {
		window.removeEventListener('mousemove', handleMouseMove);
		isMouseDown = false;
		mouseX = undefined;
		mouseY = undefined;
	}
	
	// Gestion de l'�v�nement "Mouse Move"
	this.handleMouseMove = function(evt) {
		mouseX = (evt.clientX - canvasPosition.left) / SCALE;
		mouseY = (evt.clientY - canvasPosition.top) / SCALE;
	}
	
	// R�cup�rer le body cliqu�
	this.getBodyAtMouse = function() {
		selectedBody = null;
		mouseVec = new b2Vec2(mouseX, mouseY);
		var aabb = new b2AABB();
		aabb.lowerBound.Set(mouseX, mouseY);
		aabb.upperBound.Set(mouseX, mouseY);
		world.QueryAABB(getBodyCallBack, aabb);
		return selectedBody;
	}
	
	// Callback de getBody -> QueryAABB
	this.getBodyCallBack = function(fixture) {
        if (fixture.GetBody().GetType() != b2Body.b2_staticBody) {
            if (fixture.GetShape().TestPoint(fixture.GetBody().GetTransform(), mouseVec)) {
               selectedBody = fixture.GetBody();
               return false;
            }
        }
        return true;
	}
	
	/** FIN GESTION DE LA SOURIS **/
	
	// Initialisation du bouton de debug
	this.initBtn = function() {
		$('#btnB2d').click(function(){
			box2dDebug = !box2dDebug;
			if (box2dDebug) {
				$(box2dCanvas).css('opacity', 1);
			} else {
				$(box2dCanvas).css('opacity', 0);
			}
		});
	};

}());