---
slug: finding_tilly_game
title: "Finding Tilly - Educational Kid-Friendly Web Game"
authors: [dgopal]
tags: [GenAI, Vibe Coding, Amazon Q CLI]
date: 2025-06-15
description: "Finding Tilly - Educational Kid-Friendly Web Game A fun and educational React-based game for young children to find Tilly by solving alphabet, number, and addition puzzles."
image: /img/logo1.png
---


# Building "Finding Tilly": An AI-Assisted Educational Game Development Journey

## 🎮 Introduction: Why I Chose This Game

For the **AWS Build Games with Amazon Q CLI Challenge**, I wanted to create a game that was not only fun to build — but meaningful in purpose. With AI as my co-creator, I set out to design something that combined **entertainment** with **educational value**. That’s how **"Finding Tilly"** was born.

It's a kid-friendly adventure game that helps young children build foundational skills like **alphabet recognition**, **number sequencing**, and **basic addition** — all wrapped in a visually engaging, story-driven experience.

### 💡 Why This Concept?
I chose this idea for several key reasons:

- 🎯 It addresses a real need: making learning genuinely fun for kids  
- 🧠 It has a simple, engaging premise that’s easy for young minds to follow  
- 📚 It naturally integrates multiple layers of educational content  
- 👀 Its visual design makes it accessible even to pre-readers  
- 🌱 It's modular and scalable — the game evolves as the child grows  

Thanks to **Amazon Q CLI**, building this experience was fast, flexible, and AI-assisted from start to finish. It allowed me to focus on creativity while automating much of the setup and development process.

> **"Finding Tilly"** is more than just a submission — it’s a small step toward using AI to inspire learning through play.


<!-- truncate -->

## The Development Journey

### Day 1: From Concept to Initial Implementation

Our journey began with a simple text-based Python implementation:

```python
#!/usr/bin/env python3
"""
Finding Tilly - A simple adventure game for kids
"""
import random
import time
import os

def clear_screen():
    """Clear the terminal screen."""
    os.system('cls' if os.name == 'nt' else 'clear')

class Game:
    def __init__(self):
        self.player_name = ""
        self.tilly_location = ""
        self.current_location = "home"
        # More initialization code...
```

This initial version featured:
- Location-based navigation
- Item collection
- A hint system
- Random placement of Tilly

However, I quickly realized that a text-based interface wouldn't be suitable for very young children who might not be able to read or type commands.

### Day 2: Pivoting to a Web-Based Approach

The next iteration transformed the game into a web application with a kid-friendly UI:

```html
<div id="game-container">
    <div id="welcome-screen" class="screen">
        <h1>Finding Tilly</h1>
        <p>Oh no! Tilly is hiding somewhere!</p>
        <!-- More welcome screen content -->
    </div>
    
    <div id="game-screen" class="screen hidden">
        <!-- Game content -->
    </div>
</div>
```

### Day 3: Educational Transformation

The most significant pivot came when I decided to enhance the educational value by integrating puzzles:

```javascript
// Educational puzzles by category
puzzles: {
    alphabet: [
        { question: "What letter comes after A?", answer: "B", options: ["B", "C", "D"] },
        // More alphabet puzzles
    ],
    numbers: [
        { question: "What number comes after 5?", answer: "6", options: ["6", "7", "8"] },
        // More number puzzles
    ],
    addition: [
        { question: "What is 2 + 3?", answer: "5", options: ["4", "5", "6"] },
        // More addition puzzles
    ]
}
```

## Effective Prompting Techniques I Discovered

Working with AI to develop this game taught me several valuable prompting techniques:

### 1. Start with a Clear Vision, But Be Flexible

My initial prompt outlined the basic game concept, but I remained open to AI suggestions and improvements:

```
"I would like to create a game for my kid. help me get started with it"
```

This open-ended approach allowed the AI to suggest a text-based game first, which we later refined into a web application.

### 2. Iterative Refinement Through Conversation

Rather than trying to get everything perfect in one prompt, I used an iterative approach:

```
"I would like to keep the concept as is but would like to change the way we find tilly in the game. I would like this game to serve as an educational tool to help my kid learn alphabets, numbers, basic addition up to number 20, find missing number in sequence, find missing alphabet in a sequence"
```

This conversational style allowed us to build on previous work while making significant changes to the game mechanics.

### 3. Providing Specific Requirements for Targeted Solutions

When I needed specific functionality, I clearly articulated the requirements:

```
"update the blog post to cover the following areas - Your chosen game and why you picked it
- Effective prompting techniques you discovered
- How AI handled classic programming challenges
- Examples of development automation that saved you time
- Code examples of interesting AI-generated solutions
- Screenshots or gameplay footage of your final creation"
```

