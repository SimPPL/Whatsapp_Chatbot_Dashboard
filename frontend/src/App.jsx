import { Box, ChakraProvider, Flex} from "@chakra-ui/react"
import CustomerChart from "./components/CustomerChart"
import Navbar from "./components/Navbar";
import LangPieChart from "./components/LangPieChart";
import FAQTable from "./components/FAQTable";
import CustomerCard from "./components/CustomerCard";
import UsersCount from "./components/UsersCount";
import ResponsesPie from "./components/ResponsesPie";


const App = () => {
  console.log(import.meta.env.API_URL)
  return (
    <ChakraProvider>
      <Navbar />
        <Box m={'0 6%'}>
        <CustomerChart />
        </Box>
      <Flex justifyContent={'space-around'} alignItems={'center'} flexDir={{ base: 'column', md: 'row' }}>
          <LangPieChart />
          <Box>
          <CustomerCard />
          <UsersCount />
          </Box>
          <ResponsesPie />
      </Flex>
    <Box m={20}>
    <FAQTable />
    </Box>
    </ChakraProvider>
  )
}

export default App;