// Storage for the play being built
let currentPlayBuilder = {
    name: "",
    steps: [{
        positions: {
            attackers: [],
            defenders: [],
            ball: { left: "50%", top: "50%" }
        }
    }]
};

// Current step being edited
let currentStep = 0;

// Player counters
let attackerCount = 5;
let defenderCount = 5;

// Dodaj zmienną do śledzenia ID edytowanej zagrywki
let editingPlayId = null;

$(document).ready(function() {
    // Initialize the builder
    initializeBuilder();
    
    // Add event listeners
    setupEventListeners();
    
    // Update steps buttons initially
    updateStepsButtons();
});

// Zaktualizowany model danych z polem description
function initializeBuilder(playToEdit = null) {
    console.log("Initializing builder with play:", playToEdit);
    
    // Resetuj ID edytowanej zagrywki jeśli tworzymy nową zagrywkę
    if (!playToEdit) {
        editingPlayId = null;
    }
    
    if (playToEdit) {
        // Użyj istniejącej zagrywki
        currentPlayBuilder = JSON.parse(JSON.stringify(playToEdit));
        
        // Ustaw liczby zawodników, jeśli są zapisane
        if (currentPlayBuilder.playerCounts) {
            $('#attack-players').val(currentPlayBuilder.playerCounts.attackers);
            $('#defense-players').val(currentPlayBuilder.playerCounts.defenders);
            
            // Zaktualizuj globalne zmienne
            attackerCount = currentPlayBuilder.playerCounts.attackers;
            defenderCount = currentPlayBuilder.playerCounts.defenders;
        }
    } else {
        // Utwórz nową pustą zagrywkę
        currentPlayBuilder = {
            name: "",
            steps: [{
                positions: {
                    attackers: [],
                    defenders: [],
                    ball: { left: "50%", top: "50%" }
                },
                description: "Brak opisu",
                highBall: false
            }],
            playerCounts: {
                attackers: parseInt($('#attack-players').val() || 5),
                defenders: parseInt($('#defense-players').val() || 5)
            }
        };
        
        // Zaktualizuj globalne zmienne
        attackerCount = currentPlayBuilder.playerCounts.attackers;
        defenderCount = currentPlayBuilder.playerCounts.defenders;
    }
    
    // Reset the form
    $('#play-name').val(currentPlayBuilder.name);
    
    // Reset the current step
    currentStep = 0;
    
    // Ustaw opis pierwszego kroku, jeśli istnieje
    if (currentPlayBuilder.steps[0] && currentPlayBuilder.steps[0].description) {
        $('#step-description').val(currentPlayBuilder.steps[0].description);
    } else {
        $('#step-description').val('Brak opisu');
    }
    
    // Update step buttons
    updateStepsButtons();
    
    // Load the first step positions
    loadStepPositions(0);
}

// Nowa funkcja do ustawiania pozycji elementów
function setElementPosition($element, left, top) {
    // Ustawiamy bezpośrednio wartości CSS bez transformacji
    $element.css({
        'left': left,
        'top': top
    });
}

// Update saveCurrentStep to store positions in percentages
function saveCurrentStep() {
    console.log("Saving current step:", currentStep);

    // Capture current positions of all players
    const attackers = [];
    const defenders = [];

    // Get pitch dimensions
    const $pitch = $('.builder-pitch');
    const pitchWidth = $pitch.width();
    const pitchHeight = $pitch.height();

    // Get ball position
    const $ball = $('.builder-pitch .ball');
    if ($ball.length === 0) {
        console.error("No ball found on the pitch!");
        return false;
    }

    const ballLeft = (parseFloat($ball.css('left')) / pitchWidth) * 100;
    const ballTop = (parseFloat($ball.css('top')) / pitchHeight) * 100;

    // Save attacker positions
    $('.builder-pitch .player.attacker').each(function() {
        const $player = $(this);
        const left = (parseFloat($player.css('left')) / pitchWidth) * 100;
        const top = (parseFloat($player.css('top')) / pitchHeight) * 100;

        // Get the actual number from the element's text
        const number = parseInt($player.text()) || 0;

        // Check if it's a goalkeeper (number 1)
        const isGoalkeeper = (number === 1);

        attackers.push({
            id: $player.attr('id'),
            left: `${left}%`,
            top: `${top}%`,
            number: number,
            isGoalkeeper: isGoalkeeper // Add goalkeeper flag
        });
    });

    // Save defender positions
    $('.builder-pitch .player.defender').each(function() {
        const $player = $(this);
        const left = (parseFloat($player.css('left')) / pitchWidth) * 100;
        const top = (parseFloat($player.css('top')) / pitchHeight) * 100;

        // Get the actual number from the element's text
        const number = parseInt($player.text()) || 0;

        // Check if it's a goalkeeper (number 1)
        const isGoalkeeper = (number === 1);

        defenders.push({
            id: $player.attr('id'),
            left: `${left}%`,
            top: `${top}%`,
            number: number,
            isGoalkeeper: isGoalkeeper // Add goalkeeper flag
        });
    });

    // Save step description
    const stepDescription = $('#step-description').val().trim() || "Brak opisu";

    // Preserve previously set highBall flag (if it exists)
    const highBall = currentPlayBuilder.steps[currentStep] && 
                    typeof currentPlayBuilder.steps[currentStep].highBall !== 'undefined' ? 
                    currentPlayBuilder.steps[currentStep].highBall : false;

    // Update the step in the play
    currentPlayBuilder.steps[currentStep] = {
        positions: {
            attackers: attackers,
            defenders: defenders,
            ball: {
                left: `${ballLeft}%`,
                top: `${ballTop}%`
            }
        },
        description: stepDescription,
        highBall: highBall
    };

    return true;
}

