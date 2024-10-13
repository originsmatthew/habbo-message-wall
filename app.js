document.addEventListener("DOMContentLoaded", function () {
  const currentPath = window.location.pathname;

  // Check if we're on the "add-message.html" page
  if (currentPath.includes("add-message.html")) {
    document
      .getElementById("submit-message")
      .addEventListener("submit", submitMessage);
  }

  // Check if we're on the homepage to load messages and handle pagination
  if (currentPath.includes("index.html")) {
    fetchMessages();
  }
});

// Function to submit a message
async function submitMessage(event) {
  event.preventDefault(); // Prevent form reload

  const yourHabbo = document.getElementById("your-habbo").value;
  const friendHabbo = document.getElementById("friend-habbo").value;
  const message = document.getElementById("message").value;

  const data = {
    fields: {
      "Your Habbo Name": yourHabbo,
      "Friend Habbo Name": friendHabbo,
      Message: message,
      Approved: false, // Set to false, to be manually approved later
    },
  };

  try {
    // Send POST request to Airtable
    const response = await fetch(
      "https://api.airtable.com/v0/app2r945tWexLP44Z/Messages",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer patJ1ygzZwHGdrzeE.086c49e787b3e28cf270914e240eade8279592e7f0aaa2206d7bc0fd41a29c11`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!response.ok) {
      const errorDetails = await response.json();
      throw new Error(
        `Error submitting message: ${JSON.stringify(errorDetails)}`
      );
    }

    // Redirect to the thank you page after successful submission
    window.location.href = "thankyou.html";
  } catch (error) {
    console.error("Error submitting message:", error);
    alert("There was an issue submitting your message. Please try again.");
  }
}

// Pagination logic
let currentPage = 1;
const messagesPerPage = 10;

async function fetchMessages() {
  const airtableToken =
    "patJ1ygzZwHGdrzeE.086c49e787b3e28cf270914e240eade8279592e7f0aaa2206d7bc0fd41a29c11";
  const airtableBaseURL =
    "https://api.airtable.com/v0/app2r945tWexLP44Z/Messages";

  try {
    const response = await fetch(
      `${airtableBaseURL}?filterByFormula={Approved}=TRUE()`,
      {
        headers: {
          Authorization: `Bearer ${airtableToken}`,
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();
    const messages = result.records;

    // Sort messages by creation date (newest first)
    messages.sort((a, b) => new Date(b.createdTime) - new Date(a.createdTime));

    // Paginate messages
    const totalPages = Math.ceil(messages.length / messagesPerPage);
    displayMessages(messages, currentPage, totalPages);

    // Show or hide pagination buttons based on the page
    const prevButton = document.getElementById("prevPage");
    const nextButton = document.getElementById("nextPage");

    prevButton.style.display = currentPage > 1 ? "inline-block" : "none";
    nextButton.style.display =
      currentPage < totalPages ? "inline-block" : "none";

    prevButton.onclick = () => {
      currentPage--;
      displayMessages(messages, currentPage, totalPages);
    };

    nextButton.onclick = () => {
      currentPage++;
      displayMessages(messages, currentPage, totalPages);
    };
  } catch (error) {
    console.error("Error fetching messages:", error);
    document.getElementById("messagesContainer").innerHTML =
      "<p>Failed to load messages.</p>";
  }
}

function displayMessages(messages, page, totalPages) {
  const container = document.getElementById("messagesContainer");
  container.innerHTML = ""; // Clear existing messages

  const start = (page - 1) * messagesPerPage;
  const end = start + messagesPerPage;
  const messagesToShow = messages.slice(start, end);

  messagesToShow.forEach((message) => {
    const yourHabbo = message.fields["Your Habbo Name"];
    const friendHabbo = message.fields["Friend Habbo Name"];
    const kindMessage = message.fields["Message"];
    const submissionTime = new Date(message.createdTime).toLocaleString(
      "en-US",
      { timeZone: "UTC" }
    );

    const messageBox = `
      <div class="message-box">
        <div class="avatar-container">
          <div class="avatar sender">
            <img src="https://habboera.com/imager?habbo=${yourHabbo}&size=l&gesture=std&action=wav&direction=2&head_direction=2&headonly=0" alt="${yourHabbo}">
            <p>${yourHabbo}</p>
          </div>
          <div class="message-content">
            <div class="pixel-message">
              <p>${kindMessage}</p>
              <p class="submission-time">Submitted on: ${submissionTime} UTC</p>
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
