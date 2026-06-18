const TEBEX_TOKEN = 'uozl-bd880a83b5eacbcd68df95195576e75b5222e8b3';
const BASE_URL = `https://headless.tebex.io/api/accounts/${TEBEX_TOKEN}`;

/**
 * Simulador da Tebex Headless API foi substituído pela API real.
 */

export async function getPackages() {
  const res = await fetch(`${BASE_URL}/packages`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch packages from Tebex');
  const json = await res.json();
  return json.data;
}

export async function getPackage(id) {
  // O endpoint /packages/{id} pode não existir diretamente no Headless V1 com public token no path,
  // mas geralmente puxamos todos e filtramos, ou usamos a API apropriada.
  // Vamos puxar todos e filtrar, que é seguro e rápido pelo cache da Vercel/Next.js
  const packages = await getPackages();
  return packages.find(pkg => pkg.id.toString() === id.toString());
}

export async function createBasket(completeUrl = 'https://newagestudios.tebex.io', cancelUrl = 'https://newagestudios.tebex.io') {
  const res = await fetch(`${BASE_URL}/baskets`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      complete_url: completeUrl,
      cancel_url: cancelUrl
    })
  });
  if (!res.ok) throw new Error('Failed to create Tebex basket');
  const json = await res.json();
  return json.data; // Retorna o objeto basket que contém o 'ident'
}

export async function addPackageToBasket(basketIdent, packageId, quantity = 1) {
  const res = await fetch(`https://headless.tebex.io/api/baskets/${basketIdent}/packages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      package_id: packageId,
      quantity: quantity
    })
  });
  if (!res.ok) throw new Error('Failed to add package to basket');
  const json = await res.json();
  return json.data;
}

export async function getCheckoutUrl(basketIdent) {
  // Puxa os links do carrinho atualizado ou pelo endpoint de auth
  const res = await fetch(`https://headless.tebex.io/api/baskets/${basketIdent}`);
  if (!res.ok) throw new Error('Failed to fetch basket info');
  const json = await res.json();
  return json.data.links.checkout;
}