// Poprawiona funkcja loadStepPositions
function loadStepPositions(stepIndex) {
    console.log("Loading step positions for step:", stepIndex);
    
    // Sprawdź, czy mamy dane tego kroku
    if (!currentPlayBuilder.steps[stepIndex] || !currentPlayBuilder.steps[stepIndex].positions) {
        console.error("No positions data for step", stepIndex);
        return;
    }
    
    const step = currentPlayBuilder.steps[stepIndex];
    
    // ZMIANA: Użyj globalnych zmiennych zamiast pobierać je z formularza za każdym razem
    console.log("Using global variables: attackerCount =", attackerCount, "defenderCount =", defenderCount);
    
    // Wyczyść boisko przed dodaniem nowych elementów
    $('.builder-pitch .player, .builder-pitch .ball').remove();
    
    // Dodaj piłkę
    if (step.positions.ball) {
        $('.builder-pitch').append(`
            <div class="ball" id="game-ball" 
                 style="left: ${step.positions.ball.left}; top: ${step.positions.ball.top};"></div>
        `);
    } else {
        // Jeśli nie ma pozycji piłki, dodaj ją na środku
        $('.builder-pitch').append(`
            <div class="ball" id="game-ball" style="left: 50%; top: 50%"></div>
        `);
    }
    
    // ZMIANA: Używaj globalnej zmiennej attackerCount zamiast lokalnej
    // Dodaj atakujących
    if (step.positions.attackers && step.positions.attackers.length > 0) {
        // Używamy tylko tylu atakujących, ilu jest w globalnej zmiennej
        const attackersToUse = step.positions.attackers.slice(0, attackerCount);
        
        // Dodaj graczy z zapisanymi pozycjami
        attackersToUse.forEach((player, index) => {
            // Sprawdź, czy to bramkarz (numer 1) - zawsze dodaj klasę
            const isGoalkeeper = (player.number === 1 || player.isGoalkeeper === true) ? 'goalkeeper' : '';
            
            $('.builder-pitch').append(`
                <div class="player attacker ${isGoalkeeper}" id="${player.id || 'builder-attacker-' + (index + 1)}" 
                     style="left: ${player.left}; top: ${player.top};">${player.number || index + 1}</div>
            `);
        });
        
        // Jeśli potrzebujemy więcej graczy niż było w zapisanym kroku, dodaj ich przy dolnej krawędzi
        for (let i = attackersToUse.length + 1; i <= attackerCount; i++) {
            const leftPos = 30 + (i * (40 / (attackerCount + 1)));
            
            // Dodaj klasę goalkeeper dla bramkarza (numer 1)
            const isGoalkeeper = (i === 1) ? 'goalkeeper' : '';
            
            $('.builder-pitch').append(`
                <div class="player attacker ${isGoalkeeper}" id="builder-attacker-${i}" 
                     style="left: ${leftPos}%; top: 90%;">${i}</div>
            `);
        }
    } else {
        // Jeśli brak zapisanych pozycji, dodaj wszystkich przy dolnej krawędzi
        for (let i = 1; i <= attackerCount; i++) {
            const leftPos = 30 + (i * (40 / (attackerCount + 1)));
            
            // Dodaj klasę goalkeeper dla bramkarza (numer 1)
            const isGoalkeeper = (i === 1) ? 'goalkeeper' : '';
            
            $('.builder-pitch').append(`
                <div class="player attacker ${isGoalkeeper}" id="builder-attacker-${i}" 
                     style="left: ${leftPos}%; top: 90%;">${i}</div>
            `);
        }
    }
    
    // ZMIANA: Używaj globalnej zmiennej defenderCount zamiast lokalnej
    // Dodaj broniących
    if (step.positions.defenders && step.positions.defenders.length > 0) {
        // Używamy tylko tylu broniących, ilu jest w globalnej zmiennej
        const defendersToUse = step.positions.defenders.slice(0, defenderCount);
        
        // Dodaj graczy z zapisanymi pozycjami
        defendersToUse.forEach((player, index) => {
            // Sprawdź, czy to bramkarz (numer 1) - zawsze dodaj klasę
            const isGoalkeeper = (player.number === 1 || player.isGoalkeeper === true) ? 'goalkeeper' : '';
            
            $('.builder-pitch').append(`
                <div class="player defender ${isGoalkeeper}" id="${player.id || 'builder-defender-' + (index + 1)}" 
                     style="left: ${player.left}; top: ${player.top};">${player.number || index + 1}</div>
            `);
        });
        
        // Jeśli potrzebujemy więcej graczy niż było w zapisanym kroku, dodaj ich przy dolnej krawędzi
        for (let i = defendersToUse.length + 1; i <= defenderCount; i++) {
            const leftPos = 30 + (i * (40 / (defenderCount + 1)));
            
            // Dodaj klasę goalkeeper dla bramkarza (numer 1)
            const isGoalkeeper = (i === 1) ? 'goalkeeper' : '';
            
            $('.builder-pitch').append(`
                <div class="player defender ${isGoalkeeper}" id="builder-defender-${i}" 
                     style="left: ${leftPos}%; top: 80%;">${i}</div>
            `);
        }
    } else {
        // Jeśli brak zapisanych pozycji, dodaj wszystkich przy dolnej krawędzi
        for (let i = 1; i <= defenderCount; i++) {
            const leftPos = 30 + (i * (40 / (defenderCount + 1)));
            
            // Dodaj klasę goalkeeper dla bramkarza (numer 1)
            const isGoalkeeper = (i === 1) ? 'goalkeeper' : '';
            
            $('.builder-pitch').append(`
                <div class="player defender ${isGoalkeeper}" id="builder-defender-${i}" 
                     style="left: ${leftPos}%; top: 80%;">${i}</div>
            `);
        }
    }
    
    // Aktywuj tryb przeciągania
    enableDragMode();
    
    // Aktualizuj opis kroku dla bieżącego kroku
    if (currentPlayBuilder.steps[stepIndex].description) {
        $('#step-description').val(currentPlayBuilder.steps[stepIndex].description);
    } else {
        $('#step-description').val('Brak opisu');
    }
    
    // Aktualizuj stan checkbox highBall (jeśli jest używany)
    if ($('#high-ball-checkbox').length > 0) {
        const isHighBall = currentPlayBuilder.steps[stepIndex].highBall === true;
        $('#high-ball-checkbox').prop('checked', isHighBall);
    }
    
    console.log("Step positions loaded successfully");
}

// Zoptymalizowana funkcja enableDragMode dla lepszej wydajności
function enableDragMode() {
    // Najpierw zniszcz istniejące instancje draggable aby uniknąć duplikacji
    try {
        $('.builder-pitch .player, .builder-pitch .ball').draggable('destroy');
    } catch (e) {
        // Ignoruj błąd jeśli draggable nie był zainicjalizowany
    }
    
    // Zainicjuj draggable z optymalnymi ustawieniami
    $('.builder-pitch .player, .builder-pitch .ball').draggable({
        containment: ".builder-pitch",
        cursor: "move",
        scroll: false,          // Wyłącz przewijanie podczas przesuwania
        refreshPositions: false, // Nie przeliczaj pozycji wszystkich elementów przy każdym ruchu
        distance: 2,            // Minimalny dystans aby rozpocząć przeciąganie
        delay: 50,              // Mały delay dla ustabilizowania
        start: function(event, ui) {
            // Usuń jakiekolwiek przejścia CSS które mogłyby spowalniać
            $(this).css({
                'transition': 'none',
                'will-change': 'left, top' // Podpowiedź dla przeglądarki co się zmieni
            });
        },
        stop: function(event, ui) {
            // Po zakończeniu przeciągania, zresetuj style i odrocz zapisywanie
            $(this).css({
                'will-change': 'auto'
            });
            
            // Oznacz jako przeciągnięty, ale NIE zapisuj natychmiast
            $(this).attr('data-dragged', 'true');
            
            // Odroczone zapisywanie dla lepszej wydajności
            clearTimeout(window.saveTimeout);
            window.saveTimeout = setTimeout(function() {
                saveCurrentStep();
            }, 500); // Zapisz po 500ms bezczynności
        }
    });
}

