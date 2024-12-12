import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const SentimentInput = () => {
    const [word, setWord] = useState('');

    const analyzeSentiment = async () => {
        if (!word) {
            Swal.fire({
                icon: 'warning',
                title: 'Input Required',
                text: 'Please enter a word to analyze.',
                customClass: {
                    popup: 'sweetalert-small',
                },
            });
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/analyze', { word });
            const { sentiment, polarity } = response.data;

            // Define SweetAlert content dynamically
            let icon = '';
            let title = '';
            let bgColor = '';
            if (sentiment === 'Positive') {
                icon = 'success';
                title = 'Positive Sentiment!';
                bgColor = 'bg-green-100';
            } else if (sentiment === 'Negative') {
                icon = 'error';
                title = 'Negative Sentiment!';
                bgColor = 'bg-red-100';
            } else {
                icon = 'info';
                title = 'Neutral Sentiment!';
                bgColor = 'bg-gray-100';
            }

            Swal.fire({
                icon,
                title,
                html: `
                    <div class="p-4 ${bgColor} rounded-lg">
                        <p><strong>Word:</strong> ${word}</p>
                        <p><strong>Sentiment:</strong> ${sentiment}</p>
                        <p><strong>Polarity:</strong> ${polarity}</p>
                    </div>`,
                customClass: {
                    popup: 'sweetalert-small',
                },
            });

            // Clear the input field
            setWord('');
        } catch (error) {
            console.error('Error analyzing sentiment:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to analyze sentiment. Please try again later.',
                customClass: {
                    popup: 'sweetalert-small',
                },
            });
        }
    };

    return (
        <div className="p-4 max-w-md mx-auto flex flex-col items-center">
            <input
                type="text"
                value={word}
                onChange={(e) => setWord(e.target.value)}
                placeholder="Enter a word"
                className="border p-3 rounded w-full mb-4 focus:outline-none focus:ring focus:ring-blue-300"
            />
            <button
                onClick={analyzeSentiment}
                className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600"
            >
                Analyze
            </button>
        </div>
    );
};

export default SentimentInput;
