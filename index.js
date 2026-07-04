let homeScore = 0
let guestScore = 0
let quarter = 1

let timeRemaining = 720 // 12 minutes in seconds
let timerInterval = null

const homeScoreEl = document.getElementById("home-score")
const guestScoreEl = document.getElementById("guest-score")
const homeTitleEl = document.getElementById("home-title")
const guestTitleEl = document.getElementById("guest-title")
const quarterEl = document.getElementById("quarter")
const timerEl = document.getElementById("timer")
const historyEl = document.getElementById("history")

function updateScore(team, points) {
    if (team === "home") {
        homeScore += points
        homeScoreEl.textContent = homeScore
    } else {
        guestScore += points
        guestScoreEl.textContent = guestScore
    }

    updateLeader()
}

function updateLeader() {
    homeTitleEl.classList.remove("leading")
    guestTitleEl.classList.remove("leading")

    if (homeScore > guestScore) {
        homeTitleEl.classList.add("leading")
    } else if (guestScore > homeScore) {
        guestTitleEl.classList.add("leading")
    }
}

function nextQuarter() {
    if (quarter < 4) {
        quarter++
        quarterEl.textContent = quarter
    }
}

function startTimer() {
    if (timerInterval) return

    timerInterval = setInterval(() => {
        if (timeRemaining <= 0) {
            clearInterval(timerInterval)
            timerInterval = null
            return
        }

        timeRemaining--

        const minutes = Math.floor(timeRemaining / 60)
        const seconds = timeRemaining % 60

        timerEl.textContent =
            `${minutes}:${seconds.toString().padStart(2, "0")}`
    }, 1000)
}

function newGame() {
    const result = document.createElement("li")
    result.textContent =
        `Home ${homeScore} - ${guestScore} Guest`

    historyEl.prepend(result)

    homeScore = 0
    guestScore = 0
    quarter = 1
    timeRemaining = 720

    homeScoreEl.textContent = 0
    guestScoreEl.textContent = 0
    quarterEl.textContent = 1
    timerEl.textContent = "12:00"

    homeTitleEl.classList.remove("leader")
    guestTitleEl.classList.remove("leader")

    clearInterval(timerInterval)
    timerInterval = null
}

// Expose functions globally for onclick handlers
window.updateScore = updateScore
window.updateLeader = updateLeader
window.nextQuarter = nextQuarter
window.startTimer = startTimer
window.newGame = newGame