function disableDragMode() {
    try {
        $('.builder-pitch .player, .builder-pitch .ball').draggable('destroy');
    } catch (e) {
        console.log("Draggable not initialized:", e);
    }
}

// Usunięcie niepotrzebnego toggle'a dla trybu przeciągania
function setupEventListeners() {
    // Usuwamy toggle dla drag mode
    // $('#drag-mode').on('change', function() { ... });
    
    // Handle player count changes
    $('#attack-players, #defense-players').on('change', function() {
        // Aktualizuj globalne zmienne
        attackerCount = parseInt($('#attack-players').val() || 5);
        defenderCount = parseInt($('#defense-players').val() || 5);
        
        console.log("Player counts updated: attackerCount=", attackerCount, "defenderCount=", defenderCount);
        
        // Update players on the pitch
        addPlayersToBuilder(attackerCount, defenderCount);
        
        // Zawsze aktywuj tryb przeciągania po zmianie liczby graczy
        enableDragMode();
    });
    
    // Add step button - NAPRAWIONE
    $('#add-step').on('click', function() {
        console.log("Add step clicked");
        addNewStep();
    });
    
    // Save play button - NAPRAWIONE
    $('#save-play').on('click', function() {
        console.log("Save play clicked");
        savePlay();
    });
    
    // Delegation for step button clicks
    $(document).on('click', '.step-btn', function() {
        const stepIndex = parseInt($(this).data('step'));
        changeBuilderStep(stepIndex);
    });
    
    // Delegation for reset step button clicks
    $(document).on('click', '.reset-step', function() {
        const stepIndex = parseInt($(this).data('step'));
        resetStepPositions(stepIndex);
    });
    
    // Load saved play for editing
    $(document).on('click', '.edit-play', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Pobierz ID zagrywki bezpośrednio z atrybutu data-play przycisku
        const playId = $(this).data('play');
        console.log("Edit button clicked for play:", playId);
        
        // Załaduj zagrywkę do edycji
        if (editPlay(playId)) {
            console.log("Zagrywka załadowana pomyślnie");
            // Dodaj informację o powodzeniu
            const playName = currentPlayBuilder.name;
            alert(`Zagrywka "${playName}" została załadowana do edycji.`);
        } else {
            alert("Nie udało się załadować zagrywki do edycji.");
        }
    });
    
    // Delegation for delete step button clicks
    $(document).on('click', '.delete-step', function() {
        if ($(this).prop('disabled')) return;
        
        const stepIndex = parseInt($(this).data('step'));
        deleteStep(stepIndex);
    });

    // Obsługa przycisku duplikacji
    $(document).on('click', '.duplicate-play', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const playId = $(this).data('play');
        console.log("Duplicate button clicked for play:", playId);
        
        duplicatePlay(playId);
    });
}

// Aktualizacja funkcji updateStepsButtons aby zamienić R na -
function updateStepsButtons() {
    console.log("Updating steps buttons. Current step:", currentStep, "Total steps:", currentPlayBuilder.steps.length);
    
    const $stepsButtons = $('#steps-buttons');
    $stepsButtons.empty();
    
    // Dodaj przyciski dla każdego kroku
    for (let i = 0; i < currentPlayBuilder.steps.length; i++) {
        const buttonClass = i === currentStep ? 'btn-primary' : 'btn-secondary';
        const copyDisabled = i === 0 ? 'disabled' : '';
        const deleteDisabled = currentPlayBuilder.steps.length <= 1 ? 'disabled' : '';
        
        // Pobierz stan checkboxa (domyślnie false)
        const highBallChecked = currentPlayBuilder.steps[i].highBall ? 'checked' : '';
        
        $stepsButtons.append(`
            <div class="btn-group me-1 mb-1">
                <button type="button" class="btn ${buttonClass} step-btn" data-step="${i}">Krok ${i + 1}</button>
                <button type="button" class="btn btn-outline-info copy-step" data-step="${i}" title="Kopiuj z poprzedniego kroku" ${copyDisabled}>K</button>
                <button type="button" class="btn btn-outline-danger delete-step" data-step="${i}" title="Usuń krok" ${deleteDisabled}>-</button>
                <div class="form-check ms-2">
                    <input class="form-check-input high-ball-check" type="checkbox" id="highBall-${i}" data-step="${i}" ${highBallChecked}>
                    <label class="form-check-label" for="highBall-${i}">Górą</label>
                </div>
            </div>
        `);
    }
    
    // Obsługa kliknięcia w przycisk kroku
    $('.step-btn').off('click').on('click', function() {
        const stepIndex = parseInt($(this).data('step'));
        changeBuilderStep(stepIndex);
    });
    
    // Obsługa przycisku kopiowania (K)
    $('.copy-step').off('click').on('click', function() {
        if ($(this).prop('disabled')) return;
        
        const stepIndex = parseInt($(this).data('step'));
        copyFromPreviousStep(stepIndex);
    });
    
    // Obsługa przycisku usuwania (-)
    $('.delete-step').off('click').on('click', function() {
        if ($(this).prop('disabled')) return;
        
        const stepIndex = parseInt($(this).data('step'));
        deleteStep(stepIndex);
    });
    
    // Obsługa checkboxa "Górą"
    $('.high-ball-check').off('change').on('change', function() {
        const stepIndex = parseInt($(this).data('step'));
        const isChecked = $(this).prop('checked');
        
        // Zaktualizuj flagę dla kroku
        currentPlayBuilder.steps[stepIndex].highBall = isChecked;
        console.log(`Krok ${stepIndex + 1} zagranie górą: ${isChecked}`);
        
        // Zapisz stan
        saveCurrentStep();
    });
}

