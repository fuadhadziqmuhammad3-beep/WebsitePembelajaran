import React from 'react';
import {
  BrowserRouter, Routes, Route, Link,
  useNavigate, useLocation, Navigate,
} from 'react-router-dom';
import soalByLevel from './data/questions';
import Login from './login';

/* ── Helpers ── */
function ProtectedRoute({ children }) {
  const user = localStorage.getItem('user');
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

function AppLayout({ children }) {
  return <><Navbar />{children}</>;
}

/* ══════════════════════════════════════════
   NAVBAR
══════════════════════════════════════════ */
function Navbar() {
  const navigate = useNavigate();
  const [globalXP, setGlobalXP] = React.useState(
    Number(localStorage.getItem('globalXP')) || 0
  );
  const [scrolled, setScrolled] = React.useState(false);
  const user = localStorage.getItem('user') || 'User';

  React.useEffect(() => {
    const iv = setInterval(() => {
      setGlobalXP(Number(localStorage.getItem('globalXP')) || 0);
    }, 500);
    return () => clearInterval(iv);
  }, []);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 2.5rem',
      height: scrolled ? '64px' : '80px',
      background: scrolled ? 'rgba(10,10,10,0.95)' : 'rgba(10,10,10,0.75)',
      backdropFilter: 'blur(20px)',
      borderBottom: scrolled ? '1px solid rgba(250,204,21,0.2)' : '1px solid transparent',
      transition: 'all 0.3s ease',
    }}>
      <Link to="/home" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
        <div style={{
          width: 40, height: 40, borderRadius: 12,
          background: 'linear-gradient(135deg, #facc15, #f59e0b)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 900, fontSize: 20, color: '#000',
        }}>C</div>
        <span style={{ fontWeight: 800, fontSize: 18, color: '#fff', fontFamily: 'Poppins, sans-serif' }}>C-Solve</span>
      </Link>

      <div style={{ display: 'flex', gap: '2rem' }}>
        {[['Home', '/home'], ['Latihan', '/latihan'], ['Leaderboard', '/leaderboard'], ['Tentang', '/tentang']].map(([label, path]) => (
          <Link key={path} to={path} style={{
            color: 'rgba(255,255,255,0.7)', textDecoration: 'none',
            fontSize: 14, fontWeight: 500, fontFamily: 'Poppins, sans-serif',
            transition: 'color 0.2s',
          }}
            onMouseEnter={e => e.target.style.color = '#facc15'}
            onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.7)'}
          >{label}</Link>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          background: 'rgba(250,204,21,0.15)',
          border: '1px solid rgba(250,204,21,0.4)',
          borderRadius: 100, padding: '6px 16px',
          fontSize: 13, fontWeight: 700, color: '#facc15', fontFamily: 'Poppins, sans-serif',
        }}>⚡ {globalXP} XP</div>

        <div style={{
          width: 36, height: 36, borderRadius: '50%',
          background: 'linear-gradient(135deg, #facc15, #f59e0b)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 800, fontSize: 14, color: '#000',
        }}>{user[0].toUpperCase()}</div>

        <button onClick={() => { localStorage.removeItem('user'); navigate('/login'); }}
          style={{
            background: 'transparent', border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: 8, padding: '6px 14px', color: 'rgba(255,255,255,0.6)',
            fontSize: 13, cursor: 'pointer', fontFamily: 'Poppins, sans-serif', transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.target.style.borderColor = '#ef4444'; e.target.style.color = '#ef4444'; }}
          onMouseLeave={e => { e.target.style.borderColor = 'rgba(255,255,255,0.2)'; e.target.style.color = 'rgba(255,255,255,0.6)'; }}
        >Keluar</button>
      </div>
    </nav>
  );
}

