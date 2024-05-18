import { AlertType } from "../enum/alert-type"

export class Alert {
    text!: string
    type!: AlertType

    constructor(text: any,type = AlertType.SUCCESS){
        this.text = text
        this.type = type
    }
}
