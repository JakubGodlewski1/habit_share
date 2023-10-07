//how to calculate points
//user gets 10 points for completing a habit + amount of strikes
//e.g. user has completed 7 days of strike of one habit. during 8th day, they complete the habit, so they get 10 points + 8 points = 18

export const calculateDailyPointsToAdd = (strike:number, points:number):number => {
    return points + 10 + strike
}

export const calculateDailyPointsToRemove = (strike:number, points:number):number => {
    return points - 10 - strike
}