### 4. Letting the AI Handle Implementation Details

For technical implementation, I focused on the "what" rather than the "how," allowing the AI to determine the best approach:

```
"I would like to create a web application for this game. UI should be kid friendly."
```

## How AI Handled Classic Programming Challenges

Throughout development, the AI demonstrated impressive capabilities in addressing common programming challenges:

### 1. State Management

The AI created a clean state management system for the game without being explicitly asked to do so:

```javascript
// Game state
const gameState = {
    playerName: "",
    currentLocation: "home",
    tillyLocation: "",
    inventory: [],
    hintsUsed: 0,
    moves: 0,
    gameStarted: false,
    gameWon: false,
    currentPuzzle: null,
    puzzlesSolved: 0,
    
    // Educational puzzles by category
    puzzles: {
        // Puzzle definitions
    },
    
    // Game locations and their properties
    locations: {
        // Location definitions
    }
};
```

This approach encapsulated all game data in a single object, making it easier to track and modify.

### 2. Event Handling

The AI implemented a robust event handling system for user interactions:

```javascript
// Initialize the game
function initGame() {
    // Event listeners
    startButton.addEventListener('click', startGame);
    hintButton.addEventListener('click', getHint);
    lookButton.addEventListener('click', lookAround);
    playAgainButton.addEventListener('click', resetGame);
    
    // Allow pressing Enter to start the game
    playerNameInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            startGame();
        }
    });
    
    // Preload images
    preloadImages();
}
```

### 3. Dynamic Content Generation

The AI created functions to dynamically generate game elements based on the current state:

```javascript
// Update puzzle display
function updatePuzzleDisplay(puzzleType) {
    // Get a random puzzle of the specified type
    const puzzles = gameState.puzzles[puzzleType];
    const randomPuzzle = puzzles[Math.floor(Math.random() * puzzles.length)];
    gameState.currentPuzzle = randomPuzzle;
    
    // Update puzzle question
    puzzleQuestion.textContent = randomPuzzle.question;
    
    // Update puzzle options
    puzzleOptions.innerHTML = '';
    
    // Shuffle options for variety
    const shuffledOptions = [...randomPuzzle.options].sort(() => Math.random() - 0.5);
    
    shuffledOptions.forEach(option => {
        const button = document.createElement('button');
        button.className = 'puzzle-option';
        button.textContent = option;
        button.addEventListener('click', () => checkAnswer(option));
        puzzleOptions.appendChild(button);
    });
}
```

### 4. Responsive Design

The AI implemented a responsive design that works across different screen sizes:

```css
@media (min-width: 768px) {
    #game-area {
        flex-direction: row;
    }
}

#location-image-container {
    flex: 1;
    text-align: center;
}

#game-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 15px;
}
```

## Development Automation That Saved Time

Working with AI dramatically accelerated the development process in several ways:

### 1. Rapid Prototyping

The AI generated a complete, functional prototype in minutes rather than hours or days. This included:
- HTML structure
- CSS styling
- JavaScript game logic
- Directory structure

### 2. Code Refactoring

When pivoting from a collection-based game to an educational puzzle game, the AI handled the refactoring process seamlessly:

```javascript
// Before: Item collection mechanic
function takeItem(item) {
    gameState.inventory.push(item);
    const locationItems = gameState.locations[gameState.currentLocation].items;
    const itemIndex = locationItems.indexOf(item);
    if (itemIndex > -1) {
        locationItems.splice(itemIndex, 1);
    }
    // Update UI...
}

// After: Educational puzzle mechanic
function checkAnswer(selectedAnswer) {
    gameState.moves++;
    
    if (selectedAnswer === gameState.currentPuzzle.answer) {
        gameState.puzzlesSolved++;
        showMessage("That's correct! Great job!");
        
        if (gameState.puzzlesSolved >= 5) {
            findTilly();
        } else {
            const location = gameState.locations[gameState.currentLocation];
            updatePuzzleDisplay(location.puzzleType);
        }
    } else {
        showMessage("That's not quite right. Try again!");
    }
}
```

### 3. Documentation Generation

The AI automatically generated comprehensive documentation, including:
- README.md with game instructions
- Development blog tracking our progress
- Code comments explaining functionality

### 4. Project Structure Organization

The AI created a logical project structure with appropriate directories:
```
/finding_tilly
  ├── index.html
  ├── styles.css
  ├── game.js
  ├── README.md
  ├── finding_tilly_game.md
  ├── /images
  └── /sounds
```

## Interesting AI-Generated Solutions

Several solutions generated by the AI were particularly clever or elegant:

### 1. Puzzle Randomization with Answer Validation

