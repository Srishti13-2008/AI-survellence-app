status="";
objects=[];
function preload(){
video=createVideo('video.mp4');
video.hide();
}
function setup(){
    canvas=createCanvas(450,450);
    canvas.center();
}
function start(){
    objectDetector=ml5.objectDetector('cocossd', modelloaded);
    document.getElementById("status").innerHTML="Status: Detecting objects ";
}
function modelloaded(){
    console.log('modelloaded');
    status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
function gotResult(){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects=results;
}
function draw(){
    image(video, 0, 0, 450, 450);
    if(status!=""){
        objectDetector.detect(video,gotResult)
        for(i=0;i<objects.length;i++){
            document.getElementById("status").innerHTML=" Status: Objects Detected ";
            document.getElementById("number_of_object").innerHTML=" Number of object detected are: "+objects.length;
            fill("#e6e6fa");
            persent=floor(objects[i].confidence*100);
            text(objects[i].label+""+percent+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke ("#000000");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}