
//multiply user's daily points by multiplier(%) and add strike to it. floor the outcome

type Props = {multiplier: number, todaysPoints:number, globalStrike:number}
export const calculatePointsWithMultiplier = ({multiplier, todaysPoints, globalStrike}:Props) =>{
 return Math.floor(todaysPoints*(multiplier/100) + globalStrike)
}
