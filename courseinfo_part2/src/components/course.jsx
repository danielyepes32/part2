const Course = (props) =>{
    console.log(props)
    return(
      <div>
        {props.course.map(course => 
        <div key = {course.id}>
            <Header course={course} />
            <Content parts = {course.parts}/>
            <Total parts = {course.parts} />
          </div>
          )}
      </div>
      )
  }
  
  const Header = (props) => {
    console.log("Header: " ,props)
    return (
      <div>
        <h1>
          You are on the course {props.course.name}
        </h1>   
      </div>
    )
  }
  
  const Content = (props) => {
    console.log("Content: " ,props)
    return (
      <div>
          {props.parts.map(part => 
            <Part key={part.id} parts={part}/>
          )}
      </div>
    )
  }
  
  const Part = (props) => {
    console.log("Part: " ,props)
    return (
      <div>
        <p key={props.parts.id}>
          Part: {props.parts.name}
          <br/>
          Completed Exercises: {props.parts.exercises}
        </p>
      </div>
    )
  }
  
  const Total = (props) => {
    console.log("Total: " ,props)
    const totalExercises = props.parts.reduce((acumulador, part) => acumulador + part.exercises, 0);
  
    return (
      <div>
        <h2>
          Your Total is {totalExercises}
        </h2>   
      </div>
    )
  }

  export default Course