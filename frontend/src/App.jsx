import SentimentInput from './SentimentInput';

function App() {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="p-6 bg-white shadow-lg rounded-lg">
                <h1 className="text-2xl font-bold text-center mb-4">Sentiment Analysis</h1>
                <SentimentInput />
            </div>
        </div>
    );
}

export default App;
