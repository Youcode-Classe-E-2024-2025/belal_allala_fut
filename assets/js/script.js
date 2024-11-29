const currentTeam = JSON.parse(localStorage.getItem('currentTeam'));
const players= JSON.parse(localStorage.getItem('players'));
const goalKeepers = players.filter(p=>p.position === 'GK');
const attackPlayers = players.filter(p=>p.position === 'ST' ||p.position === 'RW' || p.position ==='LW');
const middlePlayers = players.filter(p=>p.position === 'CM' ||p.position === 'CDM');
const backPlayers = players.filter(p=>p.position === 'CB' ||p.position === 'LB' || p.position ==='RB');



const layout = document.querySelector('.formation-layout');
const formationSelection = document.querySelector('.formation-selection');
const formationForm= document.querySelector('.formation-form');
const changeList = formationForm.querySelector('.change-players');

const card = document.createElement('div');
card.classList.add("player-card","basis-[15%]","transition");
card.setAttribute('draggable',true);





formationSelection.addEventListener('input',e=>{
    if(e.target.value === "") return;
    const formation = e.target.value;
    localStorage.setItem('formation',formation);
    makeLayout(formation,layout);  
})



makeLayout(localStorage.getItem('formation'),layout); 
    let currCard = null;
    layout.addEventListener('click',e=>{
    if(!e.target.closest('.player-card')) return;
    currCard = e.target.closest('.player-card');
    layout.querySelectorAll('.player-card').forEach(card=>card.classList.remove('selected-card'));
    currCard.classList.add('selected-card');
    changeList.classList.remove('hidden')
    changeList.innerHTML = "";
    let arr;
    if(currCard.dataset.role === "GK") arr = goalKeepers;
    else if (currCard.dataset.role === "LB" || currCard.dataset.role === 'CB' || currCard.dataset.role === 'RB') arr = backPlayers;
    else if (currCard.dataset.role === "CM" || currCard.dataset.role === 'CDM') arr = middlePlayers;
    else if (currCard.dataset.role === "ST" || currCard.dataset.role === 'LW' || currCard.dataset.role === 'RW') arr = attackPlayers;
    arr.forEach(p=>{
        if(!currentTeam.find(el=>el.name === p.name))
            changeList.insertAdjacentHTML('beforeend',`
        <li class="text-white  mb-2 flex items-stretch"><button class="btn-select-player flex justify-between p-1 px-8 sm:px-4 items-center cursor-pointer hover:bg-slate-800 w-full bg-slate-600 transition-colors flex-row text-2xl sm:text-[8px] lg:text-base xl:text-lg" data-name="${p.name}"><img class="w-20 sm:w-10" src="${p.photo}"/><span>${p.name.split(' ').slice(1)}</span> <span>${p.position}</span></button></li>
        `)
    })
    changeList.insertAdjacentHTML('afterbegin',"<button class='mx-auto w-full text-center btn-close-choice text-white  p-2 bg-slate-600 hover:bg-slate-800 transition-colors text-lg sm:text-sm lg:text-lg mb-2'>Cancel</button>")
    changeList.querySelector('.btn-close-choice').addEventListener('click',e=>{
        e.preventDefault();
        changeList.classList.add('hidden')
        formationForm.querySelector('.change-players').innerHTML = "";
        currCard.classList.remove('selected-card')
    })
})



formationForm.querySelector('.change-players').addEventListener('click',e=>{
    e.preventDefault()
    if(!e.target.closest('.btn-select-player')) return;
    changeList.classList.add('hidden')
    displayPlayer(currCard,players.find(p=> p.name === e.target.closest('.btn-select-player').dataset.name))
    currCard.classList.remove('selected-card')
    formationForm.querySelector('.change-players').innerHTML = "";
})



