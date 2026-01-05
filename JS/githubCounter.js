document.addEventListener("DOMContentLoaded", () => {
  const githubLinks = document.querySelectorAll('a[href*="github.com"]');
  let username = null;

  githubLinks.forEach(link => {
    const urlParts = link.href.split("/").filter(Boolean);
    const githubIndex = urlParts.findIndex(part => part.includes("github.com"));
    if (githubIndex !== -1 && urlParts.length > githubIndex + 1) {
      username = urlParts[githubIndex + 1];
    }
  });

  if (username) {
    fetch(`https://api.github.com/users/${username}`)
      .then(response => response.json())
      .then(data => {
        document.getElementById("repoCount").textContent =
          typeof data.public_repos === "number" ? data.public_repos : "N/A";
        document.getElementById("followerCount").textContent =
          typeof data.followers === "number" ? data.followers : "N/A";
      })
      .catch(error => {
        document.getElementById("repoCount").textContent = "Error";
        document.getElementById("followerCount").textContent = "Error";
        console.error("GitHub API error:", error);
      });
  }
});