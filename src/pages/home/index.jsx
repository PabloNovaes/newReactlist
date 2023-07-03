import "./style.css";
import "../../styles/global.css";
import { useEffect, useState } from "react";
import { Card } from "../../components/Card";

export function Home() {
  const [studentName, setStudentName] = useState();
  const [students, setStudents] = useState([]);
  const [studentsId, setStudentsId] = useState(0);
  const [user, setUser] = useState({name: '', avatar: ''})

  function handleAddStudent() {
    setStudentsId(studentsId + 1);

    const newStudent = {
      id: studentsId,
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    };
    console.log(newStudent);
    setStudents((prevState) => [...prevState, newStudent]);
  }

  useEffect(() => {
    fetch('https://api.github.com/users/pablonovaes')
    .then(response => response.json())
    .then(data => {
      setUser({
        name: data.name,
        avatar: data.avatar_url
      })
    })
    .catch(error => console.log(error)) 
  }, [])

  return (
    <>
      <div className="container">
        <header>
          <h1>Lista de Presença </h1>
          <div>
            <strong>{user.name}</strong>
            <img src= {user.avatar}alt="" />
          </div>
        </header>
        <input
          type="text"
          placeholder="Digite seu nome"
          onChange={(e) => setStudentName(e.target.value)}
        />

        <div className="list">
          {students.map((student) => (
            <Card key={student.time} name={student.name} time={student.time} />
          ))}
        </div>
        <button onClick={handleAddStudent}>Adicionar</button>
      </div>
    </>
  );
}
