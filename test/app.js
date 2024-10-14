// Global variable to toggle submissions
const submissionsOpen = false; // Set to false when submissions are closed

document.addEventListener("DOMContentLoaded", function () {
  const currentPath = window.location.pathname;

  if (currentPath.includes("search.html")) {
    initializeSearchPage();
  } else if (currentPath.includes("add-message.html")) {
    initializeAddMessagePage();
  } else {
    // Fetch messages for the homepage (with pagination)
    fetchMessages();
  }

  // Hide "Leave a Message" link if submissions are closed
  const addMessageLink = document.querySelector(".add-message-link");
  if (!submissionsOpen && addMessageLink) {
    addMessageLink.style.display = "none";
  }
});

// --- Load Header and Footer ---
function loadContent(selector, file) {
  fetch(file)
    .then((response) => response.text())
    .then((data) => {
      document.querySelector(selector).innerHTML = data;
    })
    .catch((error) => console.error("Error loading content:", error));
}

loadContent("#header-placeholder", "header.html");
loadContent("#footer-placeholder", "footer.html");

// --- Initialize Add Message Page ---
function initializeAddMessagePage() {
  const formContainer = document.getElementById("form-container");
  const submissionClosedMessage = document.getElementById("submission-closed");

  if (!submissionsOpen) {
    formContainer.style.display = "none";
    submissionClosedMessage.style.display = "block";
  } else {
    formContainer.style.display = "block";
    submissionClosedMessage.style.display = "none";
  }
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
      event.preventDefault(); // Prevent form submission if inside a form
      searchMessages();
    }
  });
}

// --- Search functionality for search.html ---
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

// --- Fetch messages with pagination (for index.html) ---
let currentPage = 1;
let offset = "";
const messagesPerPage = 10;

async function fetchMessages() {
  const airtableToken = "patJ1ygzZwHGdrzeE.086c49e787b3e28cf270914e240eade8279592e7f0aaa2206d7bc0fd41a29c11";
  const airtableBaseURL = "https://api.airtable.com/v0/app2r945tWexLP44Z/Messages";

  try {
    // Construct the URL to fetch the messages, applying pagination
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
    const messages = result.records;

    // Sort messages by submission date in descending order
    messages.sort((a, b) => new Date(b.createdTime) - new Date(a.createdTime));

    // Display the sorted messages
    displayMessages(messages);

    // Manage pagination buttons and offsets
    offset = result.offset || "";
    const prevButton = document.getElementById("prevPage");
    const nextButton = document.getElementById("nextPage");
    const pageIndicator = document.getElementById("pageIndicator");

    // Disable or enable buttons based on pagination logic
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = !offset || messages.length < messagesPerPage;
    pageIndicator.innerText = `Page ${currentPage}`;
  } catch (error) {
    console.error("Error fetching messages:", error);
    document.getElementById("messagesContainer").innerHTML = "<p>Failed to load messages.</p>";
  }
}

// --- Display the messages ---
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

// --- Pagination event listeners ---
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
