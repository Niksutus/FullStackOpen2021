const Header = ({ course }) => {
  console.log(course)
  return <h1>{course.name}</h1>;
};

const Total = ({ course }) => {
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const exericesArray = course.parts.map((part) => part.exercises);
  console.log(exericesArray);
  const sum = exericesArray.reduce(reducer);

  return (
    <p>
      <b>total of {sum} exercises</b>
    </p>
  );
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  );
};

const Course = ({ courses }) => {
    
  return (
    <>
      {courses.map((course) => (
        <Header key={course.id} course={course}/>
      ))}
      {courses.map((course) => (
        <Content key={course.id} course={course}/>
      ))}
      {courses.map((course) => (
        <Total key={course.id} course={course}/>
      ))}
    </>
  );
};

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <Course courses={courses} />
    </div>
  );
};

export default App;
