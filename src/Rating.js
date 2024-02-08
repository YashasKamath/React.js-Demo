function ratingCalculator(farmers){
    var sum = 0.0, numberOfFarmers = farmers.length
    farmers.map(farmer => sum += Number(farmer.rating))
    let avgRating = numberOfFarmers ? sum / numberOfFarmers : 0.0
    avgRating = Math.round(avgRating * 100) / 100
    return avgRating
}

export default ratingCalculator