function ratingCalculator(farmers){
    var sum = 0.0, numberOfFarmers = farmers.length
    farmers.map(farmer => sum += Number(farmer.rating))
    const avgRating = sum / numberOfFarmers
    return avgRating
}

export default ratingCalculator