
document.addEventListener("click", function (e) {
    const circle = document.createElement("div");
    circle.classList.add("click-effect");
    circle.style.left = `${e.pageX}px`;
    circle.style.top = `${e.pageY}px`;

    document.body.appendChild(circle);

    circle.addEventListener("animationend", () => {
        circle.remove();
    });
});

const overlay = document.querySelector('.overlay');
const cover = document.querySelector('.cover');
const reset = document.querySelector('.reset');
const title = document.querySelector('.title');
const container = document.getElementById('container');
const titleC = document.querySelector('.titleC');
const messageC = document.querySelector('.messageC');
const stiker = document.querySelector('.stiker');
const mainStiker = document.querySelector('#main-stiker');
const envwrap = document.getElementById('envwrap');

envwrap.style = "transform:scale(0);opacity:0;transition:all .6s ease";
var audio = document.getElementById('linkmp3');

const envelope = document.getElementById('envelope');
const btnOpen = document.getElementById('open');
const buttonContainer = document.querySelector('.continue-button-container');
reset.style = "transform:scale(0);opacity:0;transition:all .6s ease";

envelope.addEventListener('click', open);
btnOpen.addEventListener('click', open);

function open() {
    envelope.classList.remove("close");
    envelope.classList.add("open");
    reset.style = "transform:scale(0);opacity:0;transition:all .6s ease";

    setTimeout(function () {
        envwrap.classList.add('opahidden');
        document.getElementById('wallpaper').style = "transform: scale(1.5)";
        setTimeout(function () {
            container.classList.remove('hidden');
            container.classList.add('opamuncul');
            stiker.classList.add('opamuncul');
            document.getElementById('wallpaper').style = "transform: scale(1)";
            envwrap.classList.add('hidden');
            katanimasi();
        }, 800);
    }, 1500);
}

document.querySelector(".awalan").onclick = async function () {
    audio.play();

    overlay.style = "opacity:0;transition:all .6s ease";
    cover.style = "transform:scale(0);opacity:0;transition:all .6s ease";
    setTimeout(function () {
        overlay.style.display = "none";
        envwrap.style = "transition:all .6s ease";
        reset.style = "transition:all .6s ease";
        document.getElementById('wallpaper').style = "transform: scale(1)";
    }, 300);
}

var vjudul = document.querySelector('.titleC').innerHTML;
titleC.innerHTML = "";

function katanimasi() {
    new TypeIt(".titleC", {
        strings: [vjudul],
        startDelay: 250,
        speed: 27,
        cursor: true,
        afterComplete: function () {
            titleC.innerHTML = vjudul;
            setTimeout(() => { katanimasiAlts() }, 300);
        },
    }).go();
}

function katanimasiAlts() {
    var typeItInstance = new TypeIt(".messageC", {
        strings: [
            "─",
            "<br>" + document.getElementById('pesanSurat1').innerHTML,
            "<br>" + document.getElementById('pesanSurat2').innerHTML,
            "<br>" + document.getElementById('pesanSurat3').innerHTML,
        ],
        startDelay: 1,
        speed: 28,
        cursor: true,
        breakLines: true,
        waitUntilVisible: true,
        afterStep: function (instance) {
            if (instance.is('completed')) {
                setTimeout(function () {
                    instance.next();
                }, 700);
            }
        },
        afterComplete: function () {
            console.log('TypeIt animation complete, showing button');
            showContinueButton();
            
            setTimeout(() => {
                stikerHidden();
                setTimeout(() => {
                    mainStiker.src = document.getElementById('stikerAlt1').src;
                }, 300);
            }, 100);
        },
    }).go();
    
    // Safety fallback: Show button after reasonable timeout even if TypeIt doesn't trigger
    setTimeout(function() {
        if (buttonContainer && buttonContainer.classList.contains('hidden')) {
            console.warn('Safety timeout: TypeIt callback may not have fired, forcing button show');
            showContinueButton();
        }
    }, 8000);
}

// Separate function for showing button - can be called from multiple places
function showContinueButton() {
    // Hide cursor if it exists
    var cursor = document.querySelector(".ti-cursor");
    if (cursor) {
        cursor.style.display = "none";
    }
    
    // Show continue button using cached global reference
    if (buttonContainer) {
        buttonContainer.classList.remove('hidden');
        buttonContainer.style.display = 'block';
        buttonContainer.style.visibility = 'visible';
        buttonContainer.style.opacity = '1';
        console.log('✓ Continue button shown successfully');
    } else {
        console.error('✗ Button container reference is null, trying querySelector');
        var fallback = document.querySelector('.continue-button-container');
        if (fallback) {
            fallback.classList.remove('hidden');
            fallback.style.display = 'block';
            fallback.style.visibility = 'visible';
            fallback.style.opacity = '1';
            console.log('✓ Fallback method: Continue button shown');
        } else {
            console.error('✗ CRITICAL: Button container element not found in DOM!');
        }
    }
}

