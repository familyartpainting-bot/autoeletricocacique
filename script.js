// ===== Configuração =====
// Número do WhatsApp com código do país + DDD (apenas dígitos)
const WHATSAPP_NUMBER = '5518997967888';
const DEFAULT_MESSAGE = 'Olá! Vim pelo site do Auto Elétrico Cacique e gostaria de um orçamento.';

const whatsappLink = (text) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

// ===== Links de WhatsApp =====
document.querySelectorAll('.js-whatsapp').forEach((el) => {
  el.href = whatsappLink(DEFAULT_MESSAGE);
  el.target = '_blank';
  el.rel = 'noopener';
});

// ===== Menu mobile =====
const nav = document.getElementById('nav');
const toggle = document.getElementById('menuToggle');

const closeMenu = () => {
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
};

toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});
nav.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });

// ===== Sombra do header ao rolar =====
const header = document.getElementById('header');
const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 10);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ===== Animação de entrada =====
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach((el) => io.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add('visible'));
}

// ===== Formulário -> WhatsApp =====
const form = document.getElementById('quoteForm');
const formError = document.getElementById('formError');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const nome = (data.get('nome') || '').toString().trim();
  const servico = (data.get('servico') || '').toString().trim();
  const veiculo = (data.get('veiculo') || '').toString().trim();
  const obs = (data.get('obs') || '').toString().trim();

  if (!nome || !servico) {
    formError.hidden = false;
    return;
  }
  formError.hidden = true;

  const linhas = [
    'Olá! Gostaria de um orçamento no Auto Elétrico Cacique.',
    '',
    `*Nome:* ${nome}`,
    `*Serviço:* ${servico}`,
    veiculo && `*Veículo:* ${veiculo}`,
    obs && `*Observações:* ${obs}`,
  ].filter((l) => l !== '' && l !== false && l !== undefined);

  window.open(whatsappLink(linhas.join('\n')), '_blank', 'noopener');
});

// ===== Ano no rodapé =====
document.getElementById('year').textContent = new Date().getFullYear();
