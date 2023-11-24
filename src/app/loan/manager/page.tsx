'use client';
import { Box, SimpleGrid, Text, Flex, Button, } from '@chakra-ui/react';
import DevelopmentTable from 'views/admin/dataTables/components/DevelopmentTable';
import tableDataDevelopment from 'views/admin/dataTables/variables/tableDataDevelopment';
import React from 'react';
import InputField from 'components/fields/InputField';

import Card from 'components/card/Card';
import LineChart from 'components/charts/LineAreaChart';
import { performingBorrowerAssetData, nonPerformingBorrowerAssetData, performingBorrowerIncomeData, nonPerformingBorrowerIncomeData,
  performingBorrowerAssetOptions, nonPerformingBorrowerAssetOptions, performingBorrowerIncomeOptions, nonPerformingBorrowerIncomeOptions } from 'variables/charts';

// assets
import { useState } from 'react';

export default function DataTables() {
  const [appId, setAppId] = useState<any>("");
  const [hidden, setHidden] = useState<number>(1);
  const [loading, setLoading] = useState(false);

  const incrementProgress = () => {
    if (appId != "cafecafeface") {
      alert("Please enter a valid value")
    }
    else {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setHidden(0);
      }, 3000);
    }
  };

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <SimpleGrid
        mb="20px"
        columns={{ sm: 1, md: 2 }}
        spacing={{ base: '20px', xl: '20px' }}
      >
        <Card py="13px">
          <Text
            fontSize='22px' 
            fontWeight='700' 
            lineHeight='100%'
            mx = {1}
          >
            Enter Application ID
          </Text>
          <Box>
              <InputField
                id="application id"
                label=""
                extra={<></>}
                placeholder="Application Id"
                type="string"
                mt={1}
                mb={1}
                onChange={(value) => {
                  setAppId(value);
                }}
              />
          </Box>
          <Button
            colorScheme="brandScheme"
            variant="solid"
            alignSelf="end" // Align the button towards the bottom
            onClick={incrementProgress}
            // isDisabled={step != 1}
            isLoading={loading}
          >
            Get Information
          </Button>
        </Card>

        <Card display={hidden == 1 ? "none": "block"} py="13px">
          <Text
            fontSize='22px' 
            fontWeight='700' 
            lineHeight='100%'
            mt = {1}
            mx = {1}
          >
            Confidence Score
          </Text>
          <Text
            fontSize='72px' 
            fontWeight='700' 
            lineHeight='100%'
            mt = {4}
            mx = {3}
          >
            54
          </Text>
        </Card>
      </SimpleGrid>
      <br></br>

      <Box display={hidden == 1 ? "none": "block"}>
      <SimpleGrid
        mb="20px"
        columns={{ sm: 1, md: 2 }}
        spacing={{ base: '20px', xl: '20px' }}
      >
        <DevelopmentTable tableData={tableDataDevelopment} />

        <Card flexDirection='column' w='100%' px='0px' overflowX={{ sm: 'scroll', lg: 'hidden' }}>
          <Flex px='25px' mb="8px" justifyContent='space-between' align='center'>
            <Text fontSize='22px' fontWeight='700' lineHeight='100%'>
              Non Performing Borrower Asset Ratio Data
            </Text>
          </Flex>
          <Box minH='260px' minW='75%' mt='auto'>
            <LineChart chartData={nonPerformingBorrowerAssetData} chartOptions={nonPerformingBorrowerAssetOptions} />
          </Box>
          <Flex px='25px' mb="8px" justifyContent='space-between' align='center'>
            <Text fontSize='22px' fontWeight='700' lineHeight='100%'>
              Performing Borrower Asset Ratio Data
            </Text>
          </Flex>
          <Box minH='260px' minW='75%' mt='auto'>
            <LineChart chartData={performingBorrowerAssetData} chartOptions={performingBorrowerAssetOptions} />
          </Box>
        </Card>
        {/* <CheckTable tableData={tableDataCheck} />
        <ColumnsTable tableData={tableDataColumns} />
        <ComplexTable tableData={tableDataComplex} /> */}
      </SimpleGrid>
      </Box>

      <Box display={hidden == 1 ? "none": "block"}>
      <SimpleGrid
        mb="20px"
        columns={{ sm: 1, md: 2 }}
        spacing={{ base: '20px', xl: '20px' }}
      >

        <Card flexDirection='column' w='100%' px='0px' overflowX={{ sm: 'scroll', lg: 'hidden' }}>
          <Flex px='25px' mb="8px" justifyContent='space-between' align='center'>
            <Text fontSize='22px' fontWeight='700' lineHeight='100%'>
              Performing Borrower Income Ratio Data
            </Text>
          </Flex>
          <Box minH='260px' minW='75%' mt='auto'>
            <LineChart chartData={performingBorrowerIncomeData} chartOptions={performingBorrowerIncomeOptions} />
          </Box>
        </Card>

        <Card flexDirection='column' w='100%' px='0px' overflowX={{ sm: 'scroll', lg: 'hidden' }}>
          <Flex px='25px' mb="8px" justifyContent='space-between' align='center'>
            <Text fontSize='22px' fontWeight='700' lineHeight='100%'>
              Non Performing Borrower Income Ratio Data
            </Text>
          </Flex>
          <Box minH='260px' minW='75%' mt='auto'>
            <LineChart chartData={nonPerformingBorrowerIncomeData} chartOptions={nonPerformingBorrowerIncomeOptions} />
          </Box>
        </Card>
        
        {/* <CheckTable tableData={tableDataCheck} />
        <ColumnsTable tableData={tableDataColumns} />
        <ComplexTable tableData={tableDataComplex} /> */}
      </SimpleGrid>
      </Box>
      
    </Box>
  );
}
