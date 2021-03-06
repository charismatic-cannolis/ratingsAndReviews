import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { ChevronThinRight, ChevronThinLeft } from '@styled-icons/entypo';
import { PreviewStyleContext, PhotoIndexContext } from '../contexts';
import ThumbnailBottomNav from './ThumbnailBottomNav';

const MainViewContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledImage = styled.img`
  object-fit: cover;
  width: 600px;
  height: 800px;
  :hover {
    cursor: zoom-in;
  }
`;

const Dialog = styled.dialog`
  position: absolute;
  z-index: 100;
  border: solid 1px #e2e2e2;
  padding: 5px;
`;

const StyledImageModalContainer = styled.div`
  width: 100%;
  height: auto;
  border-radius: 1%;
  overflow: hidden;
`;

const StyledImageModal = styled.img`
  width: 1200px;
  height: auto;
  border-radius: 1%;
  transform: scale(1.0);
  transition: transform 0.2s;

  :hover {
    cursor: zoom-out;
    transform: scale(2.5);
  }
`;

const StyledArrowContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  color: #27231F;
  width: 30px;
  height: 100%;
  left: ${(props) => props.position};
  :hover {
    cursor: pointer;
    opacity: 50%;
    margin-bottom: 4px;
  }
`;

function MainView({ imageRefs }) {
  const { previewStyle } = useContext(PreviewStyleContext);
  const { currentPhotoIndex, setCurrentPhotoIndex } = useContext(PhotoIndexContext);
  const [modal, setModal] = useState(false);

  function nextPhoto() {
    setCurrentPhotoIndex((prevIndex) => prevIndex + 1);
    imageRefs[currentPhotoIndex + 1].current.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'center',
    });
  }

  function prevPhoto() {
    setCurrentPhotoIndex((prevIndex) => prevIndex - 1);
    imageRefs[currentPhotoIndex + 1].current.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
      inline: 'center',
    });
  }

  function viewModal() {
    setModal((prevState) => !prevState);
  }

  return (
    <>
      <MainViewContainer>
        <StyledImageContainer>
          <StyledArrowContainer
            onClick={prevPhoto}
            position="10%"
          >
            {currentPhotoIndex !== 0 && <ChevronThinLeft />}
          </StyledArrowContainer>
          <StyledImage
            src={previewStyle.photos[currentPhotoIndex].url}
            onClick={viewModal}
            alt="main-image"
          />
          {modal && (
          <Dialog open>
            <StyledImageModalContainer>
              <StyledImageModal
                src={previewStyle.photos[currentPhotoIndex].url}
                onClick={viewModal}
              />
            </StyledImageModalContainer>
          </Dialog>
          )}
          <StyledArrowContainer
            onClick={nextPhoto}
            position="90%"
          >
            {currentPhotoIndex !== previewStyle.photos.length - 1 && <ChevronThinRight />}
          </StyledArrowContainer>
        </StyledImageContainer>
        <ThumbnailBottomNav imageRefs={imageRefs} />
      </MainViewContainer>
    </>
  );
}

export default MainView;
