
function generateCircleSVG() {
    return `
    <svg width="70" height="70" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
        <!-- Hintergrundkreis -->
        <circle 
            cx="35" 
            cy="35" 
            r="30" 
            stroke=rgba(255, 255, 255, 0.306)
            stroke-width="8" 
            fill="none" 
        />
        <!-- Animierter Vordergrundkreis -->
        <circle 
            cx="35" 
            cy="35" 
            r="30" 
            stroke="#00B0EF" 
            stroke-width="8" 
            fill="none" 
            stroke-dasharray="188.4" 
            stroke-dashoffset="188.4"
            transform="rotate(-90 35 35)" 
            style="animation: fillCircle 0.5s ease-out forwards;" 
        />
        <style>
            @keyframes fillCircle {
                to {
                    stroke-dashoffset: 0;
                }
            }
        </style>
    </svg>
    `;
}

function generateCrossSVG() {
    return `
    <svg width="70" height="70" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
        <!-- Erster Strich des Kreuzes -->
        <line 
            x1="15" 
            y1="15" 
            x2="55" 
            y2="55" 
            stroke="#FFC000" 
            stroke-width="8" 
            stroke-linecap="round"
            stroke-dasharray="56.57" 
            stroke-dashoffset="56.57"
            style="animation: drawLine1 0.25s ease-out forwards;"
        />
        <!-- Zweiter Strich des Kreuzes -->
        <line 
            x1="55" 
            y1="15" 
            x2="15" 
            y2="55" 
            stroke="#FFC000" 
            stroke-width="8" 
            stroke-linecap="round"
            stroke-dasharray="56.57" 
            stroke-dashoffset="56.57"
            style="animation: drawLine2 0.25s ease-out 0.25s forwards;"
        />
        <style>
            @keyframes drawLine1 {
                to {
                    stroke-dashoffset: 0;
                }
            }
            @keyframes drawLine2 {
                to {
                    stroke-dashoffset: 0;
                }
            }
        </style>
    </svg>
    `;
}