/* ══════════════════════════════════════════
   HOME PAGE
══════════════════════════════════════════ */
function HomePage() {
  return (
    <div style={{
      minHeight: '100vh', background: '#0a0a0a',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      textAlign: 'center', padding: '0 2rem', position: 'relative', overflow: 'hidden',
      fontFamily: 'Poppins, sans-serif',
    }}>
      <div style={{ position: 'absolute', top: '20%', left: '15%', width: 400, height: 400, borderRadius: '50%', background: 'rgba(250,204,21,0.06)', filter: 'blur(80px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '20%', right: '15%', width: 300, height: 300, borderRadius: '50%', background: 'rgba(250,204,21,0.04)', filter: 'blur(60px)', pointerEvents: 'none' }} />
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'linear-gradient(rgba(250,204,21,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(250,204,21,0.03) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'rgba(250,204,21,0.1)', border: '1px solid rgba(250,204,21,0.3)',
          borderRadius: 100, padding: '6px 18px', marginBottom: '2rem',
          fontSize: 12, color: '#facc15', fontWeight: 600, letterSpacing: '0.05em',
        }}>✦ Platform Belajar Pemrograman C</div>

        <h1 style={{
          fontSize: 'clamp(2.5rem, 8vw, 5.5rem)', fontWeight: 900, lineHeight: 1.05,
          color: '#fff', marginBottom: '1.5rem', letterSpacing: '-0.03em',
        }}>
          Kuasai Bahasa <span style={{ background: 'linear-gradient(90deg, #facc15, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>C</span><br />Lewat Tantangan
        </h1>

        <p style={{ maxWidth: 540, margin: '0 auto 3rem', color: 'rgba(255,255,255,0.5)', fontSize: 17, lineHeight: 1.7 }}>
          Latihan coding interaktif berbasis challenge dan puzzle. Kumpulkan XP, unlock level, dan buktikan kemampuanmu.
        </p>

        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginBottom: '3rem' }}>
          {[['12', 'Level'], ['50+', 'Soal'], ['XP', 'System']].map(([val, label]) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: '#facc15' }}>{val}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>{label}</div>
            </div>
          ))}
        </div>

        <Link to="/latihan" style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          background: 'linear-gradient(135deg, #facc15, #f59e0b)',
          color: '#000', borderRadius: 14, padding: '16px 36px',
          fontWeight: 800, fontSize: 16, textDecoration: 'none',
          transition: 'transform 0.2s',
        }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >Mulai Latihan →</Link>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   LATIHAN PAGE
