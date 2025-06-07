const API_KEY = 'f1697dca-9d12bc95-378ae2ef-0e76851e'; // Remplace par ta clé API

// SHOP
fetch('https://fortniteapi.io/v2/shop?lang=fr', {
  headers: { Authorization: API_KEY }
})
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('shop-container');
    container.innerHTML = '';
    data.shop.forEach(item => {
      const div = document.createElement('div');
      div.className = 'item';
      div.innerHTML = `
        <img src="${item.displayAssets[0].url}" alt="${item.displayName}" />
        <h3>${item.displayName}</h3>
        <p>Prix : ${item.price.finalPrice} V-Bucks</p>
        <p>Rareté : ${item.rarity.id}</p>
      `;
      container.appendChild(div);
    });
  })
  .catch(err => {
    document.getElementById('shop-container').textContent = 'Erreur de chargement du shop.';
  });
  