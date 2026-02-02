<!-- Chosen Palette: Zen Wisdom (Warm Parchment #FDFBF7, Monk Maroon #800000, Gold Accent #D4AF37, Ink Black #333333) -->

<!-- Application Structure Plan: A thematic "Dharma Study Dashboard" designed to guide the user from the foundation (Source) to the view (Realization), then to the student's qualification (Vessel), and finally to the practice and results (Benefits). This linear yet explorable structure mimics the path of a practitioner.
1. Hero Section: Title and core essence.
2. Navigation: Tab-based for distinct topics (Lineage, Realization, Vessel, Merit).
3. Interactive Lineage Flow: Explains the reliance on Nagarjuna.
4. Realization Simulator: A toggle interacting with a Canvas to visualize "Fundamental Wisdom" (Void/Cessation) vs. "Post-Meditation" (Illusion).
5. The Vessel Checklist: Interactive self-assessment based on the text.
6. Merit Comparison Chart: Chart.js bar chart visualizing the magnitude of merit described in the text (Material vs. Wisdom).
7. Accordant Factors Grid: Clickable cards for the Six Paramitas integrated with Emptiness.
-->

<!-- Visualization & Content Choices:
1. Lineage: CSS-styled block flow. Goal: Show authority flow. Interaction: Hover for details. No SVG.
2. Realization: HTML Canvas. Goal: Metaphor for Emptiness vs Illusion. Method: Canvas API draws a clear circle (Void) or a scattered particle circle (Illusion) based on user toggle.
3. Merit Chart: Chart.js. Goal: Visualize the abstract concept of "infinite merit" vs "finite material merit". Interaction: Tooltips with text from sutras.
4. Accordant Factors: CSS Grid. Goal: Show how actions support the view. Interaction: Expand on click.
-->

<!-- CONFIRMATION: NO SVG graphics used. NO Mermaid JS used. -->

<!DOCTYPE html>

<html lang="zh-TW">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>入中論善顯密意疏：第六現前地 研習平台</title>
<script src="[https://cdn.tailwindcss.com](https://www.google.com/search?q=https://cdn.tailwindcss.com)"></script>
<script src="[https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js](https://www.google.com/search?q=https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js)"></script>
<link href="[https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@400;700&family=Noto+Sans+TC:wght@300;400;500&display=swap](https://www.google.com/search?q=https://fonts.googleapis.com/css2%3Ffamily%3DNoto%2BSerif%2BTC:wght%40400%3B700%26family%3DNoto%2BSans%2BTC:wght%40300%3B400%3B500%26display%3Dswap)" rel="stylesheet">
<style>
body {
font-family: 'Noto Sans TC', sans-serif;
background-color: #FDFBF7;
color: #333333;
}
h1, h2, h3, h4 {
font-family: 'Noto Serif TC', serif;
}
.theme-maroon { color: #800000; }
.bg-maroon { background-color: #800000; }
.theme-gold { color: #B4912F; }
.bg-gold { background-color: #F3E5AB; }
.border-gold { border-color: #B4912F; }

```
    .tab-active {
        border-bottom: 3px solid #800000;
        color: #800000;
        font-weight: 700;
    }
    .tab-inactive {
        color: #666;
        transition: all 0.3s ease;
    }
    .tab-inactive:hover {
        color: #800000;
    }
    
    .chart-container {
        position: relative;
        width: 100%;
        max-width: 800px;
        height: 400px;
        margin: 0 auto;
    }

    .card-hover {
        transition: transform 0.2s, box-shadow 0.2s;
    }
    .card-hover:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    /* Custom Scrollbar */
    ::-webkit-scrollbar {
        width: 8px;
    }
    ::-webkit-scrollbar-track {
        background: #F1F1F1;
    }
    ::-webkit-scrollbar-thumb {
        background: #C4C4C4;
        border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
        background: #A0A0A0;
    }
</style>

```

</head>
<body class="antialiased min-h-screen flex flex-col">

```
<!-- Header -->
<header class="bg-maroon text-white shadow-md">
    <div class="container mx-auto px-4 py-6">
        <div class="flex flex-col md:flex-row justify-between items-center">
            <div>
                <h1 class="text-3xl md:text-4xl font-bold tracking-wide mb-2">入中論善顯密意疏</h1>
                <p class="text-gold opacity-90 text-sm md:text-base font-light tracking-wider">第六現前地：緣起真實性與滅盡定之探究</p>
            </div>
            <div class="mt-4 md:mt-0 text-right hidden md:block">
                <span class="block text-xs opacity-75">講記整理：20160625-A/B</span>
                <span class="block text-xs opacity-75">主題：智慧、法器、功德</span>
            </div>
        </div>
    </div>
</header>

<!-- Navigation -->
<nav class="sticky top-0 z-50 bg-[#FDFBF7]/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
    <div class="container mx-auto px-4 overflow-x-auto">
        <div class="flex space-x-8 min-w-max" id="nav-tabs">
            <!-- Tabs will be injected here via JS -->
        </div>
    </div>
</nav>

<!-- Main Content Area -->
<main class="flex-grow container mx-auto px-4 py-8 space-y-12">
    
    <!-- Welcome Section -->
    <section id="intro-section" class="max-w-4xl mx-auto text-center mb-12">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">探索現前地的深廣境界</h2>
        <p class="text-lg text-gray-600 leading-relaxed">
            本互動研習平台旨在解析《入中論》第六地菩薩的「現見緣起真實性」。
            透過互動圖表與結構化內容，引導學人深入理解月稱論師的立論依據、滅盡定的應成派正見，以及成為聽聞空性法器的關鍵條件。
        </p>
    </section>

    <!-- Dynamic Content Container -->
    <div id="content-display" class="animate-fade-in">
        <!-- Content will be rendered here -->
    </div>

</main>

<!-- Footer -->
<footer class="bg-gray-100 border-t border-gray-200 mt-12 py-8">
    <div class="container mx-auto px-4 text-center text-gray-500 text-sm">
        <p>&copy; 20160625-A/B 講記整理 | 入中論研習資料</p>
        <p class="mt-2">僅供研討學習參考，請以原典與師長教導為準。</p>
    </div>
</footer>

<script>
    // --- Data Model ---
    const appData = {
        tabs: [
            { id: 'source', label: '立論依據', icon: '📜' },
            { id: 'realization', label: '現見與滅盡定', icon: '👁️' },
            { id: 'vessel', label: '法器與隨順', icon: '🏺' },
            { id: 'merit', label: '殊勝功德', icon: '✨' }
        ],
        content: {
            source: {
                title: "月稱論師的立論依據",
                intro: "為何月稱菩薩在論述第六地深奧境界時，強調「唯一依止龍樹」？這並非忽視佛經，而是對傳承與凡夫限制的深刻認知。",
                cards: [
                    {
                        title: "依止龍樹即依止佛經",
                        desc: "龍樹菩薩《中論》依經藏與正理撰寫，極明了地闡釋真實義。依止龍樹，即是掌握佛經密意的捷徑。",
                        highlight: "極為明了"
                    },
                    {
                        title: "凡夫的限制",
                        desc: "六地境界「非吾輩無明厚翳者之境」。凡夫若無傳承（如龍樹依文殊），無法自力宣說。這體現了謙虛與對正法的敬重。",
                        highlight: "非吾輩境界"
                    },
                    {
                        title: "傳承的重要性",
                        desc: "即使是印度頂尖大德如龍樹、無著，亦需依止本尊（文殊、慈氏）。當代人不可狂妄輕視論典而只讀佛經。",
                        highlight: "依他力通達"
                    }
                ],
                flowStep: [
                    { text: "佛陀 (經教)", sub: "宣說真實義" },
                    { text: "龍樹菩薩 (中論)", sub: "依正理極明了闡釋" },
                    { text: "月稱論師 (入中論)", sub: "依教規而說，不自創" },
                    { text: "吾輩學人", sub: "依止傳承，無倒聽聞" }
                ]
            },
            realization: {
                title: "現見緣起真實性與滅盡定",
                intro: "第六地菩薩的現證境界難以言詮。我們必須區分「根本定」與「後得位」的不同視角，並理解應成派對「滅盡定」的獨特見解。",
                comparison: {
                    fundamental: {
                        label: "根本定 (根本智)",
                        desc: "無二現，專注於法性（空性）。不見如影像般的緣起物。見「滅」（戲論息滅）。",
                        visualType: "void" 
                    },
                    post: {
                        label: "後得位 (後得智)",
                        desc: "出定後，見緣起如影像。描述世俗諦如幻如化。文字解釋多以此角度切入。",
                        visualType: "illusion"
                    }
                },
                nirodha: {
                    title: "滅盡定 (Nirodha-samāpatti) 之辯證",
                    points: [
                        { school: "自續派以下", view: "不相應行法 (非心非色)，類似身心停止狀態。" },
                        { school: "應成派 (本書觀點)", view: "根本定，是現證實際的智慧。專注於「滅」，息滅自相戲論。" },
                        { school: "第六地殊勝", view: "第六地之無間道與解脫道根本定，皆為滅盡定。" }
                    ]
                }
            },
            vessel: {
                title: "法器的條件與隨順修習",
                intro: "並非所有人都能受持空性教法。成為合格的「法器」，需要檢視自身的徵兆、動機，並主動創造修行的順緣。",
                checklist: [
                    { q: "聽到空性時，內心是否數數歡喜？", type: "sign" },
                    { q: "聽到空性時，是否感動落淚、汗毛直豎？", type: "sign" },
                    { q: "是否能做到「不違背善知識的教誡」？", type: "limit", note: "最低限度要求" },
                    { q: "是否避免將空性誤解為「什麼都沒有」(斷見)？", type: "wrong" },
                    { q: "發心是否清淨 (不求名聞利養、不為害人)？", type: "motive" }
                ],
                accordant: {
                    title: "隨順門 (Accordant Factors)",
                    desc: "若真愛空性，應修習彼順緣。如同世間求生計，學佛亦需主動鑽研。",
                    items: [
                        { name: "布施", detail: "三輪體空，不執著施者、受者、物。" },
                        { name: "持戒", detail: "知罪性本空，持戒更清淨嚴謹。" },
                        { name: "忍辱", detail: "無我相人相，能忍一切難忍。" },
                        { name: "聽聞", detail: "無倒聽聞，務求入心續 (Go-wa)。" },
                        { name: "動機", detail: "為利眾生、報佛恩，非為今生小利。" },
                        { name: "依師", detail: "視師如佛，不違教令。" }
                    ]
                }
            },
            merit: {
                title: "聽聞空性的殊勝功德",
                intro: "佛法價值觀重在「調心」。聽聞、信解空性所累積的福德，遠超外在物質布施，甚至能淨除極重罪業。",
                chartData: {
                    labels: ['財布施 (恆河沙數世界)', '無善巧修六度 (百千劫)', '受持般若四句偈', '信解空性 (內心調伏)'],
                    data: [10, 20, 95, 100], // Metaphorical relative values
                    colors: ['#D1D5DB', '#9CA3AF', '#B4912F', '#800000']
                },
                warnings: [
                    { title: "動機錯誤", text: "若為治病、驅鬼、詛咒而修般若，是大材小用，來世恐墮落。" },
                    { title: "具備二過", text: "發心不清淨 + 倒說/倒聽 = 障礙無量功德，失壞福德。" },
                    { title: "淨罪之力", text: "悟入無我，能滅除五無間罪。空性見能摧毀罪業之根。" }
                ]
            }
        }
    };

    // --- State Management ---
    let currentState = {
        activeTab: 'source',
        realizationView: 'fundamental', // 'fundamental' or 'post'
        vesselScore: 0
    };

    // --- Rendering Functions ---

    function init() {
        renderTabs();
        renderContent(currentState.activeTab);
    }

    function renderTabs() {
        const navContainer = document.getElementById('nav-tabs');
        navContainer.innerHTML = appData.tabs.map(tab => `
            <button 
                onclick="switchTab('${tab.id}')"
                class="px-4 py-4 text-sm md:text-base font-medium whitespace-nowrap focus:outline-none ${currentState.activeTab === tab.id ? 'tab-active' : 'tab-inactive'}"
            >
                <span class="mr-2">${tab.icon}</span>${tab.label}
            </button>
        `).join('');
    }

    function switchTab(tabId) {
        currentState.activeTab = tabId;
        renderTabs();
        renderContent(tabId);
    }

    function renderContent(tabId) {
        const container = document.getElementById('content-display');
        container.innerHTML = ''; // Clear current content
        
        // Render Intro
        const sectionData = appData.content[tabId];
        const header = document.createElement('div');
        header.className = 'mb-8 border-l-4 border-gold pl-4 animate-fade-in-up';
        header.innerHTML = `
            <h3 class="text-2xl font-bold text-maroon mb-2">${sectionData.title}</h3>
            <p class="text-gray-600">${sectionData.intro}</p>
        `;
        container.appendChild(header);

        // Dispatch specific render logic based on tab
        if (tabId === 'source') renderSourceSection(container, sectionData);
        if (tabId === 'realization') renderRealizationSection(container, sectionData);
        if (tabId === 'vessel') renderVesselSection(container, sectionData);
        if (tabId === 'merit') renderMeritSection(container, sectionData);
    }

    // --- Section Specific Renderers ---

    function renderSourceSection(container, data) {
        // Flow Diagram
        const flowContainer = document.createElement('div');
        flowContainer.className = 'flex flex-col md:flex-row justify-center items-center gap-4 mb-12 bg-white p-6 rounded-lg shadow-sm';
        
        flowContainer.innerHTML = data.flowStep.map((step, index) => `
            <div class="flex flex-col items-center text-center group cursor-default">
                <div class="w-16 h-16 rounded-full bg-maroon text-white flex items-center justify-center text-xl font-bold mb-2 shadow-lg group-hover:bg-gold transition-colors">
                    ${index + 1}
                </div>
                <div class="font-bold text-gray-800">${step.text}</div>
                <div class="text-xs text-gray-500 max-w-[120px]">${step.sub}</div>
            </div>
            ${index < data.flowStep.length - 1 ? `<div class="text-gray-300 text-2xl hidden md:block">➔</div><div class="text-gray-300 text-2xl md:hidden">⬇</div>` : ''}
        `).join('');
        container.appendChild(flowContainer);

        // Cards Grid
        const grid = document.createElement('div');
        grid.className = 'grid grid-cols-1 md:grid-cols-3 gap-6';
        grid.innerHTML = data.cards.map(card => `
            <div class="bg-white p-6 rounded-lg shadow-sm border-t-2 border-gold card-hover">
                <h4 class="text-lg font-bold text-maroon mb-3">${card.title}</h4>
                <p class="text-gray-600 text-sm mb-4 leading-relaxed">${card.desc}</p>
                <span class="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">${card.highlight}</span>
            </div>
        `).join('');
        container.appendChild(grid);
    }

    function renderRealizationSection(container, data) {
        // Main Interaction Container
        const wrapper = document.createElement('div');
        wrapper.className = 'grid grid-cols-1 lg:grid-cols-2 gap-8 items-start';

        // Left: Controls & Text
        const textCol = document.createElement('div');
        textCol.className = 'space-y-6';
        
        // Toggle
        const toggleContainer = document.createElement('div');
        toggleContainer.className = 'bg-white p-1 rounded-full inline-flex shadow-inner border border-gray-200 mb-4';
        toggleContainer.innerHTML = `
            <button onclick="updateRealizationView('fundamental')" class="px-6 py-2 rounded-full text-sm font-medium transition-colors ${currentState.realizationView === 'fundamental' ? 'bg-maroon text-white shadow' : 'text-gray-500 hover:bg-gray-50'}">根本定 (滅盡定)</button>
            <button onclick="updateRealizationView('post')" class="px-6 py-2 rounded-full text-sm font-medium transition-colors ${currentState.realizationView === 'post' ? 'bg-maroon text-white shadow' : 'text-gray-500 hover:bg-gray-50'}">後得位 (如影像)</button>
        `;
        textCol.appendChild(toggleContainer);

        // Info Card (Dynamic)
        const activeInfo = currentState.realizationView === 'fundamental' ? data.comparison.fundamental : data.comparison.post;
        const infoCard = document.createElement('div');
        infoCard.className = 'bg-white p-6 rounded-lg shadow-md border-l-4 border-maroon animate-fade-in';
        infoCard.innerHTML = `
            <h4 class="text-xl font-bold text-gray-800 mb-2">${activeInfo.label}</h4>
            <p class="text-gray-600 leading-relaxed">${activeInfo.desc}</p>
            <div class="mt-4 text-sm text-gold font-semibold">
                ${currentState.realizationView === 'fundamental' ? '見真實性・息滅戲論' : '見緣起相・如幻如化'}
            </div>
        `;
        textCol.appendChild(infoCard);

        // Nirodha Table
        const nirodhaBox = document.createElement('div');
        nirodhaBox.className = 'mt-8 bg-[#FDFBF7] p-6 rounded border border-gray-200';
        nirodhaBox.innerHTML = `
            <h5 class="font-bold text-gray-800 mb-4 border-b pb-2">滅盡定 (應成派觀點)</h5>
            <ul class="space-y-3">
                ${data.nirodha.points.map(p => `
                    <li class="flex items-start">
                        <span class="inline-block w-24 flex-shrink-0 text-xs font-bold text-maroon bg-red-50 px-2 py-1 rounded mr-3">${p.school}</span>
                        <span class="text-sm text-gray-700">${p.view}</span>
                    </li>
                `).join('')}
            </ul>
        `;
        textCol.appendChild(nirodhaBox);

        wrapper.appendChild(textCol);

        // Right: Canvas Visualization
        const canvasCol = document.createElement('div');
        canvasCol.className = 'bg-white p-4 rounded-xl shadow-inner border border-gray-200 flex flex-col items-center justify-center min-h-[300px] chart-container';
        canvasCol.innerHTML = '<canvas id="realizationCanvas" width="400" height="400" class="w-full h-full max-w-[400px] max-h-[400px]"></canvas>';
        wrapper.appendChild(canvasCol);

        container.appendChild(wrapper);

        // Draw Canvas after append
        requestAnimationFrame(drawRealizationCanvas);
    }

    function drawRealizationCanvas() {
        const canvas = document.getElementById('realizationCanvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        const centerX = width / 2;
        const centerY = height / 2;

        // Clear
        ctx.clearRect(0, 0, width, height);

        if (currentState.realizationView === 'fundamental') {
            // Draw Void / Cessation (Abstract Serene Circle)
            // Gradient Background representing depth/void
            const grad = ctx.createRadialGradient(centerX, centerY, 50, centerX, centerY, 180);
            grad.addColorStop(0, '#FFFFFF');
            grad.addColorStop(1, '#F3E5AB'); // Light Gold fade
            
            ctx.fillStyle = grad;
            ctx.fillRect(0,0, width, height);

            // A single, perfect, empty circle representing "One Taste" / "Non-duality"
            ctx.beginPath();
            ctx.arc(centerX, centerY, 80, 0, Math.PI * 2);
            ctx.strokeStyle = '#B4912F';
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.font = '16px "Noto Serif TC"';
            ctx.fillStyle = '#800000';
            ctx.textAlign = 'center';
            ctx.fillText("無二現・滅戲論", centerX, centerY + 5);

        } else {
            // Draw Illusion / Post-Meditation (Scattered, Mirage-like)
            ctx.fillStyle = '#FAFAFA';
            ctx.fillRect(0,0, width, height);

            // Draw many small circles representing dependent origination phenomena
            for(let i=0; i<30; i++) {
                const angle = (i / 30) * Math.PI * 2;
                const r = 80 + Math.sin(i * 5) * 10;
                const x = centerX + Math.cos(angle) * r;
                const y = centerY + Math.sin(angle) * r;
                
                ctx.beginPath();
                ctx.arc(x, y, 5, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(128, 0, 0, 0.5)'; // Semi-transparent maroon
                ctx.fill();
                
                // Connection lines (Dependent Origination)
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.lineTo(x, y);
                ctx.strokeStyle = 'rgba(180, 145, 47, 0.2)'; // Faint gold
                ctx.stroke();
            }

            ctx.font = '16px "Noto Serif TC"';
            ctx.fillStyle = '#555';
            ctx.textAlign = 'center';
            ctx.fillText("緣起如影像", centerX, centerY + 5);
        }
    }

    function updateRealizationView(view) {
        currentState.realizationView = view;
        renderContent('realization'); // Re-render to update text and canvas
    }

    function renderVesselSection(container, data) {
        const grid = document.createElement('div');
        grid.className = 'grid grid-cols-1 md:grid-cols-2 gap-8';

        // Left: Interactive Checklist
        const checkListPanel = document.createElement('div');
        checkListPanel.className = 'bg-white p-6 rounded-lg shadow-sm border-t-4 border-maroon';
        checkListPanel.innerHTML = `
            <h4 class="text-xl font-bold text-gray-800 mb-4">法器自我檢視</h4>
            <div class="space-y-4">
                ${data.checklist.map((item, idx) => `
                    <div class="flex items-start space-x-3 p-3 rounded hover:bg-gray-50 transition-colors cursor-pointer" onclick="toggleCheck(${idx})">
                        <div class="mt-1 w-5 h-5 rounded border border-gray-300 flex items-center justify-center text-maroon" id="check-${idx}">
                            <!-- Check mark injected by JS -->
                        </div>
                        <div class="flex-1">
                            <p class="text-sm font-medium text-gray-700">${item.q}</p>
                            ${item.note ? `<span class="text-xs text-maroon bg-red-50 px-1 rounded">${item.note}</span>` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="mt-6 p-4 bg-gray-50 rounded text-xs text-gray-500">
                <p>※ 即使未具備殊勝徵兆，只要「不違背善知識教誡」，亦是最低限度的法器，能避免墮入斷見或毀謗因果。</p>
            </div>
        `;
        grid.appendChild(checkListPanel);

        // Right: Accordant Factors
        const accordantPanel = document.createElement('div');
        accordantPanel.innerHTML = `
            <h4 class="text-xl font-bold text-gray-800 mb-4">${data.accordant.title}</h4>
            <p class="text-sm text-gray-600 mb-4">${data.accordant.desc}</p>
            <div class="grid grid-cols-2 gap-3">
                ${data.accordant.items.map(item => `
                    <div class="bg-white p-3 rounded shadow-sm border border-gray-100 hover:border-gold transition-colors group">
                        <h5 class="font-bold text-maroon group-hover:text-gold transition-colors">${item.name}</h5>
                        <p class="text-xs text-gray-500 mt-1">${item.detail}</p>
                    </div>
                `).join('')}
            </div>
        `;
        grid.appendChild(accordantPanel);

        container.appendChild(grid);
    }

    function toggleCheck(idx) {
        const el = document.getElementById(`check-${idx}`);
        if (el.innerHTML.trim() === '') {
            el.innerHTML = '✓';
            el.classList.add('bg-gold', 'border-gold', 'text-white');
        } else {
            el.innerHTML = '';
            el.classList.remove('bg-gold', 'border-gold', 'text-white');
        }
    }

    function renderMeritSection(container, data) {
        // Layout: Chart on top, Warnings below
        const flexCol = document.createElement('div');
        flexCol.className = 'flex flex-col gap-10';

        // Chart Section
        const chartSection = document.createElement('div');
        chartSection.className = 'w-full bg-white p-6 rounded-lg shadow-sm';
        chartSection.innerHTML = `
            <h4 class="text-lg font-bold text-center text-gray-800 mb-2">福德之量比較 (依金剛經/寶施童子經)</h4>
            <p class="text-center text-xs text-gray-500 mb-6">外在物質布施 vs 內在智慧調心</p>
            <div class="chart-container">
                <canvas id="meritChart"></canvas>
            </div>
        `;
        flexCol.appendChild(chartSection);

        // Warnings Grid
        const warningGrid = document.createElement('div');
        warningGrid.className = 'grid grid-cols-1 md:grid-cols-3 gap-6';
        
        data.warnings.forEach((warn, idx) => {
            const warnCard = document.createElement('div');
            const isPositive = idx === 2; // Last one is positive (purification)
            warnCard.className = `p-6 rounded-lg border-l-4 ${isPositive ? 'bg-green-50 border-green-600' : 'bg-red-50 border-red-800'} shadow-sm`;
            warnCard.innerHTML = `
                <h5 class="font-bold ${isPositive ? 'text-green-800' : 'text-red-800'} mb-2">${warn.title}</h5>
                <p class="text-sm text-gray-700">${warn.text}</p>
            `;
            warningGrid.appendChild(warnCard);
        });
        flexCol.appendChild(warningGrid);

        container.appendChild(flexCol);

        // Initialize Chart
        requestAnimationFrame(() => initChart(data.chartData));
    }

    function initChart(chartData) {
        const ctx = document.getElementById('meritChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: chartData.labels,
                datasets: [{
                    label: '福德勝劣 (示意)',
                    data: chartData.data,
                    backgroundColor: chartData.colors,
                    borderRadius: 4,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: '#333',
                        titleFont: { family: 'Noto Sans TC' },
                        bodyFont: { family: 'Noto Sans TC' },
                        callbacks: {
                            label: function(context) {
                                if(context.dataIndex === 0) return "雖多，然屬世間有漏福德";
                                if(context.dataIndex === 1) return "缺善巧方便，進程緩慢";
                                if(context.dataIndex === 2) return "法供養最勝，勝前福德";
                                if(context.dataIndex === 3) return "不可思議，能淨重罪，速成佛道";
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { display: false },
                        ticks: { display: false } // Hide numbers as it's metaphorical
                    },
                    x: {
                        grid: { display: false },
                        ticks: {
                            font: { family: 'Noto Sans TC', size: 11 },
                            autoSkip: false,
                            maxRotation: 45,
                            minRotation: 45
                        }
                    }
                }
            }
        });
    }

    // --- Animations CSS ---
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fadeIn 0.5s ease-out; }
        .animate-fade-in-up { animation: fadeInUp 0.5s ease-out; }
    `;
    document.head.appendChild(styleSheet);

    // --- Init ---
    document.addEventListener('DOMContentLoaded', init);

</script>

```

</body>
</html>
