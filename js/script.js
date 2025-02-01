// js/script.js

// 0. Configuração do efeito 3D (Three.js) para o fundo (starfield)
(function () {
    const canvas = document.getElementById("three-canvas");
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 100;

    // Cria um starfield com 1000 partículas
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 1000;
    const positions = new Float32Array(starsCount * 3);
    for (let i = 0; i < starsCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 1000;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 1000;
        positions[i * 3 + 2] = -Math.random() * 500;
    }
    starsGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const starsMaterial = new THREE.PointsMaterial({ color: 0xff4081, size: 1.5, transparent: true });
    const starField = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starField);

    function animateStars() {
        requestAnimationFrame(animateStars);
        starField.rotation.y += 0.0005;
        renderer.render(scene, camera);
    }
    animateStars();

    window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
})();

// 1. Dados dos atalhos (lista expandida e variada)
const shortcutsData = [
    // Computador (Windows / Geral)
    { title: "Copiar", description: "Copia o item selecionado.", keys: "Ctrl + C", category: "computador" },
    { title: "Colar", description: "Cola o item copiado.", keys: "Ctrl + V", category: "computador" },
    { title: "Cortar", description: "Recorta o item selecionado.", keys: "Ctrl + X", category: "computador" },
    { title: "Desfazer", description: "Desfaz a última ação.", keys: "Ctrl + Z", category: "computador" },
    { title: "Refazer", description: "Refaz a última ação desfeita.", keys: "Ctrl + Y", category: "computador" },
    { title: "Abrir Pesquisa", description: "Abre a barra de pesquisa do Windows.", keys: "Win + S", category: "computador" },
    { title: "Bloquear PC", description: "Tranca o computador.", keys: "Win + L", category: "computador" },
    { title: "Gerenciador de Tarefas", description: "Abre o Gerenciador de Tarefas.", keys: "Ctrl + Shift + Esc", category: "computador" },
    { title: "Captura de Tela", description: "Faz uma captura de tela.", keys: "PrtScn", category: "computador" },
    { title: "Alternar Janelas", description: "Alterna entre janelas abertas.", keys: "Alt + Tab", category: "computador" },
    { title: "Histórico Área Transferência", description: "Abre o histórico da área de transferência.", keys: "Win + V", category: "computador" },
    { title: "Captura Seletiva", description: "Abre a ferramenta de captura de tela seletiva.", keys: "Win + Shift + S", category: "computador" },
    { title: "Emojis", description: "Abre o painel de emojis e símbolos.", keys: "Win + .", category: "computador" },
    { title: "Virtual Desktops", description: "Cria/Cicla entre áreas de trabalho virtuais.", keys: "Win + Ctrl + D / Win + Ctrl + ←/→", category: "computador" },
    { title: "Fechar Desktop Virtual", description: "Fecha o desktop virtual atual.", keys: "Win + Ctrl + F4", category: "computador" },
    { title: "Visualizar Desktops Virtuais", description: "Exibe todos os desktops virtuais abertos (Visão geral).", keys: "Win + Tab", category: "computador" },
    { title: "Gravador de Passos", description: "Inicia gravação de passos para troubleshooting.", keys: "Win + R > psr.exe", category: "computador" },

    // VS Code - atalhos essenciais e avançados
    { title: "Abrir Terminal", description: "Abre o terminal integrado.", keys: "Ctrl + `", category: "vscode" },
    { title: "Comentar Linha", description: "Alterna comentário na linha.", keys: "Ctrl + /", category: "vscode" },
    { title: "Salvar Arquivo", description: "Salva o arquivo atual.", keys: "Ctrl + S", category: "vscode" },
    { title: "Formatar Documento", description: "Organiza e formata o código.", keys: "Shift + Alt + F", category: "vscode" },
    { title: "Duplicar Linha", description: "Duplica a linha atual.", keys: "Shift + Alt + ↓", category: "vscode" },
    { title: "Mover Linha", description: "Move a linha para cima ou para baixo.", keys: "Alt + ↑ / Alt + ↓", category: "vscode" },
    { title: "Toggle Sidebar", description: "Exibe ou oculta a barra lateral.", keys: "Ctrl + B", category: "vscode" },
    { title: "Ir para a Linha", description: "Navega para uma linha específica.", keys: "Ctrl + G", category: "vscode" },
    { title: "Pesquisar no Arquivo", description: "Abre a busca no arquivo.", keys: "Ctrl + F", category: "vscode" },
    { title: "Buscar Global", description: "Pesquisa em todos os arquivos.", keys: "Ctrl + Shift + F", category: "vscode" },
    { title: "Abrir Command Palette", description: "Abre a paleta de comandos.", keys: "Ctrl + Shift + P", category: "vscode" },
    { title: "Go to Definition", description: "Vai para a definição do símbolo.", keys: "F12", category: "vscode" },
    { title: "Peek Definition", description: "Mostra a definição em um mini editor.", keys: "Alt + F12", category: "vscode" },
    { title: "Rename Symbol", description: "Renomeia o símbolo selecionado.", keys: "F2", category: "vscode" },
    { title: "Find All References", description: "Busca todas as referências do símbolo.", keys: "Shift + F12", category: "vscode" },
    { title: "Split Editor", description: "Divide o editor em painéis.", keys: "Ctrl + \\", category: "vscode" },
    { title: "Fechar Editor", description: "Fecha a aba ou editor atual.", keys: "Ctrl + W", category: "vscode" },
    { title: "Alternar Tela Cheia", description: "Ativa/desativa o modo tela cheia.", keys: "F11", category: "vscode" },
    { title: "Seleção Multi-cursor", description: "Adiciona múltiplos cursores para edição simultânea.", keys: "Ctrl + Alt + ↑/↓", category: "vscode" },
    { title: "Fechar Painel", description: "Fecha o painel ou terminal ativo.", keys: "Ctrl + K", category: "vscode" },
    { title: "Expandir Seleção", description: "Seleção inteligente de escopo (tag HTML, bloco de código).", keys: "Shift + Alt + →", category: "vscode" },
    { title: "Refatoração Rápida", description: "Sugere refatorações no código selecionado.", keys: "Ctrl + .", category: "vscode" },
    { title: "Live Share", description: "Inicia sessão de colaboração em tempo real.", keys: "Ctrl + Alt + S", category: "vscode" },


    // Git
    { title: "Git Init", description: "Inicializa um repositório local.", keys: "git init", category: "git" },
    { title: "Git Add", description: "Adiciona alterações para commit.", keys: "git add .", category: "git" },
    { title: "Git Commit", description: "Realiza um commit com mensagem.", keys: "git commit -m 'mensagem'", category: "git" },
    { title: "Git Push", description: "Envia commits para o remoto.", keys: "git push", category: "git" },
    { title: "Git Pull", description: "Atualiza o repositório local.", keys: "git pull", category: "git" },
    { title: "Git Log", description: "Exibe o histórico de commits.", keys: "git log", category: "git" },
    { title: "Criar Branch", description: "Cria uma nova branch.", keys: "git branch nome-da-branch", category: "git" },
    { title: "Trocar Branch", description: "Muda para uma branch existente.", keys: "git checkout nome-da-branch", category: "git" },
    { title: "Verificar Status", description: "Mostra o estado do repositório.", keys: "git status", category: "git" },
    { title: "Criar e Trocar Branch", description: "Cria uma nova branch e muda para ela.", keys: "git checkout -b nome-da-branch", category: "git" },
    { title: "Git Stash", description: "Armazena alterações temporariamente.", keys: "git stash", category: "git" },
    { title: "Git Rebase", description: "Reaplica commits em outra branch.", keys: "git rebase branch-alvo", category: "git" },


    // Terminal / Shell
    { title: "Limpar Terminal", description: "Limpa a tela do terminal.", keys: "Ctrl + L", category: "terminal" },
    { title: "Sair do Terminal", description: "Encerra a sessão do terminal.", keys: "Ctrl + D", category: "terminal" },
    { title: "Diretório Pai", description: "Sobe um nível na árvore de diretórios.", keys: "cd ..", category: "terminal" },
    { title: "Listar Conteúdo", description: "Lista arquivos e pastas com detalhes.", keys: "ls -la", category: "terminal" },
    { title: "Mostrar Caminho", description: "Exibe o caminho completo do diretório atual.", keys: "pwd", category: "terminal" },
    { title: "Interromper Processo", description: "Para o comando em execução.", keys: "Ctrl + C", category: "terminal" },
    { title: "Voltar Diretório Anterior", description: "Retorna ao diretório anterior.", keys: "cd -", category: "terminal" },
    { title: "Criar Pasta", description: "Cria um novo diretório.", keys: "mkdir nome-da-pasta", category: "terminal" },
    { title: "Background Process", description: "Move processo para segundo plano.", keys: "Ctrl + Z", category: "terminal" },
    { title: "Histórico Comandos", description: "Pesquisa no histórico de comandos.", keys: "Ctrl + R", category: "terminal" },


    // Navegador
    { title: "Recarregar Página", description: "Atualiza a página atual.", keys: "F5 / Ctrl + R", category: "navegador" },
    { title: "Nova Aba", description: "Abre uma nova aba.", keys: "Ctrl + T", category: "navegador" },
    { title: "Fechar Aba", description: "Fecha a aba atual.", keys: "Ctrl + W", category: "navegador" },
    { title: "Alternar Abas", description: "Navega entre abas abertas.", keys: "Ctrl + Tab", category: "navegador" },
    { title: "Histórico", description: "Exibe o histórico de navegação.", keys: "Ctrl + H", category: "navegador" },
    { title: "Downloads", description: "Abre a página de downloads.", keys: "Ctrl + J", category: "navegador" },
    { title: "Reabrir Aba Fechada", description: "Reabre a última aba fechada.", keys: "Ctrl + Shift + T", category: "navegador" },
    { title: "Ferramentas Dev", description: "Abre as ferramentas de desenvolvedor.", keys: "F12 / Ctrl + Shift + I", category: "navegador" },
    { title: "Zoom Reset", description: "Redefine o zoom da página.", keys: "Ctrl + 0", category: "navegador" },
    { title: "Inspecionar Elemento", description: "Abre o inspetor diretamente no elemento.", keys: "Ctrl + Shift + C", category: "navegador" },
    { title: "Simular Dispositivo", description: "Alterna modo responsivo.", keys: "Ctrl + Shift + M", category: "navegador" },


    // Outros / Utilitários
    { title: "Capturar Tela", description: "Faz uma captura de tela.", keys: "PrtScn", category: "outros" },
    { title: "Abrir Calculadora", description: "Abre a calculadora do Windows.", keys: "Win + R, digite calc", category: "outros" },
    { title: "Abrir Configurações", description: "Abre as configurações do Windows.", keys: "Win + I", category: "outros" },
    { title: "Explorador de Arquivos", description: "Abre o Explorador de Arquivos.", keys: "Win + E", category: "outros" },
    { title: "Área de Trabalho", description: "Minimiza todas as janelas para exibir a área de trabalho.", keys: "Win + D", category: "outros" },
    { title: "Menu Iniciar", description: "Abre o Menu Iniciar.", keys: "Ctrl + Esc / Win", category: "outros" },
    { title: "Ajuda", description: "Abre a ajuda do sistema.", keys: "F1", category: "outros" },
    { title: "Executar Comando", description: "Abre a caixa de diálogo Executar.", keys: "Win + R", category: "outros" },
    { title: "Projetar Tela", description: "Abre as opções de projeção sem fio.", keys: "Win + K", category: "outros" },
    { title: "Modo Seguro", description: "Reinicia no modo seguro (útil para troubleshooting).", keys: "Shift + Clique em 'Reiniciar'", category: "outros" },
    { title: "Acessibilidade", description: "Abre o menu rápido de acessibilidade.", keys: "Win + U", category: "outros" }
];

