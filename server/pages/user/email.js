const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// 메일 전송기 생성
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // SSL
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

// 인증 코드 전송 API
router.post('/send-code', async (req, res) => {
  const { email, code } = req.body;

  if (!email || !code) {
    return res.status(400).json({ error: '이메일 또는 코드 누락' });
  }

  try {
    await transporter.sendMail({
      from: `"연성대 스마트캠퍼스" <${process.env.MAIL_USER}>`,
      to: email,
      subject: '[연성대] 이메일 인증 코드 안내',
      html: `<p>안녕하세요.<br><strong>${code}</strong>는 인증 코드입니다.<br>5분 이내에 입력해주세요.</p>`,
    });

    res.json({ message: '인증코드 이메일 발송 완료' });
  } catch (err) {
    console.error('[메일 전송 실패]', err);
    res.status(500).json({ error: '메일 발송 실패' });
  }
});

module.exports = router;
