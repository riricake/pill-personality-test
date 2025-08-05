const screens = {
    titleScreen: document.getElementById("title-screen"),
    questionsScreen: document.getElementById("questions-screen"),
    resultScreen: document.getElementById("result-screen"),
    linksScreen: document.getElementById("links-screen")
}

const questionText = document.getElementById("question-text")
const questionImage = document.getElementById("question-image")
const loadingBar = document.getElementById("loading-bar")

const questionButtons = {
    infoButton: document.getElementById("info-button"),
    questionButton1: document.getElementById("question-button-1"),
    questionButton2: document.getElementById("question-button-2")
}

const questions = [
    {
        text: "You step into the pharmacy where you work as a pharmacist. You put your white coat on and... wait, why have all my co-workers and patients turned into animals?",
        choices: [
            {
                text: "Is this a dream? What is going on? I should stay calm and think about this.",
                score: "J"
            },
            {
                text: "That's unexpected. I wonder if I am also an animal... let's see how this goes!",
                score: "P"
            }
        ]
    },
    {
        text: "You are a little confused, but you still started your daily routine as usual. However, one of your coworkers started sobbing in the corner because she messed up a patient's prescriptions...",
        choices: [
            {
                text: "Is this because she turned into a bunny? Are bunnies' brains capable of working as pharmacy technicians?",
                score: "T"
            },
            {
                text: "It's okay, she probably freaked out because we were all turned into animals suddenly. I should talk to her.",
                score: "F"
            }
        ]
    },
    {
        text: "Suddenly, all the prescription bottles started floating and the pills turned into animal-shaped pills!",
        choices: [
            {
                text: "Oh no! Let's check all those pills and remember each pill type to minimize any mix-ups!",
                score: "S"
            },
            {
                text: "I should stick to what I have to do and put them back. There is definitely something bigger coming!",
                score: "N"
            }
        ]
    },
    {
        text: "You see one shiny pill among all of those floating ones in front of you. It looks like a little star! You try to grab it and you realize that it smells like cotton candy...",
        choices: [
            {
                text: "This is a little suspicious. I should store it in a separate container and try to understand it better.",
                score: "J"
            },
            {
                text: "I want to see what it tastes like! Will it make my body shine after I eat it?",
                score: "P"
            }
        ]
    },
    {
        text: "A patient started asking you about their prescription. As you provide patient counseling, you notice that they are holding a wand...",
        choices: [
            {
                text: "Whoa! That's a cool-looking wand. Where did they get that? I wonder what the wand does...",
                score: "S"
            },
            {
                text: "Hey, is this the wizard that turned everyone into animals? Does that wand represent anything important? I better ask about it.",
                score: "N"
            }
        ]
    },
    {
        text: "You got busy working... but hey, your daily delivery person is here! You signed the packages and opened them to check for the items inside. But wait a minute... there is nothing but mushrooms inside!",
        choices: [
            {
                text: "What in the world is going on? This is a pharmacy! I should contact the delivery company and ask them what happened.",
                score: "T"
            },
            {
                text: "That is so weird! This must be a mix-up. I should make sure everyone is okay and figure out what is going on.",
                score: "F"
            }
        ]
    },
    {
        text: "Mushrooms are invading your pharmacy! You hear cats meowing and dogs barking everywhere. Thankfully, a chicken showed up with a magical wand and saved you from mushroom disaster!",
        choices: [
            {
                text: "Chicken with a wand? It might lead me to why this is all happening! I need to follow it and see what happens.",
                score: "S"
            },
            {
                text: "It must be communicating with us about something important... I should investigate its intention.",
                score: "N"
            }
        ],
    },
    {
        text: "The chicken tried to talk to you!",
        choices: [
            {
                text: "Can we even communicate? What could it possibly want?",
                score: "I"
            },
            {
                text: "The chicken wants to talk to me! This is so cool! I must listen to what it has to say.",
                score: "E"
            }
        ]
    },
    {
        text: "The chicken started talking in its own language. You don't seem to understand it... but as it is talking, you notice that the star-shaped pill from earlier started glowing more and more!",
        choices: [
            {
                text: "I'd rather not bother trying to understand the chicken... it may be warning me about the glowing pill, so I'll stay back.",
                score: "I"
            },
            {
                text: "I should take that pill! That may be my chance to learn chicken language!",
                score: "E"
            }
        ]
    },
    {
        text: "The chicken casts some spell on the pill and it turned into a potion! However, the potion breaks into pieces before it reaches you and splashes everywhere!",
        choices: [
            {
                text: "What is the potion gonna do to me? Am I going to turn into an animal too? This is so confusing!",
                score: "T"
            },
            {
                text: "Oh no! Is the chicken ok? Is everyone okay? What is this potion going to do to us?",
                score: "F"
            }
        ]
    },
    {
        text: "A bright light shines into your eyes and you realize you are in your bedroom. Seems like the potion woke you up. That was quite an adventure!",
        choices: [
            {
                text: "Huh, I hope everything is normal now. I need some time to rest and process all of that... what's for breakfast?",
                score: "I"
            },
            {
                text: "That was so cool! I wonder who the chicken was... I should tell my friends and ask them what they think!",
                score: "E"
            }
        ]
    },
    {
        text: "You had a normal day at your local pharmacy. As you are clocking out, you notice that there is a little chicken sticker on the floor. You picked it up and it said: \"I will see you again!\". The chicken looks exactly the same as the one you saw earlier!",
        choices: [
            {
                text: "That was wild. Whoever made this is weird. I will keep the sticker though.",
                score: "J"
            },
            {
                text: "I wonder what will come next when we meet!",
                score: "P"
            }
        ]
    }
]