// 2. Variáveis de paginação
const itemsPerPage = 8;
let currentPage = 1;
let filteredData = shortcutsData;

// 3. Referências do DOM
const shortcutsContainer = document.getElementById("shortcutsContainer");
const categoryFilter = document.getElementById("categoryFilter");
const searchInput = document.getElementById("searchInput");
const paginationContainer = document.getElementById("pagination");

// 4. Função para renderizar atalhos com animação e paginação
function renderShortcuts(data) {
    shortcutsContainer.innerHTML = "";

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = data.slice(startIndex, endIndex);

    paginatedData.forEach((shortcut, index) => {
        const card = document.createElement("div");
        card.className = "shortcut-card";
        card.style.animationDelay = `${index * 0.1}s`;

        const titleEl = document.createElement("h3");
        titleEl.textContent = shortcut.title;

        const descEl = document.createElement("p");
        descEl.textContent = shortcut.description;

        const keysEl = document.createElement("div");
        keysEl.className = "keys";
        keysEl.textContent = shortcut.keys;

        card.appendChild(titleEl);
        card.appendChild(descEl);
        card.appendChild(keysEl);

        shortcutsContainer.appendChild(card);
    });

    renderPagination(data.length);
}

// Função para renderizar paginação inteligente com reticências e ícones no modo mobile
function renderPagination(totalItems) {
    paginationContainer.innerHTML = "";
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Verifica se estamos em um dispositivo mobile (tamanho da janela <= 600px)
    const isMobile = window.innerWidth <= 600;

    const createPageButton = (page) => {
        const li = document.createElement("li");
        li.textContent = page;
        li.classList.toggle("active", page === currentPage);
        li.addEventListener("click", () => {
            currentPage = page;
            renderShortcuts(filteredData);
        });
        return li;
    };

    // Botão "Anterior" ou ícone para mobile
    const prevLi = document.createElement("li");
    if (isMobile) {
        prevLi.innerHTML = '<i class="fas fa-chevron-left"></i>';
    } else {
        prevLi.textContent = "Anterior";
    }
    prevLi.className = currentPage === 1 ? "disabled" : "";
    prevLi.addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            renderShortcuts(filteredData);
        }
    });
    paginationContainer.appendChild(prevLi);

    // Definindo o número máximo de botões numéricos visíveis
    const maxButtons = 3;
    let startPage, endPage;
    if (totalPages <= maxButtons) {
        startPage = 1;
        endPage = totalPages;
    } else {
        if (currentPage <= Math.ceil(maxButtons / 2)) {
            startPage = 1;
            endPage = maxButtons;
        } else if (currentPage + Math.floor(maxButtons / 2) >= totalPages) {
            startPage = totalPages - maxButtons + 1;
            endPage = totalPages;
        } else {
            startPage = currentPage - Math.floor(maxButtons / 2);
            endPage = currentPage + Math.floor(maxButtons / 2);
        }
    }

    if (startPage > 1) {
        paginationContainer.appendChild(createPageButton(1));
        if (startPage > 2) {
            const ellipsis = document.createElement("li");
            ellipsis.textContent = "...";
            ellipsis.className = "ellipsis";
            paginationContainer.appendChild(ellipsis);
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        paginationContainer.appendChild(createPageButton(i));
    }

    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            const ellipsis = document.createElement("li");
            ellipsis.textContent = "...";
            ellipsis.className = "ellipsis";
            paginationContainer.appendChild(ellipsis);
        }
        paginationContainer.appendChild(createPageButton(totalPages));
    }

    // Botão "Próximo" ou ícone para mobile
    const nextLi = document.createElement("li");
    if (isMobile) {
        nextLi.innerHTML = '<i class="fas fa-chevron-right"></i>';
    } else {
        nextLi.textContent = "Próximo";
    }
    nextLi.className = currentPage === totalPages ? "disabled" : "";
    nextLi.addEventListener("click", () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderShortcuts(filteredData);
        }
    });
    paginationContainer.appendChild(nextLi);
}

// Evento para atualizar a paginação ao redimensionar a janela
window.addEventListener("resize", () => {
    // Atualiza apenas a seção de paginação, mantendo os atalhos renderizados
    renderPagination(filteredData.length);
});


// 6. Função de filtragem e busca
function filterShortcuts() {
    const categoryValue = categoryFilter.value;
    const searchValue = searchInput.value.toLowerCase().trim();

    filteredData = shortcutsData.filter(sc => {
        const matchesCategory = categoryValue === "all" || sc.category === categoryValue;
        const matchesSearch = searchValue === "" || `${sc.title} ${sc.description} ${sc.keys}`.toLowerCase().includes(searchValue);
        return matchesCategory && matchesSearch;
    });

    currentPage = 1;
    renderShortcuts(filteredData);
}

// 7. Eventos dos controles
categoryFilter.addEventListener("change", filterShortcuts);
searchInput.addEventListener("input", filterShortcuts);

// 8. Inicialização
renderShortcuts(shortcutsData);
