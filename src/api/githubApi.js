
const date = new Date().toISOString();
const apiUsername = username => `https://api.github.com/users/${username}`;
const apiTrendingTech = technology => `https://api.github.com/search/repositories?q=language:${technology},created:${date}&sort=star&order=desc`;


class githubApi {
  static getProfile(username) {
    return fetch(apiUsername(username))
      .then(response => {
        if (!response.ok) {
          throw Error(username + ' ' + response.statusText.toLocaleLowerCase());
        }
        return response;
      })
      .then(data => {
        return data.json();
      })
      .then(data => {
        return data;
      });
  }

  static getTrending(technology) {
    return fetch(apiTrendingTech(technology))
      .then(response => {
        if (!response.ok) {
          throw Error(technology + ' ' + response.statusText.toLocaleLowerCase());
        }
        return response;
      })
      .then(data => {
        return data.json();
      })
      .then(data => {
        return data;
      });
  }
}

export default githubApi;
