chrome.runtime.onMessage.addListener((message)=>{

  document.getElementById("mood-status").innerText =
  "Detected Mood: " + message.mood;

});