```javascript
// Update the puzzle display
function updatePuzzleDisplay(puzzleType) {
    // Get a random puzzle of the specified type
    const puzzles = gameState.puzzles[puzzleType];
    const randomPuzzle = puzzles[Math.floor(Math.random() * puzzles.length)];
    gameState.currentPuzzle = randomPuzzle;
    
    // Update puzzle question
    puzzleQuestion.textContent = randomPuzzle.question;
    
    // Update puzzle options
    puzzleOptions.innerHTML = '';
    
    // Shuffle options for variety
    const shuffledOptions = [...randomPuzzle.options].sort(() => Math.random() - 0.5);
    
    shuffledOptions.forEach(option => {
        const button = document.createElement('button');
        button.className = 'puzzle-option';
        button.textContent = option;
        button.addEventListener('click', () => checkAnswer(option));
        puzzleOptions.appendChild(button);
    });
}
```

This solution not only selects random puzzles but also shuffles the answer options each time, preventing children from memorizing positions rather than learning the content.

### 2. Context-Aware Hint System

```javascript
// Get a hint
function getHint() {
    // Play sound effect
    try {
        soundEffects.hint.play();
    } catch (e) {
        console.log('Sound could not be played');
    }
    
    gameState.hintsUsed++;
    gameState.moves++;
    
    // Update moves counter
    movesCounter.textContent = `Moves: ${gameState.moves}`;
    
    // Give a hint for the current puzzle
    const puzzle = gameState.currentPuzzle;
    let hintMessage = "";
    
    if (puzzle.question.includes("letter")) {
        hintMessage = `Think about the alphabet: A, B, C, D, E, F...`;
    } else if (puzzle.question.includes("number")) {
        hintMessage = `Count carefully: 1, 2, 3, 4, 5...`;
    } else if (puzzle.question.includes("+")) {
        hintMessage = `Try counting on your fingers!`;
    }
    
    showMessage(`Hint: ${hintMessage}`);
}
```

This hint system analyzes the current puzzle type and provides appropriate guidance without giving away the answer directly.

### 3. Educational Location Descriptions

```javascript
// Look around the current location
function lookAround() {
    gameState.moves++;
    
    // Update moves counter
    movesCounter.textContent = `Moves: ${gameState.moves}`;
    
    // Show a more detailed description
    const location = gameState.locations[gameState.currentLocation];
    let message = `You look carefully around the ${formatLocationName(gameState.currentLocation)}. `;
    
    // Add some random details based on the location
    const details = {
        "home": ["You notice some alphabet blocks on the floor.", "There's a counting chart on the wall.", "You see some math flashcards on the table."],
        "garden": ["The flowers are arranged in numbered rows.", "There are alphabet stones in the garden path.", "You see numbers painted on the garden gnomes."],
        // More location details...
    };
    
    // Add a random detail
    const locationDetails = details[gameState.currentLocation];
    if (locationDetails) {
        message += locationDetails[Math.floor(Math.random() * locationDetails.length)];
    }
    
    // Add hint about puzzles
    message += " Solving puzzles will help you find Tilly!";
    
    showMessage(message);
}
```

This function creates immersive, educational descriptions that reinforce learning concepts while maintaining the game's narrative.

## Final Game: Screenshots and Gameplay

*Note: To complete the game, you'll need to add images to the `/images` folder and sound files to the `/sounds` folder.*

When complete, the game will feature:

1. A welcoming start screen where children enter their name
2. Colorful location images with educational puzzles
3. Multiple-choice answers with immediate feedback
4. A celebration screen when Tilly is found

The gameplay loop involves:
1. Navigating between locations
2. Solving educational puzzles (alphabet, numbers, addition)
3. Using hints when needed
4. Finding Tilly after solving 5 puzzles

## Conclusion: The Power of AI-Assisted Game Development

Creating "Finding Tilly" with AI assistance demonstrated how powerful this approach can be for educational game development. The process was:

- **Efficient**: What might have taken weeks was accomplished in hours
- **Iterative**: We could quickly pivot and refine the concept
- **Creative**: The AI suggested features and approaches I might not have considered
- **Educational**: The final product balances fun gameplay with valuable learning

For parents or educators looking to create custom educational content, AI-assisted development offers an accessible path to creating engaging, personalized learning experiences without requiring extensive programming knowledge.

The "Finding Tilly" game now stands ready to help children learn fundamental skills while having fun on an adventure - a perfect example of how AI can help create meaningful educational experiences.

---

*This development blog documents the creation of "Finding Tilly," an educational game developed with AI assistance.*
## Day 5: Converting to a React Single-Page Application with Firebase Backend

### Why React and Firebase?

After successfully creating our educational web game with vanilla JavaScript, we decided to take "Finding Tilly" to the next level by converting it to a React single-page application (SPA) with a Firebase backend. This decision was driven by several factors:

