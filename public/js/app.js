let currentBlobUrl = null;

function toggleBarcodeOptions() {
    const mode = document.getElementById('mode').value;
    const barcodeGroup = document.getElementById('barcodeTypeGroup');
    barcodeGroup.classList.toggle('hidden', mode !== 'barcode');
}

async function generateCode() {
    const mode = document.getElementById('mode').value;
    const text = document.getElementById('inputText').value;
    const size = document.getElementById('size').value;
    const color = document.getElementById('color').value;
    const format = document.getElementById('fileFormat').value;
    const bcid = document.getElementById('bcid').value;

    if (!text) {
        alert(translations[currentLang].error_empty);
        return;
    }

    const endpoint = mode === 'barcode' ? '/api/generate/barcode' : '/api/generate/qr';
    const bodyData = mode === 'barcode' 
        ? { text, bcid, scale: 3, height: Math.floor(size/10), color, format }
        : { text, width: size, color, format };

    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bodyData)
        });

        if (!response.ok) throw new Error('Generation failed');

        const blob = await response.blob();
        if (currentBlobUrl) URL.revokeObjectURL(currentBlobUrl);
        currentBlobUrl = URL.createObjectURL(blob);

        const previewBox = document.getElementById('previewBox');
        previewBox.innerHTML = `<img src="${currentBlobUrl}" class="max-w-full max-h-[250px] object-contain" />`;

        document.getElementById('downloadBtn').classList.remove('hidden');
    } catch (err) {
        alert("Error: " + err.message);
    }
}

function downloadCode() {
    if (!currentBlobUrl) return;
    const format = document.getElementById('fileFormat').value;
    const mode = document.getElementById('mode').value;
    
    const a = document.createElement('a');
    a.href = currentBlobUrl;
    a.download = `${mode}_${Date.now()}.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Initial setup
setLanguage('ar');