import { mockScripts } from './data';

/**
 * Simulador da Tebex Headless API.
 * Quando você colocar suas chaves, você pode substituir essas funções por "fetch" reais
 * para "https://headless.tebex.io/api/accounts/{token}/packages"
 */

export async function getPackages() {
  // Simula o tempo de requisição de uma API real
  await new Promise(resolve => setTimeout(resolve, 800));
  
  return mockScripts;
}

export async function getPackage(id) {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockScripts.find(script => script.id === id);
}

export async function createBasket() {
  // Lógica fake de criar carrinho
  console.log('Carrinho criado (mock)');
  return { ident: 'basket_123' };
}

export async function addPackageToBasket(basketIdent, packageId) {
  // Lógica fake de adicionar item
  console.log(`Pacote ${packageId} adicionado ao carrinho ${basketIdent}`);
  return { success: true };
}

export async function getCheckoutUrl(basketIdent) {
  // Lógica fake de gerar URL de checkout
  return `https://checkout.tebex.io/checkout/mock_url_${basketIdent}`;
}
