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
        text: "You got a ticket and an invite from your mail saying “Welcome to Pill Paradise”, what do you do with it?",
        choices: [
            {
                text: "I would love to, but I think I will need to plan this trip out first.",
                score: "J"
            },
            {
                text: "I want to go to this place! I wonder what it will be like!",
                score: "P"
            }
        ]
    },
    {
        text: "When you arrived, the place looked just like a giant factory. Everything is so shiny, and you can't wait to explore this place!",
        choices: [
            {
                text: "Fascinating! I wonder how the production line works? Maybe I can learn something about how pills are made here!",
                score: "T"
            },
            {
                text: "Whoa! It's beautiful in its way… I bet the people who made this put a lot of love and effort into it!",
                score: "F"
            }
        ]
    },
    {
        text: "You got escorted into the factory! You see a lot of tubes and pipes, and the tour guide asks you to drink a potion for “a better experience”... ",
        choices: [
            {
                text: "Wait, what's in this potion? Is there an ingredient list? What if I am allergic to it?",
                score: "S"
            },
            {
                text: "A mystery potion? This is probably something important. I wonder if it makes me hallucinate or something…",
                score: "N"
            }
        ]
    },
    {
        text: "Skeptical, but you still drank it. After all, we are all here for a better experience! Suddenly, you feel like you are floating… and boom! You turned into something really small… and you are being sent into the pipes!",
        choices: [
            {
                text: "Okay, this is not what I signed up for today. I hope there's at least a destination. Where exactly are we going??",
                score: "J"
            },
            {
                text: "I can float!! This is so cool. I wonder what kind of ride this is gonna be!",
                score: "P"
            }
        ]
    },
    {
        text: "The pipe sent you to a small room. The room is blowing hot air at you, and you feel super uncomfortable…",
        choices: [
            {
                text: "Where is the hot air blowing from? How long am I going to be here?",
                score: "S"
            },
            {
                text: "What is this? Am I being dried up? Is this some preparation for the next step?",
                score: "N"
            }
        ]
    },
    {
        text: "You saw a sign that says “Exit” and ran for it. Finally, you ran out of the room. The pipe kept pushing you forward, and now suddenly it is raining in the pipe!",
        choices: [
            {
                text: "Rain? Inside a pipe? Is this an error? Either way, I need to stay calm and figure this out.",
                score: "T"
            },
            {
                text: "Aw, it's raining? I don't mind if though, it's like a cleansing moment after all that heat!",
                score: "F"
            }
        ]
    },
    {
        text: "You got soaked, but the rain eventually stopped, and you are on your way to the next part of the journey.",
        choices: [
            {
                text: "Phew. That was way too much. By the way, how far have I traveled already?? When is this going to end?",
                score: "S"
            },
            {
                text: "Hmm… the water and the heat must've meant something is happening in the pipeline. I wonder what's coming next…",
                score: "N"
            }
        ],
    },
    {
        text: "Following the pipe, you got sent to a room with bright light, and a giant piece of metal is coming right at you! On top of your head!",
        choices: [
            {
                text: "Oh no!! I need a second to process this. Maybe there's a way to escape this without being crushed?",
                score: "I"
            },
            {
                text: "Is this a challenge? Let's Goooo!! I'm gonna fight that thing off!",
                score: "E"
            }
        ]
    },
    {
        text: "You escaped the attack and ran out of the room. Finally, this pipe is coming to an end.",
        choices: [
            {
                text: "Finally… I will need to think about all these because what do you mean, I just went through all that?",
                score: "I"
            },
            {
                text: "That was so random and fun! I would want to do it again! Next time, I am bringing my friends with me!",
                score: "E"
            }
        ]
    },
    {
        text: "You got out and you looked at yourself in the mirror… You have turned into a pill! One that represents you!",
        choices: [
            {
                text: "Seriously? How do I turn back to normal later? I still have a life outside of this!",
                score: "T"
            },
            {
                text: "I'm a pill now? That's actually kind of interesting. I wonder who I'll help?",
                score: "F"
            }
        ]
    },
    {
        text: "The last step before the potion wears off is to choose the coating! What would you choose?",
        choices: [
            {
                text: "Something soft and matte... maybe a pastel color. I want to be gentle, soothing, and not too flashy!",
                score: "I"
            },
            {
                text: "The bright colors so everyone can see me! I want to be pretty even as a pill, please?",
                score: "E"
            }
        ]
    },
    {
        text: "The potion finally wears off, and you are now back to yourself. Before going on with your day, you received a pill-shaped ornament of your own!",
        choices: [
            {
                text: "Sure, I'll take it. It'll be a nice souvenir of a bizarre journey.",
                score: "J"
            },
            {
                text: "That was fun! I will definitely keep this forever, or I can turn it into a keychain!",
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
    "INTJ": "anticoagulant",
    "INTP": "immunosuppressant",
    "ENTJ": "analgesic",
    "ENTP": "antibiotic",
    "INFJ": "statin",
    "INFP": "corticosteroid",
    "ENFJ": "antiviral",
    "ENFP": "bronchodilator",
    "ISTJ": "ssri",
    "ISFJ": "antihistamine",
    "ESTJ": "ppis",
    "ESFJ": "diuretic",
    "ISTP": "betablocker",
    "ISFP": "anticonvulsant",
    "ESTP": "hypoglycemic",
    "ESFP": "antidepressant"
}

const resultNextButton = document.getElementById("result-next-button")
const retryButton = document.getElementById("retry-button")

resultNextButton.addEventListener("click", () => {
    switchToScreen("links")
})

retryButton.addEventListener("click", () => {
    switchToScreen("title")
})
