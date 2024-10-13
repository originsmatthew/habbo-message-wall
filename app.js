document.addEventListener("DOMContentLoaded", function () {
  const currentPath = window.location.pathname;

  // Check if we're on the "add-message.html" page
  if (currentPath.includes("add-message.html")) {
    document
      .getElementById("submit-message")
      .addEventListener("submit", submitMessage);
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
