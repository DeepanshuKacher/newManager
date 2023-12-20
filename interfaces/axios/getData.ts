type Table = {
    name: string;
    endNumber: number;
    id: string;
    prefix: string;
    startNumber: number;
    suffix: string;
};

type Price = {
    half: number;
    full: number;
};

type Dish = {
    id: string;
    name: string;
    description: string;
    imageUrl: string | null;
    addOns: any[]; // You might want to replace `any[]` with a specific type for add-ons
    price: {
        large: Price;
        medium: Price;
        small: Price;
    };
    dishCode: string | null;
    available: boolean;
    dishSectionId: string;
    restaurantId: string;
};

type Waiter = {
    id: string;
    name: string;
    MobileNumber: number;
    passportPhoto: string | null;
    verified: boolean;
    available: boolean;
};

type RestaurantDetails = {
    name: string;
    city: string;
    id: string;
    tables: Table[];
    dishesh: Dish[];
};

type RestaurantData = {
    restaurantDetails: RestaurantDetails;
    settings: any; // Replace `any` with a specific type if available
    waiters: Waiter[];
    chefs: any[]; // Replace `any[]` with a specific type if available
    selfInfo: {
        id: string;
    };
};

export type { RestaurantData }