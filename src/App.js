import "./App.css";
import {
  Container,
  Grid,
  Header,
  Icon,
  Segment,
  Statistic,
} from "semantic-ui-react";
import MainHeader from "./components/MainHeader";
import NewEntryForm from "./components/NewEntryForm";
import DisplayBalances from "./components/DisplayBalances";
import { useEffect, useState } from "react";
import EntryLines from "./components/EntryLines";
import ModalEdit from "./components/ModalEdit";

function App() {
  const [entries, setEntires] = useState(initialEntries);
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const [isExpense, setIsExpense] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [entryId, setEntryId] = useState();
  const [incomeTotal, setIncomeTotal] = useState(0);
  const [expenseTotal, setExpenseTotal] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (!isOpen && entryId) {
      const index = entries.findIndex((entry) => entry.id === entryId);
      const newEntries = [...entries];
      newEntries[index].description = description;
      newEntries[index].value = value;
      newEntries[index].isExpense = isExpense;
      setEntires(newEntries);
      resetEntry();
    }
  }, [isOpen]);

  useEffect(() => {
    let totalIncome = 0;
    let totalExpenses = 0;

    entries.map((entry) => {
      if (entry.isExpense) {
        return (totalExpenses += Number(entry.value));
      } else {
        return (totalIncome += Number(entry.value));
      }
    });
    let total = totalIncome - totalExpenses;
    setTotal(total);
    setExpenseTotal(totalExpenses);
    setIncomeTotal(totalIncome);

    console.log(
      `total income is: ${totalIncome} and total expenses are ${totalExpenses} `
    );
  }, [entries]);

  function resetEntry() {
    setDescription("");
    setValue("");
    setIsExpense(true);
  }

  function deleteEntry(id) {
    const result = entries.filter((entry) => entry.id !== id);
    setEntires(result);
  }

  function addEntry() {
    const result = entries.concat({
      id: entries.length + 1,
      description,
      value,
      isExpense,
    });
    console.log("entries", entries);
    console.log("result", result);
    setEntires(result);
    resetEntry();
  }

  function editEntry(id) {
    console.log(`edit entry with id ${id}`);

    if (id) {
      const index = entries.findIndex((entry) => entry.id === id);
      console.log("index", index);
      const entry = entries[index];
      console.log("entry", entry.id);
      setEntryId(id);
      setDescription(entry.description);
      setValue(entry.value);
      setIsExpense(entry.isExpense);
      setIsOpen(true);
    }
  }

  return (
    <Container>
      <MainHeader title="Budget" />
      <Statistic>
        <Statistic.Label>Your Balance:</Statistic.Label>
        <Statistic.Value>${total}</Statistic.Value>
      </Statistic>
      <DisplayBalances incomeTotal={incomeTotal} expenseTotal={expenseTotal} />
      <Header as="h3">History</Header>

      <EntryLines
        entries={entries}
        deleteEntry={deleteEntry}
        editEntry={editEntry}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <ModalEdit
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        addEntry={addEntry}
        description={description}
        value={value}
        isExpense={isExpense}
        setDescription={setDescription}
        setValue={setValue}
        setIsExpense={setIsExpense}
      />

      <MainHeader title="Add new transaction" />
      <NewEntryForm
        addEntry={addEntry}
        description={description}
        value={value}
        setValue={setValue}
        isExpense={isExpense}
        setDescription={setDescription}
        setValue={setValue}
        setIsExpense={setIsExpense}
      />
    </Container>
  );
}

var initialEntries = [
  {
    id: 1,
    description: "Work income",
    value: 1000,
    isExpense: false,
  },
  {
    id: 2,
    description: "Water bill",
    value: 2000,
    isExpense: true,
  },
  {
    id: 3,
    description: "Rent",
    value: 300,
    isExpense: true,
  },
  {
    id: 4,
    description: "Power bill",
    value: 50,
    isExpense: true,
  },
];

export default App;
