'use strict';
function Game(){
	this.cubes = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54];
	this.topViewCount = 0;
	this.groundViewCount = 0;
	this.leftViewCount = 0;
	this.rightViewCount = 0;
	this.frontViewCount = 0;
	this.backViewCount = 0;
	var that = this;
	
	this.setCubesRandomValues = function(){
		this.cubes = [];
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
	}
	
	this.createView = function(side1,side2,side3){
		var sketchSide;
		var nextSide;
		var viewsWrapper = document.createElement("div");
		viewsWrapper.className = "viewsWrapper";
		viewsWrapper.style.height = "297px";
		viewsWrapper.style.width = "174px";
		viewsWrapper.style.float = "left";
		viewsWrapper.style.position = "relative";
		viewsWrapper.style.marginRight = "20px";
		viewsWrapper.style.marginBottom = "20px";
		(document.getElementsByClassName("wrapper")[0]).appendChild(viewsWrapper);
		var viewsWrapperCount = document.getElementsByClassName("viewsWrapper").length;
		
		if(side1=="top"){	
			var topView = document.createElement("div");
			topView.className = "topView";
			topView.style.height = "174px";
			topView.style.width = "174px";
			topView.style.float = "left";
			topView.style.position = "absolute";
			topView.style.top = "0px";
			(document.getElementsByClassName("viewsWrapper")[viewsWrapperCount-1]).appendChild(topView);
			sketchSide = side2;			
		}		
		else{
			sketchSide=side1;
		}
		
		for(var i=0;i<2;i++){
			var view =document.createElement("div");
			view.style.height = "210px";
			view.style.width = "87px";
			view.style.float = "left";
			view.style.position = "absolute";
			if(side1=="top"){
				view.style.top = "87px";
			}
			else{view.style.top = "0px";}
			
			if(sketchSide == "left"){
				if(i == 0){view.style.left = "0px"; view.className = "leftView";}
				else {view.style.left = "87px"; view.className = "frontView";}
			}
			else if(sketchSide == "front"){
				if(i == 0){view.style.left = "0px"; view.className = "frontView";}
				else {view.style.left = "87px"; view.className = "rightView";}
			}
			else if(sketchSide == "right"){
				if(i == 0){view.style.left = "0px"; view.className = "rightView";}
				else {view.style.left = "87px"; view.className = "backView";}
			}
			else{
				if(i == 0){view.style.left = "0px"; view.className = "backView";}
				else {view.style.left = "87px"; view.className = "leftView";}
			}		
			(document.getElementsByClassName("viewsWrapper")[viewsWrapperCount-1]).appendChild(view);
		}
		
		if(side3=="ground"){
			var groundView = document.createElement("div");
			groundView.className = "groundView";
			groundView.style.height = "174px";
			groundView.style.width = "174px";
			groundView.style.float = "left";
			groundView.style.position = "absolute";
			groundView.style.top = "123px";
			(document.getElementsByClassName("viewsWrapper")[viewsWrapperCount-1]).appendChild(groundView);
		}		
		if(side1=="top"){
			nextSide = side2;			
			that.createCubesInView(side1,"top",nextSide);
			that.createCubesInView(side2,"left",nextSide);
			that.createCubesInView(side3,"right",nextSide);
			
		}
		else{
			if(side1=="right") nextSide="left";
			else if(side1=="back") nextSide="back";
			else if(side1=="left") nextSide="right";
			else if(side1=="front") nextSide="front";
			that.createCubesInView(side1,"right",nextSide);
			that.createCubesInView(side2,"left",nextSide);
			that.createCubesInView(side3,"ground",nextSide);
		}
	}
	this.createTopGroundView = function(ViewSide){
		var view = document.createElement("div");
		view.className = ViewSide;
		view.style.height = "174px";
		view.style.width = "174px";
		view.style.float = "left";
		view.style.position = "absolute";
		(document.getElementsByClassName("viewsWrapper")[viewsWrapperCount-1]).appendChild(ViewSide);
	}
	this.createCubesInView = function(side,tempPosition,nextSide){
		var j;
		var left = 0;
		var top = 0;
		var rowCount = 1;
		var changeRow = true;
		if(side == "top" || side == "ground"){
			for(var i=0; i<9; i++){
				var block = document.createElement("div");
				if(rowCount == 1 && changeRow==true){
					if(nextSide == "left"){top=58; left=0;}
					else if(nextSide == "front"){top=0; left=58;}
					else if(nextSide == "right"){top=58; left=116;}
					else if(nextSide == "back"){top=116; left=58;}
					changeRow=false;
				}
				else if(rowCount == 2 && changeRow==true){
					if(nextSide == "left"){top=87;left=29;}
					else if(nextSide == "front"){top=29;left=29;}
					else if(nextSide == "right"){top=29;left=87;}
					else if(nextSide == "back"){top=87; left=87;}
					changeRow=false;
				}
				else if(rowCount == 3 && changeRow==true){
					if(nextSide == "left"){top=116;left=58;}
					else if(nextSide == "front"){top=58; left=0;}
					else if(nextSide == "right"){top=0;left=58;}
					else if(nextSide == "back"){top=58; left=116;}
					changeRow=false;
				}
				block.style.height = "58px";
				block.style.width = "58px";
				block.className = side;
				block.style.position = "absolute";								
				block.style.top = top+"px";
				block.style.left = left+"px";
				block.style.textAlign = "center";
				block.style.lineHeight = "58px";
				if(side=="top"){
					j=i;
					block.innerHTML = that.cubes[j];
					(document.getElementsByClassName("topView")[that.topViewCount]).appendChild(block);
				}
				else{
					j=i+45;
					block.innerHTML = that.cubes[j];
					(document.getElementsByClassName("groundView")[that.groundViewCount]).appendChild(block);
				}					
				if(that.cubes[j]<10)	block.style.background = "url(image/red-top-ground.png)";
				else if(that.cubes[j]<19) block.style.background = "url(image/green-top-ground.png)";
				else if(that.cubes[j]<28) block.style.background = "url(image/purple-top-ground.png)";
				else if(that.cubes[j]<37) block.style.background = "url(image/yellow-top-ground.png)";
				else if(that.cubes[j]<46) block.style.background = "url(image/white-top-ground.png)";
				else block.style.background = "url(image/blue-top-ground.png)";
				if(nextSide == "left"){top -= 29;left += 29;}
				else if(nextSide == "front"){top += 29; left += 29;}
				else if(nextSide == "right"){top += 29; left -= 29;}
				else if(nextSide == "back"){top -= 29; left -= 29; }
				if((i+1)%3 == 0){rowCount++; changeRow=true;}
			}
			if(side == "top")that.topViewCount++;
			else that.groundViewCount++;
		}
		else{
			if(tempPosition=="right")top=58;
			for(var i=0; i<9; i++){	
				if((i+1)%3==0){rowCount++; changeRow=true;}			
				var block = document.createElement("div");				
				block.style.height = "70px";
				block.style.width = "29px";
				block.className = side;
				block.style.position = "absolute";									
				block.style.top = top+"px";
				block.style.left = left+"px";
				block.style.textAlign = "center";
				block.style.lineHeight = "70px";
				if(side=="left"){
					block.innerHTML = that.cubes[i+9];
					j= i+9;
					(document.getElementsByClassName("leftView")[that.leftViewCount]).appendChild(block);					
				}					
				else if(side=="front"){
					block.innerHTML = that.cubes[i+18];
					j=i+18;
					(document.getElementsByClassName("frontView")[that.frontViewCount]).appendChild(block);
				}
				else if(side=="right"){
					block.innerHTML = that.cubes[i+27];
					j=i+27;
					(document.getElementsByClassName("rightView")[that.rightViewCount]).appendChild(block);
				}					
				else{
					block.innerHTML = that.cubes[i+36];
					j=i+36;
					(document.getElementsByClassName("backView")[that.backViewCount]).appendChild(block);
				}
				if(tempPosition=="left"){
					if(that.cubes[j]<10) block.style.background = "url(image/red-left-right.png)";
					else if(that.cubes[j]<19) block.style.background = "url(image/green-left-right.png)";
					else if(that.cubes[j]<28) block.style.background = "url(image/purple-left-right.png)";
					else if(that.cubes[j]<37) block.style.background = "url(image/yellow-left-right.png)";
					else if(that.cubes[j]<46) block.style.background = "url(image/white-left-right.png)";
					else block.style.background = "url(image/blue-left-right.png)";				
					top += 29;
					left += 29;
					if(rowCount==1 && changeRow==true){changeRow=false;}
					else if(rowCount==2 && changeRow==true){top=41;left=0;changeRow=false;}
					else if(rowCount==3 && changeRow==true){top=82;left=0;changeRow=false;}					
				}
				else{
					if(that.cubes[j]<10)	block.style.background = "url(image/red-front-back.png)";
					else if(that.cubes[j]<19) block.style.background = "url(image/green-front-back.png)";
					else if(that.cubes[j]<28) block.style.background = "url(image/purple-front-back.png)";
					else if(that.cubes[j]<37) block.style.background = "url(image/yellow-front-back.png)";
					else if(that.cubes[j]<46) block.style.background = "url(image/white-front-back.png)";
					else block.style.background = "url(image/blue-front-back.png)";
					top -= 29;
					left += 29;
					if(rowCount==1 && changeRow==true){changeRow=false;}
					else if(rowCount==2 && changeRow==true){top=99;left=0;changeRow=false;}
					else if(rowCount==3 && changeRow==true){top=140;left=0;changeRow=false;}					
				}					
			}
			if(side == "left")that.leftViewCount++;
			else if(side == "right")that.rightViewCount++;
			else if(side == "front")that.frontViewCount++;
			else that.backViewCount++;
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
}
var g = new Game();
g.setCubesRandomValues();//toggle the cube to initiate stage
g.createView("top","left","front");
g.createView("top","front","right");
g.createView("top","right","back");
g.createView("top","back","left");
g.createView("right","back","ground");
g.createView("back","left","ground");
g.createView("left","front","ground");
g.createView("front","right","ground");
g.winGame();