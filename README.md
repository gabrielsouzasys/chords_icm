# 📜 Coletânea ICM 2018 
(Pesquisa e Cifras)

✨ Funcionalidades
Sistema de duas colunas:

Lista de músicas pesquisável

Área de exibição de cifras

Recursos avançados:

Alinhamento pixel-perfect de acordes

Marcadores visuais de posição

Suporte para formatação complexa

Visualização responsiva

🛠️ Estrutura do Projeto
text
coletanea-cifras/
├── index.html          # Estrutura principal
├── style.css           # Estilos da aplicação
├── index.js            # Lógica principal
├── list.json           # Lista de músicas
└── cifras.json         # Cifras formatadas
📋 Formato do JSON
list.json
json
[
  "001 - NOME DA MÚSICA",
  "002 - OUTRA MÚSICA"
]
cifras.json
json
[
  {
    "numero": "001",
    "titulo": "NOME DA MÚSICA",
    "partes": [
      {
        "nome": "Introdução",
        "acordes": ["A", "B"],
        "letraPos": "0Texto com 1marcadores",
        "ordem": 1,
        "tipo": "instrumental|verso"
      }
    ]
  }
]
🎛️ Como Usar
Adicionar músicas:

Insira o título em list.json

Crie a cifra correspondente em cifras.json

Sintaxe especial:

Use números na propriedade letraPos para marcar posições de acordes

Exemplo: "0Fui la1vado" coloca acordes[0] no início e acordes[1] sobre o "v"

Controles:

Clique em ➕ para adicionar à lista

Clique em 🎶 para exibir a cifra

Clique em ❌ para remover

🌈 Estilos Personalizáveis
Edite style.css para alterar:

css
.acordes-linha {       /* Linha de acordes */
  color: #c0392b;
  font-weight: bold;
}

.letra-linha {         /* Linha da letra */
  font-family: serif;
}

.pipe-marker {         /* Marcadores de posição */
  color: #16a085;
}
💻 Tecnologias
HTML5

CSS3

JavaScript ES6

JSON

📌 Pré-requisitos
Navegador moderno (Chrome, Firefox, Edge)

⚙️ Instalação
Clone o repositório

Abra index.html no navegador

📄 Licença
MIT

Direitos Reservados a Coletanea ICM 2018