import { createSlice } from '@reduxjs/toolkit';


//Καθορισμός αρχικής κατάστασης
const initialState = {
  user: null,
};

//Δημιουργία ενός slice του Redux που θα περιέχει τον reducer, τις actions και την αρχική κατάσταση της εφαρμογής
export const userSlice = createSlice({
  name: 'user',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    //Όταν ένας χρήστης συνδέεται στην εφαρμογή, καλείται ο reducer login
    //ο οποίος και ενημερώνει το πεδίο user της κατάστασης της εφαρμογής μας
    //με τα δεδομένα του συνδεδεμένου χρήστη
    login: (state, action) => {
      state.user = action.payload;
    },
    //Όταν ένας χρήστης αποσυνδέεται, καλείται ο reducer logout ο οποίος και
    //θέτει το πεδίο user της κατάστασης της εφαρμογής μας σε null, υποδηλώνοντας 
    //έτσι ότι δεν υπάρχει συνδεδεμένος χρήστης
    logout: (state) => {
      state.user = null;
    }
  },
});

export const { login, logout } = userSlice.actions;    //Εξαγωγή των ενεργειών
export const selectUser = state => state.user.user;    //Ανάκτηση συνδεδεμένου χρήστη από την κατάσταση της εφαρμογής με σκοπό την χρήση των δεδομένων του
export default userSlice.reducer;