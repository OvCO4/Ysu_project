const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const pool = require('../../../db');

router.post('/', async (req, res) => {
  try {
    const { student_number, email, password, name, phone, department_id, position } = req.body;

    if (!student_number || !email || !password || !name || !phone || !department_id || !position) {
      return res.status(400).json({ error: '모든 값을 입력해주세요' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.execute(`
      INSERT INTO users (student_number, email, password, name, phone, department_id, position)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `, [student_number, email, hashedPassword, name, phone, department_id, position]);

    res.json({ success: true });
  } catch (err) {
    console.error('[회원가입 오류]', err);
    res.status(500).json({ error: '서버 오류' });
  }
});

module.exports = router;