let currentScreen = null

function switchToScreen(newScreen) {
    for (const screen of Object.values(screens)) {
        screen.style.display = "none"
    }

    screens[`${newScreen}Screen`].style.display = "flex"
}

switchToScreen("title")

const startButton = document.getElementById("start-button")

let imageAnimation = null
let currentQuestion = -1

function displayQuestion(questionNumber) {
    if (questionNumber < 0 || questionNumber >= questions.length) {
        console.error("Failed to fetch question!")
        return
    }

    const questionData = questions[questionNumber]

    questionText.textContent = questionData.text
    loadingBar.src = `./assets/progress-bar/q${String(questionNumber).padStart(2, "0")}-progress.svg`

    if (imageAnimation != null) {
        clearInterval(imageAnimation)
        imageAnimation = null
    }

    questionButtons.questionButton1.style.display = "flex"
    questionButtons.questionButton2.style.display = "flex"
    questionButtons.infoButton.style.display = "none"
    questionButtons.questionButton1.textContent = questionData.choices[0].text
    questionButtons.questionButton2.textContent = questionData.choices[1].text

    questionImage.src = `./assets/question-icons/q${String(questionNumber + 1).padStart(2, "0")}.png`
}

function nextQuestion() {
    currentQuestion++

    if (currentQuestion >= questions.length) {
        calculateResult()
        resultImage.src = `./assets/${personalityMappings[finalPersonalityScore]}_card.png`
        switchToScreen("result")
        return
    }

    displayQuestion(currentQuestion)
}

startButton.addEventListener("click", () => {
    currentQuestion = -1

    switchToScreen("questions")

    if (currentQuestion == -1) {
        nextQuestion()
    }
})

questionButtons.infoButton.addEventListener("click", () => {
    nextQuestion()
})

class DefaultMap {
    constructor() {
        this.map = new Map();
    }

    get(key) {
        if (!this.map.has(key)) {
            this.map.set(key, 0);
        }
        return this.map.get(key);
    }

    set(key, value) {
        this.map.set(key, value);
    }

    increment(key) {
        const currentValue = this.get(key);
        this.map.set(key, currentValue + 1);
    }
}

const scores = new DefaultMap()

function addToScores(choiceIndex) {
    const questionData = questions[currentQuestion]
    const score = questionData.choices[choiceIndex].score

    scores.increment(score, 1)
}

questionButtons.questionButton1.addEventListener("click", () => {
    addToScores(0)
    nextQuestion()
})

questionButtons.questionButton2.addEventListener("click", () => {
    addToScores(1)
    nextQuestion()
})

const resultImage = document.getElementById("result-image")

let finalPersonalityScore = ""

const criteria = [
    ["I", "E"],
    ["S", "N"],
    ["T", "F"],
    ["J", "P"]
]

function calculateResult() {
    let result = ""

    for (const letters of criteria) {
        if (scores.get(letters[0]) > scores.get(letters[1])) {
            result += letters[0]
        } else {
            result += letters[1]
        }
    }

    finalPersonalityScore = result
}

const personalityMappings = {
    "INTJ": "pig",
    "INTP": "frog",
    "ENTJ": "bear",
    "ENTP": "fox",
    "INFJ": "seal",
    "INFP": "bunny",
    "ENFJ": "duck",
    "ENFP": "squirrel",
    "ISTJ": "owl",
    "ISFJ": "deer",
    "ESTJ": "parrot",
    "ESFJ": "elephant",
    "ISTP": "cat",
    "ISFP": "raccoon",
    "ESTP": "lion",
    "ESFP": "dog"
}

const resultNextButton = document.getElementById("result-next-button")
const retryButton = document.getElementById("retry-button")

resultNextButton.addEventListener("click", () => {
    switchToScreen("links")
})

retryButton.addEventListener("click", () => {
    switchToScreen("title")
})
