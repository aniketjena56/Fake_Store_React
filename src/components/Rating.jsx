import React, { useEffect, useState } from 'react';

// getting value from the parent are (so when someone clicked filterbar and choose "filter by rating" then )
const Rating = ({ defaultRate = 0, isEditable, onchangeRating = () => { } }) => {
    const [rate, setRate] = useState(defaultRate);

    const handleRating = (value) => {
        setRate(value);
    };
    // so here we are pasiing the rate that got clicked to apply onfilter bar or to save in filter bar 
    useEffect(() => {
        onchangeRating(rate) //onChangeRating callback, passing the new rating to the parent component.
    }, [rate])

    // so here :- "isEditable" is true by default so make it false , and if false then make it onclick event block using "pointer event none"
    return (
        <div style={{ pointerEvents: isEditable ? 'auto' : 'none' }}>
            {[1, 2, 3, 4, 5].map((value) => (
                <span
                    key={value}
                    onClick={() => handleRating(value)}
                    style={{
                        cursor: isEditable ? 'pointer' : 'default',
                        color: value <= rate ? 'gold' : 'gray',
                        fontSize: '24px',
                        marginRight: '5px',
                    }}
                >
                    ★
                </span>
            ))}
        </div>

    );
};

export default Rating;
// whwn user clicks :Ex  Before render           after render
// rate (state)	:              0	                    4
// value in loop :	      1 to 5	                 1 to 5
// value <= rate:       false for 4              	true for 4

// isEditable	:                true	              true
// onchangeRating(rate)	:   called with 2	       called with 4
