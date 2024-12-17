i18next
    .use(i18nextHttpBackend)
    .init({
        lng: 'en', // Default language
        fallbackLng: 'en',
        backend: {
            loadPath: '/locales/{{lng}}.json' // Path to your language files
        }
    }, (err, t) => {
        if (err) {
            alert("Failed to load translations. Using default language.");
        }
        updateContent(); // Ensure content is updated after initialization
    });

const ingredients = [
    // Dairy Products
    { id: 'ingredientLabel1', key: 'ingredients.milk' },
    { id: 'ingredientLabel2', key: 'ingredients.cheese' },
    { id: 'ingredientLabel3', key: 'ingredients.yogurt' },
    { id: 'ingredientLabel4', key: 'ingredients.butter' },
    { id: 'ingredientLabel5', key: 'ingredients.cream' },

    // Nuts/Seeds
    { id: 'ingredientLabel6', key: 'ingredients.almond' },
    { id: 'ingredientLabel7', key: 'ingredients.cashew' },
    { id: 'ingredientLabel8', key: 'ingredients.walnut' },
    { id: 'ingredientLabel9', key: 'ingredients.peanuts' },
    { id: 'ingredientLabel10', key: 'ingredients.sesame' },

    // Seafood
    { id: 'ingredientLabel11', key: 'ingredients.shrimp' },
    { id: 'ingredientLabel12', key: 'ingredients.crab' },
    { id: 'ingredientLabel13', key: 'ingredients.lobster' },
    { id: 'ingredientLabel14', key: 'ingredients.clams' },
    { id: 'ingredientLabel15', key: 'ingredients.oyster' },
    { id: 'ingredientLabel16', key: 'ingredients.tuna' },
    { id: 'ingredientLabel17', key: 'ingredients.salmon' },
    { id: 'ingredientLabel18', key: 'ingredients.mackerel' },

    // Grains and Sweeteners
    { id: 'ingredientLabel19', key: 'ingredients.glutenFlour' },
    { id: 'ingredientLabel20', key: 'ingredients.wheatBread' },
    { id: 'ingredientLabel21', key: 'ingredients.pasta' },
    { id: 'ingredientLabel22', key: 'ingredients.cornSyrup' },
    { id: 'ingredientLabel23', key: 'ingredients.cornStarch' },
    { id: 'ingredientLabel24', key: 'ingredients.sugar' },

    // Sauces/Condiments
    { id: 'ingredientLabel25', key: 'ingredients.soySauce' },
    { id: 'ingredientLabel26', key: 'ingredients.mustard' },
    { id: 'ingredientLabel27', key: 'ingredients.chili' },

    // Eggs
    { id: 'ingredientLabel28', key: 'ingredients.eggs' },

    // Plant-Based (Tofu, Garlic, etc.)
    { id: 'ingredientLabel29', key: 'ingredients.tofu' },
    { id: 'ingredientLabel30', key: 'ingredients.garlic' },

    // Meat
    { id: 'ingredientLabel31', key: 'ingredients.pork' },
    { id: 'ingredientLabel32', key: 'ingredients.beef' },
    { id: 'ingredientLabel33', key: 'ingredients.lamb' },

    // Fruits
    { id: 'ingredientLabel34', key: 'ingredients.orange' },
    { id: 'ingredientLabel35', key: 'ingredients.lemon' },
    { id: 'ingredientLabel36', key: 'ingredients.coconut' },

    // New Vegetables (Inserted in the correct order)
    { id: 'ingredientLabel37', key: 'ingredients.celery' }, // Added under Vegetables
    { id: 'ingredientLabel38', key: 'ingredients.onions' }, // Added under Vegetables
    { id: 'ingredientLabel39', key: 'ingredients.bellPeppers' }, // Added under Vegetables
    { id: 'ingredientLabel40', key: 'ingredients.mushrooms' } // Added under Vegetables
];


