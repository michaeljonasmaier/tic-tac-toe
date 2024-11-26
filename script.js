let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
];

let currentPlayer = "circle"; // Startspieler
let gameOver = false; // Flag, um zu überprüfen, ob das Spiel vorbei ist

render();

function render() {
    // Starte mit leerem HTML
    let html = '<table>';
    
    // Erzeuge die 3x3 Tabelle
    for (let row = 0; row < 3; row++) {
        html += '<tr>'; // Starte eine neue Zeile
        for (let col = 0; col < 3; col++) {
            let index = row * 3 + col; // Berechne den Index im Array
            let symbol = fields[index] === "circle" 
                ? generateCircleSVG() // Kreis
                : fields[index] === "cross"
                ? generateCrossSVG() // Kreuz
                : ""; // Leer
            
            // Füge Zelle mit Symbol und Klickfunktion hinzu
            html += `
                <td onclick="makeMove(${index}, this)">
                    ${symbol}
                </td>`;
        }
        html += '</tr>'; // Schließe die Zeile
    }
    html += '</table>'; // Schließe die Tabelle
    
    // Füge das generierte HTML in den Container ein
    document.getElementById('content').innerHTML = html;
}

function makeMove(index, element) {
    // Überspringe, wenn das Feld bereits belegt ist oder das Spiel vorbei ist
    if (fields[index] !== null || gameOver) return;

    // Setze das aktuelle Symbol ins Array
    fields[index] = currentPlayer;
    
    // Füge den entsprechenden SVG-Code in die Zelle ein
    element.innerHTML = currentPlayer === "circle" 
        ? generateCircleSVG() 
        : generateCrossSVG();
    
    // Entferne das onclick-Attribut von der Zelle
    element.onclick = null;

    // Prüfe, ob das Spiel vorbei ist
    if (checkGameOver()) {
        // Verzögerung für die Animationen (SVG und Linie)
        setTimeout(() => {
            alert(`${currentPlayer} hat gewonnen!`);
            resetGame(); // Setze das Spiel zurück nach dem Alert
        }, 500); // Verzögerung für den Gewinn
        return; // Beende das Spiel nach einem Sieg
    }

    // Prüfe auf Unentschieden (alle Felder sind ausgefüllt)
    if (!fields.includes(null)) {
        setTimeout(() => {
            alert("Unentschieden!");
            resetGame(); // Setze das Spiel zurück nach dem Alert
        }, 500); // Verzögerung für Unentschieden
        return; // Kein Gewinn, also geht das Spiel weiter und wird zurückgesetzt
    }

    // Wechsel den Spieler
    currentPlayer = currentPlayer === "circle" ? "cross" : "circle";
}

function checkGameOver() {
    // Definiere die möglichen Gewinnkombinationen
    const winningCombinations = [
        [0, 1, 2], // Erste Reihe
        [3, 4, 5], // Zweite Reihe
        [6, 7, 8], // Dritte Reihe
        [0, 3, 6], // Erste Spalte
        [1, 4, 7], // Zweite Spalte
        [2, 5, 8], // Dritte Spalte
        [0, 4, 8], // Diagonale von oben links nach unten rechts
        [2, 4, 6], // Diagonale von oben rechts nach unten links
    ];

    // Überprüfe alle Gewinnkombinationen
    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        if (fields[a] !== null && fields[a] === fields[b] && fields[a] === fields[c]) {
            // Wenn eine Gewinnkombination gefunden wurde, zeichne eine Linie
            drawWinningLine(combination);
            gameOver = true; // Spiel ist vorbei
            return true; // Das Spiel ist vorbei
        }
    }

    return false; // Das Spiel ist noch nicht vorbei
}

function drawWinningLine(combination) {
    // Hole alle td-Elemente
    let cells = document.getElementsByTagName('td');
    
    // Array, das die Positionen der Zellen speichert
    let positions = [];

    // Sammle die Positionen der Zellen, die zum Sieg geführt haben
    for (let index of combination) {
        let rect = cells[index].getBoundingClientRect();
        positions.push({
            x: rect.left + rect.width / 2, // Mittelpunkt der Zelle
            y: rect.top + rect.height / 2, // Mittelpunkt der Zelle
        });
    }

    // Erstelle das Linien-Element
    let line = document.createElement('div');
    line.style.position = 'absolute';
    line.style.backgroundColor = 'white';
    line.style.zIndex = '10';

    // Berechne den Start- und Endpunkt der Linie
    let start = positions[0];
    let end = positions[positions.length - 1];
    
    // Berechne die Länge und den Winkel der Linie
    let dx = end.x - start.x;
    let dy = end.y - start.y;
    let length = Math.sqrt(dx * dx + dy * dy); // Länge der Linie
    let angle = Math.atan2(dy, dx); // Winkel der Linie
    
    // Setze die Linie: Länge, Drehung und Position
    line.style.width = `${length}px`;
    line.style.height = '5px'; // Dicke der Linie
    line.style.transform = `rotate(${angle}rad)`; // Drehen der Linie
    line.style.transformOrigin = '0 50%'; // Ursprung der Drehung an der linken Seite
    line.style.left = `${start.x}px`;
    line.style.top = `${start.y}px`;

    // Füge die Linie zum Container hinzu
    document.getElementById('content').appendChild(line);
}

// Funktion, die das Spiel zurücksetzt
function resetGame() {
    // Setze das Feld zurück
    fields = [null, null, null, null, null, null, null, null, null];
    
    // Setze das Flag für das Spiel zurück
    gameOver = false;
    
    // Setze den Startspieler zurück (Wechseln des Spielers)
    currentPlayer = currentPlayer === "circle" ? "cross" : "circle";
    
    // Rende die Tabelle neu
    render();
}
