function generateImage() {
    const habbo1 = document.getElementById('habbo1').value;
    const habbo2 = document.getElementById('habbo2').value;

    const habboImage1 = document.getElementById('habboImage1');
    const habboImage2 = document.getElementById('habboImage2');

    // Generate the imager URLs based on the Habbo names
    habboImage1.src = `https://habboden.com/habbo-imaging/${habbo1}?size=b&action=wav&frame=2`;
    habboImage2.src = `https://habboden.com/habbo-imaging/${habbo2}?size=b&action=wav&frame=2`;

    // Position the images correctly (adjust x and y based on your design)
    habboImage1.style.left = '20px'; // Adjust as needed for proper placement
    habboImage1.style.top = '10px';  // Adjust as needed for proper placement
    habboImage2.style.left = '80px';  // Adjust as needed for proper placement
    habboImage2.style.top = '10px';   // Adjust as needed for proper placement
}