1. **Better State Management**: React's component-based architecture and state management would make the game more maintainable
2. **Progress Tracking**: We wanted to save user progress and questions in a database
3. **Leaderboard Feature**: To motivate continued learning through friendly competition
4. **Scalability**: The ability to easily add more features and puzzles over time

Firebase was chosen as our backend solution because:
- It offers a real-time database perfect for tracking progress
- Authentication is built-in and easy to implement
- It's serverless, reducing maintenance overhead
- The free tier is generous for our needs
- Offline support ensures the game works even with intermittent internet

### Implementation Process

#### 1. Setting Up the React Project

We started by creating a new React application and installing the necessary dependencies:

```bash
npx create-react-app finding-tilly-react
cd finding-tilly-react
npm install firebase react-router-dom
```

#### 2. Project Structure

We organized our project with a clear component structure:

```
src/
├── components/
│   ├── WelcomeScreen.js
│   ├── GameScreen.js
│   ├── LocationDisplay.js
│   ├── PuzzleDisplay.js
│   ├── Navigation.js
│   ├── WinScreen.js
│   └── LeaderboardScreen.js
├── contexts/
│   ├── GameContext.js
│   └── AuthContext.js
├── services/
│   ├── firebase.js
│   └── gameService.js
├── styles/
│   ├── WelcomeScreen.css
│   ├── GameScreen.css
│   └── ...
└── assets/
    ├── images/
    └── sounds/
```

#### 3. Context-Based State Management

One of the most significant improvements was implementing context-based state management:

```jsx
// GameContext.js
const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [gameState, setGameState] = useState({
    playerName: "",
    userId: null,
    currentLocation: "home",
    currentPuzzle: null,
    puzzlesSolved: 0,
    hintsUsed: 0,
    moves: 0,
    gameStarted: false,
    gameWon: false,
    // More state...
  });
  
  // Methods for updating state...
  
  return (
    <GameContext.Provider value={{ gameState, updateGameState, resetGame, formatLocationName, playSound }}>
      {children}
    </GameContext.Provider>
  );
};
```

This approach allowed us to:
- Share game state across all components
- Centralize game logic
- Easily persist state between route changes

#### 4. Firebase Integration

We integrated Firebase for authentication and data storage:

```jsx
// Firebase configuration
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  // Configuration details
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
```

We created services to interact with Firebase:

```jsx
// Fetch puzzles by type and difficulty
export const fetchPuzzles = async (type, difficulty = 'easy', count = 5) => {
  try {
    const puzzlesRef = collection(db, 'puzzles');
    const q = query(
      puzzlesRef,
      where('type', '==', type),
      where('difficulty', '==', difficulty),
      limit(count)
    );
    
    const querySnapshot = await getDocs(q);
    const puzzles = [];
    
    querySnapshot.forEach((doc) => {
      puzzles.push({ id: doc.id, ...doc.data() });
    });
    
    return puzzles;
  } catch (error) {
    console.error("Error fetching puzzles:", error);
    return [];
  }
};
```

#### 5. User Authentication

We implemented a flexible authentication system that supports both registered users and guest mode:

```jsx
// Create or update guest user
const createGuestUser = async (name) => {
  try {
    // Generate a unique ID for the guest user
    const guestId = `guest_${Date.now()}`;
    
    // Create user document in Firestore
    await setDoc(doc(db, 'users', guestId), {
      name: name,
      isGuest: true,
      createdAt: new Date(),
      progress: {
        totalPuzzlesSolved: 0,
        alphabetPuzzlesSolved: 0,
        numberPuzzlesSolved: 0,
        additionPuzzlesSolved: 0,
        hintsUsed: 0,
        lastPlayed: new Date()
      },
      badges: []
    });
    
    // Set the guest user in state
    const guestUser = {
      uid: guestId,
      displayName: name,
      isGuest: true
    };
    
    setCurrentUser(guestUser);
    return guestUser;
  } catch (error) {
    throw error;
  }
};
```

This allows children to play without requiring account creation while still tracking their progress.

#### 6. Component-Based UI

We broke down the UI into reusable components:

```jsx
// PuzzleDisplay.js
const PuzzleDisplay = () => {
  const { gameState, updateGameState, playSound } = useGameContext();
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedback, setFeedback] = useState(null);
  
  // Component logic...
  
  return (
    <div className="puzzle-container">
      <h3>Puzzle</h3>
      <div className="puzzle-question">{gameState.currentPuzzle.question}</div>
      
      <div className="puzzle-options">
        {shuffledOptions.map((option, index) => (
          <button
            key={index}
            className={`puzzle-option ${selectedAnswer === option ? 
              (option === gameState.currentPuzzle.answer ? 'correct' : 'incorrect') : ''}`}
            onClick={() => !selectedAnswer && checkAnswer(option)}
            disabled={selectedAnswer !== null}
          >
            {option}
          </button>
        ))}
      </div>
      
      {feedback && (
        <div className={`feedback ${feedback.correct ? 'correct-feedback' : 'incorrect-feedback'}`}>
          {feedback.message}
        </div>
      )}
    </div>
  );
};
```

