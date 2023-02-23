import Header from "../../components/Header";
import ItemList from "../../components/ItemList"
import { useState } from "react";

import "./styles.css"

function App() {
  const [user, setUser] = useState('')
  const [currentUser, setCurrentUser] = useState(null)
  const [repo, setRepo] = useState(null)

  const handleGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`)
    const newUser = await userData.json()

    if (newUser.name) {
      const {avatar_url, name, bio, login} = newUser
      setCurrentUser({avatar_url, name, bio, login})

      const userRepo = await fetch(`https://api.github.com/users/${user}/repos`)
      const newRepo = await userRepo.json()

      if (newRepo.length) {
        setRepo(newRepo)
      }

    }
  }


  return (
    <div className="App">
      <Header />
      <div className="content">
          <div className="right-info">
              <div>
                <input name="usuario" value={user} onChange={event => setUser(event.target.value)} placeholder="@username" />
                <button onClick={handleGetData}>Buscar</button>
              </div>
              {currentUser?.name ? (
                <>
                <div className="perfil">
                <img src={currentUser.avatar_url} className="profile-img" alt="profile img"/>
                <div>
                  <h3>{currentUser.name}</h3>
                  <span>{currentUser.login}</span>
                  <p>{currentUser.bio}</p>
                </div>
              </div>
              <hr />
              </>
              ) : null}

              {repo?.length ? (
                
                <div>
                  <h4 className="repositorio">Repositórios</h4>
                  {repo.map(rep => (
                    <ItemList title={rep.name} description={rep.description}/>
                ))}
                </div>
              ) : null}
              
          </div>
      </div>      
    </div>
  );
}

export default App;
