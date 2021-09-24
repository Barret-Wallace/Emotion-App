Pre1 = "";
Pre2 = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    image_quality: 90
});
cam = document.getElementById("camera");
Webcam.attach("camera");
function take_snapshot(){
    Webcam.snap(function (data_uri){
        document.getElementById("result").innerHTML = "<img id='img' src='"+ data_uri +"'>";
    }
    )}
    console.log(ml5.version);
    classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/8byS6lHZQ/model.json",modelLoaded);

    function modelLoaded(){
        console.log("Model is Loaded");
    }

    function check(){
        img = document.getElementById("img");
        classifier.classify(img,gotResults);
    }

    function gotResults(error, result){
        if(error){
            console.error(error);
        }
        else{
            console.log("Got the Result");
            Pre1 = result[0].label;
            Pre2 = result[1].label;
            document.getElementById("result_emotion_name").innerHTML = Pre1;
            document.getElementById("result_emotion_name2").innerHTML = Pre2;
            speak();
            if(Pre1 == "Happy"){
                document.getElementById("update_emoji").innerHTML = "<span>&#128522;</span>";
            }
            if(Pre1 == "Sad"){
                document.getElementById("update_emoji").innerHTML = "<span>&#128532;</span>";
            }
            if(Pre1 == "Angry"){
                document.getElementById("update_emoji").innerHTML = "<span>&#128545;</span>";
            }
            if(Pre2 == "Happy"){
                document.getElementById("update_emoji2").innerHTML = "<span>&#128522;</span>";
            }
            if(Pre2 == "Sad"){
                document.getElementById("update_emoji2").innerHTML = "<span>&#128532;</span>";
            }
            if(Pre2 == "Angry"){
                document.getElementById("update_emoji2").innerHTML = "<span>&#128545;</span>";
            }


        }
    }
    function speak(){
        var synth = window.speechSynthesis;
        d1 = "Prediction one is" + Pre1;
        d2 = "And prediction two is" + Pre2;
        var utterThis = new SpeechSynthesisUtterance(d1 + d2);
        synth.speak(utterThis);//speak() here refers to the pre-defined function, and not the speak() we defined
    }