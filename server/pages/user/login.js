const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../../../db');

const router = express.Router();

router.post('/login', async (req, res) => {
  const { student_number, password } = req.body;

  try {
    const [rows] = await pool.execute(
      `SELECT id, student_number, password, name, position FROM users WHERE student_number = ?`,
      [student_number]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: '존재하지 않는 학번입니다.' });
    }

    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: '비밀번호가 일치하지 않습니다.' });
    }

    // 세션 저장
    req.session.user = {
      id: user.id,
      student_number: user.student_number,
      name: user.name,
      position: user.position
    };

    res.json({ message: '로그인 성공', user: req.session.user });
  } catch (err) {
    console.error('[로그인 오류]', err);
    res.status(500).json({ error: '서버 오류로 로그인 실패' });
  }
});

module.exports = router;
