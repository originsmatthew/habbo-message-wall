// --- Initialize ---
document.addEventListener("DOMContentLoaded", function () {
  const submissionsOpen = true; // Set to false to close submissions
  const currentPath = window.location.pathname;

  if (currentPath.includes("search.html")) {
    initializeSearchPage();
  } else if (currentPath.includes("add-message.html")) {
    initializeAddMessagePage(submissionsOpen);
  } else {
    initializeHomePage(submissionsOpen);
  }

  // Hide "Leave a Message" link if submissions are closed
  const addMessageLink = document.querySelector(".add-message-link");
  if (!submissionsOpen && addMessageLink) {
    addMessageLink.style.display = "none";
  }

  // Load header and footer
  loadContent('#header-placeholder', 'header.html');
  loadContent('#footer-placeholder', 'footer.html');
});

// --- Load Header and Footer ---
function loadContent(selector, file) {
  fetch(file)
    .then(response => response.text())
    .then(data => {
      document.querySelector(selector).innerHTML = data;
    })
    .catch(error => console.error('Error loading content:', error));
}

// --- Initialize Home Page ---
function initializeHomePage(submissionsOpen) {
  let currentPage = 1;
  let allMessages = [];
  const messagesPerPage = 10;

  async function fetchAllMessages() {
    const airtableToken = "patJ1ygzZwHGdrzeE.086c49e787b3e28cf270914e240eade8279592e7f0aaa2206d7bc0fd41a29c11";
    const airtableBaseURL = "https://api.airtable.com/v0/app2r945tWexLP44Z/Messages";
    let offset = "";
    let isFetching = true;

    try {
      while (isFetching) {
        let url = `${airtableBaseURL}?filterByFormula={Approved}=TRUE()&pageSize=100`;
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
        allMessages = [...allMessages, ...result.records];

        offset = result.offset || "";
        isFetching = !!offset;
      }

      allMessages.sort((a, b) => new Date(b.createdTime) - new Date(a.createdTime));
      displayMessages(allMessages.slice(0, messagesPerPage));

      document.getElementById("prevPage").disabled = currentPage === 1;
      document.getElementById("nextPage").disabled = allMessages.length <= messagesPerPage;
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
      const submissionTime = createdTime.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: true });

      const messageBox = `
        <div class="message-box">
          <div class="avatar-container">
            <div class="avatar sender">
              <img src="https://habboden.com/habbo-imaging/${yourHabbo}?size=b&action=wav&frame=2" alt="${yourHabbo}">
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
              <img src="https://habboden.com/habbo-imaging/${yourHabbo}?size=b&action=wav&frame=2" alt="${friendHabbo}">
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
      const startIndex = (currentPage - 1) * messagesPerPage;
      displayMessages(allMessages.slice(startIndex, startIndex + messagesPerPage));
      document.getElementById("pageIndicator").innerText = `Page ${currentPage}`;
      document.getElementById("nextPage").disabled = false;
    }
    document.getElementById("prevPage").disabled = currentPage === 1;
  });

  document.getElementById("nextPage").addEventListener("click", function () {
    const startIndex = currentPage * messagesPerPage;
    if (startIndex < allMessages.length) {
      currentPage++;
      displayMessages(allMessages.slice(startIndex, startIndex + messagesPerPage));
      document.getElementById("pageIndicator").innerText = `Page ${currentPage}`;
      document.getElementById("prevPage").disabled = false;
    }
    document.getElementById("nextPage").disabled = currentPage * messagesPerPage >= allMessages.length;
  });

  fetchAllMessages();
}

// --- Initialize Add Message Page ---
function initializeAddMessagePage(submissionsOpen) {
  if (!submissionsOpen) {
    document.getElementById("message-form").style.display = "none";
    document.getElementById("submission-closed").style.display = "block";
    return;
  }

  const form = document.getElementById("message-form");
  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const yourHabboName = document.getElementById("your-habbo").value;
    const friendHabboName = document.getElementById("friend-habbo").value;
    const message = document.getElementById("message").value;

    // Profanity filter - add words as necessary
    const prohibitedWords = ["cunt", "whore", "fuck", "nonce", "pedo", "bastard", "bitch", "wanker"];
    const containsProhibitedWord = prohibitedWords.some(word =>
      message.toLowerCase().includes(word)
    );

    if (containsProhibitedWord) {
      alert("Please make your message kinder and avoid using inappropriate language.");
      return; // Stop form submission
    }

    const airtableToken = "patJ1ygzZwHGdrzeE.086c49e787b3e28cf270914e240eade8279592e7f0aaa2206d7bc0fd41a29c11";
    const airtableBaseURL = "https://api.airtable.com/v0/app2r945tWexLP44Z/Messages";

    try {
      const response = await fetch(airtableBaseURL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${airtableToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: {
            "Your Habbo Name": yourHabboName,
            "Friend Habbo Name": friendHabboName,
            "Message": message,
            "Approved": false,
          },
        }),
      });

      if (response.ok) {
        window.location.href = `thankyou.html?sender=${encodeURIComponent(yourHabboName)}&recipient=${encodeURIComponent(friendHabboName)}`;
      } else {
        alert("Error submitting your message.");
      }
    } catch (error) {
      console.error("Error submitting message:", error);
    }
  });
}

// --- Initialize Search Page ---
function initializeSearchPage() {
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");

  // Trigger search on button click
  searchButton.addEventListener("click", searchMessages);

  // Trigger search when pressing the Enter key
  searchInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      searchMessages();
    }
  });
}

// --- Search functionality ---
async function searchMessages() {
  const searchInput = document.getElementById("searchInput").value.toLowerCase();
  const messagesContainer = document.getElementById("messagesContainer");
  messagesContainer.innerHTML = "<p>Searching...</p>";

  if (searchInput.length === 0) {
    messagesContainer.innerHTML = "<p>Please enter a name to search.</p>";
    return;
  }

  const airtableToken = "patJ1ygzZwHGdrzeE.086c49e787b3e28cf270914e240eade8279592e7f0aaa2206d7bc0fd41a29c11";
  const airtableBaseURL = "https://api.airtable.com/v0/app2r945tWexLP44Z/Messages";

  try {
    const response = await fetch(`${airtableBaseURL}?filterByFormula={Approved}=TRUE()`, {
      headers: {
        Authorization: `Bearer ${airtableToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Airtable API error: ${response.status}`);
    }

    const result = await response.json();
    const messages = result.records;

    const filteredMessages = messages.filter((message) => {
      const yourHabbo = message.fields["Your Habbo Name"].toLowerCase();
      const friendHabbo = message.fields["Friend Habbo Name"].toLowerCase();
      return yourHabbo.includes(searchInput) || friendHabbo.includes(searchInput);
    });

    if (filteredMessages.length > 0) {
      displayMessages(filteredMessages);
    } else {
      messagesContainer.innerHTML = "<p>No messages found for that name.</p>";
    }
  } catch (error) {
    console.error("Error fetching messages:", error);
    messagesContainer.innerHTML = `<p>Failed to load messages. Error: ${error.message}</p>`;
  }
}