function makeLayout(formation,layout) {
    const frmArr = formation.split('-').map(el=>+el);
    layout.innerHTML = '';
    const GKRow = document.createElement('div');
    GKRow.classList.add("cards-row","flex","justify-around","basis-[20%]");
    const GKElement = card.cloneNode(true);
    GKElement.dataset.role = 'GK'; 
    GKRow.append(GKElement)
    
    layout.prepend(GKRow);
    frmArr.forEach((num,i)=>{
        const cardsRow = document.createElement('div');
        cardsRow.dataset.num = i;
        cardsRow.classList.add("cards-row","flex","justify-around","basis-[20%]");
        for(let j = 0 ; j<num ; j++){
            const c = card.cloneNode(true);
            if(frmArr.length === 3) { 
                if(i===0)  {
                    if(j===0) c.dataset.role = 'LB';
                    else if(j===frmArr[0]-1) c.dataset.role = 'RB';
                    else c.dataset.role = 'CB';
                }
                if(i===1) c.dataset.role = 'CM';
                if(i===2)  {
                    if(j==0) c.dataset.role = 'LW';
                    else if(j==frmArr[2]-1) c.dataset.role = 'RW';
                    else c.dataset.role = 'ST';
                }
            }
            else if(frmArr.length === 4) {
                if(i===0)  {
                    if(j===0) c.dataset.role = 'LB';
                    else if(j===frmArr[0]-1) c.dataset.role = 'RB';
                    else c.dataset.role = 'CB';
                }
                if(i===1) c.dataset.role = 'CDM';
                if(i===2) c.dataset.role = 'CM';
                if(i===3)  {
                    if(j==0) c.dataset.role = 'LW';
                    else if(j==frmArr[3]-1) c.dataset.role = 'RW';
                    else c.dataset.role = 'ST';
                }
            }
            cardsRow.append(c);
        }
        layout.prepend(cardsRow)
    })
    displayPlayers(currentTeam);
}
function displayPlayers(players) {
    const cards = document.querySelectorAll('.player-card');
    
    cards.forEach((card,i)=>{
        card.dataset.name = players[i].name;
        let features = ``;
        if(players[i].position !== 'GK')
          features = `<div class="player-features-col">
            <span>
            <span class="player-feature-value feature-pace">${players[i].pace}</span>
            <span class="player-feature-title">PAC</span>
            </span>
            <span>
            <span class="player-feature-value feature-shooting">${players[i].shooting}</span>
            <span class="player-feature-title">SHO</span>
            </span>
            <span>
            <span class="player-feature-value feature-passing">${players[i].passing}</span>
            <span class="player-feature-title">PAS</span>
            </span>
            </div>
            <div class="player-features-col">
            <span>
            <span class="player-feature-value feature-dribbling">${players[i].dribbling}</span>
            <span class="player-feature-title">DRI</span>
            </span>
            <span>
            <span class="player-feature-value feature-defending">${players[i].defending}</span>
            <span class="player-feature-title">DEF</span>
            </span>
            <span>
            <span class="player-feature-value feature-physical">${players[i].physical}</span>
            <span class="player-feature-title">PHY</span>
            </span>
            </div>`
            else features = `       
            <div class="player-features-col">
            <span>
            <span class="player-feature-value feature-diving">${players[i].diving}</span>
            <span class="player-feature-title">DIV</span>
            </span>
            <span>
            <span class="player-feature-value feature-handling">${players[i].handling}</span>
            <span class="player-feature-title">HAN</span>
            </span>
            <span>
            <span class="player-feature-value feature-kicking">${players[i].kicking}</span>
            <span class="player-feature-title">KIC</span>
            </span>
            </div>
            <div class="player-features-col">
            <span>
            <span class="player-feature-value feature-reflexes">${players[i].reflexes}</span>
            <span class="player-feature-title">REF</span>
            </span>
            <span>
            <span class="player-feature-value feature-speed">${players[i].speed}</span>
            <span class="player-feature-title">SPE</span>
            </span>
            <span>
            <span class="player-feature-value feature-positioning">${players[i].positioning}</span>
            <span class="player-feature-title">PST</span>
            </span>
            </div>`
        card.insertAdjacentHTML('afterbegin',`
            <div class="fut-player-card">
            <div class="player-card-top">
            <div class="player-master-info">
            
            </div>
            <div class="player-picture">
            <img  src="${players[i].photo}" alt="player" draggable="false">
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
    })
}

function displayPlayer(card,player) {
    const cardName= card.dataset.name;
    
        card.querySelector('.player-picture').querySelector('img').src = player.photo;
        card.querySelector('.player-name').querySelector('span').textContent = player.name.split(' ')[0][0]+" "+player.name.split(' ')[1];
        card.querySelector('.player-position').textContent = player.position;
        card.querySelector('.player-rating').textContent = player.rating;
        if(card.dataset.role === 'GK'){
            card.querySelector('.feature-diving').textContent = player.diving;
            card.querySelector('.feature-handling').textContent = player.handling;
            card.querySelector('.feature-kicking').textContent = player.kicking;
            card.querySelector('.feature-reflexes').textContent = player.reflexes;
            card.querySelector('.feature-speed').textContent = player.speed;
            card.querySelector('.feature-positioning').textContent = player.positioning;

        }else {
            card.querySelector('.feature-pace').textContent = player.pace;
            card.querySelector('.feature-shooting').textContent = player.shooting;
            card.querySelector('.feature-passing').textContent = player.passing;
            card.querySelector('.feature-dribbling').textContent = player.dribbling;
            card.querySelector('.feature-defending').textContent = player.defending;
            card.querySelector('.feature-physical').textContent = player.physical;
        }
        
        
       
        currentTeam[currentTeam.findIndex(el=>el.name===cardName)] = player;
        
        card.dataset.name = player.name
      

        
        localStorage.setItem('currentTeam',JSON.stringify(currentTeam))
}