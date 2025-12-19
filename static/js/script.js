const translations = {
    en: {
        title: "Prompt Architect",
        subtitle: "Transform images into premium AI video prompting masterpieces.",
        upload_title: "Drag & Drop or Click to Upload",
        upload_subtitle: "Supported formats: JPG, PNG, GIF",
        keywords_label: "Custom Keywords (Optional)",
        keywords_placeholder: "e.g. cyberpunk, cinematic lighting, masterpiece",
        output_lang_label: "Output Language",
        generate_btn: "Generate Video Prompt",
        result_title: "Generated Prompt",
        copy_btn: "Copy",
        loading_text: "Analyzing Image & Crafting Video Prompt...",
        sequence_label: "Sequence Length",
        sequence_hint: "(1-5 Scenes)",
        mode_image: "Image to Prompt",
        mode_text: "Text to Prompt"
    },
    cn: {
        title: "AI 提示词架构师",
        subtitle: "将图片转化为顶级 AI 视频生成提示词。",
        upload_title: "拖放或点击上传图片",
        upload_subtitle: "支持格式: JPG, PNG, GIF",
        keywords_label: "自定义关键词（可选）",
        keywords_placeholder: "例如：赛博朋克，电影级光效，杰作",
        output_lang_label: "输出语言",
        generate_btn: "生成视频提示词",
        result_title: "生成结果",
        copy_btn: "复制",
        loading_text: "正在分析图片并生成视频提示词...",
        sequence_label: "生成数量",
        sequence_hint: "(1-5 个连贯场景)",
        mode_image: "图片转提示词",
        mode_text: "文本转提示词"
    }
};

document.addEventListener('DOMContentLoaded', () => {
    if (window.particlesJS) {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#ffffff" },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
                move: { enable: true, speed: 2, direction: "none", random: false, straight: false, out_mode: "out", bounce: false }
            },
            interactivity: {
                detect_on: "canvas",
                events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" }, resize: true },
                modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
            },
            retina_detect: true
        });
    }

    const dropZone = document.getElementById('drop-zone');
    const imageInput = document.getElementById('imageInput');
    const imagePreview = document.getElementById('imagePreview');
    const uploadContent = document.querySelector('.upload-content');
    const generateBtn = document.getElementById('generateBtn');
    const resultSection = document.getElementById('resultSection');
    const resultText = document.getElementById('resultText');
    const loadingOverlay = document.getElementById('loadingOverlay');
    const copyBtn = document.getElementById('copyBtn');
    const langBtns = document.querySelectorAll('.lang-btn');

    let currentFile = null;
    let currentLang = 'en';

    async function fetchModels() {
        const select = document.getElementById('modelSelect');
        try {
            const response = await fetch('/models');
            if (response.ok) {
                const models = await response.json();
                select.innerHTML = '';
                models.forEach(model => {
                    const option = document.createElement('option');
                    option.value = model;
                    option.text = model;
                    if (model.includes('deepseek')) option.selected = true;
                    select.appendChild(option);
                });
            } else {
                select.innerHTML = '<option disabled>Failed to load models</option>';
            }
        } catch (e) {
            console.error(e);
            select.innerHTML = '<option disabled>Error loading models</option>';
        }
    }
    fetchModels();

    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            langBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            currentLang = btn.dataset.lang;
            updateLanguage(currentLang);
        });
    });

    function updateLanguage(lang) {
        const t = translations[lang];
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            if (t[key]) el.innerText = t[key];
        });
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.dataset.i18nPlaceholder;
            if (t[key]) el.placeholder = t[key];
        });
    }

    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('dragover');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        if (e.dataTransfer.files.length) {
            handleFile(e.dataTransfer.files[0]);
        }
    });

    dropZone.addEventListener('click', () => {
        imageInput.click();
    });

    imageInput.addEventListener('change', (e) => {
        if (e.target.files.length) {
            handleFile(e.target.files[0]);
        }
    });

    function handleFile(file) {
        if (!file.type.startsWith('image/')) {
            alert('Please upload an image file (JPG, PNG, GIF).');
            return;
        }

        currentFile = file;

        const reader = new FileReader();
        reader.onload = (e) => {
            imagePreview.src = e.target.result;
            imagePreview.style.display = 'block';
            uploadContent.classList.add('hidden');
            generateBtn.disabled = false;
        };
        reader.readAsDataURL(file);
    }

    const keywordsInput = document.getElementById('keywords');
    const modeInputs = document.querySelectorAll('input[name="generationMode"]');
    let currentMode = 'image';

    function updateMode() {
        if (currentMode === 'text') {
            dropZone.style.display = 'none';
            generateBtn.disabled = keywordsInput.value.trim() === '';
            if (currentLang === 'en') {
                keywordsInput.placeholder = "Describe your idea in detail (e.g. A futuristic city with flying cars...)";
            }
        } else {
            dropZone.style.display = 'block';
            generateBtn.disabled = !currentFile;
            if (currentLang === 'en') {
                keywordsInput.placeholder = "e.g. cyberpunk, cinematic lighting, masterpiece";
            }
        }
    }

    modeInputs.forEach(input => {
        input.addEventListener('change', (e) => {
            currentMode = e.target.value;
            updateMode();
        });
    });

    keywordsInput.addEventListener('input', () => {
        if (currentMode === 'text') {
            generateBtn.disabled = keywordsInput.value.trim() === '';
        }
    });

    generateBtn.addEventListener('click', async () => {
        const keywords = keywordsInput.value;
        const model = document.getElementById('modelSelect').value;
        const sequenceCount = document.getElementById('sequenceCount').value;
        const language = document.querySelector('input[name="language"]:checked').value;

        if (currentMode === 'image' && !currentFile) {
            alert('Please upload an image.');
            return;
        }
        if (currentMode === 'text' && !keywords.trim()) {
            alert('Please enter keywords.');
            return;
        }

        loadingOverlay.classList.remove('hidden');
        resultSection.classList.add('hidden');

        const formData = new FormData();
        if (currentMode === 'image' && currentFile) {
            formData.append('image', currentFile);
        }
        formData.append('keywords', keywords);
        formData.append('model', model);
        formData.append('sequence_count', sequenceCount);
        formData.append('language', language);

        try {
            const response = await fetch('/generate', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const errData = await response.json();
                throw new Error(errData.error || 'Server Error');
            }

            const data = await response.json();

            resultText.innerHTML = data.prompt.replace(/\n/g, '<br>');
            resultSection.classList.remove('hidden');

            resultSection.scrollIntoView({ behavior: 'smooth' });

        } catch (error) {
            alert('Error generating prompt: ' + error.message);
        } finally {
            loadingOverlay.classList.add('hidden');
        }
    });

    copyBtn.addEventListener('click', () => {
        const text = resultText.innerText;
        navigator.clipboard.writeText(text).then(() => {
            const originalIcon = copyBtn.innerHTML;
            const t = translations[currentLang];
            copyBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
            setTimeout(() => {
                copyBtn.innerHTML = `<i class="fa-regular fa-copy"></i> ${t.copy_btn}`;
            }, 2000);
        });
    });
});
