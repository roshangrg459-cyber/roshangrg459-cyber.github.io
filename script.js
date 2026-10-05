// Interactive Particle Background Animation
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');

let particlesArray = [];
const numberOfParticles = 50;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }
    draw() {
        ctx.fillStyle = 'rgba(56, 189, 248, 0.3)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
        
        for (let j = i + 1; j < particlesArray.length; j++) {
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 120) {
                ctx.strokeStyle = `rgba(56, 189, 248, ${0.1 * (1 - distance / 120)})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();


// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = hamburger.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
    } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    }
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    });
});


// Project Filter Functionality
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            if (filterValue === 'all' || category === filterValue) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });
    });
});


// Interactive Code Playground Snippets & Execution
const langTabs = document.querySelectorAll('.lang-tab');
const editorContent = document.getElementById('editorCodeContent');
const runCodeBtn = document.getElementById('runCodeBtn');
const outputConsole = document.getElementById('outputConsole');

const codeSnippets = {
    cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "NAMESTE! I am Roshan Gurung from MetaHorizon College." << endl;
    return 0;
}`,
    js: `// JavaScript DOM event simulation for Roshan
const student = {
    name: "Roshan Gurung",
    college: "MetaHorizon College",
    faculty: "BSc CSIT (First Year)"
};

console.log("Logged in student profile:", student.name);
console.log("Institution:", student.college);`
};

let currentLang = 'cpp';

langTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        langTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        currentLang = tab.getAttribute('data-lang');
        editorContent.querySelector('code').textContent = codeSnippets[currentLang];
        outputConsole.innerHTML = `> Switched to ${currentLang.toUpperCase()} environment. Click "Run Code".`;
    });
});

runCodeBtn.addEventListener('click', () => {
    outputConsole.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Running ${currentLang.toUpperCase()} simulation...`;
    
    setTimeout(() => {
        if (currentLang === 'cpp') {
            outputConsole.innerHTML = `> Compiling source file...<br>
> Executing binary output:<br><br>
<span style="color: #38bdf8;">Hello! I am Roshan Gurung from MetaHorizon College.</span>`;
        } else {
            outputConsole.innerHTML = `> Executing JavaScript engine...<br><br>
<span style="color: #f7df1e;">Logged in student profile: Roshan Gurung<br>Institution: MetaHorizon College</span>`;
        }
    }, 600);
});


// Contact Form Simulation
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert(`Thank you for reaching out! Your message has been routed to rg123@gmail.com.`);
    contactForm.reset();
});