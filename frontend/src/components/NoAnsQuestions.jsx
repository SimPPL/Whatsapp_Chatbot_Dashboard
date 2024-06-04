import { Card, CardBody, Stack, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import api from '../service/api';

const NoAnsQuestions = () => {
  const [noAnswerQuestions, setNoAnswerQuestions] = useState([]);

  useEffect(() => {
    api.get('/')
      .then((res) => {
        const a = res.data;
        const m = a.data;
        const noAnswerQuestionsSet = new Set(); // Use Set to store unique questions
        for (let i = 0; i < m.length; i++) {
          if (m[i].answer === "I cannot answer that.") {
            console.log(m[i].answer)
            noAnswerQuestionsSet.add(m[i].question); // Add question to Set
          }
        }
        const uniqueQuestions = Array.from(noAnswerQuestionsSet); // Convert Set to array
        setNoAnswerQuestions(uniqueQuestions); // Update state with unique questions
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <Card maxW='sm'>
      <CardBody>
        <Stack mt='6' spacing='3'>
          {/* Render questions with "I don't know" responses */}
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          <Text fontWeight='bold'>Questions with I don't know responses:</Text>
          {noAnswerQuestions.map((question, index) => (
            <Text key={index}>{question}</Text>
          ))}
        </Stack>
      </CardBody>
    </Card>
  );
};

export default NoAnsQuestions;