// Nowa funkcja do usuwania kroku
function deleteStep(stepIndex) {
    if (currentPlayBuilder.steps.length <= 1) {
        alert('Nie można usunąć jedynego kroku zagrywki!');
        return;
    }
    
    if (confirm(`Czy na pewno chcesz usunąć krok ${stepIndex + 1}?`)) {
        // Usuń krok z tablicy kroków
        currentPlayBuilder.steps.splice(stepIndex, 1);
        
        // Jeśli usuwamy bieżący krok lub krok przed bieżącym, zaktualizuj indeks bieżącego kroku
        if (stepIndex <= currentStep) {
            currentStep = Math.max(0, currentStep - 1);
        }
        
        // Zaktualizuj przyciski kroków
        updateStepsButtons();
        
        // Załaduj bieżący krok
        loadStepPositions(currentStep);
        
        alert(`Krok ${stepIndex + 1} został usunięty!`);
    }
}

// Aktualizacja funkcji addPlayersToBuilder
function addPlayersToBuilder(attackers, defenders) {
    // Zapisz bieżący krok przed zmianami
    saveCurrentStep();
    
    // Pobierz istniejących graczy
    const existingAttackers = [];
    const existingDefenders = [];
    
    // Zachowaj aktualne pozycje istniejących graczy
    $('.builder-pitch .player.attacker').each(function() {
        const number = parseInt($(this).text());
        existingAttackers.push({
            id: $(this).attr('id'),
            left: $(this).css('left'),
            top: $(this).css('top'),
            number: number
        });
    });
    
    $('.builder-pitch .player.defender').each(function() {
        const number = parseInt($(this).text());
        existingDefenders.push({
            id: $(this).attr('id'),
            left: $(this).css('left'),
            top: $(this).css('top'),
            number: number
        });
    });
    
    // Usuń wszystkich graczy
    $('.builder-pitch .player').remove();
    
    // Upewnij się, że mamy piłkę
    const $existingBall = $('.builder-pitch .ball');
    if ($existingBall.length === 0) {
        $('.builder-pitch').append(`
            <div class="ball" id="game-ball" style="left: 50%; top: 50%"></div>
        `);
    }
    
    // Dodaj atakujących (czerwonych) - zachowując istniejące pozycje
    for (let i = 1; i <= attackers; i++) {
        // Sprawdź, czy ten gracz istniał wcześniej
        const existingAttacker = existingAttackers.find(a => a.number === i);
        
        // Dodaj klasę goalkeeper dla bramkarza (numer 1)
        const isGoalkeeper = (i === 1) ? 'goalkeeper' : '';
        
        if (existingAttacker) {
            // Użyj istniejącej pozycji
            $('.builder-pitch').append(`
                <div class="player attacker ${isGoalkeeper}" id="builder-attacker-${i}" 
                     style="left: ${existingAttacker.left}; top: ${existingAttacker.top};">${i}</div>
            `);
        } else {
            // Dodaj nowego gracza przy dolnej krawędzi (rozłóż ich równomiernie)
            const leftPos = 30 + (i * (40 / (attackers + 1)));
            $('.builder-pitch').append(`
                <div class="player attacker ${isGoalkeeper}" id="builder-attacker-${i}" 
                     style="left: ${leftPos}%; top: 90%;">${i}</div>
            `);
        }
    }
    
    // Dodaj broniących (niebieskich) - zachowując istniejące pozycje
    for (let i = 1; i <= defenders; i++) {
        // Sprawdź, czy ten gracz istniał wcześniej
        const existingDefender = existingDefenders.find(d => d.number === i);
        
        // Dodaj klasę goalkeeper dla bramkarza (numer 1)
        const isGoalkeeper = (i === 1) ? 'goalkeeper' : '';
        
        if (existingDefender) {
            // Użyj istniejącej pozycji
            $('.builder-pitch').append(`
                <div class="player defender ${isGoalkeeper}" id="builder-defender-${i}" 
                     style="left: ${existingDefender.left}; top: ${existingDefender.top};">${i}</div>
            `);
        } else {
            // Dodaj nowego gracza przy dolnej krawędzi (rozłóż ich równomiernie)
            const leftPos = 30 + (i * (40 / (defenders + 1)));
            $('.builder-pitch').append(`
                <div class="player defender ${isGoalkeeper}" id="builder-defender-${i}" 
                     style="left: ${leftPos}%; top: 80%;">${i}</div>
            `);
        }
    }
    
    // Aktywuj tryb przeciągania
    enableDragMode();
    
    // Zaktualizuj bieżący krok po zmianach
    saveCurrentStep();
}

// NAPRAWIONA funkcja dodawania kroku
function addNewStep() {
    console.log("Adding new step after step:", currentStep);
    
    // Najpierw zapisz bieżący krok
    if (!saveCurrentStep()) {
        alert("Wystąpił błąd podczas zapisywania bieżącego kroku!");
        return;
    }
    
    // Kopiuj bieżący krok jako szablon dla nowego
    const currentStepData = JSON.parse(JSON.stringify(currentPlayBuilder.steps[currentStep]));
    
    // Zresetuj opis dla nowego kroku
    currentStepData.description = "Brak opisu";
    
    // Zawsze resetuj wysokie podanie dla nowego kroku
    currentStepData.highBall = false;
    
    // Dodaj nowy krok jako kopię bieżącego
    currentPlayBuilder.steps.push(currentStepData);
    
    // Aktualizuj przyciski kroków
    updateStepsButtons();
    
    // Przejdź do nowego kroku
    changeBuilderStep(currentPlayBuilder.steps.length - 1);
    
    console.log("New step added. Total steps:", currentPlayBuilder.steps.length);
}

function resetStepPositions(stepIndex) {
    // Nie można zresetować pierwszego kroku
    if (stepIndex === 0) {
        alert('Nie można zresetować pierwszego kroku!');
        return;
    }
    
    // Pobierz pozycje z poprzedniego kroku
    const prevStep = currentPlayBuilder.steps[stepIndex - 1];
    
    if (!prevStep || !prevStep.positions) {
        alert('Brak danych z poprzedniego kroku!');
        return;
    }
    
    // Kopiuj pozycje z poprzedniego kroku
    currentPlayBuilder.steps[stepIndex] = JSON.parse(JSON.stringify(prevStep));
    
    // Załaduj pozycje na boisko
    loadStepPositions(stepIndex);
    
    alert(`Krok ${stepIndex + 1} został zresetowany do pozycji z kroku ${stepIndex}!`);
}

