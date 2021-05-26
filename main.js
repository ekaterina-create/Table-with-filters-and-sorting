document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector(".add__btn");
  const surnameInput = document.getElementById("surname");
  const nameInput = document.getElementById("name");
  const patInput = document.getElementById("pat");
  const birthdateInput = document.getElementById("birthdate");
  const yearInput = document.getElementById("year");
  const facultyInput = document.getElementById("faculty");
  const sortedFio = document.getElementById("fio");
  const sortedFaculty = document.getElementById("fac");
  const sortedBirthdate = document.getElementById("birth");
  const sortedCourse = document.getElementById("course");
  const validationError = document.querySelector(".error");
  const table = document.querySelector(".tbody");
  let studentsArrCopy = [];

  let studentsArr = [{
      name: "Екатерина",
      surname: "Рожкова",
      patronymic: "Вячеславовна",
      birthdate: new Date(1986, 01, 20),
      startyear: "2018",
      faculty: "Биология",
    },
    {
      name: "Иван",
      surname: "Иванов",
      patronymic: "Иванович",
      birthdate: new Date(1987, 02, 22),
      startyear: "2018",
      faculty: "Технический",
    },
    {
      name: "Петр",
      surname: "Петров",
      patronymic: "Иванович",
      birthdate: new Date(1976, 00, 03),
      startyear: "2020",
      faculty: "Биология",
    },
    {
      name: "Петр",
      surname: "Иванович",
      patronymic: "Васильевич",
      birthdate: new Date(1976, 00, 03),
      startyear: "2021",
      faculty: "Физика",
    },
  ];
  // удаление данных из таблицы
  const deleteDomElement = (el) => {
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
  };
  // отрисовка новой
  const changeTable = (arr) => {
    deleteDomElement(table);
    createTable(arr);
  };
  // получение возраста из обьекта  Date
  const getAge = (dateString) => {
    let today = new Date();
    let birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() + 1 - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };
  // Сортировка строк
  function sortFullName(a, b) {
    let fullnameA = (a.surname + a.name + a.patronymic).toLowerCase(),
      fullnameB = (b.surname + b.name + b.patronymic).toLowerCase();

    if (fullnameA < fullnameB) return -1;
    if (fullnameA > fullnameB) return 1;
    return 0;
  }

  sortedFio.addEventListener("click", function () {
    const copyStudentsArr = studentsArr.slice();
    copyStudentsArr.sort(sortFullName);
    changeTable(copyStudentsArr);
  });

  function sortFaculty(a, b) {
    let facultyA = a.faculty.toLowerCase(),
      facultyB = b.faculty.toLowerCase();
    if (facultyA < facultyB) return -1;
    if (facultyA > facultyB) return 1;
    return 0;
  }

  sortedFaculty.addEventListener("click", function () {
    const copyStudentsArr = studentsArr.slice();
    copyStudentsArr.sort(sortFaculty);
    changeTable(copyStudentsArr);
  });

  function sortAge(a, b) {
    let ageA = getAge(a.birthdate),
      ageB = getAge(b.birthdate);
    return ageA - ageB;
  }

  sortedBirthdate.addEventListener("click", function () {
    const copyStudentsArr = studentsArr.slice();
    copyStudentsArr.sort(sortAge);
    changeTable(copyStudentsArr);
  });

  function sortCourse(a, b) {
    let today = new Date();
    let courseA = Number(today.getFullYear()) - +a.startyear,
      courseB = Number(today.getFullYear()) - +b.startyear;
    return courseA - courseB;
  }

  sortedCourse.addEventListener("click", function () {
    const copyStudentsArr = studentsArr.slice();
    copyStudentsArr.sort(sortCourse);
    changeTable(copyStudentsArr);
  });
  // изменение регистра
  function changeRegistr(str) {
    str = str.charAt(0).toUpperCase() + str.slice(1);
    return str;
  }
  // создание ячеек
  const createTr = (obj) => {
    let tdFio = document.createElement("td");
    let tdFaculty = document.createElement("td");
    let tdAge = document.createElement("td");
    let tdEduYears = document.createElement("td");

    let today = new Date();
    let course = Number(today.getFullYear()) - +obj.startyear;

    resultCourse =
      course > 3 || (course === 3 && Number(today.getMonth()) > 8) ?
      (course = "закончил") :
      (course = ++course);

    const date = obj.birthdate;

    function formatDate(date) {
      let dd = date.getDate();
      if (dd < 10) dd = "0" + dd;

      let mm = date.getMonth() + 1;
      if (mm < 10) mm = "0" + mm;

      let yy = date.getFullYear() % 100;
      if (yy < 10) yy = "0" + yy;

      return dd + "." + mm + "." + yy;
    }

    tdFaculty.textContent = obj.faculty;
    tdFio.textContent = `${obj.surname} ${obj.name} ${obj.patronymic}`;
    tdAge.textContent = `${formatDate(date)} (возраст: ${getAge(
      obj.birthdate
    )})`;
    tdEduYears.textContent = `${obj.startyear}-${
      +obj.startyear + Number(3)
    } (курс: ${course})`;

    return {
      tdFio,
      tdFaculty,
      tdAge,
      tdEduYears,
    };
  };
  // создание строк таблицы
  function createTable(arr) {
    arr.forEach(function (el) {
      let item = createTr(el);
      let tr = document.createElement("tr");
      tr.classList.add("tr");
      tr.append(item.tdFio);
      tr.append(item.tdFaculty);
      tr.append(item.tdAge);
      tr.append(item.tdEduYears);

      table.append(tr);
    });
  }

  createTable(studentsArr);
  // создание нового студента
  function createNewStudent() {
    const student = {
      name: `${changeRegistr(nameInput.value.trim())}`,
      surname: `${changeRegistr(surnameInput.value.trim())}`,
      patronymic: `${changeRegistr(patInput.value.replace(/\s/g, ""))}`,
      birthdate: new Date(`${birthdateInput.valueAsDate}`),
      startyear: `${yearInput.value.replace(/\s/g, "")}`,
      faculty: `${changeRegistr(facultyInput.value.replace(/\s/g, ""))}`,
    };

    return student;
  }
  

  // добавление нового студента в таблицу
  function addStudent(e) {
    e.preventDefault();
    studentsArrCopy = [];

    validationError.textContent = "";
    if (
      !nameInput.value ||
      !surnameInput.value ||
      !patInput.value ||
      !birthdateInput.valueAsDate ||
      !yearInput.value ||
      !facultyInput.value
    ) {
      validationError.textContent = "Все поля обязательны для заполнения";

      return;
    }
    let now = new Date(),
      birthday = birthdateInput.valueAsDate;
    let year = birthday.getFullYear();

    if (now < birthday) {
      validationError.textContent = "Дата рождения в будущем";
      return;
    }
    if (+yearInput.value < 2000 || +yearInput.value > now.getFullYear()) {
      validationError.textContent = "Год начала обучения от 2000 до текущего";
      return;
    }
    if (year < +1900) {
      validationError.textContent = "Дата рождения с 1900 года";
      return;
    }

    let newStudent = createNewStudent();

    const table = document.querySelector(".tbody");
    deleteDomElement(table);
    studentsArr.push(newStudent);
    createTable(studentsArr);
    nameInput.value = "";
    surnameInput.value = "";
    patInput.value = "";
    birthdateInput.value = "";
    yearInput.value = "";
    facultyInput.value = "";
  }
  addBtn.addEventListener("click", addStudent);

  // Фильтры

  const inputFio = document.querySelector(".input__fio");
  const inputFaculty = document.querySelector(".input__faculty");
  const inputStartYear = document.querySelector(".input__startyear");
  const inputEndYear = document.querySelector(".input__endyear");

  const clearInput = (input) => {
    input.value = '';
  }
  // поиск подстроки
  function searchString(array, value) {
    value = value.toString().toLowerCase();

    return array.filter(function (o) {
      return Object.keys(o).some(function (k) {
        return o[k].toString().toLowerCase().includes(value);
      });
    });
  }

  const modifyTable = (input) => {
    let str = input.value;
    let findedStudent = [];

    if (studentsArrCopy.length === 0) {
      findedStudent = searchString(studentsArr, str);
      studentsArrCopy.push(...findedStudent);

    } else {
      findedStudent = searchString(studentsArrCopy, str);
    }
    setTimeout(clearInput, 2000, input)

    if (findedStudent.length > 0) {
      setTimeout(changeTable, 700, findedStudent);


    } else {
      studentsArrCopy = [];
      setTimeout(deleteDomElement, 700, table);

    }

  };

  inputFio.addEventListener("input", () => {
    setTimeout(modifyTable, 800, inputFio)
  });


  inputFaculty.addEventListener("input", () => {
    setTimeout(modifyTable, 800, inputFaculty)
  });


  inputStartYear.addEventListener("input", () => {
    let searchResult = [];

    if (studentsArrCopy.length === 0) {
      searchResult = studentsArr.filter(
        (el) => el.startyear == inputStartYear.value
      );
      studentsArrCopy.push(...searchResult);
    } else {
      searchResult = studentsArrCopy.filter(
        (el) => el.startyear == inputStartYear.value
      );

    }

    if (searchResult.length > 0) {
      setTimeout(changeTable, 400, searchResult);
      setTimeout(clearInput, 1000, inputStartYear);
    } else {

      deleteDomElement(table);
      setTimeout(clearInput, 1000, inputStartYear);
    }
  });

  inputEndYear.addEventListener("input", () => {
    let searchResult = [];
    let value = Number(inputEndYear.value) - 3;

    if (studentsArrCopy.length === 0) {
      searchResult = studentsArr.filter((el) => Number(el.startyear) == value);
      studentsArrCopy.push(...searchResult);
    } else {
      searchResult = studentsArrCopy.filter(
        (el) => Number(el.startyear) == value
      );

    }
    if (searchResult.length > 0) {
      setTimeout(changeTable, 400, searchResult);
      setTimeout(clearInput, 1000, inputEndYear);
    } else {

      deleteDomElement(table);
      setTimeout(clearInput, 1000, inputEndYear);
    }
  });
});