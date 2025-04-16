// Sample data structure for plays - now as default plays
// const defaultPlays = {
//     corner: {
//         name: "Rzut Rożny",
//         steps: [
//             {
//                 description: "Zawodnicy ustawiają się w polu karnym, jeden zawodnik podchodzi do rogu.",
//                 positions: {
//                     attackers: [
//                         { id: "attacker1", left: "85%", top: "10%", number: 11 }, // Corner taker
//                         { id: "attacker2", left: "60%", top: "20%", number: 9 },
//                         { id: "attacker3", left: "50%", top: "30%", number: 10 },
//                         { id: "attacker4", left: "40%", top: "20%", number: 8 },
//                         { id: "attacker5", left: "70%", top: "40%", number: 6 }
//                     ],
//                     defenders: [
//                         { id: "defender1", left: "30%", top: "15%", number: 2 },
//                         { id: "defender2", left: "35%", top: "25%", number: 5 },
//                         { id: "defender3", left: "45%", top: "15%", number: 3 },
//                         { id: "defender4", left: "25%", top: "30%", number: 4 },
//                         { id: "defender5", left: "15%", top: "50%", number: 1 } // Goalkeeper
//                     ],
//                     ball: { left: "85%", top: "5%" } // Ball positioned at the corner
//                 }
//             },
//             {
//                 description: "Zawodnik wykonujący rzut rożny dośrodkowuje piłkę w pole karne.",
//                 positions: {
//                     attackers: [
//                         { id: "attacker1", left: "80%", top: "15%", number: 11 }, // Corner taker after kick
//                         { id: "attacker2", left: "55%", top: "15%", number: 9 },
//                         { id: "attacker3", left: "45%", top: "25%", number: 10 },
//                         { id: "attacker4", left: "40%", top: "15%", number: 8 },
//                         { id: "attacker5", left: "65%", top: "35%", number: 6 }
//                     ],
//                     defenders: [
//                         { id: "defender1", left: "30%", top: "15%", number: 2 },
//                         { id: "defender2", left: "35%", top: "20%", number: 5 },
//                         { id: "defender3", left: "45%", top: "15%", number: 3 },
//                         { id: "defender4", left: "25%", top: "30%", number: 4 },
//                         { id: "defender5", left: "15%", top: "45%", number: 1 } // Goalkeeper moved slightly
//                     ],
//                     ball: { left: "75%", top: "20%" } // Ball in the air
//                 }
//             },
//             {
//                 description: "Napastnik strzela głową na bramkę.",
//                 positions: {
//                     attackers: [
//                         { id: "attacker1", left: "75%", top: "20%", number: 11 },
//                         { id: "attacker2", left: "40%", top: "15%", number: 9 }, // Striker heading
//                         { id: "attacker3", left: "45%", top: "25%", number: 10 },
//                         { id: "attacker4", left: "50%", top: "35%", number: 8 },
//                         { id: "attacker5", left: "60%", top: "30%", number: 6 }
//                     ],
//                     defenders: [
//                         { id: "defender1", left: "35%", top: "20%", number: 2 },
//                         { id: "defender2", left: "42%", top: "22%", number: 5 },
//                         { id: "defender3", left: "48%", top: "18%", number: 3 },
//                         { id: "defender4", left: "30%", top: "35%", number: 4 },
//                         { id: "defender5", left: "20%", top: "40%", number: 1 } // Goalkeeper trying to save
//                     ],
//                     ball: { left: "45%", top: "15%" } // Ball near the goal
//                 }
//             }
//         ]
//     },
//     freekick: {
//         name: "Rzut Wolny",
//         steps: [
//             {
//                 description: "Zawodnicy ustawiają się przed polem karnym, jeden zawodnik podchodzi do piłki.",
//                 positions: {
//                     attackers: [
//                         { id: "attacker1", left: "65%", top: "50%", number: 10 }, // Free kick taker
//                         { id: "attacker2", left: "50%", top: "30%", number: 9 },
//                         { id: "attacker3", left: "55%", top: "40%", number: 11 },
//                         { id: "attacker4", left: "45%", top: "45%", number: 8 },
//                         { id: "attacker5", left: "40%", top: "60%", number: 6 }
//                     ],
//                     defenders: [
//                         { id: "defender1", left: "35%", top: "40%", number: 2 },
//                         { id: "defender2", left: "30%", top: "45%", number: 5 },
//                         { id: "defender3", left: "25%", top: "50%", number: 3 },
//                         { id: "defender4", left: "20%", top: "55%", number: 4 },
//                         { id: "defender5", left: "15%", top: "50%", number: 1 } // Goalkeeper
//                     ],
//                     ball: { left: "65%", top: "45%" } // Ball positioned for free kick
//                 }
//             }
//         ]
//     }
// };

