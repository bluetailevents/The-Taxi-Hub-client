// Dashboard.js

import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Spinner from '../../components/common/Spinner'
import Goals from '../../components/common/Goals'
import GoalForm from '../../components/goals/GoalForm'

function Dashboard() {
  const navigate = useNavigate()
  const { user, isLoading } = useSelector((state) => state.auth)

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className="dashboard">
      <section className='content'>
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
        <GoalForm />
      </section>

      <Goals />
    </div>
  )
}

export default Dashboard
