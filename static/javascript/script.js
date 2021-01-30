window.onload = function(){

    let answer_1 = document.getElementById("answer1-content");
    let answer_2 = document.getElementById("answer2-content");
    let question = document.getElementById("question-content");

    newTour();


    function newTour(){
        fetch('http://localhost:5000/get')
        .then(res => res.json())
        .then(data => update(data));  
    }

    function update(data){
        answer_1.innerText = data.answer_1;
        answer_2.innerText = data.answer_2;
        question.innerText = data.question;
    }
}


