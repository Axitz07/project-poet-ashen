/** @type {('poem' | 'story')[]} */

export const contents = [
  {
    id: 1,
    type: 'poem',
    title: 'Kelabu',
    body: `Aku berdiri di antara
dua sisi yang tak pernah bertemu—
bukan di tempat gelap yang memahami duka,
bukan pula di tempat terang yang menjanjikan suka.

Aku ada di kelabu.

Di sini, luka tak selalu menangis keras.
Di sini, harapan tak selalu berbicara lantang.
Hanya sunyi yang tipis,
seperti kabut pagi yang enggan pergi.

Grey isn't confusion—
it's where I stand
between scars and hope.`,
  },
  {
    id: 2,
    type: 'poem',
    title: 'Hujan Dalam',
    body: `Ada hujan yang turun ke dalam—
bukan dari langit,
tapi dari sudut mata yang terlalu lama menahan.

Ia basahi setiap lorong yang sunyi,
mengisi celah-celah yang ditinggalkan
oleh kata-kata yang tak sempat terucap.

Dan aku diam,
membiarkan hujan itu
merawat tanah yang kering
di dalam dadaku.`,
  },
  {
    id: 3,
    type: 'poem',
    title: 'Malam Terakhir Senja',
    body: `Senja itu berpamitan terlalu cepat—
sebelum aku sempat menyimpannya
dalam lipatan kenangan yang rapi.

Langit jingga berganti ungu,
ungu berganti hitam,
dan aku masih di sini,
menggenggam cahaya yang sudah lama
menjadi abu.

Tapi malam punya caranya sendiri
untuk membuat bintang
terlihat lebih dekat.`,
  },
  {
    id: 4,
    type: 'poem',
    title: 'Tentang Diam',
    body: `Diam bukan berarti kosong.
Diam adalah penuh—
terlalu penuh
hingga kata-kata tak cukup
untuk menampungnya.

Seperti danau di malam hari:
tenang di permukaan,
namun di bawahnya
arus deras mengalir
tanpa henti,
tanpa nama.`,
  },
  {
    id: 5,
    type: 'poem',
    title: 'Pulang',
    body: `Pulang bukan selalu tentang tempat.
Kadang pulang adalah perasaan—
ketika seseorang menyebut namamu
dengan nada yang tidak menghakimi.

Ketika kamu bisa bernafas lega
tanpa harus menjelaskan
mengapa kamu lelah,
mengapa kamu butuh waktu,
mengapa kamu—kamu.`,
  },
  {
    id: 6,
    type: 'story',
    title: 'Surat yang Tidak Pernah Dikirim',
    body: `Aku selalu menulis surat untukmu di malam hari.

Bukan surat yang manis atau penuh kata-kata indah. Hanya catatan kecil tentang hal-hal yang terjadi hari ini—bagaimana kopi pagiku terlalu pahit, bagaimana jalanan sore terasa lebih sepi dari biasanya, bagaimana aku menemukan buku yang mungkin akan kamu suka di rak paling atas toko itu.

Lalu aku lipat suratnya, masukkan ke amplop, dan simpan di laci meja.

Tidak pernah dikirim. Tidak pernah dibaca.

Tapi entah kenapa, menulis surat itu membuatku merasa kamu masih ada di suatu tempat—sedang minum teh, mungkin, atau membaca buku dengan selimut di atas kaki.

Dan itu cukup.
Untuk hari ini, itu cukup.`,
  },
  {
    id: 7,
    type: 'story',
    title: 'Pagi di Kedai Pojok',
    body: `Kedai kopi itu buka jam enam pagi, tapi aku selalu datang jam setengah tujuh—ketika keramaian pertama sudah surut dan hanya tersisa orang-orang yang memang sengaja mencari sunyi.

Mbak Sari sudah hafal pesananku. Americano, tanpa gula, suhu tidak terlalu panas. Dia tidak pernah bertanya kenapa aku selalu duduk di sudut paling dalam, membelakangi pintu.

Mungkin karena dia juga seorang penyuka sudut.

Pagi itu, ada gadis muda yang duduk di meja sebelah. Dia membawa buku tebal dan headphone yang terlalu besar untuk kepalanya. Sesekali dia tersenyum sendiri—entah pada buku itu, atau pada lagu yang sedang didengarnya.

Aku tidak tahu namanya. Kami tidak berbicara.

Tapi pagi itu terasa sedikit lebih hangat.
Dan itu sudah lebih dari cukup.`,
  },
  {
    id: 8,
    type: 'story',
    title: 'Catatan Tengah Malam',
    body: `Jam dua belas lebih.

Aku masih belum tidur, duduk di tepi tempat tidur dengan ponsel di tangan—bukan karena ada yang ditunggu, tapi karena malam punya cara sendiri untuk membuat pikiran terasa lebih berisik.

Di luar, hujan turun pelan. Bukan hujan deras yang dramatis. Hanya gerimis yang konsisten, seperti seseorang yang mengetuk pintu dengan sabar—tidak memaksa masuk, hanya ingin tahu apakah ada yang di dalam.

Aku membuka jendela sedikit. Membiarkan udara malam masuk.

Dan untuk pertama kalinya hari ini, aku bernafas.

Bukan nafas yang dangkal karena terburu-buru atau karena menahan sesuatu. Tapi nafas yang dalam, yang turun sampai ke perut, yang terasa seperti—lepas.

Mungkin itulah yang dibutuhkan kadang-kadang.
Bukan solusi. Bukan jawaban.
Hanya jendela yang sedikit terbuka.
Dan malam yang mau mendengarkan.`,
  },
]

/**
 * Filter konten berdasarkan tipe
 * @param {'poem' | 'story' | 'all'} type
 */
export function getContentsByType(type) {
  if (type === 'all') return contents
  return contents.filter(c => c.type === type)
}

/**
 * Ambil satu konten acak berdasarkan tipe
 * @param {'poem' | 'story'} type
 */
export function getRandomByType(type) {
  const filtered = getContentsByType(type)
  return filtered[Math.floor(Math.random() * filtered.length)]
}
