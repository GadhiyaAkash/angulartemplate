export class User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    token: string;
    user: {
        full_name: string,
        email: string,
        phone_number: string,
        avatar: string
    };
}
