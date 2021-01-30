window.onload = function(){

    let answer1 = document.getElementById("answer1-card");
    let answer2 = document.getElementById("answer2-card");
    let animatedQuestionCard = document.getElementById("animated-question-card");

    let answer1Content = document.getElementById("answer1-content");
    let answer2Content = document.getElementById("answer2-content");
    let questionContent = document.getElementById("question-content");
    let animatedQuestionContent = document.getElementById("animated-question-content");

    newTour();

    function newTour(){
        fetch('http://localhost:5000/get')
        .then(res => res.json())
        .then(data => update(data));  
    }

    function update(data){
        answer1Content.innerText = data.answer_1;
        answer2Content.innerText = data.answer_2;
        questionContent.innerText = data.question;
    }

    let duration = 1;

    answer1.onclick=function(){
        animatedQuestionContent.innerText = questionContent.innerText;
        animatedQuestionCard.style.animation = "";
        animatedQuestionCard.style.animation = `left ${duration}s 1`;
        newTour();
        setTimeout(function(){animatedQuestionCard.style.animation = "";},duration * 1000);
    }

    answer2.onclick=function(){
        animatedQuestionContent.innerText = questionContent.innerText;
        animatedQuestionCard.style.animation = "";
        animatedQuestionCard.style.animation = `right ${duration}s 1`;
        newTour();
        setTimeout(function(){animatedQuestionCard.style.animation = "";},duration * 1000);
    }

}


