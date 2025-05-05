// Ambil elemen
const successSound = document.getElementById('successSound');
const errorSound = document.getElementById('errorSound');
const glitter = document.getElementById('glitter');

// Time validator
function isValidTime(inputStr) {
  let state = 'q0';
  for (let char of inputStr) {
    switch (state) {
      case 'q0': if (char === '0') state = 'q1'; else if (char === '1') state = 'q2'; else return false; break;
      case 'q1': if ('123456789'.includes(char)) state = 'q3'; else return false; break;
      case 'q2': if ('012'.includes(char)) state = 'q3'; else return false; break;
      case 'q3': if (char === ':') state = 'q4'; else return false; break;
      case 'q4': if ('012345'.includes(char)) state = 'q5'; else return false; break;
      case 'q5': if ('0123456789'.includes(char)) state = 'q6'; else return false; break;
      case 'q6': if (char === ' ') state = 'q7'; else return false; break;
      case 'q7': if (char === 'A' || char === 'P') state = 'q8'; else return false; break;
      case 'q8': if (char === 'M') state = 'qf'; else return false; break;
      case 'qf': return false;
    }
  }
  return state === 'qf';
}

// Submit
document.getElementById('registerForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const userInput = document.getElementById('timeInput').value;
  const msg = document.getElementById('validationMessage');

  if (isValidTime(userInput)) {
    successSound.play();
    msg.innerHTML = "<span style='color: green;'>✅ Time is valid</span>";
    showGlitter();
  } else {
    errorSound.play();
    msg.innerHTML = "<span style='color: red;'>❌ Time is invalid</span>";
  }
});

// Dark mode toggle
document.getElementById('darkModeToggle').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});


document.addEventListener('DOMContentLoaded', function () {
  const bgMusic = document.getElementById('bgMusic');
  const muteBtn = document.getElementById('muteBtn');

  // Biarkan musik autoplay setelah interaksi pengguna
  function enableAudio() {
    bgMusic.muted = false;
    bgMusic.play().catch(() => {}); // biar gak error di browser
    document.removeEventListener('click', enableAudio);
  }
  document.addEventListener('click', enableAudio);

  // Mute/unmute tombol
  muteBtn.addEventListener('click', () => {
    bgMusic.muted = !bgMusic.muted;
    muteBtn.textContent = bgMusic.muted ? '♬.ᐟ' : 'ᶻ 𝗓 𐰁';
  });
});


