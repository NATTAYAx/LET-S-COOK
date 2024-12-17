// Load environment variables
const spoonacularAPIKeys = [
    process.env.SPOONACULAR_API_KEY_1,
    process.env.SPOONACULAR_API_KEY_2,
    process.env.SPOONACULAR_API_KEY_3,
    process.env.SPOONACULAR_API_KEY_4,
    process.env.SPOONACULAR_API_KEY_5,
    process.env.SPOONACULAR_API_KEY_6,
    process.env.SPOONACULAR_API_KEY_7,
    process.env.SPOONACULAR_API_KEY_8,
    process.env.SPOONACULAR_API_KEY_9,
    process.env.SPOONACULAR_API_KEY_10,
];

// Index to track the current key
let currentKeyIndex = 0;

// Function to get the current API key
function getCurrentAPIKey() {
    const apiKey = spoonacularAPIKeys[currentKeyIndex];
    if (!apiKey) {
        throw new Error('API Key is undefined');
    }
    console.log(`Using API key index ${currentKeyIndex}: ${apiKey}`);
    return apiKey;
}

// Function to switch to the next key
function switchAPIKey() {
    currentKeyIndex = (currentKeyIndex + 1) % spoonacularAPIKeys.length;
    console.log(`Switching to API key: ${spoonacularAPIKeys[currentKeyIndex]}`);
}

const synonymMap = {
    'lo mein': 'lo mein noodles',
    'minced beef': 'ground beef',
    'courgette': 'zucchini',
    'aubergine': 'eggplant',
    'chips': 'fries',
    'biscuits': 'cookies',
    'flank steak': 'beef',
    'tacos': 'taco',  // Handle plural/singular but keep original term in some cases
    'beef tacos': 'beef taco',
    'coriander': 'cilantro',
    'prawns': 'shrimp',
    'soda': 'pop',
    'garbanzo beans': 'chickpeas',
    'rocket': 'arugula',
    'caster sugar': 'superfine sugar',
    'baking soda': 'bicarbonate of soda',
    'brown sauce': 'steak sauce',
    'mash': 'mashed potatoes',
    'brinjal': 'eggplant',
    'spaghetti': 'pasta',
    'bbq': 'barbecue',
    'ketchup': 'tomato sauce',
    // Other terms that users may enter with variations
    'red peppers': 'bell peppers',
    'chili sauce': 'hot sauce',
    'green onions': 'spring onions',
    'veggie': 'vegetable',
    'chillies': 'chili',
    'dried chillies': 'dried chili',
    // Regional and alternative spellings
    'garbanzo': 'chickpea',
    'pesto': 'basil pesto',
    'bologna': 'baloney',
};

// Define a more comprehensive list of high-sodium ingredients
const highSodiumIngredients = [
    'salt', 'soy sauce', 'fish sauce', 'teriyaki sauce', 'dales seasoning',
    'canned soup', 'canned broth', 'bouillon cubes', 'seasoning salt', 'pickles',
    'processed meats', 'bacon', 'sausage', 'ham', 'cured meats', 'smoked fish',
    'chicken broth', 'beef broth', 'vegetable broth', 'chicken stock',
    'beef stock', 'vegetable stock', 'miso', 'kimchi', 'brine', 'anchovy',
    'olives', 'deli meat', 'parmesan', 'cheddar', 'american cheese',
    'beef bouillon', 'chicken bouillon', 'soy', 'brined', 'cured', 'preserved'
];

