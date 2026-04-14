import './App.css';
import UserList from './UserList'; // Importamos el componente que acabamos de crear

function App() {
  return (
    <div className="App">
      <header>
        <h1>User Profiles</h1>
      </header>
      <main>
        {/* Aquí es donde vive la magia de la modularidad */}
        <UserList />
      </main>
    </div>
  );
}

export default App;