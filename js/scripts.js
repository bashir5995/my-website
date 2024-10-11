// Theme Toggle Functionality
document.getElementById('theme-toggle').addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    let newTheme;
    if (currentTheme === 'dark') {
        newTheme = 'green';
    } else if (currentTheme === 'green') {
        newTheme = 'light';
    } else {
        newTheme = 'dark';
    }
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

window.addEventListener('DOMContentLoaded', () => {
    document.documentElement.setAttribute('data-theme', 'light'); // Default theme
});

// Contact Form Validation
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');

    form.addEventListener('submit', (event) => {
        let isValid = true;

        // Clear previous error messages
        document.querySelectorAll('.error-message').forEach((msg) => msg.remove());

        // Validate Name
        if (nameInput.value.trim() === '') {
            showError(nameInput, 'Name is required');
            isValid = false;
        }

        // Validate Email
        if (!validateEmail(emailInput.value.trim())) {
            showError(emailInput, 'Valid email is required');
            isValid = false;
        }

        // Validate Subject
        if (subjectInput.value.trim() === '') {
            showError(subjectInput, 'Subject is required');
            isValid = false;
        }

        // Validate Message
        if (messageInput.value.trim() === '') {
            showError(messageInput, 'Message is required');
            isValid = false;
        }

        if (!isValid) {
            event.preventDefault();
        } else {
            alert('Message sent successfully!');
        }
    });

    function showError(input, message) {
        const error = document.createElement('div');
        error.className = 'error-message';
        error.textContent = message;
        input.parentElement.appendChild(error);
    }

    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(email);
    }
});

// Blog
document.addEventListener('DOMContentLoaded', function() {
    const readMoreLinks = document.querySelectorAll('.read-more');
    
    readMoreLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const postId = this.closest('.blog-post').dataset.id;
            loadFullPost(postId);
        });
    });
    
    function loadFullPost(postId) {
        fetch('blog-posts.json')
            .then(response => response.json())
            .then(posts => {
                const post = posts.find(p => p.id === postId);
                if (post) {
                    displayFullPost(post);
                }
            });
    }
    
    function displayFullPost(post) {
        const fullPostSection = document.getElementById('full-post');
        fullPostSection.innerHTML = `
            <h2>${post.title}</h2>
            <p class="date">${post.date}</p>
            <div class="content">${post.content}</div>
            <a href="#" id="close-post">Close</a>
        `;
        fullPostSection.style.display = 'block';

        const closePostLink = document.getElementById('close-post');
        closePostLink.addEventListener('click', function(event) {
            event.preventDefault();
            fullPostSection.style.display = 'none';
        });
    }
});
