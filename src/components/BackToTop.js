import React from "react";
import { useEffect, useState } from "react";

const BackToTop = () => {
    const [backToTopButton, setBackToTopButton] = useState(false);
    
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if(window.scrollY > 100) {
                setBackToTopButton(true);
            }
            else {
                setBackToTopButton(false);
            }
        })
    }, [])

    const scrollUp = () => {
        window.scrollTo({
            top:0,
            behavior: "smooth"
        })
    }
    
    return ( 
        <div>
            {backToTopButton && (
                <button 
                    onClick={scrollUp} 
                    style={{position: "fixed", bottom: "20px", right: "20px", height: "40px", width: "40px", fontSize: "40px", fontFamily: "revert"}}
                >^</button>
            )}
        </div>
    );
}

export default BackToTop;