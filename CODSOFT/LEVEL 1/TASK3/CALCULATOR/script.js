const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

let currentInput = "";
let resultDisplayed = false;
let isDark = localStorage.getItem("calculatorDarkMode") === "true";

// Initialize theme
if (isDark) {
  body.classList.add("dark");
  themeToggle.textContent = "☀️";
} else {
  themeToggle.textContent = "🌙";
}

// Button click handler
buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.getAttribute("data-value");

    if (value === "AC") {
      currentInput = "";
      updateDisplay("0");
      resultDisplayed = false;
    } 
    else if (value === "DEL") {
      currentInput = currentInput.slice(0, -1);
      updateDisplay(currentInput || "0");
    }
    else if (value === "=") {
      calculateResult();
    } 
    else {
      handleInput(value);
    }
  });
});

// Theme toggle
themeToggle.addEventListener("click", () => {
  isDark = !isDark;
  body.classList.toggle("dark");
  themeToggle.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("calculatorDarkMode", isDark);
});

// Keyboard support
document.addEventListener("keydown", (event) => {
  const key = event.key;
  
  if (key === "Enter") {
    calculateResult();
  } 
  else if (key === "Backspace") {
    currentInput = currentInput.slice(0, -1);
    updateDisplay(currentInput || "0");
  } 
  else if ("0123456789+-*/.=cC".includes(key)) {
    const btn = document.querySelector(`.btn[data-value="${key.toUpperCase()}"]`) ||
                document.querySelector(`.btn[data-value="${key}"]`);
    if (btn) btn.click();
  }
});

function calculateResult() {
  try {
    const expression = currentInput.replace(/÷/g, "/").replace(/×/g, "*");
    const result = eval(expression);
    
    if (isNaN(result)) throw "Error";
    if (!isFinite(result)) {
      if (result > 0) throw "∞";
      else throw "-∞";
    }
    
    currentInput = result.toString();
    updateDisplay(currentInput);
    resultDisplayed = true;
  } catch (error) {
    updateDisplay(error);
    currentInput = "";
  }
}

function handleInput(value) {
  if (resultDisplayed && !isNaN(value)) {
    currentInput = value;
    resultDisplayed = false;
  } else {
    currentInput += value;
  }
  updateDisplay(currentInput);
}

function updateDisplay(value) {
  display.textContent = value;
  display.scrollLeft = display.scrollWidth;
}