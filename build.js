// build.js
const fs = require('fs');

// 1. Placeholder talks data (from step 1)
const placeholderTalks = [
    {
        id: 'talk1',
        title: 'The Future of AI in Web Development',
        speakers: ['Alice Johnson'],
        categories: ['AI', 'Web Development', 'Future Tech'],
        duration: '1 hour',
        description: 'Explore the exciting intersection of Artificial Intelligence and modern web development, from AI-powered UI generation to intelligent backend services.'
    },
    {
        id: 'talk2',
        title: 'Building Scalable Microservices with Node.js',
        speakers: ['Bob Williams', 'Carol Davis'],
        categories: ['Node.js', 'Microservices', 'Backend'],
        duration: '1 hour',
        description: 'A deep dive into best practices for designing and implementing scalable microservices architectures using Node.js and related technologies.'
    },
    {
        id: 'talk3',
        title: 'Mastering Modern CSS Layouts (Grid & Flexbox)',
        speakers: ['David Green'],
        categories: ['CSS', 'Frontend', 'UI/UX'],
        duration: '1 hour',
        description: 'Unlock the power of CSS Grid and Flexbox to create complex and responsive layouts with ease, enhancing user experience across all devices.'
    },
    {
        id: 'talk4',
        title: 'Demystifying Serverless Functions',
        speakers: ['Eve Black'],
        categories: ['Serverless', 'Cloud', 'Backend'],
        duration: '1 hour',
        description: 'Understand the fundamentals of serverless computing, common use cases, and how to deploy and manage serverless functions effectively.'
    },
    {
        id: 'talk5',
        title: 'Optimizing Web Performance for a Faster User Experience',
        speakers: ['Frank White', 'Grace Hall'],
        categories: ['Web Performance', 'Frontend', 'Optimization'],
        duration: '1 hour',
        description: 'Learn practical techniques and tools to drastically improve your website\\\'s loading speed and overall responsiveness, leading to better user engagement.'
    },
    {
        id: 'talk6',
        title: 'Introduction to WebAssembly for High-Performance Apps',
        speakers: ['Harry Brown'],
        categories: ['WebAssembly', 'Performance', 'Future Tech'],
        duration: '1 hour',
        description: 'Get an introduction to WebAssembly (Wasm) and discover how it enables near-native performance for web applications, opening up new possibilities for complex tasks.'
    }
];

// 2. Schedule calculation logic (from step 2)
function calculateSchedule(talks) {
    const schedule = [];
    let currentTime = new Date('2026-05-25T10:00:00'); // Event starts at 10:00 AM

    const addMinutes = (date, minutes) => new Date(date.getTime() + minutes * 60000);
    const formatTime = (date) => date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

    for (let i = 0; i < talks.length; i++) {
        // Add talk
        const talkStartTime = new Date(currentTime);
        const talkEndTime = addMinutes(talkStartTime, 60); // 1 hour talk
        schedule.push({
            type: 'talk',
            ...talks[i],
            startTime: formatTime(talkStartTime),
            endTime: formatTime(talkEndTime)
        });
        currentTime = talkEndTime;

        // Add transition, except after the last talk
        if (i < talks.length - 1) {
            const transitionStartTime = new Date(currentTime);
            const transitionEndTime = addMinutes(transitionStartTime, 10); // 10 minutes transition
            schedule.push({
                type: 'break',
                id: `transition${i + 1}`,
                title: 'Transition',
                startTime: formatTime(transitionStartTime),
                endTime: formatTime(transitionEndTime),
                duration: '10 minutes'
            });
            currentTime = transitionEndTime;
        }

        // Insert lunch break after the 3rd talk
        if (i === 2) { // After talk 3
            const lunchStartTime = new Date(currentTime);
            const lunchEndTime = addMinutes(lunchStartTime, 60); // 1 hour lunch
            schedule.push({
                type: 'break',
                id: 'lunch',
                title: 'Lunch Break',
                startTime: formatTime(lunchStartTime),
                endTime: formatTime(lunchEndTime),
                duration: '1 hour'
            });
            currentTime = lunchEndTime;

            // Add an additional transition after lunch, before the next talk starts (if any)
            const postLunchTransitionStartTime = new Date(currentTime);
            const postLunchTransitionEndTime = addMinutes(postLunchTransitionStartTime, 10); // 10 minutes transition
            schedule.push({
                type: 'break',
                id: 'postLunchTransition',
                title: 'Transition',
                startTime: formatTime(postLunchTransitionStartTime),
                endTime: formatTime(postLunchTransitionEndTime),
                duration: '10 minutes'
            });
            currentTime = postLunchTransitionEndTime;
        }
    }
    return schedule;
}

