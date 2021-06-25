import React, { lazy, Suspense, useState, useEffect, } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import QuestionsContainer from './SharedStyles/QuestionsContainer';
import { ProductIdContext, AnswerInfoContext, AddAnswerContext, SearchTextContext, QuestionHelpfulContext } from './contexts';
import { getAnswerHelpful, getQuestionHelpful, getAnswerReport, getNewAnswer, getSearchText } from './ProductQuestionHelpers/Index.js';
import Spinner from '../product-overview/spinner/LoadingSpinner';

const QuestionsList = lazy( () => import('./questionsList/QuestionsList'));
// import QuestionsList from './questionsList/QuestionsList';

const SearchQuestions = lazy( () => import('./SearchQuestions/SearchQuestions'));
// import SearchQuestions from './SearchQuestions/SearchQuestions';

function ProductQuestions({ productId }) {
  const [questionList, setQuestionList] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [isQuestionList, setIsQuestionList] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchText, setSearchText] = useState('');
  const questionsPerPage = 5;

  const fetchInitialQuestions = async () => {
    try {
      const res = await axios.get(`/api/qa/questions?product_id=${productId}&count=${questionsPerPage}`);
      const newQuestionList = questionList.concat(res.data.results);
      setQuestionList(newQuestionList);
      setFilteredQuestions(newQuestionList);
      if (newQuestionList.length > 0) {
        setIsQuestionList(true);
      }
    } catch (error) {
      setIsError(true);
    }
  };

  const fetchAllQuestions = async () => {
    let fetchingData = true;
    let newQuestions = [];
    const count = 25;
    let page = 1;

    try {
      while (fetchingData) {
        const url = `/api/qa/questions?product_id=${productId}&page=${page}&count=${count}`;
        const res = await axios.get(url);
        newQuestions = newQuestions.concat(res.data.results);
        fetchingData = res.data.results.length === count;
        page++;
      }
      setQuestionList(newQuestions);
      setFilteredQuestions(newQuestions);
      if (newQuestions.length > 0) {
        setIsQuestionList(true);
      }
    } catch (error) {
      setIsError(true);
    }
  };

  useEffect(() => {
    fetchInitialQuestions();
  }, []);

  const handleExpandQuestions = () => {
    fetchAllQuestions();
  };

  const handleSearchTextChanged = (text) => {
    setSearchText(text);

    if (text.length > 3) {
      const searchTextLowerCase = text.toLowerCase();
      const results = getSearchText(questionList, searchTextLowerCase);
      setFilteredQuestions(results);
    } else {
      setFilteredQuestions(questionList);
    }
  };

  const handleAddedQuestion = () => {
    fetchAllQuestions();
  };

  const handleAddedAnswer = (questionId, newAnswers) => {
    const newList = getNewAnswer(questionList, questionId, newAnswers);
    setQuestionList(newList);
  };

  const handleAnswerHelpful = (answerId, questionId) => {
    const newList = getAnswerHelpful(questionList, answerId, questionId);
    setQuestionList(newList);
  };

  const handleAnswerReport = (answerId, questionId) => {
    const newList = getAnswerReport(questionList, answerId, questionId);
    setQuestionList(newList);
  };

  const handleQuestionHelpful = (questionId) => {
    const newList = getQuestionHelpful(questionList, questionId);
    setQuestionList(newList);
  };

  return (
    <Suspense fallback={<Spinner />}>
      {!isError
        && (
          <QuestionsContainer.Wrap>
            <QuestionsContainer.Container>
              <SearchQuestions
                handleSearchTextChanged={handleSearchTextChanged}
              />
              <br />

              <ProductIdContext.Provider value={{id: productId, addQuestionContext: handleAddedQuestion}}>
                  <AnswerInfoContext.Provider value={{answerHelpful: handleAnswerHelpful, answerReport: handleAnswerReport}}>
                    <QuestionHelpfulContext.Provider value={handleQuestionHelpful}>
                      <SearchTextContext.Provider value={searchText}>
                        <AddAnswerContext.Provider value={handleAddedAnswer}>
                            <QuestionsList
                              questions={filteredQuestions}
                              handleExpandQuestions={handleExpandQuestions}
                              questionsPerPage={questionsPerPage}
                              isQuestionList={isQuestionList}
                            />
                        </AddAnswerContext.Provider>
                      </SearchTextContext.Provider>
                    </QuestionHelpfulContext.Provider>
                  </AnswerInfoContext.Provider>
              </ProductIdContext.Provider>
            </QuestionsContainer.Container>
          </QuestionsContainer.Wrap>
        )}
    </Suspense>
  );
}

export default ProductQuestions;
