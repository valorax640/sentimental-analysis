from textblob import TextBlob
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/analyze', methods=['POST'])
def analyze_sentiment():
    data = request.get_json()
    word = data.get('word', '')
    analysis = TextBlob(word)
    polarity = analysis.sentiment.polarity

    if polarity > 0:
        sentiment = "Positive"
    elif polarity < 0:
        sentiment = "Negative"
    else:
        sentiment = "Neutral"

    return jsonify({"word": word, "sentiment": sentiment, "polarity": polarity})

if __name__ == '__main__':
    app.run(debug=True)
