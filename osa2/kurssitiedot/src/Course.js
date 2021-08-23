const Header = ({ course }) => {

    return <h2>{course.name}</h2>;
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
  
const Part = ({ part }) => {
    return (
      <p>
        {part.name} {part.exercises}
      </p>
    );
 };
  
const Total = ({ course }) => {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const exericesArray = course.parts.map((part) => part.exercises);
    const sum = exericesArray.reduce(reducer);
    
    return (
      <p>
        <b>total of {sum} exercises</b>
      </p>
    );
};
  
  
const Course = ({ course }) => {
      
    return (
      <>
          <Header course={course}/>
  
          <Content course={course}/>
          
          <Total course={course}/>
      </>
    );
};

export default Course;