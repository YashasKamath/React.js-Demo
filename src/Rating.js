function ratingCalculator(farmers){
    var sum = 0.0, numberOfFarmers = farmers.length
    farmers.map(farmer => sum += Number(farmer.rating))
    const avgRating = numberOfFarmers ? sum / numberOfFarmers : 0.0
    return avgRating
}

export default ratingCalculator