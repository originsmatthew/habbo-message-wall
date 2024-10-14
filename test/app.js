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

        // Add messages to allMessages array
        allMessages = [...allMessages, ...result.records];

        // Check if there's more to fetch
        offset = result.offset || "";
        isFetching = !!offset;
      }

      // Sort all messages by submission date (newest first)
      allMessages.sort((a, b) => new Date(b.createdTime) - new Date(a.createdTime));

      // Display the first page of messages
      displayMessages(allMessages.slice(0, messagesPerPage));

      // Enable or disable pagination buttons based on message count
      const prevButton = document.getElementById("prevPage");
      const nextButton = document.getElementById("nextPage");
      prevButton.disabled = currentPage === 1;
      nextButton.disabled = allMessages.length <= messagesPerPage;
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

      const senderAvatarURL = `https://habboera.com/imager?habbo=${yourHabbo}&size=l&gesture=std&action=wav&direction=2&head_direction=2&headonly=0`;
      const recipientAvatarURL = `https://habboera.com/imager?habbo=${friendHabbo}&size=l&gesture=std&action=wav&direction=4&head_direction=4&headonly=0`;

      const messageBox = `
        <div class="message-box">
          <div class="avatar-container">
            <div class="avatar sender">
              <img src="${senderAvatarURL}" alt="${yourHabbo}">
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
              <img src="${recipientAvatarURL}" alt="${friendHabbo}">
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
