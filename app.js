const $ = (selector) => document.querySelector(selector);
const workerUrl = window.OX_CONFIG.workerUrl;
let knowledge = { resources: [] };
let history = [];

fetch("ox_knowledge.json")
  .then((response) => {
    if (!response.ok) throw new Error("Knowledge file could not be loaded.");
    return response.json();
  })
  .then((data) => { knowledge = data; })
  .catch((error) => console.error(error));

function tokenize(text) {
  return new Set((text.toLowerCase().match(/[a-z0-9]{3,}/g) || []));
}

function resourceScore(question, resource, sector) {
  const query = question.toLowerCase();
  const queryTokens = tokenize(question);
  const resourceTokens = tokenize(JSON.stringify(resource));
  let score = 0;

  for (const token of queryTokens) {
    if (resourceTokens.has(token)) score += 1;
  }
  for (const keyword of resource.keywords || []) {
    if (query.includes(keyword.toLowerCase())) score += 7;
  }
  if (sector !== "Cross-Sector" && resource.sector === sector) score += 4;
  if (resource.sector === "Cross-Sector") score += 1;
  return score;
}

function retrieveResources(question, sector) {
  return knowledge.resources
    .map((resource) => ({ resource, score: resourceScore(question, resource, sector) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(({ resource }) => resource);
}

function addMessage(text, type) {
  const article = document.createElement("article");
  article.className = `message ${type}`;
  const body = document.createElement("div");
  const paragraph = document.createElement("p");
  paragraph.textContent = text;
  body.appendChild(paragraph);

  if (type === "assistant") {
    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.textContent = "OX";
    article.append(avatar, body);
  } else {
    article.append(body);
  }

  $("#chat").appendChild(article);
  $("#chat").scrollTop = $("#chat").scrollHeight;
  return paragraph;
}

async function checkConnection() {
  try {
    const rootUrl = workerUrl.replace(/\/api\/chat$/, "/");
    const response = await fetch(rootUrl, { method: "GET" });
    if (!response.ok) throw new Error("Cloudflare Worker is unavailable.");
    $("#connection").textContent = "Cloudflare AI is connected.";
    $("#connection").className = "connection ok";
  } catch (error) {
    $("#connection").textContent = "Cloudflare AI connection could not be verified.";
    $("#connection").className = "connection error";
    console.error(error);
  }
}

async function askCoach(question) {
  const sector = $("#sector").value;
  const mode = $("#mode").value;
  const resources = retrieveResources(question, sector);

  const response = await fetch(workerUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      question,
      sector,
      mode,
      resources,
      history: history.slice(-6)
    })
  });

  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error(`Cloudflare returned a non-JSON response (${response.status}).`);
  }

  if (!response.ok) {
    throw new Error(data.error || `Cloudflare request failed (${response.status}).`);
  }
  if (!data.answer) {
    throw new Error("Cloudflare returned no coaching answer.");
  }
  return data.answer;
}

$("#form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const question = $("#question").value.trim();
  if (!question) return;

  $("#question").value = "";
  addMessage(question, "user");
  const pending = addMessage("Considering your situation…", "assistant");
  $("#send").disabled = true;
  $("#send").textContent = "Thinking…";

  try {
    const answer = await askCoach(question);
    pending.textContent = answer;
    history.push(
      { role: "user", content: question },
      { role: "assistant", content: answer }
    );
    history = history.slice(-6);
  } catch (error) {
    pending.textContent = `${error.message}\n\nConfirm the Worker is deployed, the AI binding is named AI, and the Worker permits https://theoxgroup.github.io in its CORS headers.`;
    console.error(error);
  } finally {
    $("#send").disabled = false;
    $("#send").textContent = "Ask Coach";
    $("#question").focus();
  }
});

$("#question").addEventListener("keydown", (event) => {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    $("#form").requestSubmit();
  }
});

document.querySelectorAll("[data-prompt]").forEach((button) => {
  button.addEventListener("click", () => {
    $("#question").value = button.dataset.prompt;
    $("#form").requestSubmit();
  });
});

$("#reset").addEventListener("click", () => {
  history = [];
  $("#chat").innerHTML = "";
  addMessage("New conversation started. What leadership situation would you like to work through?", "assistant");
});

checkConnection();
