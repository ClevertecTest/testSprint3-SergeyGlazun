export type BooksType = {
    bookList: {
        isLoading: boolean;
        isSuccess: boolean;
        isError: boolean;
        data: null | BookListDataType;
    };
    book: {
        isLoading: boolean;
        isSuccess: boolean;
        isError: boolean;
        data: null | BookDataType;
    };
    bookCategories: {
        isLoading: boolean;
        isSuccess: boolean;
        isError: boolean;
        data: null | BookCategoriesDataType;
    };
};

export type BookListItem = {
    issueYear: string;
    rating: number;
    title: string;
    authors: string[];
    image: {
        url: string;
    };
    categories: string[];
    id: number;
    booking: {
        id: number;
        order: boolean;
        dateOrder: string;
        customerId: number;
    };
    delivery: {
        id: number;
        handed: boolean;
        dateHandedFrom: string;
        dateHandedTo: string;
        recipientId: number;
    };
    histories: [
        {
            id: number;
            userId: number;
        },
    ];
};

export type BookListDataType = BookListItem[];

export type BookDataType = {
    id: number;
    title: string;
    rating: number;
    issueYear: string;
    description: string;
    publish: string;
    pages: string;
    cover: string;
    weight: string;
    format: string;
    ISBN: string;
    producer: string;
    authors: string[];
    images: [
        {
            url: string;
        },
    ];
    categories: string[];
    comments: [
        {
            id: number;
            rating: number;
            text: string;
            createdAt: string;
            user: {
                commentUserId: number;
                firstName: string;
                lastName: string;
                avatarUrl: string;
            };
        },
    ];
    booking: {
        id: number;
        order: boolean;
        dateOrder: string;
        customerId: number;
    };
    delivery: {
        id: number;
        handed: boolean;
        dateHandedFrom: string;
        dateHandedTo: string;
        recipientId: number;
    };
    histories: [
        {
            id: number;
            userId: number;
        },
    ];
};

export type BookCategoriesItem = {
    name: string;
    path: string;
    id: number;
};

export type BookCategoriesDataType = BookCategoriesItem[];
