// Content rendering functions
function renderContent() {
  document.querySelector(".logo").textContent = portfolioData.personal.name;
  renderBanner();
  document.getElementById("experience-container").innerHTML =
    generateExperienceHTML(portfolioData.experience.current);
  document.getElementById("projects-container").innerHTML =
    portfolioData.projects.map(generateProjectHTML).join("");
  document.getElementById("education-container").innerHTML =
    portfolioData.education.map(generateEducationHTML).join("");
  document.getElementById("about-container").innerHTML = generateAboutHTML(
    portfolioData.about
  );
  updateSocialLinks();
}

function renderBanner() {
  const bannerContent = document.querySelector(".banner-content");
  bannerContent.innerHTML = `
        <h1>${portfolioData.personal.name}</h1>
        <h2>${portfolioData.personal.roles.join(" ")}</h2>
        <div class="banner-social">
            <a href="#" target="_blank" id="linkedin-banner">
                <i class="fab fa-linkedin"></i> LinkedIn
            </a>
            <a href="#" target="_blank" id="github-banner">
                <i class="fab fa-github"></i> GitHub
            </a>
        </div>
    `;
}

function updateSocialLinks() {
  // Update strip links
  document.getElementById("linkedin-strip").href =
    portfolioData.personal.social.linkedin;
  document.getElementById("github-strip").href =
    portfolioData.personal.social.github;
  document.getElementById("instagram-strip").href =
    portfolioData.personal.social.instagram;

  // Update banner links
  document.getElementById("linkedin-banner").href =
    portfolioData.personal.social.linkedin;
  document.getElementById("github-banner").href =
    portfolioData.personal.social.github;
}

// HTML Generator Functions
function generateExperienceHTML(exp) {
  return `
        <div class="experience-card">
            <h3>${exp.title}</h3>
            <span class="company">${exp.company}</span>
            <span class="duration">${exp.duration}</span>
            <ul class="responsibilities">
                ${exp.responsibilities
                  .map((resp) => `<li>${resp}</li>`)
                  .join("")}
            </ul>
            <div class="tech-tags">
                ${exp.technologies
                  .map((tech) => `<span>${tech}</span>`)
                  .join("")}
            </div>
        </div>
    `;
}

function generateProjectHTML(project) {
    return `
        <div class="project-card">
            <div class="project-content">
                <h3>${project.title}</h3>
                <div class="project-details">
                    <p class="project-description">${project.description}</p>
                    <ul class="project-features">
                        ${project.features.map(feature => `
                            <li><i class="fas fa-check"></i> ${feature}</li>
                        `).join('')}
                    </ul>
                    <div class="project-links">
                        <a href="${project.github}" target="_blank" class="project-link">
                            <i class="fab fa-github"></i> Code
                        </a>
                        ${project.live ? `
                            <a href="${project.live}" target="_blank" class="project-link">
                                <i class="fas fa-external-link-alt"></i> Live Demo
                            </a>
                        ` : ''}
                    </div>
                    <div class="tech-tags">
                        ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
}


function generateEducationHTML(edu) {
  return `
        <div class="education-card">
            <div class="education-content">
                <h3>${edu.degree}</h3>
                <span class="institute">${edu.institute}</span>
                ${edu.year ? `<span class="year">${edu.year}</span>` : ""}
            </div>
        </div>
    `;
}

function generateAboutHTML(about) {
  return `
        ${about.description.map((para) => `<p>${para}</p>`).join("")}
        <div class="tech-stack">
            <h4>Technical Expertise</h4>
            <div class="tech-tags">
                ${about.skills.map((skill) => `<span>${skill}</span>`).join("")}
            </div>
        </div>
    `;
}

// Mobile menu functionality
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("active");
  document.body.classList.toggle("no-scroll");
  menuToggle.classList.toggle("active");
});

document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("active");
    document.body.classList.remove("no-scroll");
    menuToggle.classList.remove("active");
  });
});

// Back to top functionality
const backToTopButton = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopButton.classList.add("visible");
  } else {
    backToTopButton.classList.remove("visible");
  }
});

backToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});


function handleFormSubmit() {
    const form = document.querySelector('.contact-form');
    const emailInput = document.getElementById("email");

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!isValidEmail(emailInput.value)) {
            showPopup('Please enter a valid email address', 'error');
            emailInput.focus();
            return;
        }
        
        const formData = new FormData(form);
        
        try {
            const response = await fetch('https://formspree.io/f/xovvdbgz', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                // Show success popup
                showPopup('Message sent successfully!', 'success');
                // Reset form
                form.reset();
            } else {
                showPopup('Failed to send message. Please try again.', 'error');
            }
        } catch (error) {
            showPopup('Something went wrong. Please try again.', 'error');
        }
    });
}

function showPopup(message, type) {
    const popup = document.createElement('div');
    popup.className = `popup ${type}`;
    popup.innerHTML = `
        <div class="popup-content">
            <p>${message}</p>
        </div>
    `;
    
    document.body.appendChild(popup);
    
    // Remove popup after 3 seconds
    setTimeout(() => {
        popup.remove();
    }, 3000);
}

// Initialize content when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  renderContent();
  handleFormSubmit();
});
