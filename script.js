// Get DOM elements
const sourceText = document.getElementById('sourceText');
const sourceLanguage = document.getElementById('sourceLanguage');
const targetLanguage = document.getElementById('targetLanguage');
const copyIcon = document.getElementById('copy-svg');


const targetText = document.getElementById('targetText');

copyIcon.addEventListener('click', () => {
   navigator.clipboard.writeText(document.getElementById('targetText').value);
});
// Update copy icon based on color scheme
function updateCopyIcon() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        copyIcon.src = './asset/copy-wheat.svg';
    } else {
        copyIcon.src = './asset/copy-black.svg';
    }
}
// Initial icon update
updateCopyIcon();

// Listen for theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateCopyIcon);


sourceText.addEventListener('keydown', async (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        const result = await fetchTranslateText(sourceText.value, sourceLanguage.value, targetLanguage.value);
        targetText.value = result;
    }
});

targetText.addEventListener('keydown', async (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        const result = await fetchTranslateText(targetText.value, targetLanguage.value, sourceLanguage.value);
        sourceText.value = result;
    }
});


async function fetchTranslateText(text, sourceLanguage, targetLanguage) {
    try {
        const response = await fetch('http://localhost:8080/translate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                TextList: [text],
                SourceLanguage: sourceLanguage,
                TargetLanguage: targetLanguage
            })
        });

        const result = await response.json();
        if (result.length > 0) {
            return result[0].Translation;
        }
    } catch (error) {
        return 'Translation failed. Please try again.';
    }
}