const fullSchedule = calculateSchedule(placeholderTalks);

// 3. HTML Structure (from step 3)
const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tech Talks Event</title>
    <style id="injected-css"></style>
</head>
<body>
    <header class="event-header">
        <h1>Welcome to Tech Talks 2026!</h1>
        <p>A day filled with insightful technical discussions.</p>
    </header>

    <main class="container">
        <section class="filters-section">
            <label for="category-filter">Filter by Category:</label>
            <select id="category-filter">
                <option value="all">All Categories</option>
                <!-- Category options will be dynamically loaded here by JavaScript -->
            </select>
        </section>

        <section class="schedule-section">
            <h2>Event Schedule</h2>
            <div id="schedule-list" class="schedule-grid">
                <!-- Talks and breaks will be dynamically loaded here by JavaScript -->
            </div>
        </section>
    </main>

    <footer class="event-footer">
        <p>&copy; 2026 Tech Talks Event. All rights reserved.</p>
    </footer>

    <script id="injected-js"></script>
</body>
</html>`;

// 4. CSS Styling (from step 4)
const cssContent = `
    :root {
        --primary-color: #4A90E2; /* Blue */
        --secondary-color: #50E3C2; /* Green-ish */
        --accent-color: #F5A623; /* Orange */
        --text-color: #333;
        --light-text-color: #666;
        --background-color: #F8F9FA;
        --card-background: #FFFFFF;
        --border-color: #E0E0E0;
        --shadow-color: rgba(0, 0, 0, 0.08);
    }

    /* Basic Reset & Body Styling */
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    body {
        font-family: 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        line-height: 1.6;
        color: var(--text-color);
        background-color: var(--background-color);
        min-height: 100vh;
        display: flex;
        flex-direction: column;
    }

    /* Header */
    .event-header {
        background-color: var(--primary-color);
        color: #FFFFFF;
        padding: 3rem 1rem;
        text-align: center;
        box-shadow: 0 4px 10px var(--shadow-color);
    }

    .event-header h1 {
        font-size: 2.8rem;
        margin-bottom: 0.5rem;
        letter-spacing: 1px;
    }

    .event-header p {
        font-size: 1.2rem;
        opacity: 0.9;
    }

    /* Main Content Container */
    .container {
        max-width: 1200px;
        margin: 2rem auto;
        padding: 0 1rem;
        flex-grow: 1;
    }

    /* Filter Section */
    .filters-section {
        background-color: var(--card-background);
        padding: 1.5rem;
        border-radius: 8px;
        box-shadow: 0 2px 8px var(--shadow-color);
        margin-bottom: 2rem;
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .filters-section label {
        font-weight: bold;
        color: var(--light-text-color);
        font-size: 1.1rem;
    }

    .filters-section select {
        padding: 0.75rem 1rem;
        border: 1px solid var(--border-color);
        border-radius: 5px;
        font-size: 1rem;
        background-color: #FFFFFF;
        cursor: pointer;
        outline: none;
        transition: border-color 0.3s ease, box-shadow 0.3s ease;
    }

    .filters-section select:hover {
        border-color: var(--primary-color);
    }

    .filters-section select:focus {
        border-color: var(--primary-color);
        box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.2);
    }

    /* Schedule Section */
    .schedule-section h2 {
        font-size: 2rem;
        color: var(--primary-color);
        text-align: center;
        margin-bottom: 1.5rem;
        border-bottom: 2px solid var(--secondary-color);
        padding-bottom: 0.5rem;
        display: inline-block;
        width: 100%;
    }

    .schedule-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.5rem;
    }

    /* Talk Card Styling */
    .talk-card, .break-card {
        background-color: var(--card-background);
        border-radius: 8px;
        box-shadow: 0 2px 8px var(--shadow-color);
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .talk-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 6px 16px var(--shadow-color);
    }

    .talk-card.hidden {
        display: none;
    }

    .talk-card .time, .break-card .time {
        font-size: 0.9rem;
        color: var(--primary-color);
        font-weight: bold;
        margin-bottom: 0.5rem;
        border-bottom: 1px dashed var(--border-color);
        padding-bottom: 0.5rem;
    }

    .talk-card h3 {
        font-size: 1.4rem;
        color: var(--text-color);
        margin-bottom: 0.75rem;
    }

    .talk-card .speakers {
        font-size: 1rem;
        color: var(--light-text-color);
        margin-bottom: 0.5rem;
    }

    .talk-card .categories {
        font-size: 0.85rem;
        color: var(--primary-color);
        margin-bottom: 1rem;
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
    }
    .talk-card .category-tag {
        background-color: var(--primary-color);
        color: white;
        padding: 0.2em 0.6em;
        border-radius: 4px;
        font-size: 0.8em;
    }

    .talk-card .description {
        font-size: 0.95rem;
        color: var(--light-text-color);
        flex-grow: 1; /* Allows description to take available space */
    }

    /* Break Card Styling */
    .break-card {
        background-color: #E6F7FF; /* Lighter blue for breaks */
        border: 1px dashed var(--primary-color);
        align-items: center;
        justify-content: center;
        text-align: center;
    }

    .break-card h3 {
        color: var(--primary-color);
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
    }

    .break-card .duration {
        font-size: 1rem;
        color: var(--light-text-color);
    }

    /* Footer */
    .event-footer {
        background-color: var(--text-color);
        color: #FFFFFF;
        text-align: center;
        padding: 1.5rem 1rem;
        margin-top: 3rem;
        font-size: 0.9rem;
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
        .event-header h1 {
            font-size: 2.2rem;
        }

        .event-header p {
            font-size: 1rem;
        }

        .schedule-grid {
            grid-template-columns: 1fr;
        }

        .filters-section {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.75rem;
        }
    }
