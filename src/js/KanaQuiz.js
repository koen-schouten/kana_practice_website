const KanaQuiz = (function(){
    let kanaData;
    let kanaList;     //A list of all keys of the kanaDataObject

    let _questionAmount = 0;
    let _currentQuestionNumber = 0;
    let _mistakeCount = 0;
    let _answerAmount = 0;
    let _quizActive = false;

    let _questionType;
    let _answerType;

    let _questionList = [];

    const QUIZTYPES = {
        AUDIO: "audio",
        HIRAGANA: "hiragana",
        KATAKANA: "katakana",
        ROMAJI: "romaji"
    }

    const POSSIBLE_QUESTIONS = [QUIZTYPES.AUDIO, QUIZTYPES.ROMAJI, QUIZTYPES.HIRAGANA, QUIZTYPES.KATAKANA]
    const POSSIBLE_ANSWERS = [QUIZTYPES.HIRAGANA, QUIZTYPES.KATAKANA, QUIZTYPES.ROMAJI]

    const DEFAULT_ANSWERAMOUNT = 5;
    const DEFAULT_QUESTIONAMOUNT = 20;

    function getMistakeCount(){
        return _mistakeCount;
    }

    function getCurrentQuestionNumber(){
        return _currentQuestionNumber;
    }

    function getQuizActive(){
        return _quizActive;
    }

    function getQuestionList(){
        return _questionList;
    }

    function getQuestionAmount(){
        return _questionAmount;
    }

    function createNewQuiz(questionAmount, questionType, answerType, answerAmount){
        _questionAmount = questionAmount-1;
        _currentQuestionNumber = 0;
        _mistakeCount = 0;
        
        if(questionType == "audio"){
            _questionType = QUIZTYPES.AUDIO;

        }else{
            _questionType = questionType;
        }
        _answerType = answerType;
        _answerAmount = answerAmount;
        _questionList = [];
        for(let i = 0; i< questionAmount; i++){
            let question = _generateQuestion()
            _questionList.push(question);
        }

        _quizActive = true;
    }

    function init(){
        loadJSON("data/kanas.json", function(response){ 
            kanaData = JSON.parse(response);
            kanaList = Object.keys(kanaData);
            for(const key of Object.keys(kanaData)){

                audioManager.addTrack(kanaData[key]["audio"], kanaData[key]["audio"]);
            }
        });
    }

    function nextQuestion(){
        if(_currentQuestionNumber < _questionAmount){
            _currentQuestionNumber += 1;
        }else{
            _quizActive = false;
        }
    }

    function selectAnswer(selectedAnswer){
        let question = _questionList[_currentQuestionNumber]
        let rightAnswer = question.rightAnswer;

        if(rightAnswer != selectedAnswer){
            question.addMistake();
            _mistakeCount += 1;
            return false;
        }else{
            nextQuestion();
            return true;
        }

    }

    function _generateQuestion(){
        let questionType = _questionType;
        let answerType = _answerType;

        //Pick a random question with answer
        let rightAnswerNumber = kanaList.length * Math.random() << 0;
        let questionGroup = kanaData[kanaList[rightAnswerNumber]];
        let question = questionGroup[questionType];
        let rightAnswer = questionGroup[answerType];

        //Generate a random set of answers.
        let answers = [];
        let answerSet = new Set([rightAnswerNumber]); //Using a set to prevent duplicate answers

        while(answerSet.size < _answerAmount){
            answerSet.add(kanaList.length * Math.random() << 0);  
        }

        let answer;
        let answerGroup;

        for(answerNumber of answerSet){
            answerGroup = kanaData[kanaList[answerNumber]];
            answer = answerGroup[answerType];
            answers.push(answer)
        }
        return new Question(questionType, answerType, question, answers, rightAnswer)
    }

    return {
        POSSIBLE_QUESTIONS: POSSIBLE_QUESTIONS,
        POSSIBLE_ANSWERS: POSSIBLE_ANSWERS,
        QUIZTYPES: QUIZTYPES,
        DEFAULT_QUESTIONAMOUNT: DEFAULT_QUESTIONAMOUNT,
        DEFAULT_ANSWERAMOUNT: DEFAULT_ANSWERAMOUNT,
        init: init,
        getQuizActive: getQuizActive,
        getMistakeCount: getMistakeCount,
        getCurrentQuestionNumber: getCurrentQuestionNumber,
        createNewQuiz: createNewQuiz,
        nextQuestion: nextQuestion,
        getQuestionAmount: getQuestionAmount,
        getQuestionList: getQuestionList,
        selectAnswer: selectAnswer
    }
})();


document.addEventListener("DOMContentLoaded", function(){
    KanaQuiz.init();
})