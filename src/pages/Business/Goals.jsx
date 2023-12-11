import React from 'react'
import Goals from '../../components/common/Goals'
import GoalForm from '../../components/goals/GoalForm'
import { useSelector } from 'react-redux'
function Goals() {
    const { user } = useSelector((state) => state.auth)

return (
    <div>
            <section className='content'>
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
        <GoalForm />
    </section>

    <Goals />
    </div>
)
}

export default Goals