// script.js
let allLeftItems = [];
let leftItems = [];
let rightItems = [];
let draggedItem = null;

let allCifras = []; // Armazenará todas as cifras carregadas

// Elementos DOM
const leftList = document.getElementById ('leftList');
const rightList = document.getElementById ('rightList');
const searchInput = document.getElementById ('search');
const clearRightBtn = document.getElementById ('clearRight');

// Inicialização
function init () {
  loadLeftList ();
  loadCifras ();
  setupEventListeners ();
}

// ⚡ Carregar lista da esquerda do JSON
function loadLeftList () {
  fetch ('./data/list.json')
    .then (response => response.json ())
    .then (data => {
      allLeftItems = [...data];
      leftItems = [...data];
      renderLeftList ();
    })
    .catch (error => console.error ('Erro ao carregar Cifras:', error));
}

// ⚡ Carregar lista de cifras JSON
function loadCifras () {
  fetch ('./data/cifras.json')
    .then (response => response.json ())
    .then (data => {
      allCifras = data;
    })
    .catch (error => console.error ('Erro ao carregar JSON:', error));
}

// Função para exibir a cifra
// function showCifra (item) {
//   debugger;
//   // Extrai o número da música (os primeiros 3-4 dígitos)
//   const numero = item.match(/^[\da-zA-Z]+/)[0]; // item.match (/^\d+/)[0];

//   // Encontra a cifra correspondente
//   const cifra = allCifras.find (c => c.numero === numero);

//   if (cifra) {
//     // Formata a cifra com quebras de linha
//     const cifraFormatada = cifra.cifra.replace (/\n/g, '<br>');

//     cifraDisplay.innerHTML = `
//       <h3>${cifra.numero} - ${cifra.titulo}</h3>
//       <div class="cifra-content">
//         <pre>${cifraFormatada}</pre>
//       </div>
//     `;
//   } else {
//     cifraDisplay.innerHTML = `<p>Cifra não encontrada para: ${item}</p>`;
//   }

//   // Rolagem suave para a cifra
//   cifraDisplay.scrollIntoView ({behavior: 'smooth'});
// }

// function showCifra (item) {
//   const codigo = item.match (/^[\da-zA-Z]+/)[0];
//   const cifra = allCifras.find (c => c.numero === codigo);

//   if (!cifra) {
//     cifraDisplay.innerHTML = `<p>Cifra não encontrada para: ${item}</p>`;
//     return;
//   }

//   let html = `
//     <div class="cifra-header">
//       <h3>${cifra.numero} - ${cifra.titulo}</h3>
//       ${cifra.tom ? `<p class="tom">Tom: <strong>${cifra.tom}</strong></p>` : ''}
//     </div>
//     <div class="cifra-content">
//   `;

//   // Ordena as partes pela ordem definida
//   cifra.partes.sort ((a, b) => a.ordem - b.ordem).forEach (parte => {
//     html += `<div class="parte ${parte.tipo || 'vocal'}">`;

//     // Nome da parte
//     html += `<h4 class="parte-nome">${parte.nome}</h4>`;

//     // Acordes
//     if (parte.acordes && parte.acordes.length > 0) {
//       html += `<div class="acordes-line">${parte.acordes.join (' ')}</div>`;
//     }

//     // Letra
//     if (parte.letra && parte.letra.trim () !== '') {
//       html += `<pre class="letra">${parte.letra}</pre>`;
//     }

//     // Marcadores
//     if (parte.repete) {
//       const vezes = parte.repete === true ? '' : ` ${parte.repete}x`;
//       html += `<div class="repete-marker">↻ Repetir${vezes}</div>`;
//     }

//     html += `</div>`; // Fecha .parte
//   });

//   html += `</div>`; // Fecha .cifra-content
//   cifraDisplay.innerHTML = html;
// }

// function showCifra (item) {
//   const codigo = item.match (/^[\da-zA-Z]+/)[0];
//   const cifra = allCifras.find (c => c.numero === codigo);

//   if (!cifra) {
//     cifraDisplay.innerHTML = `<p>Cifra não encontrada para: ${item}</p>`;
//     return;
//   }

//   let html = `
//     <div class="cifra-header">
//       <h2>${cifra.numero} - ${cifra.titulo}</h2>
//     </div>
//     <div class="cifra-content">
//   `;

