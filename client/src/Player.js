import { React } from "react"
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react'
import Header from "./Header";
import Footer from "./Footer";

const Player = () => {
 
    const [videoData, setVideoData] = useState(null)

    const { id } = useParams();

    async function componentDidMount() {
        try {
            console.log("calling data for video Id " + id)
            const response = await fetch (`http://localhost:4000/video/${id}/data`)
            const data = await response.json()
            setVideoData(data)
        } catch(error) {
            console.log(error)
        }
    }

    useEffect(() => {
        componentDidMount()
    }, [])


    return (
            <div className="App">
                <Header />
                <header className="App-header">
                    <video controls autoPlay crossOrigin="anonymous">
                        <source src={`http://localhost:4000/video/${id}`} type="video/mp4" />
                        <track label="English" kind="captions" srcLang="Eng" src={`http://localhost:4000/video/${id}/caption`} default></track>
                    </video>
                    <h1>{videoData?.name}</h1> 
                </header>
                <Footer />
            </div>
        )

}
export default Player