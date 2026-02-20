const images = [
    {
        src: "assets/gallery/photo1.jpg",
        date: "撮影日: 2024年11月",
        location: {
            prefecture: "京都部",
            place: "平等院鳳凰堂"
        }
    },
    {
        src: "assets/gallery/photo2.jpg",
        date: "撮影日: 2024年03月",
        location: {
            prefecture: "静岡県",
            place: "富士スピードウェイ"
        }
    },
    {
        src: "assets/gallery/photo3.jpg",
        date: "撮影日: 2024年03月",
        location: {
            prefecture: "長野県",
            place: "茅野市立永明中学校"
        }
    }
];

// const images = [
//     {
//         src: "gallery/photo.jpg",
//         date: "撮影日: 2024年4月",
//         location: {
//             prefecture: "東京都",
//             place: "東京駅"
//         }
//     },
//     // 他の画像も同様に追加
// ];



let currentIndex = 0;
let inactivityTimer = null;
const timeoutDuration = 4000; // n秒（例：5000ms = 5秒）

function updateImage(direction = 'right') {
    const img = document.getElementById("gallery-image");
    const date = document.getElementById("date");
    const location = document.getElementById("location");
    const mapLink = document.getElementById("map-link");

    img.classList.remove("slide-in-left", "slide-in-right");
    void img.offsetWidth;

    const current = images[currentIndex];
    img.src = current.src;
    date.textContent = current.date;
    location.innerHTML =
    `${current.location.prefecture}<br>` +
        `<a id="map-link" href="https://www.google.com/maps/search/${encodeURIComponent(current.location.place)}" ` +
        `target="_blank" style="color: #FF7B41; text-decoration: underline; font-weight: bold; font-size: 1.2em;">` +
        `${current.location.place}</a><br>` +
        `<span style="font-size: 0.75em; color: #888;">クリックでマップを起動</span>`;

    if (direction === 'right') {
        img.classList.add("slide-in-right");
    } else {
        img.classList.add("slide-in-left");
    }
}


function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    updateImage('right');
    resetInactivityTimer();
}

function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImage('left');
    resetInactivityTimer();
}

function autoAdvance() {
    nextImage(); // 自動的に次の画像へ
}

function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(autoAdvance, timeoutDuration);
}

function setupInactivityDetection() {
    document.addEventListener("mousemove", resetInactivityTimer);
    document.addEventListener("keydown", resetInactivityTimer);
    document.addEventListener("click", resetInactivityTimer);
    document.addEventListener("touchstart", resetInactivityTimer);
}

document.addEventListener("DOMContentLoaded", () => {
    updateImage();
    setupInactivityDetection();
    resetInactivityTimer();
});

