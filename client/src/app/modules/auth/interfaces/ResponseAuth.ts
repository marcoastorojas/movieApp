export interface ResponseAuth {
    ok:    boolean;
    data:  UserDb;
    token: string;
}

export interface UserDb {
    id:          string;
    countActive: boolean;
    email:       string;
    password:    string;
    name?:        string;
    image?:       string;
}
