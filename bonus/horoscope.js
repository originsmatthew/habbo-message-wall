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

        // Enhanced messages
        this.horoscopeMessages = {
            general: [
                "The {color} energy of the hotel flows through you today, bringing {meaning}.",
                "Room {number} holds special significance today - maybe it's time for a visit!",
                "A Habbo whose name starts with {letter} will bring unexpected friendships.",
                "The cosmic pixels align to make this a {expression} kind of day.",
                "Your furniture arrangement skills peak when the moon is in {color}.",
                "Trading will be especially lucky in room {number} today!",
                "The wired gods smile upon your creativity today.",
                "A rare furni might cross your path in an unexpected trade.",
                "Your pixel art skills are enhanced by the {color} moon today.",
                "A game of falling furni could lead to new friendships!"
            ],
            
            activities: [
                "Perfect day for hosting a {color}-themed party!",
                "Your maze-building skills are at their peak in room {number}.",
                "Time to redecorate - {color} items will bring good fortune.",
                "Your trading luck peaks during the {timeOfDay}.",
                "A game of freeze or musical chairs could lead to amazing rewards!",
                "Your pixel art will inspire others today.",
                "Consider starting a new hotel event - success is in the stars!",
                "Your building creativity is enhanced by the {color} energy.",
                "A perfect day for rare hunting in the marketplace!",
                "Your room stacking abilities are cosmically enhanced!"
            ],

            social: [
                "A group of {number} new friends awaits in an unexpected game.",
                "Someone whose name begins with {letter} will offer an exciting trade.",
                "Your chat powers are enhanced by the {color} cosmic energy.",
                "A friend you haven't seen in ages might return to the hotel today.",
                "Your help will be especially valuable in someone's game room.",
                "An old trading partner might return with an interesting offer.",
                "Your kindness in the hotel will be rewarded threefold.",
                "A new collaboration could start in room {number}.",
                "Your event hosting skills are particularly strong today.",
                "A surprise message could lead to a great friendship!"
            ],

            advice: [
                "Try wearing {color} today - it enhances your trading luck!",
                "Room {number} might hold a special surprise for you.",
                "Keep an eye out for someone whose name starts with {letter}.",
                "Your creative energy peaks during the {timeOfDay}.",
                "Trust your instincts in trades today - they're cosmically enhanced!",
                "A change in your room layout could bring fresh energy.",
                "Share your pixel art skills - someone needs your inspiration!",
                "Your gaming luck is strongest in {color} rooms today.",
                "An old furni might be worth more than you think today.",
                "Consider hosting a {color}-themed competition!"
            ]
        };

        this.init();
    }