function stikerHidden() {
    stiker.style = "transform:scale(0);opacity:0;";
    setTimeout(function () { stiker.style = "transform:scale(1.1);opacity:1;"; }, 300);
}

/* New Logic for Content (Kalokita clone) */

function startTanya() {
    document.getElementById('container').classList.add('hidden');
    document.querySelector('.continue-button-container').classList.add('hidden');
    stiker.style = "transform:scale(0);opacity:0;transition:all .6s ease";

    // Ganti musik ke Kalokita Section
    var audioLama = document.getElementById('linkmp3');
    var audioBaru = document.getElementById('linkmp3kalokita');

    // Check if audio elements exist
    if (!audioLama || !audioBaru) {
        console.warn('Audio elements not found');
        setTimeout(function () {
            stiker.style.display = "none";
            document.getElementById('container').style.display = "none";
            var Content = document.getElementById('Content');
            Content.style.display = "block";
            setTimeout(() => {
                mulainama();
            }, 100);
        }, 600);
        return;
    }

    // Fade out musik lama
    var fadeOut = setInterval(function () {
        if (audioLama.volume > 0.1) {
            audioLama.volume -= 0.1;
        } else {
            clearInterval(fadeOut);
            audioLama.pause();
            audioLama.volume = 1; // Reset volume untuk nanti

            // Play musik baru dengan error handling
            audioBaru.volume = 0;
            var playPromise = audioBaru.play();
            
            if (playPromise !== undefined) {
                playPromise.then(function() {
                    // Audio dimulai berhasil
                    var fadeIn = setInterval(function () {
                        if (audioBaru.volume < 0.9) {
                            audioBaru.volume += 0.1;
                        } else {
                            audioBaru.volume = 1;
                            clearInterval(fadeIn);
                        }
                    }, 100);
                }).catch(function(error) {
                    console.warn('Autoplay blocked:', error);
                    // Jika autoplay blocked, tidak ada yang bisa dilakukan
                    // User harus interact dengan page dulu
                });
            }
        }
    }, 100);

    setTimeout(function () {
        stiker.style.display = "none";
        document.getElementById('container').style.display = "none";

        var Content = document.getElementById('Content');
        Content.style.display = "block";
        setTimeout(() => {
            mulainama();
        }, 100);
    }, 600);
}

var jumlahKlik = 0; var ftganti = 0; var fungsi = 0; var ftfungsi = 0; var fungsiAwal = 0; var fungsitimer = 0;
var pesanwhatsapp = document.getElementById('pesanWA').innerHTML;
var deffotostiker = document.getElementById('fotostiker').src;
var Content = document.getElementById('Content');
var wallpaper = document.getElementById('wallpaper');
var bodyblur = document.getElementById('bodyblur');

async function mulainama() {
    Content.style = "opacity:1;margin-top:7vh";
    bodyblur.style = "opacity:.7";
    wallpaper.style = "transform: scale(1);";

    var fotostiker = document.getElementById('fotostiker');
    fotostiker.style = "display:inline-flex;";
    setTimeout(ftmuncul, 200);
    setTimeout(bqmuncul, 500);
}

function ftmuncul() {
    var fotostiker = document.getElementById('fotostiker');
    if (ftganti == 0) { fotostiker.src = deffotostiker; }
    if (ftganti == 1) { fotostiker.src = document.getElementById('fotostiker2').src; }
    if (ftganti == 2) { fotostiker.src = document.getElementById('fotostiker3').src; }
    if (ftganti == 3) { fotostiker.src = document.getElementById('fotostiker4').src; }
    if (ftganti == 4) { fotostiker.src = document.getElementById('fotostiker5').src; }
    if (ftganti == 5) { fotostiker.src = document.getElementById('fotostiker6').src; }
    if (ftganti == 6) { fotostiker.src = document.getElementById('fotostiker7').src; }
    if (ftganti == 7) { fotostiker.src = document.getElementById('fotostiker8').src; }

    fotostiker.style = "display:inline-flex;opacity:1;transition:all .7s ease;transform:scale(1);";
}

function fthilang() {
    document.getElementById('fotostiker').style = "display:inline-flex;opacity:1;transition:all .7s ease;transform:scale(.1)";
}

function jjfoto() {
    document.getElementById('fotostiker').style.animation = "rto .8s infinite alternate";
    setInterval(createHeart, 200);
}

