import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { getPosts } from "@/pages/api/posts";
import { useRouter } from "next/router";
import ReactPaginate from "react-paginate";
import {
  Flex,
  Box,
  Text,
  Heading,
  Image,
  Divider,
  HStack,
  Tag,
  Wrap,
  WrapItem,
  SpaceProps,
  useColorModeValue,
  Container,
  VStack,
  Button,
} from "@chakra-ui/react";
import CardComment from "./CardComment";

const ListBlog = () => {
  const [todos, setTodos] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const postsPerPage = 1; // Jumlah posting per halaman
  const pageCount = Math.ceil(todos.length / postsPerPage);
  const router = useRouter();

  useEffect(() => {
    getPosts().then((data) => {
      setTodos(data);
    });
  }, []);

  console.log("INI TODO", todos);

  const handlePageChange = ({ selected }) => {
    setPageNumber(selected);
  };

  const displayPosts = todos
    .slice(pageNumber * postsPerPage, (pageNumber + 1) * postsPerPage)
    .map((post) => (
      <Container maxW={"7xl"} p="12">
        <Box display={"flex"} justifyContent={"space-between"}>
          <Heading as="h1">Blog Post</Heading>
          <Button onClick={() => router.push(`/blog/${post.id}`)}>
            Read More
          </Button>
        </Box>
        <Box
          marginTop={{ base: "1", sm: "5" }}
          display="flex"
          flexDirection={{ base: "column", sm: "row" }}
          justifyContent="space-between"
          key={post.id}>
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
            <Heading marginTop="1">
              <Text textDecoration="none" _hover={{ textDecoration: "none" }}>
                {post.title}
              </Text>
            </Heading>
            <Text
              as="p"
              marginTop="2"
              color={useColorModeValue("gray.700", "gray.200")}
              fontSize="lg">
              {post.body}
            </Text>
            <BlogAuthor name={post.id} userId={post.user_id} />
          </Box>
        </Box>
      </Container>
    ));

  return (
    <>
      <Navbar />
      {displayPosts}
      <Flex flexDirection={"row"} alignItems="center" justifyContent="center">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={
            "pagination w-full flex justify-center gap-[13px] text-secondary/base font-[700]"
          }
          previousClassName="py-[8px] px-[15px]"
          nextClassName="py-[8px] px-[15px]"
          pageClassName="py-[8px] px-[15px]"
          activeClassName={
            "text-[white] py-[8px] px-[15px] bg-secondary/base rounded-[5px]"
          }
        />
      </Flex>
      <CardComment />
      <Footer />
    </>
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

export default ListBlog;
