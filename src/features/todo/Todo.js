import React, { useCallback, useRef } from 'react';
import {
  useAddTodoMutation,
  useDeleteTodoMutation,
  useGetAllQuery,
  useUpdateTodoMutation,
} from './todoSliceApi';
import './Todo.css';

export function TodoApp() {
  const { data: todos, isLoading } = useGetAllQuery();
  const [deleteTodo] = useDeleteTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [addTodo] = useAddTodoMutation();

  const textRef = useRef(null);
  const onAdd = useCallback(() => {
    addTodo(textRef.current?.value || '');
    textRef.current.value = '';
  }, [addTodo]);

  const onToggle = useCallback(
    (todo) => updateTodo({ ...todo, done: !todo.done }),
    [updateTodo]
  );

  const onDelete = useCallback((todo) => deleteTodo(todo), [deleteTodo]);
  if (isLoading) {
    return 'loading...';
  }
  return (
    <div className="App">
      <div className="todos">
        {todos?.map((todo) => (
          <React.Fragment key={todo.id}>
            <div>
              <input
                type="checkbox"
                checked={todo.done}
                onChange={() => onToggle(todo)}
              />
              <span>{todo.text}</span>
            </div>
            <button onClick={() => onDelete(todo)}>Delete</button>
          </React.Fragment>
        ))}
      </div>
      <div className="add">
        <input type="text" ref={textRef} />
        <button onClick={onAdd}>Add</button>
      </div>
    </div>
  );
}
