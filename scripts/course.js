// Navigation & Hamburger
const navbutton = document.querySelector("#ham-btn");
const navLinks = document.querySelector("#nav-bar");

navbutton.addEventListener("click", () => {
    navbutton.classList.toggle("show");
    navLinks.classList.toggle("show");
})


// Current Year & Last Modification
const spanYear = document.getElementById("currentYear");

const today = new Date();
const currentYear = today.getFullYear();

spanYear.innerHTML = currentYear;

const lastModified = document.getElementById("lastModified");
lastModified.innerHTML = `Last Modification: ${document.lastModified}`;

// Courses Section
document.addEventListener("DOMContentLoaded", () => {
    const courses = [
        {
            subject: 'CSE',
            number: 110,
            title: 'Introduction to Programming',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course will introduce students to programming.',
            technology: ['Python'],
            completed: true
        },
        {
            subject: 'WDD',
            number: 130,
            title: 'Web Fundamentals',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course introduces students to the World Wide Web.',
            technology: ['HTML', 'CSS'],
            completed: true
        },
        {
            subject: 'CSE',
            number: 111,
            title: 'Programming with Functions',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'CSE 111 students become more organized, efficient, and powerful computer programmers.',
            technology: ['Python'],
            completed: true
        },
        {
            subject: 'CSE',
            number: 210,
            title: 'Programming with Classes',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course will introduce the notion of classes and objects.',
            technology: ['C#'],
            completed: true
        },
        {
            subject: 'WDD',
            number: 131,
            title: 'Dynamic Web Fundamentals',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course builds on prior experience in Web Fundamentals.',
            technology: ['HTML', 'CSS', 'JavaScript'],
            completed: true
        },
        {
            subject: 'WDD',
            number: 231,
            title: 'Frontend Web Development I',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course builds on prior experience with Dynamic Web Fundamentals.',
            technology: ['HTML', 'CSS', 'JavaScript'],
            completed: false
        }
    ];

    const coursesGroup = document.querySelector(".courses");
    const totalCreditsDisplay = document.getElementById("credits");
    const filterBtns = document.querySelectorAll(".btn-filter");
    const courseDetails = document.querySelector("#course-details");

    // Display course details in the modal
    function displayCourseDetails(course) {
        courseDetails.innerHTML = '';
        courseDetails.innerHTML = `
            <button id="closeModal">x</button>
            <h2>${course.subject} ${course.number}</h2>
            <h3>${course.title}</h3>
            <p><strong>Credits</strong>: ${course.credits}</p>
            <p><strong>Certificate</strong>: ${course.certificate}</p>
            <p>${course.description}</p>
            <p><strong>Technologies</strong>: ${course.technology.join(', ')}</p>
        `;
        courseDetails.showModal();
        
        closeModal.addEventListener("click", () => {
            courseDetails.close();
        });
    }

    // Create course element
    function createCourseElement(course) {
        const courseElement = document.createElement("div");
        // Apply appropriate classes based on completion status
        const completionClass = course.completed ? "course-item course-item-highlight" : "course-item";
        courseElement.className = completionClass;
        courseElement.dataset.category = course.subject;

        // Display subject and number
        courseElement.innerHTML = `<p>${course.subject} ${course.number}</p>`;
        return courseElement;
    }

    // Courses Filter
    function displayCourses(filter = "all") {
        let accumulatedCredits = 0;
        coursesGroup.innerHTML = "";

        courses.forEach(course => {
            if (filter === "all" || course.subject.toLowerCase() === filter.toLowerCase()) {
                const courseElement = createCourseElement(course);
                coursesGroup.appendChild(courseElement);
                
                // Event listener to open modal when clicking a course
                courseElement.addEventListener('click', () => {
                    displayCourseDetails(course);
                });

                // Only add credits if the course is completed
                if (course.completed) {
                    accumulatedCredits += course.credits;
                }
            }
        });

        totalCreditsDisplay.textContent = accumulatedCredits;
    }

    // Initial display
    displayCourses();

    // Event listeners for filter buttons
    filterBtns.forEach(button => {
        button.addEventListener("click", () => {
            const filter = button.dataset.filter;
            displayCourses(filter);
        });
    });
});