const updateContent = () => {
    document.getElementById('title').textContent = i18next.t('title');
    document.getElementById('textareaLabel').textContent = i18next.t('textareaLabel');
    document.getElementById('freeText').placeholder = i18next.t('freeTextPlaceholder');
    // Update the text for 'Ingredients to Avoid'
    document.getElementById('avoidIn').textContent = i18next.t('avoidIngredients');

    // Loop through ingredients and update the text dynamically
    ingredients.forEach(ingredient => {
        const element = document.getElementById(ingredient.id);
        if (element) {
            element.textContent = i18next.t(ingredient.key);
        }
    });

    // Update the food type and cuisine type titles and options
    document.getElementById('foodTypeTitle').textContent = i18next.t('foodTypeTitle', 'Food Type');
    document.getElementById('foodTypeAny').textContent = i18next.t('foodType.any');
    document.getElementById('foodTypeVegan').textContent = i18next.t('foodType.vegan');
    document.getElementById('foodTypeVegetarian').textContent = i18next.t('foodType.vegetarian');
    document.getElementById('foodTypePaleo').textContent = i18next.t('foodType.paleo');
    document.getElementById('foodTypeKeto').textContent = i18next.t('foodType.keto');
    document.getElementById('foodTypeGlutenFree').textContent = i18next.t('foodType.glutenFree');
    document.getElementById('foodTypeDairyFree').textContent = i18next.t('foodType.dairyFree');
    document.getElementById('cuisineTypeTitle').textContent = i18next.t('cuisineTypeTitle', 'Cuisine Type');
    document.getElementById('cuisineTypeAny').textContent = i18next.t('cuisineType.any');
    document.getElementById('cuisineTypeItalian').textContent = i18next.t('cuisineType.italian');
    document.getElementById('cuisineTypeAsian').textContent = i18next.t('cuisineType.asian');
    document.getElementById('cuisineTypeMediterranean').textContent = i18next.t('cuisineType.mediterranean');
    document.getElementById('cuisineTypeMexican').textContent = i18next.t('cuisineType.mexican');
    document.getElementById('cuisineTypeChinese').textContent = i18next.t('cuisineType.chinese');
    document.getElementById('cuisineTypeJapanese').textContent = i18next.t('cuisineType.japanese');
    document.getElementById('cuisineTypeThai').textContent = i18next.t('cuisineType.thai');
    document.getElementById('cuisineTypeIndian').textContent = i18next.t('cuisineType.indian');
    document.getElementById('cuisineTypeKorean').textContent = i18next.t('cuisineType.korean');
    document.getElementById('cuisineTypeVietnamese').textContent = i18next.t('cuisineType.vietnamese');

    document.querySelector('label[for="relaxSearch"] span').nextSibling.nodeValue = i18next.t('relaxSearch');
    // Update the button text for 'Generate Recipes'
    document.getElementById('generateButton').textContent = i18next.t('generateButton');

    // Update the loading message text
    document.getElementById('loadingText').textContent = i18next.t('loadingMessage');
    // Show loading indicator
    document.getElementById('loadingIndicator').style.display = 'block';

    // Once processing is done and all data is collected
    document.getElementById('loadingIndicator').style.display = 'none';
    document.getElementById('ingredientSubstitutions').innerHTML = completeSubstitutionsHTML; // Show all substitutions
};

document.getElementById('languageSwitcher').addEventListener('change', (e) => {
    const selectedLanguage = e.target.value;
    i18next.changeLanguage(selectedLanguage, updateContent);
});

// Store multiple Spoonacular API keys
const spoonacularAPIKeys = [
    'd4702ef95d1a4825b15ece078760dea8', //1
    'e4beedd4bdad45219e223a6100e79276', //2
    'cb7aaad773e14136b2ffb9f1e3300d66', //3
    '8ab5a8e8ae0d41b28f7eb0f2c08a6764', //4
    '2fc1b1cfb31a4d27b6213098c399c704', //5
    '230168bf80de477ebfbe382239daa59e', //6
    '8a597223062146d59f457a28689476a0', //7
    'a073ca909ca940e7be6b61c0b39be3fe', //8
    'd3eba2d9d20f48b4a6d038b25c20d183', //9
    '361bedd50d884107bb5b34bee047cbed', //10
    'cb942c6b39d845c08ff1b57c028d0aac', //11
    'f0f17a0a917942da8c43aef9da6181fb', //12
];

