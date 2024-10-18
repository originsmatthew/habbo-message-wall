document.getElementById('getHoroscope').addEventListener('click', generateHoroscope);

// Magical loading phrases
const loadingPhrases = [
    "... getting your horoscope ...",
    "... aligning with the stars ...",
    "... consulting the universe ...",
    "... reading the signs ...",
    "... unlocking your future ...",
    "... finding your cosmic path ..."
];

// Add missing variables
const expressions = {
    sad: ["sad", "under the weather", "deflated", "uninspired", "sad"],
    spk: ["chatty", "like you're an open book", "you're full of words", "you're eager to talk", "you're ready to share", "expressive"],
    eyb: ["sleepy", "tired", "drained", "exhausted", "in need of rest", "a little foggy-headed"],
    agr: ["angry", "annoyed", "frustrated", "on edge", "irritable", "fuming"],
    srp: ["shocked", "surprised", "taken aback", "astonished", "wide-eyed", "in disbelief"]
};

const colors = ['Red', 'Blue', 'Green', 'Purple', 'Yellow', 'Orange', 'Pink', 'Black', 'White', 'Gold', 'Silver', 'Turquoise', 'Violet', 'Brown', 'Magenta'];
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const handItems = [
    { crr: 0, text: '' },
    { crr: 1, text: 'Enjoy a refreshing drink today. You\'re safe.' },
    { crr: 2, text: 'You\'ve drawn a carrot. Lucky this isn\'t a game of fridge. You would be out!' },
    { crr: 3, text: 'You\'ve drawn an ice-cream. P2K?' },
    { crr: 6, text: 'You\'ve drawn a coffee. Make sure to get your energy fix today!' }
];

function generateHoroscope() {
    const habboName = document.getElementById('habboName').value;
    const horoscopeSign = document.getElementById('horoscopeSign').value;

    // Ensure the starsign and avatar are hidden initially
    document.getElementById('starSign').style.display = "none"; 
    document.getElementById('avatar').innerHTML = ''; // Clear the avatar
    document.getElementById('horoscopeText').innerText = ''; // Clear horoscope text

    // Show loading message
    const randomLoadingPhrase = loadingPhrases[Math.floor(Math.random() * loadingPhrases.length)];
    document.getElementById('loadingMessage').innerText = randomLoadingPhrase;
    document.getElementById('loadingMessage').style.display = "block"; // Show the loading message

    // Hide the horoscope result while loading
    document.getElementById('resultContent').style.display = "none";

    // Delay the horoscope generation to simulate "magical" loading
    setTimeout(() => {
        // Randomly select an expression and retrieve a corresponding phrase
        const randomExpressionKey = Object.keys(expressions)[Math.floor(Math.random() * Object.keys(expressions).length)];
        const randomExpressionPhrase = expressions[randomExpressionKey][Math.floor(Math.random() * expressions[randomExpressionKey].length)];

        // Randomly select color, number, and advice
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];

        // Horoscope message
        let randomMessage = `${randomColor} is a powerful force for you today. Keep it close as it brings clarity and focus.`;
        let finalMessage = randomMessage;

        // Randomly select a hand item and append its corresponding text to the horoscope
        const randomHandItem = handItems[Math.floor(Math.random() * handItems.length)];
        if (randomHandItem.text) {
            finalMessage += ` ${randomHandItem.text}`;
        }

        // Display the avatar with the hand item
        const avatarHtml = `<img src="https://habboden.com/habbo-imaging/${habboName}?size=b&action=std&direction=2&head_direction=2&gesture=${randomExpressionKey}&crr=${randomHandItem.crr}" alt="${habboName}" />`;
        document.getElementById('avatar').innerHTML = avatarHtml;

        // Display the star sign image after generation
        if (horoscopeSign) {
            const starSignUrl = `horoscopeimages/${horoscopeSign}.png`;
            document.getElementById('starSign').src = starSignUrl;
            document.getElementById('starSign').style.display = "block"; // Show the starsign after generation
        }

        // Display the horoscope text
        document.getElementById('horoscopeText').innerText = finalMessage;

        // Hide the loading message and show the result
        document.getElementById('loadingMessage').style.display = "none";
        document.getElementById('resultContent').style.display = "flex";

    }, 2000); // 2 seconds delay to simulate magic
}