export interface IRoute {
    path: string;
    id: number;
    element: JSX.Element;
    name?: string;
    isShownInHeader?: boolean;
}