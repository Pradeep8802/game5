can=document.querySelector('canvas');
can.width=window.innerWidth;
can.height=window.innerHeight;
var c=can.getContext('2d');
//
// STEP 1
const XCENTEROFCHITS=700;
const YCENTEROFCHITS=300;
const CENTER=[XCENTEROFCHITS,YCENTEROFCHITS];

// velocties
const MINIMUMVELOCITY=2;
const MAXMUMVELOCITY=8;

const VELOCITYSCALING=10;

const NUMBEROFPLAYERS=3;
const NUMBEROFCHITS=NUMBEROFPLAYERS*3;

const WIDTHOFEACHCHIT=40;
const HEIGTHOFEACHCHIT=40;
const RADIUSOFCHITSSELECTION=250;
var chits=[];

var angleSectorsOfChits=[]

function drawGameCircle(){
    c.beginPath();
    c.arc(XCENTEROFCHITS,YCENTEROFCHITS,RADIUSOFCHITSSELECTION,0,2*Math.PI,false);
    c.strokeStyle='blue';
    c.stroke();
}

function shuffleArray(array){
    return array.sort( ()=>Math.random()-0.5 );
}

function create(){
    var array=[];
    for(let i=0;i<NUMBEROFCHITS;i++){
        array.push(i);
    }
    array=shuffleArray(array);
    return array;
}

function velocityOfChit(i){
    var vel=[0,0];
    //for(var i =0;i<NUMBEROFCHITS;i++){
        if(chitsArray[i]+1==1){
                vel[0]=2;
                vel[1]=2;
        }

        else if(chitsArray[i]+1==2){
            vel[0]=-2;
            vel[1]=-2;
        }

        else if(chitsArray[i]+1==3){
            vel[0]=1;
            vel[1]=-3;
        }

        else if(chitsArray[i]+1==4){
            vel[0]=-2;
            vel[1]=3;
        }

        else if(chitsArray[i]+1==5){
            vel[0]=-3;
            vel[1]=-1;
        }

        else if(chitsArray[i]+1==6){
            vel[0]=-2;
            vel[1]=-3;
        }

        else if(chitsArray[i]+1==7){
            vel[0]=2;
            vel[1]=-2;
        }

        else if(chitsArray[i]+1==8){
            vel[0]=2;
            vel[1]=-3;
        }

        else if(chitsArray[i]+1==9){
            vel[0]=0;
            vel[1]=-2;
        }
    //}
        return vel;///VELOCITYSCALING;
}

// function createChit(){
// }
//console.log(chitsVelocity);
function velocityOfChits(){
    for(var i=0;i<NUMBEROFCHITS;i++){
        chitsVelocity.push(velocityOfChit(i));
    }
}

var chitsVelocity=[];
console.log(chitsVelocity);
// function createChits(){
// }

var locationOfChits=[];
function initialiseLocation(){
    for(var i=0;i<NUMBEROFCHITS;i++){
        locationOfChits.push([XCENTEROFCHITS-WIDTHOFEACHCHIT/2,YCENTEROFCHITS-HEIGTHOFEACHCHIT/2]);
    }
}
initialiseLocation();

var chitsArray=create();
//console.log(chitsArray);

function selectedAlready(i){
    var there=0 ;
    for(var j=0;j<selectedChits.length;j++){
        if(selectedChits[j]==i){
            there=1;break;
        }
    }

return there;

}

function drawChit(i){
    if(locationOfChits[i]!=undefined){
        if(selectedAlready(i)==0){
            c.fillStyle='red';
            c.fillRect(locationOfChits[i][0],locationOfChits[i][1],WIDTHOFEACHCHIT,HEIGTHOFEACHCHIT);
        
        }
       

    }
}

function notSelected(i){
    var there=1;
    if(selectedChits[0]>-1){

        for(let j=0;j<selectedChits.length;j++){
            if(selectedChits[j]==i){
                there=0;
                break;
            }
    }
    }
return there;
}

function drawChits(){
    for(var i=0;i<NUMBEROFCHITS;i++){
       // if(notSelected(i)==1){
            drawChit(i);
        //}
    }
}

function updateChitLocation(i){
    locationOfChits[i][0]+=chitsVelocity[i][0];
    locationOfChits[i][1]+=chitsVelocity[i][1];
}


function updateChitsLocation(){
    for(var i=0;i<NUMBEROFCHITS;i++){
        updateChitLocation(i);
    }
}

function update(){
    var time=new Date().getTime();
    c.clearRect(0,0,can.width,can.height);
    if(time-STARTINGTIME<1000){
       
        updateChitsLocation();
    }
    chitSelectedByPlayer();
}

function draw(){
    drawChits();
    drawGameCircle();
}

// CHITS SELECTION:

var mousePosition=[];

function onMouseClick(event){
    mousePosition[0]= event.clientX;
    mousePosition[1]=event.clientY;
    //console.log(mousePosition);
}

function distanceBetween(p1,p2) {
    var dis=Math.sqrt(Math.pow(p1[0]-p2[0],2)+Math.pow(p1[1]-p2[1],2))
    return dis;}

function mouseInsideChit(x,y,i){
    var returning=0;
    //console.log(locationOfChits);
    if(locationOfChits[i]!=undefined){
        if(locationOfChits[i][0] < x 
            && (locationOfChits[i][0]+WIDTHOFEACHCHIT)>x 
            && locationOfChits[i][1] < y 
            && (locationOfChits[i][1]+HEIGTHOFEACHCHIT)>y){
        returning=1;}
        
    }return returning; 
}

function chitSelectionOrNo(x,y){
    var chitnum=-1;
    for(var i=0;i<NUMBEROFCHITS;i++){
         if(mouseInsideChit(x,y,i)==1){
            //console.log(chitnum);
            chitnum=i;break;
         }
    }
    return chitnum;
}

var chitNumber = -1;

function isInsideCircle(){
    var distance=distanceBetween(mousePosition,CENTER);
    if(distance<=RADIUSOFCHITSSELECTION){
        chitNumber=chitSelectionOrNo(mousePosition[0],mousePosition[1]);
        //console.log(chitNumber);
    
    }
    return chitNumber;
}

var selectedChits=[];

function removeChitSelectedByMe(i){
    //   locationOfChits.splice(i,1);
    selectedChits.push(i);
    //console.log(selectedChits);
    chitsArray.splice(i,1);
    //chitsVelocity.splice(i,1);
}

function chitSelectedByPlayer(){
    var chitNum=isInsideCircle();
    if(chitNum>-1){
        removeChitSelectedByMe(chitNum);
    }
}

const STARTINGTIME=new Date().getTime();

function main(){
    requestAnimationFrame(main);
    update();    
    draw();
   // console.log(selectedChits);
}

velocityOfChits();

main();