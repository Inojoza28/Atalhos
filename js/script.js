// js/script.js

// 0. Configuração do Three.js para o fundo animado (starfield)
(function() {
    const canvas = document.getElementById("three-canvas");
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 100;
    
    // Cria um grupo de partículas (starfield)
    const starsGeometry = new THREE.BufferGeometry();
    const starsCount = 1000;
    const positions = new Float32Array(starsCount * 3);
    
    for (let i = 0; i < starsCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 1000;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1000;
      positions[i * 3 + 2] = -Math.random() * 500; // Em profundidade
    }
    
    starsGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    
    const starsMaterial = new THREE.PointsMaterial({ color: 0xff4081, size: 1.5, transparent: true });
    
    const starField = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(starField);
    
    // Animação da cena Three.js
    function animateStars() {
      requestAnimationFrame(animateStars);
      starField.rotation.y += 0.0005;
      renderer.render(scene, camera);
    }
    animateStars();
    
    // Ajusta o tamanho do canvas ao redimensionar a janela
    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  })();
  
  // 1. Dados dos atalhos (lista extensa e variada)
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
  
    // VS Code
    { title: "Abrir Terminal", description: "Abre o terminal integrado.", keys: "Ctrl + `", category: "vscode" },
    { title: "Comentar Linha", description: "Alterna comentário na linha.", keys: "Ctrl + /", category: "vscode" },
    { title: "Salvar Arquivo", description: "Salva o arquivo atual.", keys: "Ctrl + S", category: "vscode" },
    { title: "Formatar Documento", description: "Formata o documento atual.", keys: "Shift + Alt + F", category: "vscode" },
    { title: "Duplicar Linha", description: "Duplica a linha atual.", keys: "Shift + Alt + ↓", category: "vscode" },
    { title: "Mover Linha", description: "Move a linha para cima ou para baixo.", keys: "Alt + ↑ / Alt + ↓", category: "vscode" },
    { title: "Toggle Sidebar", description: "Exibe ou oculta a barra lateral.", keys: "Ctrl + B", category: "vscode" },
    { title: "Ir para Linha", description: "Navega para uma linha específica.", keys: "Ctrl + G", category: "vscode" },
    { title: "Buscar no Arquivo", description: "Abre a busca no arquivo.", keys: "Ctrl + F", category: "vscode" },
    { title: "Buscar Global", description: "Pesquisa em todos os arquivos do projeto.", keys: "Ctrl + Shift + F", category: "vscode" },
  
    // Git
    { title: "Git Init", description: "Inicializa um repositório local.", keys: "git init", category: "git" },
    { title: "Git Add", description: "Adiciona todos os arquivos para commit.", keys: "git add .", category: "git" },
    { title: "Git Commit", description: "Realiza um commit com mensagem.", keys: "git commit -m 'mensagem'", category: "git" },
    { title: "Git Push", description: "Envia os commits para o repositório remoto.", keys: "git push", category: "git" },
    { title: "Git Pull", description: "Atualiza o repositório local.", keys: "git pull", category: "git" },
    { title: "Git Log", description: "Exibe o histórico de commits.", keys: "git log", category: "git" },
    { title: "Criar Branch", description: "Cria uma nova branch.", keys: "git branch nome-da-branch", category: "git" },
    { title: "Trocar Branch", description: "Muda para uma branch existente.", keys: "git checkout nome-da-branch", category: "git" },
  
    // Terminal / Shell
    { title: "Limpar Terminal", description: "Limpa a tela do terminal.", keys: "Ctrl + L", category: "terminal" },
    { title: "Sair do Terminal", description: "Encerra a sessão do terminal.", keys: "Ctrl + D", category: "terminal" },
    { title: "Subir Diretório", description: "Sobe um nível na árvore de diretórios.", keys: "cd ..", category: "terminal" },
    { title: "Listar Conteúdo", description: "Lista arquivos e pastas com detalhes.", keys: "ls -la", category: "terminal" },
    { title: "Mostrar Caminho", description: "Exibe o caminho completo do diretório atual.", keys: "pwd", category: "terminal" },
  
    // Navegador
    { title: "Recarregar Página", description: "Atualiza a página atual.", keys: "F5 / Ctrl + R", category: "navegador" },
    { title: "Nova Aba", description: "Abre uma nova aba.", keys: "Ctrl + T", category: "navegador" },
    { title: "Fechar Aba", description: "Fecha a aba atual.", keys: "Ctrl + W", category: "navegador" },
    { title: "Alternar Abas", description: "Navega entre abas abertas.", keys: "Ctrl + Tab", category: "navegador" },
    { title: "Histórico", description: "Exibe o histórico de navegação.", keys: "Ctrl + H", category: "navegador" },
    { title: "Downloads", description: "Abre a página de downloads.", keys: "Ctrl + J", category: "navegador" },
  
    // Outros / Utilitários
    { title: "Capturar Tela", description: "Faz uma captura de tela.", keys: "PrtScn", category: "outros" },
    { title: "Abrir Calculadora", description: "Abre a calculadora do Windows.", keys: "Win + R, digite calc", category: "outros" },
    { title: "Abrir Configurações", description: "Abre as configurações do Windows.", keys: "Win + I", category: "outros" },
    { title: "Explorador de Arquivos", description: "Abre o Explorador de Arquivos.", keys: "Win + E", category: "outros" },
    { title: "Área de Trabalho", description: "Minimiza todas as janelas para exibir a área de trabalho.", keys: "Win + D", category: "outros" },
    { title: "Menu Iniciar", description: "Abre o Menu Iniciar.", keys: "Ctrl + Esc", category: "outros" },
    { title: "Ajuda", description: "Abre a ajuda do sistema.", keys: "F1", category: "outros" }
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
  
  // 5. Função de paginação inteligente com reticências
  function renderPagination(totalItems) {
    paginationContainer.innerHTML = "";
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
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
  
    // Botão "Anterior"
    const prevLi = document.createElement("li");
    prevLi.textContent = "Anterior";
    prevLi.className = currentPage === 1 ? "disabled" : "";
    prevLi.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        renderShortcuts(filteredData);
      }
    });
    paginationContainer.appendChild(prevLi);
    
    // Definindo botões numéricos com reticências
    const maxButtons = 5;
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
    
    // Botão "Próximo"
    const nextLi = document.createElement("li");
    nextLi.textContent = "Próximo";
    nextLi.className = currentPage === totalPages ? "disabled" : "";
    nextLi.addEventListener("click", () => {
      if (currentPage < totalPages) {
        currentPage++;
        renderShortcuts(filteredData);
      }
    });
    paginationContainer.appendChild(nextLi);
  }
  
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
  