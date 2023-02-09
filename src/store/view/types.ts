export type ToastType = {
    type: 'warning' | 'normal';
    text: string;
};

export type ViewType = {
    toasts: ToastType[];
};