// W funkcji changeBuilderStep
function changeBuilderStep(stepIndex) {
    console.log("Changing to step:", stepIndex);
    
    // Zapisz aktualny krok przed zmianą
    saveCurrentStep();
    
    // Aktualizuj bieżący krok
    currentStep = stepIndex;
    
    // Zaktualizuj wygląd przycisków
    $('.step-btn').removeClass('btn-primary').addClass('btn-secondary');
    $(`.step-btn[data-step="${stepIndex}"]`).removeClass('btn-secondary').addClass('btn-primary');
    
    // Załaduj opis kroku
    const stepDescription = currentPlayBuilder.steps[stepIndex].description || "Brak opisu";
    $('#step-description').val(stepDescription);
    
    // Załaduj pozycje graczy
    loadStepPositions(stepIndex);
    
    // Upewnij się, że bramkarze mają odpowiednią klasę
    ensureGoalkeeperClasses();
}

// Dodaj nową funkcję do kopiowania z poprzedniego kroku
function copyFromPreviousStep(stepIndex) {
    // Nie można kopiować do pierwszego kroku
    if (stepIndex === 0) {
        return;
    }
    
    // Zapisz bieżący krok zanim go nadpiszemy
    saveCurrentStep();
    
    // Pobierz pozycje z poprzedniego kroku
    const prevStep = currentPlayBuilder.steps[stepIndex - 1];
    
    if (!prevStep || !prevStep.positions) {
        alert('Brak danych z poprzedniego kroku!');
        return;
    }
    
    // Zapisz aktualną wartość highBall i opis przed nadpisaniem
    const currentHighBall = currentPlayBuilder.steps[stepIndex].highBall;
    const currentDescription = currentPlayBuilder.steps[stepIndex].description || "Brak opisu";
    
    // Możemy zapytać, czy skopiować tylko pozycje, czy również opis
    const copyDescription = confirm("Czy chcesz skopiować również opis kroku?");
    
    // Kopiuj pozycje z poprzedniego kroku
    currentPlayBuilder.steps[stepIndex] = JSON.parse(JSON.stringify(prevStep));
    
    // Przywróć oryginalne wartości jeśli potrzeba
    currentPlayBuilder.steps[stepIndex].highBall = currentHighBall;
    
    if (!copyDescription) {
        currentPlayBuilder.steps[stepIndex].description = currentDescription;
    }
    
    // Jeśli aktualnie przeglądany krok to ten, który kopiujemy, załaduj go na boisko
    if (currentStep === stepIndex) {
        // Załaduj pozycje
        loadStepPositions(stepIndex);
        
        // Zaktualizuj pole opisu
        $('#step-description').val(currentPlayBuilder.steps[stepIndex].description || "Brak opisu");
    }
    
    alert(`Krok ${stepIndex + 1} został zaktualizowany z pozycjami z kroku ${stepIndex}!`);
}

// Naprawiona funkcja savePlay
function savePlay() {
    console.log("Saving play, editing mode:", editingPlayId !== null);
    
    // Zapisz bieżący krok
    if (!saveCurrentStep()) {
        alert("Wystąpił błąd podczas zapisywania bieżącego kroku!");
        return;
    }
    
    // Pobierz nazwę zagrywki
    const playName = $('#play-name').val().trim();
    
    if (!playName) {
        alert('Proszę podać nazwę zagrywki!');
        return;
    }
    
    // Sprawdź, czy mamy przynajmniej jeden krok
    if (currentPlayBuilder.steps.length === 0) {
        alert('Zagrywka musi mieć przynajmniej jeden krok!');
        return;
    }
    
    // Zaktualizuj nazwę zagrywki
    currentPlayBuilder.name = playName;
    
    // Zapisz liczbę zawodników w modelu danych
    currentPlayBuilder.playerCounts = {
        attackers: parseInt($('#attack-players').val() || 5),
        defenders: parseInt($('#defense-players').val() || 5)
    };
    
    // Pobierz zapisane zagrywki
    let savedPlays = loadPlaysFromStorage();
    
    // Określ ID zagrywki - użyj istniejącego ID lub wygeneruj nowy
    const playId = editingPlayId || ('play_' + Date.now());
    
    // Zapisz zagrywkę pod określonym ID
    savedPlays[playId] = currentPlayBuilder;
    
    // Zapisz zagrywki w localStorage
    if (savePlaysToStorage(savedPlays)) {
        // Zaktualizuj listę zapisanych zagrywek
        updateSavedPlaysList();
        
        // Zainicjuj nową zagrywkę i resetuj tryb edycji
        initializeBuilder();
        editingPlayId = null;
        
        // Wyświetl odpowiedni komunikat
        if (editingPlayId) {
            alert(`Zagrywka "${playName}" została zaktualizowana!`);
        } else {
            alert(`Zagrywka "${playName}" została zapisana!`);
        }
    } else {
        alert('Wystąpił błąd podczas zapisywania zagrywki. Spróbuj ponownie.');
    }
}

// Funkcja do aktualizacji listy zapisanych zagrywek
function updateSavedPlaysList() {
    const $savedPlays = $('#saved-plays');
    $savedPlays.empty();
    
    let savedPlays = loadPlaysFromStorage();
    
    if (Object.keys(savedPlays).length === 0) {
        $savedPlays.append(`
            <div class="text-center text-muted p-3">
                <i class="bi bi-info-circle me-2"></i>
                <p class="mb-0">Brak zapisanych zagrywek</p>
            </div>
        `);
    } else {
        for (const [playId, play] of Object.entries(savedPlays)) {
            $savedPlays.append(`
                <div class="list-group-item py-2">
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex align-items-center">
                            <input class="form-check-input me-2" type="checkbox" data-play="${playId}" id="check-${playId}">
                            <div>
                                <h6 class="mb-0">${play.name}</h6>
                                <small class="text-muted">${play.steps.length} krok${play.steps.length === 1 ? '' : 'ów'}</small>
                            </div>
                        </div>
                        <div class="btn-group btn-group-sm">
                            <button class="btn btn-sm btn-outline-primary edit-play" data-play="${playId}" title="Edytuj">
                                <i class="bi bi-pencil-fill"></i>
                            </button>
                            <button class="btn btn-sm btn-outline-success duplicate-play" data-play="${playId}" title="Duplikuj">
                                <i class="bi bi-files"></i>
                            </button>
                            <button class="btn btn-sm btn-outline-danger delete-play" data-play="${playId}" title="Usuń">
                                <i class="bi bi-trash-fill"></i>
                            </button>
                        </div>
                    </div>
                </div>
            `);
        }
    }
}

