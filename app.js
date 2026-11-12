const whatsappNumber = '5516991609339';
const query = new URLSearchParams(window.location.search);
const campaign = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'].map(key => [key, (query.get(key) || '').slice(0, 120)]).filter(([,value]) => value);
document.querySelectorAll('[data-whatsapp]').forEach(link => {
  const mode = link.dataset.mode;
  const chosenPackage = link.dataset.package;
  let message = 'Olá, Lavigo! Quero fazer parte do primeiro Natal de vocês.';
  if (mode === 'estudio') message += ' Tenho interesse no ensaio de Natal em estúdio.';
  else if (mode === 'casa') message += ' Quero um ensaio de Natal na minha casa. Gostaria de confirmar atendimento na minha região e eventual deslocamento.';
  else if (chosenPackage) message += ` Tenho interesse no pacote ${chosenPackage} e gostaria de conhecer as opções em estúdio ou em casa.`;
  else message += ' Gostaria de ajuda para escolher meu ensaio em estúdio ou em casa.';
  message += ' Podem me informar os detalhes e as datas disponíveis?';
  message += `\n\nVim da página de Natal · ${link.dataset.source}.`;
  if (campaign.length) message += '\nCampanha: ' + campaign.map(([key,value]) => `${key}=${value}`).join(' | ');
  link.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.addEventListener('click', () => {
    const detail = { cta: link.dataset.source, experience: mode || 'a_escolher', package: chosenPackage || 'a_escolher', campaign: Object.fromEntries(campaign) };
    window.dispatchEvent(new CustomEvent('lavigo:whatsapp_click', { detail }));
    // Forward only if the site owner has configured analytics. No visitor data is stored here.
    if (typeof window.gtag === 'function') window.gtag('event', 'whatsapp_click', detail);
  });
});
