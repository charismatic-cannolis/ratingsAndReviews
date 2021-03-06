import React, { useContext } from 'react';
import { AiFillCaretUp } from 'react-icons/ai';
import { BsFlagFill } from 'react-icons/bs';
import moment from 'moment';
import axios from 'axios';
import HighLightedText from '../Helpers/HighlightedTextHelper';
import SharedButton from '../../SharedStyles/SharedButton';
import AnswerStyles from './AnswerStyles';
import { AnswerInfoContext } from '../../contexts';
import Photo from './Photo';

const AnswersPerQuestion = (props) => {
  const date = moment(props.answer.date).format('LL');
  const answerId = props.answer.id;
  const photos = props.answer.photos || [];
  const {answerHelpful, answerReport} = useContext(AnswerInfoContext);
  const handleAnswerHelpful = answerHelpful;
  const handleAnswerReport = answerReport;


  const handleHelpfulAnswerClick = async () => {
    try {
      const res = axios.put(`/api/qa/answers/${answerId}/helpful`);
    } catch (error) {
      console.log(error);
    }

    handleAnswerHelpful(answerId, props.questionId);
  };

  const handleReportAnswerClick = async () => {
    try {
      const res = axios.put(`/api/qa/answers/${answerId}/report`);
    } catch (error) {
      console.log(error);
    }

    handleAnswerReport(answerId, props.questionId);
  };

  return (
    <>
      <AnswerStyles.AnswerWrapper>
        <AnswerStyles.Answer>A:</AnswerStyles.Answer>
        <AnswerStyles.AnswerBody>
          <HighLightedText
            textBody={props.answer.body}
          />
        </AnswerStyles.AnswerBody>
      </AnswerStyles.AnswerWrapper>

      <AnswerStyles.AnswerInfoWrapper>
        <AnswerStyles.AnswerInfo />
        <AnswerStyles.AnswerInfoName>
          Answered By:
          {' '}
          {props.answer.answerer_name}
          ,
          {' '}
          {date}
        </AnswerStyles.AnswerInfoName>

        <AnswerStyles.AnswerInfoHelp>
          Helpful?
          <SharedButton.QuestionItem onClick={handleHelpfulAnswerClick}>
            <AiFillCaretUp />
          </SharedButton.QuestionItem>

          #(
          {props.answer.helpfulness}
          )
        </AnswerStyles.AnswerInfoHelp>

        <AnswerStyles.AnswerInfoReport onClick={handleReportAnswerClick}>
          Report
          <BsFlagFill />
        </AnswerStyles.AnswerInfoReport>
      </AnswerStyles.AnswerInfoWrapper>

      <AnswerStyles.ImageWrapper>
        <AnswerStyles.Image />
          {photos.map((photo, index) => (
            <AnswerStyles.ImageContainer key={index}>
              <Photo
                photo={photo}
              />
            </AnswerStyles.ImageContainer>
          ))}
      </AnswerStyles.ImageWrapper>
      <br />
    </>
  );
};

export default AnswersPerQuestion;
