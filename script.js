// script.js
const textInput = document.getElementById('textInput');
const generateButton = document.getElementById('generateButton');
const processingDiv = document.getElementById('processing');
const resultsDiv = document.getElementById('results');
const summaryDiv = document.getElementById('summary');
const flashcardsDiv = document.getElementById('flashcards');
const downloadFlashcardsButton = document.getElementById('downloadFlashcards');

generateButton.addEventListener('click', () => {
  const text = textInput.value;

  if (text.trim() === "") {
    alert("Please enter some text.");
    return; // Don't proceed if the text is empty
  }

  processingDiv.style.display = 'block';
  resultsDiv.style.display = 'none';
  generateButton.disabled = true;

  // Simulate text processing (replace with actual summarization and flashcard generation)
  setTimeout(() => {
    const summaryText = generateSummary(text); // Use the function to generate a summary
    const flashcards = generateFlashcards(text); // Use the function for flashcards

    summaryDiv.textContent = summaryText;
    flashcardsDiv.innerHTML = '';

    flashcards.forEach(flashcard => {
      const cardDiv = document.createElement('div');
      cardDiv.classList.add('flashcard');

      const frontDiv = document.createElement('div');
      frontDiv.classList.add('front');
      frontDiv.textContent = flashcard.front;
      cardDiv.appendChild(frontDiv);

      const backDiv = document.createElement('div');
      backDiv.classList.add('back');
      backDiv.textContent = flashcard.back;
      cardDiv.appendChild(backDiv);

      cardDiv.addEventListener('click', () => {
        frontDiv.style.display = 'block';
        backDiv.style.display = backDiv.style.display === 'none' ? 'block' : 'none';
      });

      flashcardsDiv.appendChild(cardDiv);
    });

    processingDiv.style.display = 'none';
    resultsDiv.style.display = 'block';
    generateButton.disabled = false;
  }, 1000); // Simulate processing time
});


function generateSummary(text) {
  // Placeholder for actual summarization logic (NLP API or library)
  // For this example, we'll just return the first few sentences.
  const sentences = text.split('. ');  // Basic sentence splitting. Improve with regex for real use.
    const numSentences = Math.min(3, sentences.length); // Get up to 3 sentences
    return sentences.slice(0, numSentences).join('. ') + '.'; // Join them back with a period.
}

function generateFlashcards(text) {
    // Placeholder for actual flashcard generation (NLP API or library)
    // For this example, create some basic question/answer flashcards based on keywords.

    const keywords = extractKeywords(text); // Function to extract keywords (see below)
    const flashcards = [];

    keywords.forEach(keyword => {
        flashcards.push({
            front: `What is related to ${keyword}?`,
            back: `Information about ${keyword} from the text.`
        });
    });

    return flashcards;
}

function extractKeywords(text) {
    // Placeholder for keyword extraction (NLP API or library).
    // For this example, just split the text into words and take a few.
    const words = text.toLowerCase().split(/\s+/); // Split by any whitespace
    const uniqueWords = [...new Set(words)]; // Remove duplicates
    return uniqueWords.slice(0, Math.min(5, uniqueWords.length)); // Return up to 5 keywords
}



downloadFlashcardsButton.addEventListener('click', () => {
  const flashcards = flashcardsDiv.querySelectorAll('.flashcard');
  let flashcardText = "";

  flashcards.forEach(card => {
    const front = card.querySelector('.front').textContent;
    const back = card.querySelector('.back').textContent;
    flashcardText += `${front}\n${back}\n\n`;
  });

  const blob = new Blob([flashcardText], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'flashcards.txt';
  link.click();
});
















