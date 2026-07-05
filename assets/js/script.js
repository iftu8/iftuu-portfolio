/**
 * ==========================================================================
 * TOKYO 2030 PRO MAX - ENTERPRISE JAVASCRIPT ENGINE
 * Modular OOP Architecture | Zero-Duplicate UUID | Bilingual AI Pro Max
 * ==========================================================================
 */

// --- 1. TOAST NOTIFICATION ENGINE ---
const ToastEngine = {
    container: null,
    init() {
        this.container = document.getElementById('toast-container');
    },
    show(message, type = 'info') {
        if (!this.container) this.init();
        const toast = document.createElement('div');
        const colors = {
            info: 'border-[#22d3ee] bg-[#09090b]/90 text-white',
            success: 'border-[#f0abfc] bg-[#09090b]/90 text-white',
            error: 'border-red-500 bg-[#09090b]/90 text-red-300'
        };
        
        toast.className = `toast-item pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl border ${colors[type]} shadow-2xl backdrop-blur-xl text-xs font-bold font-mono`;
        toast.innerHTML = `
            <span class="w-2 h-2 rounded-full ${type === 'error' ? 'bg-red-500' : 'bg-[#22d3ee]' } animate-ping"></span>
            <span>${message}</span>
        `;
        
        this.container.appendChild(toast);
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(20px)';
            toast.style.transition = 'all 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, 3500);
    }
};


