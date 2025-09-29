// JobFinder - Site de busca de vagas em JavaScript puro
class JobFinderApp {
    constructor() {
        this.vagas = [];
        this.vagasFiltradas = [];
        this.filtros = {
            termo: '',
            localizacao: '',
            tipo: '',
            nivel: ''
        };
        this.vagaSelecionada = null;
        this.modalAberto = false;

        this.elementos = {
            searchInput: document.getElementById('searchInput'),
            locationInput: document.getElementById('locationInput'),
            searchBtn: document.getElementById('searchBtn'),
            tipoFilter: document.getElementById('tipoFilter'),
            nivelFilter: document.getElementById('nivelFilter'),
            clearFilters: document.getElementById('clearFilters'),
            jobsGrid: document.getElementById('jobsGrid'),
            resultsCount: document.getElementById('resultsCount'),
            loading: document.getElementById('loading'),
            noResults: document.getElementById('noResults'),
            modalOverlay: document.getElementById('modalOverlay'),
            modalTitle: document.getElementById('modalTitle'),
            modalBody: document.getElementById('modalBody'),
            modalClose: document.getElementById('modalClose'),
            themeToggle: document.getElementById('themeToggle')
        };

        this.inicializar();
    }

    inicializar() {
        this.carregarDadosMock();
        this.configurarEventListeners();
        this.configurarTema();
        this.aplicarFiltros();
        this.adicionarAnimacoes();
    }

    carregarDadosMock() {
        this.vagas = [
            {
                id: 1,
                titulo: 'Desenvolvedor Frontend React',
                empresa: 'TechCorp',
                localizacao: 'São Paulo, SP',
                salario: 'R$ 8.000 - R$ 12.000',
                tipo: 'CLT',
                nivel: 'Pleno',
                descricao: 'Buscamos um desenvolvedor frontend experiente em React para integrar nossa equipe de desenvolvimento de produtos digitais inovadores.',
                requisitos: ['React.js', 'TypeScript', 'Redux', 'CSS-in-JS', 'Git'],
                beneficios: ['Vale refeição', 'Plano de saúde', 'Home office', 'Auxílio educação'],
                dataPublicacao: '2024-01-15'
            },
            {
                id: 2,
                titulo: 'Desenvolvedor Full Stack',
                empresa: 'StartupXYZ',
                localizacao: 'Rio de Janeiro, RJ',
                salario: 'R$ 10.000 - R$ 15.000',
                tipo: 'PJ',
                nivel: 'Sênior',
                descricao: 'Oportunidade para desenvolvedor full stack trabalhar em projetos desafiadores usando tecnologias modernas.',
                requisitos: ['Node.js', 'React', 'PostgreSQL', 'AWS', 'Docker'],
                beneficios: ['Flexibilidade de horário', 'Equipamento fornecido', 'Participação nos lucros'],
                dataPublicacao: '2024-01-14'
            },
            {
                id: 3,
                titulo: 'Designer UX/UI',
                empresa: 'DesignStudio',
                localizacao: 'Belo Horizonte, MG',
                salario: 'R$ 6.000 - R$ 9.000',
                tipo: 'CLT',
                nivel: 'Pleno',
                descricao: 'Procuramos designer criativo para criar experiências digitais incríveis para nossos clientes.',
                requisitos: ['Figma', 'Adobe Creative Suite', 'Prototipagem', 'Design System'],
                beneficios: ['Vale refeição', 'Plano de saúde', 'Gympass', 'Day off no aniversário'],
                dataPublicacao: '2024-01-13'
            },
            {
                id: 4,
                titulo: 'Desenvolvedor Python',
                empresa: 'DataTech',
                localizacao: 'Porto Alegre, RS',
                salario: 'R$ 7.000 - R$ 11.000',
                tipo: 'CLT',
                nivel: 'Júnior',
                descricao: 'Vaga para desenvolvedor Python júnior interessado em trabalhar com análise de dados e machine learning.',
                requisitos: ['Python', 'Django', 'PostgreSQL', 'Git', 'Linux'],
                beneficios: ['Vale refeição', 'Plano de saúde', 'Treinamentos', 'Mentoria'],
                dataPublicacao: '2024-01-12'
            },
            {
                id: 5,
                titulo: 'Analista de Dados',
                empresa: 'BigData Corp',
                localizacao: 'Remoto',
                salario: 'R$ 9.000 - R$ 13.000',
                tipo: 'PJ',
                nivel: 'Pleno',
                descricao: 'Analista de dados para trabalhar com grandes volumes de informação e gerar insights estratégicos.',
                requisitos: ['SQL', 'Python', 'Power BI', 'Excel avançado', 'Estatística'],
                beneficios: ['100% remoto', 'Horário flexível', 'Equipamento fornecido'],
                dataPublicacao: '2024-01-11'
            },
            {
                id: 6,
                titulo: 'Desenvolvedor Mobile React Native',
                empresa: 'MobileFirst',
                localizacao: 'Florianópolis, SC',
                salario: 'R$ 8.500 - R$ 12.500',
                tipo: 'CLT',
                nivel: 'Pleno',
                descricao: 'Desenvolvedor mobile para criar aplicativos inovadores usando React Native.',
                requisitos: ['React Native', 'TypeScript', 'Redux', 'Firebase', 'Git'],
                beneficios: ['Vale refeição', 'Plano de saúde', 'Auxílio transporte', 'Participação nos lucros'],
                dataPublicacao: '2024-01-10'
            },
            {
                id: 7,
                titulo: 'Estagiário Desenvolvimento Web',
                empresa: 'WebAgency',
                localizacao: 'Curitiba, PR',
                salario: 'R$ 1.500 - R$ 2.000',
                tipo: 'Estágio',
                nivel: 'Júnior',
                descricao: 'Oportunidade de estágio para estudantes interessados em desenvolvimento web.',
                requisitos: ['HTML', 'CSS', 'JavaScript', 'Git', 'Inglês básico'],
                beneficios: ['Vale transporte', 'Vale refeição', 'Auxílio educação', 'Mentoria'],
                dataPublicacao: '2024-01-09'
            },
            {
                id: 8,
                titulo: 'Arquiteto de Software',
                empresa: 'Enterprise Solutions',
                localizacao: 'São Paulo, SP',
                salario: 'R$ 15.000 - R$ 20.000',
                tipo: 'CLT',
                nivel: 'Especialista',
                descricao: 'Arquiteto de software para liderar projetos complexos e definir arquiteturas escaláveis.',
                requisitos: ['Microserviços', 'Cloud AWS/Azure', 'Docker', 'Kubernetes', 'Design Patterns'],
                beneficios: ['Plano de saúde premium', 'Previdência privada', 'Carro da empresa', 'Stock options'],
                dataPublicacao: '2024-01-08'
            }
        ];
    }

