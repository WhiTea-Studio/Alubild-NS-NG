export interface User{
    id: number,
    name?: string,
    surname?: string,
    email?: string,
    phoneNumber?: string,
    registrationDate?: Date,
    lastLogin?: Date,
    orders: Array<any>,
    userLogs: Array<any>
}
