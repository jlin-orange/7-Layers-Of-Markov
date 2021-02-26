// Constants
NUM_BASE_INGREDIENTS = 4;
NUM_GARNISHES = 3;

STARTER_BASE = "RB";
STARTER_GARNISH = "CH";

TRANSITION_MATRIX = {
    // All Base Ingredients
    "RB": {"RB": 0.0, "SC": 0.35, "SS": 0.075, "GC": 0.075, "SM": 0.35, "HM": 0.075, "PY": 0.075}, 
    "SC": {"RB": 0.025, "SC": 0.0, "SS": 0.025, "GC": 0.65, "SM": 0.25, "HM": 0.025, "PY": 0.025},
    "SS": {"RB": 0.17, "SC": 0.17, "SS": 0.0, "GC": 0.17, "SM": 0.17, "HM": 0.16, "PY": 0.16},
    "GC": {"RB": 0.06, "SC": 0.06, "SS": 0.7, "GC": 0.0, "SM": 0.06, "HM": 0.06, "PY": 0.06},
    "SM": {"RB": 0.025, "SC": 0.25, "SS": 0.025, "GC": 0.65, "SM": 0.0, "HM": 0.025, "PY": 0.025},
    "HM": {"RB": 0.16, "SC": 0.16, "SS": 0.16, "GC": 0.16, "SM": 0.16, "HM": 0.0, "PY": 0.2},
    "PY": {"RB": 0.16, "SC": 0.16, "SS": 0.16, "GC": 0.16, "SM": 0.16, "HM": 0.2, "PY": 0.0},
    
    // All Garnishes
    "OL": {"OL": 0.0, "GO": 0.17, "JP": 0.17, "TM": 0.17, "CH": 0.17, "CL": 0.16, "DP": 0.16}, 
    "GO": {"OL": 0.16, "GO": 0.0, "JP": 0.17, "TM": 0.17, "CH": 0.17, "CL": 0.17, "DP": 0.16},
    "JP": {"OL": 0.16, "GO": 0.16, "JP": 0.0, "TM": 0.17, "CH": 0.17, "CL": 0.17, "DP": 0.17},
    "TM": {"OL": 0.17, "GO": 0.16, "JP": 0.16, "TM": 0.0, "CH": 0.17, "CL": 0.17, "DP": 0.17},
    "CH": {"OL": 0.17, "GO": 0.17, "JP": 0.16, "TM": 0.16, "CH": 0.0, "CL": 0.17, "DP": 0.17},
    "CL": {"OL": 0.17, "GO": 0.17, "JP": 0.17, "TM": 0.16, "CH": 0.16, "CL": 0.0, "DP": 0.17},
    "DP": {"OL": 0.17, "GO": 0.17, "JP": 0.17, "TM": 0.17, "CH": 0.16, "CL": 0.16, "DP": 0.0}
};


// Wrapper function to run generate_dip() whenever the HTML button is clicked
function main() {
    dip_arr = [];
    dip_arr = generate_dip_array(TRANSITION_MATRIX, STARTER_BASE, STARTER_GARNISH);
    display_array_content(dip_arr);
}

/**
 * Populates an array with strings representing each layer of a 7-layer dip
 * @param {Object} transition_probs The Markov transition matrix
 * @param {String} first_base The first base ingredient to be added
 * @param {String} first_garnish The first garnish to be added
 * @return {Array} layer_arr The array populated with all necessary contents
 */
function generate_dip_array(transition_probs, first_base, first_garnish) {
    layer_arr = [];

    // Tracks the most recent dip layer
    prev_layer = first_base

    // Generate base ingredients first
    for (i = 0; i < NUM_BASE_INGREDIENTS; i++) {
        layer_arr.push(prev_layer);
        prev_layer = get_ingredient(transition_probs, prev_layer);
    }

    // Generate garnishes second 
    prev_layer = first_garnish;
    for (i = 0; i < NUM_GARNISHES; i++) {
        layer_arr.push(prev_layer);
        prev_layer = get_ingredient(transition_probs, prev_layer)
    }

    return layer_arr;
}


/**
 * Display contents of an array as images
 * @param {Array} target_arr The array with content of interest
 */
function display_array_content(target_arr) {
    for (i = 0; i < target_arr.length; i++) { 
        var new_img = document.createElement("img");
        new_img.src = `imgs/${target_arr[i]}.jpg`;
        new_img.alt = "HTML5";
        new_img.style = "width:150px;height:50px";

        var target_element = document.getElementById(`layer_${i+1}`);
        
        // Remove old elements as to avoid stacking past images
        if (target_element.childElementCount > 0) {target_element.removeChild(target_element.firstElementChild);} 
        
        target_element.appendChild(new_img);
    }
}

/**
 * Given an ingredient, gets a new ingredient according to predefined transition probabilities
 * @param {Object} transition_probs the Markov transition matrix
 * @param {String} prev_ingredient the previous ingredient selected
 * @return {String} the new ingredient
 */
function get_ingredient(transition_probs, prev_ingredient) {
    return weighted_random(Object.keys(transition_probs[prev_ingredient]), Object.values(transition_probs[prev_ingredient]));
}

/**
 * Chooses an item from an array given weights 
 * @param {Array} items Items to be chosen among 
 * @param {Array} weights Probabilities for an item to be selected  
 * @return {*} An item from the items array 
 * Code taken from: https://stackoverflow.com/questions/43566019/how-to-choose-a-weighted-random-array-element-in-javascript
 */
function weighted_random(items, weights) {
    var i;

    for (i = 0; i < weights.length; i++)
        weights[i] += weights[i - 1] || 0;
    
    var random = Math.random() * weights[weights.length - 1];
    
    for (i = 0; i < weights.length; i++)
        if (weights[i] > random)
            break;
    
    return items[i];
}



