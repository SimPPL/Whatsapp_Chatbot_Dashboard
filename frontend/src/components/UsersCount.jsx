import { Card, CardBody, Heading, Stack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import api from '../service/api';

const UsersCount = () => {
    const [count, setCount] = useState(0);
  useEffect(() => {
    api.get('/')
      .then((res) => {
        const a = res.data;
        const m = a.data;
        const mobile_num = new Set(); 
        m.forEach(element => {
          mobile_num.add(element.hash_number)
        });
        setCount(mobile_num.size); 
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <Card maxW='sm'>
    <CardBody>
      <Stack mt='6' spacing='3'>
        <Heading size='lg' alignSelf={'center'}>Number of Users</Heading>
        <Heading alignSelf={'center'}>
          {count}
        </Heading>
        {/* <Text color='gray.500' fontSize='xl'>
          25% more than before
        </Text> */}
      </Stack>
    </CardBody>
  </Card>
  );
};

export default UsersCount;
