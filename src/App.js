import "./App.css";
import { Container, Header, Statistic } from "semantic-ui-react";
import MainHeader from "./components/MainHeader";
import NewEntryForm from "./components/NewEntryForm";
import DisplayBalances from "./components/DisplayBalances";
import { useEffect, useState } from "react";
import EntryLines from "./components/EntryLines";
import ModalEdit from "./components/ModalEdit";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getAllEntries } from "./Reducers/Action/Entries.action";

function App() {
  const [entryId, setEntryId] = useState();
  const [incomeTotal, setIncomeTotal] = useState(0);
  const [expenseTotal, setExpenseTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [entry, setEntry] = useState();
  const entries = useSelector((state) => state.entries);
  const { isOpen, id } = useSelector((state) => state.modals);

  useEffect(() => {
    const index = entries.findIndex((entry) => entry.id === id);
    setEntry(entries[index]);
  }, [isOpen, id, entries]);

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

  async function fetchInitialData() {
    const result = await axios.get("http://localhost:3000/entries");
    console.log(result);
  }

  // useEffect(() => {
  //   fetchInitialData();
  // }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllEntries());
  }, []);

  return (
    <Container>
      <MainHeader title="Budget" />
      <Statistic>
        <Statistic.Label>Your Balance:</Statistic.Label>
        <Statistic.Value>${total}</Statistic.Value>
      </Statistic>
      <DisplayBalances incomeTotal={incomeTotal} expenseTotal={expenseTotal} />
      <Header as="h3">History</Header>

      <EntryLines entries={entries} />
      <ModalEdit isOpen={isOpen} {...entry} />

      <MainHeader title="Add new transaction" />
      <NewEntryForm />
    </Container>
  );
}

var initialEntries = [
  {
    id: 1,
    description: "Work income redux",
    value: 1000,
    isExpense: false,
  },
  {
    id: 2,
    description: "Water bill redux",
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
    description: "Power bill redux",
    value: 50,
    isExpense: true,
  },
];

export default App;
