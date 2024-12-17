const fetch = require('node-fetch'); // Ensure this is included

exports.handler = async (event) => {
    try {
        // Parse incoming user input
        const requestBody = JSON.parse(event.body);

        // Extract fields from the user input
        const query = requestBody.query || ''; // Recipe search query
        const foodType = requestBody.foodType || 'any'; // Default to 'any' if not provided
        const cuisineType = requestBody.cuisineType || ''; // Default to empty string if no cuisine is provided

        // Ensure query is valid
        if (!query.trim()) {
            return {
                statusCode: 400,
                headers: {
                    'Access-Control-Allow-Origin': '*',  // CORS header
                    'Access-Control-Allow-Methods': 'OPTIONS,POST',
                    'Access-Control-Allow-Headers': 'Content-Type'
                },
                body: JSON.stringify({ error: 'Search query cannot be empty' }),
            };
        }

        // Define the Spoonacular API URL
        const spoonacularURL = `https://api.spoonacular.com/recipes/complexSearch?query=${query}&diet=${foodType}&cuisine=${cuisineType}&apiKey=cb7aaad773e14136b2ffb9f1e3300d66`;

        // Fetch recipes from Spoonacular API
        const spoonacularResponse = await fetch(spoonacularURL);
        const data = await spoonacularResponse.json();

        // Return processed Spoonacular data with CORS headers
        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',  // CORS header
                'Access-Control-Allow-Methods': 'OPTIONS,POST',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            body: JSON.stringify({
                message: 'Recipes retrieved successfully',
                recipes: data.results,  // The actual recipe results from Spoonacular
            }),
        };

    } catch (error) {
        return {
            statusCode: 500,
            headers: {
                'Access-Control-Allow-Origin': '*',  // CORS header
                'Access-Control-Allow-Methods': 'OPTIONS,POST',
                'Access-Control-Allow-Headers': 'Content-Type'
            },
            body: JSON.stringify({ error: 'An error occurred while processing user input' }),
        };
    }
};
