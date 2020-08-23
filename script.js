//jshint esversion: 8

/*



Author: Anthony Noel

Future Development
-A way to make asynchronous programming more synchronous so i can wait for results
-Provide further explanation to the answers

*/

const buttons = Array.from(document.querySelectorAll("button[data-question]"));


const [endpoint1, endpoint2, endpoint3] = ["https://www.balldontlie.io/api/v1/stats?seasons[]=2019&player_ids[]=237&per_page=100",
"https://www.balldontlie.io/api/v1/teams?&per_page=100","https://www.balldontlie.io/api/v1/season_averages?season=2019&player_ids[]=192"];

const initPage = () => {
  getCurrentStats();

  buttons.forEach(button => button.addEventListener("click", displayAnswer));

};
//Use fetch to do api request to nba api:
const getCurrentStats = async () => {
  //q1 fetch request for all 40point games of lebron james
  const isFortyGames = await fetch(endpoint1)
  .then(response => response.json())
  .then(data =>  data.data.some(game => game.pts >= 40));//return a boolean value for if there is a game in this array where he scores at least 40 pts
  //make the paragraph element for q1 equal to the result of isFortyGames
  document.querySelector("p[data-question=q1]").innerText = (isFortyGames) ? "True": "False";


  //q2 fetch request to find if there are any teams in la
  const isLATeam = await fetch(endpoint2)
  .then(response => response.json())
  .then(data => data.data.some(team =>team.city.includes("Los Angeles")));
  //make the paragraph element for q2 equal to the result of isLATeam
  //I wanted it to show "yes" or "no" so switch out the values for the boolean for those
  document.querySelector("p[data-question=q2]").innerText  = (isLATeam) ? "Yes" : "No";

  //q3 fetch request for pt average of James Harden of this season
  const ptsAvg = await fetch(endpoint3)
  .then(response => response.json())
  .then(data => data.data[0].pts);

  //make the paragraph element for q2 equal to the result of isLATeam
    document.querySelector("p[data-question=q3]").innerText = ptsAvg+ " points";


  //Now set the buttons active
  buttons.forEach(button => button.disabled = false);

};



displayAnswer = (e) => {
  //Grab the button's data-question attribute to find what question it belongs to
  const data_Question = e.target.dataset.question;
  //Use it to find the corresponding paragraph answer tag with the same data-data_Question
  const answerP = document.querySelector(`p[data-question="${data_Question}"]`);
  //Display the paragraph answer by adding the active class
  answerP.classList.add("active");


};

initPage();
