const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

const dataPath = path.join(__dirname, './buildings.json');

router.get('/', (req, res) => {
  fs.readFile(dataPath, 'utf8', (err, json) => {
    if (err) {
      console.error('[건물] 파일 읽기 실패:', err);
      return res.status(500).json({ error: '건물 데이터를 불러올 수 없습니다.' });
    }
    res.json(JSON.parse(json));
  });
});

module.exports = router;