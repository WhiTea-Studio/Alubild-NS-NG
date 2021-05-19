export class UserModel {
    //verovatno ce se obrisati kasnije cela ova klasa,  za sada cu je ostaviti
    constructor(public email: string, public id: number, private _token: string) {}

    get isAuth(){
        return !!this.token; //false ako je null, true ako nije
    }
    get token(){
        if(!this._token){
            return null;
        }
        return this._token;
    }
}
