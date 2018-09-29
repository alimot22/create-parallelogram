initial()
	AI("Hello stranger! \n just click 3 time on the board and i'll do the rest. \n for more information, click on me!");
function initial(){
    window.clickCounter = 0;
    window.mainCanvas = document.getElementById('main');
    window.context = mainCanvas.getContext('2d');
    mainCanvas.onclick = draw;
    context.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
	window.parallelogramArea = 0;
	window.circleArea = 0;
    window.points = [];
	setInterval(function(){ 
			AI("For more information, just click on me!");

	}, 25000);


}

function draw(e){
    var x = e.offsetX;
    var y = e.offsetY;
    if(clickCounter < 3){
        drawPoint(x,y);
        points[clickCounter]=[x,y];
        drawParallelogram(points);
		showDetail();
		AI("Your Point successfully created.")
		
    }
    clickCounter ++;
}

function drawPoint(x,y){
    const circleColor = "#F44336";
        context.beginPath();
        context.arc(x,y,5, 0, 2 * Math.PI, false);
        context.fillStyle = circleColor;
        context.fill();
        context.strokeStyle="black";
        context.stroke();
}
function drawParallelogram(p){
    const lineColor = "#2196F3";
    var line=[];
    var AC,BD;
    if(p.length >= 3){
          p[3] = [
                p[0][0] + p[2][0] - p[1][0],
                p[0][1] + p[2][1] - p[1][1]
            ]
            context.beginPath();
            context.moveTo(p[0][0], p[0][1]);
        for(var i = 1;i<=3;i++){
            context.lineTo(p[i][0], p[i][1]);
            if(i==3){
                break;
            }
            line[i] = Math.sqrt(Math.pow((p[i+1][0] - p[i][0]),2) + Math.pow((p[i+1][1] - p[i][1]),2));
        }
            context.closePath();
            context.strokeStyle = lineColor;
            context.stroke();
            AC = Math.sqrt(Math.pow((p[2][0] - p[0][0]),2) + Math.pow((p[2][1] - p[0][1]),2));
            BD = Math.sqrt(Math.pow((p[3][0] - p[1][0]),2) + Math.pow((p[3][1] - p[1][1]),2));
            const cenX = (p[0][0] + p[1][0] + p[2][0] + p[3][0]) / 4;
            const cenY = (p[0][1]+ p[1][1] + p[2][1]+ p[3][1]) / 4;
            var _a=0;
            if  (line[1]>line[2]){
             var _a=line[1];
            }
            else{
             var _a=line[2];
            }
            const _s = (_a+(BD/2)+(AC/2))/2;
            const _h=((Math.sqrt(_s*((_s-_a)*(_s-(AC/2))*(_s-(BD/2)))))   *   2  )/_a;
			// formula is Area=bh
			parallelogramArea = (AC/2) * _h;
			
            drawCircle(cenX,cenY,_h);
  ///////////DragAndDrop////////////
            mainCanvas.addEventListener('mousedown', mouseDown, true);
            mainCanvas.addEventListener('mousemove', mouseMove, true);
            mainCanvas.addEventListener('mouseup', mouseUp, true);
  ///////////DragAndDrop////////////

    }
}

function drawCircle(x,y,s){	
console.log(s)
    const circleColor = "#f9a825";
     context.beginPath();
	context.arc(x , y , s, 0, 2 * Math.PI, false);
	context.strokeStyle = circleColor;
	context.stroke();
	circleArea = Math.PI * Math.pow((s/2),2);		

}

  ///////////DragAndDrop////////////
window.isDragging=false;
window.updater;
    const mouseDown = function(e) {
        const mouseX = e.offsetX;
        const mouseY = e.offsetY;
        for (var i = 2; i >= 0; i--) {
            if (ToRound(points[i][0]) == ToRound(mouseX) && ToRound(points[i][1]) == ToRound(mouseY)) {
                updater = i;
                isDragging = true;
                return;
            }
            else{
                isDragging = false;
            }
        }

    };

    const mouseMove = function(e) {
        if (isDragging) {
            points[updater] = [e.offsetX,e.offsetY]
            context.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
            drawParallelogram(points);
            for(var i=2;i>=0;i--){
                 drawPoint(points[i][0],points[i][1]);
				showDetail();				 
            }
		
        }
    };

    const mouseUp = function(e) {
        isDragging = false;
		
    };

    function ToRound(n) {
       return Math.ceil(n / 20) * 25;
      }
  ///////////DragAndDrop////////////

  function showDetail(){
	document.getElementById("point-1").innerHTML = "X position for first Node is: "+points[0][0]+" ----- Y position for first Node is: "+points[0][1];
	if(points[1]){
		document.getElementById("point-2").innerHTML = "X position for second Node is: "+points[1][0]+" ----- Y position for second Node is: "+points[1][1];
	}
	if(points[2]){
		document.getElementById("point-3").innerHTML = "X position for third Node is: "+points[2][0]+" ----- Y position for third Node is: "+points[2][1];
	}
	if(parallelogramArea > 0){
		document.getElementById("parallelogramArea").innerHTML = "Parallelogram area is: "+parallelogramArea.toFixed();
	}
	if(circleArea > 0){
		document.getElementById("circleArea").innerHTML = "Circle area is: "+circleArea.toFixed();
	}
	
}

function AI(text){
	document.getElementById("AIContent").classList.remove("show");
	setTimeout(function(){
		document.getElementById("AIContent").classList.add("show");
		document.getElementById("AIContent").innerHTML = text;
	}, 500);
	setTimeout(function(){
		document.getElementById("AIContent").classList.remove("show");
	}, 8000);

}
function resetBoard(){
    context.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
	mainCanvas.removeEventListener('mousedown', mouseDown, true);
	mainCanvas.removeEventListener('mousemove', mouseMove, true);
	mainCanvas.removeEventListener('mouseup', mouseUp, true);
	AI("Your board has successfully reset!")
	initial()
 }
 
 function showAbout(){
	 document.getElementById("about").classList.add("show")
 }
  function closeAbout(){
	 document.getElementById("about").classList.remove("show")
 }