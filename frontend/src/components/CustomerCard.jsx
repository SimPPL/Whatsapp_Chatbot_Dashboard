import { Card, CardBody, Heading, Stack } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import api from '../service/api';

const CustomerCard = () => {
  const [count, setCount] = useState(null);
  useEffect(() => {
    api.get('/')
    .then((res) => {
      const a = res.data
      const m = a.data
      setCount(m.length)
    })
    .catch(err => console.log(err))

  }, [])
  
  return (
    <Card maxW='sm'>
  <CardBody>
    <Stack mt='6' spacing='3'>
      <Heading size='md' align={'center'}>Total Number of responses generated</Heading>
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

export default CustomerCard