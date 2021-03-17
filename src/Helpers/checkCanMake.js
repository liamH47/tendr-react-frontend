/*
arguments are:
1. an individual cocktail with an array of ingredients that can be accessed by calling .cocktail_ingredients
2. an array of ingredients that the user currently has
*/ 

function checkCanMake(singleCockt, userIngApi) {
    let cocktail = singleCockt.cocktail_ingredients
    return cocktail.every(function(ing) {
     return userIngApi.some(function(ing2) {
        return (ing.name === ing2.name) && (ing.quantity <= ing2.quantity) 
      })
    })
}

export { checkCanMake }