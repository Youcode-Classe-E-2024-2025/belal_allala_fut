const players= JSON.parse(localStorage.getItem('players'));
const currentTeam= JSON.parse(localStorage.getItem('currentTeam'));

const playersContainer = document.querySelector('.players-container');
const btnAddPlayer = document.querySelector('.btn-add-player');
const formAddPlayer = document.querySelector('.form-add-player');
const formModifyPlayer = document.querySelector('.form-modify-player');
const formModifyKeeper = document.querySelector('.form-modify-keeper');
const btnCloseForm = document.querySelectorAll('.btn-close-form');
const btnDelete = document.querySelectorAll('.btn-delete-player');
let selectedPlayerElement = null;


displayAll();



btnCloseForm.forEach(btn=>{
    btn.addEventListener('click',e=>{
        e.preventDefault();
        formAddPlayer.classList.add('hidden')
        formAddPlayer.classList.add('md:hidden')
        formModifyPlayer.classList.add('hidden')
        formModifyKeeper.classList.add('hidden')
        playersContainer.querySelectorAll('.fut-player-card').forEach(p=>p.classList.remove('selected-card'))
    })
})

btnAddPlayer.addEventListener('click',e=>{
    formAddPlayer.classList.remove('hidden');
    formAddPlayer.classList.remove('md:hidden');
})

playersContainer.addEventListener('click',e=>{
    if(!e.target.closest('.fut-player-card')) return;
    selectedPlayerElement = e.target.closest('.fut-player-card'); 
    playersContainer.querySelectorAll('.fut-player-card').forEach(p=>p.classList.remove('selected-card'))
    selectedPlayerElement.classList.add('selected-card');
    const selectedPlayer = players.find(p=>p.name === selectedPlayerElement.dataset.name);
    const role = selectedPlayer.position;
    formAddPlayer.classList.add('hidden');
    formAddPlayer.classList.add('md:hidden');
    if(role!=='GK') {
        formModifyPlayer.classList.remove('hidden');
        formModifyKeeper.classList.add('hidden');
        formModifyPlayer.querySelector('img').src = selectedPlayer.photo;
        document.querySelector('#rating').value = selectedPlayer.rating;
        document.querySelector('#pace').value = selectedPlayer.pace;
        document.querySelector('#shooting').value = selectedPlayer.shooting;
        document.querySelector('#passing').value =selectedPlayer.passing;
        document.querySelector('#dribbling').value = selectedPlayer.dribbling;
        document.querySelector('#defending').value = selectedPlayer.defending;
        document.querySelector('#physical').value = selectedPlayer.physical;
    }else {
        formModifyKeeper.classList.remove('hidden');
        formModifyPlayer.classList.add('hidden');
        formModifyKeeper.querySelector('img').src = selectedPlayer.photo;
        formModifyKeeper.querySelector('#rating').value = selectedPlayer.rating;
        formModifyKeeper.querySelector('#diving').value = selectedPlayer.diving;
        formModifyKeeper.querySelector('#handling').value = selectedPlayer.handling;
        formModifyKeeper.querySelector('#kicking').value =selectedPlayer.kicking;
        formModifyKeeper.querySelector('#reflexes').value = selectedPlayer.reflexes;
        formModifyKeeper.querySelector('#speed').value = selectedPlayer.speed;
        formModifyKeeper.querySelector('#positioning').value = selectedPlayer.positioning;
    }
    
})

formAddPlayer.addEventListener('submit', (e) => {
    e.preventDefault(); 
    formAddPlayer.classList.add('hidden');
    formAddPlayer.classList.add('md:hidden');
    let newPlayer = {
        name: document.getElementById('name').value,
        photo: document.getElementById('photo').value,
        position: document.getElementById('position').value,
        nationality: document.getElementById('nationality').value,
        flag: document.getElementById('flag').value,
        club: document.getElementById('club').value,
        logo: document.getElementById('logo').value,
        rating: '-',
    };
    if(newPlayer.position !== 'GK')
        newPlayer = {
    ...newPlayer,  
        pace: '-',   
        shooting: '-',
        passing: '-',  
        dribbling: '-',
        defending: '-', 
        physical: '-'  
    }
    else 
    newPlayer = {
    ...newPlayer, 
        diving: '-',   
        handling: '-',
        kicking: '-',  
        reflexes: '-',
        speed: '-', 
        positioning: '-' 
    }
    players.push(newPlayer);
    localStorage.setItem('players',JSON.stringify(players)) 
    displayAll(); 
});


