// JavaScript Document
function Game(){
	this.cubes = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53];
	this.topViewCount = 0;
	this.groundViewCount = 0;
	this.leftViewCount = 0;
	this.rightViewCount = 0;
	this.frontViewCount = 0;
	this.backViewCount = 0;
	var that = this;
	this.getCubesRandomValues = function(){
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
	
	this.createView = function(value1,value2,value3){
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
		
		if(value1=="top"){	
			var topView = document.createElement("div");
			topView.className = "topView";
			topView.style.height = "174px";
			topView.style.width = "174px";
			topView.style.float = "left";
			topView.style.position = "absolute";
			topView.style.top = "0px";
			(document.getElementsByClassName("viewsWrapper")[viewsWrapperCount-1]).appendChild(topView);
			side1=value2;
			side2=value3;			
		}		
		else{
			side1=value1;
			side2=value2;
		}
		
		for(var i=0;i<2;i++){
			var view =document.createElement("div");
			view.style.height = "210px";
			view.style.width = "87px";
			view.style.float = "left";
			view.style.position = "absolute";
			if(value1=="top"){
				view.style.top = "87px";
			}
			else{view.style.top = "0px";}
			
			if(side1 == "left" && side2=="front"){
				if(i == 0){view.style.left = "0px"; view.className = "leftView";}
					else {view.style.left = "87px"; view.className = "frontView";}
			}
			else if(side1 == "front" && side2=="right"){
				if(i == 0){view.style.left = "0px"; view.className = "frontView";}
					else {view.style.left = "87px"; view.className = "rightView";}
			}
			else if(side1 == "right" && side2=="back"){
				if(i == 0){view.style.left = "0px"; view.className = "rightView";}
					else {view.style.left = "87px"; view.className = "backView";}
			}
			else{
				if(i == 0){view.style.left = "0px"; view.className = "backView";}
					else {view.style.left = "87px"; view.className = "leftView";}
			}		
			(document.getElementsByClassName("viewsWrapper")[viewsWrapperCount-1]).appendChild(view);
		}
		
		if(value3=="ground"){
			var groundView = document.createElement("div");
			groundView.className = "groundView";
			groundView.style.height = "174px";
			groundView.style.width = "174px";
			groundView.style.float = "left";
			groundView.style.position = "absolute";
			groundView.style.top = "123px";
			(document.getElementsByClassName("viewsWrapper")[viewsWrapperCount-1]).appendChild(groundView);
		}
		if(value1=="top"){
			that.createCubesInView(value1,"top");
			that.createCubesInView(value2,"left");
			that.createCubesInView(value3,"right");
		}
		else{
			that.createCubesInView(value1,"right");
			that.createCubesInView(value2,"left");
			that.createCubesInView(value3,"ground");
		}
	}
	this.createCubesInView = function(value,tempPosition){
		var left = 0;
		var top = 0;
		var rowCount = 1;
		var changeRow = true;
		if(value == "top" || value == "ground"){
			for(var i=0; i<9; i++){
				var block = document.createElement("div");
				if(rowCount == 1 && changeRow==true){top=58;left=0;changeRow=false;}
					else if(rowCount == 2 && changeRow==true){top=87;left=29;changeRow=false;}
					else if(rowCount == 3 && changeRow==true){top=116;left=58;changeRow=false;}
				block.style.height = "58px";
				block.style.width = "58px";
				block.style.position = "absolute";								
				block.style.top = top+"px";
				block.style.left = left+"px";
				block.style.textAlign = "center";
				block.style.lineHeight = "58px";
				if(value=="top"){
					block.style.background = "url(image/red-top-ground.png)";
					block.innerHTML = that.cubes[i];
					(document.getElementsByClassName("topView")[that.topViewCount]).appendChild(block);
				}
				else{
					block.innerHTML = that.cubes[i+45];
					block.style.background = "url(image/blue-top-ground.png)";
					(document.getElementsByClassName("groundView")[that.groundViewCount]).appendChild(block);
				}
				top -= 29;
				left += 29;
				if((i+1)%3 == 0){rowCount++; changeRow=true;}
			}
		if(value == "top")that.topViewCount++;
		else that.groundViewCount++;
		}
		else{
			if(tempPosition=="right")top=58;
			for(var i=0; i<9; i++){	
				if((i+1)%3==0){rowCount++; changeRow=true;}			
				var block = document.createElement("div");				
				block.style.height = "70px";
				block.style.width = "29px";
				block.style.position = "absolute";									
				block.style.top = top+"px";
				block.style.left = left+"px";
				block.style.textAlign = "center";
				block.style.lineHeight = "70px";				
				if(tempPosition=="left"){
					if(value=="left"){
						block.innerHTML = that.cubes[i+9];
						block.style.background = "url(image/green-left-right.png)";
						(document.getElementsByClassName("leftView")[that.leftViewCount]).appendChild(block);					
					}
					
					else if(value=="front"){
						block.innerHTML = that.cubes[i+18];
						block.style.background = "url(image/purple-left-right.png)";
						(document.getElementsByClassName("frontView")[that.frontViewCount]).appendChild(block);
					}
					else if(value=="right"){
						block.innerHTML = that.cubes[i+27];
						block.style.background = "url(image/yellow-left-right.png)";
						(document.getElementsByClassName("rightView")[that.rightViewCount]).appendChild(block);
					}					
					else{
						block.innerHTML = that.cubes[i+36];
						block.style.background = "url(image/white-left-right.png)";
						(document.getElementsByClassName("backView")[that.backViewCount]).appendChild(block);
					}				
					top += 29;
					left += 29;
					if(rowCount==1 && changeRow==true){changeRow=false;}
						else if(rowCount==2 && changeRow==true){top=41;left=0;changeRow=false;}
						else if(rowCount==3 && changeRow==true){top=82;left=0;changeRow=false;}					
				}
				else{
					if(value=="left"){
						block.innerHTML = that.cubes[i+9];
						block.style.background = "url(image/green-front-back.png)";
						(document.getElementsByClassName("leftView")[that.leftViewCount]).appendChild(block);					
					}
					else if(value=="front"){
						block.innerHTML = that.cubes[i+18];
						block.style.background = "url(image/purple-front-back.png)";
						(document.getElementsByClassName("frontView")[that.frontViewCount]).appendChild(block);
					}
					else if(value=="right"){
						block.innerHTML = that.cubes[i+27];
						block.style.background = "url(image/yellow-front-back.png)";
						(document.getElementsByClassName("rightView")[that.rightViewCount]).appendChild(block);
					}					
					else{
						block.innerHTML = that.cubes[i+36];
						block.style.background = "url(image/white-front-back.png)";
						(document.getElementsByClassName("backView")[that.backViewCount]).appendChild(block);
					}
					top -= 29;
					left += 29;
					if(rowCount==1 && changeRow==true){changeRow=false;}
						else if(rowCount==2 && changeRow==true){top=99;left=0;changeRow=false;}
						else if(rowCount==3 && changeRow==true){top=140;left=0;changeRow=false;}					
				}					
			}
			if(value == "left")that.leftViewCount++;
			else if(value == "right")that.rightViewCount++;
			else if(value == "front")that.frontViewCount++;
			else that.backViewCount++;
		}		
	}
}
var g = new Game();
//g.getCubesRandomValues();
g.createView("top","left","front");
g.createView("top","front","right");
g.createView("top","right","back");
g.createView("top","back","left");
g.createView("right","back","ground");
g.createView("back","left","ground");
g.createView("left","front","ground");
g.createView("front","right","ground");