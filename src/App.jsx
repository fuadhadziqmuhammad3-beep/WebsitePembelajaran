/* src/App.jsx */

import React from 'react';

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation
} from 'react-router-dom';

import soalByLevel from './data/questions';

function Navbar() {

  const [globalXP, setGlobalXP] =
    React.useState(
      Number(localStorage.getItem('globalXP')) || 0
    );

  React.useEffect(() => {

    const interval = setInterval(() => {

      const latestXP =
        Number(localStorage.getItem('globalXP')) || 0;

      setGlobalXP(latestXP);

    }, 500);

    return () => clearInterval(interval);

  }, []);

  return (

    <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-10 py-6 z-50">

      <div className="flex items-center gap-3">

        <div className="w-12 h-12 rounded-2xl bg-black text-yellow-400 flex items-center justify-center text-2xl font-bold shadow-xl">
          C
        </div>

        <div>

          <h1 className="text-2xl font-bold leading-none">
            C-Solve
          </h1>

          <p className="text-xs text-black/60 leading-none mt-1">
            Learn C Programming
          </p>

        </div>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 flex gap-8 px-8 py-3 rounded-full bg-white/70 backdrop-blur-md shadow-xl">

        <Link
          to="/"
          className="hover:text-yellow-500 transition-all duration-300"
        >
          Home
        </Link>

        <Link
          to="/latihan"
          className="hover:text-yellow-500 transition-all duration-300"
        >
          Latihan
        </Link>

        <Link
          to="/leaderboard"
          className="hover:text-yellow-500 transition-all duration-300"
        >
          Leaderboard
        </Link>

        <Link
          to="/tentang"
          className="hover:text-yellow-500 transition-all duration-300"
        >
          Tentang
        </Link>

      </div>

      <div className="bg-yellow-400 px-5 py-3 rounded-2xl shadow-lg font-bold animate-pulse">
        ⚡ {globalXP} XP
      </div>

    </nav>
  );
}

