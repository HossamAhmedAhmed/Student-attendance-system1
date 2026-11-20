let studentNameInput = document.getElementById("stName");
let studentNumInput = document.getElementById("stNum");
let studentPresentInput = document.getElementById("stPresent");
let studentGroupInput = document.getElementById("stGroup");
let studentClockInput = document.getElementById("stClock");
let studentDateInput = document.getElementById("stDate");
let btn = document.getElementById("addBtn");
let searchName = document.getElementById("searchName");
let stGroupSearch = document.getElementById("stGroupSearch");
let stDateSearch = document.getElementById("stDateSearch");
let stPresentSearch = document.getElementById("logSearch");
let total = document.getElementById("total");
let present = document.getElementById("present");
let absent = document.getElementById("absent");
let dates = document.getElementById("dates");

let studentList = [];

if (localStorage.getItem("student") != null) {
  studentList = JSON.parse(localStorage.getItem("student"));
  displayStudent();
}

let isUpdated = false;
function createStudent() {
  if(validation(studentNameInput,'nameMsg') &&
    validation(studentNumInput,'numMsg') && 
    validation(studentPresentInput,'prMsg') &&
     validation(studentGroupInput,'grMsg') &&
    validation(studentDateInput,'dtMsg')){
    if (isUpdated) {
    updated();
    displayStudent();
    clear();
   }else {
    let student = {
      stName: studentNameInput.value,
      stNum: studentNumInput.value,
      stPresent: studentPresentInput.value,
      stGroup: studentGroupInput.value,
      stClock: timeDiff(studentClockInput.value),
      stDate: studentDateInput.value,
    };

    studentList.push(student);
    localStorage.setItem("student", JSON.stringify(studentList));
    displayStudent();
    clear();
  }
  }
}

btn.addEventListener("click", () => {
  createStudent();
});

function displayStudent() {
  let box = ``;
  let text = searchName.value;
  let num = 0;
  for (let i = 0; i < studentList.length; i++) {
    num++;
    if (studentList[i].stName.toLowerCase().includes(text.toLowerCase())) {
      box += `
        <tr>
                <th class="text-danger">${num}</th>
                <td>${studentList[i].stName}</td>
                <td>${studentList[i].stGroup}</td>
                <td>${studentList[i].stClock}</td>
                <td>${studentList[i].stNum}</td>
                <td>${studentList[i].stDate}</td>
                <td class=${studentList[i].stPresent == "حاضر" ? "bg-green" : "bg-red"}>${studentList[i].stPresent}</td>
                <td class="text-center"><button class="btn btn-warning" onclick="edit(${i})"><i class="fa-solid fa-pen"></i></button> <button class="btn btn-danger" onclick="deleteStudent(${i})"><i class="fa-solid fa-trash"></i></button></td>
        </tr>
        `;
    }
  }

  document.getElementById("dataRow").innerHTML = box;
}

//clear
function clear() {
  studentClockInput.value = null;
  studentDateInput.value = null;
  studentGroupInput.selectedIndex = 0;
  studentNameInput.value = null;
  studentNumInput.value = null;
  studentPresentInput.selectedIndex = 0;
  studentNameInput.classList.remove('is-valid','is-invalid');
  studentNumInput.classList.remove('is-valid','is-invalid');
  studentPresentInput.classList.remove('is-valid','is-invalid');
  studentGroupInput.classList.remove('is-valid','is-invalid');
  studentDateInput.classList.remove('is-valid','is-invalid');
}

//delete
function deleteStudent(index) {
  studentList = studentList.filter((item, i) => {
    return index != i;
  });
  localStorage.setItem("student", JSON.stringify(studentList));
  displayStudent();
}

let updateIndex = 0;
function edit(index) {
  updateIndex = index;
  studentClockInput.value = studentList[index].stClock;
  studentDateInput.value = studentList[index].stDate;
  studentGroupInput.value = studentList[index].stGroup;
  studentNameInput.value = studentList[index].stName;
  studentNumInput.value = studentList[index].stNum;
  studentPresentInput.value = studentList[index].stPresent;
  isUpdated = true;
  btn.innerHTML = `تعديل طالب`;
}

