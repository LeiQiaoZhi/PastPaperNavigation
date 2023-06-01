var courses = [
    "Advanced Algorithms",
    "Advanced Computer Architecture",
    "Algorithms",
    "Algorithms 1",
    "Algorithms 2",
    "Artificial Intelligence",
    "Bioinformatics",
    "Business Studies",
    "Comparative Architectures",
    "Compiler Construction",
    "Complexity Theory",
    "Computation Theory",
    "Computer Design",
    "Computer Networking",
    "Computer Vision",
    "Concepts in Programming Languages",
    "Concurrent and Distributed Systems",
    "Cryptography",
    "Cybersecurity",
    "Data Science",
    "Databases",
    "Denotational Semantics",
    "Digital Electronics",
    "Digital Signal Processing",
    "Discrete Mathematics",
    "E-Commerce",
    "Economics, Law and Ethics",
    "Formal Models of Language",
    "Foundations of Computer Science",
    "Foundations of Data Science",
    "Further Graphics",
    "Further Human–Computer Interaction",
    "Further Java",
    "Hoare Logic and Model Checking",
    "Information Theory",
    "Interaction Design",
    "Introduction to Computer Architecture",
    "Introduction to Graphics",
    "Introduction to Probability",
    "Logic and Proof",
    "Machine Learning and Bayesian Inference",
    "Machine Learning and Real-world Data",
    "Mobile and Sensor Systems",
    "Object-Oriented Programming",
    "Operating Systems",
    "Optimising Compilers",
    "Principles of Communications",
    "Programming in C",
    "Programming in C and C++",
    "Prolog",
    "Quantum Computing",
    "Randomised Algorithms",
    "Security",
    "Semantics of Programming Languages",
    "Software and Security Engineering",
    "Types"
];

document.addEventListener('DOMContentLoaded', function () {
    // Course Section
    var courseSelect = document.getElementById('course-select');
    var courseButton = document.getElementById('course-button');
    var courseSearch = document.getElementById('course-search');
    const suggestionsList = document.getElementById('suggestions');
    
    courseSearch.focus();


    for (var i = 0; i < courses.length; i++) {
        var course = courses[i];
        var option = document.createElement('option');
        option.value = course;
        option.textContent = course;
        courseSelect.appendChild(option);
    }

    courseButton.addEventListener('click', function () {
        var selectedCourse = courseSelect.value;
        if (selectedCourse !== '') {
            // Redirect to the selected course's past papers page
            var url = "https://www.cl.cam.ac.uk/teaching/exams/pastpapers/t-" + selectedCourse.replace(/\s/g, '') + ".html" + "#" + ("Past exam papers: " + selectedCourse).replace(/\s+/g, '-').toLowerCase();;
            // open url in new tab
            var newWindow = window.open(url, '_blank');
            newWindow.onload = function () {
                var scrollAmount = 100; // Change this value as per your requirement
                setTimeout(() => {
                    console.log("Scrolling down");
                    newWindow.window.scrollTo(0, scrollAmount); // Scrolls vertically down by the specified amount
                }, 1000);
            };

        }
    });

    courseSearch.addEventListener('input', handleInput);
    courseSearch.addEventListener('keydown', handleKeyDown);
    courseSearch.addEventListener('blur', hideSuggestions);

    let selectedIndex = -1;

    function hideSuggestions() {
        suggestionsList.innerHTML = '';
        selectedIndex = -1;
    }

    function handleInput(event) {
        const searchText = event.target.value;
        const matchedCourses = fuzzySearch(courses, searchText);

        displaySuggestions(matchedCourses);
    }

    function fuzzySearch(courses, searchText) {
        const searchRegex = new RegExp(searchText.split('').join('.*'), 'i');
        return courses.filter(course => searchRegex.test(course));
    }

    function displaySuggestions(matchedCourses) {
        suggestionsList.innerHTML = '';
        selectedIndex = -1;

        matchedCourses.forEach((course, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = course;
            listItem.addEventListener('click', () => {
                courseSearch.value = course;
                suggestionsList.innerHTML = '';
            });
            listItem.addEventListener('mouseenter', () => {
                setSelectedIndex(index);
            });
            suggestionsList.appendChild(listItem);
        });
    }

    function handleKeyDown(event) {
        if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
            event.preventDefault();
            const suggestions = suggestionsList.querySelectorAll('li');
            const maxIndex = suggestions.length - 1;

            if (event.key === 'ArrowUp') {
                selectedIndex = selectedIndex <= 0 ? maxIndex : selectedIndex - 1;
            } else {
                selectedIndex = selectedIndex >= maxIndex ? 0 : selectedIndex + 1;
            }

            setSelectedIndex(selectedIndex);
        } else if (event.key === 'Enter' && courseSearch.value !== '') {
            event.preventDefault();
            const selectedCourse = suggestionsList.querySelectorAll('li')[selectedIndex];
            courseSearch.value = selectedCourse.textContent;
            suggestionsList.innerHTML = '';
            courseButton.click();
        }
    }

    function setSelectedIndex(index) {
        const suggestions = suggestionsList.querySelectorAll('li');
        suggestions.forEach((suggestion, i) => {
            suggestion.classList.toggle('selected', i === index);
        });
        clearSelected();
        if (selectedIndex !== -1) {
            suggestionsList.getElementsByTagName('li')[selectedIndex].classList.add('selected');
            courseSelect.value = suggestions[selectedIndex].textContent; // Set dropdown value
        }
    }


    function clearSelected() {
        const selected = suggestionsList.getElementsByClassName('selected');
        if (selected.length > 0) {
            selected[0].classList.remove('selected');
        }
    }


    // Paper Section
    var paperUrlButton = document.getElementById('paper-url-button');
    var solutionUrlButton = document.getElementById('solution-url-button');
    var yearInput = document.getElementById('year-input');
    var paperInput = document.getElementById('paper-input');
    var questionInput = document.getElementById('question-input');

    paperUrlButton.addEventListener('click', function () {
        var year = yearInput.value;
        var paper = paperInput.value;
        var question = questionInput.value;

        if (year !== '' && paper !== '' && question !== '') {
            var paperUrl = `https://www.cl.cam.ac.uk/teaching/exams/pastpapers/y20${year}p${paper}q${question}.pdf`
            window.open(paperUrl, '_blank');
        }
    });

    solutionUrlButton.addEventListener('click', function () {
        var year = yearInput.value;
        var paper = paperInput.value;
        var question = questionInput.value;

        if (year !== '' && paper !== '' && question !== '') {
            var solutionUrl = `https://www.cl.cam.ac.uk/teaching/exams/solutions/20${year}/20${year}-p${formatNumberWithLeadingZero(paper)}-q${formatNumberWithLeadingZero(question)}-solutions.pdf`
            window.open(solutionUrl, '_blank');
        }
    });

    function formatNumberWithLeadingZero(number) {
        // Convert the number to a string
        let numberString = number.toString();

        // Prefix with leading zero if necessary
        if (numberString.length < 2) {
            numberString = '0' + numberString;
        }

        return numberString;
    }

});
