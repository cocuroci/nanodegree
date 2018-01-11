import React from 'react'
import './ColumnList.css'
import If from './If'
import * as TasksStatus from './TaskStatus'

const ColumnList = ({ columnTitle, insert, tasks, addTask, updateTask }) => {
	return (
		<div className="column-list">
			<h3>{columnTitle}</h3>
      <If test={insert}>
        <form onSubmit={(e) => {
          e.preventDefault();
          let input = e.target.querySelector('input')
          addTask(input.value) 
          input.value = ""
        }}>
          <input type="text" name="todo" placeolder="Create new task" />
          <button type="submit">
            Add task
          </button>
        </form>
      </If>
			<ul className="list-items">
        {tasks.map(task => (
          <li key={task.id}>
            <input
              type="checkbox"
              onChange={(e) => {
                task.status = e.target.checked ? TasksStatus.DONE : TasksStatus.TO_DO
                updateTask(task)
              }}
              checked={task.status === TasksStatus.DONE} />
            <span>{task.description}</span>
          </li>
        ))}
			</ul>
		</div>
	)
}

export default ColumnList