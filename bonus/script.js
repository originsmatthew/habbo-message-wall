function generateImage() {
    const habbo1 = document.getElementById('habbo1').value;
    const habbo2 = document.getElementById('habbo2').value;

    const habboImage1 = document.getElementById('habboImage1');
    const habboImage2 = document.getElementById('habboImage2');

    // Generate the imager URLs based on the Habbo names
    habboImage1.src = `https://habboden.com/habbo-imaging/${habbo1}?size=b&action=wav&frame=2`;
    habboImage2.src = `https://habboden.com/habbo-imaging/${habbo2}?size=b&action=wav&frame=2`;

    // Position the images correctly behind the holiday romance
    habboImage1.style.left = '10px'; // Adjusted for better alignment
    habboImage1.style.bottom = '-100px'; // Lowered for better fit
    habboImage2.style.left = '28px'; // Adjust based on your design
    habboImage2.style.bottom = '-83px'; // Lowered for better fit

    // Show the Habbo images
    habboImage1.style.display = 'block'; // Show Habbo 1
    habboImage2.style.display = 'block'; // Show Habbo 2
}