function loadPlayForEditing(playId) {
    console.log("Loading play for editing:", playId);
    
    let savedPlays;
    try {
        savedPlays = JSON.parse(localStorage.getItem('plays') || '{}');
    } catch (e) {
        console.error("Error parsing saved plays:", e);
        savedPlays = {};
    }
    
    const play = savedPlays[playId];
    
    if (play) {
        // Załaduj zagrywkę do edytora
        currentPlayBuilder = JSON.parse(JSON.stringify(play)); // Głęboka kopia
        currentStep = 0;
        
        // Zaktualizuj formularz
        $('#play-name').val(play.name);
        
        // Zaktualizuj przyciski kroków
        updateStepsButtons();
        
        // Załaduj pierwszy krok
        changeBuilderStep(0);
        
        alert(`Zagrywka "${play.name}" została załadowana do edycji.`);
    } else {
        alert('Nie znaleziono zagrywki!');
    }
}

// Inicjalizacja listy zapisanych zagrywek przy załadowaniu strony
$(document).ready(function() {
    updateSavedPlaysList();
    
    // Obsługa usuwania zagrywki
    $(document).on('click', '.delete-play', function() {
        const playId = $(this).data('play');
        deletePlay(playId);
    });
});

function deletePlay(playId) {
    if (confirm('Czy na pewno chcesz usunąć tę zagrywkę?')) {
        let savedPlays;
        try {
            savedPlays = JSON.parse(localStorage.getItem('plays') || '{}');
        } catch (e) {
            console.error("Error parsing saved plays:", e);
            savedPlays = {};
        }
        
        if (savedPlays[playId]) {
            delete savedPlays[playId];
            
            try {
                localStorage.setItem('plays', JSON.stringify(savedPlays));
                
                // Zaktualizuj listę zapisanych zagrywek
                updateSavedPlaysList();
                
                alert('Zagrywka została usunięta!');
            } catch (e) {
                console.error("Error saving after delete:", e);
                alert('Wystąpił błąd podczas usuwania zagrywki.');
            }
        }
    }
}

// Add to the bottom of the file
$(document).ready(function() {
    // Export button handler
    $('#export-plays').on('click', function() {
        const allPlays = loadPlaysFromStorage();
        const selectedPlays = {};
        let anySelected = false;
        
        // Sprawdź, które zagrywki są zaznaczone
        $('.play-checkbox:checked').each(function() {
            const playId = $(this).data('play');
            if (allPlays[playId]) {
                selectedPlays[playId] = allPlays[playId];
                anySelected = true;
            }
        });
        
        // Jeśli nic nie zaznaczono, eksportuj wszystkie
        const playsToExport = anySelected ? selectedPlays : allPlays;
        
        // Pokaż w modalu
        $('#plays-json').val(JSON.stringify(playsToExport, null, 2));
        new bootstrap.Modal(document.getElementById('importExportModal')).show();
    });
    
    // Import button handler
    $('#import-plays').on('click', function() {
        try {
            const jsonText = $('#plays-json').val();
            const plays = JSON.parse(jsonText);
            
            // Save to localStorage
            if (savePlaysToStorage(plays)) {
                updateSavedPlaysList();
                alert('Zagrywki zostały zaimportowane!');
                
                // Close the modal
                bootstrap.Modal.getInstance(document.getElementById('importExportModal')).hide();
            } else {
                alert('Wystąpił błąd podczas importowania zagrywek.');
            }
        } catch (e) {
            alert('Nieprawidłowy format JSON. Sprawdź dane i spróbuj ponownie.');
            console.error(e);
        }
    });
    
    // Copy JSON button handler
    $('#copy-json').on('click', function() {
        const jsonText = $('#plays-json').val();
        navigator.clipboard.writeText(jsonText).then(function() {
            alert('Skopiowano do schowka!');
        }, function() {
            alert('Nie udało się skopiować. Spróbuj ręcznie zaznaczyć i skopiować tekst.');
        });
    });
    
    // Dodaj przycisk do zapisywania na dysku
    $('#save-to-file').on('click', function() {
        const jsonText = $('#plays-json').val();
        if (!jsonText) {
            alert('Brak danych do zapisania');
            return;
        }
        
        // Utwórz plik do pobrania
        const blob = new Blob([jsonText], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        // Utwórz link i kliknij go, aby rozpocząć pobieranie
        const a = document.createElement('a');
        a.href = url;
        a.download = 'zagrywki-oks_' + new Date().toISOString().slice(0,10) + '.json';
        document.body.appendChild(a);
        a.click();
        
        // Wyczyść
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 0);
    });
    
    // Dodaj obsługę wczytywania z pliku
    $('#file-input').on('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(e) {
            $('#plays-json').val(e.target.result);
        };
        reader.readAsText(file);
    });
});

// Dodaj te funkcje do pliku

// Funkcja do ładowania zagrywek z localStorage
function loadPlaysFromStorage() {
    try {
        const playsJSON = localStorage.getItem('plays');
        if (!playsJSON) {
            return {};
        }
        return JSON.parse(playsJSON);
    } catch (e) {
        console.error('Błąd podczas ładowania zagrywek z localStorage:', e);
        return {};
    }
}

// Funkcja do zapisywania zagrywek do localStorage
function savePlaysToStorage(plays) {
    try {
        localStorage.setItem('plays', JSON.stringify(plays));
        return true;
    } catch (e) {
        console.error('Błąd podczas zapisywania zagrywek do localStorage:', e);
        return false;
    }
}

// Funkcja do łączenia zagrywek z istniejącymi
function mergePlaysToStorage(plays) {
    try {
        // Pobierz istniejące zagrywki
        const existingPlays = loadPlaysFromStorage();
        
        // Połącz z nowymi zagrywkami (nowe nadpiszą istniejące z tymi samymi kluczami)
        const mergedPlays = {...existingPlays, ...plays};
        
        // Zapisz połączone zagrywki
        localStorage.setItem('plays', JSON.stringify(mergedPlays));
        
        return true;
    } catch (e) {
        console.error('Błąd podczas łączenia zagrywek:', e);
        return false;
    }
}

