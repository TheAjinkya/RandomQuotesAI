import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import '../App.css';


const Dashboard = () => {

    const [quote, setQuote] = useState()
    const intervalRef = useRef()

    const fetchData = () => {
        axios.get("https://api.adviceslip.com/advice").then(response => {
            console.log(response)
            setQuote(response.data.slip.advice)
        })
    }

    const generateOnLoop = () => {
        intervalRef.current = setInterval(() => {
            fetchData()
        }, 3000)
    }

    const stopTheLoop = () => {
        clearInterval(intervalRef.current)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="app">
            <div className="card">
                <h1 className="heading">{quote}</h1>
                <div className='button-container'>
                <button className="button" onClick={fetchData}>
                    <span>Generate a Quote!</span>
                </button>
                <button className="button" onClick={generateOnLoop}>
                    <span>Start the Loop</span>
                </button>
                <button className="button" onClick={stopTheLoop}>
                    <span>Stop the Loop</span>
                </button>
                </div>
            </div>
        </div>)
}

export default Dashboard

{/* <button onClick={fetchData}>Generate</button>
<button onClick={generateOnLoop}>Loop</button>
<button onClick={stopTheLoop}>Stop the Loop</button> */}