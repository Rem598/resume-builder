document.addEventListener('DOMContentLoaded', () => {
    const sections = [
        {formId: 'personal-details-form', displayId: 'personal-details-section', fields: ['name', 'age', 'email', 'phone', 'address'], nextPage: 'education.html'},
        {formId: 'education-form', displayId: 'education-section', fields: ['school', 'date-from', 'date-to', 'grade'], nextPage: 'work-experience.html'},
        {formId: 'work-experience-form', displayId: 'work-experience-section', fields: ['title', 'company', 'date-from', 'date-to'], nextPage: 'skills.html'},
        {formId: 'skills-form', displayId: 'skills-section', fields: ['skill', 'proficiency'], nextPage: 'objective.html'},
        {formId: 'objective-form', displayId: 'objective-section', fields: ['objective'], nextPage: 'references.html'},
        {formId: 'references-form', displayId: 'references-section', fields: ['name', 'title', 'phone', 'email'], nextPage: 'resume.html'}
    ];

    sections.forEach(section => {
        const form = document.getElementById(section.formId);
        const displayElement = document.getElementById(section.displayId);

        if (form && displayElement) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Save form data
                const formData = new FormData(this);
                const details = Object.fromEntries(formData.entries());

                // Display data in the current section
                displayElement.innerHTML = '';  // Clear current content
                section.fields.forEach(field => {
                    if (details[field]) {
                        displayElement.innerHTML += `<p><strong>${field}:</strong> ${details[field]}</p>`;
                    }
                });
                displayElement.innerHTML += '<hr>';
                
                // Save data to localStorage
                saveFormData(section.formId, details);

                // Reset form
                this.reset();

                // Add a "Next" button to proceed to the next section
                if (section.nextPage) {
                    const nextButton = document.createElement('button');
                    nextButton.innerText = 'Next';
                    nextButton.addEventListener('click', () => {
                        window.location.href = section.nextPage;
                    });
                    displayElement.appendChild(nextButton);
                }
            });
        } else {
            console.error(`Form or display element with ID ${section.formId} or ${section.displayId} not found`);
        }
    });

    function saveFormData(formId, details) {
        localStorage.setItem(formId, JSON.stringify(details));
    }
    
    function loadFormData() {
        sections.forEach(section => {
            const data = JSON.parse(localStorage.getItem(section.formId)) || {};
            const sectionElement = document.getElementById(section.displayId);
            if (sectionElement) {
                sectionElement.innerHTML = ''; // Clear existing content
                section.fields.forEach(field => {
                    if (data[field]) {
                        sectionElement.innerHTML += `<p><strong>${field}:</strong> ${data[field]}</p>`;
                    }
                });
                sectionElement.innerHTML += '<hr>';
            }
        });
    }

    loadFormData();

    const generateResumeButton = document.getElementById('generate-resume');
    const resumePreview = document.getElementById('resume-preview');
    const downloadResumeButton = document.getElementById('download-resume');
    const templateSelect = document.getElementById('resume-template-select');

    if (generateResumeButton) {
        generateResumeButton.addEventListener('click', () => { 
            const data = gatherData();
            const selectedTemplate = templateSelect ? templateSelect.value : 'template1';
            let resumeHtml = '';

            switch (selectedTemplate) {
                case 'template1':
                    resumeHtml = generateTemplate1(data);
                    break;
                case 'template2':
                    resumeHtml = generateTemplate2(data);
                    break;
                default:
                    resumeHtml = generateTemplate1(data);
            }

            if (resumePreview) {
                resumePreview.innerHTML = resumeHtml;
                downloadResumeButton.style.display = 'inline';  // Make sure the button is visible
            }
        });
    }
    
    if (downloadResumeButton) {
        downloadResumeButton.addEventListener('click', () => {
            const element = document.getElementById('resume-preview');
            html2pdf().from(element).save('resume.pdf');
        });
    }

    function gatherData() {
        return sections.reduce((acc, section) => {
            const displayElement = document.getElementById(section.displayId);
            if (displayElement) {
                acc[section.displayId] = displayElement.innerHTML;
            }
            return acc;
        }, {});
    }

    function generateTemplate1(data) {
        return `
            <h1>Resume</h1>
            <h2>Personal Details</h2>
            ${data['personal-details-section']}
            <h2>Education</h2>
            ${data['education-section']}
            <h2>Work Experience</h2>
            ${data['work-experience-section']}
            <h2>Skills</h2>
            ${data['skills-section']}
            <h2>Objective</h2>
            ${data['objective-section']}
            <h2>References</h2>
            ${data['references-section']}
        `;
    }
    
    function generateTemplate2(data) {
        return `
            <div style="border: 2px solid black; padding: 10px;">
                <h1>Resume</h1>
                <h2>Personal Details</h2>
                ${data['personal-details-section']}
                <h2>Education</h2>
                ${data['education-section']}
                <h2>Experience</h2>
                ${data['work-experience-section']}
                <h2>Skills</h2>
                ${data['skills-section']}
                <h2>Objective</h2>
                ${data['objective-section']}
                <h2>References</h2>
                ${data['references-section']}
            </div>
        `;
    }
});
