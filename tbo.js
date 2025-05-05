

// Fungsi normalisasi input (misalnya '9:30 am' -> '9:30 AM')
function normalizeTimeInput(inputStr) {
  const parts = inputStr.trim().split(/\s+/);
  if (parts.length === 2) {
    const waktu = parts[0];
    const ampm = parts[1];
    if (ampm.toLowerCase() === 'am' || ampm.toLowerCase() === 'pm') {
      return `${waktu} ${ampm.toUpperCase()}`;
    }
  }
  return inputStr;
}

// Fungsi validasi format waktu (menggunakan DFA)
function isValidTime(inputStr) {
  let state = 'q0';
  let log = '₍ᐢ. .ᐢ₎⟆ Mulai pembacaan karakter:\n';

  for (let i = 0; i < inputStr.length; i++) {
    const char = inputStr[i];
    log += `[${i}] Karakter: '${char}' | State saat ini: ${state} → `;

    switch (state) {
      case 'q0':
        if (char === '0') state = 'q1';
        else if (char === '1') state = 'q2';
        else return log + '❌ Ditolak (harus 0 atau 1)';
        log += state === 'q1' ? 'Transisi ke q1\n' : 'Transisi ke q2\n';
        break;

      case 'q1':
        if ('123456789'.includes(char)) {
          state = 'q3';
          log += 'Transisi ke q3\n';
        } else return log + '❌ Ditolak (harus 1-9 setelah 0)';
        break;

      case 'q2':
        if ('012'.includes(char)) {
          state = 'q3';
          log += 'Transisi ke q3\n';
        } else return log + '❌ Ditolak (harus 0-2 setelah 1)';
        break;

      case 'q3':
        if (char === ':') {
          state = 'q4';
          log += 'Transisi ke q4\n';
        } else return log + '❌ Ditolak (harus \':\')';
        break;

      case 'q4':
        if ('012345'.includes(char)) {
          state = 'q5';
          log += 'Transisi ke q5\n';
        } else return log + '❌ Ditolak (digit menit pertama salah)';
        break;

      case 'q5':
        if ('0123456789'.includes(char)) {
          state = 'q6';
          log += 'Transisi ke q6\n';
        } else return log + '❌ Ditolak (digit menit kedua salah)';
        break;

      case 'q6':
        if (char === ' ') {
          state = 'q7';
          log += 'Transisi ke q7\n';
        } else return log + '❌ Ditolak (harus spasi setelah menit)';
        break;

      case 'q7':
        if (char.toUpperCase() === 'A' || char.toUpperCase() === 'P') {
          state = 'q8';
          log += 'Transisi ke q8\n';
        } else return log + '❌ Ditolak (harus \'A\' atau \'P\')';
        break;

      case 'q8':
        if (char.toUpperCase() === 'M') {
          state = 'qf';
          log += 'Transisi ke qf\n';
        } else return log + '❌ Ditolak (harus \'M\')';
        break;

      case 'qf':
        return log + '❌ Ditolak: karakter tambahan setelah \'AM\'/\'PM\'';
    }
  }

  if (state === 'qf') {
    return log + '✅ Diterima: string valid berakhir di qf';
  } else {
    return log + `❌ Ditolak: berakhir di state ${state}, bukan qf`;
  }
}

// Event submit
document.getElementById('registerForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const timeInput = document.getElementById('timeInput').value;
  const normalizedInput = normalizeTimeInput(timeInput);
  const logOutput = isValidTime(normalizedInput);

  const logArea = document.getElementById('logArea');
  const validationMessage = document.getElementById('validationMessage');
  const successSound = document.getElementById('successSound');
  const errorSound = document.getElementById('errorSound');

  logArea.textContent = logOutput;

  if (logOutput.includes('✅ Diterima')) {
    validationMessage.textContent = '✅ Waktu valid!';
    validationMessage.style.color = 'green';
    successSound.play();
  } else {
    validationMessage.textContent = '❌ Waktu tidak valid!';
    validationMessage.style.color = 'red';
    errorSound.play();
  }
});

// Auto-play background music setelah interaksi pertama
document.addEventListener('DOMContentLoaded', () => {
  const bgMusic = document.getElementById('bgMusic');
  const muteBtn = document.getElementById('muteBtn');

  function enableAudio() {
    bgMusic.muted = false;
    bgMusic.play();
    document.removeEventListener('click', enableAudio);
  }

  document.addEventListener('click', enableAudio);

  muteBtn.addEventListener('click', () => {
    bgMusic.muted = !bgMusic.muted;
    muteBtn.textContent = bgMusic.muted ? '♬.ᐟ' : 'ᶻ 𝗓 𐰁';
  });
});

// Optional: Dark mode toggle
document.getElementById('darkModeToggle').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});
