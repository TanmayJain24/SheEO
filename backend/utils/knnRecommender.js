// Step 1: Vectorize domains
function vectorize(items, allDomains) {
    return items.map(item => ({
      ...item,
      vector: allDomains.map(domain => 
        item.domains ? item.domains.includes(domain) ? 1 : 0  // For users
                     : item.domain === domain ? 1 : 0          // For posts
      )
    }));
  }
  
  // Step 2: Calculate cosine similarity
  function cosineSimilarity(vecA, vecB) {
    let dot = 0, magA = 0, magB = 0;
    for (let i = 0; i < vecA.length; i++) {
      dot += vecA[i] * vecB[i];
      magA += vecA[i] ** 2;
      magB += vecB[i] ** 2;
    }
    return dot / (Math.sqrt(magA) * Math.sqrt(magB));
  }
  
  // Step 3: KNN recommendation
  export async function recommendKNN(userId, k = 5) {
    const [user, allPosts, allDomains] = await Promise.all([
      User.findById(userId),
      Post.find(),
      Post.distinct('domain')
    ]);
  
    // Vectorize data
    const userVector = vectorize([user], allDomains)[0].vector;
    const posts = vectorize(allPosts, allDomains);
  
    // Score posts
    const scoredPosts = posts.map(post => ({
      ...post,
      score: cosineSimilarity(userVector, post.vector) * 
             (user.domainEngagement.get(post.domain) || 1)
    }));
  
    // Return top K recommendations
    return scoredPosts
      .sort((a, b) => b.score - a.score)
      .slice(0, k)
      .map(post => ({
        _id: post._id,
        caption: post.caption,
        domain: post.domain,
        score: post.score
      }));
  }
  
  module.exports = { recommendKNN };