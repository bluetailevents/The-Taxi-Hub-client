// Dashboard.js

import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Spinner from '../../components/common/Spinner'
import ContentWindow from '../../components/business/ContentWindow'
import Toolbar from '../../components/common/Toolbar'

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
      <Toolbar />
      <ContentWindow />
    </div>
  )
}

export default Dashboard
