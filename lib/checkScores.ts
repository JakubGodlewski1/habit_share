//set up for correction
// export const checkScores = ({user, lastUpdateDate}:{user:UserInitialData, lastUpdateDate:string}) => {
//     const updatedUser = cloneDeep(user)
//
//     updatedUser.habits.forEach((habit)=>{
//         let {repetitionDates, daysWhenCompleted, score, strike} = habit
//
// //////////////Check if the habit was to be done during last update and deal with it accordingly
//
//         //Check if the habit was to be done during last update, If yes, check if it was completed.
//         const wasToBeDoneDuringLastUpdate = repetitionDates.includes(lastUpdateDate)
//         const hasBeenCompletedDuringLastUpdate = daysWhenCompleted.includes(lastUpdateDate)
//         //if it was not completed, calculate how many points user should lose and subtract the points from the habit (from a top variable)
//         if (wasToBeDoneDuringLastUpdate && !hasBeenCompletedDuringLastUpdate){
//             const lostPoints = strike + 10
//             score = score >= lostPoints ? score : 0
//         }
//         //Reset the habit strike and the main strike.
//         strike = 0
//         updatedUser.strike = 0
//
// //////////////– calculate how many dates is between the last update( excluded) and today (excluded) and subtract proper amount of user’s points.
//         //1.	Get the first date after the last update
//         const firstDayAfterLastUpdate = repetitionDates.find((repDate)=>isAfter(new Date(repDate), new Date(lastUpdateDate)))
//         //2.	Get index of this date
//         const firstDayAfterLastUpdateIndex = repetitionDates.indexOf(firstDayAfterLastUpdate!)
//
//         // 3.	Get the first date before today’s date and check if it exists, if not, return, if yes, get index of this date
//         const isTodayIncluded  = repetitionDates.includes(convertDate(new Date()))
//         let firstDayBeforeTodayIndex = 0;
//         if (isTodayIncluded){
//             firstDayBeforeTodayIndex = repetitionDates.indexOf(convertDate(new Date()))-1
//         }else{
//             const firstDateAfterToday = repetitionDates.find(repDate=> isAfter(new Date(repDate), new Date()))
//             if (firstDateAfterToday){
//                 firstDayBeforeTodayIndex = repetitionDates.indexOf(firstDateAfterToday)-1
//             }else return
//         }
//         // 5. Subtract higher index from lower index and subtract 1 from it (you will get the number of elements between these 2 indexes.)
//         // if the number is smaller than 1, return
//         const nrOfDaysBetweenDates = firstDayBeforeTodayIndex - firstDayAfterLastUpdateIndex -1
//         if (nrOfDaysBetweenDates<1)return;
//
//         // 6. Multiply the number x10 and subtract the number from user’s points.
//         score = score >=nrOfDaysBetweenDates*10 ? score - nrOfDaysBetweenDates*10 : 0
//     })
//
//     return updatedUser
// }
