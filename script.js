// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Skills Section
    const addSkillButton = document.getElementById('add-skill');
    const skillsList = document.getElementById('skills-list');

    addSkillButton.addEventListener('click', () => {
        const skillItem = document.createElement('div');
        skillItem.classList.add('skill-item');
        skillItem.innerHTML = `
            <input type="text" name="skill" placeholder="Enter skill" required>
            <input type="text" name="proficiency" placeholder="Enter proficiency level (e.g., Intermediate)" required>
            <button type="button" class="remove-skill">Remove</button>
        `;
        skillsList.appendChild(skillItem);

        // Add event listener to the newly created remove button
        skillItem.querySelector('.remove-skill').addEventListener('click', () => {
            skillsList.removeChild(skillItem);
        });
    });

    // Add event listener to existing remove buttons
    document.querySelectorAll('.remove-skill').forEach(button => {
        button.addEventListener('click', () => {
            skillsList.removeChild(button.parentElement);
        });
    });

    // Education Section
    const addEducationButton = document.getElementById('add-education');
    const educationList = document.getElementById('education-list');

    addEducationButton.addEventListener('click', () => {
        const educationItem = document.createElement('div');
        educationItem.classList.add('education-item');
        educationItem.innerHTML = `
            <input type="text" name="school" placeholder="Enter school name" required>
            <input type="text" name="date-from" placeholder="Date From (YYYY-MM-DD)" required>
            <input type="text" name="date-to" placeholder="Date To (YYYY-MM-DD)" required>
            <input type="text" name="grade" placeholder="Enter grade" required>
            <button type="button" class="remove-education">Remove</button>
        `;
        educationList.appendChild(educationItem);

        // Add event listener to the newly created remove button
        educationItem.querySelector('.remove-education').addEventListener('click', () => {
            educationList.removeChild(educationItem);
        });
    });

    // Add event listener to existing remove buttons
    document.querySelectorAll('.remove-education').forEach(button => {
        button.addEventListener('click', () => {
            educationList.removeChild(button.parentElement);
        });
    });

    // Work Experience Section
    const addWorkExperienceButton = document.getElementById('add-work-experience');
    const workExperienceList = document.getElementById('work-experience-list');

    addWorkExperienceButton.addEventListener('click', () => {
        const workExperienceItem = document.createElement('div');
        workExperienceItem.classList.add('work-experience-item');
        workExperienceItem.innerHTML = `
            <input type="text" name="title" placeholder="Enter job title" required>
            <input type="text" name="company" placeholder="Enter company name" required>
            <input type="text" name="date-from" placeholder="Date From (YYYY-MM-DD)" required>
            <input type="text" name="date-to" placeholder="Date To (YYYY-MM-DD)" required>
            <textarea name="description" placeholder="Enter job description" required></textarea>
            <button type="button" class="remove-work-experience">Remove</button>
        `;
        workExperienceList.appendChild(workExperienceItem);

        // Add event listener to the newly created remove button
        workExperienceItem.querySelector('.remove-work-experience').addEventListener('click', () => {
            workExperienceList.removeChild(workExperienceItem);
        });
    });

    // Add event listener to existing remove buttons
    document.querySelectorAll('.remove-work-experience').forEach(button => {
        button.addEventListener('click', () => {
            workExperienceList.removeChild(button.parentElement);
        });
    });

    // References Section
    const addReferenceButton = document.getElementById('add-reference');
    const referencesList = document.getElementById('references-list');

    addReferenceButton.addEventListener('click', () => {
        const referenceItem = document.createElement('div');
        referenceItem.classList.add('reference-item');
        referenceItem.innerHTML = `
            <input type="text" name="name" placeholder="Enter reference's name" required>
            <input type="text" name="title" placeholder="Enter reference's title" required>
            <input type="text" name="phone" placeholder="Enter reference's phone number" required>
            <input type="email" name="email" placeholder="Enter reference's email address" required>
            <button type="button" class="remove-reference">Remove</button>
        `;
        referencesList.appendChild(referenceItem);

        // Add event listener to the newly created remove button
        referenceItem.querySelector('.remove-reference').addEventListener('click', () => {
            referencesList.removeChild(referenceItem);
        });
    });

    // Add event listener to existing remove buttons
    document.querySelectorAll('.remove-reference').forEach(button => {
        button.addEventListener('click', () => {
            referencesList.removeChild(button.parentElement);
        });
    });
});
