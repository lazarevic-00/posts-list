import React, {createContext, useContext, ReactNode} from 'react';
import {usePagination} from '../../shared/hooks/usePagination';
import {IPagination} from '../../shared/model/Pagination';

interface PaginationContextProps {
    pagination: IPagination;
    changeFilterHandler: (key: string, value: any) => void;
}

const PaginationContext = createContext<PaginationContextProps | undefined>(undefined);

export const PostPaginationProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const {pagination, changeFilterHandler} = usePagination({_limit: 20});

    return (
        <PaginationContext.Provider value={{pagination, changeFilterHandler}}>
            {children}
        </PaginationContext.Provider>
    );
};

export const usePostPaginationContext = () => {
    const context = useContext(PaginationContext);
    if (!context) {
        throw new Error('usePostPaginationContext must be used within a PaginationProvider');
    }
    return context;
};
