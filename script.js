const targetDate = new Date("2026-04-05T09:00:00").getTime();

setInterval(() => {
  const now = new Date().getTime();
  const distance = targetDate - now;

  if (distance < 0) {
    document.querySelector(".countdown").innerHTML = "Acara Dimulai!";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / 1000 / 60) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  document.getElementById("days").innerHTML = days;
  document.getElementById("hours").innerHTML = hours;
  document.getElementById("minutes").innerHTML = minutes;
  document.getElementById("seconds").innerHTML = seconds;
}, 1000);

// document.body.classList.add("lock-scroll");

// document.getElementById("openBtn").addEventListener("click", function (e) {
//   e.preventDefault();

//   document.body.classList.remove("lock-scroll");

//   const isMobile = window.innerWidth < 768;

//   setTimeout(() => {
//     document.getElementById("home").scrollIntoView({
//       behavior: isMobile ? "auto": "smooth",
//     });
//   }, 100); // delay kecil
// });

// window.addEventListener("scroll", function () {
//   const home = document.getElementById("home");

//   if (window.scrollY < home.offsetTop) {
//     window.scrollTo({
//       top: home.offsetTop,
//       behavior: "auto",
//     });
//   }
// });
// if ("scrollRestoration" in history) {
//   history.scrollRestoration = "manual";
// }
// window.onbeforeunload = function () {
//   window.scrollTo(0, 0);
// };
// lock scroll saat pertama buka
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

window.scrollTo(0, 0);

document.body.classList.add("lock-scroll");

document.getElementById("openBtn").addEventListener("click", function (e) {
    e.preventDefault();

    // 1. sembunyikan hero
    document.querySelector(".hero").style.display = "none";

    // 2. aktifkan scroll
    document.body.classList.remove("lock-scroll");

    // 3. scroll ke home
    document.getElementById("home").scrollIntoView({
        behavior: "smooth"
    });
    setTimeout(() => {
      AOS.refresh();
    },100);
});

window.addEventListener("load", () => {
    window.scrollTo(0, 0);
});

const elements = document.querySelectorAll(".typing");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const element = entry.target;

      if (entry.isIntersecting) {
        if (element.classList.contains("typing-active")) return;

        element.classList.add("typing-active");

        const text = element.dataset.text;
        element.textContent = "";

        let index = 0;

        function typingEffect() {
          if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(typingEffect, 50);
          }
        }

        typingEffect();
        //   } else {
        //     // RESET saat keluar layar (biar bisa repeat)

        //     element.classList.remove("typing-active");
        //     element.textContent = "";
        //   }
      } else {
        element.classList.remove("typing-active");
        element.textContent = element.dataset.text; // balikin text
      }
    });
  },
  {
    threshold: 0.5,
  },
);

elements.forEach((element) => {
  element.dataset.text = element.textContent;
  element.textContent = "";
  observer.observe(element);
});

// let ticking = false;

// window.addEventListener("scroll", () => {
//     if (!ticking) {
//         window.requestAnimationFrame(() => {
//             document.querySelectorAll("[data-aos]").forEach((el) => {
//                 const rect = el.getBoundingClientRect();
//                 const triggerPoint = window.innerHeight * 0.8;

//                 if (rect.top > window.innerHeight || rect.bottom < 0) {
//                     el.classList.remove("aos-animate");
//                 }

//                 if (rect.top < triggerPoint) {
//                     el.classList.add("aos-animate");
//                 }
//             });

//             ticking = false;
//         });

//         ticking = true;
//     }
// });
let commentCount = 0;

function tambahCommentKeSlider(nama, pesan) {
    const sliderTrack = document.getElementById("commentSliderTrack");
    
    const div = document.createElement("div");
    div.classList.add("comment-item");
    div.style.animationDelay = `${commentCount * 0.2}s`; // Stagger effect
    
    div.innerHTML = `
        <strong>${nama}</strong>
        <p>${pesan}</p>
    `;
    
    sliderTrack.appendChild(div);
    commentCount++;
    
    // Restart animation untuk efek continuous
    sliderTrack.style.animation = 'none';
    sliderTrack.offsetHeight; // Trigger reflow
    sliderTrack.style.animation = 'slideUp 25s linear infinite';
}