let currentKeyIndex = 0; // To keep track of the current key

// Function to get the current API key
function getCurrentAPIKey() {
    return spoonacularAPIKeys[currentKeyIndex];
}

// Function to switch to the next API key
function switchAPIKey() {
    currentKeyIndex = (currentKeyIndex + 1) % spoonacularAPIKeys.length;
    console.log(`Switching to API key: ${getCurrentAPIKey()}`);
}

// Function to fetch recipes from Lambda (NLP API)
async function fetchRecipes(query, foodType, cuisineType) {
    const url = 'https://a5yg50vs64.execute-api.ap-southeast-2.amazonaws.com/dev/recipe-search';
    const body = {
        query: query.trim(),
        diet: foodType && foodType !== 'any' ? foodType : undefined,
        cuisine: cuisineType && cuisineType !== 'any' ? cuisineType : undefined
    };
    console.log("Sending request to API Gateway (recipe-search):", body); // Log request body

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }


        const data = await response.json();
        console.log("Lambda (recipe-search) API response:", data); // Log the API response

        // Extract NLP keywords (entities) from the API response
        const extractedEntities = data.extractedData?.ingredients || [];

        // Log NLP keywords after being extracted
        console.log("Extracted NLP keywords (JSON):", JSON.stringify(extractedEntities));

        // Ensure that data.entities is returned properly
        return extractedEntities;  // Return ingredients extracted by NLP
    } catch (error) {
        console.error('Error calling Lambda (recipe-search):', error);
        return [];
    }
}

function normalizeIngredientName(ingredient) {
    // Check if the ingredient is in the synonymMap, otherwise return the original
    return synonymMap[ingredient.toLowerCase()] || ingredient.toLowerCase();
}

// Function to call the ingredient-substitution API via URL
async function fetchIngredientSubstitutions(ingredientName) {
    // Normalize the ingredient name using the synonymMap or other cleaning methods
    const normalizedIngredient = normalizeIngredientName(ingredientName);

    console.log(`Fetching substitution for ingredient: ${normalizedIngredient}`);  // Log ingredient being fetched

    // Build the API URL with the ingredientName query parameter
    const ingredientSubstitutionURL = `https://a5yg50vs64.execute-api.ap-southeast-2.amazonaws.com/dev/ingredient-substitution/?ingredientName=${encodeURIComponent(normalizedIngredient)}`;

    try {
        // Send the GET request to the Lambda function
        const response = await fetch(ingredientSubstitutionURL, {
            method: 'GET',  // Using GET to send query parameters
        });

        console.log(`API call to ${ingredientSubstitutionURL}`);  // Log API URL

        const result = await response.json();

        // Check if the response is OK and contains substitutions
        if (response.ok && result.substitutions && result.substitutions.length > 0) {
            console.log(`Substitutions found for ${normalizedIngredient}: ${JSON.stringify(result.substitutions)}`);

            // Format the substitutions for display
            const formattedSubstitutions = result.substitutions.map(substitution => {
                return `${substitution.name}: ${substitution.notes}`;
            });

            return { ingredient: normalizedIngredient, substitutes: formattedSubstitutions };
        } else {
            console.log(`No substitutions found for ingredient: ${normalizedIngredient}`);
            return { ingredient: normalizedIngredient, substitutes: [] };
        }
    } catch (error) {
        console.error(`Error fetching substitution for ingredient: ${normalizedIngredient}`, error);
        return { ingredient: normalizedIngredient, substitutes: [] };
    }
}

const synonymMap = {
    'low-sodium': 'low sodium',
    'high-sodium': 'high sodium',
    'lo mein': 'lo mein noodles',
    'minced beef': 'ground beef',
    'courgette': 'zucchini',
    'aubergine': 'eggplant',
    'chips': 'fries',
    'biscuits': 'cookies',
    'flank steak': 'beef',
    'tacos': 'taco',
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
    'red peppers': 'bell peppers',
    'chili sauce': 'hot sauce',
    'green onions': 'spring onions',
    'veggie': 'vegetable',
    'chillies': 'chili',
    'dried chillies': 'dried chili',
    'garbanzo': 'chickpea',
    'pesto': 'basil pesto',
    'bologna': 'baloney',
    'olive oil': 'oil',
    'plum tomatoes': 'tomatoes',
    'onions': 'onion',
};

