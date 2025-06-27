require('dotenv').config();          // .env 로드
const express    = require('express');
const path       = require('path');
const bodyParser = require('body-parser');
const morgan     = require('morgan');
const cors       = require('cors');
const session       = require('express-session');
const MySQLStore    = require('express-mysql-session')(session);
const pool       = require('./db');  // 분리된 DB 연결 모듈

const app = express();

app.use(express.static(path.join(__dirname, 'front')));

// 라우터 불러오기
const notificationsRouter   = require('./server/notifications');
const usersRouter = require('./server/pages/user/signup');
const loginRouter = require('./server/pages/user/login');
const emailRouter = require('./server/pages/user/email');
const settingsRouter = require('./server/pages/index/setting');

// ─── 세션 스토어 설정 (MySQL) ───────────────────────────────────────────────
// DB 접속 정보는 .env에 정의 (예: DB_HOST="localhost:3306", DB_USER, DB_PASSWORD, DB_NAME)
const sessionStore = new MySQLStore({
  host: process.env.DB_HOST.split(':')[0],
  port: process.env.DB_HOST.split(':')[1],
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
}, pool);


// 미들웨어 설정
app.use(morgan('dev'));                                               // 요청 로깅
app.use(cors({ origin: '*' }));                                       // 모든 출처 허용
app.use(bodyParser.json());                                           // JSON 바디 파싱
app.use(bodyParser.urlencoded({ extended: true }));                   // URL-encoded 바디 파싱
app.use(express.static(path.join(__dirname, 'front')));              // public 폴더 정적 파일 서빙

// ─── 세션 설정 ────────────────────────────────────────────────────
app.use(session({
  key: 'sid',
  secret: process.env.SESSION_SECRET || 'keyboard cat',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false, // HTTPS 환경이라면 true로 설정
    maxAge: 1000 * 60 * 60 * 24 // 1일
  }
}));

// /api/notifications 라우팅
app.use('/api/notifications', notificationsRouter);
app.use('/api/users', usersRouter);
app.use('/api/users', loginRouter);
app.use('/api/users/signup', require('./server/pages/user/signup'));
app.use('/api/email', emailRouter);
app.use('/api/settings', settingsRouter);

// 로그인 상태 확인
app.get('/api/users/me', (req, res) => {
  if (req.session.user) {
    res.json({ loggedIn: true, user: req.session.user });
  } else {
    res.json({ loggedIn: false });
  }
});

// 세션제거
app.post('/api/users/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: '로그아웃 실패' });
    }
    res.clearCookie('sid'); // 세션 쿠키 삭제
    res.json({ message: '로그아웃 성공' });
  });
});

// 404 처리
app.use('/api', (req, res) => {
  res.status(404).json({ error: '요청하신 API를 찾을 수 없습니다.' });
});

// 전역 에러 핸들러
app.use((err, req, res, next) => {
  console.error('[ERROR]', err);
  res.status(500).json({ error: '서버 내부 오류가 발생했습니다.' });
});

// 서버 실행
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
