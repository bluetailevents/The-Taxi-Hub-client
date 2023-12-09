import React from "react"
import { useDispatch } from "react-redux"
import { useCoordinates } from "./coordinatesHooks"
import { setCoordinates } from "./coordinatesSlice"

export const Coordinates = () => {
    const dispatch = useDispatch()
    const { coordinates } = useCoordinates()
    
    const handleSetCoordinates = () => {
        dispatch(setCoordinates(coordinates))
    }
    
    return (
        <div>
        <button onClick={handleSetCoordinates}>Set Coordinates</button>
        </div>
    )
    }
        