// Refine entities by dynamically combining patterns and removing unnecessary words
function refineEntities(entities, selectedCuisineType, selectedFoodType) {
    const ignoreWords = [
        'and', 'or', 'with', 'for', 'in', 'on', 'the', 'to', 'of', 'as', 'at', 'by', 'from', // General stopwords
        'a', 'an', 'it', 'is', 'are', 'be', 'was', 'were', 'have', 'has', 'had', 'do', 'does', 'did', // Common verbs
        'quick', 'easy', 'simple', 'fast', 'instant', 'dinner', 'lunch', 'breakfast', 'meal', 'recipe', // Cooking context
        'fresh', 'organic', 'whole', 'home', 'style', 'homemade', 'authentic', // Descriptors
        'day', 'night', 'any', 'some', 'best', 'favorite', 'delicious', 'tasty', 'flavorful', 'yummy',
        'i', 'want', 'no',  // Adding 'i', 'want', and 'no' here
        'preferably', 'avoiding', 'ingredients', 'cuisine', '.' // Added these as ignore words
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
        { regex: /low\s+sodium/i, replacement: 'low-sodium' },  // Normalize 'low sodium' to 'low-sodium'
        { regex: /gluten\s+free/i, replacement: 'gluten-free' },  // Normalize 'gluten free' to 'gluten-free'
        { regex: /(fat)\s(beef\sburger)/i, replacement: ['low fat', '$2'] },
        { regex: /no\s(sugar)/i, replacement: ['sugar free'] },
        { regex: /no\s(salt)/i, replacement: ['salt free'] },
        { regex: /gluten[-\s]?free/i, replacement: ['gluten free'] }
        // Add more regex rules here
    ];

    // Normalize and filter entities
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

    // Apply phrase corrections (like 'low sodium')
    refinedEntities = refinedEntities.map(entity => {
        for (let { regex, replacement } of phraseCorrectionPatterns) {
            if (regex.test(entity)) {
                entity = entity.replace(regex, replacement);
                break;  // Exit once a match is found
            }
        }
        return entity;
    });
    
    console.log("Refined Entities after phrase correction:", refinedEntities);

    console.log("Refined Entities:", refinedEntities);

    // Apply synonym map to normalize terms
    refinedEntities = refinedEntities.map(entity => synonymMap[entity] || entity);

    // Remove selected cuisine type and food type from the entities
    refinedEntities = refinedEntities.filter(entity => {
        return entity !== selectedCuisineType.toLowerCase() && entity !== selectedFoodType.toLowerCase();
    });

    // Function to prioritize the most important entities (e.g., 'chicken lo mein noodles')
    function selectBestEntities(entities) {
        const priorityList = ['chicken lo mein noodles', 'lo mein noodles', 'noodles'];
        const selectedEntities = [];

        const normalizedEntities = entities.map(entity => entity.toLowerCase().trim());

        for (let priority of priorityList) {
            const normalizedPriority = priority.toLowerCase().trim();
            const matchingEntity = normalizedEntities.find(entity => entity.includes(normalizedPriority));
            if (matchingEntity) {
                selectedEntities.push(matchingEntity);
                break;
            }
        }

        return selectedEntities.length > 0 ? selectedEntities : entities.slice(0, 2);
    }

    // Ensure the final entities make sense by filtering out invalid combinations
    refinedEntities = refinedEntities.filter(entity => {
        const invalidCombinations = ['protein quinoa', 'low pizza', 'high cake', 'fat salad'];
        return !invalidCombinations.some(invalid => entity.includes(invalid));
    });

    // Return the refined entities without duplicates
    return [...new Set(refinedEntities)];
}