// Combined plays object (will contain both default and user-created plays)
let plays = {};

// Current play state
let currentPlay = '';
let currentStep = 0;

// Ujednolicona funkcja do ładowania zagrywek
function loadUserPlays() {
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

// Poprawiona funkcja do łączenia zagrywek
function initializeAllPlays() {
    // Ponieważ defaultPlays jest zakomentowane, zaczynamy od pustego obiektu
    plays = {};
    
    // Dodaj zagrywki użytkownika z localStorage
    const userPlays = loadUserPlays();
    
    // Sprawdź, czy mamy jakieś zagrywki
    if (Object.keys(userPlays).length === 0) {
        console.log("Brak zapisanych zagrywek w localStorage");
    } else {
        console.log(`Załadowano ${Object.keys(userPlays).length} zagrywek z localStorage`);
    }
    
    // Połącz zagrywki
    plays = {...plays, ...userPlays};
    
    return plays;
}

// Aby upewnić się, że funkcje importu działają poprawnie, dodajmy funkcję debugującą
function debugPlays() {
    console.log("===== DEBUG PLAYS =====");
    console.log(`Liczba zagrywek w zmiennej plays: ${Object.keys(plays).length}`);
    console.log("IDs zagrywek:");
    Object.keys(plays).forEach(id => {
        console.log(`- ${id}: ${plays[id].name}`);
    });
    
    // Sprawdź localStorage
    try {
        const stored = JSON.parse(localStorage.getItem('plays') || '{}');
        console.log(`Liczba zagrywek w localStorage: ${Object.keys(stored).length}`);
    } catch (e) {
        console.error("Błąd podczas sprawdzania localStorage:", e);
    }
    console.log("======================");
}

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
function mergePlaysToStorage(playsToMerge) {
    try {
        // Pobierz istniejące zagrywki
        const existingPlays = loadPlaysFromStorage();
        
        // Połącz z nowymi zagrywkami (nowe nadpiszą istniejące z tymi samymi kluczami)
        const mergedPlays = {...existingPlays, ...playsToMerge};
        
        // Zapisz połączone zagrywki
        localStorage.setItem('plays', JSON.stringify(mergedPlays));
        
        return true;
    } catch (e) {
        console.error('Błąd podczas łączenia zagrywek:', e);
        return false;
    }
}

$(document).ready(function() {
    // Initialize all plays (default + user-created)
    initializeAllPlays();
    debugPlays(); // Pokaż stan po inicjalizacji
    
    // Set default play selection if none is selected
    if (!currentPlay || !plays[currentPlay]) {
        // Select first available play
        currentPlay = Object.keys(plays)[0];
    }
    
    // Populate the plays list
    populatePlaysMenu();
    
    // Initialize the first play
    initializePlay(currentPlay);
    
    // Play selection handler
    $('#plays-list').on('click', 'a', function(e) {
        e.preventDefault();
        
        // Remove active class from all plays
        $('#plays-list a').removeClass('active');
        
        // Add active class to clicked play
        $(this).addClass('active');
        
        // Update current play
        currentPlay = $(this).data('play');
        currentStep = 0;
        
        // Initialize the selected play
        initializePlay(currentPlay);
    });
    
    // Step navigation handler
    $(document).on('click', '.step-btn', function() {
        const stepIndex = $(this).data('step');
        changeStep(stepIndex);
    });
    
    // Dodaj obsługę przycisku ładowania zapisanych zagrywek
    $('#load-user-plays').on('click', function() {
        // Załaduj zapisane zagrywki
        initializeAllPlays();
        
        // Odśwież listę zagrywek
        populatePlaysMenu();
        
        // Zainicjuj pierwszą dostępną zagrywkę
        if (Object.keys(plays).length > 0) {
            currentPlay = Object.keys(plays)[0];
            initializePlay(currentPlay);
        } else {
            alert('Brak zapisanych zagrywek!');
        }
    });
    
    // Dodaj obsługę przycisku eksportu
    $('#export-plays').on('click', function() {
        console.log("Export button clicked");
        
        // Eksportujemy zarówno domyślne jak i użytkownika
        const exportPlays = plays;
        
        // Pokaż w modalu
        $('#plays-json').val(JSON.stringify(exportPlays, null, 2));
        
        // Otwórz modal
        if (typeof bootstrap !== 'undefined') {
            new bootstrap.Modal(document.getElementById('importExportModal')).show();
        } else {
            $('#importExportModal').modal('show');
        }
    });
    
    // Dodaj obsługę przycisku importu
    $('#import-plays').on('click', function() {
        try {
            const jsonText = $('#plays-json').val();
            if (!jsonText.trim()) {
                alert('Brak danych do importu. Wklej kod JSON lub wybierz plik.');
                return;
            }
            
            const importedPlays = JSON.parse(jsonText);
            
            if (Object.keys(importedPlays).length === 0) {
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
                success = mergePlaysToStorage(importedPlays);
            } else {
                // Zastępowanie - nadpisz wszystkie
                success = savePlaysToStorage(importedPlays);
            }
            
            if (success) {
                // Zaktualizuj plays z nowo zaimportowanych
                initializeAllPlays();
                debugPlays(); // Pokaż stan po imporcie
                
                // Aktualizuj listę
                populatePlaysMenu();
                
                // Zainicjuj pierwszą dostępną zagrywkę
                if (Object.keys(plays).length > 0) {
                    currentPlay = Object.keys(plays)[0];
                    initializePlay(currentPlay);
                    console.log("Zainicjalizowano zagrywkę:", currentPlay);
                } else {
                    console.error("Brak zagrywek po imporcie!");
                }
                
                alert(`Zagrywki zostały zaimportowane! Zaimportowano ${Object.keys(importedPlays).length} zagrywek.`);
                
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
    
    // Dodaj obsługę przycisku kopiowania
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
    
    // Dodaj obsługę przycisku zapisywania do pliku
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
    
    ensureConsistentPitchDisplay();
    
    $(window).on('resize', ensureConsistentPitchDisplay);
    
    // Ulepszenie animacji jQuery
    $.fx.speeds._default = 600;
    
    // Poprawne działanie animate na transform
    $.cssHooks.transform = {
        get: function(elem, computed, extra) {
            return $.css(elem, 'transform');
        },
        set: function(elem, value) {
            elem.style.transform = value;
        }
    };

    ensureConsistentPitchSize();
    $(window).on('resize', ensureConsistentPitchSize);
});

// New function to populate the plays menu
function populatePlaysMenu() {
    const $playsList = $('#plays-list');
    $playsList.empty();
    
    // Add all plays to the menu
    Object.entries(plays).forEach(([playId, play], index) => {
        const isActive = index === 0 ? 'active' : '';
        $playsList.append(`
            <a href="#" class="list-group-item list-group-item-action ${isActive}" 
               data-play="${playId}">${play.name}</a>
        `);
    });
}

function initializePlay(playId) {
    const play = plays[playId];
    
    if (!play) {
        console.error(`Play with ID ${playId} not found`);
        return;
    }
    
    // Update play name
    $('#current-play-name').text(play.name);
    
    // Generate step buttons
    const stepsNav = $('#steps-navigation');
    stepsNav.empty();
    
    play.steps.forEach((step, index) => {
        const buttonClass = index === currentStep ? 'btn-primary' : 'btn-secondary';
        stepsNav.append(`<button class="btn ${buttonClass} step-btn" data-step="${index}">Krok ${index + 1}</button>`);
    });
    
    // Display the first step
    changeStep(currentStep);
    
    // Ustaw liczniki kroków
    $('#current-step').text(1);
    $('#total-steps').text(plays[playId].steps.length);
    
    // Załaduj pierwszy krok
    currentStep = 0;
    const firstStep = plays[playId].steps[0];
    loadStepWithoutAnimation(firstStep);
}

// Aktualizacja funkcji changeStep aby dodać animację
function changeStep(stepIndex) {
    const play = plays[currentPlay];
    
    if (!play || !play.steps[stepIndex]) {
        console.error(`Step ${stepIndex} for play ${currentPlay} not found`);
        return;
    }
    
    // Zapisz poprzedni krok do animacji
    const prevStepIndex = currentStep;
    const prevStep = play.steps[prevStepIndex];
    
    // Zaktualizuj bieżący krok
    currentStep = stepIndex;
    
    // Aktualizuj przyciski kroków
    $('.step-btn').removeClass('btn-primary').addClass('btn-secondary');
    $(`.step-btn[data-step="${stepIndex}"]`).removeClass('btn-secondary').addClass('btn-primary');
    
    // Aktualizuj wyświetlanie bieżącego kroku
    $('#current-step').text(stepIndex + 1);
    $('#total-steps').text(play.steps.length);
    
    // Aktualizuj opis kroku
    const stepDescription = play.steps[stepIndex].description || "Brak opisu";
    $('#step-description-display').text(stepDescription);
    
    // Aktualizuj informację o rodzaju podania
    const isHighBall = play.steps[stepIndex].highBall === true;
    $('#high-ball-indicator').text(isHighBall ? "Górą" : "Normalne");
    if (isHighBall) {
        $('#high-ball-indicator').removeClass('bg-light').addClass('bg-warning');
    } else {
        $('#high-ball-indicator').removeClass('bg-warning').addClass('bg-light');
    }
    
    // Pobierz dane nowego kroku
    const newStep = play.steps[stepIndex];
    
    // Jeśli to pierwszy raz lub nie ma poprzedniego kroku, po prostu załaduj nowy krok bez animacji
    if (!prevStep || !prevStep.positions || Math.abs(prevStepIndex - stepIndex) > 1) {
        loadStepWithoutAnimation(newStep);
        return;
    }
    
    // Animuj przejście między krokami
    animateTransition(prevStep, newStep);
}

// Nowa funkcja do ładowania kroku bez animacji
function loadStepWithoutAnimation(step) {
    // Wyczyść boisko
    $('.pitch.horizontal').empty();
    
    // Aktualizuj opis kroku (dodaj to) - dla przypadku, gdy inicjalizacja omija changeStep
    if (step.description) {
        $('#step-description-display').text(step.description);
    } else {
        $('#step-description-display').text("Brak opisu");
    }
    
    // Aktualizuj informację o rodzaju podania
    const isHighBall = step.highBall === true;
    $('#high-ball-indicator').text(isHighBall ? "Górą" : "Normalne");
    if (isHighBall) {
        $('#high-ball-indicator').removeClass('bg-light').addClass('bg-warning');
    } else {
        $('#high-ball-indicator').removeClass('bg-warning').addClass('bg-light');
    }
    
    // Dodaj piłkę
    if (step.positions && step.positions.ball) {
        $('.pitch.horizontal').append(`
            <div class="ball" id="game-ball" 
                 style="left: ${step.positions.ball.left}; top: ${step.positions.ball.top};"></div>
        `);
    }
    
    // Dodaj atakujących
    if (step.positions && step.positions.attackers) {
        step.positions.attackers.forEach(player => {
            // Dodaj klasę goalkeeper dla bramkarza (numer 1)
            const isGoalkeeper = (player.number === 1) ? 'goalkeeper' : '';
            
            $('.pitch.horizontal').append(`
                <div class="player attacker ${isGoalkeeper}" id="${player.id}" 
                     style="left: ${player.left}; top: ${player.top};">${player.number}</div>
            `);
        });
    }
    
    // Dodaj broniących
    if (step.positions && step.positions.defenders) {
        step.positions.defenders.forEach(player => {
            // Dodaj klasę goalkeeper dla bramkarza (numer 1)
            const isGoalkeeper = (player.number === 1) ? 'goalkeeper' : '';
            
            $('.pitch.horizontal').append(`
                <div class="player defender ${isGoalkeeper}" id="${player.id}" 
                     style="left: ${player.left}; top: ${player.top};">${player.number}</div>
            `);
        });
    }
}

// Użyj tej zoptymalizowanej wersji funkcji animateTransition
function animateTransition(fromStep, toStep) {
    // Wyczyść boisko
    $('.pitch.horizontal').empty();
    
    // Sprawdź, czy podanie ma być górą
    const isHighBall = toStep.highBall === true;
    
    // Przygotuj mapy graczy dla szybkiego wyszukiwania
    const fromAttackers = {};
    const fromDefenders = {};
    
    if (fromStep.positions.attackers) {
        fromStep.positions.attackers.forEach(player => {
            const key = player.id || 'a' + player.number;
            fromAttackers[key] = player;
        });
    }
    
    if (fromStep.positions.defenders) {
        fromStep.positions.defenders.forEach(player => {
            const key = player.id || 'd' + player.number;
            fromDefenders[key] = player;
        });
    }
    
    // Poprawiona animacja piłki
    if (fromStep.positions.ball && toStep.positions.ball) {
        if (isHighBall) {
            // Tworzymy kontener dla piłki
            const $ballContainer = $('<div class="ball-container"></div>').css({
                left: fromStep.positions.ball.left,
                top: fromStep.positions.ball.top
            });
            
            // Dodajemy piłkę do kontenera z klasą animacji
            $ballContainer.append('<div class="ball high-ball"></div>');
            $('.pitch.horizontal').append($ballContainer);
            
            // Zapisz docelową pozycję do wykorzystania w callbacku
            const targetLeft = toStep.positions.ball.left;
            const targetTop = toStep.positions.ball.top;
            
            // Animujemy kontener liniowo
            $ballContainer.animate({
                left: targetLeft,
                top: targetTop
            }, {
                duration: 1000,
                easing: 'linear',
                queue: false,
                // Dodaj callback po zakończeniu animacji
                complete: function() {
                    // Usuń kontener z animacją
                    $ballContainer.remove();
                    
                    // Dodaj piłkę bezpośrednio do boiska w docelowej pozycji
                    $('.pitch.horizontal').append(`
                        <div class="ball" id="game-ball" 
                             style="left: ${targetLeft}; top: ${targetTop};"></div>
                    `);
                }
            });
        } else {
            // Pozostała część kodu dla zwykłego podania bez zmian
            $('.pitch.horizontal').append(`
                <div class="ball" id="game-ball" 
                     style="left: ${fromStep.positions.ball.left}; top: ${fromStep.positions.ball.top};"></div>
            `);
            
            $('#game-ball').animate({
                left: toStep.positions.ball.left,
                top: toStep.positions.ball.top
            }, {
                duration: 600,
                easing: 'linear',
                queue: false
            });
        }
    }
    
    // Animuj atakujących z ulepszeniami
    if (toStep.positions.attackers) {
        toStep.positions.attackers.forEach(player => {
            const key = player.id || 'a' + player.number;
            const safeId = 'player_' + key.replace(/[^a-zA-Z0-9]/g, '_');
            const fromPlayer = fromAttackers[key];
            
            // Dodaj klasę goalkeeper dla bramkarza (numer 1)
            const isGoalkeeper = (player.number === 1) ? 'goalkeeper' : '';
            
            if (fromPlayer) {
                // Dodaj gracza w pozycji początkowej
                $('.pitch.horizontal').append(`
                    <div class="player attacker ${isGoalkeeper}" id="${safeId}" 
                         style="left: ${fromPlayer.left}; top: ${fromPlayer.top};">${player.number}</div>
                `);
                
                // Utwórz obiekt opcji animacji
                const animOptions = {
                    duration: 600,
                    easing: 'linear',   // Stała prędkość
                    queue: false,       // Nie dodawaj do kolejki
                    complete: function() {
                        $(this).css('transform', 'translate(-50%, -50%)');  // Upewnij się, że transform zostanie zachowany
                    }
                };
                
                // Zastosuj małe losowe opóźnienie
                setTimeout(() => {
                    // Użyj requestAnimationFrame dla lepszej wydajności
                    requestAnimationFrame(() => {
                        $(`#${safeId}`).animate({
                            left: player.left,
                            top: player.top
                        }, animOptions);
                    });
                }, Math.random() * 100);
            } else {
                // Gracz nie istniał wcześniej - po prostu go dodaj
                $('.pitch.horizontal').append(`
                    <div class="player attacker ${isGoalkeeper}" id="${safeId}" 
                         style="left: ${player.left}; top: ${player.top};">${player.number}</div>
                `);
            }
        });
    }
    
    // Zastosuj tę samą technikę dla obrońców
    if (toStep.positions.defenders) {
        toStep.positions.defenders.forEach(player => {
            const key = player.id || 'd' + player.number;
            const safeId = 'player_' + key.replace(/[^a-zA-Z0-9]/g, '_');
            const fromPlayer = fromDefenders[key];
            
            // Dodaj klasę goalkeeper dla bramkarza (numer 1)
            const isGoalkeeper = (player.number === 1) ? 'goalkeeper' : '';
            
            if (fromPlayer) {
                // Dodaj gracza w pozycji początkowej
                $('.pitch.horizontal').append(`
                    <div class="player defender ${isGoalkeeper}" id="${safeId}" 
                         style="left: ${fromPlayer.left}; top: ${fromPlayer.top};">${player.number}</div>
                `);
                
                // Utwórz obiekt opcji animacji
                const animOptions = {
                    duration: 600,
                    easing: 'linear',   // Stała prędkość
                    queue: false,       // Nie dodawaj do kolejki
                    complete: function() {
                        $(this).css('transform', 'translate(-50%, -50%)');  // Upewnij się, że transform zostanie zachowany
                    }
                };
                
                // Zastosuj małe losowe opóźnienie
                setTimeout(() => {
                    // Użyj requestAnimationFrame dla lepszej wydajności
                    requestAnimationFrame(() => {
                        $(`#${safeId}`).animate({
                            left: player.left,
                            top: player.top
                        }, animOptions);
                    });
                }, Math.random() * 100);
            } else {
                // Gracz nie istniał wcześniej - po prostu go dodaj
                $('.pitch.horizontal').append(`
                    <div class="player defender ${isGoalkeeper}" id="${safeId}" 
                         style="left: ${player.left}; top: ${player.top};">${player.number}</div>
                `);
            }
        });
    }
}

// Dodajmy dodatkową funkcję easing dla animacji
$.extend($.easing, {
    easeInOutCubic: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t + b;
        return c/2*((t-=2)*t*t + 2) + b;
    },
    easeOutBack: function (x, t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
    }
});

// Dodaj na końcu pliku plays.js i builder.js
function ensureConsistentPitchDisplay() {
    // Usuń min-height z tactical-board, które może powodować problemy
    $('.tactical-board.horizontal').css('min-height', '0');
    
    // Upewnij się, że boisko jest wyrównane do góry
    $('.pitch.horizontal').css('background-position', 'top center');
    
    // Upewnij się, że proportions są zachowane
    const width = $('.tactical-board.horizontal').width();
    const height = width * (2/3); // proporcja 3:2
    
    // Ustaw padding-top zamiast height dla zachowania proporcji
    $('.tactical-board.horizontal').css('padding-top', `${height}px`);
}

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

// Ensure players maintain their positions relative to the pitch image
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

// Initialize player positions as percentages relative to the pitch image
function initializePlayerPositions() {
    const $pitch = $('.pitch');
    const pitchWidth = $pitch.width();
    const pitchHeight = $pitch.height();

    $('.player').each(function() {
        const $player = $(this);
        const left = parseFloat($player.css('left')) / pitchWidth * 100;
        const top = parseFloat($player.css('top')) / pitchHeight * 100;

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

// Call this function on document ready and window resize
$(document).ready(function() {
    ensureConsistentPitchSize();
    $(window).on('resize', ensureConsistentPitchSize);
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

// Adjust player and ball positions dynamically based on pitch size
function scaleElementsToPitch() {
    const $pitch = $('.pitch');
    const pitchWidth = $pitch.width();
    const pitchHeight = $pitch.height();

    // Scale players
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

    // Scale ball
    const $ball = $('.ball');
    if ($ball.length) {
        const ballLeftPercent = parseFloat($ball.data('left-percent'));
        const ballTopPercent = parseFloat($ball.data('top-percent'));

        const ballLeft = (ballLeftPercent / 100) * pitchWidth;
        const ballTop = (ballTopPercent / 100) * pitchHeight;

        $ball.css({
            left: `${ballLeft}px`,
            top: `${ballTop}px`
        });
    }
}

// Initialize positions as percentages relative to the pitch
function initializeElementPositions() {
    const $pitch = $('.pitch');
    const pitchWidth = $pitch.width();
    const pitchHeight = $pitch.height();

    // Initialize players
    $('.player').each(function() {
        const $player = $(this);
        const left = parseFloat($player.css('left')) / pitchWidth * 100;
        const top = parseFloat($player.css('top')) / pitchHeight * 100;

        $player.data('left-percent', left);
        $player.data('top-percent', top);
    });

    // Initialize ball
    const $ball = $('.ball');
    if ($ball.length) {
        const ballLeft = parseFloat($ball.css('left')) / pitchWidth * 100;
        const ballTop = parseFloat($ball.css('top')) / pitchHeight * 100;

        $ball.data('left-percent', ballLeft);
        $ball.data('top-percent', ballTop);
    }

    scaleElementsToPitch();
}

// Save positions in percentages
function savePositionsInPercentages() {
    const $pitch = $('.pitch');
    const pitchWidth = $pitch.width();
    const pitchHeight = $pitch.height();

    // Save player positions
    $('.player').each(function() {
        const $player = $(this);
        const left = parseFloat($player.css('left')) / pitchWidth * 100;
        const top = parseFloat($player.css('top')) / pitchHeight * 100;

        $player.data('left-percent', left);
        $player.data('top-percent', top);
    });

    // Save ball position
    const $ball = $('.ball');
    if ($ball.length) {
        const ballLeft = parseFloat($ball.css('left')) / pitchWidth * 100;
        const ballTop = parseFloat($ball.css('top')) / pitchHeight * 100;

        $ball.data('left-percent', ballLeft);
        $ball.data('top-percent', ballTop);
    }
}

// Call scaleElementsToPitch on window resize
$(window).on('resize', scaleElementsToPitch);

// Initialize positions on document ready
$(document).ready(function() {
    initializeElementPositions();

    // Save positions in percentages whenever they are updated
    $(document).on('dragstop', '.player, .ball', savePositionsInPercentages);
});

// Automatically load the first step of the first play on page load
$(document).ready(function() {
    if (Object.keys(plays).length > 0) {
        const firstPlayId = Object.keys(plays)[0];
        currentPlay = firstPlayId;
        initializePlay(firstPlayId);
        changeStep(0); // Load the first step of the first play

        // Highlight the first play in the list
        $(`#plays-list a[data-play="${firstPlayId}"]`).addClass('active');
    }
});