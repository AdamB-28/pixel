// Player data with position-specific descriptions
const players = {
    player1: {
        name: "Igor",
        position: "Bramkarz",
        number: 1,
        description: "Świetnie broni, dokłanie podaje."
    },
    // Defenders
    player2: {
        name: "Ublo",
        position: "LŚO (Left Back)",
        number: 3,
        description: `<strong>Priorytety w obronie:</strong>
<ol>
    <li>Utrzymanie zwartej linii defensywnej i asekuracja przestrzeni przed bramką.</li>
    <li>Skuteczne odbiory piłki i natychmiastowe przekazanie jej do pomocników.</li>
    <li>Unikanie ryzyka podczas podań; preferowanie bezpiecznych rozwiązań.</li>
</ol>
<strong>Priorytety w ataku:</strong>
<ol>
    <li>Wspieranie skrzydłowych poprzez podłączanie się do akcji ofensywnych, tworząc przewagę liczebną na flankach.</li>
    <li>Uczestnictwo w stałych fragmentach gry jako dodatkowe zagrożenie.</li>
</ol>`
    },
    player3: {
        name: "Jacek, Varela",
        position: "ŚO (Center Back)",
        number: 5,
        description: `<strong>Priorytety w obronie:</strong>
<ol>
    <li>Utrzymanie zwartej linii defensywnej i asekuracja przestrzeni przed bramką.</li>
    <li>Skuteczne odbiory piłki i natychmiastowe przekazanie jej do pomocników.</li>
    <li>Unikanie ryzyka podczas podań; preferowanie bezpiecznych rozwiązań.</li>
</ol>
<strong>Priorytety w ataku:</strong>
<ol>
    <li>Pełni rolę rozgrywającego od tyłu, inicjując akcje ofensywne poprzez dokładne podania do pomocników.</li>
    <li>Uczestnictwo w stałych fragmentach gry jako dodatkowe zagrożenie w polu karnym przeciwnika.</li>
</ol>`
    },
    player4: {
        name: "Wojti, Aero",
        position: "PŚO (Right Back)",
        number: 2,
        description: `<strong>Priorytety w obronie:</strong>
<ol>
    <li>Utrzymanie zwartej linii defensywnej i asekuracja przestrzeni przed bramką.</li>
    <li>Skuteczne odbiory piłki i natychmiastowe przekazanie jej do pomocników.</li>
    <li>Unikanie ryzyka podczas podań; preferowanie bezpiecznych rozwiązań.</li>
</ol>
<strong>Priorytety w ataku:</strong>
<ol>
    <li>Wspieranie skrzydłowych poprzez podłączanie się do akcji ofensywnych, tworząc przewagę na prawej flance.</li>
    <li>Uczestnictwo w stałych fragmentach gry jako dodatkowe zagrożenie.</li>
</ol>`
    },
    // Midfielders
    player5: {
        name: "Ublo, Wojt",
        position: "LM (Left Midfielder)",
        number: 8,
        description: `<strong>Priorytety w obronie:</strong>
<ol>
    <li>Wspieranie obrony na flankach, śledząc ruchy przeciwnika.</li>
    <li>Szybkie przejście z fazy ataku do obrony, aby zapobiec kontratakom rywala.</li>
</ol>
<strong>Priorytety w ataku:</strong>
<ol>
    <li>Utrzymanie szerokości gry, dostarczanie piłek w pole karne poprzez dośrodkowania.</li>
    <li>Schodzenie do środka w celu oddania strzału.</li>
    <li>Tworzenie przewagi liczebnej w ataku.</li>
</ol>`
    },
    player6: {
        name: "Reyes, Adam, Eagle",
        position: "LCM (Left Center Midfielder)",
        number: 6,
        description: `<strong>Priorytety w obronie:</strong>
<ol>
    <li>Zabezpieczenie środkowej strefy boiska, utrudniając przeciwnikowi konstruowanie akcji.</li>
    <li>Szybkie przejście z fazy ataku do obrony, aby zapobiec kontratakom rywala.</li>
</ol>
<strong>Priorytety w ataku:</strong>
<ol>
    <li>Wspieranie napastników poprzez podania prostopadłe.</li>
    <li>Strzały z dystansu.</li>
    <li>Tworzenie przewagi liczebnej poprzez dynamiczne włączanie się do akcji ofensywnych.</li>
</ol>`
    },
    player7: {
        name: "Reyes, Adam, Eagle",
        position: "RCM (Right Center Midfielder)",
        number: 10,
        description: `<strong>Priorytety w obronie:</strong>
<ol>
    <li>Zabezpieczenie środkowej strefy boiska, utrudniając przeciwnikowi konstruowanie akcji.</li>
    <li>Szybkie przejście z fazy ataku do obrony, zapobieganie kontratakom.</li>
</ol>
<strong>Priorytety w ataku:</strong>
<ol>
    <li>Wspieranie napastników poprzez podania prostopadłe.</li>
    <li>Strzały z dystansu.</li>
    <li>Tworzenie przewagi liczebnej poprzez dynamiczne włączanie się do akcji ofensywnych.</li>
</ol>`
    },
    player8: {
        name: "Kinderek, Tito",
        position: "RM (Right Midfielder)",
        number: 7,
        description: `<strong>Priorytety w obronie:</strong>
<ol>
    <li>Wspieranie obrony na prawej flance, śledząc ruchy przeciwnika.</li>
    <li>Szybkie przejście z fazy ataku do obrony, aby zapobiec kontratakom rywala.</li>
</ol>
<strong>Priorytety w ataku:</strong>
<ol>
    <li>Utrzymanie szerokości gry, dostarczanie dośrodkowań.</li>
    <li>Schodzenie do środka w celu oddania strzału.</li>
    <li>Tworzenie przewagi liczebnej w ataku.</li>
</ol>`
    },
    // Forwards
    player9: {
        name: "Kinderek, Lingard, Tito, Kuczer",
        position: "LW (Left Wing)",
        number: 11,
        description: `<strong>Priorytety w obronie:</strong>
<ol>
    <li>Wywieranie presji na obrońcach przeciwnika, zmuszając ich do popełniania błędów.</li>
    <li>Zamykanie linii podań, utrudniając przeciwnikowi płynne przejście z obrony do ataku.</li>
    <li>Szybki powrót do formacji w przypadku utraty piłki.</li>
</ol>
<strong>Priorytety w ataku:</strong>
<ol>
    <li>Wykorzystanie szybkości do atakowania przestrzeni za linią obrony.</li>
    <li>Zarówno gra na skrzydle, jak i schodzenie do środka.</li>
    <li>Współpraca z pomocnikami w celu tworzenia kombinacyjnych akcji.</li>
</ol>`
    },
    player10: {
        name: "Dasiek, Kuczer, Lingard",
        position: "ST (Striker)",
        number: 9,
        description: `<strong>Priorytety w obronie:</strong>
<ol>
    <li>Wywieranie presji na obrońcach przeciwnika, zmuszając ich do popełniania błędów.</li>
    <li>Zamykanie linii podań, utrudniając przeciwnikowi płynne przejście z obrony do ataku.</li>
    <li>Szybki powrót do formacji w przypadku utraty piłki.</li>
</ol>
<strong>Priorytety w ataku:</strong>
<ol>
    <li>Koncentracja na utrzymywaniu pozycji w centrum ataku.</li>
    <li>Gotowość do wykończenia akcji strzałem na bramkę.</li>
    <li>Współpraca z pomocnikami w celu tworzenia kombinacyjnych akcji.</li>
</ol>`
    },
    player11: {
        name: "Kolesiek, Kuczer, Lingard",
        position: "RW (Right Wing)",
        number: 14,
        description: `<strong>Priorytety w obronie:</strong>
<ol>
    <li>Wywieranie presji na obrońcach, utrudnianie płynnego przejścia do ataku.</li>
    <li>Zamykanie linii podań, utrudniając przeciwnikowi płynne przejście z obrony do ataku.</li>
    <li>Szybki powrót do formacji w przypadku utraty piłki.</li>
</ol>
<strong>Priorytety w ataku:</strong>
<ol>
    <li>Wykorzystanie szybkości do atakowania przestrzeni za linią obrony.</li>
    <li>Zarówno gra na skrzydle, jak i schodzenie do środka.</li>
    <li>Współpraca z pomocnikami w celu tworzenia kombinacyjnych akcji.</li>
</ol>`
    }
};

