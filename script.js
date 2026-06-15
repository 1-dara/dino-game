const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const bird = document.getElementById("bird");

const scoreDisplay = document.getElementById("score");
const highScoreDisplay = document.getElementById("highScore");
const message = document.getElementById("message");

let score = 0;
let gameOver = false;

let bestScore = localStorage.getItem("bestScore") || 0;

highScoreDisplay.textContent = `Best: ${bestScore}`;

function jump() {

    if (dino.classList.contains("jump")) return;

    dino.classList.add("jump");

    setTimeout(() => {
        dino.classList.remove("jump");
    }, 600);
}

document.addEventListener("keydown", (event) => {

    if (event.code === "Space") {

        if (gameOver) {
            location.reload();
        } else {
            jump();
        }
    }
});

const scoreInterval = setInterval(() => {

    if (!gameOver) {

        score++;

        scoreDisplay.textContent = score;
    }

}, 100);

const collisionCheck = setInterval(() => {

    const dinoBottom =
        parseInt(
            window
                .getComputedStyle(dino)
                .getPropertyValue("bottom")
        );

    const gameRect =
        document
            .getElementById("game")
            .getBoundingClientRect();

    const cactusLeft =
        cactus.getBoundingClientRect().left -
        gameRect.left;

    const birdLeft =
        bird.getBoundingClientRect().left -
        gameRect.left;

    if (
        cactusLeft > 40 &&
        cactusLeft < 95 &&
        dinoBottom < 50
    ) {
        endGame();
    }

    if (
        birdLeft > 40 &&
        birdLeft < 95 &&
        dinoBottom < 85
    ) {
        endGame();
    }

}, 10);

function endGame() {

    gameOver = true;

    cactus.style.animation = "none";
    bird.style.animation = "none";

    if (score > bestScore) {
        localStorage.setItem(
            "bestScore",
            score
        );
    }

    message.textContent =
        `Game Over! Score: ${score}. Press SPACE to Restart`;

    clearInterval(scoreInterval);
}

let darkMode = false;

setInterval(() => {

    darkMode = !darkMode;

    document.body.style.background =
        darkMode ? "black" : "white";

    document.body.style.color =
        darkMode ? "white" : "black";

}, 20000);