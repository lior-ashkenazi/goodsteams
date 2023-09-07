export const renderRatingTypography = (averageRating: number) => {
  if (averageRating === 0) {
    return "No rating";
  } else if (0 < averageRating && averageRating <= 1) {
    return "Overwhelmingly Negative";
  } else if (1 < averageRating && averageRating <= 2) {
    return "Mostly Negative";
  } else if (2 < averageRating && averageRating <= 3) {
    return "Mixed";
  } else if (3 < averageRating && averageRating <= 4) {
    return "Mostly Positive";
  } else if (4 < averageRating && averageRating <= 5) {
    return "Overwhelmingly Positive";
  }
};
