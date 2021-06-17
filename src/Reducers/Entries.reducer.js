import entriesTypes from "../Reducers/Action/Entries.action";

export default (state = initialEntries, action) => {
  let newEntries;
  switch (action.type) {
    case entriesTypes.POPULATE_ENTRIES:
      return action.payload;
    case entriesTypes.ADD_ENTRY:
      newEntries = state.concat({ ...action.payload });
      return newEntries;
    case entriesTypes.REMOVE_ENTRY:
      newEntries = state.filter((entry) => entry.id !== action.payload.id);
      return newEntries;
    case entriesTypes.UPDATE_ENTRY:
      newEntries = [...state];
      const index = newEntries.findIndex(
        (entry) => entry.id === action.payload.id
      );

      console.log("payload entry", action.payload.entry);
      newEntries[index] = { ...action.payload.entry };
      return newEntries;
    default:
      return state;
  }
};

var initialEntries = [];
