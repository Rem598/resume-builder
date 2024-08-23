document.addEventListener('DOMContentLoaded', () => {
    const sections = [
        {formId: 'personal-details-form', displayId: 'personal-details-display', fields: ['name', 'age'], nextPage: 'education.html'},
        {formId: 'education-form', displayId: 'education-display', fields: ['school', 'date-from', 'date-to', 'grade'], nextPage: 'work-experience.html'},
        {formId: 'work-experience-form', displayId: 'work-experience-display', fields: ['title', 'company', 'date-from', 'date-to'], nextPage: 'skills.html'},
        {formId: 'skills-form', displayId: 'skills-display', fields: ['skill', 'proficiency'], nextPage: 'objective.html'},
        {formId: 'objective-form', displayId: 'objective-display', fields: ['objective'], nextPage: 'references.html'},
        {formId: 'references-form', displayId: 'references-display', fields: ['name', 'title', 'phone', 'email'], nextPage: 'resume.html'}
    ];

    sections.forEach(section => {
        const form = document.getElementById(section.formId);
        const displayElement = document.getElementById(section.displayId);

        if (form && displayElement) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const formData = new FormData(this);
                const details = Object.fromEntries(formData.entries());

                const item = document.createElement('div');
                section.fields.forEach(field => {
                    item.innerHTML += `<p><strong>${field}:</strong> ${details[field]}</p>`;
                });

                item.innerHTML += '<hr>';
                displayElement.insertBefore(item, displayElement.firstChild);

                this.reset();

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

    const generateResumeButton = document.getElementById('generate-resume');
    const resumePreview = document.getElementById('resume-preview');
    const downloadResumeButton = document.getElementById('download-resume');
    const templateSelect = document.getElementById('resume-template-select');

    function gatherData() {
        const data = sections.reduce((acc, section) => {
            const displayElement = document.getElementById(section.displayId);
            if (displayElement) {
                acc[section.displayId] = displayElement.innerHTML;
            }
            return acc;
        }, {});
        return data;
    }

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
                downloadResumeButton.style.display = 'inline';
            }
        });
    }

    if (downloadResumeButton) {
        downloadResumeButton.addEventListener('click', () => {
            const resumeContent = resumePreview.innerHTML;
            const blob = new Blob([resumeContent], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'resume.html';
            a.click();
            URL.revokeObjectURL(url);
        });
    }

    function generateTemplate1(data) {
        return `
            <h1>${data['personal-details-display']}</h1>
            <h2>Education</h2>
            ${data['education-display']}
            <h2>Work Experience</h2>
            ${data['work-experience-display']}
            <h2>Skills</h2>
            ${data['skills-display']}
            <h2>Objective</h2>
            ${data['objective-display']}
            <h2>References</h2>
            ${data['references-display']}
        `;
    }

    function generateTemplate2(data) {
        return `
            <div style="border: 2px solid black; padding: 10px;">
                <h1>${data['personal-details-display']}</h1>
                <h2>Education</h2>
                ${data['education-display']}
                <h2>Experience</h2>
                ${data['work-experience-display']}
                <h2>Skills</h2>
                ${data['skills-display']}
                <h2>Objective</h2>
                ${data['objective-display']}
                <h2>References</h2>
                ${data['references-display']}
            </div>
        `;
    }
});
