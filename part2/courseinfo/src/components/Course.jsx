const Header = ({course}) => {return <h1> {course} </h1>}

const Part = ({name, exercises}) => {return <p> {name} {exercises} </p>}

const Total = ({parts}) => {
  const sum = parts.reduce((acc, it) => acc + it.exercises, 0)
  return <p style={{fontWeight: "bold"}}> Number of exercises {sum} </p>
}

const Content = ({parts}) => {
  return (
    <div>
      {parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises}/>)}
      <Total parts={parts} />
    </div>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
    </div>
  )
}

export default Course