import { atom } from "jotai";

const storedUser = JSON.parse(localStorage.getItem("user")) || null;

export const userAtom = atom(storedUser);


export const userAtomWithPersistence = atom(
  (get) => get(userAtom),
  (get, set, newUser) => {
    set(userAtom, newUser);
    if (newUser) {
      localStorage.setItem("user", JSON.stringify(newUser)); 
    } else {
      localStorage.removeItem("user"); 
    }
  }
);
