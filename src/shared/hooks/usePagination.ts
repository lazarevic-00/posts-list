import _debounce from 'lodash/debounce';
import {useState} from 'react';
import {IPagination} from '../model/Pagination';


interface IProps {
    _limit?: number;
    restOfKeys?: Record<string, string | number | boolean>;
}

export const usePagination = ({_limit = 10, restOfKeys}: IProps) => {
    const [pagination, setPagination] = useState<IPagination>({
        _start: 1,
        _limit,
        ...restOfKeys,
    });

    const handlePages = (updatePage: number) => {
        setPagination({...pagination, _start: updatePage});
    };

    const changeFilterHandler = _debounce((name: string, value: string | null | number | boolean) => {
        setPagination((prev: IPagination) => ({...prev, _start: 1, [name]: value}));
    }, 300);

    return {
        pagination,
        setPagination,
        handlePages,
        changeFilterHandler,
    };
};