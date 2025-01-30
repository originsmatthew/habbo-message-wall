// Enhanced Habboscope Generator
class HabboscopeGenerator {
    constructor() {
        // Original loading phrases
        this.loadingPhrases = [
            "... getting your habboscope ...",
            "... aligning with the stars ...",
            "... consulting the universe ...",
            "... reading the signs ...",
            "... unlocking your future ...",
            "... consulting the enigmas ...",
            "... detecting energy ...",
            "... channeling cosmic forces ...",
            "... connecting to the habboverse ..."
        ];

        // Original expressions
        this.expressions = {
            sad: ["sad", "under the weather", "deflated", "uninspired", "sad"],
            spk: ["chatty", "like you're an open book", "you're full of words", "you're eager to talk", "you're ready to share", "expressive"],
            eyb: ["sleepy", "tired", "drained", "exhausted", "in need of rest", "a little foggy-headed"],
            agr: ["angry", "annoyed", "frustrated", "on edge", "irritable", "fuming"],
            srp: ["shocked", "surprised", "taken aback", "astonished", "wide-eyed", "in disbelief"]
        };

        // Original arrays
        this.colors = ['Red', 'Blue', 'Green', 'Purple', 'Yellow', 'Orange', 'Pink', 'Black', 'White', 'Gold', 'Silver', 'Turquoise', 'Violet', 'Brown', 'Magenta'];
        this.numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        this.letterPhrases = [
            "bring good news",
            "are good for trading",
            "will bring fun to games",
            "will guide the way",
            "bring unexpected surprises",
            "are likely to help you today",
            "will share helpful advice",
            "will bring joy to your day"
        ];

        // Original hand items
        this.handItems = [
            { crr: 0, text: '' },
            { crr: 1, text: 'Enjoy a refreshing drink today. You\'re safe.' },
            { crr: 2, text: 'You\'ve drawn a carrot. Lucky this isn\'t a game of fridge. You would be out!' },
            { crr: 3, text: 'You\'ve drawn an ice-cream. P2K?' },
            { crr: 6, text: 'You\'ve drawn a coffee. Make sure to get your energy fix today!' }
        ];

        // Enhanced color meanings
        this.colorMeanings = {
            Red: ["passion", "energy", "courage"],
            Blue: ["peace", "wisdom", "trust"],
            Green: ["growth", "harmony", "success"],
            Purple: ["mystery", "creativity", "luxury"],
            Yellow: ["happiness", "optimism", "clarity"],
            Orange: ["enthusiasm", "adventure", "confidence"],
            Pink: ["love", "compassion", "nurturing"],
            Gold: ["prosperity", "abundance", "wisdom"],
            Silver: ["intuition", "reflection", "mystery"]
        };

        this.init();
    }

    init() {
        const horoscopeButton = document.getElementById('getHoroscope');
        if (horoscopeButton) {
            horoscopeButton.addEventListener('click', () => this.generateHoroscope());
        }

        this.setTimeBasedClass();
    }

    setTimeBasedClass() {
        const hour = new Date().getHours();
        const body = document.body;
        
        if (hour >= 22 || hour < 6) {
            body.className = 'time-night';
        } else if (hour >= 6 && hour < 12) {
            body.className = 'time-morning';
        } else if (hour >= 12 && hour < 18) {
            body.className = 'time-afternoon';
        } else {
            body.className = 'time-evening';
        }
    }

    generateHoroscope() {
        const habboName = document.getElementById('habboName').value;
        const horoscopeSign = document.getElementById('horoscopeSign').value;

        if (!habboName) {
            alert("Please enter your Habbo name!");
            return;
        }

        this.showLoading();

        setTimeout(() => {
            this.generateAndDisplayHoroscope(habboName, horoscopeSign);
        }, 2000);
    }

