function Tasks({ tasks }) {
    return (
      <div>
        <h2>Tasks</h2>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>{task.title}</li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default Tasks;
  