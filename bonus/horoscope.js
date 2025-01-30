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

        // Zodiac compatibility data
        this.zodiacCompatibility = {
            Aries: {
                great: ["Leo", "Sagittarius", "Gemini"],
                good: ["Libra", "Aquarius"],
                challenging: ["Cancer", "Capricorn"]
            },
            Taurus: {
                great: ["Virgo", "Capricorn", "Cancer"],
                good: ["Scorpio", "Pisces"],
                challenging: ["Leo", "Aquarius"]
            },
            Gemini: {
                great: ["Libra", "Aquarius", "Aries"],
                good: ["Leo", "Sagittarius"],
                challenging: ["Virgo", "Pisces"]
            },
            Cancer: {
                great: ["Scorpio", "Pisces", "Taurus"],
                good: ["Virgo", "Capricorn"],
                challenging: ["Aries", "Libra"]
            },
            Leo: {
                great: ["Aries", "Sagittarius", "Gemini"],
                good: ["Libra", "Aquarius"],
                challenging: ["Taurus", "Scorpio"]
            },
            Virgo: {
                great: ["Taurus", "Capricorn", "Cancer"],
                good: ["Scorpio", "Pisces"],
                challenging: ["Gemini", "Sagittarius"]
            },
            Libra: {
                great: ["Gemini", "Aquarius", "Leo"],
                good: ["Aries", "Sagittarius"],
                challenging: ["Cancer", "Capricorn"]
            },
            Scorpio: {
                great: ["Cancer", "Pisces", "Taurus"],
                good: ["Virgo", "Capricorn"],
                challenging: ["Leo", "Aquarius"]
            },
            Sagittarius: {
                great: ["Aries", "Leo", "Gemini"],
                good: ["Libra", "Aquarius"],
                challenging: ["Virgo", "Pisces"]
            },
            Capricorn: {
                great: ["Taurus", "Virgo", "Cancer"],
                good: ["Scorpio", "Pisces"],
                challenging: ["Aries", "Libra"]
            },
            Aquarius: {
                great: ["Gemini", "Libra", "Aries"],
                good: ["Leo", "Sagittarius"],
                challenging: ["Taurus", "Scorpio"]
            },
            Pisces: {
                great: ["Cancer", "Scorpio", "Taurus"],
                good: ["Virgo", "Capricorn"],
                challenging: ["Gemini", "Sagittarius"]
            }
        };

        this.init();
    }

    init() {
        // Set up event listeners
        const horoscopeButton = document.getElementById('getHoroscope');
        const compatibilityButton = document.getElementById('checkCompatibility');
        
        if (horoscopeButton) {
            horoscopeButton.addEventListener('click', () => this.generateHoroscope());
        }
        
        if (compatibilityButton) {
            compatibilityButton.addEventListener('click', () => this.toggleCompatibilityMode());
        }

        this.setTimeBasedClass();
    }

    toggleCompatibilityMode() {
        const compareSign = document.getElementById('compareSign');
        const horoscopeSign = document.getElementById('horoscopeSign');
        
        if (compareSign.style.display === 'none') {
            compareSign.style.display = 'inline-block';
            document.getElementById('checkCompatibility').textContent = 'Get Compatibility';
        } else {
            this.checkCompatibility(horoscopeSign.value, compareSign.value);
        }
    }

    checkCompatibility(sign1, sign2) {
        const compatibility = this.getCompatibilityMessage(sign1, sign2);
        
        // Generate and display compatibility message
        const message = `${sign1} and ${sign2}: ${compatibility.message}`;
        
        // Update UI with compatibility result
        this.updateUIWithCompatibility(message, compatibility.level);
    }

    getCompatibilityMessage(sign1, sign2) {
        const compatibility = this.zodiacCompatibility[sign1];
        let compatibilityLevel = '';
        let messages = [];

        if (compatibility.great.includes(sign2)) {
            compatibilityLevel = 'great';
            messages = [
                "You two could become inseparable friends!",
                "The stars align perfectly for this friendship!",
                "A legendary Habbo friendship in the making!",
                "Together you could host amazing events!",
                "Your combined energy could light up the whole hotel!"
            ];
        } else if (compatibility.good.includes(sign2)) {
            compatibilityLevel = 'good';
            messages = [
                "A solid friendship with lots of potential!",
                "You'll enjoy trading and gaming together!",
                "Good vibes between your signs!",
                "You'll make a great team in games!",
                "Your different strengths complement each other well!"
            ];
        } else if (compatibility.challenging.includes(sign2)) {
            compatibilityLevel = 'challenging';
            messages = [
                "You might need to work a bit harder to understand each other!",
                "Different styles but that can make things interesting!",
                "Focus on what you have in common!",
                "Keep an open mind - opposites can attract!",
                "You could learn a lot from each other!"
            ];
        } else {
            compatibilityLevel = 'neutral';
            messages = [
                "You'll get along just fine!",
                "A balanced friendship awaits!",
                "Your differences make things interesting!",
                "You'll enjoy exploring the hotel together!",
                "A fresh perspective for both of you!"
            ];
        }

        return {
            level: compatibilityLevel,
            message: messages[Math.floor(Math.random() * messages.length)]
        };
    }

    updateUIWithCompatibility(message, level) {
        const horoscopeText = document.getElementById('horoscopeText');
        if (horoscopeText) {
            horoscopeText.innerText = message;
        }

        // Reset the compatibility mode
        document.getElementById('compareSign').style.display = 'none';
        document.getElementById('checkCompatibility').textContent = 'Check Compatibility';
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
        const shareToX = document.getElementById('shareToX');

        if (loadingMessage) {
            loadingMessage.innerText = this.loadingPhrases[Math.floor(Math.random() * this.loadingPhrases.length)];
            loadingMessage.style.display = "block";
        }

        if (starSign) starSign.style.display = "none";
        if (avatar) avatar.innerHTML = '';
        if (horoscopeText) horoscopeText.innerText = '';
        if (shareToX) shareToX.style.display = 'none';
    }

    generateAndDisplayHoroscope(habboName, horoscopeSign) {
        const randomExpressionKey = Object.keys(this.expressions)[Math.floor(Math.random() * Object.keys(this.expressions).length)];
        const randomExpressionPhrase = this.expressions[randomExpressionKey][Math.floor(Math.random() * this.expressions[randomExpressionKey].length)];
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
        const shareToX = document.getElementById('shareToX');
        
        if (loadingMessage) loadingMessage.style.display = "none";
        if (resultContent) resultContent.style.display = "flex";
        if (shareToX) {
            shareToX.style.display = "flex";
            shareToX.onclick = () => this.shareToX(habboName, horoscopeSign, horoscopeMessage);
        }
    }

    shareToX() {
        const horoscopeText = document.getElementById('horoscopeText').innerText;
        const habboName = document.getElementById('habboName').value;
        const horoscopeSign = document.getElementById('horoscopeSign').value;
        
        // Create the tweet text
        const tweetText = `My Habboscope for today: "${horoscopeText}" 
        
Check yours at: https://habbokindness.com/habboscope 
#Habbo #Habboscope #${horoscopeSign}`;

        // Encode the tweet text
        const encodedTweet = encodeURIComponent(tweetText);
        
        // Open X's share window
        window.open(`https://twitter.com/intent/tweet?text=${encodedTweet}`, 
                    'Share to X', 
                    'width=600,height=400');
    }
}

// Initialize the generator when the page loads
document.addEventListener('DOMContentLoaded', () => {
    window.habboscope = new HabboscopeGenerator();
});