// Formation positions
const formations = {
    defense: {
        player1: { left: '50%', top: '90%' },

        player2: { left: '30%', top: '75%' },
        player3: { left: '50%', top: '75%' },
        player4: { left: '70%', top: '75%' },

        player5: { left: '20%', top: '60%' },
        player6: { left: '40%', top: '50%' },
        player7: { left: '60%', top: '50%' },
        player8: { left: '80%', top: '60%' },

        player9: { left: '40%', top: '20%' },
        player10: { left: '50%', top: '35%' },
        player11: { left: '60%', top: '20%' }
    },
    attack: {
        player1: { left: '50%', top: '90%' },

        player2: { left: '30%', top: '60%' },
        player3: { left: '50%', top: '60%' },
        player4: { left: '70%', top: '60%' },

        player5: { left: '20%', top: '35%' },
        player6: { left: '40%', top: '45%' },
        player7: { left: '60%', top: '45%' },
        player8: { left: '80%', top: '35%' },

        player9: { left: '40%', top: '20%' },
        player10: { left: '50%', top: '35%' },
        player11: { left: '60%', top: '20%' }
    }
};

// Update the initializePitch function to properly display player numbers
function initializePitch() {
    // Make sure the pitch is created
    if ($('.pitch').length === 0) {
        $('.tactical-board').append('<div class="pitch"></div>');
        
        // Create player dots with numbers
        for (let i = 1; i <= 11; i++) {
            $('.pitch').append(`<div class="player" id="player${i}" data-position="${players['player'+i].position}">${players['player'+i].number}</div>`);
        }
    } else {
        // If pitch already exists, make sure numbers are displayed
        for (let i = 1; i <= 11; i++) {
            $(`#player${i}`).text(players['player'+i].number);
        }
    }
    
    // Set initial positions (defense formation)
    changeFormation('defense', false); // No animation for initial setup
}

