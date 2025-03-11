import React from 'react'

export default function Alert({alert}) {
  return (
    <div className={`${alert.error ? 'from-red-400 to-red-600' :'from-blue-500 to-blue-600'} bg-gradient-to-tr text-center p-3 rounded-xl uppercase font-bold text-white text-sm mb-10`} >
        {alert.msg}
    </div>
  )
}
