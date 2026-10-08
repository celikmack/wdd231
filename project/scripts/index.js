// Wildlife Quiz 

// Async/await function 
async function fetchQuizData() {
    const quizCard = document.getElementById("quiz");
    if (!quizCard) return;

    quizCard.innerHTML = `
        <div class="card-header">
            <h2 class="title">Wildlife Quiz</h2>
            <p class="subtitle">Test Your Knowledge</p>
        </div>
        <div class="card-body">
            <div class="content"><p class="desc">Loading quiz question...</p></div>
        </div>
    `;

    // Robust try...catch error-handling block
    try {
        const response = await fetch("https://opentdb.com/api.php?amount=1&category=27&type=multiple");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        const item = data.results[0];
        if (!item) throw new Error("No quiz data found");

        const answers = [...item.incorrect_answers, item.correct_answer].sort(() => Math.random() - 0.5);

        quizCard.innerHTML = `
            <div class="card-header">
                <h2 class="title">Wildlife Quiz</h2>
                <p class="subtitle">Test Your Knowledge</p>
            </div>
            <div class="card-body">
                <div class="content">
                    <p class="desc quiz-question">${item.question}</p>
                    <div id="quiz-options" class="quiz-options-container">
                        ${answers.map(ans => `<button class="quiz-option" data-correct="${ans === item.correct_answer}">${ans}</button>`).join('')}
                    </div>
                    <p id="quiz-feedback" class="desc quiz-feedback"></p>
                </div>
            </div>
        `;

        const optionButtons = quizCard.querySelectorAll(".quiz-option");
        const feedback = quizCard.querySelector("#quiz-feedback");

        optionButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                const isCorrect = btn.getAttribute("data-correct") === "true";
                optionButtons.forEach(b => b.disabled = true);
                
                if (isCorrect) {
                    btn.style.background = "#27ae60";
                    btn.style.color = "#fff";
                    feedback.textContent = "Spot on! Brilliant choice. 🎉";
                    feedback.style.color = "#27ae60";
                } else {
                    btn.style.background = "#e53e3e";
                    btn.style.color = "#fff";
                    feedback.textContent = `Not quite! Answer: ${item.correct_answer}`;
                    feedback.style.color = "#e53e3e";
                }
            });
        });
    } catch (error) {
        console.error("Failed to fetch quiz data:", error);
        quizCard.innerHTML = `
            <div class="card-header">
                <h2 class="title">Wildlife Quiz</h2>
                <p class="subtitle">Test Your Knowledge</p>
            </div>
            <div class="card-body">
                <div class="content">
                    <p class="desc" style="color: #c0392b;"><strong>Notice:</strong> Unable to load the quiz at this moment.</p>
                </div>
            </div>
        `;
    }
}

// Eco-Action Pledge Interaction
function initPledgeCard() {
    const pledgeBtn = document.getElementById("pledge-btn");
    const pledgeCount = document.getElementById("pledge-count");

    if (!pledgeBtn || !pledgeCount) return;

    let count = Number(localStorage.getItem("ecoPledges")) || 128;
    pledgeCount.textContent = `Current community pledges: ${count}`;

    pledgeBtn.addEventListener("click", () => {
        count++;
        localStorage.setItem("ecoPledges", count);
        
        pledgeCount.textContent = `🎉 Thank you! Total community pledges: ${count}`;
        pledgeBtn.textContent = "Pledged!";
        pledgeBtn.disabled = true;
        pledgeBtn.classList.add("pledged-btn");
    });
}

// Single unified DOMContentLoaded block
document.addEventListener("DOMContentLoaded", () => {
    fetchQuizData();
    initPledgeCard();

    // Visit Counter (localStorage)
    const visitsDisplay = document.querySelector("#visits");

    if (visitsDisplay) {
        let numVisits = Number(window.localStorage.getItem("numVisits-ls")) || 0;

        if (numVisits !== 0) {
            visitsDisplay.textContent = numVisits;
        } else {
            visitsDisplay.textContent = `This is your first visit! Welcome!`;
        }

        numVisits++;
        localStorage.setItem("numVisits-ls", numVisits);
    }
});