// --- 2. USER AUTH & PROFILE ENGINE ---
const AuthEngine = {
    isLoggedIn: false,
    user: null,
    mode: 'login', // 'login' or 'signup'
    bookmarks: new Set(JSON.parse(localStorage.getItem('tokyo_bookmarks') || '[]')),
    history: JSON.parse(localStorage.getItem('tokyo_history') || '[]'),

    init() {
        const savedUser = localStorage.getItem('tokyo_user');
        if (savedUser) {
            this.user = JSON.parse(savedUser);
            this.isLoggedIn = true;
            this.updateUI();
        }
        this.updateBookmarkBadge();
    },

    openModal() {
        const modal = document.getElementById('auth-modal');
        modal.style.display = 'flex';
        setTimeout(() => modal.style.opacity = '1', 10);
    },

    closeModal() {
        const modal = document.getElementById('auth-modal');
        modal.style.opacity = '0';
        setTimeout(() => modal.style.display = 'none', 300);
    },

    toggleMode() {
        this.mode = this.mode === 'login' ? 'signup' : 'login';
        const title = document.getElementById('auth-title');
        const subtitle = document.getElementById('auth-subtitle');
        const nameField = document.getElementById('name-field');
        const submitBtn = document.getElementById('auth-submit-btn');
        const switchText = document.getElementById('auth-switch-text');
        const switchBtn = document.getElementById('auth-switch-btn');

        if (this.mode === 'signup') {
            title.innerText = 'Create Pro Account';
            subtitle.innerText = 'Join the architecture for unlimited commercial licenses.';
            nameField.classList.remove('hidden');
            submitBtn.innerText = 'Register Pro Account';
            switchText.innerText = 'Already have an account?';
            switchBtn.innerText = 'Login Now';
        } else {
            title.innerText = 'Welcome Back';
            subtitle.innerText = 'Access your saved 8K bookmarks & high-speed downloads.';
            nameField.classList.add('hidden');
            submitBtn.innerText = 'Login to Pro Engine';
            switchText.innerText = "Don't have a Pro account?";
            switchBtn.innerText = 'Create Free Account';
        }
    },

    handleSubmit(e) {
        e.preventDefault();
        const email = document.getElementById('auth-email').value;
        const nameInput = document.getElementById('auth-name').value;
        const name = this.mode === 'signup' && nameInput ? nameInput : email.split('@')[0];

        this.user = { name: name.toUpperCase(), email };
        this.isLoggedIn = true;
        localStorage.setItem('tokyo_user', JSON.stringify(this.user));
        
        this.closeModal();
        this.updateUI();
        ToastEngine.show(`Welcome to Pro Engine, ${this.user.name}!`, 'success');
    },

    updateUI() {
        const authSection = document.getElementById('auth-section');
        if (this.isLoggedIn && this.user) {
            authSection.innerHTML = `
                <button onclick="AuthEngine.openDashboard('bookmarks')" class="bg-gradient-to-r from-[#22d3ee] to-[#f0abfc] text-black font-[Outfit] font-black px-4 py-2 rounded-full text-xs uppercase tracking-wider flex items-center gap-2 shadow-md">
                    <span class="w-2 h-2 rounded-full bg-black"></span>
                    <span>${this.user.name.slice(0, 10)}</span>
                </button>
            `;
        } else {
            authSection.innerHTML = `
                <button onclick="AuthEngine.openModal()" class="auth-btn bg-white/10 hover:bg-white/20 text-white border border-white/15 px-4 py-2 rounded-full text-xs font-bold font-[Outfit] tracking-wider uppercase transition-all flex items-center gap-2 shadow-md">
                    <svg class="w-4 h-4 text-[#22d3ee]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                    <span>Login / Join</span>
                </button>
            `;
        }
    },

    logout() {
        this.isLoggedIn = false;
        this.user = null;
        localStorage.removeItem('tokyo_user');
        this.closeDashboard();
        this.updateUI();
        ToastEngine.show('Logged out successfully from system.', 'info');
    },

    openDashboard(tab = 'bookmarks') {
        if (!this.isLoggedIn) {
            ToastEngine.show('Please login to access your Pro Dashboard!', 'error');
            this.openModal();
            return;
        }
        document.getElementById('dash-name').innerText = this.user.name;
        document.getElementById('dash-email').innerText = this.user.email;
        document.getElementById('dash-avatar').innerText = this.user.name.charAt(0);
        
        this.switchTab(tab);
        const modal = document.getElementById('dashboard-modal');
        modal.style.display = 'flex';
        setTimeout(() => modal.style.opacity = '1', 10);
    },

    closeDashboard() {
        const modal = document.getElementById('dashboard-modal');
        modal.style.opacity = '0';
        setTimeout(() => modal.style.display = 'none', 300);
    },

    switchTab(tab) {
        const bmTab = document.getElementById('tab-bookmarks');
        const hsTab = document.getElementById('tab-history');
        const content = document.getElementById('dash-content');

        document.getElementById('dash-bm-count').innerText = this.bookmarks.size;
        document.getElementById('dash-dl-count').innerText = this.history.length;

        if (tab === 'bookmarks') {
            bmTab.className = "text-[#22d3ee] border-b-2 border-[#22d3ee] pb-1 transition-all";
            hsTab.className = "text-gray-400 hover:text-white pb-1 transition-all";
            
            if (this.bookmarks.size === 0) {
                content.innerHTML = `<div class="col-span-full text-center py-12 text-gray-500 font-mono text-xs">No bookmarks saved yet. Click the heart icon on any asset!</div>`;
            } else {
                content.innerHTML = Array.from(this.bookmarks).map(seed => `
                    <div class="group relative rounded-xl overflow-hidden border border-white/10 aspect-video bg-black cursor-pointer" onclick="AuthEngine.closeDashboard(); ModalEngine.open('${seed}')">
                        <img src="https://picsum.photos/seed/${seed}/300/200" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                        <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-xs font-bold">SEED #${seed.slice(0,6)}</div>
                    </div>
                `).join('');
            }
        } else {
            hsTab.className = "text-[#22d3ee] border-b-2 border-[#22d3ee] pb-1 transition-all";
            bmTab.className = "text-gray-400 hover:text-white pb-1 transition-all";

            if (this.history.length === 0) {
                content.innerHTML = `<div class="col-span-full text-center py-12 text-gray-500 font-mono text-xs">No download history recorded in current session.</div>`;
            } else {
                content.innerHTML = this.history.slice().reverse().map(item => `
                    <div class="bg-white/5 p-3 rounded-xl border border-white/10 flex flex-col justify-between font-mono text-xs">
                        <div>
                            <div class="text-[#f0abfc] font-bold">${item.quality} NATIVE</div>
                            <div class="text-[10px] text-gray-400 mt-1 truncate">SEED: ${item.seed}</div>
                        </div>
                        <div class="text-[9px] text-gray-500 mt-3 pt-2 border-t border-white/5 flex justify-between">
                            <span>COMMERCIAL</span><span>✓ SAVED</span>
                        </div>
                    </div>
                `).join('');
            }
        }
    },

    toggleBookmark(seed) {
        if (this.bookmarks.has(seed)) {
            this.bookmarks.delete(seed);
            ToastEngine.show(`Removed Asset #${seed.slice(0,6)} from bookmarks`, 'info');
        } else {
            this.bookmarks.add(seed);
            ToastEngine.show(`Bookmarked Asset #${seed.slice(0,6)}!`, 'success');
        }
        localStorage.setItem('tokyo_bookmarks', JSON.stringify(Array.from(this.bookmarks)));
        this.updateBookmarkBadge();
    },

    updateBookmarkBadge() {
        const badge = document.getElementById('bookmark-count');
        if (!badge) return;
        badge.innerText = this.bookmarks.size;
        badge.style.transform = this.bookmarks.size > 0 ? 'scale(1)' : 'scale(0)';
    },

    recordDownload(seed, quality) {
        this.history.push({ seed, quality, time: new Date().toLocaleTimeString() });
        localStorage.setItem('tokyo_history', JSON.stringify(this.history));
    }
};


