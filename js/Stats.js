const API_KEY = "9a5f88d8-20a4-46de-9c09-2f6f6acc2e03";

async function getStats() {
  const username = document.getElementById('username').value.trim();
  const container = document.getElementById('stats-container');

  if (!username) return alert('Entrez un nom de joueur');
  container.innerHTML = 'Chargement...';

  try {
    const response = await fetch(`https://fortnite-api.com/v2/stats/br/v2?name=${encodeURIComponent(username)}`, {
      headers: { Authorization: API_KEY }
    });
    const data = await response.json();

    if (!data.data) {
      container.innerHTML = 'Joueur non trouvé.';
      return;
    }

    const { stats } = data.data;
    container.innerHTML = `
      <div class="item solo">
        <h4>Solo</h4>
        <p>Victoires : ${stats.solo.wins}</p>
        <p>Kills : ${stats.solo.kills}</p>
        <p>Matchs : ${stats.solo.matches}</p>
        <p>K/D : ${stats.solo.kd}</p>
      </div>
      <div class="item duo">
        <h4>Duo</h4>
        <p>Victoires : ${stats.duo.wins}</p>
        <p>Kills : ${stats.duo.kills}</p>
        <p>Matchs : ${stats.duo.matches}</p>
        <p>K/D : ${stats.duo.kd}</p>
      </div>
      <div class="item squad">
        <h4>Squad</h4>
        <p>Victoires : ${stats.squad.wins}</p>
        <p>Kills : ${stats.squad.kills}</p>
        <p>Matchs : ${stats.squad.matches}</p>
        <p>K/D : ${stats.squad.kd}</p>
      </div>
    `;
  } catch (err) {
    console.error(err);
    container.innerHTML = 'Erreur lors de la récupération des stats.';
  }
}

function navigateTo(page) {
  window.location.href = page + '.html';
}

