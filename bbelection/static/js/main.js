const url = "https://bb-election-api.herokuapp.com";

document.addEventListener("DOMContentLoaded", function() {
  axios
    .get(`${url}/`)
    .then(response => {
      const {data} = response;
      const ul = document.querySelector("#candidates");
      ul.innerHTML = "";
      data.candidates.forEach(candidate => {
        let li = document.createElement("li");
        li.id = "candidate-" + candidate.id;
        li.textContent = `${candidate.name}: (${candidate.votes} votes)`;
        let form = document.createElement("form");
        form.method = "post";
        form.action = `${url}/vote`;
        let input1 = document.createElement("input");
        input1.type = "hidden";
        input1.name = "id";
        input1.value = candidate.id;
        form.appendChild(input1);
        let input2 = document.createElement("input");
        input2.type = "submit";
        input2.value = "Vote";
        form.appendChild(input2);
        form.addEventListener("submit", voteForCandidate);
        li.appendChild(form);
        ul.appendChild(li);
      });
    })
    .catch(error => {
      console.log(error);
    });
});

const voteForCandidate = event => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = {
    id: form.querySelector("input[name=id]").value
  };
  axios
    .post(form.action, data)
    .then(response => {
      if (response.status === 200) {
        alert("Vote successful");
      } else {
        alert("Bad response code returned");
      }
    })
    .catch(error => {
      alert("Something bad happened");
      console.error(error);
    });
};
