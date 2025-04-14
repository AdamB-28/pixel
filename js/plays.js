// Sample data structure for plays - now as default plays
const defaultPlays = {
    corner: {
        name: "Rzut Rożny",
        steps: [
            {
                description: "Zawodnicy ustawiają się w polu karnym, jeden zawodnik podchodzi do rogu.",
                positions: {
                    attackers: [
                        { id: "attacker1", left: "85%", top: "10%", number: 11 }, // Corner taker
                        { id: "attacker2", left: "60%", top: "20%", number: 9 },
                        { id: "attacker3", left: "50%", top: "30%", number: 10 },
                        { id: "attacker4", left: "40%", top: "20%", number: 8 },
                        { id: "attacker5", left: "70%", top: "40%", number: 6 }
                    ],
                    defenders: [
                        { id: "defender1", left: "30%", top: "15%", number: 2 },
                        { id: "defender2", left: "35%", top: "25%", number: 5 },
                        { id: "defender3", left: "45%", top: "15%", number: 3 },
                        { id: "defender4", left: "25%", top: "30%", number: 4 },
                        { id: "defender5", left: "15%", top: "50%", number: 1 } // Goalkeeper
                    ],
                    ball: { left: "85%", top: "5%" } // Ball positioned at the corner
                }
            },
            {
                description: "Zawodnik wykonujący rzut rożny dośrodkowuje piłkę w pole karne.",
                positions: {
                    attackers: [
                        { id: "attacker1", left: "80%", top: "15%", number: 11 }, // Corner taker after kick
                        { id: "attacker2", left: "55%", top: "15%", number: 9 },
                        { id: "attacker3", left: "45%", top: "25%", number: 10 },
                        { id: "attacker4", left: "40%", top: "15%", number: 8 },
                        { id: "attacker5", left: "65%", top: "35%", number: 6 }
                    ],
                    defenders: [
                        { id: "defender1", left: "30%", top: "15%", number: 2 },
                        { id: "defender2", left: "35%", top: "20%", number: 5 },
                        { id: "defender3", left: "45%", top: "15%", number: 3 },
                        { id: "defender4", left: "25%", top: "30%", number: 4 },
                        { id: "defender5", left: "15%", top: "45%", number: 1 } // Goalkeeper moved slightly
                    ],
                    ball: { left: "75%", top: "20%" } // Ball in the air
                }
            },
            {
                description: "Napastnik strzela głową na bramkę.",
                positions: {
                    attackers: [
                        { id: "attacker1", left: "75%", top: "20%", number: 11 },
                        { id: "attacker2", left: "40%", top: "15%", number: 9 }, // Striker heading
                        { id: "attacker3", left: "45%", top: "25%", number: 10 },
                        { id: "attacker4", left: "50%", top: "35%", number: 8 },
                        { id: "attacker5", left: "60%", top: "30%", number: 6 }
                    ],
                    defenders: [
                        { id: "defender1", left: "35%", top: "20%", number: 2 },
                        { id: "defender2", left: "42%", top: "22%", number: 5 },
                        { id: "defender3", left: "48%", top: "18%", number: 3 },
                        { id: "defender4", left: "30%", top: "35%", number: 4 },
                        { id: "defender5", left: "20%", top: "40%", number: 1 } // Goalkeeper trying to save
                    ],
                    ball: { left: "45%", top: "15%" } // Ball near the goal
                }
            }
        ]
    },
    freekick: {
        name: "Rzut Wolny",
        steps: [
            {
                description: "Zawodnicy ustawiają się przed polem karnym, jeden zawodnik podchodzi do piłki.",
                positions: {
                    attackers: [
                        { id: "attacker1", left: "65%", top: "50%", number: 10 }, // Free kick taker
                        { id: "attacker2", left: "50%", top: "30%", number: 9 },
                        { id: "attacker3", left: "55%", top: "40%", number: 11 },
                        { id: "attacker4", left: "45%", top: "45%", number: 8 },
                        { id: "attacker5", left: "40%", top: "60%", number: 6 }
                    ],
                    defenders: [
                        { id: "defender1", left: "35%", top: "40%", number: 2 },
                        { id: "defender2", left: "30%", top: "45%", number: 5 },
                        { id: "defender3", left: "25%", top: "50%", number: 3 },
                        { id: "defender4", left: "20%", top: "55%", number: 4 },
                        { id: "defender5", left: "15%", top: "50%", number: 1 } // Goalkeeper
                    ],
                    ball: { left: "65%", top: "45%" } // Ball positioned for free kick
                }
            }
        ]
    }
};

// Combined plays object (will contain both default and user-created plays)
let plays = {};

// Current play state
let currentPlay = '';
let currentStep = 0;

// Function to load plays from localStorage
function loadUserPlays() {
    try {
        const savedPlays = JSON.parse(localStorage.getItem('plays') || '{}');
        return savedPlays;
    } catch (e) {
        console.error("Error loading plays from localStorage:", e);
        return {};
    }
}

