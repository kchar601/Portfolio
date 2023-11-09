  function loadAboutMe() {
    const target = document.querySelector('.aboutMe');
    fetch('./aboutme.json')
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      json.forEach((line) => {
      const p = document.createElement('p');
      p.innerHTML = line.text;
      target.appendChild(p);
      }
      )
    })

  }

  window.onload = function() {
    loadAboutMe();
  };