var bq = document.getElementById('bq');
var kalimat = document.getElementById('kalimat');
var opsL = document.getElementById('opsL');
var Tombol = document.getElementById('Tombol');
var By = document.getElementById('By');
var Bn = document.getElementById('Bn');

function bqmuncul() {
    bq.style = "position:relative;opacity:1;visibility:visible;transform: scale(1);margin-top:15px";
    setTimeout(mulaiketik1, 200);
    fungsi = 1;
}

function bqhilang() {
    wallpaper.style = "transform: scale(2);";
    bodyblur.style = "opacity:.3";
    bq.style = "position:relative;margin-top:15px;transition:all .7s ease;";
    kalimat.style = "opacity:0;transform:scale(.3);";
}

function bqmuncul2() {
    bq.style = "position:relative;opacity:1;visibility:visible;transform: scale(1);margin-top:0;border:0;background:none;box-shadow:none;padding:10px 27px;text-align:left";
    kalimat.style = "opacity:1;transform:scale(1);font-size:13px;font-weight:300";
    // setTimeout(ketAkhir, 500); 
}

function otokal() { kalimat.style = "opacity:0;transform:scale(.3);"; setTimeout(anikal, 300); }
function anikal() {
    if (opsLcheck !== jumlahP) { setTimeout(otopsL, 700); kalimat.style = "opacity:1;transform:scale(1);"; }
    else { setInterval(createHeart, 400); kalimat.style = "opacity:1;transform:scale(1.2);"; }
}
function otopsL() { if (opsLcheck != 2) { opsL.style.opacity = ".8"; opsLclick = 1; } }
function wpcheck() { if (opsLcheck % 2 == 0) { wallpaper.style = "transform: scale(1.5);"; } else { wallpaper.style = "transform: scale(1);"; } }
function prbhn() { if (opsLcheck == jumlahP - 1) { kecepatan = 55; } }

function tombol() { wallpaper.style = "transform: scale(1);"; Tombol.style = "opacity:1;transform: scale(1);"; fungsi = 1 }

async function menuju() {
    window.location = "https://api.whatsapp.com/send?phone=6282146042115&text=" + encodeURIComponent(pesanwhatsapp);
    muncultombol3();
}

var kecepatan = 45;
var vketik1 = kalimat.innerHTML;
kalimat.innerHTML = "";

function mulaiketik1() {
    kalimat.innerHTML = "";
    new TypeIt("#kalimat", {
        strings: [vketik1], startDelay: 50, speed: kecepatan, waitUntilVisible: true,
        afterComplete: function () {
            kalimat.innerHTML = vketik1;
            // Tampilkan tombol dengan animasi
            setTimeout(function () {
                muncultombol();
            }, 500);
        },
    }).go();
}

var kalpertanyaan = document.getElementById('kalpertanyaan');
var vketik2 = kalpertanyaan.innerHTML;
kalpertanyaan.innerHTML = "";
kalpertanyaan.style = "display:none";

function mulaiketik2() {
    kalimat.innerHTML = "";
    new TypeIt("#kalimat", {
        strings: [vketik1],
        startDelay: 50,
        speed: kecepatan,
        waitUntilVisible: true,
    })
        .pause(500)
        .delete(100, { speed: 50 })
        .pause(300)
        .exec(gantifoto)
        .type("" + vketik2, { speed: 30 })
        .go()
        .pause(50)
        .exec(setelahselesai);
}

function gantifoto() { ftganti += 1; fthilang(); setTimeout(ftmuncul, 300); }

function setelahselesai() {
    kalimat.innerHTML = vketik2;
    if (opsLcheck !== jumlahP) {
        setTimeout(muncultombol2, 500);
    } else {
        ftganti += 1;
        fthilang();
        setTimeout(ftmuncul, 300);
        setInterval(createHeart, 200);
    }
}

const jumlahP = document.querySelectorAll("#bq p").length - 1;
var kalimatElements = document.querySelectorAll('[id^="kalimat"]');
var kalimatList = {};

kalimatElements.forEach(function (element, index) {
    if (element.id !== "kalimat") {
        kalimatList[index] = element.innerHTML;
    }
});

var opsLclick = 0; var opsLcheck = 1; ftganti = 0;
document.getElementById("bq").addEventListener("click", myCheck);

