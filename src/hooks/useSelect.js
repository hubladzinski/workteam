import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getPeople } from "../reducers/peopleSlice";

export const useSelect = (selectedInitial = []) => {
  const dispatch = useDispatch();
  const { people, status } = useSelector((state) => state.people);
  const [inputValue, setInputValue] = useState("");
  const [peopleArray, setPeopleArray] = useState();
  const [peopleFiltered, setPeopleFiltered] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selected, setSelected] = useState(selectedInitial);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (status === "idle") {
      dispatch(getPeople());
    }
  }, [dispatch, status]);

  useEffect(() => {
    setPeopleArray(people);
  }, [people]);

  useEffect(() => {
    if (peopleArray) {
      let filter = peopleArray.filter((item) => {
        return item.name
          .replace(/ /g, "")
          .toLowerCase()
          .includes(inputValue.toLowerCase());
      });
      setPeopleFiltered(filter);
    }
  }, [peopleArray, inputValue]);

  useEffect(() => {
    if (inputValue === "") {
      setShowDropdown(false);
    } else {
      if (peopleFiltered.length > 0) {
        setShowDropdown(true);
      } else {
        setShowDropdown(false);
      }
    }
  }, [peopleFiltered, inputValue]);

  const handleClickAdd = (_id) => {
    setSelected((prevSelected) => {
      let personAdded = peopleArray.filter((item) => item._id === _id);
      let newPeopleArray = peopleArray.filter((item) => item._id !== _id);
      setPeopleArray(newPeopleArray);
      return [...prevSelected, ...personAdded];
    });
  };

  const handleClickRemove = (_id) => {
    setPeopleArray((prevPeopleArray) => {
      let personAdded = selected.filter((item) => item._id === _id);
      let newSelectedArray = selected.filter((item) => item._id !== _id);
      setSelected(newSelectedArray);
      return [...prevPeopleArray, ...personAdded];
    });
  };

  const handleOpen = () => {
    setOpen((prevState) => !prevState);
  };

  const handleInput = (value) => {
    setInputValue(value);
  };

  return {
    peopleFiltered,
    showDropdown,
    selected,
    open,
    inputValue,
    handleInput,
    handleClickAdd,
    handleClickRemove,
    handleOpen,
  };
};