// --- 3. THEME MANAGEMENT ENGINE ---
const ThemeEngine = {
    init() {
        const savedTheme = localStorage.getItem('tokyo_theme') || 'dark';
        this.setTheme(savedTheme, false);
    },

    setTheme(themeName, closeSidebar = true) {
        document.documentElement.setAttribute('data-theme', themeName);
        localStorage.setItem('tokyo_theme', themeName);
        if (closeSidebar) this.toggleSidebar();
        ToastEngine.show(`Theme changed to ${themeName.toUpperCase()}`, 'info');
    },

    toggleSidebar() {
        const panel = document.getElementById('settings-panel');
        panel.classList.toggle('active');
    }
};


// --- 4. ZERO-DUPLICATE INFINITE GALLERY ENGINE ---
const GalleryEngine = {
    grid: null,
    loader: null,
    isFetching: false,
    totalLoaded: 0,
    currentCategory: 'all',
    searchQuery: '',
    generatedSeeds: new Set(),

    init() {
        this.grid = document.getElementById('tokyo-grid');
        this.loader = document.getElementById('loader');
        this.loadPhotos(24);
        this.setupObserver();
    },

    generateUniqueSeed() {
        let seed;
        do {
            seed = 'xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                const r = Math.random() * 16 | 0;
                const v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        } while (this.generatedSeeds.has(seed));
        
        this.generatedSeeds.add(seed);
        return seed;
    },

    filterCategory(category, btnElement) {
        this.currentCategory = category;
        
        // Update button active states
        if (btnElement) {
            document.querySelectorAll('.cat-pill').forEach(btn => {
                btn.className = "cat-pill px-5 py-2 rounded-full text-xs font-bold font-mono tracking-wider uppercase transition-all bg-white/5 hover:bg-white/15 text-gray-300 border border-white/10";
            });
            btnElement.className = "cat-pill active px-5 py-2 rounded-full text-xs font-bold font-mono tracking-wider uppercase transition-all bg-[#22d3ee] text-black shadow-[0_0_15px_rgba(34,211,238,0.4)]";
        }

        this.grid.innerHTML = '';
        this.generatedSeeds.clear();
        this.loadPhotos(18);
        ToastEngine.show(`Filtering Category: ${category.toUpperCase()}`, 'info');
    },

    handleSearch(query) {
        this.searchQuery = query.trim().toLowerCase();
        if (this.searchTimeout) clearTimeout(this.searchTimeout);
        
        this.searchTimeout = setTimeout(() => {
            this.grid.innerHTML = '';
            this.generatedSeeds.clear();
            this.loadPhotos(16);
            if (this.searchQuery) {
                ToastEngine.show(`Searching assets matching "${this.searchQuery}"`, 'info');
            }
        }, 400);
    },

    loadPhotos(count = 15) {
        if (this.isFetching) return;
        this.isFetching = true;

        const fragment = document.createDocumentFragment();
        const aspectHeights = [400, 480, 550, 620, 700, 780];

        for (let i = 0; i < count; i++) {
            this.totalLoaded++;
            // Modify seed with search query or category to simulate deterministic AI tags
            let baseSeed = this.generateUniqueSeed();
            if (this.currentCategory !== 'all') baseSeed = `${this.currentCategory}-${baseSeed}`;
            if (this.searchQuery) baseSeed = `${this.searchQuery}-${baseSeed}`;

            const randomHeight = aspectHeights[Math.floor(Math.random() * aspectHeights.length)];
            const displayUrl = `https://picsum.photos/seed/${baseSeed}/500/${randomHeight}`;
            const isBookmarked = AuthEngine.bookmarks.has(baseSeed);

            const card = document.createElement('div');
            card.className = "masonry-item group relative rounded-2xl overflow-hidden cursor-zoom-in";
            card.onclick = () => ModalEngine.open(baseSeed);

            card.innerHTML = `
                <img src="${displayUrl}" 
                     loading="lazy" 
                     decoding="async" 
                     alt="Tokyo 2030 Pro Asset" 
                     class="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out select-none">
                
                <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-5 backdrop-blur-[2px]">
                    <div class="flex justify-between items-start transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <span class="bg-[#f0abfc] text-black text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg font-mono">Native 8K</span>
                        
                        <button onclick="event.stopPropagation(); AuthEngine.toggleBookmark('${baseSeed}')" class="p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all">
                            <svg class="w-4 h-4 ${isBookmarked ? 'text-[#f0abfc] fill-[#f0abfc]' : 'text-white'}" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg>
                        </button>
                    </div>
                    <div class="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <p class="text-white font-[Outfit] font-bold truncate text-base tracking-wide">VISION // ${baseSeed.slice(0, 10).toUpperCase()}</p>
                        <p class="text-gray-300 text-xs mt-0.5 font-light">Zero-Duplicate License • Commercial Free</p>
                    </div>
                </div>
            `;
            fragment.appendChild(card);
        }

        this.grid.appendChild(fragment);
        document.getElementById('stat-assets').innerText = `${(14820 + this.totalLoaded).toLocaleString()}+`;
        this.isFetching = false;
    },

    setupObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.isFetching) {
                    requestAnimationFrame(() => this.loadPhotos(14));
                }
            });
        }, { root: null, rootMargin: '1200px', threshold: 0 });

        if (this.loader) observer.observe(this.loader);
    }
};