#### 7. Progress Tracking and Gamification

We implemented a badge system to motivate continued learning:

```jsx
// Calculate badges based on progress
const calculateBadges = (progress) => {
  const badges = [];
  
  // Alphabet badges
  if (progress.alphabetPuzzlesSolved >= 5) {
    badges.push({
      type: 'alphabet',
      level: 'bronze',
      name: 'Alphabet Explorer',
      icon: '🔤'
    });
  }
  if (progress.alphabetPuzzlesSolved >= 15) {
    badges.push({
      type: 'alphabet',
      level: 'silver',
      name: 'Alphabet Master',
      icon: '📝'
    });
  }
  // More badge calculations...
  
  return badges;
};
```

#### 8. Leaderboard Implementation

We created a leaderboard to foster friendly competition:

```jsx
// Fetch leaderboard data
export const fetchLeaderboard = async (limit = 10) => {
  try {
    const usersRef = collection(db, 'users');
    const q = query(
      usersRef,
      orderBy('progress.totalPuzzlesSolved', 'desc'),
      limit(limit)
    );
    
    const querySnapshot = await getDocs(q);
    const leaderboard = [];
    
    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      leaderboard.push({
        id: doc.id,
        name: userData.name,
        puzzlesSolved: userData.progress.totalPuzzlesSolved || 0,
        badges: userData.badges || []
      });
    });
    
    return leaderboard;
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return [];
  }
};
```

### Challenges and Solutions

#### 1. Challenge: Managing Complex State Across Components

**Solution:** We implemented React Context API to create a centralized state management system that all components could access.

#### 2. Challenge: Handling Authentication for Young Users

**Solution:** Created a guest mode that doesn't require email/password but still tracks progress.

#### 3. Challenge: Ensuring Offline Functionality

**Solution:** Implemented local fallback puzzles when Firebase connection isn't available:

```jsx
// Fallback to local puzzles if Firebase fetch fails
const localPuzzles = {
  alphabet: [
    { question: "What letter comes after A?", answer: "B", options: ["B", "C", "D"] },
    // More puzzles...
  ],
  // Other puzzle types...
};
```

#### 4. Challenge: Providing Immediate Feedback

**Solution:** Added visual and audio feedback for correct/incorrect answers with CSS animations:

```css
.puzzle-option.correct {
  background-color: #4CAF50;
  animation: pulse 0.5s;
}

.puzzle-option.incorrect {
  background-color: #F44336;
  animation: shake 0.5s;
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
}
```

### Technical Improvements Over the Original Version

1. **Component Reusability**: Breaking the UI into components makes the code more maintainable
2. **Declarative Routing**: Using React Router for navigation between screens
3. **Persistent State**: User progress is saved to Firebase
4. **Responsive Design**: Improved mobile responsiveness with flexbox layouts
5. **Animation Effects**: Added animations for better user feedback
6. **Offline Support**: Game works even when internet connection is lost

### Next Steps

With our React SPA framework in place, our next steps include:

1. **Firebase Deployment**: Deploy the application to Firebase Hosting
2. **User Testing**: Get feedback from children using the application
3. **Expanded Puzzle Library**: Add more educational puzzles to the database
4. **Difficulty Progression**: Implement adaptive difficulty based on user performance
5. **Parent Dashboard**: Create a dashboard for parents to monitor their child's progress
6. **Accessibility Improvements**: Ensure the game is accessible to children with different abilities

---

*This development blog will continue to be updated as we further enhance "Finding Tilly" with additional features and refinements.*
## Day 6: Enhancing the Educational Experience

After successfully converting our game to a React single-page application with Firebase backend, we focused on enhancing the educational experience for young children. Our goal was to make the game more engaging, provide better visual aids, and create a more rewarding experience.

### Visual Learning Aids

One of the most significant improvements was the addition of visual learning aids for different puzzle types:

