import { useState, useContext, createContext, useEffect } from "react";
import Button from "../button/Button";

const WizardContext = createContext({
  currentPage: 1,
  changePage: () => {},
});

const Page = ({ children, pageIndex }) => {
  const { currentPage } = useContext(WizardContext);

  return currentPage === pageIndex ? children : null;
};

const Controls = () => {
  const { changePage, currentPage } = useContext(WizardContext);
  const [changeNumber, setChangeNumber] = useState(1);

  useEffect(() => {
    if (currentPage > 1) {
      setChangeNumber(-1);
    } else {
      setChangeNumber(1);
    }
  }, [currentPage]);

  return (
    <div>
      <Button onClick={() => changePage(currentPage + changeNumber)}>
        {changeNumber === 1 ? "Next" : "Previous"}
      </Button>
    </div>
  );
};

const Wizard = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const changePage = (newPageIndex) => {
    setCurrentPage(newPageIndex);
  };

  return (
    <WizardContext.Provider value={{ currentPage, changePage }}>
      {children}
      <Controls />
    </WizardContext.Provider>
  );
};

export { Wizard, Page, Controls };
