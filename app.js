let kb;
const $ = (s) => document.querySelector(s);
fetch("ox_knowledge.json").then((r) => r.json()).then((x) => { kb = x; });
function words(s) { return new Set(s.toLowerCase().match(/[a-z]{3,}/g) || []); }
function score(q, x) { let a=words(q), b=words(JSON.stringify(x)), n=0; for (const w of a) if (b.has(w)) n++; for (const k of (x.keywords || [])) if (q.toLowerCase().includes(k)) n+=5; return n; }
function best(q) { return kb.topics.map((x)=>[score(q,x),x]).sort((a,b)=>b[0]-a[0]).slice(0,3).map((x)=>x[1]); }
function msg(t,c) { const d=document.createElement("div"); d.className=c; d.textContent=t; $("#chat").append(d); $("#chat").scrollTop=$("#chat").scrollHeight; }
function answer(q) {
  const xs=best(q), x=xs[0], mode=$("#mode").value, sector=$("#sector").value;
  if (mode === "360") {
    const ind=kb.indicators.slice(0,8);
    return "360 feedback guidance for " + sector + ":\n\n" + ind.map((i)=>"• "+i.domain+": "+i.indicator).join("\n") + "\n\nUse this scale: " + ind[0].scale + "\nAsk raters: " + ind[0].prompt;
  }
  if (mode === "simulate") {
    const sim=kb.simulations.find((z)=>z.title===x.title) || kb.simulations[0];
    return "Simulation — " + sim.title + "\n\nLeader opening:\n“" + sim.opening + "”\n\nPossible response:\n“" + sim.employee_replies[0] + "”\n\nYour task: Write your next two sentences. Effective moves include:\n• " + sim.leader_moves.join("\n• ");
  }
  const script = mode === "script" ? "\n\nSuggested opening:\n“I want to discuss [specific pattern] because it is affecting [shared outcome]. I will describe what I observed, then I want to understand your perspective.”\n\nFollow with:\n“In [situation], I observed [behavior]. The impact was [impact]. How do you see it?”" : "";
  return "Before advising, consider:\n• " + x.questions.join("\n• ") + "\n\nLeadership approach for " + sector + ":\n" + x.framework + script + "\n\nNext steps:\n1. " + x.actions[0] + "\n2. " + x.actions[1] + "\n3. " + x.actions[2] + "\n\nRelated lenses: " + xs.slice(1).map((z)=>z.title).join("; ") + "\n\nUse qualified organizational resources for legal, clinical, medical, HR, regulatory, financial, or policy decisions.";
}
$("form").onsubmit=(e)=>{ e.preventDefault(); const q=$("#q").value.trim(); if(!q || !kb) return; $("#q").value=""; msg(q,"user"); msg(answer(q),"bot"); };
document.querySelectorAll("[data-q]").forEach((b)=>{ b.onclick=()=>{ $("#q").value=b.dataset.q; $("form").requestSubmit(); }; });