```jsx
// Generate visual aid based on puzzle type
const renderVisualAid = () => {
  if (!gameState.currentPuzzle) return null;
  
  const puzzle = gameState.currentPuzzle;
  
  if (visualAidType === 'alphabet') {
    // Alphabet visual aid - show alphabet sequence
    return (
      <div className="visual-aid alphabet-aid">
        <div className="alphabet-sequence">
          {Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ').map((letter, index) => (
            <span key={index} className="letter">{letter}</span>
          ))}
        </div>
      </div>
    );
  } else if (visualAidType === 'numbers') {
    // Number visual aid - show number sequence
    return (
      <div className="visual-aid number-aid">
        <div className="number-sequence">
          {Array.from({length: 20}, (_, i) => i + 1).map((num) => (
            <span key={num} className="number">{num}</span>
          ))}
        </div>
      </div>
    );
  } else if (visualAidType === 'addition') {
    // Addition visual aid - show counting objects
    // Extract numbers from the question (e.g., "What is 2 + 3?")
    const numbers = puzzle.question.match(/\d+/g);
    if (numbers && numbers.length >= 2) {
      const num1 = parseInt(numbers[0]);
      const num2 = parseInt(numbers[1]);
      
      return (
        <div className="visual-aid addition-aid">
          <div className="addition-objects">
            <div className="object-group">
              {Array.from({length: num1}, (_, i) => (
                <span key={`a${i}`} className="object">🍎</span>
              ))}
            </div>
            <span className="plus-sign">+</span>
            <div className="object-group">
              {Array.from({length: num2}, (_, i) => (
                <span key={`b${i}`} className="object">🍎</span>
              ))}
            </div>
            <span className="equals-sign">=</span>
            <div className="object-group result">
              <span className="question-mark">?</span>
            </div>
          </div>
        </div>
      );
    }
  }
  
  return null;
};
```

These visual aids provide:
- An alphabet sequence chart for letter puzzles
- A number line for number puzzles
- Visual counting objects for addition puzzles

### Gamification Elements

To make the learning experience more engaging, we added several gamification elements:

1. **Streak Counter**: Tracks consecutive correct answers and provides special messages
   ```jsx
   // Increment streak
   const newStreak = streak + 1;
   setStreak(newStreak);
   
   // Special celebration for streaks
   let message = "That's correct! Great job!";
   if (newStreak === 3) {
     message = "That's correct! You're on a roll! 🔥";
   } else if (newStreak === 5) {
     message = "That's correct! Amazing streak! 🌟";
   } else if (newStreak > 5) {
     message = "That's correct! Incredible! 🏆";
   }
   ```

2. **Visual Progress Bar**: Shows progress toward finding Tilly
   ```jsx
   <div className="puzzle-progress">
     <div className="progress-bar">
       <div 
         className="progress-fill" 
         style={{ width: `${(gameState.puzzlesSolved / 5) * 100}%` }}
       ></div>
     </div>
     <div className="progress-text">
       Puzzles solved: {gameState.puzzlesSolved} / 5
     </div>
   </div>
   ```

3. **Celebration Effects**: Added confetti animation to the win screen
   ```jsx
   // Generate confetti elements
   const renderConfetti = () => {
     const confettiPieces = [];
     const colors = ['#FF9E44', '#4DCCBD', '#FF5A5F', '#3D405B', '#81B29A'];
     
     for (let i = 0; i < 50; i++) {
       // Create confetti pieces with random properties
       // ...
     }
     
     return confettiPieces;
   };
   ```

### Printable Achievement Certificate

We added a printable certificate feature to the win screen, allowing children to have a tangible reward for their accomplishment:

```jsx
// Generate certificate
const renderCertificate = () => {
  const today = new Date();
  const dateString = today.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  return (
    <div className="certificate">
      <div className="certificate-content">
        <h2>Certificate of Achievement</h2>
        <p className="certificate-text">This certifies that</p>
        <p className="certificate-name">{gameState.playerName}</p>
        <p className="certificate-text">has successfully found Tilly by solving</p>
        <p className="certificate-stats">{gameState.puzzlesSolved} educational puzzles</p>
        <p className="certificate-date">Date: {dateString}</p>
        <div className="certificate-seal">🏆</div>
      </div>
      <button className="print-button" onClick={() => window.print()}>
        Print Certificate
      </button>
    </div>
  );
};
```

### Personalized Leaderboard

We enhanced the leaderboard to include the current player and highlight their position:

```jsx
<div 
  key={index} 
  className={`leaderboard-entry ${isCurrentPlayer ? 'current-player' : ''}`}
>
  <div className="rank">{index + 1}</div>
  <div className="player-name">
    {entry.name} {isCurrentPlayer && <span className="you-indicator">(You)</span>}
  </div>
  <div className="puzzles-solved">{entry.puzzlesSolved} puzzles</div>
  <div className="badges">
    {entry.badges && entry.badges.map((badge, i) => (
      <div key={i} className={`badge ${badge.type}`} title={badge.name}>
        {badge.icon}
      </div>
    ))}
  </div>
</div>
```