// Refine entities by dynamically combining patterns and removing unnecessary words
function refineEntities(entities) {
    const ignoreWords = [
        'and', 'or', 'with', 'for', 'in', 'on', 'the', 'to', 'of', 'as', 'at', 'by', 'from', // General stopwords
        'a', 'an', 'it', 'is', 'are', 'be', 'was', 'were', 'have', 'has', 'had', 'do', 'does', 'did', // Common verbs
        'quick', 'easy', 'simple', 'fast', 'instant', 'dinner', 'lunch', 'breakfast', 'meal', 'recipe', // Cooking context
        'fresh', 'organic', 'whole', 'home', 'style', 'homemade', 'authentic', // Descriptors
        'day', 'night', 'any', 'some', 'best', 'favorite', 'delicious', 'tasty', 'flavorful', 'yummy',
        'i', 'want', 'no',  // Adding 'i', 'want', and 'no' here
    ];

    // Include flavor-related terms such as 'spicy', 'savory', 'sweet', etc.
    const flavorKeywords = ['spicy', 'savory', 'sweet', 'tangy', 'mild', 'hot', 'sour', 'umami'];

    // General dynamic combination rules with descriptor-noun pairs
    const dynamicCombineRules = [
        { first: ['low', 'high', 'medium'], second: ['sodium', 'protein', 'fat', 'calories', 'fiber'] }, // Nutrient levels
        { first: ['chicken', 'tuna', 'egg', 'beef', 'pork', 'belly', 'salmon', 'shrimp', 'mushroom', 'turkey', 'duck'], second: ['salad', 'sandwich', 'burger', 'wrap', 'soup', 'stir fry', 'taco', 'roll', 'lo mein', 'noodles'] }, // Meat + Dish
        { first: ['black', 'green', 'red', 'yellow', 'white'], second: ['bean', 'pepper', 'onion', 'rice', 'tomato', 'chili'] }, // Colors + Food Items
        { first: ['peanut', 'almond', 'coconut', 'cashew', 'hazelnut', 'sunflower'], second: ['butter', 'milk', 'oil', 'cream', 'flour'] }, // Nut-based and other products
        { first: ['spicy', 'sweet', 'savory', 'tangy', 'hot', 'mild'], second: ['sauce', 'chicken', 'dish', 'curry', 'taco', 'wrap', 'meat', 'fish', 'tofu', 'vegetables'] }, // Flavors + Food Items
        { first: ['whole', 'white', 'sourdough', 'gluten-free'], second: ['bread', 'pasta', 'flour'] }, // Bread/Pasta variations
        { first: ['grilled', 'baked', 'fried', 'roasted', 'steamed'], second: ['chicken', 'fish', 'vegetable', 'meat', 'tofu'] }, // Cooking methods + ingredients
        { first: ['lo'], second: ['mein'], third: ['noodles', 'noodle'] }

    ];

    // Regex-based phrase corrections for dynamic detection of patterns
    const phraseCorrectionPatterns = [
        { regex: /(sodium)\s(chicken\s(salad|sandwich))/i, replacement: ['low sodium', '$2'] },
        { regex: /(fat)\s(beef\sburger)/i, replacement: ['low fat', '$2'] },
        { regex: /no\s(sugar)/i, replacement: ['sugar free'] },
        { regex: /no\s(salt)/i, replacement: ['salt free'] },
        { regex: /gluten[-\s]?free/i, replacement: ['gluten free'] }
        // Add more regex rules here
    ];

    // Normalize and filter out ignoreWords immediately, except for flavor-related ones
    let cleanedEntities = entities
        .map(e => e.toLowerCase().trim())
        .filter(e => !ignoreWords.includes(e) || flavorKeywords.includes(e));

    let refinedEntities = [];

    cleanedEntities.forEach((entity, index) => {
        const nextEntity = cleanedEntities[index + 1];

        // Combine descriptor-noun pairs dynamically
        if (nextEntity) {
            const combined = dynamicCombineRules.some(rule => {
                if (rule.first.includes(entity) && rule.second.includes(nextEntity)) {
                    refinedEntities.push(`${entity} ${nextEntity}`);
                    cleanedEntities.splice(index + 1, 1); // Skip the next entity
                    return true;
                }
                return false;
            });

            if (!combined) {
                refinedEntities.push(entity);
            }
        } else {
            refinedEntities.push(entity);
        }
    });

    refinedEntities = refinedEntities.map(entity => {
        for (let { regex, replacement } of phraseCorrectionPatterns) {
            if (regex.test(entity)) {
                const matched = entity.match(regex);
                const replacementText = replacement.map(part => part.replace(/\$(\d+)/g, (_, num) => matched[num]));
                entity = replacementText.join(' ');
                break;  // Exit once a match is found
            }
        }
        return entity;
    });

    // Map synonyms to normalized terms
    refinedEntities = refinedEntities.map(entity => synonymMap[entity] || entity);

    // Remove redundant entities before sending query to Spoonacular
    function selectBestEntities(entities) {
        const priorityList = ['chicken lo mein noodles', 'lo mein noodles', 'noodles']; // Prioritize more specific terms
        let selectedEntities = [];

        // Normalize entities by converting to lowercase and trimming spaces
        let normalizedEntities = entities.map(entity => entity.toLowerCase().trim());

        for (let priority of priorityList) {
            const normalizedPriority = priority.toLowerCase().trim();

            // Check if any entity contains the priority string (partial match)
            const matchingEntity = normalizedEntities.find(entity => entity.includes(normalizedPriority));

            if (matchingEntity) {
                selectedEntities.push(matchingEntity); // Use the first matching entity
                break; // Stop after finding the best match
            }
        }

        // Return the best match or default to the most relevant entities
        return selectedEntities.length > 0 ? selectedEntities : entities.slice(0, 2); // Use at most 2 entities
    }

    const finalEntities = selectBestEntities(refinedEntities);  // Use finalEntities here
    const query = finalEntities.join(' ');  // Build query from finalEntities

    // Ensure final entities make sense by filtering out invalid combinations
    refinedEntities = refinedEntities.filter(entity => {
        const invalidCombinations = [
            'protein quinoa', 'low pizza', 'high cake', 'fat salad', 'sugar steak' // Add more invalid combinations as needed
        ];

        // Remove any entity that matches one of the invalid combinations
        return !invalidCombinations.some(invalid => entity.includes(invalid));
    });

    // Remove duplicates and return the refined entities
    const queryEntities = [...new Set(refinedEntities)];

    return { refinedEntities, queryEntities };
}

