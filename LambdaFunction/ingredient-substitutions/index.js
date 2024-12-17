// Import the Azure Cosmos DB package
const { CosmosClient } = require("@azure/cosmos");

// Environment variables for Cosmos DB connection
const COSMOS_ENDPOINT = process.env.COSMOS_ENDPOINT;  // Add this in AWS Lambda Environment Variables
const COSMOS_KEY = process.env.COSMOS_KEY;            // Add this in AWS Lambda Environment Variables
const DATABASE_NAME = "recipeDatabase";               // Replace with your actual database name
const CONTAINER_NAME = "ingredientSubstitutions";     // Replace with your actual container name

// Initialize the Cosmos DB client
const client = new CosmosClient({ endpoint: COSMOS_ENDPOINT, key: COSMOS_KEY });

exports.handler = async (event) => {
    let ingredientName;

    try {
        // Parse the body if it exists, otherwise use queryStringParameters
        if (event.body) {
            const requestBody = JSON.parse(event.body);
            ingredientName = requestBody.ingredientName || event.queryStringParameters?.ingredientName;
        } else {
            ingredientName = event.queryStringParameters?.ingredientName;
        }

        // Check if an ingredient name is provided
        if (!ingredientName) {
            return {
                statusCode: 400,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                    message: "Ingredient name is required in the query string.",
                }),
            };
        }

        // Query the Cosmos DB container for the ingredient substitution
        const database = client.database(DATABASE_NAME);
        const container = database.container(CONTAINER_NAME);

        // Log the ingredient name we're querying
        console.log(`Querying database for ingredient: ${ingredientName}`);

        const query = {
            query: "SELECT * FROM c WHERE c.ingredientName = @ingredientName",
            parameters: [
                { name: "@ingredientName", value: ingredientName }
            ]
        };

        // Execute the query
        const { resources } = await container.items.query(query).fetchAll();

        // Log the raw resources response from the database
        console.log(`Raw database response for ingredient: ${ingredientName}`, resources);

        // If no matches are found
        if (resources.length === 0) {
            return {
                statusCode: 404,
                headers: {
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                    message: `No substitutions found for ingredient: ${ingredientName}`,
                }),
            };
        }

        // Log the substitutions found
        console.log(`Substitutions found for ${ingredientName}: ${resources[0].substitutes}`);

        // Return the substitutions
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                ingredientName: ingredientName,
                substitutions: resources[0].substitutes,
            }),
        };

    } catch (error) {
        console.error("Error fetching ingredient substitutions:", error);
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                message: "Internal Server Error",
            }),
        };
    }
};