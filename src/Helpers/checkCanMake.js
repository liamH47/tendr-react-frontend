function checkCanMake(singleCockt, userIngApi) {
    let cocktail = singleCockt.cocktail_ingredients
    return cocktail.every(function(ing) {
     return userIngApi.some(function(ing2) {
       console.log(ing.name, ing2.name)
       console.log(ing.quantity, ing2.quantity)
        return (ing.name == ing2.name) && (ing.quantity <= ing2.quantity) 
      })
    })
}

export { checkCanMake }