`;

// 5. JavaScript (from step 5, with embedded data)
const jsContent = `
    // schedule calculation logic function is not needed directly in the browser,
    // as fullSchedule is already calculated and embedded.
    // However, for clarity and completeness if this were a modular project,
    // it would be imported. For a single file, it's just inlined.
    
    const talksData = \${JSON.stringify(placeholderTalks, null, 2)};
    const fullSchedule = \${JSON.stringify(fullSchedule, null, 2)};

    document.addEventListener('DOMContentLoaded', () => {
        const scheduleList = document.getElementById('schedule-list');
        const categoryFilter = document.getElementById('category-filter');

        function renderSchedule(currentSchedule) {
            scheduleList.innerHTML = ''; // Clear current schedule
            currentSchedule.forEach(item => {
                let element;
                if (item.type === 'talk') {
                    element = document.createElement('div');
                    element.classList.add('talk-card');
                    // Store categories as a data attribute for filtering
                    element.setAttribute('data-categories', item.categories.map(cat => cat.toLowerCase()).join(','));
                    element.innerHTML = \`
                        <div class="time">\${item.startTime} - \${item.endTime}</div>
                        <h3>\${item.title}</h3>
                        <p class="speakers">Speaker(s): \${item.speakers.join(', ')}</p>
                        <div class="categories">
                            \${item.categories.map(cat => \`<span class="category-tag">\${cat}</span>\`).join('')}
                        </div>
                        <p class="description">\${item.description}</p>
                    \`;
                } else { // type === 'break'
                    element = document.createElement('div');
                    element.classList.add('break-card');
                    element.innerHTML = \`
                        <div class="time">\${item.startTime} - \${item.endTime}</div>
                        <h3>\${item.title}</h3>
                        <p class="duration">\${item.duration}</p>
                    \`;
                }
                scheduleList.appendChild(element);
            });
        }

        function populateCategoryFilter() {
            const allCategories = new Set();
            talksData.forEach(talk => {
                if (talk.categories) {
                    talk.categories.forEach(cat => allCategories.add(cat));
                }
            });

            const sortedCategories = Array.from(allCategories).sort();

            sortedCategories.forEach(category => {
                const option = document.createElement('option');
                option.value = category.toLowerCase(); // Use lowercase for filter matching
                option.textContent = category;
                categoryFilter.appendChild(option);
            });
        }

        function filterSchedule() {
            const selectedCategory = categoryFilter.value; // Already lowercase
            const allItems = scheduleList.children; // Get all rendered items

            for (let i = 0; i < allItems.length; i++) {
                const item = allItems[i];
                if (item.classList.contains('talk-card')) {
                    const talkCategories = item.getAttribute('data-categories'); // Already lowercase
                    if (selectedCategory === 'all' || talkCategories.includes(selectedCategory)) {
                        item.classList.remove('hidden');
                    } else {
                        item.classList.add('hidden');
                    }
                } else {
                    // Break cards are always visible
                    item.classList.remove('hidden');
                }
            }
        }

        // Initial render of the full schedule
        renderSchedule(fullSchedule);
        populateCategoryFilter();

        // Event Listener for Filter
        categoryFilter.addEventListener('change', filterSchedule);
    });
`;

// Combine all parts
const finalHtml = htmlTemplate
    .replace('<style id="injected-css"></style>', `<style>\${cssContent}</style>`)
    .replace('<script id="injected-js"></script>', `<script>\${jsContent}</script>`);

// Write the final index.html file
fs.writeFileSync('index.html', finalHtml);
console.log('index.html generated successfully!');
