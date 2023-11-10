import React, { useState, useEffect } from "react";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../api/users";
import Navbar from "@/component/Navbar";
import Footer from "@/component/Footer";
import { useRouter } from "next/router";
import {
  Box,
  Grid,
  Text,
  Button,
  TableContainer,
  TableCaption,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
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
  Skeleton,
  extendTheme,
  ChakraProvider,
  CSSReset,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { FiPlus, FiEdit, FiDelete } from "react-icons/fi";
import { SearchIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useForm } from "react-hook-form";
import ModalConfirmation from "@/component/ModalConfirmation";
import InputField from "@/component/InputField";
import UserFilter from "@/component/UserFilter";

const index = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const toast = useToast();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [detailCategory, setDetailCategory] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
  } = useForm();

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
    setFilteredUsers(data);
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (detailCategory) {
      setValue("name", detailCategory.name);
      setValue("description", detailCategory.description);
    }
  }, [detailCategory, isModalOpen]);

  const handleFilter = (filterValue) => {
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(filterValue.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  // console.log("filteredUsers", filteredUsers);

  const handleEdit = async (id) => {
    const foundProduct = await getUserById(id);
    setDetailCategory(foundProduct);
    if (foundProduct) {
      setEditItemId(id);
      setIsModalOpen(true);
    }
  };

  const handleDeleteItems = async (id) => {
    try {
      await deleteUser(id);
      handleCloseModal(),
        toast({
          title: "Delete Category",
          description: "Successfully deleted category",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      fetchUsers();
    } catch (error) {
      toast({
        title: "Failed to delete category",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const onSubmit = async (data) => {
    try {
      await axios.put(
        `https://gorest.co.in/public/v2/users/${editItemId}`,
        data,
        {
          headers: {
            Authorization: `Bearer b0056e40835423c6cb4d1dfac654f500525c79537f446ac022e8ff79851f6137`,
          },
        }
      );
      handleCloseModal();
      toast({
        title: "Update Product",
        description: "Successfully updated Product",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      fetchUsers();
      reset();
    } catch (error) {
      toast({
        title: "Failed to update product",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Navbar />
      <Box
        maxW="7xl"
        mx={"auto"}
        pt={{ base: 2, sm: 12, md: 17 }}
        mt={"5em"}
        mb={10}>
        <Box
          display={"flex"}
          flexDirection={"row"}
          justifyContent={"space-between"}
          mb={"6em"}
          pb={"10"}>
          <InputCategory fetchUsers={fetchUsers} />

          <UserFilter onFilter={handleFilter} />
        </Box>
        <TableContainer overflowY={"auto"} h={"25em"} px={5}>
          <Table variant="simple" size={"md"}>
            <Thead bg={"#06283D"}>
              <Tr>
                <Th color={"#EEEDED"}>Id</Th>
                <Th color={"#EEEDED"}>Name</Th>
                <Th color={"#EEEDED"}>Email</Th>
                <Th color={"#EEEDED"}>Gender</Th>
                <Th color={"#EEEDED"}>Status</Th>
                <Th color={"#EEEDED"}>Action</Th>
              </Tr>
            </Thead>
            <Tbody bg={"#EEEDED"}>
              {filteredUsers.map((user) => (
                <Tr key={user.id}>
                  <Td
                    whiteSpace={"nowrap"}
                    textOverflow={"ellipsis"}
                    overflow={"hidden"}
                    title={user.name}
                    maxWidth={"250px"}
                    onClick={() => router.push(`/users/${user.id}`)}
                    cursor={"pointer"}
                    py={2}>
                    {user.id}
                  </Td>
                  <Td cursor={"pointer"} py={2}>
                    {user.name}
                  </Td>
                  <Td py={2}>{user.email}</Td>
                  <Td py={2}>{user.gender}</Td>
                  <Td py={2}>{user.status}</Td>

                  <Td py={2}>
                    <Icon
                      backgroundColor={"#06283D"}
                      color={"#ffff"}
                      onClick={() => handleEdit(user.id)}
                      as={FiEdit}
                      mx={3}
                      _hover={{
                        cursor: "pointer",
                        color: "#4F709C",
                      }}
                      title="edit"
                    />
                    <Icon
                      color={"red"}
                      onClick={() => {
                        setDeleteId(user.id);
                        onOpen();
                      }}
                      as={FiDelete}
                      _hover={{
                        cursor: "pointer",
                        color: "#EF6262",
                      }}
                      title="Delete"
                    />
                  </Td>
                </Tr>
              ))}
              <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader textAlign="center">Edit Users</ModalHeader>
                  <ModalBody>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <InputField
                        label={"Name"}
                        name={"name"}
                        placeholder={"Insert name"}
                        register={register("name", {
                          required: "This is required",
                        })}
                        errors={errors.name}
                      />
                      <InputField
                        label={"Email"}
                        name={"email"}
                        placeholder={"Insert email"}
                        register={register("email", {
                          required: "This is required",
                        })}
                        errors={errors.email}
                      />
                      <InputField
                        label={"Gender"}
                        name={"gender"}
                        placeholder={"Insert gender"}
                        register={register("gender", {
                          required: "This is required",
                        })}
                        errors={errors.gender}
                      />
                      <InputField
                        label={"Status"}
                        name={"status"}
                        placeholder={"Insert status"}
                        register={register("status", {
                          required: "This is required",
                        })}
                        errors={errors.status}
                      />

                      <Button
                        type="submit"
                        size={"md"}
                        colorScheme="blue"
                        // isLoading={isSubmitting}
                        rounded={"full"}
                        w={"100%"}>
                        Update Users
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
            </Tbody>
          </Table>
        </TableContainer>
        <ModalConfirmation
          isOpen={isOpen}
          onClose={onClose}
          name={"category"}
          onClick={() => {
            handleDeleteItems(deleteId);
            onClose();
          }}
        />
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader textAlign="center">Edit Users</ModalHeader>
            <ModalBody>
              <form onSubmit={handleSubmit(onSubmit)}>
                <InputField
                  label={"Name"}
                  name={"name"}
                  placeholder={"Insert name"}
                  register={register("name", {
                    required: "This is required",
                  })}
                  errors={errors.name}
                />
                <InputField
                  label={"Email"}
                  name={"email"}
                  placeholder={"Insert email"}
                  register={register("email", {
                    required: "This is required",
                  })}
                  errors={errors.email}
                />
                <InputField
                  label={"Gender"}
                  name={"gender"}
                  placeholder={"Insert gender"}
                  register={register("gender", {
                    required: "This is required",
                  })}
                  errors={errors.gender}
                />
                <InputField
                  label={"Status"}
                  name={"status"}
                  placeholder={"Insert status"}
                  register={register("status", {
                    required: "This is required",
                  })}
                  errors={errors.status}
                />

                <Button
                  type="submit"
                  size={"md"}
                  colorScheme="blue"
                  isLoading={isSubmitting}
                  rounded={"full"}
                  w={"100%"}>
                  Update Users
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
      <Footer />
    </>
  );
};

export const InputCategory = ({ fetchUsers }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [isOpen, setIsOpen] = useState(false);
  const toast = useToast();

  const onSubmit = async (data) => {
    try {
      await axios.post("https://gorest.co.in/public/v2/users", data, {
        headers: {
          Authorization: `Bearer b0056e40835423c6cb4d1dfac654f500525c79537f446ac022e8ff79851f6137`,
        },
      });
      handleCloseModal(),
        toast({
          title: "Created Category",
          description: "Successfully created category",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top",
        });
      fetchUsers();
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
        Create new users
      </Button>
      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">Users Form</ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <InputField
                label={"Name"}
                name={"name"}
                placeholder={"Insert name"}
                register={register("name", {
                  required: "This is required",
                })}
                errors={errors.name}
              />
              <InputField
                label={"Email"}
                name={"email"}
                placeholder={"Insert email"}
                register={register("email", {
                  required: "This is required",
                })}
                errors={errors.email}
              />
              <InputField
                label={"Gender"}
                name={"gender"}
                placeholder={"Insert gender"}
                register={register("gender", {
                  required: "This is required",
                })}
                errors={errors.gender}
              />
              <InputField
                label={"Status"}
                name={"status"}
                placeholder={"Insert status"}
                register={register("status", {
                  required: "This is required",
                })}
                errors={errors.status}
              />

              <Button
                type="submit"
                size={"md"}
                colorScheme="blue"
                // isLoading={isSubmitting}
                rounded={"full"}
                w={"100%"}>
                create users
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

export default index;
