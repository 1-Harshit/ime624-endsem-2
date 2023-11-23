'use client';
/*!
  _   _  ___  ____  ___ ________  _   _   _   _ ___   
 | | | |/ _ \|  _ \|_ _|__  / _ \| \ | | | | | |_ _| 
 | |_| | | | | |_) || |  / / | | |  \| | | | | || | 
 |  _  | |_| |  _ < | | / /| |_| | |\  | | |_| || |
 |_| |_|\___/|_| \_\___/____\___/|_| \_|  \___/|___|
                                                                                                                                                                                                                                                                                                                                       
=========================================================
* Horizon UI - v1.1.0
=========================================================

* Product Page: https://www.horizon-ui.com/
* Copyright 2022 Horizon UI (https://www.horizon-ui.com/)

* Designed and Coded by Simmmple

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import {
  Box,
  Flex,
  FormLabel,
  Image,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
  Progress,
  Text,
} from '@chakra-ui/react';
// Custom components
// import MiniCalendar from 'components/calendar/MiniCalendar';
import MiniStatistics from 'components/card/MiniStatistics';
import IconBox from 'components/icons/IconBox';
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy,
  MdPhone,
} from 'react-icons/md';
import CheckTable from 'views/admin/default/components/CheckTable';
import ComplexTable from 'views/admin/default/components/ComplexTable';
import DailyTraffic from 'views/admin/default/components/DailyTraffic';
import PieCard from 'views/admin/default/components/PieCard';
import Tasks from 'views/admin/default/components/Tasks';
import TotalSpent from 'views/admin/default/components/TotalSpent';
import WeeklyRevenue from 'views/admin/default/components/WeeklyRevenue';
import tableDataCheck from 'views/admin/default/variables/tableDataCheck';
import tableDataComplex from 'views/admin/default/variables/tableDataComplex';

import Card from 'components/card/Card';
import InputField from 'components/fields/InputField';

// Assets
import { useState } from 'react';

export default function Default() {
  // Chakra Color Mode

  const brandColor = useColorModeValue('brand.500', 'white');
  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');

  const [step, setProgress] = useState(4);
  const maxStep = 100;

  const [application, setApplication] = useState<any>({
    name: '',
    phone: '',
    pan: '',
    aadhar: '',
  });

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <Box textAlign="center" mb="20px">
        <Flex alignItems="center" mb="20px">
          <Text fontSize="2xl" fontWeight="bold">
            Progress
          </Text>
          <Progress
            variant="table"
            colorScheme="brandScheme"
            h="20px"
            w="full"
            flexGrow={1}
            ml={2}
            value={(step * 100.0) / maxStep}
          />
        </Flex>
      </Box>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, '2xl': 4 }}
        gap="20px"
        mb="20px"
      >
        <MiniStatistics
          name="Applicant Name"
          value={application.name || 'Not Entered'}
        />
        <MiniStatistics
          name="Applicant Phone"
          value={application.phone || 'Not Entered'}
        />
        <MiniStatistics
          name="Applicant PAN"
          value={application.pan || 'Not Entered'}
        />
        <MiniStatistics
          name="Applicant Aadhar"
          value={application.aadhar || 'Not Entered'}
        />
      </SimpleGrid>

      <Card py="15px">
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: '15px', lg: '18px' }}
          color="gray.400"
        >
          Step 1: Phone Verification
        </Text>
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap="20px" mb="20px">
          <Box>
            <InputField
              id="phone"
              label="Phone number"
              extra={<Icon as={MdPhone} />}
              placeholder="Phone number"
              type="number"
              mb={2}
              onChange={(value) => {
                setApplication({ ...application, phone: value });
              }}
            />
          </Box>
        </SimpleGrid>
      </Card>
    </Box>
  );
}
