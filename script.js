document.addEventListener("click", function () {
    let audio = document.getElementById("audio");
    if (audio.paused) {
        audio.play();
    }
}, { once: true });

let moon = document.getElementById("moon");
let perc = document.getElementById("perc");
let audio = document.getElementById("audio");

let isDragging = false;
let startX;
let currentX = 0; // Posisi awal bulan

const minX = -50; // Batas kiri
const maxX = 50;  // Batas kanan

function updateMoonPosition(x) {
    currentX = Math.max(minX, Math.min(maxX, x));
    moon.style.transform = `translate(${currentX}%, -50%)`;

    // Update persen gerhana
    let percentage = Math.round(((currentX - minX) / (maxX - minX)) * 100);
    perc.innerText = `${percentage}%`;

    // Atur volume berdasarkan posisi bulan
    let volume = percentage / 100; // 0.0 (min) sampai 1.0 (max)
    audio.volume = volume;
}

// Mouse event
moon.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX - currentX;
});

document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    let newX = e.clientX - startX;
    updateMoonPosition(newX);
});

document.addEventListener("mouseup", () => {
    isDragging = false;
});

// Touch event (HP)
moon.addEventListener("touchstart", (e) => {
    isDragging = true;
    startX = e.touches[0].clientX - currentX;
});

document.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    let newX = e.touches[0].clientX - startX;
    updateMoonPosition(newX);
});

document.addEventListener("touchend", () => {
    isDragging = false;
});

// Fungsi untuk membuat bintang secara acak
function createStars(count) {
    let starsContainer = document.createElement("div");
    starsContainer.classList.add("stars");
    document.body.appendChild(starsContainer);

    for (let i = 0; i < count; i++) {
        let star = document.createElement("div");
        star.classList.add("star");

        // Posisi acak di layar
        let x = Math.random() * 100;  // 0% - 100% lebar layar
        let y = Math.random() * 20;  // 0% - 100% tinggi layar
        let delay = Math.random() * 100; // Variasi kedipan

        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.animationDelay = `${delay}s`;

        starsContainer.appendChild(star);
    }
}

// Buat 50 bintang berkedip
createStars(40);


// Fungsi untuk membuat pohon secara acak
function createTrees(count) {
    let ground = document.querySelector(".ground");

    for (let i = 0; i < count; i++) {
        let tree = document.createElement("div");
        tree.classList.add("tree");

        // Batang pohon
        let trunk = document.createElement("div");
        trunk.classList.add("trunk");

        // Daun pohon
        let leaves = document.createElement("div");
        leaves.classList.add("leaves");

        tree.appendChild(trunk);
        tree.appendChild(leaves);

        // Posisi acak, kecuali di tengah (supaya rumah tidak ketutup)
        let x;
        do {
            x = Math.random() * 100; // 0% - 100% dari lebar layar
        } while (x > 45 && x < 55); // Hindari bagian tengah rumah

        tree.style.left = `${x}%`;

        ground.appendChild(tree);
    }
}

// Tambahkan 10 pohon
createTrees(5);