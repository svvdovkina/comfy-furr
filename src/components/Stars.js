import React from 'react'
import styled from 'styled-components'
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'
const Stars = ({stars, reviews}) => {
  const starsArr = []; 
  for (let i = 1; i <= 5; i++){
    if (stars >= i) starsArr.push(BsStarFill) 
    else if (stars >= i - 0.5 && stars < i) starsArr.push(BsStarHalf)
    else starsArr.push(BsStar);
  }
  return <Wrapper>
    <div className="stars">
      {starsArr.map((fa, ind)=><span key={ind}>{fa()}</span>
      )}
    </div>
    <p className="reviews">
      ({reviews} customer reviews)
    </p>
  </Wrapper>
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  span {
    color: #ffb900;
    font-size: 1rem;
    margin-right: 0.25rem;
  }
  p {
    margin-left: 0.5rem;
    margin-bottom: 0;
  }
  margin-bottom: 0.5rem;
`
export default Stars