// Filter recipes to exclude those containing high-sodium ingredients
function filterHighSodiumRecipes(recipes, isLowSodiumSearch) {
    if (!isLowSodiumSearch) return recipes; // If it's not a low-sodium search, return the recipes unchanged

    console.log(`Filtering for low sodium recipes. Checking ${recipes.length} recipes.`);

    return recipes.filter(recipe => {
        // Normalize ingredient names to lowercase
        let lowerCaseIngredients = recipe.ingredients.map(ingredient => ingredient.toLowerCase().trim());

        // Check if any high-sodium ingredients are present
        const containsHighSodium = lowerCaseIngredients.some(ingredient => {
            return highSodiumIngredients.some(highSodium =>
                ingredient.includes(highSodium) &&
                !ingredient.includes('low-sodium') &&  // Exclude "low-sodium" variants
                !ingredient.includes('reduced-sodium') &&
                !ingredient.includes('no salt')        // Exclude "no salt" variants
            );
        });

        if (containsHighSodium) {
            console.log(`Excluding recipe "${recipe.title}" due to high-sodium ingredients.`);
        }

        // Only return recipes without high-sodium ingredients
        return !containsHighSodium;
    });
}

// Step 1: Define a list of priorities for ingredients, nutrition goals, etc.
const priorityOrder = {
    critical: ['main ingredient', 'diet'],   // Highest priority, keep these always
    high: ['ingredient preferences', 'nutrition goals'],  // High priority, but can relax if needed
    medium: ['optional ingredients', 'cuisine type'],  // Relax if strict match fails
    low: ['extra filters'],  // Can be relaxed or ignored
};