function updated() {
  studentList[updateIndex].stClock = timeDiff(studentClockInput.value);
  studentList[updateIndex].stDate = studentDateInput.value;
  studentList[updateIndex].stGroup = studentGroupInput.value;
  studentList[updateIndex].stName = studentNameInput.value;
  studentList[updateIndex].stNum = studentNumInput.value;
  studentList[updateIndex].stPresent = studentPresentInput.value;
  localStorage.setItem("student", JSON.stringify(studentList));
  isUpdated = false;
  btn.innerHTML = `اضافة طالب`;
}

function searchInputs() {
  let totalStudent = 0;
  let presentStudent = 0;
  let absentStudent = 0;
  let dt = ``;
  let box = ``;
  stGroupSrh = stGroupSearch.value;
  stDateSrh = stDateSearch.value;
  stPresentSrh = stPresentSearch.value;

  for (let i = 0; i < studentList.length; i++) {
    if (
      studentList[i].stGroup.includes(stGroupSrh) &&
      studentList[i].stDate.includes(stDateSrh) &&
      studentList[i].stPresent.includes(stPresentSrh)
    ) {
      if (studentList[i].stDate) {
        dt = studentList[i].stDate;
      }
      box += `
        <tr>
                <th class="text-danger">${i + 1}</th>
                <td>${studentList[i].stName}</td>
                <td>${studentList[i].stGroup}</td>
                <td>${studentList[i].stClock}</td>
                <td>${studentList[i].stNum}</td>
                <td>${studentList[i].stDate}</td>
                <td class=${studentList[i].stPresent == "حاضر" ? "bg-green" : "bg-red"}>${studentList[i].stPresent}</td>
                <td class="text-center"><button class="btn btn-warning" onclick="edit(${i})"><i class="fa-solid fa-pen"></i></button> <button class="btn btn-danger" onclick="deleteStudent(${i})"><i class="fa-solid fa-trash"></i></button></td>
        </tr>
        `;
    }

    if (
      studentList[i].stGroup.includes(stGroupSrh) &&
      studentList[i].stDate.includes(stDateSrh)
    ) {
      totalStudent++;
    }

    if (
      studentList[i].stGroup.includes(stGroupSrh) &&
      studentList[i].stDate.includes(stDateSrh) &&
      studentList[i].stPresent.includes("حاضر")
    ) {
      presentStudent++;
    }

    if (
      studentList[i].stGroup.includes(stGroupSrh) &&
      studentList[i].stDate.includes(stDateSrh) &&
      studentList[i].stPresent.includes("غائب")
    ) {
      absentStudent++;
    }
  }

  document.getElementById("dataRow").innerHTML = box;
  total.innerHTML = `${totalStudent}`;
  present.innerHTML = `${presentStudent}`;
  absent.innerHTML = `${absentStudent}`;
  dates.innerHTML = `التاريخ : ${dt}`;
}



//validation
function validation(element,msg){

    let text = element.value;
    let message =document.getElementById(msg);
    let regex ={
        stName:/^\W\D{2,30}$/,
        stNum:/^01[0125][0-9]{8}$/,
        stPresent:/^(حاضر|غائب)$/,
        stGroup:/^(السبت و الثلاثاء|الاحد و الاربعاء|الاثنين و الخميس|الجمعة)$/,
        stDate:/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/
    }

    if(regex[element.id].test(text)){
        element.classList.add('is-valid');
        element.classList.remove('is-invalid');
        message.classList.add('d-none');
        return true;
    }else{
        element.classList.add('is-invalid');
        element.classList.remove('is-valid');
        message.classList.remove('d-none');
        return false;
    }

}




//12 hours ============================================================//
function timeDiff(times) {
  if (!times) return "";
  let tim = times.split(":");
  let hour = Number(tim[0]) - 12;
  if (hour == 0) {
    hour = 12;
  }
  return `${Math.abs(hour)}:${tim[1]}`;
}
//====================================================================//
