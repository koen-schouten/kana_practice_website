function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


class Question{
    constructor(questionType, answerType, question, answers, rightAnswer){
        shuffleArray(answers);
        this.mistakeCount = 0;
        this.questionType = questionType;
        this.answerType = answerType;
        this.question = question;
        this.answers = answers.map(answer => {return{"text": answer, "selected" : false}});
        this.rightAnswer = rightAnswer;
    }

    addMistake(){
        this.mistakeCount += 1;
    }
}