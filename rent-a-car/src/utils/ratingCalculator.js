export default function ratingCalculator(ratings) {
    let sum = 0;
    ratings.map(element => {
        sum += element
    });
    const averageRating = sum / ratings.length;
    
    return averageRating;
}