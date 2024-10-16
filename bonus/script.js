function generateImage() {
    const habbo1 = document.getElementById('habbo1').value;
    const habbo2 = document.getElementById('habbo2').value;

    const habboImage1 = document.getElementById('habboImage1');
    const habboImage2 = document.getElementById('habboImage2');

    // Generate the image URLs based on the Habbo names
    habboImage1.src = `https://habboden.com/habbo-imaging/${habbo1}?size=b&action=std&gesture=sml`;
    habboImage2.src = `https://habboden.com/habbo-imaging/${habbo2}?size=b&action=std&gesture=sml`;

    // Show the Habbo images
    habboImage1.style.display = 'block'; 
    habboImage2.style.display = 'block'; 

    // Position the images correctly behind the holiday romance
    habboImage1.style.left = '32.9%'; // Adjust for horizontal positioning
    habboImage1.style.bottom = '30.5%'; // Position above holiday romance

    habboImage2.style.right = '29.5%'; // Adjust for horizontal positioning
    habboImage2.style.bottom = '37%'; // Position above holiday romance

    // Display the caption
    const captionDisplay = document.getElementById('captionDisplay');
    captionDisplay.textContent = `${habbo1} | ${habbo2}`; 
}

function resetFields() {
    document.getElementById('habbo1').value = ''; 
    document.getElementById('habbo2').value = ''; 
    const habboImage1 = document.getElementById('habboImage1');
    const habboImage2 = document.getElementById('habboImage2');
    const captionDisplay = document.getElementById('captionDisplay'); // Caption display element
    habboImage1.style.display = 'none'; 
    habboImage2.style.display = 'none'; 
    captionDisplay.textContent = ''; // Clear caption text
}

function changeBackground(selectedBackground) {
    const imageDisplay = document.getElementById('imageDisplay');

    // Change the background based on the selected option
    switch (selectedBackground) {
        case 'bg1':
            imageDisplay.style.backgroundImage = "url('background1.png')";
            imageDisplay.style.backgroundSize = "cover"; // Control the size (cover, contain, or specific dimensions)
            break;
        case 'bg2':
            imageDisplay.style.backgroundImage = "url('background2.png')";
            imageDisplay.style.backgroundSize = "contain"; // Change this to desired size
            break;
        case 'bg3':
            imageDisplay.style.backgroundImage = "url('background3.png')";
            imageDisplay.style.backgroundSize = "100% 100%"; // Adjust as needed
            break;
        case 'none':
            imageDisplay.style.backgroundImage = "none"; // No background
            break;
    }
}

