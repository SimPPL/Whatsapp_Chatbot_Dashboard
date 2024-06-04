import { Card, CardBody, Heading, Stack } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import api from '../service/api';

const NoAnswerFreq = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    api.get('/')
    .then((res) => {
      const a = res.data
      const m = a.data
      const dontKnowCount = m.filter(response => response.answer === "I cannot answer that.").length;
      setCount(dontKnowCount)
    })
    .catch(err => console.log(err))

  }, [count])

  return (
    <Card maxW='sm'>
  <CardBody>
    <Stack mt='6' spacing='3'>
      <Heading size='md'>Number of not answered questions</Heading>
      <Heading alignSelf={'center'}>
        {count}
      </Heading>
      {/* <Text color='gray.500' fontSize='xl'>
        25% more than before
      </Text> */}
    </Stack>
  </CardBody>
</Card>
  )
}

export default NoAnswerFreq;