// Zaktualizuj obsługę importu/eksportu
$(document).ready(function() {
    // Poprzednie inicjalizacje...
    
    // Export button handler
    $('#export-plays').on('click', function() {
        console.log("Export button clicked");
        const allPlays = loadPlaysFromStorage();
        const selectedPlays = {};
        let anySelected = false;
        
        // Sprawdź, które zagrywki są zaznaczone
        $('.play-checkbox:checked').each(function() {
            const playId = $(this).data('play');
            if (allPlays[playId]) {
                selectedPlays[playId] = allPlays[playId];
                anySelected = true;
            }
        });
        
        // Jeśli nic nie zaznaczono, eksportuj wszystkie
        const playsToExport = anySelected ? selectedPlays : allPlays;
        
        // Pokaż w modalu
        $('#plays-json').val(JSON.stringify(playsToExport, null, 2));
        
        // Otwórz modal
        if (typeof bootstrap !== 'undefined') {
            new bootstrap.Modal(document.getElementById('importExportModal')).show();
        } else {
            $('#importExportModal').modal('show');
        }
    });
    
    // Import button handler
    $('#import-plays').on('click', function() {
        try {
            const jsonText = $('#plays-json').val();
            if (!jsonText.trim()) {
                alert('Brak danych do importu. Wklej kod JSON lub wybierz plik.');
                return;
            }
            
            const plays = JSON.parse(jsonText);
            
            if (Object.keys(plays).length === 0) {
                alert('Brak zagrywek do importu w podanym kodzie JSON.');
                return;
            }
            
            // Zapytaj użytkownika, czy chce zastąpić czy dodać zagrywki
            const importMode = confirm(
                'Czy chcesz dodać te zagrywki do istniejących?' + 
                '\nKliknij OK, aby dodać, lub Anuluj, aby zastąpić wszystkie istniejące zagrywki.'
            );
            
            let success;
            if (importMode) {
                // Dodawanie - połącz z istniejącymi
                success = mergePlaysToStorage(plays);
            } else {
                // Zastępowanie - nadpisz wszystkie
                success = savePlaysToStorage(plays);
            }
            
            if (success) {
                updateSavedPlaysList();
                alert(`Zagrywki zostały zaimportowane! Zaimportowano ${Object.keys(plays).length} zagrywek.`);
                
                // Zamknij modal
                if (typeof bootstrap !== 'undefined') {
                    const modalElem = document.getElementById('importExportModal');
                    const modalInstance = bootstrap.Modal.getInstance(modalElem);
                    if (modalInstance) modalInstance.hide();
                } else {
                    $('#importExportModal').modal('hide');
                }
            } else {
                alert('Wystąpił błąd podczas importowania zagrywek.');
            }
        } catch (e) {
            alert('Nieprawidłowy format JSON. Sprawdź dane i spróbuj ponownie.');
            console.error('Błąd parsowania JSON:', e);
        }
    });
    
    // Copy JSON button handler
    $('#copy-json').on('click', function() {
        const jsonText = $('#plays-json').val();
        
        if (!jsonText.trim()) {
            alert('Brak danych do skopiowania.');
            return;
        }
        
        // Użyj nowoczesnego API do kopiowania
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(jsonText)
                .then(() => {
                    alert('Skopiowano do schowka!');
                })
                .catch(() => {
                    // Fallback dla starszych przeglądarek
                    legacyCopy(jsonText);
                });
        } else {
            // Fallback dla przeglądarek bez API clipboard
            legacyCopy(jsonText);
        }
    });
    
    // Funkcja do kopiowania tekstu poprzez tworzenie tymczasowego elementu
    function legacyCopy(text) {
        try {
            // Utwórz tymczasowy element tekstowy
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            
            // Zaznacz cały tekst
            textarea.select();
            
            // Kopiuj do schowka
            const successful = document.execCommand('copy');
            
            // Usuń tymczasowy element
            document.body.removeChild(textarea);
            
            if (successful) {
                alert('Skopiowano do schowka!');
            } else {
                alert('Kopiowanie nie powiodło się. Spróbuj ręcznie zaznaczyć i skopiować tekst.');
            }
        } catch (err) {
            alert('Nie udało się skopiować. Spróbuj ręcznie zaznaczyć i skopiować tekst.');
            console.error('Błąd kopiowania:', err);
        }
    }
    
    // Przycisk zapisywania do pliku
    $('#save-to-file').on('click', function() {
        const jsonText = $('#plays-json').val();
        
        if (!jsonText.trim()) {
            alert('Brak danych do zapisania.');
            return;
        }
        
        // Generuj nazwę pliku z datą
        const today = new Date();
        const dateStr = today.toISOString().slice(0, 10); // Format YYYY-MM-DD
        
        // Utwórz plik do pobrania
        const blob = new Blob([jsonText], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        // Utwórz link i kliknij go, aby rozpocząć pobieranie
        const a = document.createElement('a');
        a.href = url;
        a.download = `zagrywki-oks_${dateStr}.json`;
        document.body.appendChild(a);
        a.click();
        
        // Wyczyść
        setTimeout(() => {
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }, 100);
    });
    
    // Dodaj obsługę wczytywania z pliku
    $('#file-input').on('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        // Sprawdź typ pliku
        if (file.type !== 'application/json' && !file.name.endsWith('.json')) {
            alert('Wybierz plik JSON.');
            this.value = ''; // Zresetuj input
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                // Spróbuj sparsować plik, aby upewnić się, że to prawidłowy JSON
                const content = e.target.result;
                JSON.parse(content); // To rzuci wyjątek, jeśli format jest nieprawidłowy
                
                // Jeśli parsowanie się powiedzie, wstaw zawartość do textarea
                $('#plays-json').val(content);
            } catch (error) {
                alert('Wybrany plik nie zawiera prawidłowego kodu JSON.');
                console.error('Błąd parsowania pliku JSON:', error);
            }
        };
        
        reader.onerror = function() {
            alert('Wystąpił błąd podczas czytania pliku.');
        };
        
        reader.readAsText(file);
    });
});

// Funkcja do edycji zagrywki - dodaj lub aktualizuj tę funkcję w builder.js
function editPlay(playId) {
    console.log("Editing play:", playId);
    
    try {
        // Załaduj wszystkie zagrywki z właściwej funkcji
        const savedPlays = loadPlaysFromStorage(); // Zmiana tutaj
        
        // Znajdź zagrywkę do edycji
        const playToEdit = savedPlays[playId];
        
        if (!playToEdit) {
            console.error(`Zagrywka o ID ${playId} nie została znaleziona`);
            return false;
        }
        
        // Zapisz ID edytowanej zagrywki
        editingPlayId = playId;
        
        // Ustaw aktualną zagrywkę do edycji
        currentPlayBuilder = JSON.parse(JSON.stringify(playToEdit));
        
        // Ustaw nazwę zagrywki
        $('#play-name').val(currentPlayBuilder.name);
        
        // Ustaw liczby zawodników, jeśli są zapisane
        if (currentPlayBuilder.playerCounts) {
            $('#attack-players').val(currentPlayBuilder.playerCounts.attackers);
            $('#defense-players').val(currentPlayBuilder.playerCounts.defenders);
            
            // Zaktualizuj globalne zmienne
            attackerCount = currentPlayBuilder.playerCounts.attackers;
            defenderCount = currentPlayBuilder.playerCounts.defenders;
        }
        
        // Ustaw aktualny krok na pierwszy
        currentStep = 0;
        
        // Zaktualizuj przyciski kroków
        updateStepsButtons();
        
        // Załaduj pierwszy krok
        loadStepPositions(0);
        
        console.log("Zagrywka załadowana do edycji", currentPlayBuilder);
        return true;
    } catch (e) {
        console.error("Błąd podczas ładowania zagrywki do edycji:", e);
        return false;
    }
}