formModifyPlayer.addEventListener('submit',e=>{
    formModifyPlayer.classList.add('hidden');
    e.preventDefault();
    const selectedPlayer = players.find(p=>p.name === selectedPlayerElement.dataset.name);
    const rating =formModifyPlayer.querySelector('#rating').value;
        const pace =document.getElementById('pace').value;
        const shooting =document.getElementById('shooting').value;
        const passing =document.getElementById('passing').value;
        const dribbling =document.getElementById('dribbling').value;
        const defending =document.getElementById('defending').value;
        const physical =document.getElementById('physical').value;
        selectedPlayer.rating = rating;
        selectedPlayer.shooting = shooting;
        selectedPlayer.pace = pace;
        selectedPlayer.passing = passing;
        selectedPlayer.dribbling = dribbling;
        selectedPlayer.defending = defending;
        selectedPlayer.physical = physical;
    
    localStorage.setItem('players',JSON.stringify(players));
    displayAll();
})
formModifyKeeper.addEventListener('submit',e=>{
    formModifyKeeper.classList.add('hidden');
    e.preventDefault();
    const selectedPlayer = players.find(p=>p.name === selectedPlayerElement.dataset.name);
    const rating =formModifyKeeper.querySelector('#rating').value;
    const kicking =document.getElementById('kicking').value;
    const handling =document.getElementById('handling').value;
    const diving =document.getElementById('diving').value;
    const reflexes =document.getElementById('reflexes').value;
    const speed =document.getElementById('speed').value;
    const positioning =document.getElementById('positioning').value;
    selectedPlayer.rating = rating;
    selectedPlayer.kicking = kicking;
    selectedPlayer.handling = handling;
    selectedPlayer.diving = diving;
    selectedPlayer.reflexes = reflexes;
    selectedPlayer.speed = speed;
    selectedPlayer.positioning = positioning;

localStorage.setItem('players',JSON.stringify(players));
displayAll();
})


btnDelete.forEach(el=>el.addEventListener('click',e=>{
  e.preventDefault();
  const selectedIndex = players.findIndex(p=>p.name === selectedPlayerElement.dataset.name);
  
  players.splice(selectedIndex,1);
  localStorage.setItem('players',JSON.stringify(players));
  formModifyPlayer.classList.add('hidden');
  formModifyKeeper.classList.add('hidden');
  displayAll();
}))


function displayAll(){
    playersContainer.innerHTML = ""
    players.forEach((p,i)=>{
    if(!currentTeam.find(pt=>pt.name === p.name))
      {if(players[i].position !== 'GK')
      features = `<div class="player-features-col">
            <span>
            <span class="player-feature-value">${players[i].pace}</span>
            <span class="player-feature-title">PAC</span>
            </span>
            <span>
            <span class="player-feature-value">${players[i].shooting}</span>
            <span class="player-feature-title">SHO</span>
            </span>
            <span>
            <span class="player-feature-value">${players[i].passing}</span>
            <span class="player-feature-title">PAS</span>
            </span>
            </div>
            <div class="player-features-col">
            <span>
            <span class="player-feature-value">${players[i].dribbling}</span>
            <span class="player-feature-title">DRI</span>
            </span>
            <span>
            <span class="player-feature-value">${players[i].defending}</span>
            <span class="player-feature-title">DEF</span>
            </span>
            <span>
            <span class="player-feature-value">${players[i].physical}</span>
            <span class="player-feature-title">PHY</span>
            </span>
            </div>`
            else features = `       
            <div class="player-features-col">
            <span>
            <span class="player-feature-value">${players[i].diving}</span>
            <span class="player-feature-title">DIV</span>
            </span>
            <span>
            <span class="player-feature-value">${players[i].handling}</span>
            <span class="player-feature-title">HAN</span>
            </span>
            <span>
            <span class="player-feature-value">${players[i].kicking}</span>
            <span class="player-feature-title">KIC</span>
            </span>
            </div>
            <div class="player-features-col">
            <span>
            <span class="player-feature-value">${players[i].reflexes}</span>
            <span class="player-feature-title">REF</span>
            </span>
            <span>
            <span class="player-feature-value">${players[i].speed}</span>
            <span class="player-feature-title">SPE</span>
            </span>
            <span>
            <span class="player-feature-value">${players[i].positioning}</span>
            <span class="player-feature-title">PST</span>
            </span>
            </div>`
        playersContainer.insertAdjacentHTML('beforeend',`
            <div class="fut-player-card" draggable="true" data-name = "${players[i].name}">
            <div class="player-card-top">
            <div class="player-master-info">
            
            </div>
            <div class="player-picture">
            <img  src="${players[i].photo}" alt="Messi" draggable="false">
            <div class="player-extra">
            </div>
            </div>
            </div>
            <!-- Player Card Bottom -->
            <div class="player-card-bottom">
            <div class="player-info">
            <!-- Player Name -->
            <div class="player-name">
            <span>${players[i].name.split(' ')[0][0]+" "+players[i].name.split(' ')[1]}</span>
            </div>
            <!-- Player Features -->
            <span class="flex w-full justify-around text-[8px]">
            <span class="player-position text-center">${players[i].position}</span>
            <span class="player-rating text-center">${players[i].rating}</span> 
            </span>
            <div class="player-features ">
            ${features}
            </div>
            </div>
        </div>
        </div>
            `)
            
        }
        
      })
    }