document.getElementById('shorten-btn').addEventListener('click', async function () {
  const url = document.getElementById('url').value.trim();
  const resultDiv = document.getElementById('result');

  if (!url) {
    resultDiv.textContent = 'Please enter a valid URL!';
    return;
  }

  try {
    // Use allorigins.win proxy to bypass CORS restrictions
    const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://api.shrtco.de/v2/shorten?url=' + url)}`);

    if (!response.ok) {
      throw new Error('Failed to shorten the URL. Please try again!');
    }

    const data = JSON.parse(await response.text());
    const jsonData = JSON.parse(data.contents);

    if (jsonData.ok) {
      const shortUrl = jsonData.result.full_short_link;
      resultDiv.innerHTML = `Shortened URL: <a href="${shortUrl}" target="_blank">${shortUrl}</a>`;
    } else {
      throw new Error('Invalid URL. Try again!');
    }
  } catch (error) {
    resultDiv.textContent = error.message;
  }
});