//   // Processa cada parte da música
//   cifra.partes.sort ((a, b) => a.ordem - b.ordem).forEach (parte => {
//     html += `<div class="parte-musical ${parte.tipo || 'vocal'}">`;
//     html += `<h3 class="parte-titulo">${parte.nome.toUpperCase ()}</h3>`;

//     if (parte.tipo === 'instrumental') {
//       html += `<div class="instrumental">${parte.acordes.join (', ')}</div>`;
//     } else {
//       // Processa letra e acordes para partes vocais
//       const linhasLetra = parte.letra.split ('\n');
//       const linhasAcordes = parte.acordes || [];

//       // Formatação especial para alinhar acordes com letra
//       html += `<div class="linha-musical">`;

//       // Linha de acordes
//       html += `<div class="acordes-linha">`;
//       linhasAcordes.forEach (acorde => {
//         html += `<span class="acorde">${acorde}</span>`;
//       });
//       html += `</div>`;

//       // Linha de letra
//       html += `<pre class="letra-linha">${parte.letra}</pre>`;

//       html += `</div>`;
//     }

//     if (parte.repete) {
//       html += `<div class="repeticao">↻ Repetir</div>`;
//     }

//     html += `</div>`; // Fecha .parte-musical
//   });

//   html += `</div>`; // Fecha .cifra-content
//   cifraDisplay.innerHTML = html;
// }

// **************************************
function showCifra (item) {
  const codigo = item.match (/^[a-zA-Z\d]+/)[0];
  const cifra = allCifras.find (c => c.numero === codigo);

  if (!cifra) {
    cifraDisplay.innerHTML = `<p>Cifra não encontrada para: ${item}</p>`;
    return;
  }

  let html = `
    <div class="cifra-header">
      <h2>${cifra.numero} - ${cifra.titulo}</h2>
    </div>
    <div class="cifra-content">



  `;

  cifra.partes.sort ((a, b) => a.ordem - b.ordem).forEach (parte => {
    html += `<div class="parte ${parte.tipo}">`;
    html += `<h3 class="parte-titulo">${parte.nome.toUpperCase ()}</h3>`;

    if (parte.tipo === 'instrumental') {
      html += `<pre class="instrumental">${parte.acordes.join (' ')}</pre>`;
    } else if (parte.letraPos) {
      html += renderizarLetraComPipes (parte);
    } else {
      html += `<pre class="letra">${parte.letra}</pre>`;
    }

    if (parte.repete) html += `<div class="repete">↻ Repetir</div>`;
    html += `</div>`;
  });

  html += `</div>`;
  cifraDisplay.innerHTML = html;
}

function renderizarLetraComPipes (parte) {
  let html = '';
  const linhas = parte.letraPos.split ('\n');
  const acordes = parte.acordes || [];

  linhas.forEach (linha => {
    let linhaAcordes = '';
    let linhaLetra = '';
    let i = 0;

    while (i < linha.length) {
      if (/^\d/.test (linha.substring (i))) {
        // Encontrou um marcador numérico
        const numMatch = linha.substring (i).match (/^(\d+)/);
        const num = parseInt (numMatch[1]);

        // Adiciona acorde na linha superior
        linhaAcordes += acordes[num] || '';

        // Adiciona PIPE na linha da letra
        linhaLetra += '|';

        // Mantém o restante do número (se houver mais dígitos) como espaços
        if (numMatch[0].length > 1) {
          linhaLetra += ' '.repeat (numMatch[0].length - 1);
        }

        i += numMatch[0].length;
      } else {
        // Caractere normal da letra
        linhaLetra += linha[i];

        // Mantém alinhamento na linha de acordes
        if (linhaAcordes.length < linhaLetra.length) {
          linhaAcordes += ' ';
        }

        i++;
      }
    }

    html += `
      <pre class="acordes-linha">${linhaAcordes}</pre>
      <pre class="letra-linha">${linhaLetra}</pre>
    `;
  });

  return html;
}

// **************************************

