//Rubik Game JavaScript Document
'use strict';
function Game(){
	this.cubes = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54];
	this.topViewCount = 0;
	this.groundViewCount = 0;
	this.leftViewCount = 0;
	this.rightViewCount = 0;
	this.frontViewCount = 0;
	this.backViewCount = 0;
	this.viewsWrapperCount = 0;
	this.leftRoterArray = [6,3,0,7,4,1,8,5,2];//one left rotation
	this.rightRoterArray = [2,5,8,1,4,7,0,3,6];//one right rotation
	this.rotationCount = 0; 
	this.constantCubes;//a array that save initial array after suffeling the cubes
	var that = this;
	
	this.setCubesRandomValues = function(){
		that.cubes = [];
		while(that.cubes.length<54){
			var create=true;
			var random = Math.floor(Math.random()*54)+1;
			if(that.cubes.length>0)
				for(var i=0; i<that.cubes.length;i++){
					if(that.cubes[i]==random){create = false; break;}
				}
			if(create==true)
				that.cubes.push(random);
		}
		that.constantCubes = that.cubes;
	}
	this.createViewWrapper = function(){
		for(var i =0; i<8; i++){
			var viewsWrapper = document.createElement("div");
			viewsWrapper.className = "viewsWrapper";
			viewsWrapper.style.height = "297px";
			viewsWrapper.style.width = "174px";
			viewsWrapper.style.float = "left";
			viewsWrapper.style.position = "relative";
			viewsWrapper.style.margin = "20px 38px 20px 38px";
			(document.getElementsByClassName("wrapper")[0]).appendChild(viewsWrapper);
		}
		that.createView("top","left","front");
		that.createView("top","front","right");
		that.createView("top","right","back");
		that.createView("top","back","left");
		that.createView("right","back","ground");
		that.createView("back","left","ground");
		that.createView("left","front","ground");
		that.createView("front","right","ground");
		that.cubes = that.constantCubes;
	}
	//function to create view wrapper
	this.createView = function(side1,side2,side3){
		var viewsWrapperCount = that.viewsWrapperCount;
		if(side1=="top"){	
			that.createTopGroundView("topView",viewsWrapperCount,side2);//third parameter for block positioning
			that.createLeftRightFrontBackView(side2+"View",viewsWrapperCount,side1,"first");//3 & 4 parameter for top & left displacement of view 
			that.createLeftRightFrontBackView(side3+"View",viewsWrapperCount,side1,"second");			
		}		
		else{
			var relativeView;
			if(side1=="right")relativeView = "left";
			else if(side1=="back")relativeView = "front";
			else if(side1=="left")relativeView = "right";
			else if(side1=="front")relativeView = "back";
			that.createLeftRightFrontBackView(side1+"View",viewsWrapperCount,side3,"first");//3 & 4 parameter for top & left displacement of view
			that.createLeftRightFrontBackView(side2+"View",viewsWrapperCount,side3,"second");
			that.createTopGroundView("groundView",viewsWrapperCount,relativeView);//third parameter for block positioning
		}
		that.viewsWrapperCount++;		
	}
	//function to create top and ground view
	this.createTopGroundView = function(viewSide,viewsWrapperCount,relativeSide){
		var view = document.createElement("div");
		view.className = viewSide;
		view.style.height = "174px";
		view.style.width = "174px";
		view.style.float = "left";
		view.style.position = "absolute";
		(document.getElementsByClassName("viewsWrapper")[that.viewsWrapperCount]).appendChild(view);
		if(viewSide=="topView") view.style.top = "0px";	
		else view.style.top = "123px";
		that.createBlockInView(viewSide,null,relativeSide);
	}	
	//function to create left, right, front and back view
	this.createLeftRightFrontBackView = function(viewSide,viewsWrapperCount,relativeView,viewHorizontalLocation){
		var view =document.createElement("div");
		view.className = viewSide;
		view.style.height = "210px";
		view.style.width = "87px";
		view.style.float = "left";
		view.style.position = "absolute";
		if(relativeView == "top"){view.style.top = "87px";}
		else{view.style.top = "0px";}
		if(viewHorizontalLocation == "first")view.style.left = "0px";
		else view.style.left = "87px";	
		(document.getElementsByClassName("viewsWrapper")[this.viewsWrapperCount]).appendChild(view);
		if(relativeView == "ground" && viewHorizontalLocation == "first")//condition for position left and right apperance changes in ground view 
			viewHorizontalLocation = "second";
		else if(relativeView == "ground" && viewHorizontalLocation == "second")
			viewHorizontalLocation = "first";
		that.createBlockInView(viewSide,viewHorizontalLocation,null);
	}
	//function to create block in view
	this.createBlockInView = function(viewSide,tempPosition,relativeSide){
		var j;//j variable define index of View in that.cubes[] array
		var left = 0;
		var top = 0;
		var rowCount = 1;
		var changeRow = true;
		if(viewSide == "topView" || viewSide == "groundView"){
			///////////////////////rotation of top and ground view in initial and acive view state
			if(that.topViewCount>0 && viewSide == "topView" && that.topViewCount!=4) that.rotateView("topView","left");//to rotate top view in every viewWrapper
			else if(that.groundViewCount>0 && viewSide == "groundView" && that.groundViewCount!=4){that.rotateView("groundView","left"); console.log("abc");}//to rotate ground view in viewWrapper
			if(that.rotationCount>0){//condition to know how many times to rotate top 0r ground view while selecting active view
				for(var i=0; i<that.rotationCount;i++){
					if(viewSide == "topView") that.rotateView("topView","left");
					else if(viewSide == "groundView") that.rotateView("groundView","left");
				}	
			}
			else if(that.topViewCount == 4 && that.groundViewCount ==4 && that.rotationCount==0){that.cubes=that.constantCubes;}
			///////////////////////////////////////////////////////////////////////end
			for(var i=0; i<9; i++){
				var block = document.createElement("div");
				if(rowCount == 1 && changeRow==true){top=58; left=0; changeRow=false;}//condition to change offsetLeft & Right in every new row
				else if(rowCount == 2 && changeRow==true){top=87; left=29; changeRow=false;}
				else if(rowCount == 3 && changeRow==true){top=116; left=58; changeRow=false;}
				block.style.height = "58px";
				block.style.width = "58px";
				block.className = viewSide.substr(0,viewSide.indexOf('V'));
				block.style.position = "absolute";								
				block.style.top = top+"px";
				block.style.left = left+"px";
				if(viewSide == "topView"){	j=i;
					(document.getElementsByClassName("topView")[that.topViewCount]).appendChild(block);
				}
				else{	j=i+45;					
					(document.getElementsByClassName("groundView")[that.groundViewCount]).appendChild(block);
				}
				var image = document.createElement("img");					
				if(that.cubes[j]<10) image.setAttribute("src","image/red-top-ground.png");
				else if(that.cubes[j]<19) image.setAttribute("src","image/green-top-ground.png"); 
				else if(that.cubes[j]<28) image.setAttribute("src","image/purple-top-ground.png");
				else if(that.cubes[j]<37) image.setAttribute("src","image/yellow-top-ground.png");
				else if(that.cubes[j]<46) image.setAttribute("src","image/white-top-ground.png");
				else image.setAttribute("src","image/blue-top-ground.png");
				block.appendChild(image);
				top -= 29; left += 29;//condition to change block positioning of top and ground view
				if((i+1)%3 == 0){rowCount++; changeRow=true;}
			}
			if(viewSide == "topView")that.topViewCount++;
			else that.groundViewCount++;
		}
		else{
			if(tempPosition == "second")top=58;//view including top and ground's right and left respectively must have certain initial top offset
			for(var i=0; i<9; i++){	
				if((i+1)%3==0){rowCount++; changeRow=true;}			
				var block = document.createElement("div");				
				block.style.height = "70px";
				block.style.width = "29px";
				block.className = viewSide.substr(0,viewSide.indexOf('V'));
				block.style.position = "absolute";									
				block.style.top = top+"px";
				block.style.left = left+"px";
				if(viewSide=="leftView"){	j= i+9;
					(document.getElementsByClassName("leftView")[that.leftViewCount]).appendChild(block);					
				}					
				else if(viewSide=="frontView"){ 	j=i+18;
					(document.getElementsByClassName("frontView")[that.frontViewCount]).appendChild(block);
				}
				else if(viewSide=="rightView"){ 	j=i+27;
					(document.getElementsByClassName("rightView")[that.rightViewCount]).appendChild(block);
				}					
				else{	j=i+36;
					(document.getElementsByClassName("backView")[that.backViewCount]).appendChild(block);
				}
				var image = document.createElement("img");
				if(tempPosition == "first"){										
					if(that.cubes[j]<10) image.setAttribute("src","image/red-left-right.png");
					else if(that.cubes[j]<19) image.setAttribute("src","image/green-left-right.png"); 
					else if(that.cubes[j]<28) image.setAttribute("src","image/purple-left-right.png");
					else if(that.cubes[j]<37) image.setAttribute("src","image/yellow-left-right.png");
					else if(that.cubes[j]<46) image.setAttribute("src","image/white-left-right.png");
					else image.setAttribute("src","image/blue-left-right.png");
					block.appendChild(image);				
					top += 29;
					left += 29;
					if(rowCount==1 && changeRow==true){changeRow=false;}
					else if(rowCount==2 && changeRow==true){top=41;left=0;changeRow=false;}
					else if(rowCount==3 && changeRow==true){top=82;left=0;changeRow=false;}					
				}
				else{
					if(that.cubes[j]<10) image.setAttribute("src","image/red-front-back.png");
					else if(that.cubes[j]<19) image.setAttribute("src","image/green-front-back.png"); 
					else if(that.cubes[j]<28) image.setAttribute("src","image/purple-front-back.png");
					else if(that.cubes[j]<37) image.setAttribute("src","image/yellow-front-back.png");
					else if(that.cubes[j]<46) image.setAttribute("src","image/white-front-back.png");
					else image.setAttribute("src","image/blue-front-back.png");
					block.appendChild(image);
					top -= 29;
					left += 29;
					if(rowCount==1 && changeRow==true){changeRow=false;}
					else if(rowCount==2 && changeRow==true){top=99;left=0;changeRow=false;}
					else if(rowCount==3 && changeRow==true){top=140;left=0;changeRow=false;}					
				}					
			}
			if(viewSide == "leftView")that.leftViewCount++;
			else if(viewSide == "rightView")that.rightViewCount++;
			else if(viewSide == "frontView")that.frontViewCount++;
			else that.backViewCount++;
		}
	}
	//function to rotate the view 
	this.rotateView = function(view,directionToRotate){
		var tempCubes = that.cubes;
		var rotaterArray = [];
		that.cubes = [];
		if(directionToRotate == "left") rotaterArray = that.leftRoterArray;
		else if(directionToRotate == "right") rotaterArray = that.rightRoterArray;
		for(var i=0;i<54;i++){
			switch(view){
				case "topView": if(i<9) that.cubes.push(tempCubes[rotaterArray[i]]);
							else that.cubes.push(tempCubes[i]);
							break;
				case "leftView": if(i>8 && i<18) that.cubes.push(tempCubes[rotaterArray[i-18]+18]);
							else that.cubes.push(tempCubes[i]);
							break;
				case "frontView": if(i>17 && i<27) that.cubes.push(tempCubes[rotaterArray[i-18]+18]);
							else that.cubes.push(tempCubes[i]);
							break;
				case "rightView": if(i>26 && i<36) that.cubes.push(tempCubes[rotaterArray[i-27]+27]);
							else that.cubes.push(tempCubes[i]);
							break;
				case "backView": if(i>35 && i<45) that.cubes.push(tempCubes[rotaterArray[i-36]+36]);
							else that.cubes.push(tempCubes[i]);
							break;
				case "groundView":if(i>44 && i<54) that.cubes.push(tempCubes[rotaterArray[i-45]+45]);
							else that.cubes.push(tempCubes[i]);
							break;
			}
		}
	}	
	//function to check game win
	this.winGame = function(){
		var win = true;
		var sideFirstCubeIndex=0;
		for(var side = 1; side < 7; side++){
			var cubeIndex=0;
			var position = Math.floor((that.cubes[sideFirstCubeIndex]-1)/9); 
			for(cubeIndex = sideFirstCubeIndex; cubeIndex < sideFirstCubeIndex +  9; cubeIndex++){
				if(Math.floor((that.cubes[cubeIndex]-1)/9)!=position){win = false; break;}
			}
			if(win == false){console.log("still playing"); break;}
			sideFirstCubeIndex = cubeIndex;
		}
		if(win == true){console.log("Win");}
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
	var activeViewSelected = false;//boolean to know wheather any View is selected
	document.onkeydown = chooseViewForMovement;	
	function chooseViewForMovement(e){
		switch(e.keyCode){
			case 49:that.createOpacityBackground();
					that.rotationCount=0;
					that.createView("top","left","front");	
					break;
			case 50:that.createOpacityBackground();
					that.rotationCount=1;
					that.createView("top","front","right");					
					break;
			case 51:that.createOpacityBackground();
					that.rotationCount = 2;
					that.createView("top","right","back");					
					break;
			case 52:that.createOpacityBackground();
					that.rotationCount = 3;
					that.createView("top","back","left");
					break;
			case 53:that.createOpacityBackground();
					that.rotationCount=0;
					that.createView("right","back","ground");
					break;
			case 54:that.createOpacityBackground();
					that.rotationCount = 1;
					that.createView("back","left","ground");
					break;
			case 55:that.createOpacityBackground();
					that.rotationCount = 2;
					that.createView("left","front","ground");
					break;
			case 56:that.createOpacityBackground();
					that.rotationCount = 3;
					that.createView("front","right","ground");
					break;
		}
	}
		
	this.createOpacityBackground = function(){
		var checkOpacityBackground = document.getElementsByClassName("opacityBackground");
		if(checkOpacityBackground.length>0){
			(document.getElementsByClassName("wrapper")[0]).removeChild(document.getElementsByClassName("opacityBackground")[0]);
			that.viewsWrapperCount = 8;
			that.topViewCount = 4;
			that.groundViewCount = 4;
			that.leftViewCount = 4;
			that.rightViewCount = 4;
			that.frontViewCount = 4;
			that.backViewCount = 4;
			that.cubes = that.constantCubes;
			activeViewSelected = false;
			activeSideSelected = false;
		}
		var opacityBackground = document.createElement("div");
		opacityBackground.className = "opacityBackground";
		opacityBackground.style.height = "100%";
		opacityBackground.style.width = "100%";
		opacityBackground.style.backgroundColor = "rgba(1,1,1,0.8)";
		opacityBackground.style.position = "relative";
		(document.getElementsByClassName("wrapper")[0]).appendChild(opacityBackground);
		
		document.onkeyup = cancelMovement;		
		function cancelMovement(e){
			if(e.keyCode == 27)
				try{(document.getElementsByClassName("wrapper")[0]).removeChild(opacityBackground);
					that.viewsWrapperCount = 8;
					that.topViewCount = 4;
					that.groundViewCount = 4;
					that.leftViewCount = 4;
					that.rightViewCount = 4;
					that.frontViewCount = 4;
					that.backViewCount = 4;
					that.cubes = that.constantCubes;
					that.rotationCount = 0;
					activeViewSelected = false;
					activeSideSelected = false;
				}
				catch(e){}
		}
		var activeView = document.createElement("div");
		activeView.className = "viewsWrapper";
		activeView.style.height = "297px";
		activeView.style.width = "174px";
		activeView.style.margin = "0 auto";
		activeView.style.position = "relative";
		activeView.style.top = "10px";
		(document.getElementsByClassName("opacityBackground")[0]).appendChild(activeView);
		that.cubes = that.constantCubes;
		activeViewSelected = true;
		activeSideSelected = false;		
	}
	window.addEventListener("keydown", selectActiveSide, false);
	function selectActiveSide(e){
		if(activeViewSelected == true)
		switch(e.keyCode){
			case 70:that.showActiveSide("first");	
					break;
			case 68:that.showActiveSide("second");
					break;
			case 83:that.showActiveSide("third");
					break;
		}
	}
	var activeSideSelected = false;//boolean to know wheather side in a selected view is selected
	this.showActiveSide = function(side){
		var selectedActiveSide;//contains one of the side in a view
		var sideName;//contains className of the side contained in selectedActiveSide
		if(side=="first"){
			selectedActiveSide = (document.getElementsByClassName("viewsWrapper")[8]).children[0]
		}
		else if(side=="second"){
			selectedActiveSide = (document.getElementsByClassName("viewsWrapper")[8]).children[1]
		}
		else if(side=="third"){
			selectedActiveSide = (document.getElementsByClassName("viewsWrapper")[8]).children[2]
		}
		sideName = selectedActiveSide.attributes[0].value;
		var checkActiveSide = document.getElementsByClassName("activeSide");
		if(checkActiveSide.length>0){ activeSideSelected = false;
			(document.getElementsByClassName("opacityBackground")[0]).removeChild(document.getElementsByClassName("activeSide")[0]);
		}
		var activeSide = document.createElement("div");
		activeSide.className = "activeSide";
		activeSide.style.height = "240px";
		activeSide.style.width = "240px";
		activeSide.style.position = "absolute";
		activeSide.style.left = "381px";
		activeSide.style.top = "360px";
		(document.getElementsByClassName("opacityBackground")[0]).appendChild(activeSide);

		for(var i=0; i<selectedActiveSide.children.length; i++){
			var image = selectedActiveSide.children[i].children[0].attributes[0].value;
			var color = image.substring(image.indexOf('/')+1,image.indexOf('-'));
			var block = document.createElement("div");
			block.style.height = "76px";
			block.style.width = "76px";
			block.style.border = "2px solid black";
			block.style.float = "left";
			block.style.backgroundColor = color;
			block.style.position = "relative";
			activeSide.appendChild(block);
		}
		activeSideSelected = true;
	}
	
	window.addEventListener("keydown", selectMovementType, false);
	function selectMovementType(e){
		if(activeSideSelected == true)
			switch(e.keyCode){
				case 189:console.log("horizental");	
						break;
				case 220:console.log("vertical");	
						break;				
			}	
	}
}

var game = new Game();
game.setCubesRandomValues();//toggle the cube to initiate stage
game.createViewWrapper();
game.winGame();
//game.clickEventHandler();