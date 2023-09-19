class Pendaftar {
	constructor(nama, umur, uangSangu) {
		this.nama = nama;
		this.umur = umur;
		this.uangSangu = uangSangu;
	}
}

const pendaftarList = [];

const registrationForm = document.getElementById('registrationForm');
const pendaftarTableBody = document.getElementById('pendaftarTableBody');
const resume = document.getElementById('resume');

registrationForm.addEventListener('submit', async (e) => {
	e.preventDefault();

	const nama = document.getElementById('nama').value;
	const umur = parseInt(document.getElementById('umur').value);
	const uangSangu = parseInt(document.getElementById('uang-sangu').value);

	if (nama.length < 10 || umur < 25 || uangSangu < 100000 || uangSangu > 1000000) {
			alert('Data tidak valid! Pastikan nama minimal 10 karakter, umur minimal 25 tahun, dan uang sangu antara 100 ribu hingga 1 juta.');
			return;
	}

	const pendaftar = new Pendaftar(nama, umur, uangSangu);
	pendaftarList.push(pendaftar);

	registrationForm.reset();
	
	await updatePendaftarTable();
	calculateResume();
});

async function updatePendaftarTable() {
	pendaftarTableBody.innerHTML = '';

	pendaftarList.forEach((pendaftar) => {
		const row = document.createElement('tr');
		row.innerHTML = `
				<td>${pendaftar.nama}</td>
				<td>${pendaftar.umur}</td>
				<td>${pendaftar.uangSangu}</td>
		`;
		pendaftarTableBody.appendChild(row);
	});
}

function calculateResume() {
	const totalUangSangu = pendaftarList.reduce((sum, pendaftar) => sum + pendaftar.uangSangu, 0);
	const totalUmur = pendaftarList.reduce((sum, pendaftar) => sum + pendaftar.umur, 0);
	const rataRataUangSangu = totalUangSangu / pendaftarList.length;
	const rataRataUmur = totalUmur / pendaftarList.length;

	resume.innerText = `Rata-rata pendaftar memiliki uang sangu sebesar ${rataRataUangSangu.toFixed(2)} dengan rata-rata umur ${rataRataUmur.toFixed(2)}`;
}