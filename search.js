// notadr.org - Search functionality

let remediesData = [];

// Load remedies data on page load
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('remedies.json');
        const data = await response.json();
        remediesData = data.remedies;
        console.log(`Loaded ${remediesData.length} remedies`);
    } catch (error) {
        console.error('Error loading remedies:', error);
    }
});

// Search functionality
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const resultsSection = document.getElementById('resultsSection');
const resultsList = document.getElementById('resultsList');

searchBtn.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') performSearch();
});

function performSearch() {
    const query = searchInput.value.toLowerCase().trim();
    
    if (!query) {
        resultsSection.style.display = 'none';
        return;
    }
    
    const results = searchRemedies(query);
    displayResults(results, query);
}

function searchRemedies(query) {
    return remediesData.filter(remedy => {
        // Search in name
        if (remedy.name.toLowerCase().includes(query)) return true;
        
        // Search in aliases
        if (remedy.aliases.some(alias => alias.toLowerCase().includes(query))) return true;
        
        // Search in ailments
        if (remedy.ailments.some(ailment => ailment.toLowerCase().includes(query))) return true;
        
        // Search in tags
        if (remedy.tags && remedy.tags.some(tag => tag.toLowerCase().includes(query))) return true;
        
        return false;
    });
}

function displayResults(results, query) {
    resultsSection.style.display = 'block';
    
    if (results.length === 0) {
        resultsList.innerHTML = `
            <p class="no-results">No remedies found for "${query}".</p>
            <p class="no-results">Try searching for a different symptom or remedy name.</p>
        `;
        return;
    }
    
    resultsList.innerHTML = `<p class="results-disclaimer"><strong>Note:</strong> These are community-submitted experiences, not medical advice. Consult your healthcare provider before trying any remedy.</p>`;
    resultsList.innerHTML += results.map(remedy => `
        <div class="result-item">
            <h4>${remedy.name}</h4>
            <span class="remedy-category">${remedy.category}</span>
            <p class="remedy-experience">${remedy.experience}</p>
            <p class="remedy-dosage"><strong>Typical dosage:</strong> ${remedy.dosage}</p>
            <p class="remedy-tags">
                <strong>Helps with:</strong> ${remedy.ailments.join(', ')}
            </p>
            <p class="item-disclaimer"><strong>Disclaimer:</strong> This is one person's experience. It is not medical advice. What works for one person may not work for another. Check with your doctor, especially if you take medications.</p>
        </div>
    `).join('');
}

// Category buttons
document.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const category = btn.dataset.category;
        const results = remediesData.filter(r => r.category === category);
        displayCategoryResults(results, category);
    });
});

function displayCategoryResults(results, category) {
    resultsSection.style.display = 'block';
    resultsList.innerHTML = `<p class="results-disclaimer"><strong>Note:</strong> These are community-submitted experiences, not medical advice. Consult your healthcare provider before trying any remedy.</p>`;
    resultsList.innerHTML += `
        <h3>${category.charAt(0).toUpperCase() + category.slice(1)}</h3>
    ` + results.map(remedy => `
        <div class="result-item">
            <h4>${remedy.name}</h4>
            <span class="remedy-category">${remedy.category}</span>
            <p class="remedy-experience">${remedy.experience}</p>
            <p class="remedy-dosage"><strong>Typical dosage:</strong> ${remedy.dosage}</p>
            <p class="remedy-tags">
                <strong>Helps with:</strong> ${remedy.ailments.join(', ')}
            </p>
            <p class="item-disclaimer"><strong>Disclaimer:</strong> This is one person's experience. It is not medical advice. What works for one person may not work for another. Check with your doctor, especially if you take medications.</p>
        </div>
    `).join('');
}

// Add remedy link (placeholder for now)
document.getElementById('addRemedyLink').addEventListener('click', (e) => {
    e.preventDefault();
    alert('Remedy submission coming soon! For now, reach out to share your experience.');
});