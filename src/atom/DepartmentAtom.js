import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "recoil-persist",
  storage: localStorage,
});

export const departmentState = atom({
  key: "department",
  default: [],
  // default: [
  //   {
  //     Department: "Admin & HR",
  //     HOD: "Ngozi Ibe",
  //     Department_Id: "DEP001",
  //     Number_of_Staff: 25,
  //   },
  //   {
  //     Department: "Finance",
  //     HOD: "Chinedu Okafor",
  //     Department_Id: "DEP002",
  //     Number_of_Staff: 18,
  //   },
  //   {
  //     Department: "Procurement",
  //     HOD: "Tolulope Oladipo",
  //     Department_Id: "DEP003",
  //     Number_of_Staff: 12,
  //   },
  //   {
  //     Department: "IT Support",
  //     HOD: "Ibrahim Sule",
  //     Department_Id: "DEP004",
  //     Number_of_Staff: 15,
  //   },
  //   {
  //     Department: "Marketing",
  //     HOD: "Amaka Eze",
  //     Department_Id: "DEP005",
  //     Number_of_Staff: 20,
  //   },
  //   {
  //     Department: "Sales",
  //     HOD: "Chijioke Nnamdi",
  //     Department_Id: "DEP006",
  //     Number_of_Staff: 30,
  //   },
  //   {
  //     Department: "Customer Service",
  //     HOD: "Oluwakemi Adebayo",
  //     Department_Id: "DEP007",
  //     Number_of_Staff: 22,
  //   },
  //   {
  //     Department: "Operations",
  //     HOD: "Fatima Musa",
  //     Department_Id: "DEP008",
  //     Number_of_Staff: 27,
  //   },
  //   {
  //     Department: "Research & Development",
  //     HOD: "Gabriel Osei",
  //     Department_Id: "DEP009",
  //     Number_of_Staff: 10,
  //   },
  //   {
  //     Department: "Legal",
  //     HOD: "Funke Adebanjo",
  //     Department_Id: "DEP010",
  //     Number_of_Staff: 8,
  //   },
  // ],
  effects_UNSTABLE: [persistAtom],
});
