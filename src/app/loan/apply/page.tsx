'use client';

import {
  Box,
  Flex,
  Icon,
  SimpleGrid,
  useColorModeValue,
  Progress,
  Text,
  Button,
} from '@chakra-ui/react';
// Custom components
// import MiniCalendar from 'components/calendar/MiniCalendar';
import MiniStatistics from 'components/card/MiniStatistics';
import { MdFileCopy, MdMessage, MdPhone } from 'react-icons/md';
import type { Applicant } from '@prisma/client';

import Card from 'components/card/Card';
import InputField from 'components/fields/InputField';

// Assets
import { useState } from 'react';

export default function Default() {
  // Chakra Color Mode

  const brandColor = useColorModeValue('brand.500', 'white');
  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');

  const [loading, setLoading] = useState(false);
  const [step, setProgress] = useState(1);
  const maxStep = 10;

  const [application, setApplication] = useState<Applicant>({
    phoneNumber: '',
    income: 0,
    pan: '',
    maritalStatus: 'SINGLE',
    addressId: '',
  });

  

  const incrementProgress = () => {
    setLoading(true);
    setTimeout(() => {
      setProgress(step + 1);
      setLoading(false);
    }, 2000);
  };

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
      <Box display={step > 2 ? 'block' : 'none'}>
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
      </Box>

      <Card py="15px" mb="20px" display={step > 0 ? 'block' : 'none'}>
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: '15px', lg: '18px' }}
          color="gray.400"
          mb="10px"
        >
          Step 1: Phone Verification
        </Text>
        <SimpleGrid
          columns={{ base: 1, md: 2, xl: 4 }}
          templateColumns={{
            md: '40% 10% 40% 40%',
            xl: '40% 10% 30% 10%',
          }}
          gap="20px"
          mb="20px"
        >
          <Box>
            <InputField
              id="phone"
              label="Phone number"
              extra={<Icon as={MdPhone} />}
              placeholder="Phone number"
              type="number"
              onChange={(value) => {
                setApplication({ ...application, phone: value });
              }}
              disabled={step != 1}
            />
          </Box>
          <Button
            colorScheme="brandScheme"
            variant="solid"
            alignSelf="end" // Align the button towards the bottom
            onClick={incrementProgress}
            isDisabled={step != 1}
            isLoading={loading && step == 1}
          >
            Get OTP
          </Button>
          <InputField
            id="otp"
            label="OTP"
            extra={<Icon as={MdMessage} />}
            placeholder="OTP"
            type="number"
            onChange={(value) => {}}
            disabled={step != 2}
            display={step > 1 ? 'block' : 'none'}
          />
          <Button
            colorScheme="brandScheme"
            variant="solid"
            alignSelf="end" // Align the button towards the bottom
            onClick={incrementProgress}
            isDisabled={step != 2}
            isLoading={loading && step == 2}
            display={step > 1 ? 'block' : 'none'}
          >
            Verify OTP
          </Button>
        </SimpleGrid>
      </Card>

      <Card py="15px" mb="20px" display={step > 2 ? 'block' : 'none'}>
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: '15px', lg: '18px' }}
          color="gray.400"
          mb="10px"
        >
          Step 2: Aadhar Verification
        </Text>
        <SimpleGrid
          columns={{ base: 1, md: 2, xl: 4 }}
          templateColumns={{
            md: '40% 10% 40% 40%',
            xl: '40% 10% 30% 10%',
          }}
          gap="20px"
          mb="20px"
        >
          <InputField
            id="aadhar"
            label="Aadhar number"
            extra={<Icon as={MdFileCopy} />}
            placeholder="Aadhar number"
            type="number"
            onChange={(value) => {
              setApplication({ ...application, aadhar: value });
            }}
            disabled={step != 3}
          />
          <Button
            colorScheme="brandScheme"
            variant="solid"
            alignSelf="end" // Align the button towards the bottom
            onClick={incrementProgress}
            isDisabled={step != 3}
            isLoading={loading && step == 3}
          >
            e-Verify Aadhar
          </Button>
        </SimpleGrid>
      </Card>
      <Card py="15px" mb="20px" display={step > 3 ? 'block' : 'none'}>
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: '15px', lg: '18px' }}
          color="gray.400"
          mb="10px"
        >
          Step 3: PAN Verification
        </Text>
        <SimpleGrid
          columns={{ base: 1, md: 2, xl: 4 }}
          templateColumns={{
            md: '40% 10% 40% 40%',
            xl: '40% 10% 30% 10%',
          }}
          gap="20px"
          mb="20px"
        >
          <InputField
            id="pan"
            label="PAN number"
            extra={<Icon as={MdFileCopy} />}
            placeholder="PAN number"
            type="text"
            onChange={(value) => {
              setApplication({ ...application, pan: value });
            }}
            disabled={step != 4}
          />
          <Button
            colorScheme="brandScheme"
            variant="solid"
            alignSelf="end" // Align the button towards the bottom
            onClick={incrementProgress}
            isDisabled={step != 4}
            isLoading={loading && step == 4}
          >
            e-Verify PAN
          </Button>
        </SimpleGrid>
      </Card>
    </Box>
  );
}