init() {
        const horoscopeButton = document.getElementById('getHoroscope');
        const compatibilityButton = document.getElementById('checkCompatibility');
        const getCompatibilityButton = document.getElementById('getCompatibility');
        
        if (horoscopeButton) {
            horoscopeButton.addEventListener('click', () => this.generateHoroscope());
        }
        
        if (compatibilityButton) {
            compatibilityButton.addEventListener('click', () => this.toggleCompatibilityMode());
        }

        if (getCompatibilityButton) {
            getCompatibilityButton.addEventListener('click', () => {
                const habbo1 = document.getElementById('habboName').value;
                const habbo2 = document.getElementById('habboName2').value;
                
                if (!habbo1 || !habbo2) {
                    alert("Please enter both Habbo names!");
                    return;
                }
                
                this.generateCompatibility(habbo1, habbo2);
            });
        }

        this.setTimeBasedClass();
    }

    toggleCompatibilityMode() {
        const normalInputs = document.getElementById('habboName');
        const horoscopeSign = document.getElementById('horoscopeSign');
        const compatibilityInputs = document.getElementById('compatibilityInputs');
        const checkButton = document.getElementById('checkCompatibility');
        const getHoroscopeButton = document.getElementById('getHoroscope');
        
        if (compatibilityInputs.style.display === 'none') {
            // Show compatibility mode
            normalInputs.style.display = 'none';
            horoscopeSign.style.display = 'none';
            getHoroscopeButton.style.display = 'none';
            compatibilityInputs.style.display = 'block';
            checkButton.textContent = 'Back to Habboscope';
        } else {
            // Return to normal mode
            normalInputs.style.display = 'inline-block';
            horoscopeSign.style.display = 'inline-block';
            getHoroscopeButton.style.display = 'inline-block';
            compatibilityInputs.style.display = 'none';
            checkButton.textContent = 'Check Compatibility';
        }
    }

    generateCompatibility(habbo1, habbo2) {
        this.showLoading();

        const compatibilityLevels = [
            { level: 'Legendary', messages: [
                `${habbo1} and ${habbo2} - your friendship could light up the entire hotel!`,
                `${habbo1} and ${habbo2} - together you could host the most amazing events!`,
                `${habbo1} and ${habbo2} - the stars predict an iconic Habbo duo in the making!`
            ]},
            { level: 'Amazing', messages: [
                `${habbo1} and ${habbo2} - your combined room building skills are off the charts!`,
                `${habbo1} and ${habbo2} - trading together will bring great fortune to you both!`,
                `${habbo1} and ${habbo2} - you'll make an unstoppable team in games!`
            ]},
            { level: 'Great', messages: [
                `${habbo1} and ${habbo2} - you'll have lots of fun exploring the hotel together!`,
                `${habbo1} and ${habbo2} - your friendship has great potential for adventures!`,
                `${habbo1} and ${habbo2} - together you could create some amazing pixel art!`
            ]},
            { level: 'Good', messages: [
                `${habbo1} and ${habbo2} - you'll enjoy playing games and trading together!`,
                `${habbo1} and ${habbo2} - your different styles complement each other well!`,
                `${habbo1} and ${habbo2} - many fun moments await in your friendship!`
            ]}
        ];

        const randomLevel = compatibilityLevels[Math.floor(Math.random() * compatibilityLevels.length)];
        const randomMessage = randomLevel.messages[Math.floor(Math.random() * randomLevel.messages.length)];

        setTimeout(() => {
            const avatar1Html = `<img src="https://habboden.com/habbo-imaging/${habbo1}?size=b&action=std&direction=2&head_direction=2&gesture=sml" alt="${habbo1}" class="interactive-element" />`;
            const avatar2Html = `<img src="https://habboden.com/habbo-imaging/${habbo2}?size=b&action=std&direction=2&head_direction=2&gesture=sml" alt="${habbo2}" class="interactive-element" />`;
            
            document.getElementById('avatar').innerHTML = avatar1Html;
            document.getElementById('starSign').innerHTML = avatar2Html;
            document.getElementById('starSign').style.display = 'block';
            document.getElementById('horoscopeText').innerText = randomMessage;
            document.getElementById('loadingMessage').style.display = 'none';
            document.getElementById('resultContent').style.display = 'flex';
            document.getElementById('shareToX').style.display = 'flex';
        }, 2000);
    }

    generateHoroscope() {
        const habboName = document.getElementById('habboName').value;
        const horoscopeSign = document.getElementById('horoscopeSign').value;

        if (!habboName) {
            alert("Please enter your Habbo name!");
            return;
        }

        if (!horoscopeSign) {
            alert("Please select your star sign!");
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
        const shareToX = document.getElementById('shareToX');

        if (loadingMessage) {
            loadingMessage.innerText = this.loadingPhrases[Math.floor(Math.random() * this.loadingPhrases.length)];
            loadingMessage.style.display = "block";
        }

        if (starSign) starSign.style.display = "none";
        if (avatar) avatar.innerHTML = '';
        if (horoscopeText) horoscopeText.innerText = '';
        if (shareToX) shareToX.style.display = 'none';
        if (resultContent) resultContent.style.display = 'none';
    }

    generateAndDisplayHoroscope(habboName, horoscopeSign) {
        const randomExpressionKey = Object.keys(this.expressions)[Math.floor(Math.random() * Object.keys(this.expressions).length)];
        const randomHandItem = this.handItems[Math.floor(Math.random() * this.handItems.length)];

        // Generate horoscope message using new enhanced system
        let horoscopeMessage = this.constructEnhancedMessage();

        // Add hand item text if available
        if (randomHandItem.text) {
            horoscopeMessage += ' ' + randomHandItem.text;
        }

        // Add time-based modifier
        horoscopeMessage += ' ' + this.getTimeBasedModifier();

        // Update UI
        this.updateUI(habboName, horoscopeSign, horoscopeMessage, randomExpressionKey, randomHandItem.crr);
    }

    constructEnhancedMessage() {
        const messageTypes = ['general', 'activities', 'social', 'advice'];
        const selectedType = messageTypes[Math.floor(Math.random() * messageTypes.length)];
        const messages = this.horoscopeMessages[selectedType];
        let message = messages[Math.floor(Math.random() * messages.length)];

        // Replace all placeholders
        message = message
            .replace(/{color}/g, this.colors[Math.floor(Math.random() * this.colors.length)])
            .replace(/{number}/g, this.numbers[Math.floor(Math.random() * this.numbers.length)])
            .replace(/{letter}/g, "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random() * 26)])
            .replace(/{expression}/g, Object.values(this.expressions).flat()[Math.floor(Math.random() * Object.values(this.expressions).flat().length)])
            .replace(/{timeOfDay}/g, this.getTimeOfDay())
            .replace(/{meaning}/g, "mystical energy");

        return message;
    }

    getTimeOfDay() {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) return "morning";
        if (hour >= 12 && hour < 17) return "afternoon";
        if (hour >= 17 && hour < 21) return "evening";
        return "night";
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

    updateUI(habboName, horoscopeSign, horoscopeMessage, expressionKey, handItemCrr) {
        const avatar = document.getElementById('avatar');
        if (avatar) {
            avatar.innerHTML = `<img src="https://habboden.com/habbo-imaging/${habboName}?size=b&action=std&direction=2&head_direction=2&gesture=${expressionKey}&crr=${handItemCrr}" alt="${habboName}" class="interactive-element" />`;
        }

        const starSign = document.getElementById('starSign');
        if (starSign) {
            starSign.innerHTML = `<img src="horoscopeimages/${horoscopeSign}.png" alt="${horoscopeSign}" class="interactive-element" />`;
            starSign.style.display = "block";
        }

        const horoscopeText = document.getElementById('horoscopeText');
        if (horoscopeText) {
            horoscopeText.innerText = horoscopeMessage;
        }

        const loadingMessage = document.getElementById('loadingMessage');
        const resultContent = document.getElementById('resultContent');
        const shareToX = document.getElementById('shareToX');
        
        if (loadingMessage) loadingMessage.style.display = "none";
        if (resultContent) resultContent.style.display = "flex";
        if (shareToX) {
            shareToX.style.display = "flex";
            shareToX.onclick = () => this.shareToX();
        }
    }

    shareToX() {
        const resultDiv = document.getElementById('result');
        
        // Hide share button temporarily for the screenshot
        const shareButton = document.getElementById('shareToX');
        shareButton.style.display = 'none';
        
        html2canvas(resultDiv).then(canvas => {
            // Show share button again
            shareButton.style.display = 'flex';
            
            // Save the canvas as an image file
            canvas.toBlob(blob => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'habboscope.png';
                a.click();
                URL.revokeObjectURL(url);
                
                // Get the horoscope text
                const horoscopeText = document.getElementById('horoscopeText').innerText;
                const tweetText = `My Habboscope: ${horoscopeText.substring(0, 180)}${horoscopeText.length > 180 ? '...' : ''} via @OriginsMatthew #Habbo`;

                // Open X's composer in a new window
                window.open(
                    `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`,
                    '_blank',
                    'width=600,height=400,location=yes,left=200,top=200'
                );
            });
        });
    }
}

// Initialize the generator when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.habboscope = new HabboscopeGenerator();
});
