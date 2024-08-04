document.addEventListener('DOMContentLoaded', () => {
    const validCredentials = {
        username: '1',
        password: '1'
    };

    const loginForm = document.getElementById('login-form');
    const loginScreen = document.getElementById('login-screen');
    const mainScreen = document.getElementById('main-screen');
    const loginError = document.getElementById('login-error');

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === validCredentials.username && password === validCredentials.password) {
            loginScreen.classList.add('hidden');
            mainScreen.classList.remove('hidden');
        } else {
            loginError.classList.remove('hidden');
        }
    });

    mainScreen.classList.add('hidden');
});

document.getElementById('create-match-btn').addEventListener('click', () => {
    document.getElementById('main-screen').classList.add('hidden');
    document.getElementById('set-selection-screen').classList.remove('hidden');
});

document.getElementById('create-match-main-btn').addEventListener('click', () => {
    document.getElementById('match-screen').classList.add('hidden');
    document.getElementById('set-selection-screen').classList.remove('hidden');
  });

document.getElementById('three-sets-btn').addEventListener('click', () => {
    startMatch(3);
});

document.getElementById('five-sets-btn').addEventListener('click', () => {
    startMatch(5);
});


// Add an event listener to the new button
document.getElementById('print-download-btn').addEventListener('click', () => {
    // Get the entire HTML content of the page
    const htmlContent = document.documentElement.outerHTML;

    // Create a new window with the HTML content
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write(`
      <html>
        <head>
          <title>Game Stats</title>
          <style>
            body {
              font-family: Arial, sans-serif;
            }
          </style>
        </head>
        <body>
          ${htmlContent}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
});



function startMatch(sets) {
    document.getElementById('set-selection-screen').classList.add('hidden');
    document.getElementById('match-screen').classList.remove('hidden');

    let currentSet = 1;
    let player1Sets = 0;
    let player2Sets = 0;
    let currentGame = 1;
    let player1Score = 0;
    let player2Score = 0;
    let player1Games = 0;
    let player2Games = 0;
    let player1Overtime = 0;
    let player2Overtime = 0;
    let overtime = false;
    let stats = [];

    document.getElementById('set-counter').textContent = `${player1Sets}-${player2Sets}`;
    document.getElementById('current-game').textContent = currentGame;
    document.getElementById('player1-score').textContent = player1Score;
    document.getElementById('player2-score').textContent = player2Score;
    document.getElementById('game-counter').textContent = `${player1Games}-${player2Games}`;



    document.querySelectorAll('.action-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const player = event.target.getAttribute('data-player');
            const action = event.target.getAttribute('data-action');
            showDetailsScreen(player, action);
        });
    });

    function showDetailsScreen(player, action) {
        document.getElementById('match-screen').classList.add('hidden');
        document.getElementById('details-screen').classList.remove('hidden');
        document.querySelectorAll('.side-btn').forEach(button => {
            button.setAttribute('data-player', player);
            button.setAttribute('data-action', action);
        });
        document.getElementById('details-options').classList.remove('hidden');
        document.getElementById('direction-options').classList.add('hidden');
        document.getElementById('outcome-options').classList.add('hidden'); // Reset visibility
    }

    document.querySelectorAll('.side-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const side = event.target.getAttribute('data-side');
            const player = event.target.getAttribute('data-player');
            const action = event.target.getAttribute('data-action');
            showDirectionOptions(player, action, side);
        });
    });

    function showDirectionOptions(player, action, side) {
        document.getElementById('details-options').classList.add('hidden');
        document.getElementById('direction-options').classList.remove('hidden');
        document.querySelectorAll('.direction-btn').forEach(button => {
            button.setAttribute('data-player', player);
            button.setAttribute('data-action', action);
            button.setAttribute('data-side', side);
        });
        document.getElementById('outcome-options').classList.add('hidden'); // Reset visibility
    }

    document.querySelectorAll('.direction-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const side = event.target.getAttribute('data-side');
            const player = event.target.getAttribute('data-player');
            const action = event.target.getAttribute('data-action');
            const direction = event.target.getAttribute('data-direction');
            showOutcomeOptions(player, action, side, direction);
        });
    });

    function showOutcomeOptions(player, action, side, direction) {
        document.getElementById('direction-options').classList.add('hidden');
        document.getElementById('outcome-options').classList.remove('hidden');
        document.querySelectorAll('.outcome-btn').forEach(button => {
            button.setAttribute('data-player', player);
            button.setAttribute('data-action', action);
            button.setAttribute('data-side', side);
            button.setAttribute('data-direction', direction);
        });
    }

    document.querySelectorAll('.outcome-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const outcome = event.target.getAttribute('data-outcome');
            const player = button.getAttribute('data-player');
            const action = button.getAttribute('data-action');
            const side = button.getAttribute('data-side');
            const direction = button.getAttribute('data-direction');
            stats.push({
                player,
                action,
                side,
                outcome,
                direction
            });
            document.getElementById('details-screen').classList.add('hidden');
            document.getElementById('match-screen').classList.remove('hidden');
            updateScore(player, action, side, outcome, direction);
        });
    });


    document.querySelectorAll('.serve-action-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const player = event.target.getAttribute('data-player');
            const action = event.target.getAttribute('data-action');
            showServeDetailsScreen(player, action);
        });
    });

    function showServeDetailsScreen(player, action) {
        document.getElementById('match-screen').classList.add('hidden');
        document.getElementById('serve-detail-screen').classList.remove('hidden');
        document.querySelectorAll('.serve-num-btn').forEach(button => {
            button.setAttribute('data-player', player);
            button.setAttribute('data-action', action);
        });
        document.getElementById('serve-details-options').classList.remove('hidden');
        document.getElementById('serve-direction-options').classList.add('hidden');
        document.getElementById('serve-outcome-options').classList.add('hidden');
    }

    document.querySelectorAll('.serve-num-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const side = event.target.getAttribute('data-side');
            const player = event.target.getAttribute('data-player');
            const action = event.target.getAttribute('data-action');
            showServeDirectionOptions(player, action, side);
        });
    });

    function showServeDirectionOptions(player, action, side) {
        document.getElementById('serve-details-options').classList.add('hidden');
        document.getElementById('serve-direction-options').classList.remove('hidden');
        document.querySelectorAll('.serve-direction-btn').forEach(button => {
            button.setAttribute('data-player', player);
            button.setAttribute('data-action', action);
            button.setAttribute('data-side', side);
        });
        document.getElementById('serve-outcome-options').classList.add('hidden');
    }

    document.querySelectorAll('.serve-direction-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const side = event.target.getAttribute('data-side');
            const player = event.target.getAttribute('data-player');
            const action = event.target.getAttribute('data-action');
            const direction = event.target.getAttribute('data-direction');
            showServeOutcomeOptions(player, action, side, direction);
        });
    });

    function showServeOutcomeOptions(player, action, side, direction) {
        document.getElementById('serve-direction-options').classList.add('hidden');
        document.getElementById('serve-outcome-options').classList.remove('hidden');
        document.querySelectorAll('.serve-outcome-btn').forEach(button => {
            button.setAttribute('data-player', player);
            button.setAttribute('data-action', action);
            button.setAttribute('data-side', side);
            button.setAttribute('data-direction', direction);
        });
    }

    document.querySelectorAll('.serve-outcome-btn').forEach(button => {
        button.addEventListener('click', (event) => {
            const outcome = event.target.getAttribute('data-outcome');
            const player = button.getAttribute('data-player');
            const action = button.getAttribute('data-action');
            const side = button.getAttribute('data-side');
            const direction = button.getAttribute('data-direction');
            stats.push({
                player,
                action,
                side,
                outcome,
                direction
            });
            document.getElementById('serve-detail-screen').classList.add('hidden');
            document.getElementById('match-screen').classList.remove('hidden');
            updateScore(player, action, side, outcome, direction);
        });
    });




    document.getElementById('game-stats-btn').addEventListener('click', () => {
        showStats();
    });

    document.getElementById('back-to-match-btn').addEventListener('click', () => {
        document.getElementById('stats-screen').classList.add('hidden');
        document.getElementById('match-screen').classList.remove('hidden');
    });


    let currentServer = '1'; // '1' for Player 1, '2' for Player 2

    function toggleServer() {
        currentServer = (currentServer === '1') ? '2' : '1';
        updateServerDisplay();
    }
    
    function updateServerDisplay() {
        const serverDisplay = document.getElementById('server-display');
        if (serverDisplay) {
            serverDisplay.textContent = `Current Server: Player ${currentServer}`;
        }
    }
    // Set up event listener for the toggle server button
    document.getElementById('toggle-server-btn').addEventListener('click', toggleServer);

    // Initialize server display
    document.addEventListener('DOMContentLoaded', updateServerDisplay);
    
    // Set up event listener for the toggle server button
    document.getElementById('toggle-server-btn').addEventListener('click', toggleServer);
    
    // Initialize server display
    document.addEventListener('DOMContentLoaded', updateServerDisplay);
    

    function updateScore(player, action, side, outcome, direction) {
        if (overtime) {
            if (player === '1') {
                player1Overtime++;
            } else {
                player2Overtime++;
            }

            if (Math.abs(player1Overtime - player2Overtime) >= 2) {
                endGame(player);
            }
        } else {
            if (player === '1') {
                player1Score = nextScore(player1Score);
            } else {
                player2Score = nextScore(player2Score);
            }

            if (player1Score === 40 && player2Score === 40) {
                overtime = true;
                player1Overtime = 0;
                player2Overtime = 0;
            } else if (player1Score >= 50 || player2Score >= 50) {
                endGame(player);
            }
        }

        document.getElementById('player1-score').textContent = player1Score >= 40 ? '40 (' + player1Overtime + ')' : player1Score;
        document.getElementById('player2-score').textContent = player2Score >= 40 ? '40 (' + player2Overtime + ')' : player2Score;
    }

    function nextScore(currentScore) {
        if (currentScore === 0) return 15;
        if (currentScore === 15) return 30;
        if (currentScore === 30) return 40;
        return currentScore + 10; // Handling 50+ scores
    }

    function endGame(winner) {
        if (winner === '1') {
            player1Games++;
            toggleServer()
        } else {
            player2Games++;
            toggleServer()
        }

        currentGame++;
        player1Score = 0;
        player2Score = 0;
        player1Overtime = 0;
        player2Overtime = 0;
        overtime = false;



        if (player1Games >= 6 && player1Games - player2Games >= 2) {
            // Player 1 wins the set
            player1Sets++;
            currentSet++;
            tiebreak = false;
            player1Games = 0;
            player2Games = 0;
            currentGame = 0;

        } else if (player2Games >= 6 && player2Games - player1Games >= 2) {
            // Player 2 wins the set
            player2Sets++;
            currentSet++;
            tiebreak = false;
            player1Games = 0;
            player2Games = 0;
            currentGame = 0;
        } else if (player1Games === 5 && player2Games === 5) {
            // Handle the case of 5-5, if this is the case you should decide to play a tiebreak
            tiebreak = true;
        } else if (player1Games === 6 && player2Games === 6 && tiebreak) {
            // Tiebreak set logic
            if (player1Games - player2Games >= 2) {
                player1Sets++;
                player1Games = 0;
                player2Games = 0;
                currentGame = 0;
                currentSet++;
                tiebreak = false;
            } else if (player2Games - player1Games >= 2) {
                player2Sets++;
                player1Games = 0;
                player2Games = 0;
                currentGame = 0;
                currentSet++;
                tiebreak = false;
            }
        }
    
    

        document.getElementById('set-counter').textContent = `${player1Sets}-${player2Sets}`;
        document.getElementById('current-game').textContent = currentGame;
        document.getElementById('player1-score').textContent = player1Score;
        document.getElementById('player2-score').textContent = player2Score;
        document.getElementById('game-counter').textContent = `${player1Games}-${player2Games}`;
        if (sets === 3) {
            if (player1Sets === 2) {
                alert('Player 1 Won')
                window.location.href = 'offical index.html';
            } else if (player2Sets === 2) {
                alert('Player 2 Won')
                window.location.href = 'offical index.html';

            } else if (player1Sets === 3 && player2Sets === 1) {
                alert("Player 1 Won")
                window.location.href = 'offical index.html';

            } else if (player2Sets === 3 && player1Sets === 1) {
                alert('Player 2 Won')
                window.location.href = 'offical index.html';

            }

        }

        if (sets === 5) {
            if (player1Sets === 3) {
                alert('Player 1 Won')
                window.location.href = 'offical index.html';
            } else if (player2Sets === 3) {
                alert('Player 2 Won')
                window.location.href = 'offical index.html';

            } else if (player1sets === 5 && player2Sets === 2) {
                alert("Player 1 Won")
                window.location.href = 'offical index.html';

            } else if (player2Sets === 5 && player1Sets === 2) {
                alert('Player 2 Won')
                window.location.href = 'offical index.html';

            }

        }

    }
    //forehand rally
    let p1forehandrallyfadewinner = 0;
    let p1forehandrallyfadeunforcederror = 0;
    let p1forehandrallyfadeforcederror = 0

    let p1forehandrallydrawwinner = 0;
    let p1forehandrallydrawunforcederror = 0;
    let p1forehandrallydrawforcederror = 0


    //backhand rally
    let p1backhandrallyfadewinner = 0
    let p1backhandrallyfadeunforcederror = 0
    let p1backhandrallyfadeforcederror = 0

    let p1backhandrallydrawwinner = 0
    let p1backhandrallydrawunforcederror = 0
    let p1backhandrallydrawforcederror = 0



    //forehand mid ct attack 
    let p1forehandmidfadewinner = 0
    let p1forehandmidfadeunforcederror = 0
    let p1forehandmidfadeforcederror = 0

    let p1forehandmiddrawwinner = 0
    let p1forehandmiddrawunforcederror = 0
    let p1forehandmiddrawforcederror = 0



    //backhand mid ct attack
    let p1backhandmidfadewinner = 0
    let p1backhandmidfadeunforcederror = 0
    let p1backhandmidfadeforcederror = 0

    let p1backhandmiddrawwinner = 0
    let p1backhandmiddrawunforcederror = 0
    let p1backhandmiddrawforcederror = 0




    //1st serve
    let p1firstservefadewinner = 0
    let p1firstservefadeunforcederror = 0
    let p1firstservefadeforcederror = 0

    let p1firstservedrawwinner = 0
    let p1firstservedrawunforcederror = 0
    let p1firstservedrawforcederror = 0


    //2nd serve
    let p1secondservefadewinner = 0
    let p1secondservefadeunforcederror = 0
    let p1secondservefadeforcederror = 0

    let p1secondservedrawwinner = 0
    let p1secondservedrawunforcederror = 0
    let p1secondservedrawforcederror = 0




    //1st return
    let p1firstreturnfadewinner = 0
    let p1firstreturnfadeunforcederror = 0
    let p1firstreturnfadeforcederror = 0

    let p1firstreturndrawwinner = 0
    let p1firstreturndrawunforcederror = 0
    let p1firstreturndrawforcederror = 0
    //2nd return
    let p1secondreturnfadewinner = 0
    let p1secondreturnfadeunforcederror = 0
    let p1secondreturnfadeforcederror = 0

    let p1secondreturndrawwinner = 0
    let p1secondreturndrawunforcederror = 0
    let p1secondreturndrawforcederror = 0


    //forehand rally
    let p2forehandrallyfadewinner = 0;
    let p2forehandrallyfadeunforcederror = 0;
    let p2forehandrallyfadeforcederror = 0;

    let p2forehandrallydrawwinner = 0;
    let p2forehandrallydrawunforcederror = 0;
    let p2forehandrallydrawforcederror = 0;


    //backhand rally
    let p2backhandrallyfadewinner = 0;
    let p2backhandrallyfadeunforcederror = 0;
    let p2backhandrallyfadeforcederror = 0;

    let p2backhandrallydrawwinner = 0;
    let p2backhandrallydrawunforcederror = 0;
    let p2backhandrallydrawforcederror = 0;


    //forehand mid ct attack 
    let p2forehandmidfadewinner = 0;
    let p2forehandmidfadeunforcederror = 0;
    let p2forehandmidfadeforcederror = 0;

    let p2forehandmiddrawwinner = 0;
    let p2forehandmiddrawunforcederror = 0;
    let p2forehandmiddrawforcederror = 0;


    //backhand mid ct attack
    let p2backhandmidfadewinner = 0;
    let p2backhandmidfadeunforcederror = 0;
    let p2backhandmidfadeforcederror = 0;

    let p2backhandmiddrawwinner = 0;
    let p2backhandmiddrawunforcederror = 0;
    let p2backhandmiddrawforcederror = 0;


    //1st serve
    let p2firstservefadewinner = 0;
    let p2firstservefadeunforcederror = 0;
    let p2firstservefadeforcederror = 0;

    let p2firstservedrawwinner = 0;
    let p2firstservedrawunforcederror = 0;
    let p2firstservedrawforcederror = 0;


    //2nd serve
    let p2secondservefadewinner = 0;
    let p2secondservefadeunforcederror = 0;
    let p2secondservefadeforcederror = 0;

    let p2secondservedrawwinner = 0;
    let p2secondservedrawunforcederror = 0;
    let p2secondservedrawforcederror = 0;


    //1st return
    let p2firstreturnfadewinner = 0;
    let p2firstreturnfadeunforcederror = 0;
    let p2firstreturnfadeforcederror = 0;

    let p2firstreturndrawwinner = 0;
    let p2firstreturndrawunforcederror = 0;
    let p2firstreturndrawforcederror = 0;


    //2nd return
    let p2secondreturnfadewinner = 0;
    let p2secondreturnfadeunforcederror = 0;
    let p2secondreturnfadeforcederror = 0;

    let p2secondreturndrawwinner = 0;
    let p2secondreturndrawunforcederror = 0;
    let p2secondreturndrawforcederror = 0;



    let lastProcessedIndex = 0;

    function showStats() {
        //forehand rally
        document.getElementById('p1-forehand-rally-fade-winner').textContent = p1forehandrallyfadewinner;
        document.getElementById('p1-forehand-rally-fade-unforced-error').textContent = p1forehandrallyfadeunforcederror;
        document.getElementById('p1-forehand-rally-fade-forced-error').textContent = p1forehandrallyfadeforcederror

        document.getElementById('p1-forehand-rally-draw-winner').textContent = p1forehandrallydrawwinner
        document.getElementById('p1-forehand-rally-draw-unforced-error').textContent = p1forehandrallydrawunforcederror
        document.getElementById('p1-forehand-rally-draw-forced-error').textContent = p1forehandrallydrawforcederror

        //backhand rally

        document.getElementById('p1-backhand-rally-fade-winner').textContent = p1backhandrallyfadewinner;
        document.getElementById('p1-backhand-rally-fade-unforced-error').textContent = p1backhandrallyfadeunforcederror;
        document.getElementById('p1-backhand-rally-fade-forced-error').textContent = p1backhandrallyfadeforcederror

        document.getElementById('p1-backhand-rally-draw-winner').textContent = p1backhandrallydrawwinner
        document.getElementById('p1-backhand-rally-draw-unforced-error').textContent = p1backhandrallydrawunforcederror
        document.getElementById('p1-backhand-rally-draw-forced-error').textContent = p1backhandrallydrawforcederror



        //forehand mid
        document.getElementById('p1-forehand-mid-ct-fade-winner').textContent = p1forehandmidfadewinner
        document.getElementById('p1-forehand-mid-ct-fade-unforced-error').textContent = p1forehandmidfadeunforcederror
        document.getElementById('p1-forehand-mid-ct-fade-forced-error').textContent = p1forehandmidfadeforcederror

        document.getElementById('p1-forehand-mid-ct-draw-winner').textContent = p1forehandmiddrawwinner
        document.getElementById('p1-forehand-mid-ct-draw-unforced-error').textContent = p1forehandmiddrawunforcederror
        document.getElementById('p1-forehand-mid-ct-draw-forced-error').textContent = p1forehandmiddrawforcederror




        document.getElementById('p1-backhand-mid-ct-fade-winner').textContent = p1backhandmidfadewinner
        document.getElementById('p1-backhand-mid-ct-fade-unforced-error').textContent = p1backhandmidfadeunforcederror
        document.getElementById('p1-backhand-mid-ct-fade-forced-error').textContent = p1backhandmidfadeforcederror

        document.getElementById('p1-backhand-mid-ct-draw-winner').textContent = p1backhandmiddrawwinner
        document.getElementById('p1-backhand-mid-ct-draw-unforced-error').textContent = p1backhandmiddrawunforcederror
        document.getElementById('p1-backhand-mid-ct-draw-forced-error').textContent = p1backhandmiddrawforcederror




        //1st serve
        document.getElementById('p1-first-serve-fade-winner').textContent = p1firstservefadewinner
        document.getElementById('p1-first-serve-fade-unforced-error').textContent = p1firstservefadeunforcederror
        document.getElementById('p1-first-serve-fade-forced-error').textContent = p1firstservefadeforcederror


        document.getElementById('p1-first-serve-draw-winner').textContent = p1firstservedrawwinner
        document.getElementById('p1-first-serve-draw-unforced-error').textContent = p1firstservedrawunforcederror
        document.getElementById('p1-first-serve-draw-forced-error').textContent = p1firstservedrawforcederror




        //2nd serve
        document.getElementById('p1-second-serve-fade-winner').textContent = p1secondservefadewinner
        document.getElementById('p1-second-serve-fade-unforced-error').textContent = p1secondservefadeunforcederror
        document.getElementById('p1-second-serve-fade-forced-error').textContent = p1secondservefadeforcederror

        document.getElementById('p1-second-serve-draw-winner').textContent = p1secondservedrawwinner
        document.getElementById('p1-second-serve-draw-unforced-error').textContent = p1secondservedrawunforcederror
        document.getElementById('p1-second-serve-draw-forced-error').textContent = p1secondservedrawforcederror






        //1st return
        document.getElementById('p1-first-return-fade-winner').textContent = p1firstreturnfadewinner
        document.getElementById('p1-first-return-fade-unforced-error').textContent = p1firstreturnfadeunforcederror
        document.getElementById('p1-first-reture-fade-forced-error').textContent = p1firstreturnfadeforcederror

        document.getElementById('p1-first-return-draw-winner').textContent = p1firstreturndrawwinner
        document.getElementById('p1-first-return-draw-unforced-error').textContent = p1firstreturndrawunforcederror
        document.getElementById('p1-first-reture-draw-forced-error').textContent = p1firstreturndrawforcederror
        //2nd return
        document.getElementById('p1-second-return-fade-winner').textContent = p1secondreturnfadewinner
        document.getElementById('p1-second-return-fade-unforced-error').textContent = p1secondreturnfadeunforcederror
        document.getElementById('p1-second-return-fade-forced-error').textContent = p1secondreturnfadeforcederror

        document.getElementById('p1-second-return-draw-winner').textContent = p1secondreturndrawwinner
        document.getElementById('p1-second-return-draw-unforced-error').textContent = p1secondreturndrawunforcederror
        document.getElementById('p1-second-return-draw-forced-error').textContent = p1secondreturndrawforcederror

        document.getElementById('p2-forehand-rally-fade-winner').textContent = p2forehandrallyfadewinner;
        document.getElementById('p2-forehand-rally-fade-unforced-error').textContent = p2forehandrallyfadeunforcederror;
        document.getElementById('p2-forehand-rally-fade-forced-error').textContent = p2forehandrallyfadeforcederror;

        document.getElementById('p2-forehand-rally-draw-winner').textContent = p2forehandrallydrawwinner;
        document.getElementById('p2-forehand-rally-draw-unforced-error').textContent = p2forehandrallydrawunforcederror;
        document.getElementById('p2-forehand-rally-draw-forced-error').textContent = p2forehandrallydrawforcederror;

        //backhand rally
        document.getElementById('p2-backhand-rally-fade-winner').textContent = p2backhandrallyfadewinner;
        document.getElementById('p2-backhand-rally-fade-unforced-error').textContent = p2backhandrallyfadeunforcederror;
        document.getElementById('p2-backhand-rally-fade-forced-error').textContent = p2backhandrallyfadeforcederror;

        document.getElementById('p2-backhand-rally-draw-winner').textContent = p2backhandrallydrawwinner;
        document.getElementById('p2-backhand-rally-draw-unforced-error').textContent = p2backhandrallydrawunforcederror;
        document.getElementById('p2-backhand-rally-draw-forced-error').textContent = p2backhandrallydrawforcederror;

        //forehand mid
        document.getElementById('p2-forehand-mid-ct-fade-winner').textContent = p2forehandmidfadewinner;
        document.getElementById('p2-forehand-mid-ct-fade-unforced-error').textContent = p2forehandmidfadeunforcederror;
        document.getElementById('p2-forehand-mid-ct-fade-forced-error').textContent = p2forehandmidfadeforcederror;

        document.getElementById('p2-forehand-mid-ct-draw-winner').textContent = p2forehandmiddrawwinner;
        document.getElementById('p2-forehand-mid-ct-draw-unforced-error').textContent = p2forehandmiddrawunforcederror;
        document.getElementById('p2-forehand-mid-ct-draw-forced-error').textContent = p2forehandmiddrawforcederror;

        document.getElementById('p2-backhand-mid-ct-fade-winner').textContent = p2backhandmidfadewinner;
        document.getElementById('p2-backhand-mid-ct-fade-unforced-error').textContent = p2backhandmidfadeunforcederror;
        document.getElementById('p2-backhand-mid-ct-fade-forced-error').textContent = p2backhandmidfadeforcederror;

        document.getElementById('p2-backhand-mid-ct-draw-winner').textContent = p2backhandmiddrawwinner;
        document.getElementById('p2-backhand-mid-ct-draw-unforced-error').textContent = p2backhandmiddrawunforcederror;
        document.getElementById('p2-backhand-mid-ct-draw-forced-error').textContent = p2backhandmiddrawforcederror;

        //1st serve
        document.getElementById('p2-first-serve-fade-winner').textContent = p2firstservefadewinner;
        document.getElementById('p2-first-serve-fade-unforced-error').textContent = p2firstservefadeunforcederror;
        document.getElementById('p2-first-serve-fade-forced-error').textContent = p2firstservefadeforcederror;

        document.getElementById('p2-first-serve-draw-winner').textContent = p2firstservedrawwinner;
        document.getElementById('p2-first-serve-draw-unforced-error').textContent = p2firstservedrawunforcederror;
        document.getElementById('p2-first-serve-draw-forced-error').textContent = p2firstservedrawforcederror;

        //2nd serve
        document.getElementById('p2-second-serve-fade-winner').textContent = p2secondservefadewinner;
        document.getElementById('p2-second-serve-fade-unforced-error').textContent = p2secondservefadeunforcederror;
        document.getElementById('p2-second-serve-fade-forced-error').textContent = p2secondservefadeforcederror;

        document.getElementById('p2-second-serve-draw-winner').textContent = p2secondservedrawwinner;
        document.getElementById('p2-second-serve-draw-unforced-error').textContent = p2secondservedrawunforcederror;
        document.getElementById('p2-second-serve-draw-forced-error').textContent = p2secondservedrawforcederror;

        //1st return
        document.getElementById('p2-first-return-fade-winner').textContent = p2firstreturnfadewinner;
        document.getElementById('p2-first-return-fade-unforced-error').textContent = p2firstreturnfadeunforcederror;
        document.getElementById('p2-first-return-fade-forced-error').textContent = p2firstreturnfadeforcederror;

        document.getElementById('p2-first-return-draw-winner').textContent = p2firstreturndrawwinner;
        document.getElementById('p2-first-return-draw-unforced-error').textContent = p2firstreturndrawunforcederror;
        document.getElementById('p2-first-return-draw-forced-error').textContent = p2firstreturndrawforcederror;

        //2nd return
        document.getElementById('p2-second-return-fade-winner').textContent = p2secondreturnfadewinner;
        document.getElementById('p2-second-return-fade-unforced-error').textContent = p2secondreturnfadeunforcederror;
        document.getElementById('p2-second-return-fade-forced-error').textContent = p2secondreturnfadeforcederror;

        document.getElementById('p2-second-return-draw-winner').textContent = p2secondreturndrawwinner;
        document.getElementById('p2-second-return-draw-unforced-error').textContent = p2secondreturndrawunforcederror;
        document.getElementById('p2-second-return-draw-forced-error').textContent = p2secondreturndrawforcederror;



        document.getElementById('match-screen').classList.add('hidden');
        document.getElementById('stats-screen').classList.remove('hidden');
        const statsList = document.getElementById('stats-list');
        statsList.innerHTML = '';

        stats.forEach(stat => {
            const listItem = document.createElement('li');
            const timestamp = new Date().toLocaleTimeString(); // get current timestamp
            listItem.innerHTML = `
              <span class="timestamp">${timestamp}</span>
              Player ${stat.player} ${stat.action} ${stat.direction} ${stat.side}  ${stat.outcome}
            `;
            statsList.appendChild(listItem);
        });


        for (let i = lastProcessedIndex; i < stats.length; i++) {
            const stat = stats[i];
            if (stat.player === "1" && stat.action === 'Rally with' && stat.direction === 'a Fade' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Winner') {
                p1forehandrallyfadewinner += 1;
                document.getElementById('p1-forehand-rally-fade-winner').textContent = p1forehandrallyfadewinner;
            } else if (stat.player === "1" && stat.action === 'Rally with' && stat.direction === 'a Fade' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Unforced Error') {
                p1forehandrallyfadeunforcederror += 1;
                document.getElementById('p1-forehand-rally-fade-unforced-error').textContent = p1forehandrallyfadeunforcederror;
            } else if (stat.player === "1" && stat.action === 'Rally with' && stat.direction === 'a Fade' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Forced Error') {
                p1forehandrallyfadeforcederror += 1;
                document.getElementById('p1-forehand-rally-fade-forced-error').textContent = p1forehandrallyfadeforcederror
            } else if (stat.player === "1" && stat.action === 'Rally with' && stat.direction === 'a Draw' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Winner') {
                p1forehandrallydrawwinner += 1;
                document.getElementById('p1-forehand-rally-draw-winner').textContent = p1forehandrallydrawwinner
            } else if (stat.player === "1" && stat.action === 'Rally with' && stat.direction === 'a Draw' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Unforced Error') {
                p1forehandrallydrawunforcederror += 1;
                document.getElementById('p1-forehand-rally-draw-unforced-error').textContent = p1forehandrallydrawunforcederror
            } else if (stat.player === "1" && stat.action === 'Rally with' && stat.direction === 'a Draw' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Forced Error') {
                p1forehandrallydrawforcederror += 1;
                document.getElementById('p1-forehand-rally-draw-forced-error').textContent = p1forehandrallydrawforcederror
            } else if (stat.player === "1" && stat.action === 'Rally with' && stat.direction === 'a Fade' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Winner') {
                p1backhandrallyfadewinner += 1;
                document.getElementById('p1-backhand-rally-fade-winner').textContent = p1backhandrallyfadewinner;
            } else if (stat.player === "1" && stat.action === 'Rally with' && stat.direction === 'a Fade' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Unforced Error') {
                p1backhandrallyfadeunforcederror += 1;
                document.getElementById('p1-backhand-rally-fade-unforced-error').textContent = p1backhandrallyfadeunforcederror;
            } else if (stat.player === "1" && stat.action === 'Rally with' && stat.direction === 'a Fade' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Forced Error') {
                p1backhandrallyfadeforcederror += 1;
                document.getElementById('p1-backhand-rally-fade-forced-error').textContent = p1backhandrallyfadeforcederror
            } else if (stat.player === "1" && stat.action === 'Rally with' && stat.direction === 'a Draw' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Winner') {
                p1backhandrallydrawwinner += 1;
                document.getElementById('p1-backhand-rally-draw-winner').textContent = p1backhandrallydrawwinner
            } else if (stat.player === "1" && stat.action === 'Rally with' && stat.direction === 'a Draw' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Unforced Error') {
                p1backhandrallydrawunforcederror += 1;
                document.getElementById('p1-backhand-rally-draw-unforced-error').textContent = p1backhandrallydrawunforcederror
            } else if (stat.player === "1" && stat.action === 'Rally with' && stat.direction === 'a Draw' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Forced Error') {
                p1backhandrallydrawforcederror += 1;
                document.getElementById('p1-backhand-rally-draw-forced-error').textContent = p1backhandrallydrawforcederror
            } else if (stat.player === "1" && stat.action === 'Mid Court Attacked with' && stat.direction === 'a Fade' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Winner') {
                p1forehandmidfadewinner += 1;
                document.getElementById('p1-forehand-mid-ct-fade-winner').textContent = p1forehandmidfadewinner
            } else if (stat.player === "1" && stat.action === 'Mid Court Attacked with' && stat.direction === 'a Fade' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Unforced Error') {
                p1forehandmidfadeunforcederror += 1;
                document.getElementById('p1-forehand-mid-ct-fade-unforced-error').textContent = p1forehandmidfadeunforcederror
            } else if (stat.player === "1" && stat.action === 'Mid Court Attacked with' && stat.direction === 'a Fade' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Forced Error') {
                p1forehandmidfadeforcederror += 1;
                document.getElementById('p1-forehand-mid-ct-fade-forced-error').textContent = p1forehandmidfadeforcederror
            } else if (stat.player === "1" && stat.action === 'Mid Court Attacked with' && stat.direction === 'a Draw' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Winner') {
                p1forehandmiddrawwinner += 1;
                document.getElementById('p1-forehand-mid-ct-draw-winner').textContent = p1forehandmiddrawwinner
            } else if (stat.player === "1" && stat.action === 'Mid Court Attacked with' && stat.direction === 'a Draw' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Unforced Error') {
                p1forehandmiddrawunforcederror += 1;
                document.getElementById('p1-forehand-mid-ct-draw-unforced-error').textContent = p1forehandmiddrawunforcederror
            } else if (stat.player === "1" && stat.action === 'Mid Court Attacked with' && stat.direction === 'a Draw' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Forced Error') {
                p1forehandmiddrawforcederror += 1;
                document.getElementById('p1-forehand-mid-ct-draw-forced-error').textContent = p1forehandmiddrawforcederror



            } else if (stat.player === "1" && stat.action === 'Mid Court Attacked with' && stat.direction === 'a Fade' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Winner') {
                p1backhandmidfadewinner += 1;
                document.getElementById('p1-backhand-mid-ct-fade-winner').textContent = p1backhandmidfadewinner



            } else if (stat.player === "1" && stat.action === 'Mid Court Attacked with' && stat.direction === 'a Fade' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Unforced Error') {
                p1backhandmidfadeunforcederror += 1;
                document.getElementById('p1-backhand-mid-ct-fade-unforced-error').textContent = p1backhandmidfadeunforcederror
            } else if (stat.player === "1" && stat.action === 'Mid Court Attacked with' && stat.direction === 'a Fade' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Forced Error') {
                p1backhandmidfadeforcederror += 1;
                document.getElementById('p1-backhand-mid-ct-fade-forced-error').textContent = p1backhandmidfadeforcederror
            } else if (stat.player === "1" && stat.action === 'Mid Court Attacked with' && stat.direction === 'a Draw' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Winner') {
                p1backhandmiddrawwinner += 1;
                document.getElementById('p1-backhand-mid-ct-draw-winner').textContent = p1backhandmiddrawwinner
            } else if (stat.player === "1" && stat.action === 'Mid Court Attacked with' && stat.direction === 'a Draw' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Unforced Error') {
                p1backhandmiddrawunforcederror += 1;
                document.getElementById('p1-backhand-mid-ct-draw-unforced-error').textContent = p1backhandmiddrawunforcederror
            } else if (stat.player === "1" && stat.action === 'Mid Court Attacked with' && stat.direction === 'a Draw' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Forced Error') {
                p1backhandmiddrawforcederror += 1;
                document.getElementById('p1-backhand-mid-ct-draw-forced-error').textContent = p1backhandmiddrawforcederror








            } else if (stat.player === "1" && stat.action === 'Served' && stat.direction === 'a Fade' && stat.side === 'On First Serve Resulting In A' && stat.outcome === 'Winner') {
                p1firstservefadewinner += 1;
                document.getElementById('p1-first-serve-fade-winner').textContent = p1firstservefadewinner
            } else if (stat.player === "1" && stat.action === 'Served' && stat.direction === 'a Fade' && stat.side === 'On First Serve Resulting In A' && stat.outcome === 'Unforced Error') {
                p1firstservefadeunforcederror += 1;
                document.getElementById('p1-first-serve-fade-unforced-error').textContent = p1firstservefadeunforcederror
            } else if (stat.player === "1" && stat.action === 'Served' && stat.direction === 'a Fade' && stat.side === 'On First Serve Resulting In A' && stat.outcome === 'Forced Error') {
                p1firstservefadeforcederror += 1;
                document.getElementById('p1-first-serve-fade-forced-error').textContent = p1firstservefadeforcederror




            } else if (stat.player === "1" && stat.action === 'Served' && stat.direction === 'a Draw' && stat.side === 'On First Serve Resulting In A' && stat.outcome === 'Winner') {
                p1firstservedrawwinner += 1;
                document.getElementById('p1-first-serve-draw-winner').textContent = p1firstservedrawwinner
            } else if (stat.player === "1" && stat.action === 'Served' && stat.direction === 'a Draw' && stat.side === 'On First Serve Resulting In A' && stat.outcome === 'Unforced Error') {
                p1firstservedrawunforcederror += 1;
                document.getElementById('p1-first-serve-draw-unforced-error').textContent = p1firstservedrawunforcederror
            } else if (stat.player === "1" && stat.action === 'Served' && stat.direction === 'a Draw' && stat.side === 'On First Serve Resulting In A' && stat.outcome === 'Forced Error') {
                p1firstservedrawforcederror += 1;
                document.getElementById('p1-first-serve-draw-forced-error').textContent = p1firstservedrawforcederror



            } else if (stat.player === "1" && stat.action === 'Served' && stat.direction === 'a Fade' && stat.side === 'On Second Serve Resulting In A' && stat.outcome === 'Winner') {
                p1secondservefadewinner += 1;
                document.getElementById('p1-second-serve-fade-winner').textContent = p1secondservefadewinner
            } else if (stat.player === "1" && stat.action === 'Served' && stat.direction === 'a Fade' && stat.side === 'On Second Serve Resulting In A' && stat.outcome === 'Unforced Error') {
                p1secondservefadeunforcederror += 1;
                document.getElementById('p1-second-serve-fade-unforced-error').textContent = p1secondservefadeunforcederror
            } else if (stat.player === "1" && stat.action === 'Served' && stat.direction === 'a Fade' && stat.side === 'On Second Serve Resulting In A' && stat.outcome === 'Forced Error') {
                p1secondservefadeforcederror += 1;
                document.getElementById('p1-second-serve-fade-forced-error').textContent = p1secondservefadeforcederror


            } else if (stat.player === "1" && stat.action === 'Served' && stat.direction === 'a Draw' && stat.side === 'On Second Serve Resulting In A' && stat.outcome === 'Winner') {
                p1secondservedrawwinner += 1;
                document.getElementById('p1-second-serve-draw-winner').textContent = p1secondservedrawwinner
            } else if (stat.player === "1" && stat.action === 'Served' && stat.direction === 'a Draw' && stat.side === 'On Second Serve Resulting In A' && stat.outcome === 'Unforced Error') {
                p1secondservedrawunforcederror += 1;
                document.getElementById('p1-second-serve-draw-unforced-error').textContent = p1secondservedrawunforcederror
            } else if (stat.player === "1" && stat.action === 'Served' && stat.direction === 'a Draw' && stat.side === 'On Second Serve Resulting In A' && stat.outcome === 'Forced Error') {
                p1secondservedrawforcederror += 1;
                document.getElementById('p1-second-serve-draw-forced-error').textContent = p1secondservedrawforcederror








            } else if (stat.player === "1" && stat.action === 'Returned Serve With' && stat.direction === 'a Fade' && stat.side === 'On First Serve Resulting In A' && stat.outcome === 'Winner') {
                p1firstreturnfadewinner += 1;
                document.getElementById('p1-first-return-fade-winner').textContent = p1firstreturnfadewinner
            } else if (stat.player === "1" && stat.action === 'Returned Serve With' && stat.direction === 'a Fade' && stat.side === 'On First Serve Resulting In A' && stat.outcome === 'Unforced Error') {
                p1firstreturnfadeunforcederror += 1;
                document.getElementById('p1-first-return-fade-unforced-error').textContent = p1firstreturnfadeunforcederror
            } else if (stat.player === "1" && stat.action === 'Returned Serve With' && stat.direction === 'a Fade' && stat.side === 'On First Serve Resulting In A' && stat.outcome === 'Forced Error') {
                p1firstreturnfadeforcederror += 1;
                document.getElementById('p1-first-reture-fade-forced-error').textContent = p1firstreturnfadeforcederror



            } else if (stat.player === "1" && stat.action === 'Returned Serve With' && stat.direction === 'a Draw' && stat.side === 'On First Serve Resulting In A' && stat.outcome === 'Winner') {
                p1firstreturndrawwinner += 1;
                document.getElementById('p1-first-return-draw-winner').textContent = p1firstreturndrawwinner
            } else if (stat.player === "1" && stat.action === 'Returned Serve With' && stat.direction === 'a Draw' && stat.side === 'On First Serve Resulting In A' && stat.outcome === 'Unforced Error') {
                p1firstreturndrawunforcederror += 1;
                document.getElementById('p1-first-return-draw-unforced-error').textContent = p1firstreturndrawunforcederror
            } else if (stat.player === "1" && stat.action === 'Returned Serve With' && stat.direction === 'a Draw' && stat.side === 'On First Serve Resulting In A' && stat.outcome === 'Forced Error') {
                p1firstreturndrawforcederror += 1;
                document.getElementById('p1-first-reture-draw-forced-error').textContent = p1firstreturndrawforcederror

            } else if (stat.player === "1" && stat.action === 'Returned Serve With' && stat.direction === 'a Fade' && stat.side === 'On Second Serve Resulting In A' && stat.outcome === 'Winner') {
                p1secondreturnfadewinner += 1;
                document.getElementById('p1-second-return-fade-winner').textContent = p1secondreturnfadewinner
            } else if (stat.player === "1" && stat.action === 'Returned Serve With' && stat.direction === 'a Fade' && stat.side === 'On Second Serve Resulting In A' && stat.outcome === 'Unforced Error') {
                p1secondreturnfadeunforcederror += 1;
                document.getElementById('p1-second-return-fade-unforced-error').textContent = p1secondreturnfadeunforcederror
            } else if (stat.player === "1" && stat.action === 'Returned Serve With' && stat.direction === 'a Fade' && stat.side === 'On Second Serve Resulting In A' && stat.outcome === 'Forced Error') {
                p1secondreturnfadeforcederror += 1;
                document.getElementById('p1-second-return-fade-forced-error').textContent = p1secondreturnfadeforcederror

            } else if (stat.player === "1" && stat.action === 'Returned Serve With' && stat.direction === 'a Draw' && stat.side === 'On Second Serve Resulting In A' && stat.outcome === 'Winner') {
                p1secondreturndrawwinner += 1;
                document.getElementById('p1-second-return-draw-winner').textContent = p1secondreturndrawwinner
            } else if (stat.player === "1" && stat.action === 'Returned Serve With' && stat.direction === 'a Draw' && stat.side === 'On Second Serve Resulting In A' && stat.outcome === 'Unforced Error') {
                p1secondreturndrawunforcederror += 1;
                document.getElementById('p1-second-return-draw-unforced-error').textContent = p1secondreturndrawunforcederror
            } else if (stat.player === "1" && stat.action === 'Returned Serve With' && stat.direction === 'a Draw' && stat.side === 'On Second Serve Resulting In A' && stat.outcome === 'Forced Error') {
                p1secondreturndrawforcederror += 1;
                document.getElementById('p1-second-return-draw-forced-error').textContent = p1secondreturndrawforcederror

            } else if (stat.player === "2" && stat.action === 'Rally with' && stat.direction === 'a Fade' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Winner') {
                p2forehandrallyfadewinner += 1;
                document.getElementById('p2-forehand-rally-fade-winner').textContent = p2forehandrallyfadewinner;
            } else if (stat.player === "2" && stat.action === 'Rally with' && stat.direction === 'a Fade' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Unforced Error') {
                p2forehandrallyfadeunforcederror += 1;
                document.getElementById('p2-forehand-rally-fade-unforced-error').textContent = p2forehandrallyfadeunforcederror;
            } else if (stat.player === "2" && stat.action === 'Rally with' && stat.direction === 'a Fade' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Forced Error') {
                p2forehandrallyfadeforcederror += 1;
                document.getElementById('p2-forehand-rally-fade-forced-error').textContent = p2forehandrallyfadeforcederror;
            } else if (stat.player === "2" && stat.action === 'Rally with' && stat.direction === 'a Draw' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Winner') {
                p2forehandrallydrawwinner += 1;
                document.getElementById('p2-forehand-rally-draw-winner').textContent = p2forehandrallydrawwinner;
            } else if (stat.player === "2" && stat.action === 'Rally with' && stat.direction === 'a Draw' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Unforced Error') {
                p2forehandrallydrawunforcederror += 1;
                document.getElementById('p2-forehand-rally-draw-unforced-error').textContent = p2forehandrallydrawunforcederror;
            } else if (stat.player === "2" && stat.action === 'Rally with' && stat.direction === 'a Draw' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Forced Error') {
                p2forehandrallydrawforcederror += 1;
                document.getElementById('p2-forehand-rally-draw-forced-error').textContent = p2forehandrallydrawforcederror;
            } else if (stat.player === "2" && stat.action === 'Rally with' && stat.direction === 'a Fade' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Winner') {
                p2backhandrallyfadewinner += 1;
                document.getElementById('p2-backhand-rally-fade-winner').textContent = p2backhandrallyfadewinner;
            } else if (stat.player === "2" && stat.action === 'Rally with' && stat.direction === 'a Fade' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Unforced Error') {
                p2backhandrallyfadeunforcederror += 1;
                document.getElementById('p2-backhand-rally-fade-unforced-error').textContent = p2backhandrallyfadeunforcederror;
            } else if (stat.player === "2" && stat.action === 'Rally with' && stat.direction === 'a Fade' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Forced Error') {
                p2backhandrallyfadeforcederror += 1;
                document.getElementById('p2-backhand-rally-fade-forced-error').textContent = p2backhandrallyfadeforcederror;
            } else if (stat.player === "2" && stat.action === 'Rally with' && stat.direction === 'a Draw' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Winner') {
                p2backhandrallydrawwinner += 1;
                document.getElementById('p2-backhand-rally-draw-winner').textContent = p2backhandrallydrawwinner;
            } else if (stat.player === "2" && stat.action === 'Rally with' && stat.direction === 'a Draw' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Unforced Error') {
                p2backhandrallydrawunforcederror += 1;
                document.getElementById('p2-backhand-rally-draw-unforced-error').textContent = p2backhandrallydrawunforcederror;
            } else if (stat.player === "2" && stat.action === 'Rally with' && stat.direction === 'a Draw' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Forced Error') {
                p2backhandrallydrawforcederror += 1;
                document.getElementById('p2-backhand-rally-draw-forced-error').textContent = p2backhandrallydrawforcederror;
            } else if (stat.player === "2" && stat.action === 'Mid Court Attacked with' && stat.direction === 'a Fade' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Winner') {
                p2forehandmidfadewinner += 1;
                document.getElementById('p2-forehand-mid-ct-fade-winner').textContent = p2forehandmidfadewinner;
            } else if (stat.player === "2" && stat.action === 'Mid Court Attacked with' && stat.direction === 'a Fade' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Unforced Error') {
                p2forehandmidfadeunforcederror += 1;
                document.getElementById('p2-forehand-mid-ct-fade-unforced-error').textContent = p2forehandmidfadeunforcederror;
            } else if (stat.player === "2" && stat.action === 'Mid Court Attacked with' && stat.direction === 'a Fade' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Forced Error') {
                p2forehandmidfadeforcederror += 1;
                document.getElementById('p2-forehand-mid-ct-fade-forced-error').textContent = p2forehandmidfadeforcederror;
            } else if (stat.player === "2" && stat.action === 'Mid Court Attacked with' && stat.direction === 'a Draw' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Winner') {
                p2forehandmiddrawwinner += 1;
                document.getElementById('p2-forehand-mid-ct-draw-winner').textContent = p2forehandmiddrawwinner;
            } else if (stat.player === "2" && stat.action === 'Mid Court Attacked with' && stat.direction === 'a Draw' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Unforced Error') {
                p2forehandmiddrawunforcederror += 1;
                document.getElementById('p2-forehand-mid-ct-draw-unforced-error').textContent = p2forehandmiddrawunforcederror;
            } else if (stat.player === "2" && stat.action === 'Mid Court Attacked with' && stat.direction === 'a Draw' && stat.side === 'Forehand Resulting In A' && stat.outcome === 'Forced Error') {
                p2forehandmiddrawforcederror += 1;
                document.getElementById('p2-forehand-mid-ct-draw-forced-error').textContent = p2forehandmiddrawforcederror;
            } else if (stat.player === "2" && stat.action === 'Mid Court Attacked with' && stat.direction === 'a Fade' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Winner') {
                p2backhandmidfadewinner += 1;
                document.getElementById('p2-backhand-mid-ct-fade-winner').textContent = p2backhandmidfadewinner;
            } else if (stat.player === "2" && stat.action === 'Mid Court Attacked with' && stat.direction === 'a Fade' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Unforced Error') {
                p2backhandmidfadeunforcederror += 1;
                document.getElementById('p2-backhand-mid-ct-fade-unforced-error').textContent = p2backhandmidfadeunforcederror;
            } else if (stat.player === "2" && stat.action === 'Mid Court Attacked with' && stat.direction === 'a Fade' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Forced Error') {
                p2backhandmidfadeforcederror += 1;
                document.getElementById('p2-backhand-mid-ct-fade-forced-error').textContent = p2backhandmidfadeforcederror;
            } else if (stat.player === "2" && stat.action === 'Mid Court Attacked with' && stat.direction === 'a Draw' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Winner') {
                p2backhandmiddrawwinner += 1;
                document.getElementById('p2-backhand-mid-ct-draw-winner').textContent = p2backhandmiddrawwinner;
            } else if (stat.player === "2" && stat.action === 'Mid Court Attacked with' && stat.direction === 'a Draw' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Unforced Error') {
                p2backhandmiddrawunforcederror += 1;
                document.getElementById('p2-backhand-mid-ct-draw-unforced-error').textContent = p2backhandmiddrawunforcederror;
            } else if (stat.player === "2" && stat.action === 'Mid Court Attacked with' && stat.direction === 'a Draw' && stat.side === 'Backhand Resulting In A' && stat.outcome === 'Forced Error') {
                p2backhandmiddrawforcederror += 1;
                document.getElementById('p2-backhand-mid-ct-draw-forced-error').textContent = p2backhandmiddrawforcederror;
            } else if (stat.player === "2" && stat.action === 'Served' && stat.direction === 'a Fade' && stat.side === 'On First Serve Resulting In A' && stat.outcome === 'Winner') {
                p2firstservefadewinner += 1;
                document.getElementById('p2-first-serve-fade-winner').textContent = p2firstservefadewinner;
            } else if (stat.player === "2" && stat.action === 'Served' && stat.direction === 'a Fade' && stat.side === 'On First Serve Resulting In A' && stat.outcome === 'Unforced Error') {
                p2firstservefadeunforcederror += 1;
                document.getElementById('p2-first-serve-fade-unforced-error').textContent = p2firstservefadeunforcederror;
            } else if (stat.player === "2" && stat.action === 'Served' && stat.direction === 'a Fade' && stat.side === 'On First Serve Resulting In A' && stat.outcome === 'Forced Error') {
                p2firstservefadeforcederror += 1;
                document.getElementById('p2-first-serve-fade-forced-error').textContent = p2firstservefadeforcederror;
            } else if (stat.player === "2" && stat.action === 'Served' && stat.direction === 'a Draw' && stat.side === 'On First Serve Resulting In A' && stat.outcome === 'Winner') {
                p2firstservedrawwinner += 1;
                document.getElementById('p2-first-serve-draw-winner').textContent = p2firstservedrawwinner;
            } else if (stat.player === "2" && stat.action === 'Served' && stat.direction === 'a Draw' && stat.side === 'On First Serve Resulting In A' && stat.outcome === 'Unforced Error') {
                p2firstservedrawunforcederror += 1;
                document.getElementById('p2-first-serve-draw-unforced-error').textContent = p2firstservedrawunforcederror;
            } else if (stat.player === "2" && stat.action === 'Served' && stat.direction === 'a Draw' && stat.side === 'On First Serve Resulting In A' && stat.outcome === 'Forced Error') {
                p2firstservedrawforcederror += 1;
                document.getElementById('p2-first-serve-draw-forced-error').textContent = p2firstservedrawforcederror;
            } else if (stat.player === "2" && stat.action === 'Served' && stat.direction === 'a Fade' && stat.side === 'On Second Serve Resulting In A' && stat.outcome === 'Winner') {
                p2secondservefadewinner += 1;
                document.getElementById('p2-second-serve-fade-winner').textContent = p2secondservefadewinner;
            } else if (stat.player === "2" && stat.action === 'Served' && stat.direction === 'a Fade' && stat.side === 'On Second Serve Resulting In A' && stat.outcome === 'Unforced Error') {
                p2secondservefadeunforcederror += 1;
                document.getElementById('p2-second-serve-fade-unforced-error').textContent = p2secondservefadeunforcederror;
            } else if (stat.player === "2" && stat.action === 'Served' && stat.direction === 'a Fade' && stat.side === 'On Second Serve Resulting In A' && stat.outcome === 'Forced Error') {
                p2secondservefadeforcederror += 1;
                document.getElementById('p2-second-serve-fade-forced-error').textContent = p2secondservefadeforcederror;
            } else if (stat.player === "2" && stat.action === 'Served' && stat.direction === 'a Draw' && stat.side === 'On Second Serve Resulting In A' && stat.outcome === 'Winner') {
                p2secondservedrawwinner += 1;
                document.getElementById('p2-second-serve-draw-winner').textContent = p2secondservedrawwinner;
            } else if (stat.player === "2" && stat.action === 'Served' && stat.direction === 'a Draw' && stat.side === 'On Second Serve Resulting In A' && stat.outcome === 'Unforced Error') {
                p2secondservedrawunforcederror += 1;
                document.getElementById('p2-second-serve-draw-unforced-error').textContent = p2secondservedrawunforcederror;
            } else if (stat.player === "2" && stat.action === 'Served' && stat.direction === 'a Draw' && stat.side === 'On Second Serve Resulting In A' && stat.outcome === 'Forced Error') {
                p2secondservedrawforcederror += 1;
                document.getElementById('p2-second-serve-draw-forced-error').textContent = p2secondservedrawforcederror;
            } else if (stat.player === "2" && stat.action === 'Returned Serve With' && stat.direction === 'a Fade' && stat.side === 'On First Serve Resulting In A' && stat.outcome === 'Winner') {
                p2firstreturnfadewinner += 1;
                document.getElementById('p2-first-return-fade-winner').textContent = p2firstreturnfadewinner;
            } else if (stat.player === "2" && stat.action === 'Returned Serve With' && stat.direction === 'a Fade' && stat.side === 'On First Serve Resulting In A' && stat.outcome === 'Unforced Error') {
                p2firstreturnfadeunforcederror += 1;
                document.getElementById('p2-first-return-fade-unforced-error').textContent = p2firstreturnfadeunforcederror;
            } else if (stat.player === "2" && stat.action === 'Returned Serve With' && stat.direction === 'a Fade' && stat.side === 'On First Serve Resulting In A' && stat.outcome === 'Forced Error') {
                p2firstreturnfadeforcederror += 1;
                document.getElementById('p2-first-return-fade-forced-error').textContent = p2firstreturnfadeforcederror;
            } else if (stat.player === "2" && stat.action === 'Returned Serve With' && stat.direction === 'a Draw' && stat.side === 'On First Serve Resulting In A' && stat.outcome === 'Winner') {
                p2firstreturndrawwinner += 1;
                document.getElementById('p2-first-return-draw-winner').textContent = p2firstreturndrawwinner;
            } else if (stat.player === "2" && stat.action === 'Returned Serve With' && stat.direction === 'a Draw' && stat.side === 'On First Serve Resulting In A' && stat.outcome === 'Unforced Error') {
                p2firstreturndrawunforcederror += 1;
                document.getElementById('p2-first-return-draw-unforced-error').textContent = p2firstreturndrawunforcederror;
            } else if (stat.player === "2" && stat.action === 'Returned Serve With' && stat.direction === 'a Draw' && stat.side === 'On First Serve Resulting In A' && stat.outcome === 'Forced Error') {
                p2firstreturndrawforcederror += 1;
                document.getElementById('p2-first-return-draw-forced-error').textContent = p2firstreturndrawforcederror;
            } else if (stat.player === "2" && stat.action === 'Returned Serve With' && stat.direction === 'a Fade' && stat.side === 'On Second Serve Resulting In A' && stat.outcome === 'Winner') {
                p2secondreturnfadewinner += 1;
                document.getElementById('p2-second-return-fade-winner').textContent = p2secondreturnfadewinner;
            } else if (stat.player === "2" && stat.action === 'Returned Serve With' && stat.direction === 'a Fade' && stat.side === 'On Second Serve Resulting In A' && stat.outcome === 'Unforced Error') {
                p2secondreturnfadeunforcederror += 1;
                document.getElementById('p2-second-return-fade-unforced-error').textContent = p2secondreturnfadeunforcederror;
            } else if (stat.player === "2" && stat.action === 'Returned Serve With' && stat.direction === 'a Fade' && stat.side === 'On Second Serve Resulting In A' && stat.outcome === 'Forced Error') {
                p2secondreturnfadeforcederror += 1;
                document.getElementById('p2-second-return-fade-forced-error').textContent = p2secondreturnfadeforcederror;
            } else if (stat.player === "2" && stat.action === 'Returned Serve With' && stat.direction === 'a Draw' && stat.side === 'On Second Serve Resulting In A' && stat.outcome === 'Winner') {
                p2secondreturndrawwinner += 1;
                document.getElementById('p2-second-return-draw-winner').textContent = p2secondreturndrawwinner;
            } else if (stat.player === "2" && stat.action === 'Returned Serve With' && stat.direction === 'a Draw' && stat.side === 'On Second Serve Resulting In A' && stat.outcome === 'Unforced Error') {
                p2secondreturndrawunforcederror += 1;
                document.getElementById('p2-second-return-draw-unforced-error').textContent = p2secondreturndrawunforcederror;
            } else if (stat.player === "2" && stat.action === 'Returned Serve With' && stat.direction === 'a Draw' && stat.side === 'On Second Serve Resulting In A' && stat.outcome === 'Forced Error') {
                p2secondreturndrawforcederror += 1;
                document.getElementById('p2-second-return-draw-forced-error').textContent = p2secondreturndrawforcederror;
            }
            lastProcessedIndex = i + 1;
        }

    }
}