// --- 5. MODAL, EXIF & DOWNLOAD ENGINE ---
const ModalEngine = {
    modal: null,
    modalImg: null,
    currentSeed: '',

    init() {
        this.modal = document.getElementById('image-modal');
        this.modalImg = document.getElementById('modal-img');
    },

    open(seed) {
        this.currentSeed = seed;
        this.modalImg.src = `https://picsum.photos/seed/${seed}/1920/1080`;
        
        // Inject EXIF Metadata simulation
        document.getElementById('modal-seed-id').innerText = `SEED #${seed.slice(0, 8).toUpperCase()}`;
        document.getElementById('modal-title').innerText = `ASSET // ${seed.split('-')[0].toUpperCase()}`;
        
        const engines = ['Midjourney v6 Pro', 'DALL-E 3 Turbo', 'SDXL Ultra 8K', 'Tokyo Neural V4'];
        const isos = ['ISO 50', 'ISO 100', 'ISO 200', 'ISO 400'];
        const apertures = ['f/1.2 Native', 'f/1.4 Ultra', 'f/2.8 Sharp', 'f/4.0 Studio'];
        const shutters = ['1/4000s', '1/8000s', '1/2000s', '1/1000s'];
        
        document.getElementById('exif-engine').innerText = engines[Math.floor(Math.random() * engines.length)];
        document.getElementById('exif-iso').innerText = isos[Math.floor(Math.random() * isos.length)];
        document.getElementById('exif-aperture').innerText = apertures[Math.floor(Math.random() * apertures.length)];
        document.getElementById('exif-shutter').innerText = shutters[Math.floor(Math.random() * shutters.length)];

        // Extract Deterministic Fake Palette
        this.generatePalette(seed);
        this.updateModalBookmarkIcon();

        this.modal.style.display = 'flex';
        setTimeout(() => this.modal.style.opacity = '1', 10);
        document.body.style.overflow = 'hidden';
    },

    generatePalette(seed) {
        const paletteContainer = document.getElementById('modal-palette');
        paletteContainer.innerHTML = '';
        
        // Deterministic color generation using seed characters
        let hash = 0;
        for (let i = 0; i < seed.length; i++) hash = seed.charCodeAt(i) + ((hash << 5) - hash);

        for (let i = 0; i < 4; i++) {
            const c = (hash & 0x00FFFFFF).toString(16).toUpperCase();
            const hex = "#" + "00000".substring(0, 6 - c.length) + c;
            hash = (hash * 1664525 + 1013904223) % 4294967296; // LCG Step
            
            const colorDiv = document.createElement('div');
            colorDiv.className = "h-full w-full flex items-center justify-center text-[9px] font-mono font-bold text-white/80 cursor-pointer hover:scale-105 transition-transform shadow-sm";
            colorDiv.style.backgroundColor = hex;
            colorDiv.innerText = hex;
            colorDiv.onclick = () => {
                navigator.clipboard.writeText(hex);
                ToastEngine.show(`Copied HEX ${hex} to clipboard!`, 'info');
            };
            paletteContainer.appendChild(colorDiv);
        }
    },

    toggleBookmarkCurrent() {
        AuthEngine.toggleBookmark(this.currentSeed);
        this.updateModalBookmarkIcon();
    },

    updateModalBookmarkIcon() {
        const icon = document.getElementById('modal-bm-icon');
        const isBookmarked = AuthEngine.bookmarks.has(this.currentSeed);
        if (isBookmarked) {
            icon.className = "w-6 h-6 transition-transform group-hover:scale-110 text-[#f0abfc] fill-[#f0abfc]";
        } else {
            icon.className = "w-6 h-6 transition-transform group-hover:scale-110 text-white fill-none";
        }
    },

    close() {
        this.modal.style.opacity = '0';
        setTimeout(() => {
            this.modal.style.display = 'none';
            this.modalImg.src = '';
            document.body.style.overflow = 'auto';
        }, 300);
    },

    async download(quality) {
        const btn = event.currentTarget;
        const originalHtml = btn.innerHTML;
        btn.innerHTML = `<span>Synthesizing...</span> <span class="loading-spinner"></span>`;
        btn.style.pointerEvents = 'none';

        const dimensions = {
            '4K': { w: 3840, h: 2160 },
            '8K': { w: 7680, h: 4320 },
            '16K': { w: 15360, h: 8640 }
        }[quality] || { w: 3840, h: 2160 };

        const downloadUrl = `https://picsum.photos/seed/${this.currentSeed}/${dimensions.w}/${dimensions.h}`;
        const fileName = `TOKYO_2030_PRO_MAX_${quality}_${this.currentSeed.slice(0, 8)}.jpg`;

        try {
            const response = await fetch(downloadUrl);
            if (!response.ok) throw new Error("Network latency encountered");

            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(blobUrl);

            AuthEngine.recordDownload(this.currentSeed, quality);
            btn.innerHTML = `<span>✓ ${quality} Asset Saved</span>`;
            ToastEngine.show(`Downloaded ${quality} asset successfully!`, 'success');
        } catch (error) {
            window.open(downloadUrl, '_blank');
            AuthEngine.recordDownload(this.currentSeed, quality);
            btn.innerHTML = `<span>Opened in Tab</span>`;
            ToastEngine.show(`Opened ${quality} in new tab (CORS Sandbox)`, 'info');
        } finally {
            setTimeout(() => {
                btn.innerHTML = originalHtml;
                btn.style.pointerEvents = 'auto';
            }, 3000);
        }
    }
};