function HomePage() {

  return (

    <div className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-gradient-to-br from-[#f5f5f5] to-[#dcdcdc]">

      <h1 className="text-7xl font-bold leading-tight mb-6">

        Latihan <br />
        Pemrograman dengan <br />
        Bahasa <span className="text-yellow-500">C</span>

      </h1>

      <p className="max-w-2xl text-black/60 text-lg mb-10">

        Media pembelajaran berbasis web untuk melatih kemampuan problem solving
        melalui latihan coding interaktif menggunakan bahasa C.

      </p>

      <Link
        to="/latihan"
        className="px-10 py-4 bg-black text-white rounded-2xl shadow-xl hover:scale-105 hover:bg-yellow-500 hover:text-black transition-all duration-300"
      >
        Mulai Latihan
      </Link>

    </div>
  );
}

function LeaderboardPage() {

  const leaderboard = [

    {
      rank: '#1',
      name: 'Jane Cooper',
      point: 120,
    },

    {
      rank: '#2',
      name: 'Wade Warren',
      point: 110,
    },

    {
      rank: '#3',
      name: 'Esther Howard',
      point: 100,
    },
  ];

  return (

    <div className="min-h-screen bg-gradient-to-br from-[#f5f5f5] to-[#dcdcdc] px-10 pt-40 pb-20">

      <div className="text-center mb-12">

        <h1 className="text-6xl font-bold mb-3">
          Leaderboard
        </h1>

        <p className="text-black/60 text-lg">
          Pemain terbaik minggu ini
        </p>

      </div>

      <div className="max-w-5xl mx-auto bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden">

        <table className="w-full text-lg">

          <thead className="bg-black text-white">

            <tr>

              <th className="py-5">
                Rank
              </th>

              <th>
                Nama
              </th>

              <th>
                XP
              </th>

            </tr>

          </thead>

          <tbody>

            {leaderboard.map((item, index) => (

              <tr
                key={index}
                className="text-center border-b border-black/10 hover:bg-yellow-50 transition-all duration-300"
              >

                <td className="py-6 font-bold">

                  {index === 0 ? (
                    <span className="text-yellow-500">
                      {item.rank}
                    </span>
                  ) : (
                    item.rank
                  )}

                </td>

                <td>
                  {item.name}
                </td>

                <td className="font-bold text-yellow-500">
                  {item.point} XP
                </td>

              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </div>
  );
}

function LatihanPage() {

  const latihan = Array.from({ length: 12 }, (_, i) => i + 1);

  function getStars(score) {

    if (score >= 50) {
      return '★★★';
    }
    else if (score >= 30) {
      return '★★☆';
    }
    else if (score >= 10) {
      return '★☆☆';
    }

    return '☆☆☆';
  }

  function isUnlocked(level) {

    if (level === 1) return true;

    const prevScore =
      Number(localStorage.getItem(`latihan${level - 1}Score`)) || 0;

    return prevScore >= 30;
  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-[#f5f5f5] to-[#dcdcdc] px-10 pt-40 pb-20">

      <div className="text-center mb-14">

        <h1 className="text-6xl font-bold mb-3">
          Latihan
        </h1>

        <p className="text-black/60 text-lg">
          Pilih latihan untuk mengasah skill coding kamu.
        </p>

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">

        {latihan.map((item) => {

          const score =
            Number(localStorage.getItem(`latihan${item}Score`)) || 0;

          const unlocked = isUnlocked(item);

          return (

            <div
              key={item}
              className={`rounded-3xl p-10 text-center shadow-xl transition-all duration-300 ${
                unlocked
                  ? 'bg-white hover:-translate-y-2 hover:shadow-2xl'
                  : 'bg-gray-300 opacity-60'
              }`}
            >

              {unlocked ? (

                <Link
                  to="/exercise"
                  state={{
                    level: item
                  }}
                >

                  <h2 className="text-4xl font-bold mb-5">
                    Latihan {item}
                  </h2>

                  <div className="text-yellow-500 text-4xl mb-3">

                    {getStars(score)}

                  </div>

                  <p className="text-black/60">
                    XP: {score}
                  </p>

                </Link>

              ) : (

                <>

                  <div className="text-6xl mb-5">
                    🔒
                  </div>

                  <h2 className="text-3xl font-bold mb-3">
                    Locked
                  </h2>

                  <p className="text-black/60">
                    Selesaikan latihan sebelumnya
                  </p>

                </>

              )}

            </div>
          );
        })}
      </div>
    </div>
  );
}

function ExercisePage() {

  const location = useLocation();

  const level = location.state?.level || 1;

  const soal = soalByLevel[level];

  const waktuLevel = {

    1: 60,
    2: 120,
    3: 140,
    4: 160,
    5: 180,
    6: 200,
    7: 220,
    8: 240,
    9: 260,
    10: 280,
    11: 300,
    12: 360,
  };

  const [timer, setTimer] =
    React.useState(waktuLevel[level]);

  const [currentSoal, setCurrentSoal] =
    React.useState(0);

  const [selected, setSelected] =
    React.useState('');

  const [score, setScore] =
    React.useState(0);

  const [message, setMessage] =
    React.useState('');

  const soalAktif = soal[currentSoal];

  const navigate = useNavigate();

  React.useEffect(() => {

    if (timer <= 0) {

      navigate('/finish', {
        state: {
          score: score
        }
      });

      return;
    }

    const interval = setInterval(() => {

      setTimer((prev) => prev - 1);

    }, 1000);

    return () => clearInterval(interval);

  }, [timer]);

  function checkJawaban() {

    if (selected === soalAktif.jawaban) {

      setScore(score + 10);

      setMessage('✅ Jawaban Benar! +10 XP');

    } else {

      setMessage('❌ Jawaban Salah');
    }
  }

  function nextSoal() {

    if (currentSoal < soal.length - 1) {

      setCurrentSoal(currentSoal + 1);

      setSelected('');

      setMessage('');

    } else {

      localStorage.setItem(
        `latihan${level}Score`,
        score
      );

      const oldXP =
        Number(localStorage.getItem('globalXP')) || 0;

      localStorage.setItem(
        'globalXP',
        oldXP + score
      );

      navigate('/finish', {
        state: {
          score: score
        }
      });
    }
  }

  function prevSoal() {

    if (currentSoal > 0) {

      setCurrentSoal(currentSoal - 1);

      setSelected('');

      setMessage('');
    }
  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-[#f5f5f5] to-[#dcdcdc] px-10 pt-36 pb-20">

      <div className="flex justify-between items-center mb-10">

        <Link
          to="/latihan"
          className="px-5 py-3 bg-black text-white rounded-2xl shadow-lg hover:scale-105 transition-all duration-300"
        >
          Kembali
        </Link>

        <div className="text-center">

          <h1 className="text-5xl font-bold">
            Latihan {level}
          </h1>

          <p className="text-black/60 mt-2">
            Lengkapi kode di bawah ini.
          </p>

        </div>

        <div className="text-right">

          <p className="text-lg font-bold text-red-500">
            ⏰ {timer}s
          </p>

          <p className="font-bold text-yellow-500 text-xl">
            XP : {score}
          </p>

        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-2xl p-12 text-center mb-10">

        <h2 className="text-3xl font-bold mb-6">

          {soalAktif.pertanyaan}

        </h2>

        <div className="bg-[#f5f5f5] rounded-2xl p-8 text-left max-w-3xl mx-auto font-mono whitespace-pre-line text-lg shadow-inner">

          {soalAktif.kode}

        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">

        {soalAktif.pilihan.map((item, index) => (

          <button
            key={index}
            onClick={() => setSelected(item)}
            className={`py-4 rounded-2xl shadow-lg transition-all duration-300 ${
              selected === item
                ? 'bg-yellow-500 text-black scale-105'
                : 'bg-white hover:bg-black hover:text-white hover:scale-105'
            }`}
          >

            {item}

          </button>
        ))}
      </div>

      <div className="flex justify-center mb-8">

        <button
          onClick={checkJawaban}
          className="px-10 py-4 bg-black text-white rounded-2xl shadow-xl hover:bg-yellow-500 hover:text-black hover:scale-105 transition-all duration-300"
        >
          Cek Jawaban
        </button>

      </div>

      <div className="text-center text-2xl font-bold mb-12 animate-bounce">

        {message}

      </div>

      <div className="flex justify-between">

        <button
          onClick={prevSoal}
          className="px-6 py-3 bg-black text-white rounded-2xl shadow-lg hover:scale-105 transition-all duration-300"
        >
          Soal Sebelumnya
        </button>

        <button
          onClick={nextSoal}
          className="px-6 py-3 bg-black text-white rounded-2xl shadow-lg hover:scale-105 transition-all duration-300"
        >
          Soal Selanjutnya
        </button>

      </div>
    </div>
  );
}

function TentangPage() {

  return (

    <div className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-gradient-to-br from-[#f5f5f5] to-[#dcdcdc]">

      <div className="bg-white rounded-3xl shadow-2xl p-14 max-w-4xl">

        <h1 className="text-6xl font-bold mb-8">
          Tentang Website
        </h1>

        <p className="text-lg text-black/60 leading-relaxed">

          Website ini dibuat sebagai media pembelajaran interaktif untuk membantu
          pengguna melatih kemampuan problem solving menggunakan bahasa
          pemrograman C melalui latihan coding berbasis challenge dan puzzle.

        </p>

      </div>
    </div>
  );
}

function FinishPage() {

  const location = useLocation();

  const score = location.state?.score || 0;

  let stars = '☆☆☆';

  if (score >= 50) {
    stars = '★★★';
  }
  else if (score >= 30) {
    stars = '★★☆';
  }
  else if (score >= 10) {
    stars = '★☆☆';
  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-[#f5f5f5] to-[#dcdcdc] flex flex-col justify-center items-center text-center px-6">

      <div className="bg-white rounded-3xl shadow-2xl p-16 max-w-2xl w-full animate-pulse">

        <div className="text-7xl text-yellow-500 mb-6">
          {stars}
        </div>

        <h2 className="text-5xl font-bold mb-5">
          🎉 Latihan Selesai
        </h2>

        <p className="text-3xl font-bold text-yellow-500 mb-5">
          Total XP : {score}
        </p>

        <div className="flex justify-center gap-5">

          <Link
            to="/latihan"
            className="px-8 py-4 bg-black text-white rounded-2xl shadow-xl hover:scale-105 transition-all duration-300"
          >
            Kembali
          </Link>

          <Link
            to="/leaderboard"
            className="px-8 py-4 bg-yellow-500 text-black rounded-2xl shadow-xl hover:scale-105 transition-all duration-300"
          >
            Leaderboard
          </Link>

        </div>
      </div>
    </div>
  );
}

export default function App() {

  return (

    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<HomePage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
        <Route path="/latihan" element={<LatihanPage />} />
        <Route path="/exercise" element={<ExercisePage />} />
        <Route path="/tentang" element={<TentangPage />} />
        <Route path="/finish" element={<FinishPage />} />

      </Routes>

    </BrowserRouter>
  );
}