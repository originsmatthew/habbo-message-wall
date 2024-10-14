document.addEventListener("DOMContentLoaded", function () {
  const currentPath = window.location.pathname;

  if (currentPath.includes("search.html")) {
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");

    // Trigger search on button click
    searchButton.addEventListener("click", searchMessages);

    // Trigger search when pressing the Enter key
    searchInput.addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        event.preventDefault(); // Prevent form submission if inside a form
        searchMessages();
      }
    });
  }
});

// Search functionality for search.html
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
    console.log("Airtable Response:", result); // Add this to inspect the returned data
    const messages = result.records;

    // Filter messages by "Your Habbo Name" or "Friend Habbo Name"
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
    console.error("Error fetching messages:", error); // Log the exact error for debugging
    messagesContainer.innerHTML = `<p>Failed to load messages. Error: ${error.message}</p>`;
  }
}

function displayMessages(messages) {
  const container = document.getElementById("messagesContainer");
  container.innerHTML = ""; // Clear existing messages

  messages.forEach((message) => {
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

    const messageBox = `
      <div class="message-box">
        <div class="avatar-container">
          <div class="avatar sender">
            <img src="https://habboera.com/imager?habbo=${yourHabbo}&size=l&gesture=std&action=wav&direction=2&head_direction=2&headonly=0" alt="${yourHabbo}">
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
            <img src="https://habboera.com/imager?habbo=${friendHabbo}&size=l&gesture=std&action=wav&direction=4&head_direction=4&headonly=0" alt="${friendHabbo}">
            <p>${friendHabbo}</p>
          </div>
        </div>
      </div>
    `;
    container.innerHTML += messageBox;
  });
}