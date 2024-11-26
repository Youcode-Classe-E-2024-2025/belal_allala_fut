 // Toggle mobile menu
 const menuToggle = document.getElementById('menuToggle');
 const mobileMenu = document.getElementById('mobileMenu');
 menuToggle.addEventListener('click', () => {
     mobileMenu.classList.toggle('hidden');
 });

 // Toggle tablet menu
 const tabletMenuToggle = document.getElementById('tabletMenuToggle');
 const tabletMenu = document.getElementById('tabletMenu');
 tabletMenuToggle.addEventListener('click', () => {
     tabletMenu.classList.toggle('hidden');
 });

 // Fonction pour ajouter un joueur à la liste
const playerForm = document.getElementById('playerForm');
const playersList = document.getElementById('playersList');

playerForm.addEventListener('submit', (event) => {
event.preventDefault();

// const playerName = document.getElementById('playerName').value;
const position = document.getElementById('position').value;
const rating = document.getElementById('rating').value;

if (playerName && position && rating) {
 const playerItem = document.createElement('li');
 playerItem.classList.add('bg-gray-700', 'p-4', 'rounded-md');
 playerItem.innerHTML = `
     <p><strong>Nom :</strong> ${playerName}</p>
     <p><strong>Position :</strong> ${position}</p>
     <p><strong>Note :</strong> ${rating}</p>
 `;

 // Ajouter le joueur à la liste
 playersList.appendChild(playerItem);

 // Réinitialiser le formulaire
 playerForm.reset();
} else {
 alert('Tous les champs sont requis.');
}
});
