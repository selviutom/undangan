document.addEventListener("DOMContentLoaded", function(){

    /* ================= OTOMATISASI NAMA TAMU ================= */
    const urlParams = new URLSearchParams(window.location.search);
    const namaTamu = urlParams.get('to') || urlParams.get('nama');
    
    if(namaTamu){
        const elemenNama = document.getElementById('nama-tamu');
        if(elemenNama){
            // Mengganti teks HTML dengan nama dari link
            elemenNama.innerText = namaTamu;
        }
    }

    /* ... (kode Anda yang lain seperti btn-buka, music, dll tetap di bawah sini) ... */

    /* ================= ELEMENT ================= */
    const btn = document.getElementById("btn-buka");
    const cover = document.getElementById("opening-cover");
    const music = document.getElementById("bg-music");
    const toggle = document.getElementById("music-toggle");

    /* ================= OPENING & MUSIC ================= */
    if(btn){
        btn.addEventListener("click", function(){
            // MENAMBAHKAN KELAS 'OPEN' UNTUK ANIMASI HILANG KE ATAS
            cover.classList.add("open");

            // MEMULAI MUSIK DENGAN FADE IN
            if(music){
                music.volume = 0;
                music.play().catch(()=>{});

                let fade = setInterval(function(){
                    if(music.volume < 0.5){ // Volume maksimal 0.5
                        music.volume += 0.02;
                    }else{
                        clearInterval(fade);
                    }
                }, 200); // 0.2 detik per step volume
            }

        });
    }

    /* ================= MUSIC TOGGLE ================= */
    if(toggle && music){
        toggle.addEventListener("click", function(){
            if(music.paused){
                music.play();
                toggle.textContent = "♫";
            }else{
                music.pause();
                toggle.textContent = "✓"; // Tanda pause
            }
        });
    }

    /* ================= COUNTDOWN ================= */
    const weddingDate = new Date("April 5, 2026 12:00:00").getTime();

    const daysSpan = document.getElementById("days");
    const hoursSpan = document.getElementById("hours");
    const minutesSpan = document.getElementById("minutes");
    const secondsSpan = document.getElementById("seconds");
    const timerBox = document.getElementById("countdown-timer");

    if(daysSpan){
        setInterval(function(){

            const now = new Date().getTime();
            const distance = weddingDate - now;

            if(distance < 0){
                timerBox.innerHTML = "<h3>Acara Telah Berlalu atau Sedang Berlangsung 💍</h3>";
                return;
            }

            daysSpan.textContent = Math.floor(distance / (1000 * 60 * 60 * 24));
            hoursSpan.textContent = Math.floor((distance / (1000 * 60 * 60)) % 24);
            minutesSpan.textContent = Math.floor((distance / (1000 * 60)) % 60);
            secondsSpan.textContent = Math.floor((distance / 1000) % 60);

        }, 1000);
    }

    /* ================= COPY REKENING ================= */
    const copyButtons = document.querySelectorAll(".copy-btn");

    copyButtons.forEach(button=>{
        button.addEventListener("click", function(){

            const number = button.parentElement.querySelector(".bank-number").textContent;

            // Navigator clipboard API (modern)
            navigator.clipboard.writeText(number).then(()=>{
                button.textContent = "✓ Disalin";
                setTimeout(()=>{ button.textContent = "Salin Nomor"; }, 2000);
            }).catch(()=>{
                button.textContent = "Gagal!"; // Jika clipboard gagal
            });

        });
    });

    /* ================= UCAPAN FORM (REALTIME FIREBASE SUDAH DI HTML) ================= */
    /* Kode ini dipertahankan hanya jika Anda tidak menggunakan Firebase dan ingin simulasi */
    const formAlternative = document.getElementById("comment-form");
    const listAlternative = document.getElementById("comment-list");

    if(formAlternative && !listAlternative.innerHTML){ // Cek jika bukan Firebase
        formAlternative.addEventListener("submit", function(e){
            e.preventDefault();

            const name = document.getElementById("name").value;
            const message = document.getElementById("message").value;

            const div = document.createElement("div");
            div.style.cssText = "background:rgba(255,255,255,0.7);padding:15px;margin-bottom:15px;border-radius:12px;box-shadow: 0 2px 10px rgba(0,0,0,0.05); color: #4a3e36;";
            div.innerHTML = `<strong>${name}</strong><p style="margin-top:5px; font-size: 14px;">${message}</p>`;

            listAlternative.prepend(div);
            formAlternative.reset();
        });
    }

    /* ================= PARALLAX BACKGROUND EVENT ================= */
    window.addEventListener("scroll", function(){
        const parallax = document.querySelector(".parallax-section");
        if(parallax){
            let offset = window.pageYOffset;
            // Geser posisi background vertikal seiring scroll
            parallax.style.backgroundPositionY = offset * 0.4 + "px"; // 0.4 adalah kecepatannya
        }
    });

});