// Include avoidIngredients in the Spoonacular API request
async function fetchSpoonacularRecipes(entities, avoidIngredients = [], cuisineType, foodType) {
    let queryString = entities.map(encodeURIComponent).join('%20');

    // Function to construct Spoonacular URL with the current API key
    function buildSpoonacularURL() {
        const apiKey = getCurrentAPIKey(); // Use the current API key
        let spoonacularURL = `https://api.spoonacular.com/recipes/complexSearch?query=${queryString}&apiKey=${apiKey}`;

        if (avoidIngredients.length > 0) {
            spoonacularURL += `&excludeIngredients=${avoidIngredients.join('%20')}`;
        }

        if (cuisineType && cuisineType !== 'any') {
            spoonacularURL += `&cuisine=${encodeURIComponent(cuisineType)}`;
        }

        if (foodType && foodType !== 'any') {
            spoonacularURL += `&diet=${encodeURIComponent(foodType)}`;
        }

        return spoonacularURL;
    }

    console.log("Query sent to Spoonacular with avoid ingredients and cuisine type:", spoonacularURL);

    let attempts = 0;
    let maxAttempts = spoonacularAPIKeys.length; // Limit the number of retries based on the number of keys

    while (attempts < maxAttempts) {
        try {
            const spoonacularURL = buildSpoonacularURL(); // Build the request URL
            console.log("Query URL:", spoonacularURL); // Log query URL here

            const response = await fetch(spoonacularURL);
            if (response.ok) {
                const data = await response.json();
                console.log("Spoonacular API response:", data); // Log full response for debugging
                return data.results;
            } else if (response.status === 402) { // 402 error indicates API key limit reached
                console.log(`API key limit reached. Switching to the next key.`);
                switchAPIKey();
                attempts++;
            } else {
                throw new Error(`Spoonacular API error! status: ${response.status}`);
            }
        } catch (error) {
            console.error('Error fetching recipes from Spoonacular:', error);
            if (attempts === maxAttempts - 1) {
                return []; // If all attempts fail, return an empty result
            }
            attempts++;
        }
    }
}

// Function to call Spoonacular API using entities (ingredients, nutrition, dish type, etc.)
async function callRecipeSearchAPI(entities, foodType, cuisineType, nutritionGoals, avoidIngredients, relaxSearch) {
    const url = 'https://a5yg50vs64.execute-api.ap-southeast-2.amazonaws.com/dev/recipe-generate';
    const body = {
        entities: entities,
        cuisineType: cuisineType !== 'any' ? cuisineType : 'any',
        foodType: foodType !== 'any' ? foodType : 'any',
        nutritionGoals: nutritionGoals,
        avoidIngredients: avoidIngredients,
        relaxSearch: relaxSearch // Pass relaxSearch flag here
    };

    console.log("Sending request to API Gateway (recipe-generate):", body);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        console.log("API Gateway (recipe-generate) response:", data);

        // Return the closest recipe
        if (data.recipes && data.recipes.length > 0) {
            return data.recipes[0];
        } else {
            console.error("No recipes found in the API response.");
            return null;
        }
    } catch (error) {
        console.error('Error calling recipe-generate API:', error);
        return null;
    }
}

