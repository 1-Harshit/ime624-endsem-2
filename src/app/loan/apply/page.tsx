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
  Select,
  SelectField,
} from '@chakra-ui/react';
// Custom components
// import MiniCalendar from 'components/calendar/MiniCalendar';
import MiniStatistics from 'components/card/MiniStatistics';
import { MdFileCopy, MdLocationPin, MdMessage, MdPhone } from 'react-icons/md';
import {
  Aadhar,
  Address,
  Gender,
  type Applicant,
  Status,
} from '@prisma/client';

import Card from 'components/card/Card';
import InputField from 'components/fields/InputField';

// Assets
import { useState } from 'react';
import Information from 'views/admin/profile/components/Information';
import { fakerEN_IN as faker } from '@faker-js/faker';
export default function Default() {
  // Chakra Color Mode

  const brandColor = useColorModeValue('brand.500', 'white');
  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = 'gray.400';
  const cardShadow = useColorModeValue(
    '0px 18px 40px rgba(112, 144, 176, 0.12)',
    'unset',
  );

  const [loading, setLoading] = useState(false);
  const [step, setProgress] = useState(5);
  const maxStep = 10;

  const [application, setApplication] = useState<Applicant>({
    phoneNumber: faker.phone.number(),
    income: faker.number.int({ min: 100000, max: 1000000 }),
    pan: (
      faker.string.alpha(5) +
      faker.number.int({ min: 1000, max: 9999 }) +
      faker.string.alpha(1)
    ).toUpperCase(),
    maritalStatus: faker.helpers.enumValue(Status),
    addressId: '',
  });

  const [aadhar, setAadhar] = useState<Aadhar>({
    aadharNumber: faker.number
      .int({ min: 100000000000, max: 999999999999 })
      .toString(),
    ownerId: '',
    name: faker.person.fullName(),
    dob: faker.date.birthdate(),
    sex: faker.person.sex().toUpperCase() as Gender,
    addressId: '',
  });

  const [permAddress, setPermAddress] = useState<Address>(() => {
    const location = faker.location;
    const zipCode = location.zipCode();
    return {
      id: '',
      line1: location.streetAddress(),
      line2: location.city() + ', ' + location.state() + ' - ' + zipCode,
      pinZipcode: zipCode,
    };
  });

  const [currAddress, setCurrAddress] = useState<Address>(() => {
    const location = faker.location;
    const zipCode = location.zipCode();
    return {
      id: '',
      line1: location.streetAddress(),
      line2: location.city() + ', ' + location.state() + ' - ' + zipCode,
      pinZipcode: zipCode,
    };
  });

  const incrementProgress = () => {
    setLoading(true);
    setTimeout(() => {
      setProgress(step + 1);
      setLoading(false);
    }, 2000);
  };

  const handleSubmitForm = async () => {
    const payload = { application, aadhar, permAddress, currAddress };
    setLoading(true);
    await fetch('/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setLoading(false);
    setProgress(0);
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
      <Box display={step > 4 ? 'block' : 'none'}>
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3, '2xl': 4 }}
          gap="20px"
          mb="20px"
        >
          <MiniStatistics
            name="Applicant Name"
            value={aadhar.name || 'Not Entered'}
          />
          <MiniStatistics
            name="Applicant Phone"
            value={application.phoneNumber || 'Not Entered'}
          />
          <MiniStatistics
            name="Applicant PAN"
            value={application.pan || 'Not Entered'}
          />
          <MiniStatistics
            name="Applicant Aadhar"
            value={aadhar.aadharNumber || 'Not Entered'}
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
              type="string"
              onChange={(value) => {
                setApplication({ ...application, phoneNumber: String(value) });
              }}
              value={application.phoneNumber}
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
            value={aadhar.aadharNumber}
            onChange={(value) => {
              setAadhar({ ...aadhar, aadharNumber: String(value) });
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
            value={application.pan}
            onChange={(value) => {
              setApplication({
                ...application,
                pan: String(value).toUpperCase(),
              });
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
      <Card py="15px" mb="20px" display={step > 4 ? 'block' : 'none'}>
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: '15px', lg: '18px' }}
          color="gray.400"
          mb="10px"
        >
          Step 4: Personal Details - I
        </Text>
        <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} gap="20px" mb="20px">
          <Information
            boxShadow={cardShadow}
            title="Name"
            value={aadhar.name}
          />
          <Information
            boxShadow={cardShadow}
            title="Address"
            value={permAddress.line1 + ', ' + permAddress.line2}
          />
          <Information
            boxShadow={cardShadow}
            title="Date of Birth"
            value={aadhar.dob?.toLocaleDateString('en-IN')}
          />
          <Information boxShadow={cardShadow} title="Sex" value={aadhar.sex} />
        </SimpleGrid>
      </Card>
      <Card py="15px" mb="20px" display={step > 4 ? 'block' : 'none'}>
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: '15px', lg: '18px' }}
          color="gray.400"
          mb="10px"
        >
          Step 5: Personal Details - II
        </Text>
        <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap="20px" mb="20px">
          <InputField
            id="curr-addr-line1"
            label="Current Address Line 1"
            extra={<Icon as={MdLocationPin} />}
            placeholder="Current Address Line 1"
            type="text"
            onChange={(value) => {
              setCurrAddress({ ...currAddress, line1: String(value) });
            }}
            disabled={step != 5}
            value={currAddress.line1}
          />
          <InputField
            id="curr-addr-line2"
            label="Current Address Line 2"
            extra={<Icon as={MdLocationPin} />}
            placeholder="Current Address Line 2"
            type="text"
            onChange={(value) => {
              setCurrAddress({ ...currAddress, line2: String(value) });
            }}
            disabled={step != 5}
            value={currAddress.line2}
          />
        </SimpleGrid>
        <SimpleGrid columns={{ base: 1, md: 1, xl: 4 }} gap="20px" mb="20px">
          <InputField
            id="curr-addr-pin"
            label="Current Address PIN"
            extra={<Icon as={MdLocationPin} />}
            placeholder="Current Address PIN"
            type="string"
            onChange={(value) => {
              setCurrAddress({ ...currAddress, pinZipcode: String(value) });
            }}
            disabled={step != 5}
            value={currAddress.pinZipcode}
          />
          <Box>
            <Text
              fontSize="sm"
              fontWeight="bold"
              color={useColorModeValue('gray.500', 'gray.200')}
              mb="10px"
            >
              Marital Status
            </Text>
            <Select
              placeholder="Select option"
              onChange={(e) => {
                setApplication({
                  ...application,
                  maritalStatus: e.target.value as Status,
                });
              }}
              value={application.maritalStatus}
            >
              <option value="MARRIED">Married</option>
              <option value="UNMARRIED">Unmarried</option>
              <option value="DIVORCED">Divorced</option>
              <option value="WIDOWED">Widowed</option>
            </Select>
          </Box>
          <Button
            colorScheme="brandScheme"
            variant="solid"
            alignSelf="end" // Align the button towards the bottom
            onClick={incrementProgress}
            isDisabled={step != 5}
            width="50%"
            isLoading={loading && step == 5}
          >
            Continue
          </Button>
        </SimpleGrid>
      </Card>
      <Card py="15px" mb="20px" display={step > 5 ? 'block' : 'none'}>
        <Text
          justifyContent="space-between"
          align="center"
          fontSize={{ sm: '15px', lg: '18px' }}
          color="gray.400"
          mb="10px"
        >
          Step 6: Terms and Conditions
        </Text>
        <Text
          color={textColorPrimary}
          fontWeight="bold"
          fontSize="2xl"
          mt="10px"
          mb="4px"
        >
          Terms and Conditions
        </Text>
        <Text color={textColorSecondary} fontSize="md" me="26px" mb="40px">
          As you click submit button you attest that all the information you
          have provided is true and correct to the best of your knowledge and
          belief. If the information is found to be incorrect, you will be
          liable for any consequences arising out of it. You also agree to the
          terms and conditions of the loan agreement available on the website.
        </Text>
        <Flex>
          <Button
            colorScheme="brandScheme"
            variant="outline"
            alignSelf="end" // Align the button towards the bottom
            onClick={() => {
              window.location.reload();
            }}
            isDisabled={step != 6}
            width="50%"
            mx="50px"
            isLoading={loading && step == 6}
          >
            Reset Form
          </Button>
          <Button
            colorScheme="brandScheme"
            variant="solid"
            alignSelf="end" // Align the button towards the bottom
            onClick={handleSubmitForm}
            isDisabled={step != 6}
            width="50%"
            mx="50px"
            isLoading={loading && step == 6}
          >
            Submit Application
          </Button>
        </Flex>
      </Card>
    </Box>
  );
}
