const express = require('express');
const cors = require('cors');
const bwipjs = require('bwip-js');
const QRCode = require('qrcode');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Endpoint: Barcode Generator
app.post('/api/generate/barcode', async (req, res) => {
    try {
        const { text, bcid, scale, height, color, format } = req.body;
        
        const options = {
            bcid: bcid || 'code128',
            text: text,
            scale: parseInt(scale) || 3,
            height: parseInt(height) || 10,
            includetext: true,
            textxalign: 'center',
            barcolor: color ? color.replace('#', '') : '000000',
        };

        if (format === 'svg') {
            const svg = await bwipjs.toBuffer({ ...options, render: 'svg' });
            res.setHeader('Content-Type', 'image/svg+xml');
            return res.send(svg);
        } else {
            const png = await bwipjs.toBuffer(options);
            res.setHeader('Content-Type', 'image/png');
            return res.send(png);
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Endpoint: QR Code Generator
app.post('/api/generate/qr', async (req, res) => {
    try {
        const { text, width, color, format } = req.body;
        const options = {
            width: parseInt(width) || 300,
            color: {
                dark: color || '#000000',
                light: '#FFFFFF'
            }
        };

        if (format === 'svg') {
            const svg = await QRCode.toString(text, { ...options, type: 'svg' });
            res.setHeader('Content-Type', 'image/svg+xml');
            return res.send(svg);
        } else {
            const dataUrl = await QRCode.toDataURL(text, options);
            const base64Data = dataUrl.replace(/^data:image\/png;base64,/, "");
            const img = Buffer.from(base64Data, 'base64');
            res.setHeader('Content-Type', 'image/png');
            return res.send(img);
        }
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));