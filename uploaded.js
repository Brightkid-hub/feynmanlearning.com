// script.js
const pdfFile = document.getElementById('pdfFile');
const uploadButton = document.getElementById('uploadButton');
const processingDiv = document.getElementById('processing');
const resultsDiv = document.getElementById('results');
const summaryDiv = document.getElementById('summary');
const flashcardsDiv = document.getElementById('flashcards');
const downloadFlashcardsButton = document.getElementById('downloadFlashcards');


uploadButton.addEventListener('click', () => {
  const file = pdfFile.files[0];
  if (file) {
    processingDiv.style.display = 'block'; // Show processing message
    resultsDiv.style.display = 'none';
    uploadButton.disabled = true; // Disable the upload button

    // Simulate PDF processing (replace with actual PDF parsing and summarization)
    setTimeout(() => {  // Simulate a delay for processing
      const summaryText = "This is a sample summary.  It covers the main points of the PDF.  More details can be included.";
      const flashcards = [
        { front: "What is the main topic?", back: "The main topic is X." },
        { front: "Key concept 1?", back: "Key concept 1 is Y." },
        { front: "Key concept 2?", back: "Key concept 2 is Z." }
        // ... more flashcards
      ];

      summaryDiv.textContent = summaryText;
      flashcardsDiv.innerHTML = ''; // Clear any previous flashcards

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
          frontDiv.style.display = frontDiv.style.display === 'none' ? 'block' : 'block'; // Always show front on click.
          backDiv.style.display = backDiv.style.display === 'none' ? 'block' : 'none';
        });


        flashcardsDiv.appendChild(cardDiv);
      });

      processingDiv.style.display = 'none';
      resultsDiv.style.display = 'block';
      uploadButton.disabled = false; // Re-enable the upload button

    }, 2000); // Simulate 2-second processing time

  } else {
    alert('Please select a PDF file.');
  }
});


downloadFlashcardsButton.addEventListener('click', () => {
  const flashcards = flashcardsDiv.querySelectorAll('.flashcard');
  let flashcardText = "";

  flashcards.forEach(card => {
    const front = card.querySelector('.front').textContent;
    const back = card.querySelector('.back').textContent;
    flashcardText += `${front}\n${back}\n\n`; // Add spacing between flashcards
  });

  const blob = new Blob([flashcardText], { type: 'text/plain' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'flashcards.txt'; // Set the filename
  link.click();
});