// Funkcja do duplikowania zagrywki - poprawiona wersja
function duplicatePlay(playId) {
    console.log("Duplicating play:", playId);
    
    try {
        // Załaduj wszystkie zagrywki
        const savedPlays = loadPlaysFromStorage();
        
        // Znajdź zagrywkę do zduplikowania
        const playToDuplicate = savedPlays[playId];
        
        if (!playToDuplicate) {
            console.error(`Zagrywka o ID ${playId} nie została znaleziona`);
            return false;
        }
        
        // Utwórz kopię zagrywki
        const duplicatedPlay = JSON.parse(JSON.stringify(playToDuplicate));
        
        // Upewnij się, że właściwość playerCounts istnieje
        if (!duplicatedPlay.playerCounts) {
            duplicatedPlay.playerCounts = {
                attackers: 5,
                defenders: 5
            };
        }
        
        console.log("Duplicated play playerCounts:", duplicatedPlay.playerCounts);
        
        // Zmień nazwę, aby wskazać, że to kopia
        duplicatedPlay.name = `${duplicatedPlay.name} (kopia)`;
        
        // Wygeneruj nowe ID
        const newPlayId = 'play_' + Date.now();
        
        // Dodaj zduplikowaną zagrywkę do zapisanych
        savedPlays[newPlayId] = duplicatedPlay;
        
        // Zapisz zagrywki w localStorage
        if (savePlaysToStorage(savedPlays)) {
            // Zaktualizuj listę zagrywek
            updateSavedPlaysList();
            
            alert(`Zagrywka "${duplicatedPlay.name}" została utworzona jako kopia.`);
            return true;
        } else {
            alert('Wystąpił błąd podczas zapisywania zduplikowanej zagrywki.');
            return false;
        }
    } catch (e) {
        console.error("Błąd podczas duplikowania zagrywki:", e);
        alert('Wystąpił błąd podczas duplikowania zagrywki.');
        return false;
    }
}

// Pomocnicza funkcja zapewniająca, że bramkarze są poprawnie oznaczeni
function ensureGoalkeeperClasses() {
    // Upewnij się, że wszyscy gracze z numerem 1 mają klasę goalkeeper
    $('.player').each(function() {
        const $player = $(this);
        const number = parseInt($player.text()) || 0;
        
        if (number === 1) {
            $player.addClass('goalkeeper');
        } else {
            $player.removeClass('goalkeeper');
        }
    });
}

// Wywołaj tę funkcję po załadowaniu kroku i przy zmianach numerów graczy
$(document).on('DOMNodeInserted', '.player', function() {
    ensureGoalkeeperClasses();
});

// Ensure consistent pitch dimensions and scaling
function ensureConsistentPitchSize() {
    const $tacticalBoard = $('.tactical-board.horizontal');
    const containerWidth = $tacticalBoard.width();
    const containerHeight = containerWidth * (2 / 3); // Maintain 3:2 aspect ratio

    // Apply consistent dimensions to the pitch
    $('.pitch.horizontal').css({
        width: containerWidth + 'px',
        height: containerHeight + 'px'
    });

    console.log(`Pitch dimensions set to: ${containerWidth}px x ${containerHeight}px`);
}

// Call this function on document ready and window resize
$(document).ready(function() {
    ensureConsistentPitchSize();
    $(window).on('resize', ensureConsistentPitchSize);
});

// Ensure players maintain their positions relative to the pitch
function scalePlayersToPitch() {
    const $pitch = $('.pitch');
    const pitchWidth = $pitch.width();
    const pitchHeight = $pitch.height();

    $('.player').each(function() {
        const $player = $(this);
        const leftPercent = parseFloat($player.data('left-percent'));
        const topPercent = parseFloat($player.data('top-percent'));

        const left = (leftPercent / 100) * pitchWidth;
        const top = (topPercent / 100) * pitchHeight;

        $player.css({
            left: `${left}px`,
            top: `${top}px`
        });
    });
}

// Initialize player positions as percentages relative to the pitch
function initializePlayerPositions() {
    $('.player').each(function() {
        const $player = $(this);
        const left = parseFloat($player.css('left')) / $('.pitch').width() * 100;
        const top = parseFloat($player.css('top')) / $('.pitch').height() * 100;

        $player.data('left-percent', left);
        $player.data('top-percent', top);
    });

    scalePlayersToPitch();
}

// Call scalePlayersToPitch on window resize
$(window).on('resize', scalePlayersToPitch);

// Initialize player positions on document ready
$(document).ready(function() {
    initializePlayerPositions();
});

// Function to scale player positions dynamically based on pitch size
function scalePlayerPositions() {
    const $pitch = $('.pitch');
    const pitchWidth = $pitch.width();
    const pitchHeight = $pitch.height();

    $('.player').each(function() {
        const $player = $(this);
        const leftPercent = parseFloat($player.data('left-percent'));
        const topPercent = parseFloat($player.data('top-percent'));

        const left = (leftPercent / 100) * pitchWidth;
        const top = (topPercent / 100) * pitchHeight;

        $player.css({
            left: `${left}px`,
            top: `${top}px`
        });
    });
}

// Initialize player positions as percentages relative to the pitch
function initializePlayerPositions() {
    $('.player').each(function() {
        const $player = $(this);
        const left = parseFloat($player.css('left')) / $('.pitch').width() * 100;
        const top = parseFloat($player.css('top')) / $('.pitch').height() * 100;

        $player.data('left-percent', left);
        $player.data('top-percent', top);
    });

    scalePlayerPositions();
}

// Call scalePlayerPositions on window resize
$(window).on('resize', scalePlayerPositions);

// Initialize player positions on document ready
$(document).ready(function() {
    initializePlayerPositions();
});