// Form submit event listener
document.getElementById('recipeForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    console.log("Form submitted");

    // Retrieve user input for query, food type, cuisine type, and avoided ingredients
    const query = document.getElementById('freeText').value;
    const foodType = document.getElementById('foodType').value;
    const cuisineType = document.getElementById('cuisineType').value;

    // Capture avoided ingredients
    const avoidIngredients = Array.from(document.querySelectorAll('input[name="ingredients"]:checked'))
        .map(checkbox => checkbox.value);

    console.log("User-selected ingredients to avoid:", avoidIngredients); // Ensure it logs correctly

    // Capture relaxed search option
    const relaxSearch = document.getElementById('relaxSearch').checked;

    // Log avoid ingredients selected by the user
    console.log("Relax search option:", relaxSearch);

    // Find phrase matches first (predefined phrases)
    const phraseMatches = findPhrases(query);

    // Call Lambda function (NLP) to extract entities from the user's query
    const nlpResponse = await fetchRecipes(query, foodType, cuisineType);

    if (!nlpResponse || !Array.isArray(nlpResponse) || nlpResponse.length === 0) {
        console.error('Invalid NLP response:', nlpResponse);
        document.getElementById('recipeResults').innerHTML = '<p>No ingredients found. Try a different query.</p>';
        return;
    }

    let combinedEntities = [...phraseMatches, ...nlpResponse].map(e => e.toLowerCase());
    combinedEntities = refineEntities(combinedEntities, cuisineType, foodType); // Refine entities in `script.js` using the same logic

    // Get nutrition goals from query (e.g., 'high protein', 'low sodium')
    const nutritionGoals = extractNutritionGoals(query);

    console.log("Final entities and nutrition goals:", combinedEntities, nutritionGoals);

    // Call the Lambda API to fetch the closest recipe
    let closestRecipe = await callRecipeSearchAPI(combinedEntities, foodType, cuisineType, nutritionGoals, avoidIngredients, relaxSearch);

    // If no closest recipe is found and the user opted for relaxed search, retry with relaxed conditions
    if (!closestRecipe && relaxSearch) {
        console.log("No strict matches found. Trying relaxed search...");

        // Step 1: Try relaxing just the avoid ingredients
        closestRecipe = await callRecipeSearchAPI(combinedEntities, foodType, cuisineType, nutritionGoals, [], relaxSearch);

        // Step 2: If still no recipe, try relaxing cuisine type
        if (!closestRecipe) {
            console.log("No matches found after relaxing avoid ingredients. Relaxing cuisine type...");
            closestRecipe = await callRecipeSearchAPI(combinedEntities, foodType, 'any', nutritionGoals, [], relaxSearch);
        }

        // Step 3: If still no recipe, try relaxing both cuisine and food type
        if (!closestRecipe) {
            console.log("No matches found after relaxing cuisine type. Relaxing both cuisine and food type...");
            closestRecipe = await callRecipeSearchAPI(combinedEntities, 'any', 'any', nutritionGoals, [], relaxSearch);
        }
    }

    // If no recipe is found even after full relaxation, display a message
    if (!closestRecipe) {
        console.log("No matches found even after full relaxation.");
        document.getElementById('recipeResults').innerHTML = '<p>No recipes found, even with relaxed search. Try a different query.</p>';
    } else {
        // Display the closest recipe
        displayClosestRecipe(closestRecipe);
    }
});

// Function to extract nutrition goals like 'high protein', 'low fat'
function extractNutritionGoals(query) {
    const nutritionKeywords = ['high protein', 'low fat', 'low sodium', 'high fiber'];
    return nutritionKeywords.filter(goal => query.toLowerCase().includes(goal));
}

// Helper function to clean ingredient name (remove quantities, measurements, and unnecessary phrases)
function cleanIngredientName(ingredient) {
    const phrasesToRemove = [
        /\bcut into chunks\b/i, /\bcut into one[- ]inch chunks\b/i, /\bcut into matchsticks\b/i, /\bdivided\b/i,
        /\bcubed\b/i, /\bdiced\b/i, /\bsliced\b/i, /\bchopped\b/i, /\bwhole\b/i,
        /\blarge\b/i, /\bsmall\b/i, /\bmedium\b/i, /\bhalved\b/i, /\bquartered\b/i,
        /\bstalks\b/i, /\bcloves\b/i, /\btablespoons\b/i, /\bteaspoons\b/i, /\broughly shredded\b/i,
        /\bboneless skinless\b/i, /\bshredded\b/i, /\bminced\b/i, /\bthinly sliced\b/i, /\bfresh\b/i,
        /\bextra\b/i, /\badd to taste\b/i, /\ba dash of\b/i, /\bmore if you prefer\b/i, /\bto taste\b/i,
        /\bor\b/i, /\bpureed\b/i, /\bdried\b/i, /\bat home garlic is used to a minimum\b/i, /\bbarely a hint\b/i,
        /\bfine\b/i, /\bfinely\b/i, /\bstronger colour\b/i, /\bwe prefer\b/i, /\bdont really care\b/i, /\blittle white\b/i,
        /\band dont really care for the soy taste\b/i, /\bfully-cooked\b/i, /\bmay be omitted for a vegetarian version\b/i,
        /\bpeeled\b/i, /\brinsed\b/i, /\bcup\b/i, /\bcan\b/i, /\bplus\b/i, /\bfor garnish\b/i, /\band\b/i, /\bor\b/i
    ];

    // Remove quantities and units (e.g., g, ml, oz, tsp, etc.)
    const unitPattern = /\b\d+([\/\.\-]?\d+)?\s*(g|grams|kg|ml|l|liters|ounce|oz|cups?|tablespoons?|tbsp|teaspoons?|tsp|dash|pinch|bunch|clove|head|leaves|pieces|ounce-can)\b/gi;

    let cleanedIngredient = ingredient.toLowerCase();

    // Step 1: Remove unnecessary phrases
    phrasesToRemove.forEach(phrase => {
        cleanedIngredient = cleanedIngredient.replace(phrase, '').trim();
    });

    // Step 2: Remove quantities and units
    cleanedIngredient = cleanedIngredient.replace(unitPattern, '').trim();

    // Step 3: Remove any remaining non-letter characters except spaces
    cleanedIngredient = cleanedIngredient.replace(/[^a-z\s]/g, '').replace(/\s{2,}/g, ' ').trim();

    console.log(`Cleaned ingredient name: ${cleanedIngredient}`);
    return cleanedIngredient;
}

