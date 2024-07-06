const btn = document.querySelector(".btn");
const inputLabels = document.querySelectorAll(".app-header-item label");
const inputs = document.querySelectorAll(".app-header-item input");
const dayInput = inputs[0],
   monthInput = inputs[1],
   yearInput = inputs[2];

const errorMsg = document.querySelectorAll(".error-msg");
const resInputs = document.querySelectorAll(".app-result-item span");

const res = [0, 0, 0];
let validField = [1, 1, 1];

const getIdx = ["day", "month", "year"];

const generateError = () => {
   let flag = true;
   for (let i = 0; i < 3; i++) {
      if (validField[i] != 1) {
         flag = false;
         errorMsg[i].style.display = "block";

         let msg;
         if (validField[i] == 2) msg = "This field is required";
         else msg = `Must be a valid ${getIdx[i]}`;

         errorMsg[i].textContent = `${msg}`;
      } else {
         errorMsg[i].style.display = "hidden";
         errorMsg[i].textContent = "";
      }
      inputs[i].style.borderColor = `hsl(0,100%,67%)`;
      inputLabels[i].style.color = `hsl(0,100%,67%)`;
   }
   return flag;
};
const renderValid = () => {
   for (let i = 0; i < 3; i++) {
      inputs[i].style.borderColor = `hsl(0, 0%, 86%)`;
      inputLabels[i].style.color = `hsl(0, 0%, 8%)`;
      errorMsg[i].style.display = "hidden";
      errorMsg[i].textContent = "";
   }
};
let currDate, day, month, year;
const isValid = () => {
   validField = [1, 1, 1];
   if (!day) validField[0] = 2;
   else if (day > 30 || day < 1) validField[0] = 3;

   if (!month) validField[1] = 2;
   else if (month < 1 || month > 12) validField[1] = 3;

   if (!year) validField[2] = 2;
   else if (year > currDate.getFullYear()) validField[2] = 3;

   return generateError();
};

const renderAge = () => {
   for (let idx = 0; idx < resInputs.length; idx++) {
      resInputs[idx].textContent = res[idx];
   }
};
btn.addEventListener("click", function () {
   // getting the user input
   currDate = new Date();
   day = dayInput.value;
   month = monthInput.value;
   year = yearInput.value;

   // validating inputs
   if (isValid(day, month, year, currDate)) {
      renderValid();
      res[0] = currDate.getFullYear() - year;
      res[1] = currDate.getMonth() - month + 1;
      res[2] = currDate.getDate() - day;

      // calculating correct age
      if (res[2] < 0) {
         res[2] += 30;
         res[1]--;
      }
      if (res[1] < 0) {
         res[1] += 12;
         res[0]--;
      }

      renderAge();
   }
});
