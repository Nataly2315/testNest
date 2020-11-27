import {ValidatorConstraint, ValidatorConstraintInterface} from "class-validator";

@ValidatorConstraint()
export class IsMinDateToday implements ValidatorConstraintInterface {

    validate(date: string): Promise<boolean> | boolean {
        return (new Date(date) >= new Date())
    }

}