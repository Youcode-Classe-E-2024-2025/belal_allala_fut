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
// -------------------------------------------------------
fetch('./assets/data/players.json') 

  .then(response => {
    if (!response.ok) {
      throw new Error('Erreur de chargement du fichier JSON qui contient data ');
    }
    return response.json();
  })

  .then(data => {
    localStorage.setItem('playersData', JSON.stringify(data.players));
    console.log('les données des joueurs ont été sauvegardées dans le localStorage.');
  })

  .catch(error => {
    console.error('Erreur:', error);
  });

const playersData = JSON.parse(localStorage.getItem("playersData")) ;
const playersTable = document.getElementById("playersTable");

if (playersData.length > 0) {
  playersData.forEach((player) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="border border-gray-700 p-4">
        <img src="${player.photo}" alt="${player.name}" class="w-12 h-auto rounded">
      </td>
      <td class="border border-gray-700 p-4 font-medium">${player.name}</td>
      <td class="border border-gray-700 p-4">${player.position}</td>
      // <td class="border border-gray-700 p-4 flex items-center gap-2">
        <img src="${player.logo}" alt="${player.club}" title="${player.club}" class="w-8 h-auto">
        <span>${player.club}</span>
      </td>
      <td class="border border-gray-700 p-4 text-center font-semibold">${player.rating}</td>
    `;
    playersTable.appendChild(row);
  });
} else {
  playersTable.innerHTML = `
    <tr>
      <td colspan="5" class="text-center text-gray-500 p-4">Aucun joueur trouvé</td>
    </tr>
  `;
}
