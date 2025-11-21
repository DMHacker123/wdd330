let countdown = document.getElementById("countdown");
let startButton = document.getElementById("startButton");
const pauseResumeButton = document.getElementById("pauseResumeButton");
const timeInput = document.getElementById("timeInput");

let activeTimer = null;
let timeLeft = 10;
let isPaused = false;


// --- ⚙️ Main Timer Function ---
function startCountdown() {
    // 1. Clear any running timer (Fixes Typo)
    if (activeTimer){
        clearInterval(activeTimer) // Corrected 'ativeTimer' to 'activeTimer'
        activeTimer = null;
    }

    // 2. Get Custom Time (Fixes Input Reading)
    const customTime = parseInt(timeInput.value, 10); // Use .value, not .ariaValueMax
    timeLeft = (customTime > 0) ? customTime : 10;
    
    // Reset state for new countdown
    isPaused = false;
    countdown.textContent = timeLeft; // Display the starting time in the H1
    pauseResumeButton.textContent = 'Pause';
    pauseResumeButton.disabled = false;

    // 3. Start the interval
    activeTimer = setInterval(() =>{ 
        if(!isPaused){ 
            timeLeft --;
            countdown.textContent = timeLeft;

            if(timeLeft <= 0){
                clearInterval(activeTimer);
                countdown.textContent = "Time's up!";
                activeTimer = null;
                pauseResumeButton.disabled = true;
            }
        }
    }, 1000);
}

// --- ⏯️ Pause/Resume Function ---
function togglePauseResume(){
    // The CRITICAL FIX: Toggle the state of the pause flag
    if (activeTimer) {
        isPaused = !isPaused; 

        if (isPaused){
            pauseResumeButton.textContent = 'Resume';
        } else {
            pauseResumeButton.textContent = 'Pause';
        }
    }
}

// --- 📎 Event Listeners ---
startButton.addEventListener("click", startCountdown);
pauseResumeButton.addEventListener("click", togglePauseResume);
pauseResumeButton.disabled = true;
