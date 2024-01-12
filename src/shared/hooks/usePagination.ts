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

    // const [page, setPage] = useState(1);
    // const [totalPages, setTotalPages] = useState(0);
    // const [count, setCount] = useState(0);

    const handlePages = (updatePage: number) => {
        setPagination({...pagination, _start: updatePage});
        // setPage(updatePage);
    };

    const changeFilterHandler = _debounce((name: string, value: string | null | number | boolean) => {
        setPagination((prev: IPagination) => ({...prev, _start: 1, [name]: value}));
    }, 300);
    return {
        pagination,
        // totalPages,
        // setTotalPages,
        setPagination,
        handlePages,
        changeFilterHandler,
        // count,
        // setCount,
    };
};