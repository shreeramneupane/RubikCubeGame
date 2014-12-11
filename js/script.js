//Rubik Game JavaScript Document
'use strict';

function Game() {
	this.cubes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54];
	this.topViewCount = 0;
	this.groundViewCount = 0;
	this.leftViewCount = 0;
	this.rightViewCount = 0;
	this.frontViewCount = 0;
	this.backViewCount = 0;
	this.viewsWrapperCount = 0;
	this.leftRoterArray = [2, 5, 8, 1, 4, 7, 0, 3, 6]; //one right rotation array of any side
	this.topViewVerticalUpRoterArray = [0, 3, 6, 18, 21, 24, 51, 52, 53, 44, 41, 38]; //one vertical up rotation array for first column of top view 
	this.topViewHorizentalLeftRoterArray = [0, 1, 2, 29, 32, 35, 47, 50, 53, 15, 12, 9]; //one horizontal left rotation array for first row of top view
	this.frontViewHorizentalLeftRoterArray = [9, 10, 11, 36, 37, 38, 27, 28, 29, 18, 19, 20]; //one horizental left rotation array for first row of front 
	this.rotationCount = 0;
	this.constantCubes = []; //a array that save initial array after suffeling the cubes
	var that = this;

	this.setCubesRandomValues = function() {
		that.cubes = [];
		while (that.cubes.length < 54) {
			var create = true;
			var random = Math.floor(Math.random() * 54) + 1;
			if (that.cubes.length > 0) {
				for (var i = 0; i < that.cubes.length; i++) {
					if (that.cubes[i] == random) {
						create = false;
						break;
					}
				}
			}
			if (create == true) {
				that.cubes.push(random);
				that.constantCubes.push(random);
			}
		}
		for (var i = 0; i < 9; i++) {
			console.log(that.constantCubes[i] + "   " + that.cubes[i]);
		}
	}
	this.createViewWrapper = function() {
		for (var i = 0; i < 8; i++) {
			var viewsWrapper = document.createElement("div");
			viewsWrapper.className = "viewsWrapper";
			viewsWrapper.style.height = "297px";
			viewsWrapper.style.width = "174px";
			viewsWrapper.style.float = "left";
			viewsWrapper.style.position = "relative";
			viewsWrapper.style.margin = "20px 38px";
			(document.getElementsByClassName("wrapper")[0]).appendChild(viewsWrapper);
		}
		that.createView("top", "left", "front");
		that.createView("top", "front", "right");
		that.createView("top", "right", "back");
		that.createView("top", "back", "left");
		that.createView("right", "back", "ground");
		that.createView("back", "left", "ground");
		that.createView("left", "front", "ground");
		that.createView("front", "right", "ground");
	}
	//function to create view wrapper
	this.createView = function(side1, side2, side3) {
		var viewsWrapperCount = that.viewsWrapperCount;
		if (side1 == "top") {
			that.createTopGroundView("topView", viewsWrapperCount, side2); //third parameter for block positioning
			that.createLeftRightFrontBackView(side2 + "View", viewsWrapperCount, side1, "first"); //3 & 4 parameter for top & left displacement of view 
			that.createLeftRightFrontBackView(side3 + "View", viewsWrapperCount, side1, "second");
		} else {
			var relativeView;
			if (side1 == "right") relativeView = "left";
			else if (side1 == "back") relativeView = "front";
			else if (side1 == "left") relativeView = "right";
			else if (side1 == "front") relativeView = "back";
			that.createLeftRightFrontBackView(side1 + "View", viewsWrapperCount, side3, "first"); //3 & 4 parameter for top & left displacement of view
			that.createLeftRightFrontBackView(side2 + "View", viewsWrapperCount, side3, "second");
			that.createTopGroundView("groundView", viewsWrapperCount, relativeView); //third parameter for block positioning
		}
		that.viewsWrapperCount++;
	}
	//function to create top and ground view
	this.createTopGroundView = function(viewSide, viewsWrapperCount, relativeSide) {
		var view = document.createElement("div");
		view.className = viewSide;
		view.style.height = "174px";
		view.style.width = "174px";
		view.style.float = "left";
		view.style.position = "absolute";
		(document.getElementsByClassName("viewsWrapper")[that.viewsWrapperCount]).appendChild(view);
		if (viewSide == "topView") {
			view.style.top = "0px";
		} else {
			view.style.top = "123px";
		}
		that.createBlockInView(viewSide, null, relativeSide);
	}
	//function to create left, right, front and back view
	this.createLeftRightFrontBackView = function(viewSide, viewsWrapperCount, relativeView, viewHorizontalLocation) {
		var view = document.createElement("div");
		view.className = viewSide;
		view.style.height = "210px";
		view.style.width = "87px";
		view.style.float = "left";
		view.style.position = "absolute";
		if (relativeView == "top") {
			view.style.top = "87px";
		} else {
			view.style.top = "0px";
		}
		if (viewHorizontalLocation == "first") {
			view.style.left = "0px";
		} else {
			view.style.left = "87px";
		}
		(document.getElementsByClassName("viewsWrapper")[this.viewsWrapperCount]).appendChild(view);
		if (relativeView == "ground" && viewHorizontalLocation == "first") { //condition for position left and right apperance changes in ground view 
			viewHorizontalLocation = "second";
		} else if (relativeView == "ground" && viewHorizontalLocation == "second") {
			viewHorizontalLocation = "first";
		}
		that.createBlockInView(viewSide, viewHorizontalLocation, null);
	}
	//function to create block in view
	this.createBlockInView = function(viewSide, tempPosition, relativeSide) {
		var j; //j variable define index of View in that.cubes[] array
		var left = 0;
		var top = 0;
		var rowCount = 1;
		var changeRow = true;
		if (viewSide == "topView" || viewSide == "groundView") {
			///////////////////////rotation of top and ground view in initial and acive view state
			if (that.topViewCount > 0 && viewSide == "topView" && that.topViewCount != 4) { //to rotate top view in every viewWrapper
				console.log("abc");
				that.rotateView("topView", "right");
			} else if (that.groundViewCount > 0 && viewSide == "groundView" && that.groundViewCount != 4) { //to rotate ground view in viewWrapper
				that.rotateView("groundView", "right");
			}
			if (that.rotationCount > 0) { //condition to know how many times to rotate top 0r ground view while selecting active view
				for (var i = 0; i < that.rotationCount; i++) {
					if (viewSide == "topView") that.rotateView("topView", "right");
					else if (viewSide == "groundView") that.rotateView("groundView", "right");
				}
			} else if (that.topViewCount == 4 && that.groundViewCount == 4 && that.rotationCount == 0) {
				that.cubes = [];
				for (var i = 0; i < 54; i++) {
					that.cubes[i] = that.constantCubes[i];
				}
			}
			///////////////////////////////////////////////////////////////////////end
			for (var i = 0; i < 9; i++) {
				var block = document.createElement("div");
				if (rowCount == 1 && changeRow == true) { //condition to change offsetLeft & Right in every new row
					top = 58;
					left = 0;
					changeRow = false;
				} else if (rowCount == 2 && changeRow == true) {
					top = 87;
					left = 29;
					changeRow = false;
				} else if (rowCount == 3 && changeRow == true) {
					top = 116;
					left = 58;
					changeRow = false;
				}
				block.style.height = "58px";
				block.style.width = "58px";
				block.style.float = "left"
				block.className = viewSide.substr(0, viewSide.indexOf('V'));
				block.style.position = "absolute";
				block.style.top = top + "px";
				block.style.left = left + "px";
				if (viewSide == "topView") {
					j = i;
					(document.getElementsByClassName("topView")[that.topViewCount]).appendChild(block);
				} else {
					j = i + 45;
					(document.getElementsByClassName("groundView")[that.groundViewCount]).appendChild(block);
				}
				var image = document.createElement("img");
				if (that.cubes[j] < 10) image.setAttribute("src", "image/red-top-ground.png");
				else if (that.cubes[j] < 19) image.setAttribute("src", "image/green-top-ground.png");
				else if (that.cubes[j] < 28) image.setAttribute("src", "image/purple-top-ground.png");
				else if (that.cubes[j] < 37) image.setAttribute("src", "image/yellow-top-ground.png");
				else if (that.cubes[j] < 46) image.setAttribute("src", "image/white-top-ground.png");
				else image.setAttribute("src", "image/blue-top-ground.png");
				block.appendChild(image);
				//block.innerHTML = that.cubes[j];
				top -= 29; // to change block positioning of top and ground view
				left += 29;
				if ((i + 1) % 3 == 0) {
					rowCount++;
					changeRow = true;
				}
			}
			if (viewSide == "topView") that.topViewCount++;
			else that.groundViewCount++;
		} else {
			if (tempPosition == "second") top = 58; //view including top and ground's right and left respectively must have certain initial top offset
			for (var i = 0; i < 9; i++) {
				if ((i + 1) % 3 == 0) {
					rowCount++;
					changeRow = true;
				}
				var block = document.createElement("div");
				block.style.height = "70px";
				block.style.width = "29px";
				block.style.float = "left";
				block.className = viewSide.substr(0, viewSide.indexOf('V'));
				block.style.position = "absolute";
				block.style.top = top + "px";
				block.style.left = left + "px";
				if (viewSide == "leftView") {
					j = i + 9;
					(document.getElementsByClassName("leftView")[that.leftViewCount]).appendChild(block);
				} else if (viewSide == "frontView") {
					j = i + 18;
					(document.getElementsByClassName("frontView")[that.frontViewCount]).appendChild(block);
				} else if (viewSide == "rightView") {
					j = i + 27;
					(document.getElementsByClassName("rightView")[that.rightViewCount]).appendChild(block);
				} else {
					j = i + 36;
					(document.getElementsByClassName("backView")[that.backViewCount]).appendChild(block);
				}
				var image = document.createElement("img");
				if (tempPosition == "first") {
					if (that.cubes[j] < 10) image.setAttribute("src", "image/red-left-right.png");
					else if (that.cubes[j] < 19) image.setAttribute("src", "image/green-left-right.png");
					else if (that.cubes[j] < 28) image.setAttribute("src", "image/purple-left-right.png");
					else if (that.cubes[j] < 37) image.setAttribute("src", "image/yellow-left-right.png");
					else if (that.cubes[j] < 46) image.setAttribute("src", "image/white-left-right.png");
					else image.setAttribute("src", "image/blue-left-right.png");
					block.appendChild(image);
					//block.innerHTML = that.cubes[j];
					top += 29;
					left += 29;
					if (rowCount == 1 && changeRow == true) {
						changeRow = false;
					} else if (rowCount == 2 && changeRow == true) {
						top = 41;
						left = 0;
						changeRow = false;
					} else if (rowCount == 3 && changeRow == true) {
						top = 82;
						left = 0;
						changeRow = false;
					}
				} else {
					if (that.cubes[j] < 10) image.setAttribute("src", "image/red-front-back.png");
					else if (that.cubes[j] < 19) image.setAttribute("src", "image/green-front-back.png");
					else if (that.cubes[j] < 28) image.setAttribute("src", "image/purple-front-back.png");
					else if (that.cubes[j] < 37) image.setAttribute("src", "image/yellow-front-back.png");
					else if (that.cubes[j] < 46) image.setAttribute("src", "image/white-front-back.png");
					else image.setAttribute("src", "image/blue-front-back.png");
					block.appendChild(image);
					//block.innerHTML = that.cubes[j];
					top -= 29;
					left += 29;
					if (rowCount == 1 && changeRow == true) {
						changeRow = false;
					} else if (rowCount == 2 && changeRow == true) {
						top = 99;
						left = 0;
						changeRow = false;
					} else if (rowCount == 3 && changeRow == true) {
						top = 140;
						left = 0;
						changeRow = false;
					}
				}
			}
			if (viewSide == "leftView") that.leftViewCount++;
			else if (viewSide == "rightView") that.rightViewCount++;
			else if (viewSide == "frontView") that.frontViewCount++;
			else that.backViewCount++;
		}
	}
	//function to rotate the view 
	this.rotateView = function(view, directionToRotate) {
		var tempCubes = [];
		var rotaterArray = [];
		for (var j = 0; j < 54; j++) {
			tempCubes[j] = that.cubes[j];
		}
		for (var j = 0; j < 9; j++) {
			rotaterArray[j] = that.leftRoterArray[j];
		}
		if (directionToRotate == "right" || directionToRotate == "down") {
			rotaterArray.reverse();
		}
		for (var i = 0; i < 9; i++) {
			switch (view) {
				case "topView":
					that.cubes[i] = tempCubes[rotaterArray[i]];
					break;
				case "leftView":
					that.cubes[i + 9] = tempCubes[rotaterArray[i] + 9];
					break;
				case "frontView":
					that.cubes[i + 18] = tempCubes[rotaterArray[i] + 18];
					break;
				case "rightView":
					that.cubes[i + 27] = tempCubes[rotaterArray[i] + 27];
					break;
				case "backView":
					that.cubes[i + 36] = tempCubes[rotaterArray[i] + 36];
					break;
				case "groundView":
					that.cubes[i + 45] = tempCubes[rotaterArray[i] + 45];
					break;
			}
		}

		for (var i = 0; i < 9; i++) {
			console.log(that.rotationCount + "   apple    " + that.topViewCount + "      " + that.constantCubes[i] + "   " + that.cubes[i]);
		}
	}
	//function to check game win
	this.winGame = function() {
		var win = true;
		var sideFirstCubeIndex = 0;
		for (var side = 1; side < 7; side++) {
			var cubeIndex = 0;
			var position = Math.floor((that.cubes[sideFirstCubeIndex] - 1) / 9);
			for (cubeIndex = sideFirstCubeIndex; cubeIndex < sideFirstCubeIndex + 9; cubeIndex++) {
				if (Math.floor((that.cubes[cubeIndex] - 1) / 9) != position) {
					win = false;
					break;
				}
			}
			if (win == false) {
				console.log("still playing");
				break;
			}
			sideFirstCubeIndex = cubeIndex;
		}
		if (win == true) {
			console.log("Win");
		}
	}
	/*this.clickEventHandler = function(){
		var images = document.getElementsByTagName("img");
		for(var i=0; i<images.length;i++){			
			images[i].src.onclick = (function(pos){				
				return function(){
					console.log(images[pos]);
					//console.log((images[pos].parentNode).parentNode);
				}
			})(i);
		}
	}*/
	var activeViewSelected = false; //boolean to know wheather any View is selected
	var activeSideSelected = false; //boolean to know wheather side in a selected view is selected
	var activeSideName; //contains className of the side contained in selectedActiveSide
	var movementTypeSelected = false; //boolean to know wheather movement type is selected
	var movementType; //variable to know wheather movement is horizental or vertical
	var rowOrColumnNumberSelected = false; //boolean to know wheather row or column in active side is selected
	var rowOrColumnNumber; //variable to know which row, column to move in active side
	document.onkeydown = chooseViewForMovement;

	function chooseViewForMovement(e) {
		switch (e.keyCode) {
			case 49:
				for (var i = 0; i < 9; i++)
				that.createOpacityBackground();
				that.rotationCount = 0;
				that.createView("top", "left", "front");
				break;
			case 50:
				that.createOpacityBackground();
				that.rotationCount = 1;
				that.createView("top", "front", "right");
				break;
			case 51:
				that.createOpacityBackground();
				that.rotationCount = 2;
				that.createView("top", "right", "back");
				break;
			case 52:
				that.createOpacityBackground();
				that.rotationCount = 3;
				that.createView("top", "back", "left");
				break;
			case 53:
				that.createOpacityBackground();
				that.rotationCount = 0;
				that.createView("right", "back", "ground");
				break;
			case 54:
				that.createOpacityBackground();
				that.rotationCount = 1;
				that.createView("back", "left", "ground");
				break;
			case 55:
				that.createOpacityBackground();
				that.rotationCount = 2;
				that.createView("left", "front", "ground");
				break;
			case 56:
				that.createOpacityBackground();
				that.rotationCount = 3;
				that.createView("front", "right", "ground");
				break;
		}
	}

	this.createOpacityBackground = function() {
		var checkOpacityBackground = document.getElementsByClassName("opacityBackground");
		if (checkOpacityBackground.length > 0) {
			that.viewsWrapperCount = 8;
			that.topViewCount = 4;
			that.groundViewCount = 4;
			that.leftViewCount = 4;
			that.rightViewCount = 4;
			that.frontViewCount = 4;
			that.backViewCount = 4;
			that.cubes = [];
			for (var i = 0; i < 54; i++) {
				that.cubes[i] = that.constantCubes[i];
			}
			activeViewSelected = false;
			activeSideSelected = false;
			activeSideName = null;
			movementTypeSelected = false;
			movementType = null;
			rowOrColumnNumber = null;
			rowOrColumnNumberSelected = false;
			(document.getElementsByClassName("wrapper")[0]).removeChild(document.getElementsByClassName("opacityBackground")[0]);
		}
		var opacityBackground = document.createElement("div");
		opacityBackground.className = "opacityBackground";
		opacityBackground.style.height = "100%";
		opacityBackground.style.width = "100%";
		opacityBackground.style.backgroundColor = "rgba(1,1,1,0.8)";
		opacityBackground.style.position = "relative";
		(document.getElementsByClassName("wrapper")[0]).appendChild(opacityBackground);

		document.onkeyup = cancelMovement;

		function cancelMovement(e) {
			if (e.keyCode == 27) try {
				that.viewsWrapperCount = 8;
				that.topViewCount = 4;
				that.groundViewCount = 4;
				that.leftViewCount = 4;
				that.rightViewCount = 4;
				that.frontViewCount = 4;
				that.backViewCount = 4;
				that.cubes = [];
				for (var i = 0; i < 54; i++) {
					that.cubes[i] = that.constantCubes[i];
				}
				that.rotationCount = 0;
				activeViewSelected = false;
				activeSideSelected = false;
				activeSideName = null;
				movementTypeSelected = false;
				movementType = null;
				rowOrColumnNumber = null;
				rowOrColumnNumberSelected = false;
				(document.getElementsByClassName("wrapper")[0]).removeChild(opacityBackground);
			} catch (e) {}
		}
		var activeView = document.createElement("div");
		activeView.className = "viewsWrapper";
		activeView.style.height = "297px";
		activeView.style.width = "174px";
		activeView.style.position = "absolute";
		activeView.style.left = "414px";
		activeView.style.top = "10px";
		(document.getElementsByClassName("opacityBackground")[0]).appendChild(activeView);
		that.cubes = [];
		for (var i = 0; i < 54; i++) {
			that.cubes[i] = that.constantCubes[i];
		}
		activeViewSelected = true;
	}
	document.addEventListener("keydown", selectActiveSide, false);

	function selectActiveSide(e) {
		if (activeViewSelected == true) {
			switch (e.keyCode) {
				case 70:
					that.showActiveSide("first");
					break;
				case 68:
					that.showActiveSide("second");
					break;
				case 83:
					that.showActiveSide("third");
					break;
			}
		}
	}
	this.showActiveSide = function(side) {
		var selectedActiveSide; //contains one of the side in a view
		if (side == "first") {
			selectedActiveSide = (document.getElementsByClassName("viewsWrapper")[8]).children[0]
		} else if (side == "second") {
			selectedActiveSide = (document.getElementsByClassName("viewsWrapper")[8]).children[1]
		} else if (side == "third") {
			selectedActiveSide = (document.getElementsByClassName("viewsWrapper")[8]).children[2]
		}
		var checkActiveSide = document.getElementsByClassName("activeSide");
		if (checkActiveSide.length > 0) {
			activeSideSelected = false;
			activeSideName = null;
			movementTypeSelected = false;
			movementType = null;
			rowOrColumnNumber = null;
			rowOrColumnNumberSelected = false;
			(document.getElementsByClassName("opacityBackground")[0]).removeChild(document.getElementsByClassName("activeSide")[0]);
		}
		var activeSide = document.createElement("div");
		activeSide.className = "activeSide";
		activeSide.style.height = "240px";
		activeSide.style.width = "240px";
		activeSide.style.position = "absolute";
		activeSide.style.left = "381px";
		activeSide.style.top = "360px";
		activeSide.style.float = "left";
		(document.getElementsByClassName("opacityBackground")[0]).appendChild(activeSide);

		for (var i = 0; i < selectedActiveSide.children.length; i++) {
			var image = selectedActiveSide.children[i].children[0].attributes[0].value;
			var color = image.substring(image.indexOf('/') + 1, image.indexOf('-'));
			var block = document.createElement("div");
			block.style.height = "76px";
			block.style.width = "76px";
			block.style.border = "2px solid black";
			block.style.float = "left";
			block.style.backgroundColor = color;
			block.style.position = "relative";
			activeSide.appendChild(block);
		}
		activeSideName = selectedActiveSide.attributes[0].value;
		console.log(activeSideName);
		activeSideSelected = true;
	}

	window.addEventListener("keydown", selectMovementType, false);

	function selectMovementType(e) {
		if (activeSideSelected == true) {
			switch (e.keyCode) {
				case 189:
					that.focusMovementType("horizental")
					break;
				case 220:
					that.focusMovementType("vertical")
					break;
			}
		}
	}
	this.focusMovementType = function(movement) {
		rowOrColumnNumberSelected = false;
		movementType = movement;
		rowOrColumnNumber = null;
		movementTypeSelected = true;
		console.log(movementType);
	}

	window.addEventListener("keydown", selectRowOrColumnToRotate, false);

	function selectRowOrColumnToRotate(e) {
		if (movementTypeSelected == true) {
			switch (e.keyCode) {
				case 84:
					that.focusSelectedRowOrColumnToRotate("first");
					break;
				case 82:
					that.focusSelectedRowOrColumnToRotate("second");
					break;
				case 69:
					that.focusSelectedRowOrColumnToRotate("third");
					break;
			}
		}
	}
	this.focusSelectedRowOrColumnToRotate = function(selectedNumber) {
		rowOrColumnNumber = selectedNumber;
		rowOrColumnNumberSelected = true;
		console.log(rowOrColumnNumber);
	}

	window.addEventListener("keydown", selectDirectionForMovement, false);

	function selectDirectionForMovement(e) {
		if (rowOrColumnNumberSelected == true && movementType == "horizental") {
			switch (e.keyCode) {
				case 37:
					that.performMovement("left");
					break;
				case 39:
					that.performMovement("right");
					break;
			}
		} else if (rowOrColumnNumberSelected == true && movementType == "vertical") {
			switch (e.keyCode) {
				case 38:
					that.performMovement("up")
					break;
				case 40:
					that.performMovement("down")
					break;
			}
		}
	}
	this.performMovement = function(side) {
		console.log(activeSideName + " " + movementType + "  " + rowOrColumnNumber + " " + side);
		if (activeSideName == "topView" && movementType == "vertical" && rowOrColumnNumber == "first") {
			if (rowOrColumnNumber != "second") that.rotateView("leftView", side);
			that.verticalRotationForTopFrontGroundBackView("topView", side);
		}
		if (activeSideName == "topView" && movementType == "horizental" && rowOrColumnNumber == "first") {
			that.rotateView("backView", side);
			that.horizontalRotationForTopFrontAndVerticalForLeftRightView("topView", side)
		}
		if (activeSideName == "frontView" && movementType == "horizental" && rowOrColumnNumber == "first") {
			that.rotateView("topView", side);
			that.horizontalRotationForLeftRightFrontBackView("frontView", side);
		}
		that.constantCubes = [];
		for (var i = 0; i < 54; i++) {
			that.constantCubes[i] = that.cubes[i];
		}
		(document.getElementsByTagName("body")[0]).removeChild(document.getElementsByClassName("wrapper")[0]);
		var wrapper = document.createElement("div");
		wrapper.className = "wrapper";
		(document.getElementsByTagName("body")[0]).appendChild(wrapper);
		that.topViewCount = 0;
		that.groundViewCount = 0;
		that.leftViewCount = 0;
		that.rightViewCount = 0;
		that.frontViewCount = 0;
		that.backViewCount = 0;
		that.viewsWrapperCount = 0;
		that.createViewWrapper();
	}

	this.verticalRotationForTopFrontGroundBackView = function(view, directionToRotate) {
		var tempCubes = [];
		var rotaterArray = [];
		for (var j = 0; j < 54; j++) {
			tempCubes[j] = that.cubes[j];
		}
		for (var j = 0; j < 12; j++) {
			rotaterArray[j] = that.topViewVerticalUpRoterArray[j];
		}
		if (directionToRotate == "down") {
			rotaterArray.reverse();
		}
		for (var i = 0; i < 12; i++) {
			if (i < 9) that.cubes[rotaterArray[i]] = tempCubes[rotaterArray[i + 3]];
			else that.cubes[rotaterArray[i]] = tempCubes[rotaterArray[i - 9]];
		}
	}

	this.horizontalRotationForTopFrontAndVerticalForLeftRightView = function(view, directionToRotate) {
		var tempCubes = [];
		var rotaterArray = [];
		for (var j = 0; j < 54; j++) {
			tempCubes[j] = that.cubes[j];
		}
		for (var j = 0; j < 12; j++) {
			rotaterArray[j] = that.topViewHorizentalLeftRoterArray[j];
		}
		if (directionToRotate == "down" || directionToRotate == "right") {
			rotaterArray.reverse();
		}
		for (var i = 0; i < 12; i++) {
			if (i < 9) that.cubes[rotaterArray[i]] = tempCubes[rotaterArray[i + 3]];
			else that.cubes[rotaterArray[i]] = tempCubes[rotaterArray[i - 9]];
		}
	}

	this.horizontalRotationForLeftRightFrontBackView = function(view, directionToRotate) {
		var tempCubes = [];
		var rotaterArray = [];
		for (var j = 0; j < 54; j++) {
			tempCubes[j] = that.cubes[j];
		}
		for (var j = 0; j < 12; j++) {
			rotaterArray[j] = that.frontViewHorizentalLeftRoterArray[j];
		}
		if (directionToRotate == "right") {
			rotaterArray.reverse();
		}
		for (var i = 0; i < 12; i++) {
			if (i < 9) that.cubes[rotaterArray[i]] = tempCubes[rotaterArray[i + 3]];
			else that.cubes[rotaterArray[i]] = tempCubes[rotaterArray[i - 9]]
		}
	}
}

var game = new Game();
game.setCubesRandomValues(); //toggle the cube to initiate stage
game.createViewWrapper();
game.winGame();
//game.clickEventHandler();