//Rubik Game JavaScript Document
'use strict';

function Game() {
	this.cubes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54];
	this.topSideCount = 0;
	this.groundSideCount = 0;
	this.leftSideCount = 0;
	this.rightSideCount = 0;
	this.frontSideCount = 0;
	this.backSideCount = 0;
	this.viewsWrapperCount = 0;
	this.leftRoterArray = [2, 5, 8, 1, 4, 7, 0, 3, 6]; //one right rotation array of any side
	this.verticalUpTopSideRoterFirstArray = [0, 3, 6, 18, 21, 24, 51, 52, 53, 44, 41, 38]; //one vertical up rotation array for first column of top, front, back side and horizental third row for ground side 
	this.verticalUpTopSideRoterSecondArray = [1, 4, 7, 19, 22, 25, 48, 49, 50, 43, 40, 37];
	this.verticalUpTopSideRoterThirdArray = [2, 5, 8, 20, 23, 26, 45, 46, 47, 42, 39, 36];
	this.horizentalLeftTopSideRoterFirstArray = [0, 1, 2, 29, 32, 35, 47, 50, 53, 15, 12, 9]; //one horizontal left rotation array for first row of top side and vertical down for leftSide and vertical up for rightSide and vertical for third column of ground side
	this.horizentalLeftTopSideRoterSecondArray = [3, 4, 5, 28, 31, 34, 46, 49, 52, 16, 13, 10];
	this.horizentalLeftTopSideRoterThirdArray = [6, 7, 8, 27, 30, 33, 45, 48, 51, 17, 14, 11];
	this.horizentalLeftFrontSideRoterFirstArray = [9, 10, 11, 18, 19, 20, 27, 28, 29, 36, 37, 38]; //one horizental left rotation array for first row of front, back, left and right side
	this.horizentalLeftFrontSideRoterSecondArray = [12, 13, 14, 21, 22, 23, 30, 31, 32, 39, 40, 41];
	this.horizentalLeftFrontSideRoterThirdArray = [15, 16, 17, 24, 25, 26, 33, 34, 35, 42, 43, 44];
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
			}
		}
                that.constantCubes = that.cubes.slice(0);
	}
	//function to create view
	this.createViews = function() {
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
		that.createSides("top", "left", "front");
		that.createSides("top", "front", "right");
		that.createSides("top", "right", "back");
		that.createSides("top", "back", "left");
		that.createSides("right", "back", "ground");
		that.createSides("back", "left", "ground");
		that.createSides("left", "front", "ground");
		that.createSides("front", "right", "ground");
	}
	//function to create side
	this.createSides = function(side1, side2, side3) {
		if (side1 == "top") {
			that.createTopGroundSide("topSide");
			that.createLeftRightFrontBackSide(side2 + "Side", side1, "first"); //2 & 3 parameter for top & left displacement of view 
			that.createLeftRightFrontBackSide(side3 + "Side", side1, "second");
		} else {
			that.createLeftRightFrontBackSide(side1 + "Side", side3, "first"); //2 & 3 parameter for top & left displacement of view
			that.createLeftRightFrontBackSide(side2 + "Side", side3, "second");
			that.createTopGroundSide("groundSide"); //third parameter for block positioning
		}
		that.viewsWrapperCount++;
	}
	//function to create top and ground side
	this.createTopGroundSide = function(viewSide) {
		var side = document.createElement("div");
		side.className = viewSide;
		side.style.height = "174px";
		side.style.width = "174px";
		side.style.float = "left";
		side.style.position = "absolute";
		(document.getElementsByClassName("viewsWrapper")[that.viewsWrapperCount]).appendChild(side);
		if (viewSide == "topSide") {
			side.style.top = "0px";
		} else {
			side.style.top = "123px";
		}
		that.createBlockinTopGroundSide(viewSide);
	}
	//function to create left, right, front and back side
	this.createLeftRightFrontBackSide = function(viewSide, relativeSide, viewHorizontalLocation) {
		var side = document.createElement("div");
		side.className = viewSide;
		side.style.height = "210px";
		side.style.width = "87px";
		side.style.float = "left";
		side.style.position = "absolute";
		if (relativeSide == "top") {
			side.style.top = "87px";
		} else {
			side.style.top = "0px";
		}
		if (viewHorizontalLocation == "first") {
			side.style.left = "0px";
		} else {
			side.style.left = "87px";
		}
		(document.getElementsByClassName("viewsWrapper")[this.viewsWrapperCount]).appendChild(side);
		if (relativeSide == "ground" && viewHorizontalLocation == "first") { //condition for position left and right apperance changes in ground view 
			viewHorizontalLocation = "second";
		} else if (relativeSide == "ground" && viewHorizontalLocation == "second") {
			viewHorizontalLocation = "first";
		}
		that.createBlockinLeftRightFrontBackSide(viewSide, viewHorizontalLocation);
	}
	//function to create block in top and ground side
	this.createBlockinTopGroundSide = function(viewSide) {
		var j; //j variable define index of side in that.cubes[] array
		var left = 0;
		var top = 0;
		var rowCount = 1;
		var changeRow = true;
		///////////////////////rotation of top and ground side in initial and acive side state
		if (that.topSideCount > 0 && viewSide == "topSide" && that.topSideCount != 4) { //to rotate top side in every viewWrapper
			that.rotateSide("topSide", "right");
		} else if (that.groundSideCount > 0 && viewSide == "groundSide" && that.groundSideCount != 4) { //to rotate ground side in viewWrapper
			that.rotateSide("groundSide", "left");
		}
		if (that.rotationCount > 0) { //condition to know how many times to rotate top or ground side while selecting active side
			for (var i = 0; i < that.rotationCount; i++) {
				if (viewSide == "topSide") that.rotateSide("topSide", "right");
				else if (viewSide == "groundSide") that.rotateSide("groundSide", "left");
			}
		} else if (that.topSideCount == 4 && that.groundSideCount == 4 && that.rotationCount == 0) {
			that.cubes = [];
			that.cubes = that.constantCubes.slice(0);
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
			block.className = viewSide.substr(0, viewSide.indexOf('S'));
			block.style.position = "absolute";
			block.style.top = top + "px";
			block.style.left = left + "px";
			if (viewSide == "topSide") {
				j = i;
				(document.getElementsByClassName("topSide")[that.topSideCount]).appendChild(block);
			} else {
				j = i + 45;
				(document.getElementsByClassName("groundSide")[that.groundSideCount]).appendChild(block);
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
		if (viewSide == "topSide") that.topSideCount++;
		else that.groundSideCount++;
	}
	//function to create block in left, right, front and ground side
	this.createBlockinLeftRightFrontBackSide = function(viewSide, tempPosition) {
		var j; //j variable define index of side in that.cubes[] array
		var left = 0;
		var top = 0;
		var rowCount = 1;
		var changeRow = true;
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
			if (viewSide == "leftSide") {
				j = i + 9;
				(document.getElementsByClassName("leftSide")[that.leftSideCount]).appendChild(block);
			} else if (viewSide == "frontSide") {
				j = i + 18;
				(document.getElementsByClassName("frontSide")[that.frontSideCount]).appendChild(block);
			} else if (viewSide == "rightSide") {
				j = i + 27;
				(document.getElementsByClassName("rightSide")[that.rightSideCount]).appendChild(block);
			} else {
				j = i + 36;
				(document.getElementsByClassName("backSide")[that.backSideCount]).appendChild(block);
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
		if (viewSide == "leftSide") that.leftSideCount++;
		else if (viewSide == "rightSide") that.rightSideCount++;
		else if (viewSide == "frontSide") that.frontSideCount++;
		else that.backSideCount++;

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

	var activeViewSelected = false; //boolean to know wheather any View is selected
	var activeSideSelected = false; //boolean to know wheather side in a selected view is selected
	var activeSideName; //contains className of the side contained in selectedActiveSide
	var movementTypeSelected = false; //boolean to know wheather movement type is selected
	var movementType; //variable to know wheather movement is horizental or vertical
	var rowOrColumnNumberSelected = false; //boolean to know wheather row or column in active side is selected
	var rowOrColumnNumber; //variable to know which row, column to move in active side

	document.onkeydown = keyboardEventHandler;

	function keyboardEventHandler(e) {
		switch (e.keyCode) {
			case 49:
				for (var i = 0; i < 9; i++)
				that.createOpacityBackground();
				that.rotationCount = 0;
				that.createSides("top", "left", "front");
				break;
			case 50:
				that.createOpacityBackground();
				that.rotationCount = 1;
				that.createSides("top", "front", "right");
				break;
			case 51:
				that.createOpacityBackground();
				that.rotationCount = 2;
				that.createSides("top", "right", "back");
				break;
			case 52:
				that.createOpacityBackground();
				that.rotationCount = 3;
				that.createSides("top", "back", "left");
				break;
			case 53:
				that.createOpacityBackground();
				that.rotationCount = 0;
				that.createSides("right", "back", "ground");
				break;
			case 54:
				that.createOpacityBackground();
				that.rotationCount = 1;
				that.createSides("back", "left", "ground");
				break;
			case 55:
				that.createOpacityBackground();
				that.rotationCount = 2;
				that.createSides("left", "front", "ground");
				break;
			case 56:
				that.createOpacityBackground();
				that.rotationCount = 3;
				that.createSides("front", "right", "ground");
				break;
                        case 27:
                                that.cancelEventHandle();
                                break;
		
		}
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

			if (activeSideSelected == true) {
				switch (e.keyCode) {
					case 189:
						that.focusMovementType("horizental")
						break;
					case 220:
						that.focusMovementType("vertical")
						break;
				}

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
			}
		}
	}

	this.cancelEventHandle = function() {
		try {
			that.variablesInitialization();
			(document.getElementsByTagName("body")[0]).removeChild(document.getElementsByClassName("opacityBackground")[0]);
		} catch (e) {}
	}
	//function to be initizatile the varibles for opacity background creation
	this.variablesInitialization = function() {
		that.viewsWrapperCount = 8;
		that.topSideCount = 4;
		that.groundSideCount = 4;
		that.leftSideCount = 4;
		that.rightSideCount = 4;
		that.frontSideCount = 4;
		that.backSideCount = 4;
		that.cubes = [];
		that.cubes = that.constantCubes.slice(0); //as top and ground side are rotated when view other then 1 and 5 is choosen
		that.rotationCount = 0;
		activeViewSelected = false;
		activeSideSelected = false;
		activeSideName = null;
		movementTypeSelected = false;
		movementType = null;
		rowOrColumnNumber = null;
		rowOrColumnNumberSelected = false;
	}
	//function to create opacityBackground and viewsWrapper in the opacityBackground 
	this.createOpacityBackground = function() {
		var checkOpacityBackground = document.getElementsByClassName("opacityBackground");
		if (checkOpacityBackground.length > 0) {
			that.variablesInitialization();
			(document.getElementsByTagName("body")[0]).removeChild(document.getElementsByClassName("opacityBackground")[0]);
		}
		var opacityBackground = document.createElement("div");
		opacityBackground.className = "opacityBackground";
		opacityBackground.style.height = "100%";
		opacityBackground.style.width = "100%";
		opacityBackground.style.backgroundColor = "rgba(1,1,1,0.8)";
		opacityBackground.style.position = "absolute";
		opacityBackground.style.top = "0px";
		opacityBackground.style.left = "0px";
		(document.getElementsByTagName("body")[0]).appendChild(opacityBackground);

		var activeView = document.createElement("div");
		activeView.className = "viewsWrapper";
		activeView.style.height = "297px";
		activeView.style.width = "174px";
		activeView.style.position = "absolute";
		activeView.style.margin = "auto";
		activeView.style.top = "0px";
		activeView.style.left = "0px";
		activeView.style.buttom = "0px";
		activeView.style.right = "0px";
		(document.getElementsByClassName("opacityBackground")[0]).appendChild(activeView);
		that.cubes = [];
		that.cubes = that.constantCubes.slice(0); //as top and ground side are rotated when view other then 1 and 5 is choosen
		activeViewSelected = true;
	}

	this.showActiveSide = function(position) {
		var selectedActiveSide; //contains one of the side in a view
		if (position == "first") {
			selectedActiveSide = (document.getElementsByClassName("viewsWrapper")[8]).children[0]
		} else if (position == "second") {
			selectedActiveSide = (document.getElementsByClassName("viewsWrapper")[8]).children[1]
		} else if (position == "third") {
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
		activeSide.style.margin = "auto";
		activeSide.style.top = "320px";
		activeSide.style.left = "0px";
		activeSide.style.buttom = "0px";
		activeSide.style.right = "0px";
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
			activeSide.appendChild(block);
		}
		activeSideName = selectedActiveSide.attributes[0].value;
		console.log(activeSideName);
		activeSideSelected = true;
	}

	this.focusMovementType = function(movement) {
		rowOrColumnNumberSelected = false;
		movementType = movement;
		rowOrColumnNumber = null;
		movementTypeSelected = true;
		console.log(movementType);
	}

	this.focusSelectedRowOrColumnToRotate = function(selectedNumber) {
		rowOrColumnNumber = selectedNumber;
		rowOrColumnNumberSelected = true;
		console.log(rowOrColumnNumber);
	}
	//json array to parse the various condition of movement
	var moveSpec = [{
		sideName: "topSide",
		movement: [{
			type: "horizental",
			kind: "1",
			rowOrColumn: [{
				number: "third",
				sideToRotate: "frontSide",
				directionToRotate: "left"
			}, {
				number: "first",
				sideToRotate: "backSide",
				directionToRotate: "right"
			}]
		}, {
			type: "vertical",
			kind: "2",
			rowOrColumn: [{
				number: "first",
				sideToRotate: "leftSide",
				directionToRotate: "left"
			}, {
				number: "third",
				sideToRotate: "rightSide",
				directionToRotate: "right"
			}]
		}]
	}, {
		sideName: "leftSide",
		movement: [{
			type: "vertical",
			kind: "1",
			rowOrColumn: [{
				number: "first",
				sideToRotate: "backSide",
				directionToRotate: "left"
			}, {
				number: "third",
				sideToRotate: "frontSide",
				directionToRotate: "right"
			}]
		}, {
			type: "horizental",
			kind: "3",
			rowOrColumn: [{
				number: "first",
				sideToRotate: "topSide",
				directionToRotate: "right"
			}, {
				number: "third",
				sideToRotate: "groundSide",
				directionToRotate: "left"
			}]
		}]
	}, {
		sideName: "frontSide",
		movement: [{
			type: "vertical",
			kind: "2",
			rowOrColumn: [{
				number: "first",
				sideToRotate: "leftSide",
				directionToRotate: "left"
			}, {
				number: "third",
				sideToRotate: "rightSide",
				directionToRotate: "right"
			}]
		}, {
			type: "horizental",
			kind: "3",
			rowOrColumn: [{
				number: "first",
				sideToRotate: "topSide",
				directionToRotate: "right"
			}, {
				number: "third",
				sideToRotate: "groundSide",
				directionToRotate: "left"
			}]
		}]
	}, {
		sideName: "rightSide",
		movement: [{
			type: "vertical",
			kind: "1",
			rowOrColumn: [{
				number: "first",
				sideToRotate: "frontSide",
				directionToRotate: "left"
			}, {
				number: "third",
				sideToRotate: "backSide",
				directionToRotate: "right"
			}]
		}, {
			type: "horizental",
			kind: "3",
			rowOrColumn: [{
				number: "first",
				sideToRotate: "topSide",
				directionToRotate: "right"
			}, {
				number: "third",
				sideToRotate: "groundSide",
				directionToRotate: "left"
			}]
		}]
	}, {
		sideName: "backSide",
		movement: [{
			type: "vertical",
			kind: "2",
			rowOrColumn: [{
				number: "first",
				sideToRotate: "rightSide",
				directionToRotate: "left"
			}, {
				number: "third",
				sideToRotate: "leftSide",
				directionToRotate: "right"
			}]
		}, {
			type: "horizental",
			kind: "3",
			rowOrColumn: [{
				number: "first",
				sideToRotate: "topSide",
				directionToRotate: "right"
			}, {
				number: "third",
				sideToRotate: "groundSide",
				directionToRotate: "left"
			}]
		}]
	}, {
		sideName: "groundSide",
		movement: [{
			type: "vertical",
			kind: "1",
			rowOrColumn: [{
				number: "first",
				sideToRotate: "frontSide",
				directionToRotate: "left"
			}, {
				number: "third",
				sideToRotate: "backSide",
				directionToRotate: "right"
			}]
		}, {
			type: "horizental",
			kind: "2",
			rowOrColumn: [{
				number: "first",
				sideToRotate: "rightSide",
				directionToRotate: "right"
			}, {
				number: "third",
				sideToRotate: "leftSide",
				directionToRotate: "left"
			}]
		}]
	}];
	this.performMovement = function(directionToRotate) {
		var movementPerformed = false; //boolean to stop parsing Json when movement is performed
                that.cubes = [];
		that.cubes = that.constantCubes.slice(0); //as top and ground side are rotated when view other then 1 and 5 is choosen
		for (var k = 0; k < moveSpec.length; k++) {
			for (var i = 0; i < 2; i++) {
				for (var j = 0; j < 2; j++) {
					if (moveSpec[k].sideName == activeSideName && moveSpec[k].movement[i].type == movementType && moveSpec[k].movement[i].rowOrColumn[j].number == rowOrColumnNumber) {
						//the JSON array above is for left or up key is pressed so valid for those condition only and need change for down and right key presses condition
                                                if (directionToRotate == "left" || directionToRotate == "up") {
							that.rotateSide(moveSpec[k].movement[i].rowOrColumn[j].sideToRotate, moveSpec[k].movement[i].rowOrColumn[j].directionToRotate);
							break;
						} else if (directionToRotate == "right" || directionToRotate == "down") {
							if (moveSpec[k].movement[i].rowOrColumn[j].directionToRotate == "left") {
								that.rotateSide(moveSpec[k].movement[i].rowOrColumn[j].sideToRotate, "right");
								break;
							} else if (moveSpec[k].movement[i].rowOrColumn[j].directionToRotate == "right") {
								that.rotateSide(moveSpec[k].movement[i].rowOrColumn[j].sideToRotate, "left");
								break;
							}
						}
					}
				}
				if (moveSpec[k].sideName == activeSideName && moveSpec[k].movement[i].type == movementType) {
					//console.log(moveSpec[k].movement[i].kind);
					if (moveSpec[k].movement[i].kind == "2") {
						that.verticalRotationForTopFrontBackAndHorizentalForGroundSide(directionToRotate);
						movementPerformed = true;
						break;
					} else if (moveSpec[k].movement[i].kind == "1") {
						that.horizontalRotationForTopAndVerticalForLeftRightGroundSide(directionToRotate);
						movementPerformed = true;
						break;
					} else if (moveSpec[k].movement[i].kind == "3") {
						that.horizontalRotationForLeftRightFrontBackSide(directionToRotate);
						movementPerformed = true;
						break;
					}
				}
			}
			if (movementPerformed == true) {
				break;
			}
		}
		that.constantCubes = [];
		that.constantCubes = that.cubes.slice(0); // now the cubes value are changed after movement that must be saved in constantCubes for further reference
		(document.getElementsByTagName("body")[0]).removeChild(document.getElementsByClassName("opacityBackground")[0]);
		(document.getElementsByTagName("body")[0]).removeChild(document.getElementsByClassName("wrapper")[0]);                
                that.variablesInitialization();
		var wrapper = document.createElement("div");
		wrapper.className = "wrapper";
		(document.getElementsByTagName("body")[0]).appendChild(wrapper);
		that.topSideCount = 0;
		that.groundSideCount = 0;
		that.leftSideCount = 0;
		that.rightSideCount = 0;
		that.frontSideCount = 0;
		that.backSideCount = 0;
		that.viewsWrapperCount = 0;
                that.rotationCount = 0;
		that.createViews();
                that.winGame();
	}
	//function to rotate the side 
	this.rotateSide = function(side, directionToRotate) {
		var tempCubes = [];
		var rotaterArray = [];
		tempCubes = that.cubes.slice(0);
		rotaterArray = that.leftRoterArray.slice(0);
		if (directionToRotate == "right" || directionToRotate == "down") {
			rotaterArray.reverse();
		}
		for (var i = 0; i < 9; i++) {
			switch (side) {
				case "topSide":
					that.cubes[i] = tempCubes[rotaterArray[i]];
					break;
				case "leftSide":
					that.cubes[i + 9] = tempCubes[rotaterArray[i] + 9];
					break;
				case "frontSide":
					that.cubes[i + 18] = tempCubes[rotaterArray[i] + 18];
					break;
				case "rightSide":
					that.cubes[i + 27] = tempCubes[rotaterArray[i] + 27];
					break;
				case "backSide":
					that.cubes[i + 36] = tempCubes[rotaterArray[i] + 36];
					break;
				case "groundSide":
					that.cubes[i + 45] = tempCubes[rotaterArray[i] + 45];
					break;
			}
		}
	}

	this.verticalRotationForTopFrontBackAndHorizentalForGroundSide = function(directionToRotate) {
		var tempCubes = [];
		var rotaterArray = [];
		tempCubes = that.cubes.slice(0);
		if (rowOrColumnNumber == "first") {
			if (activeSideName == "groundSide" || activeSideName == "backSide") {
				rotaterArray = that.verticalUpTopSideRoterThirdArray.slice(0);
			} else {
				rotaterArray = that.verticalUpTopSideRoterFirstArray.slice(0);
			}
		} else if (rowOrColumnNumber == "second") {
			rotaterArray = that.verticalUpTopSideRoterSecondArray.slice(0);
		} else if (rowOrColumnNumber == "third") {
			if (activeSideName == "groundSide" || activeSideName == "backSide") {
				rotaterArray = that.verticalUpTopSideRoterFirstArray.slice(0);
			} else {
				rotaterArray = that.verticalUpTopSideRoterThirdArray.slice(0);
			}
		}
                //as for backSide up need the reverse array and down need just array 
		if(activeSideName != "backSide"){
                        if (directionToRotate == "down" || directionToRotate == "right") {
                                rotaterArray.reverse();
                        }
                }else{
                        if (directionToRotate == "up" || directionToRotate == "left") {
                                rotaterArray.reverse();
                        }
                }
		for (var i = 0; i < 12; i++) {
			if (i < 9) that.cubes[rotaterArray[i]] = tempCubes[rotaterArray[i + 3]];
			else that.cubes[rotaterArray[i]] = tempCubes[rotaterArray[i - 9]];
		}
	}

	this.horizontalRotationForTopAndVerticalForLeftRightGroundSide = function(directionToRotate) {
		console.log(activeSideName + " " + movementType + " " + rowOrColumnNumber + " " + directionToRotate);
		var tempCubes = [];
		var rotaterArray = [];
		tempCubes = that.cubes.slice(0);
		if (rowOrColumnNumber == "first") {
			if (activeSideName == "topSide" || activeSideName == "leftSide") {
				rotaterArray = that.horizentalLeftTopSideRoterFirstArray.slice(0);
			} else {console.log("bhayo");
				rotaterArray = that.horizentalLeftTopSideRoterThirdArray.slice(0);
			}
		} else if (rowOrColumnNumber == "second") {
			rotaterArray = that.horizentalLeftTopSideRoterSecondArray.slice(0);
		} else if (rowOrColumnNumber == "third") {
			if (activeSideName == "topSide" || activeSideName == "leftSide") {
				rotaterArray = that.horizentalLeftTopSideRoterThirdArray.slice(0);
			} else {
				rotaterArray = that.horizentalLeftTopSideRoterFirstArray.slice(0);
			}
		}
                //as for leftSide up need the reverse array and down need just array 
                if(activeSideName != "leftSide"){
                        if (directionToRotate == "down" || directionToRotate == "right") {
                                rotaterArray.reverse();
                        }
                }else{
                        if (directionToRotate == "up" || directionToRotate == "left") {
                                rotaterArray.reverse();
                        }
                }
		for (var i = 0; i < 12; i++) {
			if (i < 9) that.cubes[rotaterArray[i]] = tempCubes[rotaterArray[i + 3]];
			else that.cubes[rotaterArray[i]] = tempCubes[rotaterArray[i - 9]];
		}
	}

	this.horizontalRotationForLeftRightFrontBackSide = function(directionToRotate) {
		var tempCubes = [];
		var rotaterArray = [];
		tempCubes = that.cubes.slice(0);
		if (rowOrColumnNumber == "first") {
			rotaterArray = that.horizentalLeftFrontSideRoterFirstArray.slice(0);
		} else if (rowOrColumnNumber == "second") {
			rotaterArray = that.horizentalLeftFrontSideRoterSecondArray.slice(0);
		} else if (rowOrColumnNumber == "third") {
			rotaterArray = that.horizentalLeftFrontSideRoterThirdArray.slice(0);
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
game.createViews();
game.winGame();