const form = document.getElementById("dormitoryForm");
const result = document.getElementById("result");


// студенты
const students = [
    {
        id: 1,
        foreign: true
    },
    {
        id: 2,
        foreign: false
    },
    {
        id: 3,
        foreign: true
    }
];


// корпуса
const buildings = [
    {
        id: 1,
        forStudents: true
    },
    {
        id: 2,
        forStudents: true
    },
    {
        id: 3,
        forStudents: false
    }
];


// комнаты
const rooms = [
    {
        buildingId: 1,
        roomId: 101,
        free: true
    },
    {
        buildingId: 1,
        roomId: 102,
        free: false
    },
    {
        buildingId: 2,
        roomId: 201,
        free: true
    },
    {
        buildingId: 2,
        roomId: 202,
        free: false
    }
];


// GET №1 — проверка студента
function getStudent(id) {

    return new Promise((resolve) => {

        setTimeout(() => {

            const student = students.find(
                item => item.id === id
            );

            resolve(student);

        }, 300);

    });
}


// GET №2 — проверка корпуса
function getBuilding(id) {

    return new Promise((resolve) => {

        setTimeout(() => {

            const building = buildings.find(
                item => item.id === id
            );

            resolve(building);

        }, 300);

    });
}


// GET №3 — проверка комнаты
function getRoom(buildingId, roomId) {

    return new Promise((resolve) => {

        setTimeout(() => {

            const room = rooms.find(
                item =>
                    item.buildingId === buildingId &&
                    item.roomId === roomId
            );

            resolve(room);

        }, 300);

    });
}


// проверка формы
form.addEventListener("submit", async function(event) {

    event.preventDefault();

    const studentId = Number(
        document.getElementById("studentId").value
    );

    const buildingId = Number(
        document.getElementById("buildingId").value
    );

    const roomId = Number(
        document.getElementById("roomId").value
    );


    result.className = "";
    result.style.display = "block";
    result.innerHTML = "проверяем данные...";


    // 1. проверяем студента

    const student = await getStudent(studentId);

    if (!student) {

        result.className = "error";

        result.innerHTML =
            "❌ отказ<br>" +
            "студент не найден.";

        return;
    }


    if (!student.foreign) {

        result.className = "error";

        result.innerHTML =
            "❌ отказ<br>" +
            "студент не является иногородним.";

        return;
    }


    // 2. проверяем корпус

    const building = await getBuilding(buildingId);

    if (!building) {

        result.className = "error";

        result.innerHTML =
            "❌ отказ<br>" +
            "корпус не найден.";

        return;
    }


    if (!building.forStudents) {

        result.className = "error";

        result.innerHTML =
            "❌ отказ<br>" +
            "корпус не предназначен для студентов.";

        return;
    }


    // 3. проверяем комнату

    const room = await getRoom(
        buildingId,
        roomId
    );

    if (!room) {

        result.className = "error";

        result.innerHTML =
            "❌ отказ<br>" +
            "комната не найдена.";

        return;
    }


    if (!room.free) {

        result.className = "error";

        result.innerHTML =
            "❌ отказ<br>" +
            "комната уже занята.";

        return;
    }


    // все условия выполнены

    result.className = "success";

    result.innerHTML =
        "✅ всё окей!<br><br>" +
        "студент иногородний.<br>" +
        "корпус предназначен для студентов.<br>" +
        "комната свободна.";
});