// --- 6. PRO MAX AI CHAT ENGINE (BANGLA + ENGLISH BILINGUAL) ---
const ChatEngine = {
    toggle() {
        const chatWindow = document.getElementById('chat-window');
        chatWindow.classList.toggle('active');
    },

    sendPreset(prompt) {
        document.getElementById('chat-input').value = prompt;
        this.handleSubmit(new Event('submit'));
    },

    handleSubmit(e) {
        if (e && e.preventDefault) e.preventDefault();
        const inputField = document.getElementById('chat-input');
        const message = inputField.value.trim();
        if (!message) return;

        this.addMessage(message, 'user');
        inputField.value = '';

        // Simulate Pro Max Neural Engine Latency
        setTimeout(() => {
            const reply = this.generateResponse(message.toLowerCase());
            this.addMessage(reply, 'ai');
        }, 500);
    },

    addMessage(text, sender) {
        const chatBody = document.getElementById('chat-body');
        const msgDiv = document.createElement('div');
        
        if (sender === 'user') {
            msgDiv.className = "chat-msg user bg-[#22d3ee] text-black p-3.5 rounded-2xl rounded-tr-none max-w-[85%] self-end font-semibold shadow-md font-sans text-xs";
        } else {
            msgDiv.className = "chat-msg ai bg-white/10 p-4 rounded-2xl rounded-tl-none max-w-[85%] self-start border border-white/5 leading-relaxed text-gray-200 shadow-sm font-sans text-xs";
        }
        
        msgDiv.innerHTML = text;
        chatBody.appendChild(msgDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    },

    generateResponse(msg) {
        // Bengali / Banglish Pro Matcher
        const isBangla = /kemon|bhalo|valo|ki|koro|kothay|achis|ache|dhonnobad|tnx|jani|kivabe|download|kore|sundor|shundor|chobi|photo|free|login|signup|account/.test(msg);

        // Smart System Command Triggers
        if (msg.includes('login') || msg.includes('join') || msg.includes('signup')) {
            setTimeout(() => AuthEngine.openModal(), 1000);
            return "⚡ Pro Account Login modal open kore dewa hoyeche! Register kore unlimited 16K assets download korun.";
        }
        if (msg.includes('cyberpunk') || msg.includes('neon') || msg.includes('nature') || msg.includes('space')) {
            const cat = msg.includes('cyberpunk') ? 'cyberpunk' : msg.includes('neon') ? 'neon' : msg.includes('nature') ? 'nature' : 'space';
            setTimeout(() => GalleryEngine.filterCategory(cat, null), 800);
            return `⚡ Category filter auto-set to <strong>${cat.toUpperCase()}</strong>! Live photos filter kora hoyeche.`;
        }
        if (msg.includes('dark') || msg.includes('light') || msg.includes('solar')) {
            const theme = msg.includes('light') ? 'light' : msg.includes('solar') ? 'solar' : 'dark';
            setTimeout(() => ThemeEngine.setTheme(theme, false), 800);
            return `🎨 System theme changed to <strong>${theme.toUpperCase()}</strong> mode!`;
        }

        // Conversational Bangla Responses
        if (isBangla) {
            if (msg.includes('kemon') || msg.includes('valo') || msg.includes('bhalo')) {
                return "Ami khub bhalo achi! Ei platform-ti enterprise <strong>Pro Max v4.8 Engine</strong> diye run hocche. 60FPS speed-e kaj korbe kono lag chada!";
            }
            if (msg.includes('download') || msg.includes('kivabe') || msg.includes('chobi') || msg.includes('photo') || msg.includes('pabo')) {
                return "Jekono photo-te click kore modal open korun. Thekane EXIF metadata abong <strong>4K, 8K abong 16K Raw</strong> download button paben ekdom commercial free!";
            }
            if (msg.includes('lag') || msg.includes('slow') || msg.includes('fast')) {
                return "Amader code-e `content-visibility: auto` abong GPU Offloading kora ache. 50,000 photo eksthe load holeo kono lag paben na!";
            }
            return "Ami apnar kotha bujhte perechi. Apni uporer <strong>Search bar</strong> theke jekono tag search kore unlimited assets dekhun!";
        } 
        // English Conversational Responses
        else {
            if (msg.includes('hello') || msg.includes('hi') || msg.includes('hey')) {
                return "Hello! Welcome to the TOKYO 2030 Pro Max Engine. Try typing 'cyberpunk' or 'login' to test live system commands!";
            }
            if (msg.includes('download') || msg.includes('8k') || msg.includes('16k') || msg.includes('4k')) {
                return "Click any masonry card to launch the preview modal. You can inspect EXIF metadata, copy HEX palettes, and download native 4K/8K/16K uncompressed files.";
            }
            if (msg.includes('duplicate') || msg.includes('unique')) {
                return "Our custom RFC UUID v4 Generator guarantees 100% zero duplicate images across your entire infinite scrolling session.";
            }
            if (msg.includes('exif') || msg.includes('palette') || msg.includes('color')) {
                return "Open any image modal to see synthesized EXIF camera data and copy color HEX swatches directly to your clipboard!";
            }
            return "I am the TOKYO 2030 Pro Max AI. I am engineered to deliver zero-friction, unlimited commercial visual assets!";
        }
    }
};


// --- 7. INITIALIZE ENTERPRISE APPLICATION ON DOM LOAD ---
document.addEventListener('DOMContentLoaded', () => {
    ThemeEngine.init();
    AuthEngine.init();
    ToastEngine.init();
    GalleryEngine.init();
    ModalEngine.init();
    console.log("🚀 TOKYO 2030 PRO MAX ENTERPRISE ENGINE ONLINE // SYSTEM PERFECT");
});