══════════════════════════════════════════ */
function LatihanPage() {
  const levels = Array.from({ length: 12 }, (_, i) => i + 1);

  function getStars(score) {
    if (score >= 50) return 3;
    if (score >= 30) return 2;
    if (score >= 10) return 1;
    return 0;
  }

  function isUnlocked(level) {
    if (level === 1) return true;
    return (Number(localStorage.getItem(`latihan${level - 1}Score`)) || 0) >= 30;
  }

  const accents = ['#facc15','#fb923c','#f87171','#a78bfa','#34d399','#60a5fa','#f472b6','#4ade80','#facc15','#fb923c','#f87171','#a78bfa'];

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', padding: '120px 2rem 4rem', fontFamily: 'Poppins, sans-serif' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 style={{ fontSize: 48, fontWeight: 900, color: '#fff', marginBottom: 8 }}>Pilih Latihan</h1>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 16 }}>Selesaikan setiap level untuk unlock level berikutnya</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.25rem', maxWidth: 1100, margin: '0 auto' }}>
        {levels.map((level) => {
          const score = Number(localStorage.getItem(`latihan${level}Score`)) || 0;
          const stars = getStars(score);
          const unlocked = isUnlocked(level);
          const accent = accents[level - 1];

          return (
            <div key={level} style={{
              background: unlocked ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 20, padding: '1.75rem',
              position: 'relative', overflow: 'hidden',
              transition: 'all 0.3s', opacity: unlocked ? 1 : 0.45,
              cursor: unlocked ? 'pointer' : 'not-allowed',
            }}
              onMouseEnter={e => { if (unlocked) { e.currentTarget.style.borderColor = accent + '60'; e.currentTarget.style.transform = 'translateY(-4px)'; }}}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              {unlocked && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${accent}, transparent)`, borderRadius: '20px 20px 0 0' }} />}
              {unlocked ? (
                <Link to="/exercise" state={{ level }} style={{ textDecoration: 'none' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: accent, letterSpacing: '0.1em', marginBottom: 8 }}>LEVEL {level}</div>
                  <div style={{ fontSize: 24, fontWeight: 900, color: '#fff', marginBottom: 12 }}>Latihan {level}</div>
                  <div style={{ display: 'flex', gap: 3, marginBottom: 10 }}>
                    {[1,2,3].map(s => <span key={s} style={{ fontSize: 15, color: s <= stars ? accent : 'rgba(255,255,255,0.15)' }}>★</span>)}
                  </div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', fontWeight: 600 }}>
                    {score > 0 ? `${score} XP` : 'Belum dimulai'}
                  </div>
                </Link>
              ) : (
                <>
                  <div style={{ fontSize: 30, marginBottom: 8 }}>🔒</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: 'rgba(255,255,255,0.3)', marginBottom: 4 }}>Terkunci</div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)' }}>Selesaikan level sebelumnya</div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   EXERCISE PAGE
══════════════════════════════════════════ */
function ExercisePage() {
  const location = useLocation();
  const level = location.state?.level || 1;
  const soal = soalByLevel[level];
  const waktuLevel = { 1:60,2:120,3:140,4:160,5:180,6:200,7:220,8:240,9:260,10:280,11:300,12:360 };

  const [timer, setTimer] = React.useState(waktuLevel[level]);
  const [currentSoal, setCurrentSoal] = React.useState(0);
  const [selected, setSelected] = React.useState('');
  const [score, setScore] = React.useState(0);
  const [message, setMessage] = React.useState('');
  const [msgType, setMsgType] = React.useState('');
  const navigate = useNavigate();
  const soalAktif = soal[currentSoal];
  const timerPercent = (timer / waktuLevel[level]) * 100;
  const timerColor = timerPercent > 50 ? '#4ade80' : timerPercent > 25 ? '#facc15' : '#f87171';

  React.useEffect(() => {
    if (timer <= 0) { navigate('/finish', { state: { score } }); return; }
    const iv = setInterval(() => setTimer(p => p - 1), 1000);
    return () => clearInterval(iv);
  }, [timer]);

  function checkJawaban() {
    if (!selected) return;
    if (selected === soalAktif.jawaban) {
      setScore(s => s + 10);
      setMessage('Jawaban Benar! +10 XP');
      setMsgType('correct');
    } else {
      setMessage(`Jawaban Salah. Jawaban: ${soalAktif.jawaban}`);
      setMsgType('wrong');
    }
  }

  function nextSoal() {
    if (currentSoal < soal.length - 1) {
      setCurrentSoal(c => c + 1); setSelected(''); setMessage(''); setMsgType('');
    } else {
      localStorage.setItem(`latihan${level}Score`, score);
      const old = Number(localStorage.getItem('globalXP')) || 0;
      localStorage.setItem('globalXP', old + score);
      navigate('/finish', { state: { score } });
    }
  }

  function prevSoal() {
    if (currentSoal > 0) { setCurrentSoal(c => c - 1); setSelected(''); setMessage(''); setMsgType(''); }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', padding: '100px 2rem 3rem', fontFamily: 'Poppins, sans-serif' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>

        {/* Top bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <Link to="/latihan" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: 13, fontWeight: 600, transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#facc15'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
          >← Kembali</Link>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.5)' }}>Soal {currentSoal + 1} / {soal.length}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ position: 'relative', width: 48, height: 48 }}>
              <svg width="48" height="48" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
                <circle cx="24" cy="24" r="20" fill="none" stroke={timerColor} strokeWidth="3"
                  strokeDasharray={`${2 * Math.PI * 20}`}
                  strokeDashoffset={`${2 * Math.PI * 20 * (1 - timerPercent / 100)}`}
                  style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.5s' }}
                />
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: timerColor }}>{timer}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>SCORE</div>
              <div style={{ fontSize: 20, fontWeight: 900, color: '#facc15' }}>{score} XP</div>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 100, height: 4, marginBottom: '2rem', overflow: 'hidden' }}>
          <div style={{ width: `${(currentSoal / soal.length) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #facc15, #f59e0b)', borderRadius: 100, transition: 'width 0.4s ease' }} />
        </div>

        {/* Question card */}
        <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 24, padding: '2.5rem', marginBottom: '1.5rem' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#facc15', letterSpacing: '0.1em', marginBottom: 12 }}>PERTANYAAN</div>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: '1.5rem', lineHeight: 1.4 }}>{soalAktif.pertanyaan}</h2>
          <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 14, padding: '1.5rem', fontFamily: 'monospace', fontSize: 15, color: '#a5f3fc', whiteSpace: 'pre-line', lineHeight: 1.8 }}>
            {soalAktif.kode}
          </div>
        </div>

        {/* Options */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.5rem' }}>
          {soalAktif.pilihan.map((item, i) => {
            const isSelected = selected === item;
            const isCorrect = message && item === soalAktif.jawaban;
            const isWrong = message && isSelected && item !== soalAktif.jawaban;
            return (
              <button key={i} onClick={() => !message && setSelected(item)} style={{
                background: isCorrect ? 'rgba(74,222,128,0.15)' : isWrong ? 'rgba(248,113,113,0.15)' : isSelected ? 'rgba(250,204,21,0.12)' : 'rgba(255,255,255,0.04)',
                border: isCorrect ? '1px solid #4ade80' : isWrong ? '1px solid #f87171' : isSelected ? '1px solid rgba(250,204,21,0.6)' : '1px solid rgba(255,255,255,0.08)',
                borderRadius: 14, padding: '1rem 1.5rem',
                color: isCorrect ? '#4ade80' : isWrong ? '#f87171' : isSelected ? '#facc15' : '#fff',
                fontSize: 15, fontWeight: 700, cursor: message ? 'default' : 'pointer',
                fontFamily: 'Poppins, sans-serif', textAlign: 'left',
                transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <span style={{
                  width: 28, height: 28, borderRadius: 8, flexShrink: 0,
                  background: isCorrect ? 'rgba(74,222,128,0.2)' : isWrong ? 'rgba(248,113,113,0.2)' : isSelected ? 'rgba(250,204,21,0.2)' : 'rgba(255,255,255,0.06)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800,
                }}>{['A','B','C','D'][i]}</span>
                {item}
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {message && (
          <div style={{
            background: msgType === 'correct' ? 'rgba(74,222,128,0.1)' : 'rgba(248,113,113,0.1)',
            border: `1px solid ${msgType === 'correct' ? 'rgba(74,222,128,0.3)' : 'rgba(248,113,113,0.3)'}`,
            borderRadius: 14, padding: '1rem 1.5rem', marginBottom: '1rem',
            color: msgType === 'correct' ? '#4ade80' : '#f87171', fontWeight: 700, fontSize: 14,
          }}>{msgType === 'correct' ? '✅' : '❌'} {message}</div>
        )}

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={prevSoal} disabled={currentSoal === 0} style={{
            flex: 1, padding: '14px', borderRadius: 14,
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
            color: currentSoal === 0 ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.7)',
            fontWeight: 700, fontSize: 14, cursor: currentSoal === 0 ? 'not-allowed' : 'pointer',
            fontFamily: 'Poppins, sans-serif', transition: 'all 0.2s',
          }}>← Sebelumnya</button>

          {!message ? (
            <button onClick={checkJawaban} style={{
              flex: 2, padding: '14px', borderRadius: 14,
              background: selected ? 'linear-gradient(135deg, #facc15, #f59e0b)' : 'rgba(255,255,255,0.05)',
              border: selected ? 'none' : '1px solid rgba(255,255,255,0.1)',
              color: selected ? '#000' : 'rgba(255,255,255,0.3)',
              fontWeight: 800, fontSize: 14, cursor: selected ? 'pointer' : 'not-allowed',
              fontFamily: 'Poppins, sans-serif', transition: 'all 0.2s',
            }}>Cek Jawaban</button>
          ) : (
            <button onClick={nextSoal} style={{
              flex: 2, padding: '14px', borderRadius: 14,
              background: 'linear-gradient(135deg, #facc15, #f59e0b)',
              border: 'none', color: '#000', fontWeight: 800, fontSize: 14,
              cursor: 'pointer', fontFamily: 'Poppins, sans-serif',
            }}>{currentSoal < soal.length - 1 ? 'Soal Berikutnya →' : 'Selesai 🎉'}</button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   LEADERBOARD PAGE
══════════════════════════════════════════ */
function LeaderboardPage() {
  const leaderboard = [
    { name: 'Jane Cooper', point: 120, badge: '👑' },
    { name: 'Wade Warren', point: 110, badge: '🥈' },
    { name: 'Esther Howard', point: 100, badge: '🥉' },
    { name: 'Cameron Williamson', point: 85, badge: null },
    { name: 'Brooklyn Simmons', point: 70, badge: null },
  ];
  const podiumColors = ['#facc15', '#94a3b8', '#fb923c'];

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', padding: '120px 2rem 4rem', fontFamily: 'Poppins, sans-serif' }}>
      <div style={{ maxWidth: 700, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ fontSize: 48, fontWeight: 900, color: '#fff', marginBottom: 8 }}>Leaderboard</h1>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 15 }}>Pemain terbaik minggu ini</p>
        </div>

        {/* Podium */}
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '1rem', marginBottom: '3rem' }}>
          {[1, 0, 2].map((idx) => {
            const p = leaderboard[idx];
            const podiumH = [140, 180, 110];
            const h = podiumH[idx === 1 ? 0 : idx === 0 ? 1 : 2];
            const rank = idx === 1 ? '1' : idx === 0 ? '2' : '3';
            return (
              <div key={idx} style={{ textAlign: 'center', flex: 1, maxWidth: 180 }}>
                <div style={{ fontSize: 28, marginBottom: 6 }}>{p.badge}</div>
                <div style={{ width: 52, height: 52, borderRadius: '50%', margin: '0 auto 8px', background: `${podiumColors[idx]}20`, border: `2px solid ${podiumColors[idx]}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 800, color: podiumColors[idx] }}>{p.name[0]}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{p.name.split(' ')[0]}</div>
                <div style={{ fontSize: 12, fontWeight: 800, color: podiumColors[idx], marginBottom: 8 }}>{p.point} XP</div>
                <div style={{ height: h, background: `linear-gradient(180deg, ${podiumColors[idx]}30, ${podiumColors[idx]}10)`, border: `1px solid ${podiumColors[idx]}40`, borderRadius: '12px 12px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 900, color: podiumColors[idx] }}>{rank}</div>
              </div>
            );
          })}
        </div>

        {/* List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {leaderboard.map((p, i) => (
            <div key={i} style={{
              background: i === 0 ? 'rgba(250,204,21,0.08)' : 'rgba(255,255,255,0.03)',
              border: i === 0 ? '1px solid rgba(250,204,21,0.3)' : '1px solid rgba(255,255,255,0.06)',
              borderRadius: 16, padding: '1rem 1.5rem',
              display: 'flex', alignItems: 'center', gap: '1rem', transition: 'all 0.2s',
            }}>
              <div style={{ width: 32, height: 32, borderRadius: 10, background: i < 3 ? `${podiumColors[i]}20` : 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color: i < 3 ? podiumColors[i] : 'rgba(255,255,255,0.3)' }}>#{i + 1}</div>
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: `${podiumColors[Math.min(i, 2)]}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 800, color: podiumColors[Math.min(i, 2)] }}>{p.name[0]}</div>
              <div style={{ flex: 1, fontWeight: 700, color: '#fff', fontSize: 15 }}>{p.name}</div>
              <div style={{ fontWeight: 800, color: i === 0 ? '#facc15' : 'rgba(255,255,255,0.5)', fontSize: 15 }}>{p.point} XP</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   TENTANG PAGE
══════════════════════════════════════════ */
function TentangPage() {
  const features = [
    { icon: '⚡', title: 'Sistem XP', desc: 'Kumpulkan poin di setiap latihan dan lihat progressmu berkembang.' },
    { icon: '🔒', title: 'Level Unlock', desc: 'Selesaikan level sebelumnya untuk membuka tantangan baru.' },
    { icon: '⏱️', title: 'Timer Tantangan', desc: 'Setiap level punya batas waktu yang membuat latihan lebih seru.' },
    { icon: '🏆', title: 'Leaderboard', desc: 'Bersaing dengan pengguna lain dan raih posisi teratas.' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', padding: '120px 2rem 4rem', fontFamily: 'Poppins, sans-serif' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(250,204,21,0.1)', border: '1px solid rgba(250,204,21,0.3)', borderRadius: 100, padding: '6px 18px', marginBottom: '1.5rem', fontSize: 12, color: '#facc15', fontWeight: 600 }}>✦ Tentang C-Solve</div>
          <h1 style={{ fontSize: 48, fontWeight: 900, color: '#fff', marginBottom: '1.5rem', lineHeight: 1.1 }}>
            Belajar C dengan<br /><span style={{ color: '#facc15' }}>Cara yang Menyenangkan</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 16, lineHeight: 1.8, maxWidth: 560, margin: '0 auto' }}>
            C-Solve adalah platform pembelajaran interaktif yang membantu kamu menguasai bahasa pemrograman C melalui tantangan coding, puzzle, dan sistem gamifikasi.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          {features.map((f, i) => (
            <div key={i} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 20, padding: '2rem', transition: 'all 0.3s', cursor: 'default' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(250,204,21,0.3)'; e.currentTarget.style.background = 'rgba(250,204,21,0.05)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
            >
              <div style={{ fontSize: 36, marginBottom: '1rem' }}>{f.icon}</div>
              <div style={{ fontSize: 17, fontWeight: 800, color: '#fff', marginBottom: 8 }}>{f.title}</div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   FINISH PAGE
══════════════════════════════════════════ */
function FinishPage() {
  const location = useLocation();
  const score = location.state?.score || 0;
  const stars = score >= 50 ? 3 : score >= 30 ? 2 : score >= 10 ? 1 : 0;
  const messages = ['Tetap semangat! 💪', 'Lumayan bagus! 👍', 'Kerja bagus! 🔥', 'Luar biasa! 🏆'];

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Poppins, sans-serif', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)', width: 400, height: 400, borderRadius: '50%', background: 'rgba(250,204,21,0.08)', filter: 'blur(80px)', pointerEvents: 'none' }} />

      <div style={{ textAlign: 'center', position: 'relative', zIndex: 1, padding: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
          {[1,2,3].map(s => (
            <div key={s} style={{ fontSize: 56, opacity: s <= stars ? 1 : 0.15, transform: s <= stars ? 'scale(1.1)' : 'scale(1)' }}>⭐</div>
          ))}
        </div>

        <div style={{ fontSize: 13, fontWeight: 700, color: '#facc15', letterSpacing: '0.1em', marginBottom: 12 }}>LATIHAN SELESAI</div>
        <h2 style={{ fontSize: 42, fontWeight: 900, color: '#fff', marginBottom: '0.5rem' }}>{messages[stars]}</h2>

        <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', background: 'rgba(250,204,21,0.1)', border: '1px solid rgba(250,204,21,0.3)', borderRadius: 20, padding: '1.5rem 3rem', margin: '2rem 0' }}>
          <div style={{ fontSize: 13, color: 'rgba(250,204,21,0.7)', fontWeight: 600, marginBottom: 4 }}>TOTAL XP DIPEROLEH</div>
          <div style={{ fontSize: 56, fontWeight: 900, color: '#facc15', lineHeight: 1 }}>+{score}</div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link to="/latihan" style={{ padding: '14px 28px', borderRadius: 14, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', textDecoration: 'none', fontWeight: 700, fontSize: 14, transition: 'all 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.12)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
          >← Kembali ke Latihan</Link>

          <Link to="/leaderboard" style={{ padding: '14px 28px', borderRadius: 14, background: 'linear-gradient(135deg, #facc15, #f59e0b)', color: '#000', textDecoration: 'none', fontWeight: 800, fontSize: 14, transition: 'all 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >Lihat Leaderboard 🏆</Link>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   ROOT
══════════════════════════════════════════ */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        {[
          ['/home', <HomePage />],
          ['/latihan', <LatihanPage />],
          ['/exercise', <ExercisePage />],
          ['/leaderboard', <LeaderboardPage />],
          ['/tentang', <TentangPage />],
          ['/finish', <FinishPage />],
        ].map(([path, el]) => (
          <Route key={path} path={path} element={
            <ProtectedRoute><AppLayout>{el}</AppLayout></ProtectedRoute>
          } />
        ))}
      </Routes>
    </BrowserRouter>
  );
}
