 const hamburger = document.querySelector('.hamburger');
  const navLinks = document.getElementById('navLinks');

  // Toggle menu open/close
  hamburger.addEventListener('click', function (e) {
    e.stopPropagation(); // prevent from triggering the document click
    navLinks.classList.toggle('show');
  });

  // Close menu on any document click (outside the menu)
  document.addEventListener('click', function (e) {
    if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
      navLinks.classList.remove('show');
    }
  });  
  
  
  const form = document.getElementById("contactForm");
  const thankYouMessage = document.getElementById("thankYouMessage");

  const quotes = [
    "🌟 Thank you! Keep pushing forward — you're doing great!",
    "✅ Message received. Believe in yourself, always.",
    "💌 Thanks for reaching out! Stay strong and keep growing.",
    "🙏 Your message is on its way. One small step makes a big difference.",
    "🎯 Submission successful! Remember, every effort counts!"
  ];

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Optional: Check if all fields are filled
    const inputs = form.querySelectorAll("input, textarea");
    for (let input of inputs) {
      if (!input.value.trim()) {
        alert("Please fill all the fields before submitting.");
        return;
      }
    }

    // Hide form and show message
    form.style.display = "none";
    thankYouMessage.classList.remove("hidden");

    // Random quote
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    thankYouMessage.innerHTML = `<p style="font-size: 1.2rem; color: #00ffff; text-align: center; margin-top: 20px;">${randomQuote}</p>`;
  });
