import React, {useState} from 'react';




// repo name
// repo description : About
// commit date
// commit sha1
// commit text
const getRepo = () => {
  return fetch(`https://api.github.com/users/issamelferkh/repos`)
    .then(response => response.json())
    .then(response => {
      return response;
    })
  }


    //     this.setState({ 
    //     name: repo.name,
    //     description: repo.description,
    //     git_url: repo.git_url,
    //     stargazers_count: repo.stargazers_count,
    //     forks_count: repo.forks_count,
    //     open_issues_count: repo.open_issues_count,
    //     size: repo.size,

    //  })









const Project = () => {
  const [repo, setRepo] = useState(0);

  repo = setRepo(getRepo());
  console.log(repo);


  return (
    <div>
      <div id="code">
        <h3>GitHub Projects</h3>
        <ul>
          <li id="cf-worker-wasm">
            <a href="https://github.com/wg/cf-worker-wasm">cf-worker-wasm</a>
            <a href="https://github.com/wg/cf-worker-wasm">WASM on CloudFlare Workers</a>
            <span class="commit"><span class="date">2022-01-12</span><span class="sha1">f035d5e9afc9417a8e99ce69a531519c28b3f338</span>initial import</span>
            </li>
          </ul>
      </div>
    </div>
  );
};

export default Project;
