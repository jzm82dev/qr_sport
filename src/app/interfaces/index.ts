export interface RespUser{
    exists: boolean;
    status: string;
    user: User;
}

export interface User {
    id: number;
    username: string;
    password: string;
    name: string;
    lastname_1: string;
    lastname_2: string;
    email: string;
    dni: string;
    role:string;
    telefono: string;
    active: number;
}


export interface Shop {
    id: number;
    name: string;
    direction: string;
    postal_code: number;
    info: string;
    city: string;
    province: string;
    active: number;
}

export interface respShop{
    status: string;
    shops: Shop[];
}

export interface shopByPage{
    page: number;
    shops: Shop[];
}