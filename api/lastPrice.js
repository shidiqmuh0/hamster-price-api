const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3000; // Port yang bisa Anda sesuaikan atau diatur oleh Vercel

// Mengizinkan semua origin untuk mengakses API ini
app.use(cors());

// Route untuk menangani permintaan API harga terakhir
app.get('/api/lastPrice', async (req, res) => {
  try {
    const response = await axios.get('https://api2.bybitglobal.com/spot/api/marketTrading/v2/token/dynamicsData?tokenName=HMSTR', {
      headers: {
        "accept": "*/*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json",
        "sec-ch-ua": "Chromium;v=128, Not A Brand;v=24, Brave;v=128", 
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "Windows"
      }
    });

    // Mengirim data kembali ke frontend
    res.json(response.data);

  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ error: 'Failed to fetch data from API' });
  }
});

// Menjalankan server pada port lokal (opsional, untuk pengujian lokal)
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

module.exports = app;
