document.addEventListener('DOMContentLoaded', () => {
    // Skills Section
    const addSkillButton = document.getElementById('add-skill');
    const skillsList = document.getElementById('skills-list');

    if (addSkillButton && skillsList) {
        addSkillButton.addEventListener('click', () => {
            const skillItem = document.createElement('div');
            skillItem.classList.add('skill-item');
            skillItem.innerHTML = `
                <input type="text" name="skill" placeholder="Enter skill" required>
                <input type="text" name="proficiency" placeholder="Enter proficiency level (e.g., Intermediate)" required>
                <button type="button" class="remove-skill">Remove</button>
            `;
            skillsList.appendChild(skillItem);

            skillItem.querySelector('.remove-skill').addEventListener('click', () => {
                skillsList.removeChild(skillItem);
            });
        });
    }

    // Form submission and display handling with "Next" button
    const handleSubmitAndDisplay = (formId, displayId, fields, nextPage) => {
        const form = document.getElementById(formId);
        const displayElement = document.getElementById(displayId);

        if (form && displayElement) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const formData = new FormData(this);
                const details = Object.fromEntries(formData.entries());
                
                const item = document.createElement('div');
                
                fields.forEach(field => {
                    item.innerHTML += `<p><strong>${field.label}:</strong> ${details[field.name]}</p>`;
                });

                item.innerHTML += '<hr>';
                displayElement.insertBefore(item, displayElement.firstChild);

                // Reset the form
                this.reset();

                // Show "Next" button if a next page is provided
                if (nextPage) {
                    const nextButton = document.createElement('button');
                    nextButton.innerText = 'Next';
                    nextButton.addEventListener('click', () => {
                        window.location.href = nextPage;
                    });
                    displayElement.appendChild(nextButton);
                }
            });
        } else if (!form) {
            console.error(`Form with ID ${formId} not found`);
        } else if (!displayElement) {
            console.error(`Display element with ID ${displayId} not found`);
        }
    };

    handleSubmitAndDisplay('personal-details-form', 'personal-details-display', [
        {name: 'name', label: 'Name'},
        {name: 'age', label: 'Age'}
        // Add more fields as necessary
    ], 'education.html');

    handleSubmitAndDisplay('education-form', 'education-display', [
        {name: 'school', label: 'School'},
        {name: 'date-from', label: 'From'},
        {name: 'date-to', label: 'To'},
        {name: 'grade', label: 'Grade'}
    ], 'work-experience.html');

    handleSubmitAndDisplay('work-experience-form', 'work-experience-display', [
        {name: 'title', label: 'Job Title'},
        {name: 'company', label: 'Company'},
        {name: 'date-from', label: 'From'},
        {name: 'date-to', label: 'To'}
        // Add more fields as necessary
    ], 'skills.html');

    handleSubmitAndDisplay('skills-form', 'skills-display', [
        {name: 'skill', label: 'Skill'},
        {name: 'proficiency', label: 'Proficiency'}
    ], 'objective.html');

    handleSubmitAndDisplay('objective-form', 'objective-display', [
        {name: 'objective', label: 'Objective'}
    ], 'references.html');

    handleSubmitAndDisplay('references-form', 'references-display', [
        {name: 'name', label: 'Name'},
        {name: 'title', label: 'Title'},
        {name: 'phone', label: 'Phone'},
        {name: 'email', label: 'Email'}
    ], 'resume.html');

    const generateResumeButton = document.getElementById('generate-resume');
    const resumePreview = document.getElementById('resume-preview');
    const downloadResumeButton = document.getElementById('download-resume');
    const templateSelect = document.getElementById('resume-template-select');

    if (generateResumeButton) {
        generateResumeButton.addEventListener('click', () => {
            const personalDetails = { /* gather personal details */ };
            const education = { /* gather education details */ };
            const workExperience = { /* gather work experience */ };
            const skills = { /* gather skills */ };
            const references = { /* gather references */ };
            const objective = { /* gather objective */ };

            const selectedTemplate = templateSelect.value;
            let resumeHtml = '';

            switch (selectedTemplate) {
                case 'template1':
                    resumeHtml = generateTemplate1(personalDetails, education, workExperience, skills, references, objective);
                    break;
                case 'template2':
                    resumeHtml = generateTemplate2(personalDetails, education, workExperience, skills, references, objective);
                    break;
            }

            resumePreview.innerHTML = resumeHtml;
            downloadResumeButton.style.display = 'inline'; 
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
});

function generateTemplate1(personalDetails, education, workExperience, skills, references, objective) {
    return `
        <h1>${personalDetails.name}</h1>
        <p>${personalDetails.age}</p>
        <h2>Education</h2>
        ${education.map(ed => `<p>${ed.school} (${ed.dateFrom} - ${ed.dateTo}): ${ed.grade}</p>`).join('')}
        <h2>Work Experience</h2>
        ${workExperience.map(work => `<p>${work.title} at ${work.company} (${work.dateFrom} - ${work.dateTo}): ${work.description}</p>`).join('')}
        <h2>Skills</h2>
        ${skills.map(skill => `<p>${skill.skill}: ${skill.proficiency}</p>`).join('')}
        <h2>Objective</h2>
        <p>${objective}</p>
        <h2>References</h2>
        ${references.map(ref => `<p>${ref.name}, ${ref.title}, ${ref.phone}, ${ref.email}</p>`).join('')}
    `;
}

function generateTemplate2(personalDetails, education, workExperience, skills, references, objective) {
    return `
        <div style="border: 2px solid black; padding: 10px;">
            <h1>${personalDetails.name}</h1>
            <p>${personalDetails.age}</p>
            <h2>Education</h2>
            ${education.map(ed => `<p>${ed.school} (${ed.dateFrom} - ${ed.dateTo}): ${ed.grade}</p>`).join('')}
            <h2>Experience</h2>
            ${workExperience.map(work => `<p>${work.title} at ${work.company} (${work.dateFrom} - ${work.dateTo}): ${work.description}</p>`).join('')}
            <h2>Skills</h2>
            ${skills.map(skill => `<p>${skill.skill}: ${skill.proficiency}</p>`).join('')}
            <h2>Objective</h2>
            <p>${objective}</p>
            <h2>References</h2>
            ${references.map(ref => `<p>${ref.name}, ${ref.title}, ${ref.phone}, ${ref.email}</p>`).join('')}
        </div>
    `;
}
