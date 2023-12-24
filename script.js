const questions = [
    
       { question:"Fathometer is used to measure",
        answer:[
            {text:"Earthquakes",correct:false},
            {text:"Rainfall",correct:false},
            {text:"Ocean depth",correct:true},
            {text:"Sound intensity",correct:false}
        ]},
        {question:"Fastest Shorthand Writer was",
        answer:[
            {text:" Dr. G. D. Bist",correct:true},
            {text:" J.R.D. Tata",correct:false},
            {text:"J.M. Tagore",correct:true},
            {text:"Khudada Khan",correct:false}
        ]},
        {question:"Epsom(England) is the place associated with",
        answer:[
            {text:"Snooker",correct:false},
            {text:"Shooting",correct:false},
            {text:"Polo",correct:true},
            {text:"Horse Racing",correct:true}
        ]},
        {question:"6 months day and 6 months night - Country",
        answer:[
            {text:"Nepal",correct:false},
            {text:"Tibet",correct:false},
            {text:"Norway",correct:true},
            {text:"Iceeland",correct:false}
        ]
    }
]


const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('buttons');
const nextButton = document.getElementById('next-btn');


let currentQuestionIndex = 0;
let score=0;

function startQuiz(){
    currentQuestionIndex = 0;
    score=0;
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML= questionNo+ '. '+currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        const button =document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    });
}

function resetState(){
    nextButton.style.display = 'none';
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}


function selectAnswer(e){
    const selectedbtn = e.target;
    const isCorrect = selectedbtn.dataset.correct ==="true";
    if(isCorrect){
        selectedbtn.classList.add("correct")
        score++;
    }else{
        selectedbtn.classList.add("incorrect")
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct==='true'){
            button.classList.add('correct')
        }
        button.disabled = true;
    })
    nextButton.style.display = 'block';
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}! }`;
    nextButton.innerHTML = "Play again";
    nextButton.style.display = "block";
}



function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener('click', ()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();