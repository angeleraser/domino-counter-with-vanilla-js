import { onEventListener } from "./main.js";
const homeScoreboard = document.getElementById("home-team");
const visitorScoreboard = document.getElementById("visitor-team");
onEventListener(homeScoreboard);
onEventListener(visitorScoreboard);