// Ingredient overrides for normalization
const ingredientOverrides = {
    'firm tofu': 'tofu',
    'red bell pepper': 'bell pepper',
    'pureed lemongrass': 'lemongrass',
    'dried chilies': 'chili',
    'peanut oil': 'oil',
    'demerara sugar': 'sugar',
    'sambal oelek': 'chili paste',
    'soy sauce': 'soy',
    'oyster sauce': 'oyster',
    'green chillis': 'green chili',
    'sesame oil': 'oil',
    'garlic': 'garlic', // No change
    'red pepper flakes': 'chili flakes',
    'white pepper powder': 'pepper',
    'spring onions': 'green onions',
    'chilli sauce': 'chili sauce',
    'olive oil': 'oil',
    'vegetable stock': 'stock',
    'plum tomatoes': 'tomatoes',
    'carrots': 'carrot',
    'yellow onion': 'onion',
    'celery stalks': 'celery',
    'chicken breast': 'chicken',
    'flat leaf italian parsley': 'parsley'
};

// Apply overrides before cleaning the ingredient
function applyIngredientOverride(ingredient) {
    const cleanedIngredient = cleanIngredientName(ingredient); // First clean the ingredient name
    return ingredientOverrides[cleanedIngredient] || cleanedIngredient; // Apply override if applicable
}

