import React, { useState } from "react";
import {
  Input,
  InputRightElement,
  InputGroup,
  Button,
  Stack,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import axios from "axios";

const UserFilter = ({ onFilter }) => {
  const [filterValue, setFilterValue] = useState("");

  const handleFilter = () => {
    onFilter(filterValue);
  };

  return (
    <InputGroup size="md" w={"20%"}>
      <Input
        type="text"
        placeholder="Search user..."
        value={filterValue}
        onChange={(e) => setFilterValue(e.target.value)}
      />
      <InputRightElement>
        <Button colorScheme="blue" onClick={handleFilter}>
          <SearchIcon color="white" cursor="pointer" />
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

export default UserFilter;
