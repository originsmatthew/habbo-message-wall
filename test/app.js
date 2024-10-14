document.addEventListener("DOMContentLoaded", function () {
  const currentPath = window.location.pathname;

  if (currentPath.includes("search.html")) {
    initializeSearchPage();
  } else if (currentPath.includes("add-message.html")) {
    initializeAddMessagePage();
  } else {
    initializeHomePage();
  }
});

// --- Common: Load Header and Footer ---
function loadContent(selector, file) {
  fetch(file)
    .then(response => response.text())
    .then(data => {
      document.querySelector(selector).innerHTML = data;
    })
    .catch(error => console.error('Error loading content:', error));
}

loadContent('#header-placeholder', 'header.html');
loadContent('#footer-placeholder', 'footer.html');

// --- Initialize the Home Page (index.html) ---
function initializeHomePage() {
  let currentPage = 1;
  let offset = "";
  const messagesPerPage = 10;

  async function fetchMessages() {
    const airtableToken = "patJ1ygzZwHGdrzeE.086c49e787b3e28cf270914e240eade8279592e7f0aaa2206d7bc0fd41a29c11";
    const airtableBaseURL = "https://api.airtable.com/v0/app2r945tWexLP44Z/Messages";

    try {
      let url = `${airtableBaseURL}?filterByFormula={Approved}=TRUE()&pageSize=${messagesPerPage}`;
      if (offset) {
        url += `&offset=${offset}`;
      }

      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${airtableToken}`,
          "Content-Type": "application/json",
        }
      });

      const result = await response.json();

      // Sort messages by submission date (newest first)
      result.records.sort((a, b) => new Date(b.createdTime) - new Date(a.createdTime));

      displayMessages(result.records);

      offset = result.offset || "";
      document.getElementById("prevPage").disabled = currentPage === 1;
      document.getElementById("nextPage").disabled = !offset || result.records.length < messagesPerPage;
      document.getElementById("pageIndicator").innerText = `Page ${currentPage}`;
    } catch (error) {
      console.error("Error fetching messages:", error);
      document.getElementById("messagesContainer").innerHTML = "<p>Failed to load messages.</p>";
    }
  }

  function displayMessages(messages) {
    const container = document.getElementById("messagesContainer");
    container.innerHTML = "";

    messages.forEach(message => {
      const yourHabbo = message.fields["Your Habbo Name"];
      const friendHabbo = message.fields["Friend Habbo Name"];
      const kindMessage = message.fields["Message"];
      const createdTime = new Date(message.createdTime);
      const submissionDate = createdTime.toLocaleDateString("en-GB");
      const submissionTime = createdTime.toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      const avatarURL = `https://habboera.com/imager?habbo=${yourHabbo}&size=l&gesture=std&action=wav&direction=2&head_direction=2&headonly=0`;

      const messageBox = `
        <div class="message-box">
          <div class="avatar-container">
            <div class="avatar sender">
              <img src="${avatarURL}" alt="${yourHabbo}">
              <p>${yourHabbo}</p>
            </div>
            <div class="message-content">
              <div class="pixel-message-container">
                <div class="pixel-message">
                  <p>${kindMessage}</p>
                </div>
                <p class="submission-time">Submitted on: ${submissionDate} @ ${submissionTime} UTC</p>
              </div>
            </div>
            <div class="avatar recipient">
              <img src="https://habboera.com/imager?habbo=${friendHabbo}&size=l" alt="${friendHabbo}">
              <p>${friendHabbo}</p>
            </div>
          </div>
        </div>
      `;
      container.innerHTML += messageBox;
    });
  }

  document.getElementById("prevPage").addEventListener("click", function () {
    if (currentPage > 1) {
      currentPage--;
      fetchMessages();
    }
  });

  document.getElementById("nextPage").addEventListener("click", function () {
    if (offset) {
      currentPage++;
      fetchMessages();
    }
  });

  fetchMessages();
}

// --- Initialize the Search Page (search.html) ---
function initializeSearchPage() {
  const airtableToken = "patJ1ygzZwHGdrzeE.086c49e787b3e28cf270914e240eade8279592e7f0aaa2206d7bc0fd41a29c11";
  const airtableBaseURL = "https://api.airtable.com/v0/app2r945tWexLP44Z/Messages";

  document.getElementById('searchButton').addEventListener('click', function() {
    const searchQuery = document.getElementById('searchInput').value.toLowerCase().trim();
    fetchMessages(searchQuery);
  });

  document.getElementById('searchInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      const searchQuery = event.target.value.toLowerCase().trim();
      fetchMessages(searchQuery);
    }
  });

  async function fetchMessages(query) {
    try {
      const response = await fetch(`${airtableBaseURL}?filterByFormula=AND(OR(FIND('${query}', LOWER({Your Habbo Name})) > 0, FIND('${query}', LOWER({Friend Habbo Name})) > 0), {Approved}=TRUE())`, {
        headers: {
          Authorization: `Bearer ${airtableToken}`,
          "Content-Type": "application/json",
        }
      });

      const result = await response.json();
      displayMessages(result.records);
    } catch (error) {
      console.error("Error fetching messages:", error);
      document.getElementById("messagesContainer").innerHTML = "<p>Failed to load messages.</p>";
    }
  }

  function displayMessages(messages) {
    const container = document.getElementById("messagesContainer");
    container.innerHTML = "";

    if (messages.length === 0) {
      container.innerHTML = "<p>No messages found.</p>";
      return;
    }

    messages.forEach(message => {
      const yourHabbo = message.fields["Your Habbo Name"];
      const friendHabbo = message.fields["Friend Habbo Name"];
      const kindMessage = message.fields["Message"];
      const createdTime = new Date(message.createdTime);
      const submissionDate = createdTime.toLocaleDateString("en-GB");
      const submissionTime = createdTime.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: true });

      const messageBox = `
        <div class="message-box">
          <div class="avatar-container">
            <div class="avatar sender">
              <img src="https://habboera.com/imager?habbo=${yourHabbo}&size=l" alt="${yourHabbo}">
              <p>${yourHabbo}</p>
            </div>
            <div class="message-content">
              <p>${kindMessage}</p>
              <p class="submission-time">Submitted on: ${submissionDate} @ ${submissionTime} UTC</p>
            </div>
            <div class="avatar recipient">
              <img src="https://habboera.com/imager?habbo=${friendHabbo}&size=l" alt="${friendHabbo}">
              <p>${friendHabbo}</p>
            </div>
          </div>
        </div>
      `;
      container.innerHTML += messageBox;
    });
  }
}

// --- Initialize the Add Message Page (add-message.html) ---
function initializeAddMessagePage() {
  const airtableToken = "patJ1ygzZwHGdrzeE.086c49e787b3e28cf270914e240eade8279592e7f0aaa2206d7bc0fd41a29c11";
  const airtableBaseURL = "https://api.airtable.com/v0/app2r945tWexLP44Z/Messages";

  document.getElementById("submit-message").addEventListener("submit", async function(event) {
    event.preventDefault();

    const yourHabbo = document.getElementById("your-habbo").value;
    const friendHabbo = document.getElementById("friend-habbo").value;
    const message = document.getElementById("message").value;

    const data = {
      fields: {
        "Your Habbo Name": yourHabbo,
        "Friend Habbo Name": friendHabbo,
        "Message": message,
        "Approved": false
      }
    };

    try {
      const response = await fetch(`${airtableBaseURL}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${airtableToken}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error("Error submitting message");
      }

      window.location.href = "thankyou.html";
    } catch (error) {
      console.error("Error submitting message:", error);
      alert("There was an issue submitting your message. Please try again.");
    }
  });
}
