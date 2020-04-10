import React from 'react'



const Part = ({ name, exercises }) => (
    <p>
        {name} {exercises}
    </p>
)

const Header = ({ course }) => (
    <h1>{course}</h1>
)

const Content = ({ parts }) => (
    <div>
        {
            parts.map((part, i) => <Part key={i} name={part.name} exercises={part.exercises} />
            )}
    </div>
)

const Course = ({ course }) => {
    return (
        <>
            <Header course={course.name} />
            <Content parts={course.parts} />
        </>
    )
}

export default Course