    showLoading() {
        const loadingMessage = document.getElementById('loadingMessage');
        const resultContent = document.getElementById('resultContent');
        const starSign = document.getElementById('starSign');
        const avatar = document.getElementById('avatar');
        const horoscopeText = document.getElementById('horoscopeText');

        if (loadingMessage) {
            loadingMessage.innerText = this.loadingPhrases[Math.floor(Math.random() * this.loadingPhrases.length)];
            loadingMessage.style.display = "block";
        }

        if (starSign) starSign.style.display = "none";
        if (avatar) avatar.innerHTML = '';
        if (horoscopeText) horoscopeText.innerText = '';
    }

    generateAndDisplayHoroscope(habboName, horoscopeSign) {
        const randomExpressionKey = Object.keys(this.expressions)[Math.floor(Math.random() * Object.keys(this.expressions).length)];
        const randomExpressionPhrase = this.expressions[randomExpressionKey][Math.floor(Math.random() * this.expressions[randomExpressionKey].length)];
        const randomColor = this.colors[Math.floor(Math.random() * this.colors.length)];
        const randomNumber = this.numbers[Math.floor(Math.random() * this.numbers.length)];
        const randomLetter = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random() * 26)];
        const randomLetterPhrase = this.letterPhrases[Math.floor(Math.random() * this.letterPhrases.length)];
        const randomHandItem = this.handItems[Math.floor(Math.random() * this.handItems.length)];

        let horoscopeMessage = this.constructHoroscopeMessage(
            randomExpressionPhrase,
            randomColor,
            randomNumber,
            randomLetter,
            randomLetterPhrase,
            randomHandItem
        );

        horoscopeMessage += ' ' + this.getTimeBasedModifier();

        this.updateUI(habboName, horoscopeSign, horoscopeMessage, randomExpressionKey, randomHandItem.crr);
    }

    constructHoroscopeMessage(expression, color, number, letter, letterPhrase, handItem) {
        const colorMeaning = this.colorMeanings[color] ? 
            this.colorMeanings[color][Math.floor(Math.random() * this.colorMeanings[color].length)] : 
            '';

        const messages = [
            `${color} brings ${colorMeaning} to your day. You're feeling ${expression}.`,
            `The number ${number} will guide you today. Those whose names begin with ${letter} ${letterPhrase}.`,
            `You're feeling ${expression}. Let the energy of ${color} guide you.`,
            `The stars align with the number ${number} today. You might be feeling ${expression}.`
        ];

        let message = messages[Math.floor(Math.random() * messages.length)];
        
        if (handItem.text) {
            message += ' ' + handItem.text;
        }

        return message;
    }

    getTimeBasedModifier() {
        const hour = new Date().getHours();
        
        if (hour >= 22 || hour < 6) {
            return "The night stars amplify your energy...";
        } else if (hour >= 6 && hour < 12) {
            return "The morning sun brings fresh opportunities...";
        } else if (hour >= 12 && hour < 18) {
            return "The afternoon rays strengthen your resolve...";
        } else {
            return "The evening stars guide your path...";
        }
    }

    updateUI(habboName, horoscopeSign, horoscopeMessage, expressionKey, handItemCrr) {
        const avatar = document.getElementById('avatar');
        if (avatar) {
            avatar.innerHTML = `<img src="https://habboden.com/habbo-imaging/${habboName}?size=b&action=std&direction=2&head_direction=2&gesture=${expressionKey}&crr=${handItemCrr}" alt="${habboName}" class="interactive-element" />`;
        }

        const starSign = document.getElementById('starSign');
        if (starSign) {
            starSign.src = `horoscopeimages/${horoscopeSign}.png`;
            starSign.style.display = "block";
            starSign.className = "interactive-element";
        }

        const horoscopeText = document.getElementById('horoscopeText');
        if (horoscopeText) {
            horoscopeText.innerText = horoscopeMessage;
        }

        const loadingMessage = document.getElementById('loadingMessage');
        const resultContent = document.getElementById('resultContent');
        
        if (loadingMessage) loadingMessage.style.display = "none";
        if (resultContent) resultContent.style.display = "flex";
    }
}

// Initialize the generator when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.habboscope = new HabboscopeGenerator();
});
