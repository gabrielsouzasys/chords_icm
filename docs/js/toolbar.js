// Transposição de tons
function transpor (semitons) {
  const acordes = document.querySelectorAll ('.acorde');
  acordes.forEach (acorde => {
    const notaOriginal = acorde.textContent;
    acorde.textContent = transporNota (notaOriginal, semitons);
    if (document.body.classList.contains ('modo-notas')) {
      acorde.dataset.nota = obterNotaMusical (acorde.textContent);
    }
  });
}

// Tabela de transposição
function transporNota (nota, semitons) {
  const notas = [
    'C',
    'C#',
    'D',
    'D#',
    'E',
    'F',
    'F#',
    'G',
    'G#',
    'A',
    'A#',
    'B',
  ];
  const mod = n => (n % 12 + 12) % 12;

  // Extrai base e modificadores (ex: 'C#m7' vira ['C#', 'm7'])
  const match = nota.match (/^([A-G]#?)(.*)/);
  if (!match) return nota;

  const [_, base, modificadores] = match;
  const index = notas.indexOf (base);
  if (index === -1) return nota;

  const novoIndex = mod (index + semitons);
  return notas[novoIndex] + modificadores;
}

// Ajuste de tamanho de fonte
function ajustarFonte (delta) {
  const display = document.getElementById ('cifra-display');
  const tamanhoAtual = parseFloat (getComputedStyle (display).fontSize);
  display.style.fontSize = `${tamanhoAtual + delta}px`;
}

// Modo notas musicais
function alternarNotas () {
  document.body.classList.toggle ('modo-notas');
  const acordes = document.querySelectorAll ('.acorde');
  acordes.forEach (acorde => {
    if (document.body.classList.contains ('modo-notas')) {
      acorde.dataset.nota = obterNotaMusical (acorde.textContent);
    }
  });
}

function obterNotaMusical (acorde) {
  // Remove modificadores (ex: 'C#m7' vira 'C#')
  return acorde.replace (/[^A-G#]/g, '');
}

// Impressão
function imprimirCifra () {
  const conteudo = document.querySelector ('.cifra-content').cloneNode (true);
  const janela = window.open ('', '_blank');
  janela.document.write (`
    <html>
      <head>
        <title>${document.querySelector ('.cifra-header h2').textContent}</title>
        <style>
          body { font-family: Arial; padding: 20px; }
          .cifra-toolbar { display: none; }
          .acordes-linha { color: #c0392b; font-weight: bold; }
          .letra-linha { white-space: pre; font-family: 'Times New Roman'; }
        </style>
      </head>
      <body>${conteudo.innerHTML}</body>
    </html>
  `);
  janela.document.close ();
  setTimeout (() => janela.print (), 300);
}

// Metrônomo básico
function CloseMetronomo () {
  const modal = document.querySelector ('.modal-metronomo_show');
  if (modal) {
    modal.className = 'modal-metronomo_hide';
    // modal.style.display = 'none';
  }
}

function abrirMetronomo () {
  const modal = document.createElement ('div');
  modal.id = 'my_modal';
  modal.className = 'modal-metronomo_show';
  modal.innerHTML = `
    <h3>Metrônomo</h3>
    <div>
      <label>BPM: <input type="number" id="bpm" value="120" min="40" max="300"></label>
      <button onclick="iniciarMetronomo()">▶️ Iniciar</button>
      <button onclick="pararMetronomo()">⏹️ Parar</button>
      <button onclick="CloseMetronomo()">❌ Fechar</button>
    </div>
    <div id="metronomo-display">♪</div>
  `;
  document.body.appendChild (modal);
  // modal.style.display = 'block';
}



let metronomoInterval;

function iniciarMetronomo () {
  const bpm = document.getElementById ('bpm').value;
  const display = document.getElementById ('metronomo-display');
  pararMetronomo ();

  metronomoInterval = setInterval (() => {
    display.textContent = display.textContent === '♪' ? '♫' : '♪';
    // Aqui você pode adicionar um som de tick
    // new Audio (${sound}).play ().catch (e => {});
  }, 60000 / bpm);
}

function pararMetronomo () {
  clearInterval (metronomoInterval);
}
