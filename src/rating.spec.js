import ratingCalculator from "./components/Rating"

describe('ratingCalculator', () => {
    it('calculates avg rating', () => {
        const input = [{name : "", email : "", address : "", rating : "6.7"},
        {name : "", email : "", address : "", rating : "5.4"},
        {name : "", email : "", address : "", rating : "2.6"},
        {name : "", email : "", address : "", rating : "1.2"},
        {name : "", email : "", address : "", rating : "8.9"}]
        // const input = [6.7, 5.4, 2.6, 1.2, 8.9]
        expect(ratingCalculator(input)).toEqual(4.96)
    })
})