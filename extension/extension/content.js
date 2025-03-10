document.addEventListener('mouseup', function () {
    const selectedText = window.getSelection().toString().trim();

    if (selectedText) {
        console.log(`Selected text: ${selectedText}`);

        fetch('http://127.0.0.1:5000/predict', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: selectedText })
        })
        .then(response => {
            console.log('Response status:', response.status);
            return response.json();
        })
        .then(data => {
            console.log('Prediction data:', data);
            const category = data.category;

            if (category === 'pro-ed') {
                console.log('Category is pro-ED, highlighting text.');
                highlightSelectedText();
                addWarningLabel();
            } else {
                console.log('Category is not pro-ED, no highlighting.');
            }
            alert(`Category: ${category}`);
            sayCategory(category);
        })
        .catch(error => console.error('Error:', error));
    }
});

function sayCategory(category) {
    const msg = new SpeechSynthesisUtterance();
    if(category=='pro-ed')
    msg.text = `The content can be triggering for sensitive audience`;
    window.speechSynthesis.speak(msg);
}

function highlightSelectedText() {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const span = document.createElement('span');
        span.className = 'highlighted';
        range.surroundContents(span);
    }
}

function addWarningLabel() {
    const warningLabel = document.createElement('div');
    warningLabel.classList.add('warning');
    warningLabel.innerText = 'Can trigger persons who suffer from eating disorders';
    document.body.appendChild(warningLabel);
}
