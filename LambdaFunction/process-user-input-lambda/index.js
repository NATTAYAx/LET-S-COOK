const { LanguageServiceClient } = require('@google-cloud/language');

// Provide the path to the service account key JSON file
const client = new LanguageServiceClient({
  keyFilename: '/var/task/google-credentials.json'  // Path to key file in Lambda deployment package
});

exports.handler = async (event) => {
  try {
    // CORS headers for the response
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',  // Allow all origins
      'Access-Control-Allow-Methods': 'OPTIONS,POST',  // Allowed methods
      'Access-Control-Allow-Headers': 'Content-Type'  // Allowed headers
    };

    if (event.httpMethod === 'OPTIONS') {
      // Handle preflight request for CORS
      return {
        statusCode: 200,
        headers: corsHeaders
      };
    }

    // Parse the incoming request body
    const requestBody = JSON.parse(event.body);
    const query = requestBody.query ? decodeURIComponent(requestBody.query).toLowerCase() : '';
    const avoidIngredients = requestBody.avoidIngredients || []; // Ingredients to avoid
    const cuisineType = requestBody.cuisineType || 'any'; // Cuisine type
    const foodType = requestBody.foodType || 'any'; // Dietary restrictions

    // Use the Google Cloud NLP API for processing the query
    const document = {
      content: query,
      type: 'PLAIN_TEXT',
    };

    // Analyze the input with the NLP API for ingredients and dish types
    const [result] = await client.analyzeEntities({ document });
    let entities = result.entities.map(entity => entity.name.toLowerCase());

    // Split the query into individual words (e.g., "spaghetti carbonara" becomes ["spaghetti", "carbonara"])
    const queryWords = query.split(' ').map(word => word.toLowerCase());

    // Combine NLP entities with split query words
    let refinedEntities = [...entities, ...queryWords];

    // Remove duplicates: If "spaghetti carbonara" exists, remove "spaghetti" and "carbonara" as separate entries
    refinedEntities = refinedEntities.filter((entity, index, self) => {
      return !self.includes(entity.split(' ').join('')) || entity.split(' ').length === 1;
    });

    // Filter out ingredients to avoid from the entities
    refinedEntities = refinedEntities.filter(entity => !avoidIngredients.includes(entity));

    // Additional logic to refine extracted entities
    let dishType = '';
    let nutritionGoals = [];

    // Check for nutrition goals in the query (e.g., "high protein", "low sodium")
    const nutritionKeywords = ['high protein', 'low fat', 'low sodium', 'high fiber'];
    nutritionKeywords.forEach(keyword => {
      if (query.includes(keyword)) {
        nutritionGoals.push(keyword);
      }
    });

    // Example: If "curry" is part of the entities, consider it a dish type
    if (refinedEntities.includes('curry')) {
      dishType = 'curry';
    }

    // Prepare the output with the extracted data
    const extractedData = {
      dishType: dishType || 'any',  // If no dish type is found, default to 'any'
      ingredients: refinedEntities, // Ingredients list without the avoided ones
      nutritionGoals: nutritionGoals.length > 0 ? nutritionGoals : 'none',  // Default to 'none'
      cuisineType: cuisineType,
      foodType: foodType
    };

    console.log("Final refined entities for multi-word query:", refinedEntities);

    // Return the result with CORS headers
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: JSON.stringify({
        message: 'Processed query successfully',
        extractedData: extractedData,
      }),
    };

  } catch (error) {
    console.error('Error processing request:', error);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',  // CORS header for error response
      },
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
