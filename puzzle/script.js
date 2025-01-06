const planets = [
    { name: 'Mercury', image: 'https://thumbs.dreamstime.com/b/d/rendering-mercury-planet-deep-space-background-surface-texture-furnished-nasa-139840498.jpg' },
    { name: 'Venus', image: 'https://cdn.mos.cms.futurecdn.net/RifjtkFLBEFgzkZqWEh69P-1200-80.jpg' },
    { name: 'Earth', image: 'https://t4.ftcdn.net/jpg/08/81/58/91/360_F_881589171_4Kq4cK3o1IUOVV610j9d2A78WbM1hQ8T.jpg' },
    { name: 'Mars', image: 'https://miro.medium.com/v2/resize:fit:1200/1*2n6yiV0A8p8Lyk55gId23Q.jpeg' },
    { name: 'Jupiter', image: 'https://scx2.b-cdn.net/gfx/news/hires/2017/evidencethat.jpg' },
    { name: 'Saturn', image: 'https://cf-img-a-in.tosshub.com/sites/visualstory/wp/2024/06/Saturn1.jpeg?size=*:675' },
    { name: 'Uranus', image: 'https://thumbs.dreamstime.com/b/fictional-planet-uranus-outer-space-fictional-planet-uranus-space-ai-generated-335047883.jpg' },
    { name: 'Neptune', image: 'https://static.vecteezy.com/system/resources/thumbnails/038/023/445/small_2x/ai-generated-neptune-planet-in-space-celestial-cosmic-solar-system-astronomy-universe-galactic-planetary-photo.jpg' }
];

let firstTile = null;
let secondTile = null;
let matchedPairs = 0;  // Track matched pairs

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
}

function createGameBoard() {
    const gameContainer = document.getElementById('gameContainer');
    gameContainer.innerHTML = ''; // Clear the game container

    const shuffledPlanets = [...planets, ...planets]; // Duplicate the array for pairs
    shuffle(shuffledPlanets);  // Shuffle the planets array

    shuffledPlanets.forEach(planet => {
        const tile = document.createElement('div');
        tile.className = 'planet-tile';
        tile.style.backgroundImage = `url(${planet.image})`;
        tile.setAttribute('data-name', planet.name);
        tile.addEventListener('click', handleTileClick);
        gameContainer.appendChild(tile);
    });

    // Reset the matchedPairs count for the new game
    matchedPairs = 0;
    resetTiles();  // Reset tile selections
}

function handleTileClick(e) {
    if (!firstTile) {
        firstTile = e.target;
        firstTile.classList.add('selected');
    } else if (!secondTile && e.target !== firstTile) {
        secondTile = e.target;
        checkMatch();
    }
}

function checkMatch() {
    if (firstTile.dataset.name === secondTile.dataset.name) {
        firstTile.classList.add('correct');
        secondTile.classList.add('correct');
        matchedPairs++;  // Increment matched pairs
        checkWin();  // Check if the game is won
        resetTiles();
    } else {
        firstTile.classList.add('incorrect');
        secondTile.classList.add('incorrect');
        setTimeout(() => {
            firstTile.classList.remove('incorrect');
            secondTile.classList.remove('incorrect');
            resetTiles();
        }, 1000);
    }
}

function resetTiles() {
    firstTile = null;
    secondTile = null;
}

function checkWin() {
    if (matchedPairs === planets.length) {
        showWinPopup();
    }
}

function showWinPopup() {
    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.innerHTML = `
        <div class="popup-content">
            <h2>You Win!</h2>
            <p>Congratulations, you've matched all the planets!</p>
            <button id="newGameBtn">Start New Game</button>
        </div>
    `;
    document.body.appendChild(popup);

    const newGameBtn = document.getElementById('newGameBtn');
    newGameBtn.addEventListener('click', () => {
        popup.remove();  
        createGameBoard();  
    });
}

window.onload = createGameBoard;