function kirimPesan() {
    const name = document.getElementById("name").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !message) {
        alert("Nama dan pesan tidak boleh kosong!");
        return;
    }

    // Tambah ke slider
    tambahCommentKeSlider(name, message);
    
    // Reset form
    document.getElementById("name").value = "";
    document.getElementById("message").value = "";
    
    // Scroll ke wishes section
    document.getElementById("wishes").scrollIntoView({ behavior: 'smooth' });
}

// Auto scroll observer (optional - pause on hover sudah ada di CSS)
const wishesSection = document.getElementById("wishes");
const observerScroll = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // Slider sudah auto run via CSS
            console.log("Slider wishes active!");
        }
    });
}, { threshold: 0.3 });

observerScroll.observe(wishesSection);


function tampilkanComment(nama, pesan, animate = true) {
  const commentList = document.getElementById("commentList");

  const div = document.createElement("div");
  div.classList.add("comment-item", "comment-enter"); // Mulai dengan animasi masuk

  div.innerHTML = `
    <strong>${nama}</strong>
    <p>${pesan}</p>
  `;

  // Tambahkan ke atas (prepend)
  commentList.prepend(div);

  // Trigger animasi masuk
  requestAnimationFrame(() => {
    div.classList.remove("comment-enter");
    div.classList.add("comment-visible");
  });
}

const photos = [
    'img/DSC_0176.webp',
    'img/DSC_0203.webp',
    'img/DSC_0224.webp',
    'img/DSC_0245.webp',
    'img/DSC_0250.webp',
    'img/DSC_0266.webp',

    'img/DSC_0311.webp',
    'img/DSC_0317.webp',
    'img/DSC_0344.webp',
    'img/DSC_0475.webp',
    'img/DSC_0322.webp',
    'img/DSC_0335.webp',
];
const photos1 = [
    'img/HitamPutih1.webp',
    'img/HitamPutih2.webp',
    'img/HitamPutih3.webp',
    'img/HitamPutih4.webp',
    'img/HitamPutih5.webp',
    'img/HitamPutih6.webp',
];

function loadMemories() {
    const trackColor = document.getElementById("memoriesSliderTrack");
    const trackBW = document.getElementById("memoriesSliderTrack");
    
    // Kita looping 2x agar animasinya tidak putus (seamless loop)
    const doubleColor = [...photos, ...photos];
    const doubleBW = [...photos1, ...photos1];
    
    trackColor.innerHTML = doubleColor.map(src => `
        <div class="memory-item">
            <img src="${src}" alt="Wedding Memory">
        </div>
    `).join('');
    trackBW.innerHTML = doubleBW.map(src => `
        <div class="memory-item">
            <img src="${src}" alt="Wedding Memory">
        </div>
    `).join('');
}

// Jalankan fungsi saat halaman diload
document.addEventListener("DOMContentLoaded", loadMemories);

function BukaMaps() {
  window.open("https://maps.app.goo.gl/z41vsRuHToVADhx28?g_st=ic")
}

// --- BAGIAN MUSIK & BUKA UNDANGAN (GABUNGAN) ---
const openBtn = document.getElementById('openBtn');
const song = document.getElementById('mySong');
const musicControl = document.getElementById('music-control');
let isPlaying = false;

if (openBtn && song) {
    openBtn.addEventListener('click', function (e) {
        e.preventDefault();

        // 1. Putar Musik
        song.play().then(() => {
            isPlaying = true;
            console.log("Musik berhasil diputar");
        }).catch(error => {
            console.error("Autoplay diblokir browser, tapi user sudah klik:", error);
        });

        // 2. Buka Scroll
        document.body.classList.remove("lock-scroll");

        // 3. Scroll ke Section Home
        const homeSection = document.getElementById("home");
        if (homeSection) {
            homeSection.scrollIntoView({ behavior: "smooth" });
        }
    });
}

if (musicControl && song) {
  musicControl.addEventListener("click", function () {
    if (song.paused) {
      song.play();
      isPlaying = true;
      song.muted = false; // Memastikan tidak ter-mute
      song.volume = 1.0; // Set volume maksimal
      // Jika ada icon: musicControl.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
      song.pause();
      isPlaying = false;
      // Jika ada icon: musicControl.innerHTML = '<i class="fas fa-play"></i>';
    }
  });
}
