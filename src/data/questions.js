const soalByLevel = {

  1: [
    {
      pertanyaan: 'Lengkapi kode agar program menampilkan Hello World',
      kode: '#include <stdio.h>\n\nint main(){\n   [ ? ]("Hello World");\n}',
      pilihan: ['printf', 'scanf', 'return', 'include'],
      jawaban: 'printf',
    },

    {
      pertanyaan: 'Lengkapi tipe data integer yang benar',
      kode: '[ ? ] angka = 10;',
      pilihan: ['char', 'float', 'int', 'void'],
      jawaban: 'int',
    },

    {
      pertanyaan: 'Lengkapi operasi penjumlahan berikut',
      kode: 'int hasil = 5 [ ? ] 5;',
      pilihan: ['+', '-', '*', '/'],
      jawaban: '+',
    },

    {
      pertanyaan: 'Fungsi input pada C adalah?',
      kode: '[ ? ]("%d",&angka);',
      pilihan: ['printf', 'scanf', 'gets', 'puts'],
      jawaban: 'scanf',
    },

    {
      pertanyaan: 'Program C dimulai dari?',
      kode: 'int [ ? ]()',
      pilihan: ['run', 'main', 'start', 'program'],
      jawaban: 'main',
    },
  ],

  2: [
    {
      pertanyaan: 'Operator AND pada C adalah?',
      kode: 'if(a > 0 [ ? ] b > 0)',
      pilihan: ['&&', '||', '==', '!='],
      jawaban: '&&',
    },

    {
      pertanyaan: 'Increment pada for loop menggunakan?',
      kode: 'for(i=0;i<5;[ ? ])',
      pilihan: ['i++', 'i--', '++5', '--5'],
      jawaban: 'i++',
    },

    {
      pertanyaan: 'Percabangan menggunakan?',
      kode: '[ ? ](nilai > 70)',
      pilihan: ['for', 'while', 'if', 'switch'],
      jawaban: 'if',
    },

    {
      pertanyaan: 'Perulangan tak terbatas:',
      kode: 'while([ ? ])',
      pilihan: ['0', '1', '5', '-1'],
      jawaban: '1',
    },

    {
      pertanyaan: 'Array index pertama dimulai dari?',
      kode: 'angka[[ ? ]]',
      pilihan: ['0', '1', '2', '-1'],
      jawaban: '0',
    },
  ],

  3: [
    {
      pertanyaan: 'Nested loop adalah?',
      kode: '[ ? ] di dalam loop',
      pilihan: ['function', 'array', 'loop', 'pointer'],
      jawaban: 'loop',
    },

    {
      pertanyaan: 'Loop dengan kondisi di akhir:',
      kode: 'do {\n}\n[ ? ](x < 5);',
      pilihan: ['while', 'for', 'if', 'switch'],
      jawaban: 'while',
    },

    {
      pertanyaan: 'Break digunakan untuk?',
      kode: '[ ? ];',
      pilihan: ['mengulang', 'berhenti', 'input', 'output'],
      jawaban: 'berhenti',
    },

    {
      pertanyaan: 'Continue digunakan untuk?',
      kode: '[ ? ];',
      pilihan: ['skip loop', 'keluar', 'input', 'return'],
      jawaban: 'skip loop',
    },

    {
      pertanyaan: 'Loop khusus jumlah pasti:',
      kode: '[ ? ](i=0;i<5;i++)',
      pilihan: ['while', 'for', 'if', 'switch'],
      jawaban: 'for',
    },
  ],

  4: [
    {
      pertanyaan: 'Function tanpa return:',
      kode: '[ ? ] halo()',
      pilihan: ['int', 'void', 'float', 'char'],
      jawaban: 'void',
    },

    {
      pertanyaan: 'Mengembalikan nilai:',
      kode: '[ ? ] angka;',
      pilihan: ['printf', 'return', 'scanf', 'break'],
      jawaban: 'return',
    },

    {
      pertanyaan: 'Parameter function:',
      kode: 'int tambah(int a, [ ? ])',
      pilihan: ['float b', 'int b', 'char b', 'main'],
      jawaban: 'int b',
    },

    {
      pertanyaan: 'Pemanggilan function:',
      kode: '[ ? ]();',
      pilihan: ['main', 'halo', 'printf', 'scanf'],
      jawaban: 'halo',
    },

    {
      pertanyaan: 'Function berada di?',
      kode: '[ ? ] program',
      pilihan: ['awal', 'tengah', 'luar', 'akhir'],
      jawaban: 'luar',
    },
  ],

  5: [
    {
      pertanyaan: 'Simbol pointer:',
      kode: 'int [ ? ] ptr;',
      pilihan: ['&', '*', '%', '#'],
      jawaban: '*',
    },

    {
      pertanyaan: 'Alamat variabel:',
      kode: '[ ? ]angka',
      pilihan: ['*', '&', '%', '#'],
      jawaban: '&',
    },

    {
      pertanyaan: 'Dereference pointer:',
      kode: '[ ? ]ptr',
      pilihan: ['&', '*', '%', '#'],
      jawaban: '*',
    },

    {
      pertanyaan: 'Pointer menyimpan?',
      kode: 'pointer = alamat [ ? ]',
      pilihan: ['nilai', 'variabel', 'function', 'loop'],
      jawaban: 'variabel',
    },

    {
      pertanyaan: 'Pointer NULL berarti?',
      kode: 'ptr = [ ? ];',
      pilihan: ['0', 'NULL', '-1', '1'],
      jawaban: 'NULL',
    },
  ],

  6: [
    {
      pertanyaan: 'Array multidimensi:',
      kode: 'int angka[2][ ? ];',
      pilihan: ['2', '0', '1', '5'],
      jawaban: '2',
    },

    {
      pertanyaan: 'Jumlah elemen array:',
      kode: 'int angka[ ? ];',
      pilihan: ['5', '0', '-1', '1'],
      jawaban: '5',
    },

    {
      pertanyaan: 'Mengakses array:',
      kode: 'angka[ ? ]',
      pilihan: ['index', 'nilai', 'loop', 'char'],
      jawaban: 'index',
    },

    {
      pertanyaan: 'Loop untuk array:',
      kode: '[ ? ](i=0;i<5;i++)',
      pilihan: ['if', 'while', 'for', 'switch'],
      jawaban: 'for',
    },

    {
      pertanyaan: 'Array menyimpan data?',
      kode: 'dalam satu [ ? ]',
      pilihan: ['variabel', 'loop', 'pointer', 'if'],
      jawaban: 'variabel',
    },
  ],

};
export default soalByLevel;