function myCheck() {
    if (opsLclick == 1) {
        if (opsLcheck !== jumlahP) {
            if (document.getElementById("kalimat" + opsLcheck + "ngetik")) {
                vketik1 = kalimatList[opsLcheck];
                prbhn(); mulaiketik1();
            } else if (document.getElementById("kalimat" + opsLcheck + "ngetikv2")) {
                vketik1 = kalimatList[opsLcheck];
                prbhn(); mulaiketik2();
            } else {
                teksganti = kalimatList[opsLcheck];
                otokal();
                kalimat.innerHTML = teksganti;
            }

            ftganti += 1; fthilang(); setTimeout(ftmuncul, 300);
            opsLcheck += 1; wpcheck();
            if (opsLcheck == 2) { setTimeout(muncultombol, 500); }
        }
        opsL.style.opacity = "0"; opsLclick = 0;
    }
}

function fungsimau() {
    Tombol.style = "";
    if (fungtom == 1) {
        // Langsung loncat ke kalimat3ngetik
        setTimeout(function () {
            langsung_ke_kalimat3();
        }, 400);
    } else if (fungtom == 3) {
        menuju();
    }
}

function langsung_ke_kalimat3() {
    // Ganti foto stiker
    ftganti += 1;
    fthilang();
    setTimeout(ftmuncul, 300);

    // Set konten ke kalimat3ngetik
    var kalimat3content = document.getElementById('kalimat3ngetik').innerHTML;
    kalimat.innerHTML = "";

    // Animasi ketik kalimat3
    new TypeIt("#kalimat", {
        strings: [kalimat3content],
        startDelay: 50,
        speed: 45,
        waitUntilVisible: true,
        afterComplete: function () {
            kalimat.innerHTML = kalimat3content;
            ftganti += 1;
            fthilang();
            setTimeout(ftmuncul, 300);
            setInterval(createHeart, 200);

            // Tampilkan opsL untuk klik ke WhatsApp
            setTimeout(function () {
                opsL.innerHTML = "Klik untuk Balas 💌";
                opsL.style.opacity = "1";
                opsL.style.cursor = "pointer";

                // Tambah event listener untuk langsung ke WA
                opsL.onclick = function () {
                    menuju();
                };
            }, 500);
        },
    }).go();

    // Update wallpaper effect
    wpcheck();
}

function muncultombol() { resetPosisi(); fungtom = 1; Tombol.style = "opacity:1;transform:scale(1)"; }
function muncultombol2() { resetPosisi(); fungtom = 2; By.innerHTML = document.getElementById('penggantiBy').innerHTML; Bn.innerHTML = document.getElementById('penggantiBn').innerHTML; Tombol.style = "opacity:1;transform:scale(1)"; }
function muncultombol3() { fungtom = 3; By.innerHTML = "💌 Balas"; Bn.style = "display:none"; Tombol.style = "opacity:1;transform:scale(1)"; }

function fungsibaru(btn) {
    var tombol = document.getElementById("" + btn);
    var tombolParent = tombol.parentNode;
    var tombolPosisiX = Math.floor(Math.random() * 50) + 1;
    var tombolPosisiY = Math.floor(Math.random() * 75) + 1;
    var rotasiAcak = Math.floor(Math.random() * 360);

    tombol.style.position = "relative";
    tombol.style.left = tombolPosisiX + "px";
    tombol.style.top = tombolPosisiY + "px";
    tombol.style.transform = "rotate(" + rotasiAcak + "deg)";
    tombolParent.appendChild(tombol);

    jumlahKlik++;
    if (jumlahKlik == 3) {
        if (fungtom == 1) { fungsigamau(); }
        jumlahKlik = 0;
    }
}

async function fungsigamau() {
    await Swal.fire({ title: '' + document.getElementById('kataditolak').innerHTML, timer: 3500, imageUrl: '' + document.getElementById('stikerditolak').src, });
}

var posisiAwalX = 0; var posisiAwalY = 0; var rotasiAwal = 0;
function resetPosisi() {
    var tombol = document.getElementById("Bn");
    tombol.style.position = "relative";
    tombol.style.left = posisiAwalX + "px";
    tombol.style.top = posisiAwalY + "px";
    tombol.style.transform = "rotate(" + rotasiAwal + "deg)";
}

function createHeart() {
    const heart = document.createElement("div");
    heart.className = "fas fa-heart";
    heart.style.left = (Math.random() * 90) + "vw";
    heart.style.animationDuration = (Math.random() * 3) + 2 + "s";
    document.body.appendChild(heart);
}
setInterval(function () {
    var heartArr = document.querySelectorAll(".fa-heart");
    if (heartArr.length > 100) { heartArr[0].remove() }
}, 100);

const swalst = Swal.mixin({ timer: 2777, allowOutsideClick: false, showConfirmButton: false, timerProgressBar: true, imageHeight: 90, });
const swals = Swal.mixin({ allowOutsideClick: false, cancelButtonColor: '#FF0040', imageWidth: 100, imageHeight: 100, });
