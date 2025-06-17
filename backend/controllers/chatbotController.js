import { CohereClient } from 'cohere-ai';
const cohere = new CohereClient({ token: "lVWWMJs4VHWj0pOxvXzpSM5qP45UwQNqIhdqJz7M" });

// Local knowledge base for fallback
const sheeoKnowledge = {
  "what is sheeo": "SheEO is a global community supporting women-led ventures through radical generosity.",
  "how to join": "You can join as an Activator (contributor) or Venture (recipient) on our website.",
  "funding model": "SheEO provides 0% interest loans funded by Activators' contributions.",
  "default": "I specialize in SheEO information. Try asking about our mission, funding, or how to join."
};

function getLocalAnswer(question) {
  const lowerQuestion = question.toLowerCase();
  for (const [key, answer] of Object.entries(sheeoKnowledge)) {
    if (lowerQuestion.includes(key)) {
      return answer;
    }
  }
  return null;
}

export const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;
    
    const localAnswer = getLocalAnswer(message);
    if (localAnswer) {
      return res.json({ answer: localAnswer });
    }

    const response = await cohere.chat({
      model: 'command',
      message: `As a SheEO assistant, answer briefly (1-2 sentences max). 
                Focus on women entrepreneurs, funding, and community.
                Question: ${message}`,
      temperature: 0.3,
      maxTokens: 100
    });

    res.json({ answer: response.text });
  } catch (error) {
    console.error('Chatbot error:', error);
    res.status(500).json({ error: "Sorry, I can't respond right now" });
  }
};