// Fetch and display substitutions for each ingredient
async function displayClosestRecipe(recipe) {
    const recipeResults = document.getElementById('recipeResults');
    recipeResults.innerHTML = ''; // Clear previous results

    // Check if recipe is defined
    if (!recipe) {
        recipeResults.innerHTML = '<p>No recipes found. Try a different query.</p>';
        return; // Stop execution if there's no recipe
    }

    // Use ingredients from nutrition if available, otherwise use a fallback
    const ingredients = recipe.nutrition && recipe.nutrition.ingredients ? recipe.nutrition.ingredients : [];

    // Log the entire recipe object for debugging
    console.log('Recipe object:', recipe);
    console.log('Ingredients:', ingredients);

    const stepsHTML = recipe.steps && recipe.steps.length > 0 ?
        recipe.steps.map(step => `<li>${step}</li>`).join('') :
        '<p>No steps provided.</p>';

    const ingredientsHTML = recipe.ingredients && recipe.ingredients.length > 0 ?
        recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('') :
        '<p>No ingredients provided.</p>';

    const nutritionHTML = recipe.nutrition && recipe.nutrition.nutrients && recipe.nutrition.nutrients.length > 0 ?
        recipe.nutrition.nutrients.map(n => `<li>${n.name}: ${n.amount} ${n.unit}</li>`).join('') :
        '<p>No nutritional information provided.</p>';

    const recipeHTML = `
        <div class="recipe-card">
             <style>
            .recipe-card {
                background-color: white; /* White background */
                border-radius: 8px; /* Rounded corners */
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Add shadow */
                padding: 20px;
                margin: 20px 0;
            }

            .recipe-header h2 {
                font-family: 'Arial', sans-serif; /* Change font */
                color: #333; /* Dark text color */
                font-size: 32px; /* Larger font size */
                font-weight: bold; /* Bold font */
                margin-bottom: 10px;
            }

            .recipe-header p {
                font-family: 'Arial', sans-serif;
                color: #666; /* Lighter text color */
                font-size: 16px;
            }

            .recipe-image img {
                width: 100%; /* Full-width image */
                border-radius: 8px; /* Rounded image corners */
                margin: 10px 0;
            }

            .flex {
                display: flex;
                justify-content: space-between;
                gap: 20px;
            }

            .flex-1 {
                flex: 1;
            }

            h3 {
                font-family: 'Arial', sans-serif;
                color: #333;
                font-size: 24px; /* Larger font size for h3 */
                font-weight: bold; /* Bold font */
                margin-top: 20px;
            }

            .nutrition-list {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
                list-style-type: none;
                padding: 0;
            }

            .nutrition-list li {
                flex-basis: calc(33.333% - 10px);
                margin-bottom: 10px;
                color: #333; /* Text color for nutrition */
            }

            #ingredient-list li, #substitutions-list li {
                color: #333; /* Text color for ingredients and substitutions */
            }

            ol {
                color: #333;
            }
        </style>
      
            <div class="recipe-header">
                <h2>${recipe.title}</h2>
                <p>${recipe.description || 'No description available.'}</p>
            </div>

            <div class="recipe-image">
                <img src="${recipe.image}" alt="${recipe.title}">
            </div>

            <div class="flex">
                <div class="flex-1">
                    <h3>Ingredients:</h3>
                    <ul id="ingredient-list">
                        ${ingredientsHTML}
                    </ul>
                </div>

                <div class="flex-1">
                    <h3>Steps:</h3>
                    <ol>${stepsHTML}</ol>
                </div>
            </div>

            <div class="flex justify-start mt-9">
                <div class="w-full">
                    <h3>Nutritional Information:</h3>
                    <ul class="nutrition-list">${nutritionHTML}</ul>
                </div>
            </div>

            <div class="flex justify-start mt-1">
                <div class="w-full">
                    <h3>Ingredient Substitutions:</h3>
                    <ul id="substitutions-list">
                        <!-- Substitutions will be added here -->
                    </ul>
                </div>
            </div>
        </div>
    `;

    recipeResults.innerHTML = recipeHTML;

    // Fetch and display substitutions for each ingredient
    const substitutionsList = document.getElementById('substitutions-list');
    document.getElementById('loadingIndicator').style.display = 'block'; // Show loading indicator

    let allSubstitutions = ''; // Collect all substitutions to display at once

    // Iterate through the ingredient names to fetch their substitutions
    for (let ingredient of ingredients) {
        const ingredientName = ingredient.name; // Ensure ingredient name is extracted properly
        if (ingredientName) {
            const { substitutes } = await fetchIngredientSubstitutions(ingredientName);

            if (substitutes.length > 0) {
                console.log(`Substitutes for ${ingredientName}: ${JSON.stringify(substitutes)}`);
                allSubstitutions += `
                <li><strong>${ingredientName}</strong>
                    <ul>
                        ${substitutes.map(sub => `<li>${sub}</li>`).join('')}
                    </ul>
                </li>
            `;
            } else {
                console.log(`No substitutes found for ${ingredientName}`);
                allSubstitutions += `<li><strong>${ingredientName}</strong>: No substitutions available.</li>`;
            }
        }
    }

    substitutionsList.innerHTML = allSubstitutions; // Display all substitutions
    document.getElementById('loadingIndicator').style.display = 'none'; // Hide loading indicator
}


// Find predefined phrases in the query (e.g., 'low sodium')
const PHRASE_MATCHES = ['low sodium', 'gluten free', 'spicy green curry', 'dairy free'];
function findPhrases(query) {
    return PHRASE_MATCHES.filter(phrase => query.toLowerCase().includes(phrase));
}

