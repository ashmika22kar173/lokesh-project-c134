song = "";
status = "";
objects = [];

function preload() {
    song = loadSound("alert_2.mp3");
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
    object = ml5.objectDetector('cocossd', modelloaded);
    document.getElementById("status").innerHTML = "Status: Objects Detecting";

}

function draw() {
    image(video, 0, 0, 500, 500);
    if (status != "") {
        object.detect(video, gotresult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Objects Detected";
            document.getElementById("baby").innerHTML = "Baby Found";

            fill("#ff0000");
            lokesh = floor(objects[i].confidence * 100);
            text(objects[i].label + "" + lokesh + "%", objects[i].x + 20, objects[i].y + 20);
            noFill();
            stroke("#ff0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }

    }
}

function modelloaded() {
    console.log("model loaded");
    status = true;
}

function gotresult(error, results) {
    if (error) {
        console.log(error);
    } else {
        console.log(results);
        objects = results;
    }

}