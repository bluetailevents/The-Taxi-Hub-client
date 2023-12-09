// components/common/Goals.js

import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import GoalItem from '../goals/GoalItem'
import { getGoals, reset } from '../../features/goals/goalSlice'
import Spinner from '../../components/common/Spinner'
function Goals() {
const dispatch = useDispatch()
const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
)

useEffect(() => {
    if (isError) {
    console.log(message)
    }

    dispatch(getGoals())

    return () => {
    dispatch(reset())
    }
}, [isError, message, dispatch])

if (isLoading) {
    return <Spinner />
}

return (
    <section className='sidebar'>
    <h2>Goals</h2>
    {goals.length > 0 ? (
        <div className='goals'>
        {goals.map((goal) => (
            <GoalItem key={goal._id} goal={goal} />
        ))}
        </div>
    ) : (
        <h3>You have not set any goals</h3>
    )}
    </section>
)
}

export default Goals
