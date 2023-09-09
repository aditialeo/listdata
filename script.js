// script.js
class Pendaftar {
    constructor(nama, umur, uangSaku) {
        this.nama = nama;
        this.umur = umur;
        this.uangSaku = uangSaku;
    }
}

class PendaftarList {
    constructor() {
        this.pendaftarList = [];
    }

    tambahPendaftar(pendaftar) {
        this.pendaftarList.push(pendaftar);
    }

    hitungRataRata() {
        const totalUangSaku = this.pendaftarList.reduce((total, pendaftar) => total + pendaftar.uangSaku, 0);
        const totalUmur = this.pendaftarList.reduce((total, pendaftar) => total + pendaftar.umur, 0);
        const rataRataUangSaku = this.pendaftarList.length > 0 ? totalUangSaku / this.pendaftarList.length : 0;
        const rataRataUmur = this.pendaftarList.length > 0 ? totalUmur / this.pendaftarList.length : 0;
        return { rataRataUangSaku, rataRataUmur };
    }
}

const pendaftarList = new PendaftarList();

function openTab(tabName) {
    const tabs = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].style.display = "none";
    }

    document.getElementById(tabName).style.display = "block";
}

function submitForm() {
    const nama = document.getElementById("nama").value;
    const umur = parseInt(document.getElementById("umur").value);
    const uangSaku = parseInt(document.getElementById("uang_saku").value);

    // Validasi input secara asynchronous
    validateInput(nama, umur, uangSaku)
        .then((isValid) => {
            if (isValid) {
                const pendaftar = new Pendaftar(nama, umur, uangSaku);
                pendaftarList.tambahPendaftar(pendaftar);
                displayPendaftarList();
                document.getElementById("registrationForm").reset();
            } else {
                alert("Input tidak valid. Pastikan nama minimal 10 karakter, umur minimal 25 tahun, dan uang saku antara 100 ribu hingga 1 juta.");
            }
        })
        .catch((error) => {
            console.error(error);
            alert("Terjadi kesalahan dalam validasi input.");
        });
}

async function validateInput(nama, umur, uangSaku) {
    return new Promise((resolve, reject) => {
        // Simulasi validasi asynchronous
        setTimeout(() => {
            if (nama.length >= 10 && umur >= 25 && uangSaku >= 100000 && uangSaku <= 1000000) {
                resolve(true);
            } else {
                resolve(false);
            }
        }, 1000); // Simulasi validasi asynchronous selama 1 detik
    });
}

function displayPendaftarList() {
    const pendaftarTable = document.getElementById("pendaftarTable");
    const resume = document.getElementById("resume");

    // Tampilkan tabel pendaftar
    let tableHTML = "<table><tr><th>Nama</th><th>Umur</th><th>Uang Saku</th></tr>";
    for (const pendaftar of pendaftarList.pendaftarList) {
        tableHTML += `<tr><td>${pendaftar.nama}</td><td>${pendaftar.umur}</td><td>${pendaftar.uangSaku}</td></tr>`;
    }
    tableHTML += "</table>";
    pendaftarTable.innerHTML = tableHTML;

    // Tampilkan resume
    const { rataRataUangSaku, rataRataUmur } = pendaftarList.hitungRataRata();
    resume.innerHTML = `Rata-rata pendaftar memiliki uang saku sebesar ${rataRataUangSaku.toFixed(2)} dengan rata-rata umur ${rataRataUmur.toFixed(2)}`;
}

// Default tab is "Registrasi"
openTab("registrasi");
