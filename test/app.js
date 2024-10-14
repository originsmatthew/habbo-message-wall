// Initialize the add-message page
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
            "Approved": false, // Messages are not approved by default
          },
        }),
      });

      if (response.ok) {
        window.location.href = `thankyou.html?sender=${encodeURIComponent(yourHabboName)}&recipient=${encodeURIComponent(friendHabboName)}`;
      } else {
        console.error("Failed to submit message:", response.status);
        alert("Failed to submit your message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting message:", error);
      alert("Error submitting your message. Please try again.");
    }
  });
}

// Initialize the thank-you page and generate avatars
function initializeThankYouPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const sender = urlParams.get("sender");
  const recipient = urlParams.get("recipient");

  if (sender && recipient) {
    document.getElementById("sender-avatar").src = `https://habboera.com/imager?habbo=${sender}&size=l&gesture=std&action=wav&direction=2&head_direction=2&headonly=0`;
    document.getElementById("recipient-avatar").src = `https://habboera.com/imager?habbo=${recipient}&size=l&gesture=std&action=wav&direction=4&head_direction=4&headonly=0`;
    document.getElementById("sender-name").innerText = sender;
    document.getElementById("recipient-name").innerText = recipient;
  } else {
    document.getElementById("avatars-container").innerHTML = "<p>Sender or Recipient not found in the URL.</p>";
  }
}

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
    console.error("Error fetching messages:", error);
    messagesContainer.innerHTML = `<p>Failed to load messages. Error: ${error.message}</p>`;
  }
}

// Display messages in search
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
