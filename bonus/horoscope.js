document.getElementById('getHoroscope').addEventListener('click', generateHoroscope);

// Magical loading phrases
const loadingPhrases = [
    "... getting your habboscope ...",
    "... aligning with the stars ...",
    "... consulting the universe ...",
    "... reading the signs ...",
    "... unlocking your future ...",
    "... finding your cosmic path ..."
    "... consulting the enigmas ..."
    "... detecting energy ..."
];

// Expressions associated with different avatar gestures
const expressions = {
    sad: ["sad", "under the weather", "deflated", "uninspired", "sad"],
    spk: ["chatty", "like you're an open book", "you're full of words", "you're eager to talk", "you're ready to share", "expressive"],
    eyb: ["sleepy", "tired", "drained", "exhausted", "in need of rest", "a little foggy-headed"],
    agr: ["angry", "annoyed", "frustrated", "on edge", "irritable", "fuming"],
    srp: ["shocked", "surprised", "taken aback", "astonished", "wide-eyed", "in disbelief"]
};

// Colors and numbers for random generation
const colors = ['Red', 'Blue', 'Green', 'Purple', 'Yellow', 'Orange', 'Pink', 'Black', 'White', 'Gold', 'Silver', 'Turquoise', 'Violet', 'Brown', 'Magenta'];
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

// Phrases for names beginning with specific letters
const letterPhrases = [
    "bring good news",
    "are good for trading",
    "will bring fun to games",
    "will guide the way",
    "bring unexpected surprises",
    "are likely to help you today",
    "will share helpful advice",
    "will bring joy to your day"
];

// Random advice array
const advice = [
    "Consider taking a break to recharge your energy.",
    "Embrace the day and stay positive!",
    "Remember, it's okay to ask for help if you need it.",
    "Take a moment to reflect on what you want today.",
    "Keep your head up and stay determined!",
    "Don't hesitate to step outside for some fresh air.",
    "Listen to your favorite music to lift your spirits.",
    "Trust your instincts, they will guide you through today.",
    "A small act of kindness could brighten someone’s day.",
    "Take some time today to reflect on your goals.",
    "Stay open to new opportunities, they may come unexpectedly.",
    "Today is a great day to focus on self-care.",
    "You might find comfort in familiar routines today.",
    "A change in scenery might help clear your thoughts.",
    "Laughter will be your best medicine today.",
    "Reconnect with an old friend; it might bring unexpected joy.",
    "Take things one step at a time, and don't rush.",
    "Today is a great day to start a new hobby or interest.",
    "Your energy is contagious, so spread positivity!",
    "Pay attention to the little details, they might hold the key.",
    "Let go of any unnecessary stress today.",
    "Don’t forget to celebrate your small victories.",
    "A problem you’ve been facing might have a simple solution.",
    "It’s okay to take a break; rest will help you recharge.",
    "Let your creativity shine today!",
    "A walk outdoors might bring fresh perspectives.",
    "Stay flexible; sometimes, plans change for the better.",
    "Take a deep breath and focus on what truly matters.",
    "Find time to enjoy the small pleasures in life today.",
    "Stay organized today—it’ll make everything easier.",
    "Be patient; sometimes things fall into place at their own pace.",
    "Share a smile with someone; it could brighten their day.",
    "Treat yourself to something special today—you deserve it!",
    "Reach out to someone you haven’t spoken to in a while.",
    "Step away from distractions and focus on what’s important.",
    "Try something new today, even if it feels out of your comfort zone.",
    "Focus on solutions, not problems, for a positive outcome.",
    "Today might be the perfect day to clear your mind with a good book.",
    "Take things slow and enjoy the process of what you’re working on.",
    "Stay mindful of your surroundings; they might inspire new ideas.",
    "Don’t be afraid to speak your mind and share your thoughts.",
    "You’re stronger than you realize; face today with confidence.",
    "Plan ahead, but don’t stress about what you can’t control.",
    "Sometimes letting go brings the greatest peace.",
    "Be kind to yourself today—self-compassion is powerful.",
    "Make time for something that brings you joy today.",
    "Believe in yourself and others will too.",
    "Appreciate the beauty in everyday moments.",
    "Today is a great day to reflect on your achievements.",
    "A balanced mind will bring you success today.",
    "Push through any challenges with a positive attitude.",
    "Enjoy the journey, not just the destination."
];

// Message structures for horoscope variation
const messageStructures = [
    `[color] is a powerful force for you today. Keep it close as it brings clarity and focus.`,
    `The number [number] will play a significant role today. Pay attention!`,
    `You might be feeling a bit [expression] today. Great things lie ahead!`,
    `Feeling [expression] today? Let [color] help center you.`,
    `Today, Habbos whose names begin with the letter [alphabet] [letterPhrase].`,
    `If you're feeling [expression], wear something [color] to lift your spirits.`,
    `Keep an eye out for the number [number]; it holds the key to success.`,
    `Habbos whose names begin with the letter [alphabet] [letterPhrase]. Pay attention to them today!`,
    `The number [number] is on your side. Good things are coming.`,
    `Feeling a bit [expression]? Today, [color] will bring you peace and the number [number] will bring luck.`
];

// Hand items array and corresponding texts
const handItems = [
    { crr: 0, text: '' }, // No item, no text
    { crr: 1, text: 'Enjoy a refreshing drink today. You\'re safe.' }, // Soda
    { crr: 2, text: 'You\'ve drawn a carrot. Lucky this isn\'t a game of fridge. You would be out!' }, // Carrot
    { crr: 3, text: 'You\'ve drawn an ice-cream. P2K?' }, // Ice-Cream
    { crr: 6, text: 'You\'ve drawn a coffee. Make sure to get your energy fix today!' } // Coffee
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

        // Randomly select color, number, alphabet, and letter phrase
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];
        const randomLetter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")[Math.floor(Math.random() * 26)];
        const randomLetterPhrase = letterPhrases[Math.floor(Math.random() * letterPhrases.length)];

        // Randomly select advice
        const randomAdvice = advice[Math.floor(Math.random() * advice.length)];

        // Select a random message structure and replace placeholders
        let randomMessage = messageStructures[Math.floor(Math.random() * messageStructures.length)];
        randomMessage = randomMessage.replace('[expression]', randomExpressionPhrase)
                                     .replace('[color]', randomColor)
                                     .replace('[number]', randomNumber)
                                     .replace('[alphabet]', randomLetter)
                                     .replace('[letterPhrase]', randomLetterPhrase);
        
        // Append random advice to the message
        let finalMessage = `${randomMessage} ${randomAdvice}`;

        // Randomly select a hand item and append its text to the horoscope
        const randomHandItem = handItems[Math.floor(Math.random() * handItems.length)];
        if (randomHandItem.text) {
            finalMessage += ` ${randomHandItem.text}`; // Append the text if available
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
