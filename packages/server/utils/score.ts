/**
 * AayWorks - Reimagining the way India works!
 * Utils       :  Reputation Score Calculator
 * Author      :  Ankur Daharwal
 * Filename    :  score.ts
 * Reference   :  [https://aayworks.slite.com/api/s/note/4Tof2pcQ8mdhvShfoAtCZt/Reputation-Model]
 */

/**
 * Max Score = 100
 * Min Score = 0
 * @param name Reputation Score field name
 */

const checkScoreWeight = (name: string) => {
  switch (name) {
    case "punctuality":
      return 6;
    case "profile":
      return 5;
    case "userRating":
      return 4;
    case "responsiveness":
      return 3;
    case "social":
      return 2;
    case "default":
      return -3;
    case "cancellation":
      return -1;
    default:
      return 0;
  }
};

// WIP TODO: Cumulative score calculations based on relative trend

export const calculateReputationScore = (
  scores: Array<{ name: string; value: number }>
) => {
  var finalScore = 0;
  return scores.forEach((score) => {
    finalScore += checkScoreWeight(score.name) * score.value; // 0 | 1 | 2 | 3 | 4 | 5
    return finalScore;
  });
};
