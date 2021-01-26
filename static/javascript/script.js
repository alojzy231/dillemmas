window.onload = function(){

    let questionCard = document.getElementById("question-card");

    let clicked = false;

    function click(){
        clicked = true;
        questionCard.style.cursor = "grabbing";
    }

    questionCard.onmousedown = click;
    
    var relMousePos;

    questionCard.addEventListener('mousemove', function (e) {
        if(clicked){
            let rect = e.target.getBoundingClientRect();
            let x = e.clientX - rect.left;
            relMousePos = x/questionCard.offsetWidth -0.5;

            let skew = relMousePos * 20;
            let maxSkew = 10;

            if(skew > maxSkew){
                skew = maxSkew;
            }else if(skew < -maxSkew){
                skew = -maxSkew;
            }

            questionCard.style.transform = `skew(${-skew}deg)`;
        }
    })

    questionCard.onmouseup = function(e){
        clicked = false;
        let border = 0.1;
        if(relMousePos < -border || relMousePos > border){
            setTimeout(function(){ location.reload(); }, 500);
            if(relMousePos < -border){
                document.getElementById("answer1-card").style.backgroundColor = "green";
            }else{
                document.getElementById("answer2-card").style.backgroundColor = "green";
            }
        }
        
        questionCard.style.cursor = "grab";
        questionCard.style.transform = `skew(0deg)`;
    }

    
}