// Function to merge default and user plays
function initializeAllPlays() {
    // Start with default plays
    plays = {...defaultPlays};
    
    // Add user plays from localStorage
    const userPlays = loadUserPlays();
    
    // Merge user plays (will overwrite defaults if same ID)
    Object.entries(userPlays).forEach(([id, play]) => {
        plays[id] = play;
    });
    
    return plays;
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
                
                // Aktualizuj listę
                populatePlaysMenu();
                
                // Zainicjuj pierwszą dostępną zagrywkę
                if (Object.keys(plays).length > 0) {
                    currentPlay = Object.keys(plays)[0];
                    initializePlay(currentPlay);
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
            $('.pitch.horizontal').append(`
                <div class="player attacker" id="${player.id}" 
                     style="left: ${player.left}; top: ${player.top};">${player.number}</div>
            `);
        });
    }
    
    // Dodaj broniących
    if (step.positions && step.positions.defenders) {
        step.positions.defenders.forEach(player => {
            $('.pitch.horizontal').append(`
                <div class="player defender" id="${player.id}" 
                     style="left: ${player.left}; top: ${player.top};">${player.number}</div>
        `);
        });
    }
}

// Nowa funkcja do animowania przejścia między krokami
function animateTransition(fromStep, toStep) {
    // Najpierw sprawdź, czy mamy oba kroki
    if (!fromStep.positions || !toStep.positions) {
        loadStepWithoutAnimation(toStep);
        return;
    }
    
    // Funkcja do animowania pojedynczego elementu
    function animateElement(element, fromPos, toPos) {
        // Jeśli element nie istnieje, utwórz go w pozycji początkowej
        if ($(element).length === 0) {
            $('.pitch.horizontal').append($(toPos.element).css({
                'left': fromPos.left,
                'top': fromPos.top
            }));
        }
        
        // Animuj do pozycji docelowej
        $(element).animate({
            'left': toPos.left,
            'top': toPos.top
        }, 600, 'easeInOutCubic');
    }
    
    // Wyczyść boisko
    $('.pitch.horizontal').empty();
    
    // Animuj piłkę
    if (fromStep.positions.ball && toStep.positions.ball) {
        $('.pitch.horizontal').append(`
            <div class="ball" id="game-ball" 
                 style="left: ${fromStep.positions.ball.left}; top: ${fromStep.positions.ball.top};"></div>
        `);
        
        $('#game-ball').animate({
            'left': toStep.positions.ball.left,
            'top': toStep.positions.ball.top
        }, 600, 'easeInOutCubic');
    } else {
        // Jeśli brakuje piłki w którymś kroku, po prostu pokaż ją bez animacji
        if (toStep.positions.ball) {
            $('.pitch.horizontal').append(`
                <div class="ball" id="game-ball" 
                     style="left: ${toStep.positions.ball.left}; top: ${toStep.positions.ball.top};"></div>
            `);
        }
    }
    
    // Przygotuj mapy graczy dla szybkiego wyszukiwania
    const fromAttackers = {};
    const fromDefenders = {};
    
    if (fromStep.positions.attackers) {
        fromStep.positions.attackers.forEach(player => {
            fromAttackers[player.id || player.number] = player;
        });
    }
    
    if (fromStep.positions.defenders) {
        fromStep.positions.defenders.forEach(player => {
            fromDefenders[player.id || player.number] = player;
        });
    }
    
    // Animuj atakujących
    if (toStep.positions.attackers) {
        toStep.positions.attackers.forEach(player => {
            const id = player.id || player.number;
            const fromPlayer = fromAttackers[id];
            
            if (fromPlayer) {
                // Gracz istnieje w obu krokach - animuj
                $('.pitch.horizontal').append(`
                    <div class="player attacker" id="${id}" 
                         style="left: ${fromPlayer.left}; top: ${fromPlayer.top};">${player.number}</div>
                `);
                
                $(`#${id}`).animate({
                    'left': player.left,
                    'top': player.top
                }, 600, 'easeInOutCubic');
            } else {
                // Gracz nie istniał wcześniej - po prostu dodaj go
                $('.pitch.horizontal').append(`
                    <div class="player attacker" id="${id}" 
                         style="left: ${player.left}; top: ${player.top};">${player.number}</div>
                `);
            }
        });
    }
    
    // Animuj broniących
    if (toStep.positions.defenders) {
        toStep.positions.defenders.forEach(player => {
            const id = player.id || player.number;
            const fromPlayer = fromDefenders[id];
            
            if (fromPlayer) {
                // Gracz istnieje w obu krokach - animuj
                $('.pitch.horizontal').append(`
                    <div class="player defender" id="${id}" 
                         style="left: ${fromPlayer.left}; top: ${fromPlayer.top};">${player.number}</div>
                `);
                
                $(`#${id}`).animate({
                    'left': player.left,
                    'top': player.top
                }, 600, 'easeInOutCubic');
            } else {
                // Gracz nie istniał wcześniej - po prostu dodaj go
                $('.pitch.horizontal').append(`
                    <div class="player defender" id="${id}" 
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
    }
});