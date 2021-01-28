window.onload = function(){

    let questionCard = document.getElementById("question-card");
    let answer1Card = document.getElementById("answer1-card");
    let answer2Card = document.getElementById("answer2-card");

    let clicked = false;
    let stop = false;

    function click(){
        clicked = true;
        questionCard.style.cursor = "grabbing";
    }

    questionCard.onmousedown = click;
    
    let relMousePos;
    let maxSkew = 10;

    questionCard.addEventListener('mousemove', function (e) {
        if(clicked && !stop){
            let rect = e.target.getBoundingClientRect();
            let x = e.clientX - rect.left;
            relMousePos = x/questionCard.offsetWidth -0.5;

            let skew = relMousePos * 20;

            if(skew > maxSkew){
                skew = maxSkew;
            }else if(skew < -maxSkew){
                skew = -maxSkew;
            }

            questionCard.style.transform = `skew(${-skew}deg)`;
        }
    })

    document.onmouseup = function(e){
        clicked = false;
        let border = 0.1;
        if(!stop){
            if(relMousePos < -border || relMousePos > border){
                stop = true;
                setTimeout(function(){ location.reload(); }, 500);
                if(relMousePos < -border){
                    questionCard.style.transform = `skew(${maxSkew}deg)`;
                    answer1Card.style.backgroundColor = "green";
                }else{
                    questionCard.style.transform = `skew(${-maxSkew}deg)`;
                    answer2Card.style.backgroundColor = "green";
            }
        }
    }
        
        questionCard.style.cursor = "grab";
    }

    answer1Card.addEventListener('click',function(){
        setTimeout(function(){ location.reload(); }, 500);
        stop = true;
        questionCard.style.transform = `skew(${maxSkew}deg)`;
        answer1Card.style.backgroundColor = "green";
    })

    answer2Card.addEventListener('click',function(){
        setTimeout(function(){ location.reload(); }, 500);
        stop = true;
        questionCard.style.transform = `skew(${-maxSkew}deg)`;
        answer2Card.style.backgroundColor = "green";
    })
    
}


