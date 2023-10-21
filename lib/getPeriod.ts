import {AllCategoryLabel} from "@/types";

export const getPeriod = (habitRepetitionType:AllCategoryLabel, isMulti: boolean) =>{
    switch (habitRepetitionType){
        case "daily":
            return isMulti ? "days" : "day"
        case "weekly":
            return isMulti ? "weeks" : "week"
        case "monthly":
            return isMulti ? "months" : "month"
        case "specific days":
            return isMulti ? "days" : "day"
    }
}