// Define fetchRecipes function first
async function fetchRecipes(queryParts, cuisineType, foodType, avoidIngredients) {
    let query = queryParts.join(' ');
    let attempts = 0;  // Restore the attempts logic
    let maxAttempts = spoonacularAPIKeys.length;  // Set max attempts to the number of available keys

    while (attempts < maxAttempts) {
        const currentAPIKey = getCurrentAPIKey();  // Get the current API key
        let spoonacularURL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${currentAPIKey}&addRecipeNutrition=true`;

        if (query.length > 0) {
            spoonacularURL += `&query=${encodeURIComponent(query)}`;
        }

        if (foodType !== 'any') {
            spoonacularURL += `&diet=${foodType}`;
        }

        if (cuisineType !== 'any') {
            spoonacularURL += `&cuisine=${cuisineType}`;
        }

        if (avoidIngredients.length > 0) {
            spoonacularURL += `&excludeIngredients=${encodeURIComponent(avoidIngredients.join(','))}`;
        }

        console.log("Sending request to Spoonacular with URL:", spoonacularURL);

        const spoonacularResponse = await fetch(spoonacularURL);

        if (spoonacularResponse.ok) {
            let data = await spoonacularResponse.json();
            console.log("Raw Spoonacular API response:", JSON.stringify(data, null, 2));
            if (data.results.length === 0) {
                console.log('No recipes found for this query.');
                return { results: [] };  // Return empty results if no recipes found
            }
            return data;  // Return the successful response data
        } else if (spoonacularResponse.status === 402) {
            // Handle the API key limit reached case
            console.log(`API limit reached for key: ${currentAPIKey}. Switching to the next key.`);
            switchAPIKey();  // Switch to the next key
            attempts++;  // Increment the attempt count
        } else {
            // Handle other errors
            throw new Error(`Error fetching data from Spoonacular: ${spoonacularResponse.status}`);
        }
    }

    throw new Error('All API keys have reached their limit or the request failed.');
}

// Step 2: Function to progressively relax the query
async function progressivelyRelaxSearch(query, avoidIngredients, cuisineType, foodType) {
    let strictRecipe = await fetchRecipes(query, cuisineType, foodType, avoidIngredients);

    // If no strict match is found, relax search step by step
    if (strictRecipe.results.length === 0) {
        console.log("No strict matches found. Relaxing search...");

        // Step 1: Relax avoid ingredients
        let relaxedRecipe = await fetchRecipes(query, cuisineType, foodType, []);  // Remove avoidIngredients

        // Step 2: Relax cuisine type
        if (relaxedRecipe.results.length === 0) {
            console.log("No results with specified cuisine, relaxing cuisine type to 'any'");
            relaxedRecipe = await fetchRecipes(query, 'any', foodType, []);  // Allow any cuisine type
        }

        return relaxedRecipe.results.length > 0 ? relaxedRecipe : { results: [] };  // Return whatever matches
    }

    return strictRecipe;  // Return strict match if found
}


//Main Lambda Function
exports.handler = async (event) => {
    console.log("Event received:", JSON.stringify(event, null, 2));

    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS,POST',
        'Access-Control-Allow-Headers': 'Content-Type'
    };

    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: corsHeaders
        };
    }

    try {
        let requestBody = event.body ? JSON.parse(event.body) : event;

        // Use the refined entities
        const { refinedEntities, queryEntities } = refineEntities(requestBody.entities || []);
        const cuisineType = requestBody.cuisineType || 'any';
        const foodType = requestBody.foodType || 'any';
        const avoidIngredients = requestBody.avoidIngredients || [];
        const nutritionGoals = requestBody.nutritionGoals || [];
        const relaxSearch = requestBody.relaxSearch || false;

        console.log("Refined Entities:", refinedEntities);
        console.log("Cuisine Type:", cuisineType);
        console.log("Food Type:", foodType);
        console.log("Avoid Ingredients:", avoidIngredients);
        console.log("Relax Search enabled:", relaxSearch);

        // Function to construct Spoonacular URL
        function buildSpoonacularURL(query, foodType, cuisineType, avoidIngredients) {
            const apiKey = getCurrentAPIKey(); // Make sure this returns a valid key
            if (!apiKey) {
                throw new Error('API Key is undefined');
            }

            let spoonacularURL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&addRecipeNutrition=true`;

            if (query.length > 0) {
                spoonacularURL += `&query=${encodeURIComponent(query)}`;
            }

            if (foodType !== 'any') {
                spoonacularURL += `&diet=${foodType}`;
            }

            if (cuisineType !== 'any') {
                spoonacularURL += `&cuisine=${cuisineType}`;
            }

            if (avoidIngredients.length > 0) {
                spoonacularURL += `&excludeIngredients=${encodeURIComponent(avoidIngredients.join(','))}`;
            }

            console.log("Constructed Spoonacular URL:", spoonacularURL);
            return spoonacularURL;
        }

        async function fetchRecipes(queryParts) {
            let query = queryParts.join(' ');
            let attempts = 0;
            let maxAttempts = spoonacularAPIKeys.length; // Limit the number of retries based on the number of keys

            while (attempts < maxAttempts) {
                const currentAPIKey = getCurrentAPIKey(); // Get the current API key
                let spoonacularURL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${getCurrentAPIKey()}&addRecipeNutrition=true`;

                if (query.length > 0) {
                    spoonacularURL += `&query=${encodeURIComponent(query)}`;
                }

                if (foodType !== 'any') {
                    spoonacularURL += `&diet=${foodType}`;
                }

                if (cuisineType !== 'any') {
                    spoonacularURL += `&cuisine=${cuisineType}`;
                }

                if (avoidIngredients.length > 0) {
                    spoonacularURL += `&excludeIngredients=${encodeURIComponent(avoidIngredients.join(','))}`;
                }

                console.log(`Attempting request with API key: ${getCurrentAPIKey()}`);
                const spoonacularResponse = await fetch(spoonacularURL);

                if (spoonacularResponse.ok) {
                    let data = await spoonacularResponse.json();
                    console.log("Raw Spoonacular API response:", JSON.stringify(data, null, 2));
                    return data; // Return the data if the request was successful
                } else if (spoonacularResponse.status === 402) {
                    console.log(`API limit reached for key: ${getCurrentAPIKey()}. Switching to the next key.`);
                    switchAPIKey(); // Switch to the next key
                    attempts++;
                } else {
                    console.log(`Error fetching data from Spoonacular: ${spoonacularResponse.status} ${spoonacularResponse.statusText}`);
                    throw new Error(`Error fetching data from Spoonacular: ${spoonacularResponse.status}`);
                }
            }

            throw new Error('All API keys have reached their limit or the request failed.');
        }

        let data = await fetchRecipes(queryEntities, cuisineType, foodType, avoidIngredients);

        // Only relax if the user has enabled it
        if (relaxSearch && (!data.results || data.results.length === 0)) {
            console.log("No results found with current strict query. Relaxing...");

            // Start by removing avoidIngredients and relaxing step-by-step
            let relaxedData = await progressivelyRelaxSearch(queryEntities, avoidIngredients, cuisineType, foodType);

            if (!relaxedData.results || relaxedData.results.length === 0) {
                // As a fallback, relax all filters to "any" if still no matches
                console.log("No matches even after relaxation, returning any available recipes.");
                relaxedData = await fetchRecipes(queryEntities, 'any', 'any', []); // Full relaxation: any food and cuisine
            }

            // If we still don't have results, return a response
            if (!relaxedData.results || relaxedData.results.length === 0) {
                console.log('No recipes found after full relaxation.');
                return {
                    statusCode: 404,
                    headers: corsHeaders,
                    body: JSON.stringify({
                        message: 'No recipes found, even after relaxing all filters. Try a different combination.'
                    }),
                };
            }

            data = relaxedData; // Use relaxed data
        }

        // Process the recipes
        let recipesWithDetails = [];
        for (let recipe of data.results) {
            try {
                const recipeId = recipe.id;
                const recipeInfoURL = `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${getCurrentAPIKey()}`;
                console.log(`Fetching recipe information for ID: ${recipeId} from URL: ${recipeInfoURL}`);

                const recipeInfoResponse = await fetch(recipeInfoURL);
                if (!recipeInfoResponse.ok) {
                    console.log(`Failed to fetch recipe details for ID: ${recipeId}, skipping.`);
                    continue;  // Skip the recipe if details can't be fetched
                }

                const recipeInfo = await recipeInfoResponse.json();

                const steps = recipeInfo.analyzedInstructions?.[0]?.steps.map(step => step.step) || ['No steps available'];
                const ingredients = Array.isArray(recipeInfo.extendedIngredients)
                    ? recipeInfo.extendedIngredients.map(ing => `${ing.original}`)
                    : [];

                let recipeData = {
                    id: recipe.id,
                    title: recipe.title || 'No title available',
                    image: recipe.image || 'No image available',
                    steps: steps,
                    ingredients: ingredients,
                    nutrition: recipe.nutrition || {},
                    description: recipeInfo.summary || 'No description available'
                };

                // Strictly filter for the requested cuisine type (e.g., French)
                if (cuisineType !== 'any') {
                    recipesWithDetails = recipesWithDetails.filter(recipe => {
                        // Check if the cuisines array includes the specified cuisine
                        if (recipe.cuisines && recipe.cuisines.length > 0) {
                            return recipe.cuisines.some(cuisine => cuisine.toLowerCase() === cuisineType.toLowerCase());
                        }
                        // If no cuisine data, assume it doesn't match and exclude it
                        console.log(`Skipping recipe: ${recipe.title} as it doesn't have cuisine information or doesn't match.`);
                        return false;
                    });
                }

                recipesWithDetails.push(recipeData);

            } catch (recipeError) {
                console.error(`Error fetching or processing recipe with ID: ${recipe.id}`, recipeError);
            }
        }

        // Normalize entities by replacing hyphens with spaces
        const normalizedEntities = refinedEntities.map(entity => entity.replace(/-/g, ' '));

        // Define the health-related search conditions
        const isLowSodiumSearch = normalizedEntities.some(entity => entity.includes('low sodium'));
        const isLowFatSearch = normalizedEntities.some(entity => entity.includes('low fat'));
        const isGlutenFreeSearch = normalizedEntities.some(entity => entity.includes('gluten-free'));

        // Apply filters based on dietary preferences
        const filteredRecipes = recipesWithDetails
            .filter(recipe => {
                // Apply low-sodium filter if necessary
                if (isLowSodiumSearch) {
                    return !recipe.ingredients.some(ingredient =>
                        highSodiumIngredients.some(highSodium =>
                            ingredient.toLowerCase().includes(highSodium)
                        )
                    );
                }
                return true; // No sodium filter applied
            })
            .filter(recipe => {
                // Apply dietary preference filters based on the foodType
                if (foodType === 'vegan' && !recipe.vegan) {
                    return false;
                }
                if (foodType === 'vegetarian' && !recipe.vegetarian) {
                    return false;
                }
                if (foodType === 'gluten-free' && !recipe.glutenFree) {
                    return false;
                }
                if (foodType === 'dairy-free' && !recipe.dairyFree) {
                    return false;
                }
                if (foodType === 'paleo') {
                    // Custom logic for paleo (no grains, no legumes, no dairy)
                    const nonPaleoIngredients = ['grains', 'legumes', 'dairy', 'processed'];
                    return recipe.ingredients.every(ingredient =>
                        nonPaleoIngredients.every(nonPaleo => !ingredient.includes(nonPaleo))
                    );
                }
                if (foodType === 'keto') {
                    // Custom logic for keto (low carbs, high fat)
                    return recipe.nutrition.carbs <= 20 && recipe.nutrition.fat >= 50;
                }
                return true; // If no filters applied, return true
            });


        // Sort recipes by score and log the top 10
        filteredRecipes.sort((a, b) => b.score - a.score);

        // Log the top 10 recipes before returning
        console.log("Top 10 filtered recipes:", JSON.stringify(filteredRecipes.slice(0, 10), null, 2));

        // Return the top 10 filtered recipes
        return {
            statusCode: 200,
            headers: corsHeaders,
            body: JSON.stringify({
                message: 'Recipes retrieved successfully',
                recipes: filteredRecipes.slice(0, 10),
            }),
        };

    } catch (error) {
        console.error('Error processing request:', error);
        return {
            statusCode: 500,
            headers: corsHeaders,
            body: JSON.stringify({ error: 'Internal Server Error' })
        };
    }
};

// List of common primary proteins and main ingredients
const mainIngredients = ['chicken', 'turkey', 'beef', 'pork', 'fish', 'tofu', 'lamb', 'duck', 'pasta', 'rice', 'potatoes', 'beans'];

// Cooking methods to prioritize
const cookingMethods = ['grilled', 'baked', 'fried', 'roasted', 'steamed', 'boiled', 'stir fry'];

// Dish types
const dishTypes = ['soup', 'stew', 'salad', 'sandwich', 'wrap', 'casserole', 'bowl', 'pizza'];

// Flavor profiles
const flavorProfiles = ['spicy', 'sweet', 'savory', 'tangy', 'umami', 'sour', 'mild'];

// Dietary preferences
const dietaryPreferences = ['vegan', 'vegetarian', 'gluten-free', 'dairy-free', 'low-carb', 'paleo', 'keto', 'gluten free', 'dairy free', 'low carb'];

// Health-related keywords
const healthRelatedKeywords = ['low-fat', 'high-protein', 'low-sodium', 'sugar-free', 'low fat', 'high protein', 'low sodium', 'sugar free'];

// Occasions
const occasions = ['christmas', 'thanksgiving', 'easter', 'party', 'weeknight', 'festive'];

// Adjusted scoring function to prioritize health-related keywords more
function scoreRecipe(recipe, keywords, cuisineType) {
    let score = 0;
    const searchableText = (recipe.title + ' ' + recipe.ingredients.join(' ') + ' ' + recipe.steps.join(' ')).toLowerCase();

    // Exact match gives a higher score
    keywords.forEach(keyword => {
        const exactMatch = new RegExp(`\\b${keyword.toLowerCase()}\\b`);
        if (searchableText.search(exactMatch) !== -1) {
            score += 15;  // Higher score for exact matches
        } else if (searchableText.includes(keyword.toLowerCase())) {
            score += 5;   // Lower score for partial matches
        }
    });

    // Add weights for health-related and dietary factors
    const healthRelatedKeywords = ['low-fat', 'high-protein', 'low-sodium', 'gluten-free', 'paleo', 'keto'];
    healthRelatedKeywords.forEach(health => {
        if (searchableText.includes(health)) {
            score += 10;  // Priority for health-related matches
        }
    });

    // Bonus points for matching cuisine type
    if (Array.isArray(recipe.cuisines) && recipe.cuisines.some(cuisine => cuisine.toLowerCase() === cuisineType.toLowerCase())) {
        score += 10;
    }

    return score;
}