    configurarEventListeners() {
        // Busca
        this.elementos.searchBtn.addEventListener('click', () => this.realizarBusca());
        this.elementos.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.realizarBusca();
        });
        this.elementos.locationInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.realizarBusca();
        });

        // Filtros
        this.elementos.tipoFilter.addEventListener('change', () => this.aplicarFiltros());
        this.elementos.nivelFilter.addEventListener('change', () => this.aplicarFiltros());
        this.elementos.clearFilters.addEventListener('click', () => this.limparFiltros());

        // Modal
        this.elementos.modalClose.addEventListener('click', () => this.fecharModal());
        this.elementos.modalOverlay.addEventListener('click', (e) => {
            if (e.target === this.elementos.modalOverlay) this.fecharModal();
        });

        // Tema
        this.elementos.themeToggle.addEventListener('click', () => this.alternarTema());

        // ESC para fechar modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.modalAberto) {
                this.fecharModal();
            }
        });

        // Botões do modal
        document.addEventListener('click', (e) => {
            if (e.target.closest('.btn-apply')) {
                e.preventDefault();
                this.mostrarNotificacao('Candidatura enviada com sucesso!', 'success');
            }
            
            if (e.target.closest('.btn-save')) {
                e.preventDefault();
                const btn = e.target.closest('.btn-save');
                const icon = btn.querySelector('i');
                
                if (icon.classList.contains('fas')) {
                    icon.classList.remove('fas');
                    icon.classList.add('far');
                    btn.innerHTML = '<i class="far fa-heart"></i> Vaga salva';
                    this.mostrarNotificacao('Vaga salva nos favoritos!', 'info');
                } else {
                    icon.classList.remove('far');
                    icon.classList.add('fas');
                    btn.innerHTML = '<i class="fas fa-heart"></i> Salvar vaga';
                    this.mostrarNotificacao('Vaga removida dos favoritos', 'warning');
                }
            }
        });

        // Busca em tempo real
        let searchTimeout;
        this.elementos.searchInput.addEventListener('input', () => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                if (this.elementos.searchInput.value.length >= 2 || this.elementos.searchInput.value.length === 0) {
                    this.realizarBusca();
                }
            }, 500);
        });

        this.elementos.locationInput.addEventListener('input', () => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                if (this.elementos.locationInput.value.length >= 2 || this.elementos.locationInput.value.length === 0) {
                    this.realizarBusca();
                }
            }, 500);
        });
    }

    realizarBusca() {
        this.filtros.termo = this.elementos.searchInput.value || '';
        this.filtros.localizacao = this.elementos.locationInput.value || '';
        this.aplicarFiltros();
    }

    aplicarFiltros() {
        this.mostrarLoading();

        setTimeout(() => {
            this.filtros.tipo = this.elementos.tipoFilter.value || '';
            this.filtros.nivel = this.elementos.nivelFilter.value || '';

            this.vagasFiltradas = this.vagas.filter(vaga => {
                const matchTermo = !this.filtros.termo || 
                    vaga.titulo.toLowerCase().includes(this.filtros.termo.toLowerCase()) ||
                    vaga.empresa.toLowerCase().includes(this.filtros.termo.toLowerCase());

                const matchLocalizacao = !this.filtros.localizacao ||
                    vaga.localizacao.toLowerCase().includes(this.filtros.localizacao.toLowerCase());

                const matchTipo = !this.filtros.tipo || vaga.tipo === this.filtros.tipo;
                const matchNivel = !this.filtros.nivel || vaga.nivel === this.filtros.nivel;

                return matchTermo && matchLocalizacao && matchTipo && matchNivel;
            });

            this.esconderLoading();
            this.renderizarVagas();
            this.atualizarContador();
        }, 800);
    }

    limparFiltros() {
        this.elementos.searchInput.value = '';
        this.elementos.locationInput.value = '';
        this.elementos.tipoFilter.value = '';
        this.elementos.nivelFilter.value = '';

        this.filtros = {
            termo: '',
            localizacao: '',
            tipo: '',
            nivel: ''
        };

        this.aplicarFiltros();
    }

    renderizarVagas() {
        const grid = this.elementos.jobsGrid;

        if (this.vagasFiltradas.length === 0) {
            this.elementos.noResults.style.display = 'block';
            grid.innerHTML = '';
            return;
        }

        this.elementos.noResults.style.display = 'none';

        grid.innerHTML = this.vagasFiltradas.map(vaga => `
            <div class="job-card" data-job-id="${vaga.id}">
                <div class="job-header">
                    <div class="job-logo">
                        ${vaga.empresa.charAt(0).toUpperCase()}
                    </div>
                    <div class="job-info">
                        <h3 class="job-title">${vaga.titulo}</h3>
                        <p class="job-company">${vaga.empresa}</p>
                    </div>
                </div>
                
                <div class="job-meta">
                    <div class="job-meta-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${vaga.localizacao}</span>
                    </div>
                    <div class="job-meta-item">
                        <i class="fas fa-clock"></i>
                        <span>${this.formatarData(vaga.dataPublicacao)}</span>
                    </div>
                </div>

                <div class="job-tags">
                    <span class="job-tag primary">${vaga.tipo}</span>
                    <span class="job-tag success">${vaga.nivel}</span>
                </div>

                <p class="job-description">${vaga.descricao}</p>

                <div class="job-footer">
                    <span class="job-salary">${vaga.salario}</span>
                </div>
            </div>
        `).join('');

        // Adicionar event listeners para os cards
        grid.querySelectorAll('.job-card').forEach(card => {
            card.addEventListener('click', () => {
                const jobId = parseInt(card.getAttribute('data-job-id'));
                this.abrirModal(jobId);
            });
        });
    }

    abrirModal(jobId) {
        const vaga = this.vagas.find(v => v.id === jobId);
        if (!vaga) return;

        this.vagaSelecionada = vaga;
        this.modalAberto = true;

        this.elementos.modalTitle.textContent = vaga.titulo;
        
        this.elementos.modalBody.innerHTML = `
            <div class="modal-section">
                <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                    <div class="job-logo">${vaga.empresa.charAt(0).toUpperCase()}</div>
                    <div>
                        <h4 style="margin: 0;">${vaga.empresa}</h4>
                        <p style="margin: 0; color: var(--text-secondary);">${vaga.localizacao}</p>
                    </div>
                </div>
                
                <div style="display: flex; gap: 1rem; margin-bottom: 1rem;">
                    <span class="job-tag primary">${vaga.tipo}</span>
                    <span class="job-tag success">${vaga.nivel}</span>
                </div>
                
                <div style="background: var(--bg-secondary); padding: 1rem; border-radius: var(--radius-md); margin-bottom: 1rem;">
                    <strong style="color: var(--success-color); font-size: 1.125rem;">${vaga.salario}</strong>
                </div>
            </div>

            <div class="modal-section">
                <h4>Descrição da vaga</h4>
                <p>${vaga.descricao}</p>
            </div>

            <div class="modal-section">
                <h4>Requisitos</h4>
                <ul>
                    ${vaga.requisitos.map(req => `<li>${req}</li>`).join('')}
                </ul>
            </div>

            <div class="modal-section">
                <h4>Benefícios</h4>
                <ul>
                    ${vaga.beneficios.map(ben => `<li>${ben}</li>`).join('')}
                </ul>
            </div>

            <div class="modal-section">
                <p style="color: var(--text-muted); font-size: 0.875rem;">
                    <i class="fas fa-calendar"></i>
                    Publicado em ${this.formatarData(vaga.dataPublicacao)}
                </p>
            </div>
        `;

        this.elementos.modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    fecharModal() {
        this.modalAberto = false;
        this.vagaSelecionada = null;
        this.elementos.modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    mostrarLoading() {
        this.elementos.loading.style.display = 'block';
        this.elementos.jobsGrid.style.display = 'none';
    }

    esconderLoading() {
        this.elementos.loading.style.display = 'none';
        this.elementos.jobsGrid.style.display = 'grid';
    }

    atualizarContador() {
        const count = this.vagasFiltradas.length;
        this.elementos.resultsCount.textContent = `${count} vaga${count !== 1 ? 's' : ''} encontrada${count !== 1 ? 's' : ''}`;
    }

    formatarData(data) {
        const date = new Date(data);
        const agora = new Date();
        const diffTime = Math.abs(agora.getTime() - date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) return 'Há 1 dia';
        if (diffDays < 7) return `Há ${diffDays} dias`;
        if (diffDays < 30) return `Há ${Math.floor(diffDays / 7)} semana${Math.floor(diffDays / 7) > 1 ? 's' : ''}`;
        
        return date.toLocaleDateString('pt-BR');
    }

    configurarTema() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        this.atualizarIconeTema(savedTheme);
    }

    alternarTema() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        this.atualizarIconeTema(newTheme);
    }

    atualizarIconeTema(theme) {
        const themeIcon = this.elementos.themeToggle.querySelector('i');
        themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    mostrarNotificacao(message, type = 'info') {
        // Remover notificação existente
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;

        // Estilos da notificação
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--bg-primary);
            border: 1px solid var(--border-color);
            border-radius: var(--radius-lg);
            padding: 1rem;
            box-shadow: var(--shadow-xl);
            z-index: 10000;
            max-width: 400px;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;

        const content = notification.querySelector('.notification-content');
        content.style.cssText = `
            display: flex;
            align-items: center;
            gap: 0.75rem;
            color: var(--text-primary);
        `;

        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            background: none;
            border: none;
            color: var(--text-muted);
            cursor: pointer;
            padding: 0.25rem;
            border-radius: var(--radius-sm);
        `;

        // Cores baseadas no tipo
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#6366f1'
        };

        const icon = notification.querySelector('.notification-content i');
        icon.style.color = colors[type] || colors.info;

        document.body.appendChild(notification);

        // Animar entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Auto remover após 5 segundos
        const autoRemove = setTimeout(() => {
            this.removerNotificacao(notification);
        }, 5000);

        // Remover ao clicar no X
        closeBtn.addEventListener('click', () => {
            clearTimeout(autoRemove);
            this.removerNotificacao(notification);
        });
    }

    removerNotificacao(notification) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }

    getNotificationIcon(type) {
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        };
        return icons[type] || icons.info;
    }

    adicionarAnimacoes() {
        // Animações de entrada
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observar elementos para animação
        const animatedElements = document.querySelectorAll('.job-card, .hero-content, .results-header');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });

        // Efeito de typing no hero
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            const originalText = heroTitle.textContent;
            heroTitle.textContent = '';
            
            let i = 0;
            const typeWriter = () => {
                if (i < originalText.length) {
                    heroTitle.textContent += originalText.charAt(i);
                    i++;
                    setTimeout(typeWriter, 50);
                }
            };
            
            setTimeout(typeWriter, 500);
        }
    }
}

// Inicializar a aplicação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    new JobFinderApp();
    console.log('JobFinder carregado com sucesso!');
});