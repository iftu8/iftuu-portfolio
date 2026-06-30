/**
 * ⚡ Premium Futuristic Portfolio Interactions
 * Author: Iftekhar Ahmmed Chowdhury
 */

document.addEventListener("DOMContentLoaded", () => {
    initTypewriter();
    initDynamicGreeting();
    fetchGitHubStats();
});

// 1. Dynamic Typing Effect for Hero Section
function initTypewriter() {
    const target = document.getElementById("typing-text");
    if (!target) return;
    
    const words = ["Creative Developer", "Automation Expert", "Digital Architect"];
    let i = 0, timer;

    function typingEffect() {
        let word = words[i].split("");
        var loopTyping = function() {
            if (word.length > 0) {
                target.innerHTML += word.shift();
                timer = setTimeout(loopTyping, 100);
            } else {
                setTimeout(deletingEffect, 2000);
            }
        };
        loopTyping();
    }

    function deletingEffect() {
        let word = words[i].split("");
        var loopDeleting = function() {
            if (word.length > 0) {
                word.pop();
                target.innerHTML = word.join("");
                timer = setTimeout(loopDeleting, 50);
            } else {
                i = (words.length > i + 1) ? i + 1 : 0;
                setTimeout(typingEffect, 500);
            }
        };
        loopDeleting();
    }
    typingEffect();
}

// 2. Smart AI-style Dynamic Time Greeting
function initDynamicGreeting() {
    const greetingEl = document.getElementById("dynamic-greeting");
    if (!greetingEl) return;
    
    const hour = new Date().getHours();
    let message = "Welcome to the Future";
    
    if (hour < 12) message = "Good Morning, System Operational";
    else if (hour < 18) message = "Good Afternoon, Core Loaded";
    else message = "Good Evening, Night Mode Activated";
    
    greetingEl.innerText = message;
}

// 3. Live Automation: Fetch Real-time GitHub Profile Metrics
async function fetchGitHubStats() {
    const username = "iftu8"; // Apnar GitHub Username
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) throw new Error("Network status error");
        const data = await response.json();
        
        // Target elements and securely inject data if they exist
        if(document.getElementById("github-repos")) {
            document.getElementById("github-repos").innerText = data.public_repos;
        }
        if(document.getElementById("github-followers")) {
            document.getElementById("github-followers").innerText = data.followers;
        }
    } catch (error) {
        console.error("System logs: Failed to fetch live sync statistics", error);
    }
}
