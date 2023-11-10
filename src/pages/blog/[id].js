import React, { useState, useEffect } from "react";
import { getPostsById } from "../api/posts";
import { getCommentById } from "../api/comment";
import { getTodoById } from "../api/todos";
import Navbar from "@/component/Navbar";
import Footer from "@/component/Footer";
import {
  Box,
  Heading,
  Image,
  Text,
  Divider,
  HStack,
  Tag,
  Wrap,
  WrapItem,
  SpaceProps,
  useColorModeValue,
  Container,
  VStack,
  Avatar,
  Flex,
  chakra,
  Modal,
  ModalBody,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalOverlay,
  ModalFooter,
  FormControl as FormErrorMessage,
  FormLabel as ChakraFormLabel,
  useToast,
  Icon,
  useDisclosure,
  Button,
  Input,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { FiPlus } from "react-icons/fi";
import InputField from "@/component/InputField";
import InputFieldComment from "@/component/InputFieldComments";
import axios from "axios";

const BlogTags = (props) => {
  const { marginTop = 0, tags } = props;

  return (
    <HStack spacing={2} marginTop={marginTop}>
      {tags.map((tag) => {
        return (
          <Tag size={"md"} variant="solid" colorScheme="orange" key={tag}>
            {tag}
          </Tag>
        );
      })}
    </HStack>
  );
};

export default function Page({ postId }) {
  const [category, setCategory] = useState({});
  const [filteredCategory, setFilteredCategory] = useState([]);
  const [comments, setComments] = useState([]);
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      const data = await getPostsById(postId);
      setCategory(data);
      setFilteredCategory(data);
    };
    const fetchComments = async () => {
      const data = await getCommentById(postId);
      setComments(data);
    };
    const fetchTodo = async () => {
      const data = await getTodoById(postId);
      setTodo(data);
    };
    fetchCategory();
    fetchComments();
    fetchTodo();
  }, [postId]);

  // console.log("todo", todo);
  // console.log("comments", comments);
  console.log("category", category);

  // const flattenedData = comments.flatMap((item) => item.data);
  // console.log("flattnedData", flattenedData);

  return (
    <>
      <Navbar />
      <Container maxW={"7xl"} p="12">
        <Heading as="h1">Detail Blog Post</Heading>
        <InputComment fetchComments={comments} id={postId} />
        <Box
          marginTop={{ base: "1", sm: "5" }}
          display="flex"
          flexDirection={{ base: "column", sm: "row" }}
          justifyContent="space-between"
          key={category.id}>
          <Box
            display="flex"
            flex="1"
            marginRight="3"
            position="relative"
            alignItems="center">
            <Box
              width={{ base: "100%", sm: "85%" }}
              zIndex="2"
              marginLeft={{ base: "0", sm: "5%" }}
              marginTop="5%">
              <Box textDecoration="none" _hover={{ textDecoration: "none" }}>
                <Image
                  borderRadius="lg"
                  src={
                    "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80"
                  }
                  alt="some good alt text"
                  objectFit="contain"
                />
              </Box>
            </Box>
            <Box zIndex="1" width="100%" position="absolute" height="100%">
              <Box
                bgGradient={useColorModeValue(
                  "radial(orange.600 1px, transparent 1px)",
                  "radial(orange.300 1px, transparent 1px)"
                )}
                backgroundSize="20px 20px"
                opacity="0.4"
                height="100%"
              />
            </Box>
          </Box>
          <Box
            display="flex"
            flex="1"
            flexDirection="column"
            justifyContent="center"
            marginTop={{ base: "3", sm: "0" }}>
            <BlogTags tags={["Engineering", "Product"]} />
            <Heading marginTop="1">
              <Text textDecoration="none" _hover={{ textDecoration: "none" }}>
                {category.title}
              </Text>
            </Heading>
            <Text
              as="p"
              marginTop="2"
              color={useColorModeValue("gray.700", "gray.200")}
              fontSize="lg">
              {category.body}
            </Text>
            <BlogAuthor name={category.id} userId={category.user_id} />
          </Box>
        </Box>
        <Divider marginTop="5" />
      </Container>
      <Container maxW={"7xl"} p="12">
        <VStack paddingTop="40px" spacing="2" alignItems="flex-start">
          <Heading as="h2">Comments Users</Heading>

          {comments.map((comment) => (
            <Flex
              boxShadow={"lg"}
              maxW={"640px"}
              direction={{ base: "column-reverse", md: "row" }}
              width={600}
              rounded={"xl"}
              p={10}
              justifyContent={"space-between"}
              position={"relative"}
              bg={useColorModeValue("white", "gray.800")}
              _after={{
                content: '""',
                position: "absolute",
                height: "21px",
                width: "29px",
                left: "35px",
                top: "-10px",
                backgroundSize: "cover",
                backgroundImage: `url("data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='29' height='21' viewBox='0 0 29 21' fill='none'%3E%3Cpath d='M6.91391 21C4.56659 21 2.81678 20.2152 1.66446 18.6455C0.55482 17.0758 0 15.2515 0 13.1727C0 11.2636 0.405445 9.43939 1.21634 7.7C2.0699 5.91818 3.15821 4.3697 4.48124 3.05454C5.84695 1.69697 7.31935 0.678787 8.89845 0L13.3157 3.24545C11.5659 3.96667 9.98676 4.94242 8.57837 6.17273C7.21266 7.36061 6.25239 8.63333 5.69757 9.99091L6.01766 10.1818C6.27373 10.0121 6.55114 9.88485 6.84989 9.8C7.19132 9.71515 7.63944 9.67273 8.19426 9.67273C9.34658 9.67273 10.4776 10.097 11.5872 10.9455C12.7395 11.7939 13.3157 13.1091 13.3157 14.8909C13.3157 16.8848 12.6542 18.4121 11.3311 19.4727C10.0508 20.4909 8.57837 21 6.91391 21ZM22.5982 21C20.2509 21 18.5011 20.2152 17.3488 18.6455C16.2391 17.0758 15.6843 15.2515 15.6843 13.1727C15.6843 11.2636 16.0898 9.43939 16.9007 7.7C17.7542 5.91818 18.8425 4.3697 20.1656 3.05454C21.5313 1.69697 23.0037 0.678787 24.5828 0L29 3.24545C27.2502 3.96667 25.6711 4.94242 24.2627 6.17273C22.897 7.36061 21.9367 8.63333 21.3819 9.99091L21.702 10.1818C21.9581 10.0121 22.2355 9.88485 22.5342 9.8C22.8756 9.71515 23.3238 9.67273 23.8786 9.67273C25.0309 9.67273 26.1619 10.097 27.2715 10.9455C28.4238 11.7939 29 13.1091 29 14.8909C29 16.8848 28.3385 18.4121 27.0155 19.4727C25.7351 20.4909 24.2627 21 22.5982 21Z' fill='%239F7AEA'/%3E%3C/svg%3E")`,
              }}
              _before={{
                content: '""',
                position: "absolute",
                zIndex: "-1",
                height: "full",
                maxW: "640px",
                width: "full",
                filter: "blur(40px)",
                transform: "scale(0.98)",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                top: 0,
                left: 0,
              }}
              key={comment.id}>
              <Flex
                direction={"column"}
                textAlign={"left"}
                justifyContent={"space-between"}>
                <chakra.p
                  fontFamily={"Inter"}
                  fontWeight={"medium"}
                  fontSize={"15px"}
                  pb={4}>
                  {comment.body}
                </chakra.p>
                <chakra.p
                  fontFamily={"Work Sans"}
                  fontWeight={"bold"}
                  fontSize={14}>
                  {comment.email}
                  <chakra.span
                    fontFamily={"Inter"}
                    fontWeight={"medium"}
                    color={"gray.500"}>
                    {" "}
                    - {comment.name}
                  </chakra.span>
                </chakra.p>
              </Flex>
              <Avatar
                // src={avatar}
                height={"80px"}
                width={"80px"}
                alignSelf={"center"}
                m={{ base: "0 0 35px 0", md: "0 0 0 50px" }}
              />
            </Flex>
          ))}
        </VStack>
      </Container>
      <Footer />
    </>
  );
}

