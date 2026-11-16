/* =========================================================
   WAdapt — Sistemas para Gestão
   Scripts da landing page
   ========================================================= */

/* ---------- CONFIGURAÇÃO: altere aqui seus contatos ---------- */
const CONTATO = {
  // Somente números, com DDI 55 + DDD. Ex.: '5511999998888'
  whatsapp: '5551995847288',
  // Como o número aparece na página
  whatsappTexto: '(51) 99584-7288',
  email: 'wadaptsistemas@gmail.com',
};

document.documentElement.classList.add('js');

document.addEventListener('DOMContentLoaded', () => {
  preencherContatos();
  menuMobile();
  sombraNoMenu();
  linkAtivoNoMenu();
  animacaoAoRolar();
  formularioDeContato();
  anoAtual();
});

/* ---------- Links de WhatsApp e e-mail ---------- */
function preencherContatos() {
  const linkWhats = document.getElementById('linkWhats');
  const linkEmail = document.getElementById('linkEmail');

  linkWhats.href = `https://wa.me/${CONTATO.whatsapp}`;
  linkEmail.href = `mailto:${CONTATO.email}`;
  document.getElementById('txtWhats').textContent = CONTATO.whatsappTexto;
  document.getElementById('txtEmail').textContent = CONTATO.email;
}

/* ---------- Menu hambúrguer (celular) ---------- */
function menuMobile() {
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');

  const fechar = () => {
    menu.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menu');
  };

  toggle.addEventListener('click', () => {
    const aberto = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(aberto));
    toggle.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
  });

  // Fecha ao clicar em um link ou apertar Esc
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', fechar));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) {
      fechar();
      toggle.focus();
    }
  });
}

/* ---------- Sombra no menu ao rolar a página ---------- */
function sombraNoMenu() {
  const header = document.getElementById('header');
  const atualizar = () => header.classList.toggle('is-scrolled', window.scrollY > 10);
  window.addEventListener('scroll', atualizar, { passive: true });
  atualizar();
}

/* ---------- Destaca no menu a seção que está na tela ---------- */
function linkAtivoNoMenu() {
  const links = document.querySelectorAll('.nav__link');
  const secoes = [...links]
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  const observer = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;
        links.forEach((link) => {
          link.classList.toggle('is-active', link.getAttribute('href') === `#${entrada.target.id}`);
        });
      });
    },
    { rootMargin: '-45% 0px -50% 0px' }
  );

  secoes.forEach((secao) => observer.observe(secao));
}

/* ---------- Elementos surgem suavemente ao rolar ---------- */
function animacaoAoRolar() {
  const itens = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    itens.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entradas, obs) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('is-visible');
          obs.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  // Pequeno atraso em cascata para itens lado a lado
  itens.forEach((el) => {
    const irmaos = [...el.parentElement.children].filter((c) => c.classList.contains('reveal'));
    el.style.transitionDelay = `${irmaos.indexOf(el) * 90}ms`;
    observer.observe(el);
  });
}

/* ---------- Formulário: valida e abre o WhatsApp com a mensagem ----------
   Para enviar por e-mail em vez do WhatsApp, use um serviço como
   Formspree (formspree.io) e troque a função enviar() abaixo. */
function formularioDeContato() {
  const form = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');
  const whatsInput = document.getElementById('whatsapp');

  // Máscara simples de telefone: (00) 00000-0000
  whatsInput.addEventListener('input', () => {
    const d = whatsInput.value.replace(/\D/g, '').slice(0, 11);
    let v = d;
    if (d.length > 2) v = `(${d.slice(0, 2)}) ${d.slice(2)}`;
    if (d.length > 7) v = `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
    whatsInput.value = v;
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const dados = Object.fromEntries(new FormData(form));
    const erros = validar(dados);

    form.querySelectorAll('.field').forEach((f) => f.classList.remove('has-error'));

    if (erros.length) {
      erros.forEach((nome) => form.querySelector(`[name="${nome}"]`).closest('.field').classList.add('has-error'));
      mostrar('Preencha seu nome, um e-mail válido e conte um pouco sobre sua necessidade.', 'is-error');
      form.querySelector(`[name="${erros[0]}"]`).focus();
      return;
    }

    enviar(dados);
    mostrar('Tudo certo! Abrimos o WhatsApp com a sua mensagem pronta para enviar.', 'is-success');
    form.reset();
  });

  function validar({ nome, email, mensagem }) {
    const erros = [];
    if (!nome.trim()) erros.push('nome');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) erros.push('email');
    if (!mensagem.trim()) erros.push('mensagem');
    return erros;
  }

  function enviar({ nome, empresa, email, whatsapp, mensagem }) {
    const texto = [
      `Olá, WAdapt! Meu nome é ${nome}${empresa ? `, da ${empresa}` : ''}.`,
      '',
      mensagem,
      '',
      `E-mail: ${email}`,
      whatsapp ? `WhatsApp: ${whatsapp}` : '',
    ].filter((linha, i, arr) => linha || arr[i - 1]).join('\n');

    window.open(`https://wa.me/${CONTATO.whatsapp}?text=${encodeURIComponent(texto)}`, '_blank', 'noopener');
  }

  function mostrar(msg, classe) {
    feedback.textContent = msg;
    feedback.className = `form__feedback ${classe}`;
  }
}

/* ---------- Ano atual no rodapé ---------- */
function anoAtual() {
  document.getElementById('ano').textContent = new Date().getFullYear();
}
