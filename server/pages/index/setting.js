// server/pages/user/settings.js

const express = require('express');
const router = express.Router();
const pool = require('../../../db');

// 내 설정 조회
router.get('/me', async (req, res) => {
  const user = req.session.user;
  if (!user || !user.id) return res.status(401).json({ message: '로그인 필요' });

  const userId = user.id;

  try {
    const [rows] = await pool.query(
      'SELECT notifications_enabled, category_notice, category_community FROM user_settings WHERE user_id = ?',
      [userId]
    );

    if (rows.length === 0) {
      // 설정이 없으면 기본값 반환
      return res.json({
        notifications_enabled: true,
        category_notice: true,
        category_community: true,
      });
    }

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'DB 오류', error: err.message });
  }
});

// 설정 저장
router.post('/me', async (req, res) => {
  const user = req.session.user;
  if (!user || !user.id) return res.status(401).json({ message: '로그인 필요' });

  const userId = user.id;
  const { notifications_enabled, category_notice, category_community } = req.body;

  try {
    await pool.query(`
      INSERT INTO user_settings (user_id, notifications_enabled, category_notice, category_community)
      VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        notifications_enabled = VALUES(notifications_enabled),
        category_notice = VALUES(category_notice),
        category_community = VALUES(category_community)
    `, [userId, notifications_enabled, category_notice, category_community]);

    res.json({ message: '설정 저장 완료' });
  } catch (err) {
    res.status(500).json({ message: 'DB 오류', error: err.message });
  }
});

module.exports = router;