// ⚡ Renderizar lista da esquerda com filtro opcional
function renderLeftList (filter = '') {
  debugger;
  leftList.innerHTML = '';

  leftItems
    .filter (item => item.toLowerCase ().includes (filter.toLowerCase ()))
    .forEach (item => {
      const li = document.createElement ('li');
      li.setAttribute ('draggable', 'true');
      li.setAttribute ('data-item', item);
      li.textContent = item;

      const btn = document.createElement ('button');
      btn.textContent = '➕';
      btn.className = 'addBtn';
      btn.addEventListener ('click', () => addToRight (item));

      li.appendChild (btn);

      // Adiciona o event listener para duplo clique
      li.addEventListener ('dblclick', () => addToRight (item));

      li.addEventListener ('dragstart', () => {
        draggedItem = item;
      });

      leftList.appendChild (li);
    });
}

// ➕ Função para adicionar na direita
function addToRight (item) {
  debugger;
  if (!rightItems.includes (item)) {
    rightItems.push (item);
    const my_li = document.createElement ('li');
    // li.textContent = item;
    my_li.className = 'selectedList';

    const my_span = document.createElement ('span');
    my_span.textContent = item;
    my_span.className = 'selectedText';

    const my_div = document.createElement ('div');
    my_div.className = 'selectedBtn';

    //btns
    const btn2 = document.createElement ('button');
    btn2.textContent = '❌';
    btn2.className = 'rmvBtn';
    btn2.addEventListener ('click', () => removeFromRight (item, my_li));

    const btn3 = document.createElement ('button');
    btn3.textContent = '🎶'; //!🎵
    btn3.className = 'cfrBtn';
    btn3.addEventListener ('click', () => showCifra (item));

    my_li.appendChild (my_span);
    my_li.appendChild (my_div);

    my_div.appendChild (btn2);
    my_div.appendChild (btn3);

    // Adiciona classe de animação
    my_li.classList.add ('item-added');
    setTimeout (() => my_li.classList.remove ('item-added'), 500);

    //    // Adiciona event listener para duplo clique (remover item)
    //     li.addEventListener('dblclick', () => removeFromRight(item, li));

    // Evento diferente para mobile/desktop
    if (isMobileDevice ()) {
      let pressTimer;

      my_li.addEventListener ('touchstart', e => {
        e.preventDefault ();
        pressTimer = setTimeout (() => {
          removeFromRight (item, my_li);
        }, 600); // 600ms para long press
      });

      my_li.addEventListener ('touchend', e => {
        e.preventDefault ();
        clearTimeout (pressTimer);
      });
    } else {
      my_li.addEventListener ('dblclick', () => removeFromRight (item, my_li));
    }

    rightList.appendChild (my_li);

    // Remover da esquerda
    leftItems = leftItems.filter (i => i !== item);
    renderLeftList (searchInput.value);
  }
}

// Nova função para remover da direita
function removeFromRight (item, liElement) {
  debugger;
  // Remove da lista direita
  rightItems = rightItems.filter (i => i !== item);

  // Adiciona animação de remoção
  liElement.classList.add ('item-removing');
  setTimeout (() => {
    liElement.remove ();

    // Adiciona de volta à esquerda
    leftItems.push (item);
    leftItems.sort (); // Opcional: ordena os itens
    renderLeftList (searchInput.value);
  }, 300);
}

// Configurar event listeners
function setupEventListeners () {
  // 🔍 Campo de pesquisa
  searchInput.addEventListener ('input', e => {
    renderLeftList (e.target.value);
  });

  // 🗑️ Botão limpar direita (devolve itens para a esquerda)
  clearRightBtn.addEventListener ('click', () => {
    // Devolve os itens da direita para a esquerda
    leftItems = [...leftItems, ...rightItems];
    rightItems = [];
    rightList.innerHTML = '';
    renderLeftList (searchInput.value);
  });

  // 🏷️ Drag & Drop na direita
  rightList.addEventListener ('dragover', e => {
    e.preventDefault ();
  });

  rightList.addEventListener ('drop', e => {
    e.preventDefault ();
    if (draggedItem) {
      addToRight (draggedItem);
      draggedItem = null;
    }
  });
}

// Função para detectar dispositivos móveis
function isMobileDevice () {
  return (
    typeof window.orientation !== 'undefined' ||
    navigator.userAgent.indexOf ('IEMobile') !== -1
  );
}

// Inicializar a aplicação quando o DOM estiver carregado
document.addEventListener ('DOMContentLoaded', init);
