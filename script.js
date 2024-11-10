// Get DOM elements
const sourceText = document.getElementById('sourceText');
const sourceLanguage = document.getElementById('sourceLanguage');
const targetLanguage = document.getElementById('targetLanguage');
const copyIcon = document.getElementById('copy-svg');

// Function to get translation inputs
function getTranslationInputs() {
    return {
        text: sourceText.value,
        fromLang: sourceLanguage.value,
        toLang: targetLanguage.value
    };
}

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


sourceText.addEventListener('blur', async () => {
    const inputs = getTranslationInputs();

    try {
        const response = await fetch('http://localhost:8080/translate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                TextList: [inputs.text],
                SourceLanguage: inputs.fromLang,
                TargetLanguage: inputs.toLang
            })
        });

        const result = await response.json();
        console.log(result)
        if (result.length > 0) {
            targetText.value = result[0].Translation;
        }
    } catch (error) {
        console.error('Translation error:', error);
        targetText.value = 'Translation failed. Please try again.';
    }
});