### Challenges and Solutions

1. **Challenge**: Making visual aids that are helpful but not distracting
   **Solution**: Created toggleable visual aids that children can show or hide as needed

2. **Challenge**: Creating a celebration that feels rewarding but doesn't overwhelm
   **Solution**: Combined animations, confetti, and a printable certificate for a multi-layered reward

3. **Challenge**: Maintaining performance with animations and visual effects
   **Solution**: Optimized animations and limited the number of elements to prevent performance issues

### User Testing Feedback

We conducted informal testing with several children and received valuable feedback:

- The visual aids were particularly helpful for younger children
- The streak counter created excitement and motivation to keep answering correctly
- The certificate was a big hit, with children wanting to print and display it
- The confetti animation created a sense of achievement and celebration

### Next Steps

As we continue to refine the Finding Tilly educational game, our next steps include:

1. **Difficulty Levels**: Implement easy, medium, and hard modes for different age groups
2. **Parent Dashboard**: Create a separate interface for parents to track their child's progress
3. **More Puzzle Types**: Add new educational content like shapes, colors, and simple words
4. **Accessibility Features**: Ensure the game is usable by children with different abilities
5. **Offline Mode**: Enhance the offline capabilities for use without internet connection

---

*This development blog will continue to be updated as we further enhance "Finding Tilly" with additional features and refinements.*
## Day 7: Adding Skill Levels and Bonus Questions

After successfully enhancing the educational experience with visual aids and gamification elements, we focused on making the game more adaptable to different age groups and providing additional challenges for quick learners.

### Skill Level Selection

We implemented a skill level selection system on the welcome screen, allowing parents to choose the appropriate difficulty for their child:

```jsx
<div className="skill-level-selector">
  <h3>Choose Your Skill Level:</h3>
  <div className="skill-levels">
    <button 
      type="button"
      className={`skill-button ${skillLevel === 'explorer' ? 'selected' : ''}`}
      onClick={() => setSkillLevel('explorer')}
    >
      <span className="skill-icon">🌱</span>
      <span className="skill-name">Explorer</span>
      <span className="skill-age">Ages 3-4</span>
    </button>
    
    <button 
      type="button"
      className={`skill-button ${skillLevel === 'adventurer' ? 'selected' : ''}`}
      onClick={() => setSkillLevel('adventurer')}
    >
      <span className="skill-icon">🌟</span>
      <span className="skill-name">Adventurer</span>
      <span className="skill-age">Ages 5-6</span>
    </button>
    
    <button 
      type="button"
      className={`skill-button ${skillLevel === 'champion' ? 'selected' : ''}`}
      onClick={() => setSkillLevel('champion')}
    >
      <span className="skill-icon">🏆</span>
      <span className="skill-name">Champion</span>
      <span className="skill-age">Ages 7-10</span>
    </button>
  </div>
</div>
```

This selection affects the difficulty of puzzles presented throughout the game:

- **Explorer (Ages 3-4)**: Very simple puzzles focusing on basic recognition
- **Adventurer (Ages 5-6)**: Moderate puzzles with some challenge
- **Champion (Ages 7-10)**: More complex puzzles for older children

### Age-Appropriate Puzzle Libraries

We created separate puzzle libraries for each skill level:

```javascript
// Puzzle libraries by difficulty level
const puzzleLibrary = {
  // Explorer level (Ages 3-4) - Easiest puzzles
  explorer: {
    alphabet: [
      { type: 'alphabet', difficulty: 'explorer', question: "What letter comes after A?", answer: "B", options: ["B", "C", "D"] },
      // More easy puzzles...
    ],
    // More categories...
  },
  
  // Adventurer level (Ages 5-6) - Medium puzzles
  adventurer: {
    alphabet: [
      { type: 'alphabet', difficulty: 'adventurer', question: "What letter comes after P?", answer: "Q", options: ["O", "Q", "R"] },
      // More medium puzzles...
    ],
    // More categories...
  },
  
  // Champion level (Ages 7-10) - Harder puzzles
  champion: {
    alphabet: [
      { type: 'alphabet', difficulty: 'champion', question: "What letter comes 3 letters after D?", answer: "G", options: ["F", "G", "H"] },
      // More hard puzzles...
    ],
    // More categories...
  },
  
  // Bonus questions - Extra challenging
  bonus: {
    alphabet: [
      { type: 'alphabet', difficulty: 'bonus', question: "What letter is 5 letters after J?", answer: "O", options: ["M", "N", "O"] },
      // More bonus puzzles...
    ],
    // More categories...
  }
};
```

### Bonus Questions for Quick Learners

We implemented a bonus question feature that appears when a child completes the standard 5 puzzles quickly and with few hints:

