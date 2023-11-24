'use client';
import { Box, SimpleGrid, Text, Flex } from '@chakra-ui/react';
import DevelopmentTable from 'views/admin/dataTables/components/DevelopmentTable';
import CheckTable from 'views/admin/dataTables/components/CheckTable';
import ColumnsTable from 'views/admin/dataTables/components/ColumnsTable';
import ComplexTable from 'views/admin/dataTables/components/ComplexTable';
import tableDataDevelopment from 'views/admin/dataTables/variables/tableDataDevelopment';
import tableDataCheck from 'views/admin/dataTables/variables/tableDataCheck';
import tableDataColumns from 'views/admin/dataTables/variables/tableDataColumns';
import tableDataComplex from 'views/admin/dataTables/variables/tableDataComplex';
import React from 'react';
import InputField from 'components/fields/InputField';
import AdminLayout from 'layouts/admin';

import Card from 'components/card/Card';
import LineChart from 'components/charts/LineAreaChart';
import { performingBorrowerData, nonPerformingBorrowerData, performingBorrowerOptions, nonPerformingBorrowerOptions } from 'variables/charts';

// assets
import { useState } from 'react';
import NewLineChart from 'components/charts/graph';

export default function DataTables() {
  const [appId, setAppId] = useState<any>("");
  const [currentValue, setCurrentValue] = useState<number>(0);

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <Card py="13px">
        <Text
            justifyContent="space-between"
            align="center"
            fontSize={{ sm: '15px', lg: '18px' }}
            color="gray.400"
          >
            Enter Application ID
        </Text>
        <SimpleGrid
          mb="20px"
          columns={{ sm: 1, md: 2 }}
          spacing={{ base: '20px', xl: '20px' }}
        >
          <Box>
              <InputField
                id="application id"
                label="Application Id"
                extra={<></>}
                placeholder="Application Id"
                type="number"
                mb={2}
                onChange={(value) => {
                  setAppId(value);
                }}
              />
          </Box>
        </SimpleGrid>
      </Card>
      <br></br>

      <SimpleGrid
        mb="20px"
        columns={{ sm: 1, md: 2 }}
        spacing={{ base: '20px', xl: '20px' }}
      >
        <DevelopmentTable tableData={tableDataDevelopment} />

        <Card flexDirection='column' w='100%' px='0px' overflowX={{ sm: 'scroll', lg: 'hidden' }}>
          <Flex px='25px' mb="8px" justifyContent='space-between' align='center'>
            <Text fontSize='22px' fontWeight='700' lineHeight='100%'>
              Non Performing Borrower Data
            </Text>
          </Flex>
          <Box minH='260px' minW='75%' mt='auto'>
            <LineChart chartData={nonPerformingBorrowerData} chartOptions={nonPerformingBorrowerOptions} />
          </Box>
          <Flex px='25px' mb="8px" justifyContent='space-between' align='center'>
            <Text fontSize='22px' fontWeight='700' lineHeight='100%'>
              Performing Borrower Data
            </Text>
          </Flex>
          <Box minH='260px' minW='75%' mt='auto'>
            <LineChart chartData={performingBorrowerData} chartOptions={performingBorrowerOptions} />
          </Box>
        </Card>
        {/* <CheckTable tableData={tableDataCheck} />
        <ColumnsTable tableData={tableDataColumns} />
        <ComplexTable tableData={tableDataComplex} /> */}
      </SimpleGrid>
      
    </Box>
  );
}
