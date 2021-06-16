import React, { useState, useContext, useRef } from 'react';
import styled from 'styled-components';
import { GoChevronUp, GoChevronDown } from 'react-icons/go';
import PreviewStyleContext from '../contexts/PreviewStyleContext';
import ThumbnailLeft from './ThumbnailLeft';

const ThumbnailSlideWrapper = styled.div`
  order: -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 750px;
  margin-top: 30px;

  @media screen and (max-width: 1000px) {
    display: none;
  }
`;

const Slider = styled.div`
  display: flex;
  flex-direction: column;
  height: 700px;
  width: auto;
  overflow-y: hidden;
  flex-wrap: nowrap;
`;

const StyledArrowContainer = styled.div`
  :hover {
    cursor: pointer;
  }
`;

function ThumbnailLeftNav() {
  const { previewStyle } = useContext(PreviewStyleContext);
  const { length } = previewStyle.photos;
  const [position, setPosition] = useState(0);
  const sliderRef = useRef();

  function scrollSliderUp() {
    sliderRef.current.scrollTop -= 90;
    setPosition(sliderRef.current.scrollTop);
  }

  function scrollSliderDown() {
    sliderRef.current.scrollTop += 90;
    setPosition(sliderRef.current.scrollTop);
  }

  return (
    <ThumbnailSlideWrapper>
      {length > 7
        ? (
          <StyledArrowContainer onClick={scrollSliderUp}>
            {position !== 0 && <GoChevronUp />}
          </StyledArrowContainer>
        )
        : null}
      <Slider ref={sliderRef}>
        {previewStyle.photos.map((photo, index) => (
          <ThumbnailLeft
            key={index}
            index={index}
            photo={photo}
          />
        ))}
      </Slider>
      {length > 7
        ? (
          <StyledArrowContainer onClick={scrollSliderDown}>
            <GoChevronDown />
          </StyledArrowContainer>
        )
        : null}
    </ThumbnailSlideWrapper>
  );
}

export default ThumbnailLeftNav;
