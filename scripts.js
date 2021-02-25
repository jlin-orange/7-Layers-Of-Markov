// Constants
TRANSITION_MATRIX = {
    // Base Ingredients
    "RB": {"RB": 0.0, "SC": 0.35, "SS": 0.075, "GC": 0.075, "SM": 0.35, "HM": 0.075, "PY": 0.075}, 
    "SC": {"RB": 0.025, "SC": 0.0, "SS": 0.025, "GC": 0.65, "SM": 0.25, "HM": 0.025, "PY": 0.025},
    "SS": {"RB": 0.17, "SC": 0.17, "SS": 0.0, "GC": 0.17, "SM": 0.17, "HM": 0.16, "PY": 0.16},
    "GC": {"RB": 0.06, "SC": 0.06, "SS": 0.7, "GC": 0.0, "SM": 0.06, "HM": 0.06, "PY": 0.06},
    "SM": {"RB": 0.025, "SC": 0.25, "SS": 0.025, "GC": 0.65, "SM": 0.0, "HM": 0.025, "PY": 0.025},
    "HM": {"RB": 0.16, "SC": 0.16, "SS": 0.16, "GC": 0.16, "SM": 0.16, "HM": 0.0, "PY": 0.2},
    "PY": {"RB": 0.16, "SC": 0.16, "SS": 0.16, "GC": 0.16, "SM": 0.16, "HM": 0.2, "PY": 0.0},
    
    // Garnishes
    "OL": {"OL": 0.0, "GO": 0.17, "JP": 0.17, "TM": 0.17, "CH": 0.17, "CL": 0.16, "DP": 0.16}, 
    "GO": {"OL": 0.16, "GO": 0.0, "JP": 0.17, "TM": 0.17, "CH": 0.17, "CL": 0.17, "DP": 0.16},
    "JP": {"OL": 0.16, "GO": 0.16, "JP": 0.0, "TM": 0.17, "CH": 0.17, "CL": 0.17, "DP": 0.17},
    "TM": {"OL": 0.17, "GO": 0.16, "JP": 0.16, "TM": 0.0, "CH": 0.17, "CL": 0.17, "DP": 0.17},
    "CH": {"OL": 0.17, "GO": 0.17, "JP": 0.16, "TM": 0.16, "CH": 0.0, "CL": 0.17, "DP": 0.17},
    "CL": {"OL": 0.17, "GO": 0.17, "JP": 0.17, "TM": 0.16, "CH": 0.16, "CL": 0.0, "DP": 0.17},
    "DP": {"OL": 0.17, "GO": 0.17, "JP": 0.17, "TM": 0.17, "CH": 0.16, "CL": 0.16, "DP": 0.0}
};

NUM_BASE_INGREDIENTS = 4;
NUM_GARNISHES = 3;

STARTER_BASE = "RB";
STARTER_GARNISH = "CH";

// Wrapper function
function main() {
    generate_dip(TRANSITION_MATRIX, STARTER_BASE, STARTER_GARNISH);
}

function generate_dip(transition_probs, first_base, first_garnish) {
    // TODO: clear current dip images
    // clear_display();

    dip_arr = [];

    prev_layer = first_base // local var to store the previous layer of dip, also sets a default layer
    // Generate base ingredients first
    for (i = 0; i < NUM_BASE_INGREDIENTS; i++) {
        dip_arr.push(prev_layer);
        prev_layer = get_ingredient(transition_probs, prev_layer);
    }

    // Generate garnishes second 
    prev_layer = first_garnish;
    for (i = 0; i < NUM_GARNISHES; i++) {
        dip_arr.push(prev_layer);
        prev_layer = get_ingredient(transition_probs, prev_layer)
    }

    display_dip(dip_arr);
}

// insert pictures according to what's in the dip array
// depending on what index i is: insert photo in the corresponding DIV
function display_dip(layer_arr) {
    for (i = 0; i < layer_arr.length; i++) { 
        var new_img = document.createElement("img");
        new_img.src = `imgs/${layer_arr[i]}.jpg`;

        var dip_layer = document.getElementById(`layer_${i+1}`);
        
        if (dip_layer.childElementCount > 0) {dip_layer.removeChild(dip_layer.firstElementChild);} // clears out old pictures!
        dip_layer.appendChild(new_img);
    }
}

// return a new ingredient according to transition probabilities
function get_ingredient(transition_probs, prev_ingredient) {
    return weighted_random(Object.keys(transition_probs[prev_ingredient]), Object.values(transition_probs[prev_ingredient]));
}

// src: https://stackoverflow.com/questions/43566019/how-to-choose-a-weighted-random-array-element-in-javascript
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