```javascript
// Check if game is won or if we should show bonus question
if (newPuzzlesSolved >= 5) {
  // Check if they solved all puzzles quickly (under 2 minutes) with few hints
  const totalTime = gameState.gameStartTime ? (Date.now() - gameState.gameStartTime) / 1000 : 300;
  if (totalTime < 120 && gameState.hintsUsed <= 1 && newStreak >= 3) {
    // They solved it quickly with no/few hints and have a streak - offer bonus question
    setTimeout(() => {
      setShowingBonusQuestion(true);
      setBonusQuestionTime(totalTime);
      // Fetch a harder bonus question
      const puzzleType = gameState.locations[gameState.currentLocation].puzzleType;
      fetchBonusQuestion(puzzleType);
    }, 1500);
  } else {
    // Regular win condition
    setTimeout(() => {
      playSound('win');
      updateGameState({ gameWon: true });
    }, 1000);
  }
}
```

The bonus questions are more challenging than regular puzzles and provide an extra achievement for advanced learners:

```javascript
// Fetch bonus question
const fetchBonusQuestion = async (puzzleType) => {
  try {
    setLoading(true);
    // Get a harder bonus question
    const bonusQuestion = await getRandomPuzzle(puzzleType, 'bonus');
    
    if (bonusQuestion) {
      updateGameState({
        currentPuzzle: bonusQuestion,
        isBonusQuestion: true
      });
    }
  } catch (error) {
    console.error("Error fetching bonus question:", error);
  } finally {
    setLoading(false);
  }
};
```

### Visual Indicators for Skill Level and Bonus Questions

We added visual indicators to help parents and children understand the current skill level and when they're attempting a bonus question:

```jsx
{gameState.skillLevel && (
  <div className="skill-level-indicator">
    {gameState.skillLevel === 'explorer' && <span>🌱 Explorer</span>}
    {gameState.skillLevel === 'adventurer' && <span>🌟 Adventurer</span>}
    {gameState.skillLevel === 'champion' && <span>🏆 Champion</span>}
  </div>
)}

// For bonus questions
<h3>
  {showingBonusQuestion ? (
    <span className="bonus-label">Bonus Question!</span>
  ) : (
    "Puzzle"
  )}
</h3>
```

With special styling to make bonus questions stand out:

```css
.bonus-label {
  background-color: #FFD700;
  color: #333;
  padding: 5px 15px;
  border-radius: 20px;
  font-size: 1.3rem;
  animation: pulse 1s infinite;
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
}

.bonus-question {
  background-color: #FFF8E1;
  border: 2px solid #FFD700;
  box-shadow: 0 4px 8px rgba(255, 215, 0, 0.3);
}
```

### Challenges and Solutions

1. **Challenge**: Creating appropriate difficulty levels for different age groups
   **Solution**: Researched age-appropriate educational standards and created puzzles that match developmental stages

2. **Challenge**: Determining when to offer bonus questions
   **Solution**: Implemented a system that considers time taken, hints used, and answer streak to identify advanced learners

3. **Challenge**: Making the skill selection intuitive for parents
   **Solution**: Used clear age ranges, descriptive names, and visual icons to help parents choose the right level

### User Testing Feedback

We conducted testing with children of different ages and received valuable insights:

- The Explorer level (3-4) was perfect for preschoolers just learning letters and numbers
- The Adventurer level (5-6) provided a good challenge for kindergarteners
- The Champion level (7-10) was appropriately challenging for early elementary students
- Children were excited by the bonus questions and felt a sense of accomplishment when solving them
- Parents appreciated being able to select the appropriate difficulty level

### Screenshots from the Games

![Login Screen](/img/p1.png)
*Fig 1: Login Screen*

![Puzzle Screen](/img/p2.png)
*Fig 2: Puzzle Screen*

![Game Progress](/img/p3.png)
*Fig 3: Game Progress*

![Puzzle Completion](/img/p4.png)
*Fig 4: Puzzle Completion*

![Bonus Round](/img/p5.png)
*Fig 5: Bonus Round*

### Next Steps

As we continue to refine the Finding Tilly educational game, our next steps include:

1. **Expanded Puzzle Types**: Add new categories like shapes, colors, and simple words
2. **Adaptive Difficulty**: Automatically adjust difficulty based on performance
3. **Parent Dashboard**: Create a separate interface for parents to track progress
4. **Multiplayer Mode**: Allow siblings or classmates to play together
5. **Customizable Content**: Let parents or teachers add their own educational content

You can access the full code on GitHub [here](https://github.com/dineshgopal29/finding-tilly).

---

*This development blog will continue to be updated as we further enhance "Finding Tilly" with additional features and refinements.*

