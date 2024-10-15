function generateImage() {
    const habbo1 = document.getElementById('habbo1').value;
    const habbo2 = document.getElementById('habbo2').value;

    const habboImage1 = document.getElementById('habboImage1');
    const habboImage2 = document.getElementById('habboImage2');

    // Generate the imager URLs based on the Habbo names
    habboImage1.src = `https://habboden.com/habbo-imaging/${habbo1}?size=b&action=wav&frame=2`;
    habboImage2.src = `https://habboden.com/habbo-imaging/${habbo2}?size=b&action=wav&frame=2`;

    // Position the images correctly behind the holiday romance
    habboImage1.style.left = '40px'; // Adjust based on your design
    habboImage1.style.bottom = '0px'; // Align to the bottom of the holiday romance image
    habboImage2.style.left = '100px'; // Adjust based on your design
    habboImage2.style.bottom = '0px'; // Align to the bottom of the holiday romance image
}