export const InputComment = ({ fetchComments, id }) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [isOpen, setIsOpen] = useState(false);
  const toast = useToast();
  console.log("INI ID", id);

  const onSubmit = async (data) => {
    try {
      await axios.post(
        `https://gorest.co.in/public/v2/posts/${id}/comments`,
        data,
        {
          headers: {
            Authorization: `Bearer b0056e40835423c6cb4d1dfac654f500525c79537f446ac022e8ff79851f6137`,
          },
        }
      );
      handleCloseModal(),
        toast({
          title: "Created Category",
          description: "Successfully created category",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      fetchSurvey();
      reset();
    } catch (error) {
      toast({
        title: "Failed to create category",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <Box>
      <Button
        size="sm"
        bgColor={"#06283D"}
        color={"#EEEDED"}
        leftIcon={<FiPlus />}
        onClick={handleOpenModal}
        borderRadius={"full"}
        boxShadow={"0px 0px 3px 0px #06283D"}
        _hover={{
          bg: "#164B60",
          color: "#EEEDED",
        }}>
        Create new Comment
      </Button>
      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Comment Form</ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({ field }) => <Input {...field} placeholder="Name" />}
              />

              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => <Input {...field} placeholder="Email" />}
              />

              <Controller
                name="body"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input {...field} placeholder="Comment" />
                )}
              />

              <Button
                type="submit"
                size={"md"}
                colorScheme="blue"
                // isLoading={isSubmitting}
                rounded={"full"}
                w={"100%"}>
                create comment
              </Button>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button
              size={"sm"}
              colorScheme="red"
              rounded={"full"}
              fontWeight={"semibold"}
              onClick={handleCloseModal}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

const BlogAuthor = ({ name, userId }) => {
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      <Image
        borderRadius="full"
        boxSize="40px"
        src="https://100k-faces.glitch.me/random-image"
        alt={`Avatar of ${name}`}
      />
      <Text fontWeight="medium">{name}</Text>
      <Text>—</Text>
      <Text>{userId}</Text>
    </HStack>
  );
};

export async function getServerSideProps(ctx) {
  const { id } = ctx.query;

  return { props: { postId: id } };
}