// Completely reworked approach for smooth animations
$(document).ready(function() {
    // Get references to the buttons with correct IDs
    const $attackButton = $('#attack-btn');
    const $defenseButton = $('#defense-btn');
    
    // Initialize the pitch with players
    initializePitch();
    
    // Reset button handlers to prevent conflicts
    $attackButton.off('click');
    $defenseButton.off('click');
    
    // Player selection handler
    $('.player').on('click', function() {
        const playerId = $(this).attr('id');
        $('.player').removeClass('selected');
        $(this).addClass('selected');
        updatePlayerDescription(playerId);
    });
    
    // Modified function for changing formations with jQuery animate instead of CSS transitions
    function changeFormationWithAnimation(formationType) {
        console.log('Changing formation to:', formationType);
        const positions = formations[formationType];
        
        // Update button states
        if (formationType === 'attack') {
            $attackButton.addClass('active');
            $defenseButton.removeClass('active');
        } else {
            $defenseButton.addClass('active');
            $attackButton.removeClass('active');
        }
        
        // Get pitch dimensions for percentage calculations
        const $pitch = $('.pitch');
        const pitchWidth = $pitch.width();
        const pitchHeight = $pitch.height();
        
        // Animate each player using jQuery's animate function
        for (const playerId in positions) {
            const $player = $(`#${playerId}`);
            const pos = positions[playerId];
            
            // Convert percentages to pixels for animation
            const leftPx = (parseFloat(pos.left) / 100) * pitchWidth;
            const topPx = (parseFloat(pos.top) / 100) * pitchHeight;
            
            // Use jQuery animate for reliable animation
            $player.stop(true).animate({
                left: leftPx + 'px',
                top: topPx + 'px'
            }, {
                duration: 800,
                easing: 'linear',
                queue: false
            });
        }
    }
    
    // Set up click handlers
    $attackButton.on('click', function() {
        changeFormationWithAnimation('attack');
    });
    
    $defenseButton.on('click', function() {
        changeFormationWithAnimation('defense');
    });
    
    // Set initial formation (defense active by default)
    setTimeout(function() {
        changeFormationWithAnimation('defense');
    }, 300);
});

function updatePlayerDescription(playerId) {
    const player = players[playerId];
    
    if (player) {
        let html = `
            <h4>${player.name}</h4>
            <div class="player-details">
                <p><strong>Position:</strong> ${player.position}</p>
                <p><strong>Number:</strong> ${player.number}</p>
                <hr>
                <p>${player.description}</p>
            </div>
        `;
        $('#player-info').html(html);
    }
}

function changeFormation(formationType, animate = true) {
    const positions = formations[formationType];
    const $pitch = $('.pitch');
    
    // Clear any existing movement paths
    $('.movement-path').remove();
    
    // For each player, calculate and make the move
    for (const playerId in positions) {
        const $player = $(`#${playerId}`);
        const pos = positions[playerId];
        
        // Only animate if requested
        if (animate) {
            // Get current position values
            const currentPos = {
                left: parseFloat($player.css('left')),
                top: parseFloat($player.css('top'))
            };
            
            // Calculate target position in pixels
            const targetPos = {
                left: parseFloat(pos.left) / 100 * $pitch.width(),
                top: parseFloat(pos.top) / 100 * $pitch.height()
            };
            
            // Draw the movement path before animation
            drawMovementPath($pitch, currentPos, targetPos);
            
            // Animate the movement with pure CSS transition
            $player.css({
                left: pos.left,
                top: pos.top,
                transition: 'left 0.8s linear, top 0.8s linear'
            });
        } else {
            // Immediate placement without animation
            $player.css({
                left: pos.left,
                top: pos.top,
                transition: 'none'
            });
        }
    }
}

function drawMovementPath($pitch, from, to) {
    // Create a movement path element
    const $path = $('<div class="movement-path"></div>');
    $pitch.append($path);
    
    // Calculate the length and angle of the line
    const dx = to.left - from.left;
    const dy = to.top - from.top;
    const length = Math.sqrt(dx*dx + dy*dy);
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;
    
    // Position the line at the starting point
    $path.css({
        left: from.left,
        top: from.top,
        width: length,
        transform: `rotate(${angle}deg)`,
        transformOrigin: '0 0'
    });
    
    // Fade out and remove the path after animation
    setTimeout(() => {
        $path.fadeOut(300, function() {
            $(this).remove();
        });
    }, 800);
}