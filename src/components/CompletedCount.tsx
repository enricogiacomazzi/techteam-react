import React, { useMemo } from 'react';
import { useQuery } from 'react-query';
import { getTodos } from '../api';
import { TodoItem } from '../models/TodoItem.model';

// interface CompletedCountProps {
//     list?: Array<TodoItem>
// }


export const CompletedCount: React.FC = () => {

    const {data: list} = useQuery(['list'], async () => await getTodos());

    let completedCount = useMemo(() => {
        return (list ?? []).filter(x => x.completed).length;
      }, [list]);

    return <h3>{completedCount} elementi</h3>;
}