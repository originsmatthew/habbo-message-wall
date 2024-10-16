function generateImage() {
    const habbo = document.getElementById('habbo').value;

    const habboImage = document.getElementById('habboImage');

    // Generate the image URL based on the Habbo name
    habboImage.src = `https://habboden.com/habbo-imaging/${habbo}?size=b&action=std&gesture=sml`;

    // Show the Habbo image
    habboImage.style.display = 'block'; 

    // Position the image correctly above the speakers corner
    habboImage.style.left = '40%'; // Adjust for horizontal positioning
    habboImage.style.bottom = '195px'; // Position above speakers corner

    // Display the caption
    const captionDisplay = document.getElementById('captionDisplay');
    captionDisplay.textContent = `Dear Citizens... ${habbo} has something to say.`; // Updated caption
}

function resetFields() {
    document.getElementById('habbo').value = ''; 
    const habboImage = document.getElementById('habboImage');
    const captionDisplay = document.getElementById('captionDisplay'); // Caption display element
    habboImage.style.display = 'none'; 
    captionDisplay.textContent = ''; // Clear caption text
}

function changeBackground(selectedBackground) {
    const imageDisplay = document.getElementById('imageDisplay');

    // Change the background based on the selected option
    switch (selectedBackground) {
        case 'bg1':
            imageDisplay.style.backgroundImage = "url('background4.png')";
            imageDisplay.style.backgroundSize = "cover"; // Control the size (cover, contain, or specific dimensions)
            break;
        case 'bg2':
            imageDisplay.style.backgroundImage = "url('background5.png')";
            imageDisplay.style.backgroundSize = "tile"; // Change this to desired size
            break;
        case 'bg3':
            imageDisplay.style.backgroundImage = "url('background6.png')";
            imageDisplay.style.backgroundSize = "cover"; // Adjust as needed
            break;
        case 'none':
            imageDisplay.style.backgroundImage = "none"; // No background
            break;
    }
}